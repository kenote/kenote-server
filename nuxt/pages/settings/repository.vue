<template>

  <div class="page">
    <form v-on:submit.prevent="settingSave">
      <el-row class="table-line">
        <el-col :span="24" class="flex-column">
          <p>你可以设置你的代码仓库的主页，以便他人可以快速访问到。</p>
        </el-col>
      </el-row>
      <el-row class="table-line" v-for="repo in repositorys" :key="repo.key">
        <el-col :span="6">
          <i v-if="repo.icon" class="iconfont" :class="repo.icon"></i>
          {{ repo.name }}
        </el-col>
        <el-col :span="18" class="flex-column">
          <el-input :placeholder="repo.placeholder" v-model="formData[repo.key]"></el-input>
        </el-col>
      </el-row>
      <el-button native-type="submit" type="success" round class="setting-save" :loading="pending">保存</el-button>
    </form>

  </div>

</template>

<script>
import * as http from '~/utils/http'
import { isNull } from '~/utils'

export default {
  layout: 'setting',
  middleware: 'authenticated',
  asyncData ({ store }) {
    let { authUser } = store.state
    return {
      formData: {
        ...authUser.repository
      },
      repositorys: [
        { name: 'Github', placeholder: '您的 Github 主页', key: "github", icon: 'icon-github-fill' },
        { name: 'Gitlab', placeholder: '您的 Gitlab 主页', key: "gitlab", icon: 'icon-gitlab' },
        { name: 'BitBucket', placeholder: '您的 BitBucket 主页', key: "bitbucket", icon: 'icon-bitbucket' },
        { name: '码云 Gitee', placeholder: '您的 码云Gitee 主页', key: "gitee" },
        { name: '码市', placeholder: '您的 码市Coding 主页', key: "coding", icon: 'icon-CN_codingnet' },
      ],
      pending: false
    }
  },
  methods: {
    settingSave (e) {
      let repository = {}
      for (let key in this.formData) {
        if (!isNull(this.formData[key].replace(/\s+/g, ''))) {
          repository[key] = this.formData[key]
        }
      }
      if (Object.keys(repository).length === 0) return
      this.pending = true
      setTimeout(async () => {
        try {
          let result = await http.settings({ repository }, { token: this.$store.state.accessToken })
          let { data, Status } = result
          if (Status.code === 0) {
            this.$store.commit('updateAuthByInfo', data)
            this.$message.success('保存成功！')
            this.pending = false
            return
          }
          this.$message.warning(Status.message)
        
        } catch (error) {
          this.$message.error(error.message)
        }
        this.pending = false
      }, 800)
    }
  }
}

</script>

<style lang="scss" scoped>
.iconfont {
  margin-right: 6px;
  font-size: 22px;

  &.icon-CN_codingnet {
    margin-right: 4px;
    font-size: 28px;
  }
}
.table-line:first-of-type {
  min-height: 100px;
}
.flex-column {

  p {
    line-height: 1.6;
    font-size: 14px;
  }
}
</style>
