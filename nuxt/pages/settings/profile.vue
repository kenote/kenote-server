<template>
  <div class="page">
    <form v-on:submit.prevent="settingSave">
      <el-row class="table-line">
        <el-col :span="6">
          性别
        </el-col>
        <el-col :span="18">
          <el-radio v-model="formData.sex" :label="1">男</el-radio>
          <el-radio v-model="formData.sex" :label="2">女</el-radio>
          <el-radio v-model="formData.sex" :label="0">保密</el-radio>
        </el-col>
      </el-row>
      <el-row class="table-line">
        <el-col :span="6">
          个人简介
        </el-col>
        <el-col :span="18">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="填写你的个人简介"
            :autosize="{ minRows: 4, maxRows: 4 }"
            resize="none"
            v-model="formData.intro"
            >
          </el-input>
        </el-col>
      </el-row>
      <el-row class="table-line">
        <el-col :span="6">
          个人网站
        </el-col>
        <el-col :span="18" class="flex-column">
          <el-input placeholder="http://你的网址" v-model="formData.website"></el-input>
          <p class="pull-right">填写后会在个人主页显示图标</p>
        </el-col>
      </el-row>
      <el-row class="table-line">
        <el-col :span="6">
          微信二维码
        </el-col>
        <el-col :span="18" class="flex-row">
          <el-button type="success" plain round>更改图片</el-button>
          <p class="pull-right">上传后会在个人主页显示图标</p>
        </el-col>
      </el-row>
      <el-row class="table-line">
        <el-col :span="6">
          社交帐号
        </el-col>
        <el-col :span="18" class="social-bind">
          <p>你可以通过绑定的社交帐号登录。出于安全因素, 你最初用来创建账户的社交帐号不能移除。</p>
          <ul class="social-bind-list">
            <li v-for="sns in socialBinds">
              <div class="bind-name">
                <i class="icon iconfont" :class="sns.icon"></i>
                <a :href="sns.link">
                  {{ sns.name }}
                  <i class="el-icon-arrow-right"></i>
                </a>
              </div>
            </li>
          </ul>
        </el-col>
      </el-row>
      <el-button native-type="submit" type="success" round class="setting-save">保存</el-button>
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
        sex: authUser.sex || 0,
        intro: authUser.intro,
        website: authUser.website
      },
      socialBinds: [
        { name: '绑定微博', link: 'javascript:;', icon: 'icon-weibo' },
        { name: '绑定微信', link: 'javascript:;', icon: 'icon-wechat-fill' },
        { name: '绑定 QQ', link: 'javascript:;', icon: 'icon-QQ' },
        { name: '绑定 github', link: 'javascript:;', icon: 'icon-github-fill' },
        { name: '绑定 Google+', link: 'javascript:;', icon: 'icon-google-plus' },
        { name: '绑定 豆瓣', link: 'javascript:;', icon: 'icon-douban' }
      ],
      pending: false
    }
  },
  methods: {
    settingSave (e) {
      let info = {}
      for (let key in this.formData) {
        if (!isNull(this.formData[key])) {
          info[key] = this.formData[key]
        }
      }
      this.pending = true
      setTimeout(async () => {
        try {
          let result = await http.settings(info, { token: this.$store.state.accessToken })
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

.avatar {
  width: 100px;
  height: 100px;
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 50%;
  }
}

.avatar_update {
  height: 100px;
  display: flex;
  align-items: center;
}
</style>
