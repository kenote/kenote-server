import mongoose, { Schema } from 'mongoose'
import MongooseDao from 'mongoosedao'

const schema = new Schema({
  // 自动编号
  id: { 
    type: Number, 
    default: 0, 
    index: { unique: true } 
  },
  // 上传文件类型
  upload_type: { 
    type: Array, 
    default: [] 
  },
})

export default new MongooseDao(mongoose.model('store', schema))