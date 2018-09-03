<template>
  <div class="app">
    <page-header></page-header>
    <div class="container index">
      <nuxt></nuxt>
    </div>
  </div>
</template>

<script>
import PageHeader from '~/components/header.vue'
import '~/assets/scss/home.scss'

export default {
  components: {
    PageHeader
  }
}
</script>