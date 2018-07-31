<template>
  <div class="page">
    <h1>Hello world!</h1>
    <nuxt-link to="/about">关 于</nuxt-link>
    <nuxt-link to="/account/login">登 录</nuxt-link>
  </div>
</template>

<script>
//import '~/assets/scss/account.scss'

export default {
  layout: 'default',
  asyncData ({ params, query, redirect }) {
    //return redirect('/about')
  }
}
</script>