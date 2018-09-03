<template>
  <el-dialog 
    title="更改头像" 
    :visible="visible" 
    @open="open"
    @close="close" 
    width="680px" 
    :close-on-press-escape="false" 
    :close-on-click-modal="false" 
    >
    <el-row 
      v-loading="pending"
      element-loading-text="图片处理中"
      >
      <el-col :span="13">
        <div class="cropper-inner">
          <vue-cropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="option.info"
            :canScale="option.canScale"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :full="option.full"
            :fixedBox="option.fixedBox"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :centerBox="option.centerBox"
            :high="option.high"
            :infoTrue="option.infoTrue"
            :maxImgSize="option.maxImgSize"
            :size="1"

            @realTime="realTime"
          />
        </div>
      </el-col>
      <el-col :span="11">
        <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px'}">
          <div :style="previews.div">
            <img :src="previews.url" :style="previews.img">
          </div>
        </div>
      </el-col>
    </el-row>
    <el-progress :percentage="percent" :show-text="false" :text-inside="true" :stroke-width="6" v-if="pending"></el-progress>
    <el-row v-else>
      <el-col :span="13">
        <label class="el-button el-button--success el-button--mini" for="uploads" >更换图片</label>
        <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="loadImg">
        <el-tooltip content="还原" placement="top">
          <el-button 
            type="primary" 
            @click="refreshCrop" 
            size="mini" 
            :disabled="!option.img" 
            icon="el-icon-refresh" 
            plain
            >
          </el-button>
        </el-tooltip>
        <div :style="{ width: '48px' }" />
        <el-tooltip content="向左旋转" placement="top">
          <el-button type="primary"  @click="rotateLeft" size="mini" :disabled="!option.img" icon="iconfont icon-rotateleft_b" plain></el-button>
        </el-tooltip>
        <el-tooltip content="向右旋转" placement="top">
          <el-button type="primary"  @click="rotateRight" size="mini" :disabled="!option.img" icon="iconfont icon-rotate_b" plain></el-button>
        </el-tooltip>
      </el-col>
      <el-col :span="11">
        <div class="footer">
          <el-button size="small" @click="close">取消</el-button>
          <el-button type="primary" size="small" @click="uploadCrop">确认</el-button>
        </div>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import * as http from '~/utils/http'
import * as utils from '~/utils'

export default {
  name: 'image-cropper',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    beforeClose: {
      type: Function
    },
    options: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      pending: false,
      percent: 0,
			previews: {},
			option: {
        img: undefined, // 裁剪图片的地址
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
			},
    }
  },
  methods: {
    // 展示区数据
    realTime (data) {
      this.previews = data
    },
    // 打开 Modal
    open (evt) {
      this.option = { ...this.option, ...this.options }
    },
    // 关闭 Modal
    close (evt, value) {
      this.beforeClose(value)
    },
    // 重置
    refreshCrop () {
      this.$refs.cropper.refresh()
    },
    // 左转
		rotateLeft () {
			this.$refs.cropper.rotateLeft()
    },
    // 右转
		rotateRight () {
			this.$refs.cropper.rotateRight()
    },
    // 更换图片
    loadImg (e) {
      let file = e.target.files[0]
			if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        this.$message({
          type: 'warning',
          message: `图片类型必须是.gif,jpeg,jpg,png,bmp中的一种!`
        })
				return false
			}
			let reader = new FileReader()
			reader.onload = (e) => {
				let data
				if (typeof e.target.result === 'object') {
					// 把Array Buffer转化为blob 如果是base64不需要
					data = window.URL.createObjectURL(new Blob([e.target.result]))
				} else {
					data = e.target.result
        }
				this.option.img = data
			}
			// 转化为blob
			reader.readAsArrayBuffer(file)
    },
    // 执行上传
    uploadCrop (evt) {
      if (utils.isNull(this.previews.url)) {
        this.close(evt)
        return
      }
      this.$refs.cropper.getCropBlob((blob) => {
        let files = []
        files.push(blob)
        this.pending = true
        this.percent = 0
        setTimeout(async () => {
          try {
            let result = await http.upload({ type: 'avatar' }, files, this.handlePercent, { token: this.$store.state.accessToken })
            let { data, Status } = result
            if (Status.code === 0) {
              setTimeout(() => {
                this.close(evt, data)
              }, 1500)
              
              //this.$store.commit('updateAuthByAvatar', data.file_url)
              return
            }
            this.$message.warning(Status.message)
          } catch (error) {
            this.$message.error(error.message)
          }
          
        }, 800)

      })
    },
    // 监听上传进度
    handlePercent (percent) {
      this.percent = percent
      if (percent === 100) {
        setTimeout(() => {
          this.pending = false
        }, 1500)
      }
    }

  }
}
</script>

<style lang="scss" scoped>

    .el-progress {
      width: 100%;
      //margin-left: 40px;
      //margin-right: 20px;
      margin-top: 25px;
      height: 32px;
      display: flex;
      align-items: center;

      .el-progress-bar__inner {
        transition: all .8s;
      }
    }
.el-row {
  padding: 0;

  .el-col-13 {
    display: flex;
    justify-content: space-between;

    .el-button--mini {

      &:nth-of-type(2) {
        font-size: 14px;
      }
    }
  }

  .el-col-11 {
    display: flex;
    justify-content: center;

    .footer {
      width: 100%;
      text-align: right;
      padding-right: 15px;

      button {
        margin-left: 20px;
      }
    }
  }

  &:nth-of-type(2)  {
    margin-top: 25px;
  }

  .cropper-inner {
    width: 100%;
    height: 280px;
  }

  .show-preview {
    overflow: hidden;
    margin: 30px 0 0 40px;

    &>div {
      border: 1px #b5b0b0 solid;
      background-color: #000;
      border-radius: 50%;
      overflow: hidden;
    }
  }
}
</style>
