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
              <input type="text" name="username" placeholder="手机号或邮箱" v-model="formItem.username" >
              <Icon type="person" />
            </div>
            <div class="input-prepend">
              <input type="password" name="password" placeholder="密码" v-model="formItem.password" >
              <Icon type="locked" />
            </div>
          </div>
          <div class="remember-btn">
            <Checkbox v-model="rememberMe" @on-change="changeRemember"><span>记住我</span></Checkbox>
          </div>
          <div class="forget-btn">
            <Dropdown trigger="click" placement="bottom-end" style="text-align:left;" @on-click="clickDrop">
              <a href="javascript:;">登录遇到问题</a>
              <DropdownMenu slot="list">
                <DropdownItem name="phone">用手机号重置密码</DropdownItem>
                <DropdownItem name="email">用邮箱重置密码</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <button class="sign-in-button">
            登录
          </button>
        </form>
        <div class="more-sign">
          <h6>社交帐号登录</h6>
          <ul>
            <li v-for="sns in snsLogins">
              <a target="_blank" v-bind:href="sns.link">
                <i class="icon iconfont2" v-bind:class="sns.icon"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'account',
  data () {
    return {
      formItem: {
        username: '',
        password: ''
      },
      rememberMe: true,
      snsLogins: [
        { name: 'weibo', link: 'javascript:;', icon: 'icon-weibo' },
        { name: 'weixin', link: 'javascript:;', icon: 'icon-wechat-fill' },
        { name: 'QQ', link: 'javascript:;', icon: 'icon-QQ' },
        { name: 'github', link: 'javascript:;', icon: 'icon-github-fill' }
      ]
    }
  },
  methods: {
    submit: (e) => {
      let username = e.target.username.value
      let password = e.target.password.value
      let rememberMe = this.rememberMe === undefined ? this.a.data().rememberMe : this.rememberMe
      console.log(username, password, rememberMe)
    },
    changeRemember: (value) => {
      this.rememberMe = value
    },
    clickDrop: (e) => {
      console.log(e)
    }
  }
}
</script>