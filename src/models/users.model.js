import mongoose, {Schema} from 'mongoose'
import { toSha1 } from '~/plugin/utils'

/**
 * 用户模型
 */
const usersSchema = new Schema({
  // 用户类别
  type: {
    type:String,
    enum: ['admin'],
    required: true
  },

  // 昵称
  nickname: {
    type:String,
    trim: true,
    required:true
  },

  // 邮箱
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    required: true
  },

  // 密码
  password: {
    type: String,
    set: toSha1
  },

  // 角色
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Roles'
  }
}, {
  collection: 'users',
  id: false
})

export default mongoose.model('Users', usersSchema)