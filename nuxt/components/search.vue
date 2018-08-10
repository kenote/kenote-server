<template>
  <div>
    <form v-on:submit.prevent="submit(keyword)">
      <input type="text" class="search-input" name="q" autocomplete="off" placeholder="搜索" v-model="keyword" />
      <a class="search-btn" href="javascript:;" type="submit" v-on:click="submit(keyword)">
        <i class="iconfont icon-search" ></i>
      </a>
    </form>
  </div>
</template>

<script>

export default {

  name: 'nav-search',

  props: {
    value: {
      type: String,
      default: ''
    },
    submit: {
      type: Function
    }
  },

  data () {
    return {
      keyword: this.value
    }
  },
  
}

</script>