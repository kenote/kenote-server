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
        <form v-on:submit.prevent="submit">
          <div>
            <div class="input-prepend">
              <input type="text" name="username" placeholder="用户名/邮箱/手机号" v-model="formItem.username" >
              <i class="iconfont icon-person"></i>
            </div>
            <div class="input-prepend">
              <input type="password" name="password" placeholder="密码" v-model="formItem.password" >
              <i class="iconfont icon-lock"></i>
            </div>
          </div>
          <div class="remember-btn">
            <el-checkbox v-model="rememberMe" @change="changeRemember"><span>记住我</span></el-checkbox>
          </div>
          <div class="forget-btn">
            <el-dropdown trigger="click" placement="bottom-end" @command="handleForget">
              <a href="javascript:;">登录遇到问题?</a>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="phone">用手机号重置密码</el-dropdown-item>
                <el-dropdown-item command="email">用邮箱重置密码</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <button class="sign-in-button" v-bind:disabled="pending">
            <i class="el-icon-loading" v-bind:style="{ opacity: pending ? 1 : 0 }"></i>
            <span>登录</span>
          </button>
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
import * as http from '~/utils/http'

export default {
  layout: 'account',
  middleware: 'notAuthenticated',
  data () {
    return {
      formItem: {
        username: '',
        password: ''
      },
      rememberMe: true,
      pending: false,
      snsLogins: [
        { name: 'weibo', link: 'javascript:;', icon: 'icon-weibo' },
        { name: 'weixin', link: 'javascript:;', icon: 'icon-wechat-fill' },
        { name: 'QQ', link: 'javascript:;', icon: 'icon-QQ' },
        { name: 'github', link: 'javascript:;', icon: 'icon-github-fill' }
      ]
    }
  },
  methods: {
    submit (e) {
      let username = e.target.username.value
      let password = e.target.password.value
      let rememberMe = this.rememberMe === undefined ? this.a.data().rememberMe : this.rememberMe
      if (_.isEmpty(username.replace(/\s+/g, ''))) {
        return this.$message.warning('用户名/邮箱/手机号不能为空')
      }
      if (_.isEmpty(password)) {
        return this.$message.warning('密码不能为空')
      }
      this.pending = true
      setTimeout(async () => {
        try {
          let result = await http.login({ username, password })
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
        this.pending = false
      }, 800)
    },
    changeRemember: (value) => {
      this.rememberMe = value
    },
    handleForget: (key) => {
      console.log(key)
    },
  }
}
</script>