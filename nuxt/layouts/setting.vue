<template>
  <div class="app">
    <page-header></page-header>
    <div class="container setting">
      <el-row >
        <el-col :span="7" class="aside">
          <ul>
            <li v-for="aside in asides">
              <nuxt-link :to="aside.to">
                <div class="setting-icon">
                  <i class="iconfont" :class="aside.icon"></i>
                </div>
                <span slot="title">{{ aside.name }}</span>
              </nuxt-link>
            </li>
          </ul>
        </el-col>
        <el-col :span="16" :offset="8">
          <nuxt></nuxt>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import PageHeader from '~/components/header.vue'
import '~/assets/scss/home.scss'

export default {
  components: {
    PageHeader
  },
  data () {
    return {
      asides: [
        { name: '基础设置', to: '/settings/basic', icon: 'icon-3401caidan' },
        { name: '个人资料', to: '/settings/profile', icon: 'icon-profile' },
        { name: '代码仓库', to: '/settings/repository', icon: 'icon-cangku'},
        { name: '重置密码', to: '/settings/reset', icon: 'icon-zhongzhimima'},
        { name: '帐号管理', to: '/settings/misc', icon: 'icon-setting' },
      ]
    }
  }
}
</script>

<style lang="scss" >
body {
  overflow-y: scroll;
}

.aside {
  position: fixed;
  top: 0;
  bottom: 0;
  margin: 86px 0 0;
  padding: 0 0 30px;
  width: 280px;
  overflow: auto;
  margin-left: 10px;
	transition: all .8s;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      line-height: 20px;

      a {
        padding: 10px 15px;
        font-size: 15px;
        display: block;
        color: #333;
	      transition: all .8s;

        &.nuxt-link-active, &:hover {
          background-color: #f0f0f0;
          border-radius: 4px;
        }
      }

      .setting-icon {
        background-color: #a0a0a0;
        width: 32px;
        height: 32px;
        display: inline-flex;
        color: #fff;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        margin-right: 15px;

        .iconfont {
          color: #fff;
        }
      }
    }
  }
}

.page .el-row {
  padding: 0 10px;
}

.table-line {
  border-bottom: 1px solid #f0f0f0;

  &:last-of-type {
    border-bottom-width: 0;
  }

  .el-col {
    min-height: 73px;
    display: flex;
    align-items: center;
    font-size: 15px;
  }

  .el-col-6 {
    color: #969696;
  }

  .el-col-18, .el-col-24 {
    align-items: flex-start;
    padding: 16px 0;
    line-height: 40px;

    &.flex-column {
      display: flex;
      flex-direction: column;
    }

    &.flex-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      p {
        padding: 0;
      }
    }

    &.social-bind {
      line-height: 1.5;
      display: flex;
      flex-direction: column;
    }

    .el-input, .el-textarea {
      //width: 335px;

      .el-input__inner, .el-textarea__inner {
        background-color: hsla(0,0%,71%,.1);
      }
    }

    i {
      color: #969696;
      font-size: 14px;
      margin: 0 0 0 10px;
      font-weight: bold;
      line-height: 40px;
    }

    &>span, .cancel-bind {
      color: #969696;
      font-size: 14px;
      margin: 0 0 0 8px;
    }

    label {
      line-height: 40px;
    }

    p {
      margin: 0;
      padding: 8px 0 0;
      font-size: 12px;
      color: #969696;
    }

    .pull-right {
      align-self: flex-end;
    }

    .cancel-bind {
      margin: 0 0 0 12px;
      display: none;
    }

    &:hover {

      .cancel-bind {
        display: block;
      }
    }
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  .social-bind-list {
    width: 100%;

    li {
      border-bottom: 1px solid #f0f0f0;
      line-height: 50px;

      .bind-name {
        display: inline-block;

        .icon {
          width: 30px;
          font-size: 22px;
          vertical-align: middle;
          display: inline-block;
          font-weight: normal;

          &.icon-weibo {
            color: #ea6f5a;
          }
          &.icon-wechat-fill {
            color: #42c02e;
          }
          &.icon-QQ {
            color: #498ad5;
          }
          &.icon-github-fill {
            color: #646464;
            font-size: 20px;
          }
          &.icon-google-plus {
            color: #ec6149;
            font-size: 18px;
          }
          &.icon-douban {
            color: #42c02e;
            font-size: 18px;
          }
        }

        a {
          margin: 0 0 0 20px;
          font-size: 14px;
          vertical-align: middle;

          i {
            font-size: 10px;
            margin: 0;
            color: #333;
          }
        }
      }
    }
  }
}

.setting-save {
  width: 100px;
  margin: 20px 0 60px 10px;
}

@media (max-width: 1080px) {
  .aside {
    width: 218.75px;
  }
}
</style>
