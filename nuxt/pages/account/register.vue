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
              <input type="text" name="username" placeholder="你的昵称" v-model="formItem.username" >
              <Icon type="person" />
            </div>
            <div class="input-prepend">
              <input type="text" name="phone" placeholder="手机号" v-model="formItem.phone" >
              <Icon type="iphone" />
            </div>
            <div class="input-prepend">
              <input type="password" name="password" placeholder="设置密码" v-model="formItem.password" >
              <Icon type="locked" />
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
  asyncData ({ params, query, redirect }) {
    //return redirect('/about')
  },
  data () {
    return {
      formItem: {
        username: '',
        phone: '',
        password: ''
      },
      snsLogins: [
        { name: 'weixin', link: 'javascript:;', icon: 'icon-wechat-fill' },
        { name: 'QQ', link: 'javascript:;', icon: 'icon-QQ' },
      ]
    }
  },
  methods: {
    submit: (e) => {
      let username = e.target.username.value
      let phone = e.target.phone.value
      let password = e.target.password.value
      console.log(username, phone, password)
    },
  }
}
</script>
