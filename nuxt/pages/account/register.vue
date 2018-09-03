<template>
  <div class="page">
    <div class="main">
      <h4 class="title">
        <div class="normal-title">
          <nuxt-link to="login">登录</nuxt-link>
          <b>.</b>
          <nuxt-link to="register">注册</nuxt-link>
        </div>
      </h4>
      <div class="js-sign-in-container">
        <form ref="regForm" v-on:submit.prevent="submit">
          <div>
            <div class="input-prepend" v-bind:class="formErrors['username'] ? 'error' : ''">
              <input type="text" name="username" placeholder="你的昵称" v-model="formItem.username" v-on:blur="handleInputBlur" >
              <i class="iconfont icon-person"></i>
              <span v-if="formErrors['username']">{{ formErrors['username'] }}</span>
            </div>
            <div class="input-prepend" v-bind:class="formErrors[accountInfo.name] ? 'error' : ''">
              <input type="text" v-bind:name="accountInfo.name" v-bind:placeholder="accountInfo.placeholder" v-model="formItem[accountInfo.name]" v-on:blur="handleInputBlur" >
              <span v-if="formErrors[accountInfo.name]">{{ formErrors[accountInfo.name] }}</span>
              <div>
                <el-dropdown trigger="click" placement="bottom-start" @command="handleAccountType">
                  <a href="javascript:;"><i class="iconfont icon-phone" v-bind:class="accountInfo.icon"></i></a>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="email">用邮箱注册</el-dropdown-item>
                    <el-dropdown-item command="phone">用手机号注册</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <div class="input-prepend" v-bind:class="formErrors['password'] ? 'error' : ''">
              <input type="password" name="password" placeholder="设置密码" v-model="formItem.password" v-on:blur="handleInputBlur" >
              <i class="iconfont icon-lock"></i>
              <span v-if="formErrors['password']">{{ formErrors['password'] }}</span>
            </div>
          </div>
          <button class="sign-up-button">
            注册
          </button>
          <p class="sign-up-msg">
            点击 “注册” 即表示您同意并愿意遵守简书
            <br />
            <a href="javascript:;">用户协议</a>
             和 
            <a href="javascript:;">隐私政策</a>
          </p>
        </form>
        <div class="more-sign">
          <h6>社交帐号登录</h6>
          <ul>
            <li v-for="sns in snsLogins">
              <a target="_blank" v-bind:href="sns.link">
                <i class="icon iconfont" v-bind:class="sns.icon"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import util from 'util'
import schema from 'async-validator'
import Rules from '../../../server/config/rules'
import * as http from '~/utils/http'

const accountMode = {
  email: {
    name: 'email',
    icon: 'icon-youxiang',
    placeholder: '邮箱'
  },
  phone: {
    name: 'phone',
    icon: 'icon-phone',
    placeholder: '手机号'
  },
}
var state = null

export default {
  layout: 'account',
  middleware: 'notAuthenticated',
  asyncData ({ params, query, redirect, store }) {
    //return redirect('/about')
  },
  data () {
    return {
      formItem: {
        username: '',
        phone: '',
        email: '',
        password: ''
      },
      accountType: 'email',
      accountInfo: accountMode['email'],
      //formErrors: [],
      formErrors: {
        username: null,
        phone: null,
        email: null,
        password: null
      },
      isSubmit: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名' },
          { pattern: Rules['username'].pattern, message: util.format(Rules['username'].message, '用户名') }
        ],
        email: [
          { required: true, message: '请输入邮箱' },
          { pattern: Rules['email'].pattern, message: Rules['email'].message }
        ],
        phone: [
          { required: true, message: '请输入手机号' },
          { pattern: Rules['phone'].pattern, message: Rules['phone'].message }
        ],
        password: [
          { required: true, message: '请输入密码' },
          { pattern: Rules['password'].pattern, message: util.format(Rules['password'].message, '') }
        ]
      },
      snsLogins: [
        { name: 'weixin', link: 'javascript:;', icon: 'icon-wechat-fill' },
        { name: 'QQ', link: 'javascript:;', icon: 'icon-QQ' },
      ]
    }
  },
  methods: {
    submit (e) {
      let target = this.$refs['regForm']
      let info = {
        username: target.username.value,
        password: target.password.value
      }
      let rules = this.rules
      let isNameValidator = _.find(rules.username, o => o.validator)
      if (!isNameValidator) {
        rules.username.push({ validator: this.validName })
      }
      if (this.accountType === 'email') {
        rules = _.omit(rules, ['phone'])
        let isValidator = _.find(rules.email, o => o.validator)
        if (!isValidator) {
          rules.email.push({ validator: this.validMail })
        }
        info = {
          ...info,
          email: target.email.value
        }
      }
      if (this.accountType === 'phone') {
        rules = _.omit(rules, ['email'])
        let isValidator = _.find(rules.phone, o => o.validator)
        if (!isValidator) {
          rules.phone.push({ validator: this.validPhone })
        }
        info = {
          ...info,
          phone: target.phone.value
        }
      }
      let validator = new schema(rules)
      validator.validate(this.formItem, (errors, fields) => {
        if (errors) {
          for (let item of errors) {
            if (this.formErrors[item.field]) continue
            this.formErrors[item.field] = item.message
          }
          return
        }
        console.log(info)
        setTimeout(async () => {
          try {
            let result = await http.register(info)
            let { data, Status } = result
            if (Status.code === 0) {
              this.$store.commit('updateAuth', data)
              this.$router.push({ path: '/' })
              return
            }
            this.$message.warning(Status.message)
          
          } catch (error) {
            this.$message.error(error.message)
          }
          //this.pending = false
        }, 800)
      })
    },
    handleAccountType (key) {
      this.accountType = key
      this.accountInfo = accountMode[key]
    },
    async validName (rule, value, callback) {
      let isValue = new RegExp(Rules['username'].pattern).test(value)
      if (!isValue) {
        return callback()
      }
      try {
        let result = await http.check('name', { name: value })
        let { data, Status } = result
        if (Status.code === 0) {
          return callback()
        }
        return callback(Status.message)
      } catch (error) {
        
      }
    },
    async validMail (rule, value, callback) {
      let isValue = new RegExp(Rules['email'].pattern).test(value)
      if (!isValue) {
        return callback()
      }
      try {
        let result = await http.check('email', { name: value })
        let { data, Status } = result
        if (Status.code === 0) {
          return callback()
        }
        return callback(Status.message)
      } catch (error) {
        
      }
    },
    async validPhone (rule, value, callback) {
      let isValue = new RegExp(Rules['phone'].pattern).test(value)
      if (!isValue) {
        return callback()
      }
      try {
        let result = await http.check('phone', { name: value })
        let { data, Status } = result
        if (Status.code === 0) {
          return callback()
        }
        return callback(Status.message)
      } catch (error) {
        
      }
    },
    handleInputBlur (e) {
      let { name, value } = e.target
      let target = this.$refs['regForm']
      let valids = {
        username: this.validName,
        email: this.validMail,
        phone: this.validPhone,
      }
      let rules = _.pick(this.rules, [name])
      if (['username'].indexOf(name) > -1) {
        let isValidator = _.find(rules[name], o => o.validator)
        if (!isValidator) {
          rules[name].push({ validator: valids[name] })
        }
        _.uniq(rules)
      }
      let validator = new schema(rules)
      validator.validate({ [name]: target[name].value }, (errors, fields) => {
        if (errors) {
          this.formErrors[name] = errors[0].message
          return
        }
        this.formErrors[name] = null
      })
    },
  }
}
</script>
