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
        <div class="navbar-collapse">
          <nuxt-link class="btn" to="/">
            <i class="iconfont icon-home" ></i>
            首页
          </nuxt-link>
          <nuxt-link class="btn" to="/api/">
            <i class="iconfont icon-API" ></i>
            API接口
          </nuxt-link>
          <nav-search class="search" :submit="hanleSearch" v-model:value="$store.state.keywords" />
        </div>
      </div>
    </nav>
    <nav class="nav-dropdown" v-bind:class="dropDown ? '' : 'nav-hidden'">
      <nav-search class="nav_search" :submit="hanleSearch" v-model:value="$store.state.keywords" />
      <div class="nav_left">
        <ul>
          <li>
            <a href="/" v-on:click.prevent="hanleLinkTo('/')" v-bind:class="hanleClassName('/')">
              首页
            </a>
          </li>
          <li>
            <a href="/api" v-on:click.prevent="hanleLinkTo('/api')" v-bind:class="hanleClassName('/api')">
              API接口
            </a>
          </li>
        </ul>
      </div>
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
import NavSearch from './search'

export default {
  components: {
    NavSearch
  },
  data () {
    return {
      dropDown: false,
    }
  },
  methods: {
    hanleDropDown () {
      this.dropDown = !this.dropDown
    },
    hanleLinkTo (path) {
      this.dropDown = false
      setTimeout(() =>
        this.$router.push({ path })
      , 800)
      
    },
    hanleSearch (value) {
      this.dropDown = false
      setTimeout(() => {
        this.$store.commit('updateKeyword', value)
        this.$router.push({ path: '/search', query: { q: value } })
      }, 800)
    },
    hanleClassName (path) {
      let currentPath = this.$router.history.current.path
      let reg = new RegExp(`^(${path})`)
      let className = []
      if (reg.test(currentPath)) {
        className.push('nuxt-link-active')
      }
      if (currentPath == path) {
        className.push('nuxt-link-exact-active')
      }
      return className.join(' ')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>