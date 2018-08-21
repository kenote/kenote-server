<template>
  <header>
    <nav class="navbar">
      <div class="width-limit" >
        <a href="javascript:;" class="menu" v-on:click="hanleDropDown">
          <i class="iconfont" :class="dropDown ? 'icon-close' : 'icon-menu'"></i>
        </a>
        <nuxt-link class="logo" to="/">
          <img src="~/assets/img/logo.png" alt="Logo">
        </nuxt-link>
        <div class="user" v-if="$store.state.authUser">
          <el-dropdown>
            <a class="btn" href="javascript:;">
              <img src="~/assets/img/af794c831cae.png" />
            </a>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><i class="iconfont icon-person" ></i><span>我的主页</span></el-dropdown-item>
              <el-dropdown-item><i class="iconfont icon-bookmark" ></i><span>收藏的文章</span></el-dropdown-item>
              <el-dropdown-item><i class="iconfont icon-like" ></i><span>喜欢的文章</span></el-dropdown-item>
              <el-dropdown-item><nuxt-link to="/setting"><i class="iconfont icon-setting" ></i><span>设置</span></nuxt-link></el-dropdown-item>
              <el-dropdown-item><a href="/account/logout"><i class="iconfont icon-exittoapp" ></i><span>退出</span></a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <nuxt-link class="btn register" to="/account/register" v-if="!$store.state.authUser">
          注册
        </nuxt-link>
        <nuxt-link class="btn login" to="/account/login" v-if="!$store.state.authUser">
          登录
        </nuxt-link>
        <div class="navbar-collapse" >
          <nuxt-link v-for="navbar in navbars" :key="navbar.id" :to="navbar.to" class="btn">
            <i class="iconfont" :class="navbar.icon" ></i>
            {{ navbar.name }}
          </nuxt-link>
          <nav-search class="search" :submit="hanleSearch" v-model:value="$store.state.keywords" />
        </div>
      </div>
    </nav>
    <nav class="nav-dropdown" :class="dropDown ? '' : 'nav-hidden'">
      <nav-search class="nav_search" :submit="hanleSearch" v-model:value="$store.state.keywords" />
      <div class="nav_left">
        <ul>
          <li v-for="navbar in navbars">
            <a :href="navbar.to" @click.prevent="hanleLinkTo(navbar.to)" :class="hanleClassName(navbar.to)">
              {{ navbar.name }}
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
    NavSearch,
  },
  data () {
    return {
      dropDown: false,
      navbars: [
        { id: 0, name: '首页', to: '/', icon: 'icon-home' },
        { id: 1, name: 'API接口', to: '/api', icon: 'icon-API' },
      ]
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
.el-dropdown-menu__item {
  padding: 4px 20px;

  .iconfont {
    color: #ea6f5a;
  }
  span {
    padding: 0 10px 0 15px;
  }
  a {
    display: block;
    color: #606266;
  }
  &:hover {
    color: #606266;
  }
}
</style>