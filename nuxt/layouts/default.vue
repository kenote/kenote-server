<template>
  <div class="app">
    <page-header></page-header>
    <nuxt></nuxt>
  </div>
</template>

<script>
import PageHeader from '~/components/header.vue'

export default {
  components: {
    PageHeader
  }
}
</script>