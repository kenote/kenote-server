<template>
  <div class="page">
    <form v-on:submit.prevent="settingSave">
      <el-row>
        <el-col :span="6">
          <div class="avatar">
            <img :src="$store.state.avatarUrl + $store.state.authUser.avatar" v-if="$store.state.authUser.avatar" ref="avatar" />
            <img src="~/assets/img/default_beauty.jpg" v-else-if="$store.state.authUser.sex === 2" />
            <img src="~/assets/img/default_handsome.jpg" v-else />
          </div>
        </el-col>
        <el-col :span="18" class="avatar_update">
          <el-button type="success" plain round @click="cropperOpen">更改头像</el-button>
        </el-col>
      </el-row>
      <el-row class="table-line">
        <el-col :span="6">
          昵称
        </el-col>
        <el-col :span="18">
          <el-input v-model="formData.username" placeholder="请输入昵称"></el-input>
        </el-col>
      </el-row>
      <el-row class="table-line">
        <el-col :span="6">
          电子邮件
        </el-col>
        <el-col :span="18" v-if="$store.state.authUser.binds.indexOf('email') > -1">
          {{ formData.email }}
          <i class="el-icon-check"></i>
          <span>已验证</span>
          <a href="javascript:;" class="cancel-bind" @click="cancelBind" name="email">解除绑定</a>
        </el-col>
        <el-col :span="18" v-else>
          <el-input v-model="formData.email" placeholder="请输入邮箱地址"></el-input>
        </el-col>
      </el-row>
      <el-row class="table-line">
        <el-col :span="6">
          手机
        </el-col>
        <el-col :span="18" v-if="$store.state.authUser.binds.indexOf('phone') > -1">
          {{ formData.phone }}
          <i class="el-icon-check"></i>
          <span>已验证</span>
          <a href="javascript:;" class="cancel-bind" @click="cancelBind" name="phone">解除绑定</a>
        </el-col>
        <el-col :span="18" v-else>
          <el-input v-model="formData.phone" placeholder="请输入手机号"></el-input>
        </el-col>
      </el-row>
      <el-row class="table-line">
        <el-col :span="6">
          常用编辑器
        </el-col>
        <el-col :span="18">
          <el-radio v-model="formData.editor" label="richtext">富文本</el-radio>
          <el-radio v-model="formData.editor" label="markdown">Markdown</el-radio>
        </el-col>
      </el-row>
      <el-button native-type="submit" type="success" round class="setting-save">保存</el-button>
    </form>
    <image-cropper 
      :visible="cropperVisible" 
      :beforeClose="cropperClose" 
      :options="cropperOptions"
      v-if="cropperVisibleBefore"
    />
  </div>
</template>

<script>
import ImageCropper from '~/components/cropper.vue'

export default {
  components: {
    ImageCropper
  },
  layout: 'setting',
  middleware: 'authenticated',
  asyncData ({ store }) {
    let { authUser } = store.state
    return {
      formData: {
        username: authUser.username,
        email: authUser.email,
        phone: authUser.phone,
        editor: authUser.editor
      },
      cropperOptions: {},
      cropperVisible: false,
      cropperVisibleBefore: false
    }
  },
  methods: {
    cancelBind (e) {
      let key = e.target.name
      let binds = {
        email: '邮箱',
        phone: '手机'
      }
      this.$confirm(`确定要解绑${binds[key]}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.$message({
            type: 'success',
            message: `解绑${binds[key]}成功!`
          });
        })
        .catch(() => {
                
        })
    },
    settingSave (e) {
      console.log(Object.keys(this.formData))
    },
    cropperOpen () {
      this.cropperVisibleBefore = true
      let { authUser, avatarUrl } = this.$store.state
      setTimeout(() => {
        this.cropperVisible = true
        this.cropperOptions = {
          img: authUser.avatar ? avatarUrl + authUser.avatar : undefined, // 裁剪图片的地址
          outputSize: .6, // 裁剪生成图片的质量, 0.1 - 1
          outputType: 'jpeg', // 裁剪生成图片的格式 jpeg || png || webp
          info: true, // 裁剪框的大小信息
          canScale: true, // 图片是否允许滚轮缩放
          autoCrop: true, // 是否默认生成截图框
          autoCropWidth: 200, // 默认生成截图框宽度
          autoCropHeight: 200, // 默认生成截图框高度
          fixed: true, // 是否开启截图框宽高固定比例
          fixedNumber: [1, 1], // 截图框的宽高比例
          full: false, // 是否输出原图比例的截图
          fixedBox: true, // 固定截图框大小 不允许改变
          canMove: true, // 上传图片是否可以移动
          canMoveBox: false, // 截图框能否拖动
          original: false, // 上传图片按照原始比例渲染
          centerBox: false, // 截图框是否被限制在图片里面
          high: false, // 是否按照设备的dpr 输出等比例图片
          infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
          maxImgSize: 2000, // 限制图片最大宽度和高度
        }
      }, 0)
    },
    cropperClose (data) {
      this.cropperVisible = false
      this.cropperVisibleBefore = false
      if (data) {
        this.$store.commit('updateAuthByAvatar', data.file_name)
      }
    }
  }
}

</script>

<style lang="scss" scoped>

.table-line .el-col-18 .el-input {
  width: 188px;
}

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
