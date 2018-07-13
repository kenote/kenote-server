import mongoose, { Schema } from 'mongoose'
import MongooseDao from 'mongoosedao'

const schema = new Schema({
  // 模型名称
  model: { 
    type: String, 
    required: true, 
    index: { unique: true } 
  },
  // 自增长ID
  seq: { 
    type: Number, 
    default: 0 
  }
})

export default new MongooseDao(mongoose.model('seq', schema))