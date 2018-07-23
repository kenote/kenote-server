import mongoose, { Schema } from 'mongoose'
import MongooseDao from 'mongoosedao'

const schema = new Schema({
  // 自动编号
  id: { 
    type: Number, 
    default: 0, 
    index: { unique: true } 
  },
  // 用户组名
  name: { 
    type: String, 
    required: true 
  },
  // 用户组等级
  level: { 
    type: Number, 
    default: 0 
  },
  // Store 配置
  store: {
    type: Schema.Types.ObjectId,
    ref: 'store'
  }
})

export default new MongooseDao(mongoose.model('group', schema))