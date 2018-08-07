<template>
  <header>
    <nav class="navbar">
      <div class="width-limit" v-if="$store.state.authUser">
        <a href="javascript:;" class="menu" v-on:click="hanleDropDown">
          <i class="iconfont" v-bind:class="dropDown ? 'icon-close' : 'icon-menu'"></i>
        </a>
        <nuxt-link class="logo" to="/">
          <img src="~/assets/img/logo.png" alt="Logo">
        </nuxt-link>
        <a class="btn login" href="/account/logout">
          退出
        </a>
      </div>
      <div class="width-limit" v-else>
        <a href="javascript:;" class="menu" v-on:click="hanleDropDown">
          <i class="iconfont" v-bind:class="dropDown ? 'icon-close' : 'icon-menu'"></i>
        </a>
        <nuxt-link class="logo" to="/">
          <img src="~/assets/img/logo.png" alt="Logo">
        </nuxt-link>
        <nuxt-link class="btn register" to="/account/register">
          注册
        </nuxt-link>
        <nuxt-link class="btn login" to="/account/login">
          登录
        </nuxt-link>
      </div>
    </nav>
    <nav class="nav-dropdown" v-bind:class="dropDown ? '' : 'nav-hidden'">
      <div class="nav_right" v-if="$store.state.authUser">
        <ul>
          <li>
            <a href="/account/logout">
              退出
            </a>
          </li>
        </ul>
      </div>
      <div class="nav_right" v-else>
        <ul>
          <li>
            <nuxt-link to="/account/login">
              登录
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/account/register">
              注册
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import '~/assets/scss/navbar.scss'
import '~/assets/css/iconfont.css'

export default {
  data () {
    return {
      dropDown: false
    }
  },
  methods: {
    hanleDropDown () {
      console.log('hanleDropDown', this.dropDown)
      this.dropDown = !this.dropDown
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>