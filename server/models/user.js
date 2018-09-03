import mongoose, { Schema } from 'mongoose'
import MongooseDao from 'mongoosedao'

const schema = new Schema({
  // 自动编号
  id: { 
    type: Number, 
    default: 0, 
    index: { unique: true } 
  },
  // 用户名
  username: { 
    type: String
  },
  // 昵称
  nickname: {
    type: String
  },
  // 邮箱
  email: {
    type: String
  },
  // 头像
  avatar: {
    type: String
  },
  // 性别
  sex: {
    type: Number,
    default: 0
  },
  // 个人简介
  intro: {
    type: String
  },
  // 个人网站
  website: {
    type: String
  },
  // 代码仓库
  repository: {
    type: Object,
    default: {  }
  },
  // 微信二维码
  wx_qrcode: {
    type: String
  },
  // 手机
  phone: {
    type: String
  },
  // 号码绑定
  binds: {
    type: Array,
    default: []
  },
  // 默认编辑器
  editor: {
    type: String,
    default: 'markdown'
  },
  // 密码加密值
  encrypt: {
    type: String
  },
  // 密码加密盐
  salt: {
    type: String
  },
  // 帐号创建时间
  createAt: {
    type: Date, 
    default: Date.now
  },
  // 帐号更新时间
  updateAt: {
    type: Date, 
    default: Date.now
  },
  // JWT 密钥
  jwToken: {
    type: String
  },
  // 用户修改密码的密钥
  retrieveKey: {
    type: String
  },
  // 用户修改密码的申请时间
  retrieveTime: {
    type: Number,
    default: 0
  },
  // 是否锁定
  lock: { 
    type: Boolean, 
    default: false 
  },
  // 是否冻结
  freeze: { 
    type: Boolean, 
    default: false 
  },
  // 最后登录时间
  lastTime: {
    type: Date, 
    default: Date.now
  },
  // 最后在线时间
  lastOnlineTime: {
    type: Date, 
    default: Date.now
  },
  // 在线时长
  onlineDuration: {
    type: Number, 
    default: 0
  },
  // 所属用户组
  group: {
    type: Schema.Types.ObjectId,
    ref: 'group'
  }
})

export default new MongooseDao(mongoose.model('user', schema))