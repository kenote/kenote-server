<template>
  <div class="page">
    <el-carousel trigger="click" :interval="5000" type="-">
      <el-carousel-item v-for="item in 4" :key="item">
        <img src="~/assets/img/logo.png" alt="Logo">
      </el-carousel-item>
    </el-carousel>
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

<style>
  .el-carousel {

  }
  .el-carousel__container {
    height: 500px;
  }
  .el-carousel__item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 20px 0;
  }
  .el-carousel__item img{
    max-width: 90%;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 54px;
    opacity: 0.75;
    line-height: 500px;
    margin: 0;
    text-align: center;
    vertical-align: middle;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }


  @media (max-width: 1280px) {
    .el-carousel__container {
      height: 420px;
    }
  }
  @media (max-width: 1024px) {
    .el-carousel__container {
      height: 360px;
    }
  }
  @media (max-width: 768px) {
    .el-carousel__container {
      height: 300px;
    }
  }
  @media (max-width: 600px) {
    .el-carousel__container {
      height: 240px;
    }
  }
  @media (max-width: 500px) {
    .el-carousel__container {
      height: 180px;
    }
  }
  @media (max-width: 400px) {
    .el-carousel__container {
      height: 150px;
    }
  }
  @media (max-width: 304px) {
    .el-carousel {
      display: none;
    }
  }
</style>