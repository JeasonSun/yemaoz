import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

export const ROLE = {
  user: 8,
  admin: 16,
  superAdmin: 32
}

const SALT_WORK_FACTOR = 10
/**
 * 用户模型
 */
const UserSchema = new Schema(
  {
    // 用户类别
    type: {
      type: String,
      enum: ['user', 'admin', 'superAdmin'],
      default: 'user'
    },

    uuid: {
      type: String
    },

    // 用户名
    username: {
      type: String,
      trim: true,
      unique: true,
      required: true
    },

    // 昵称
    nickname: {
      type: String,
      trim: true
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
      type: String
    },

    meta: {
      createAt: {
        type: Date,
        default: Date.now()
      },
      updateAt: {
        type: Date,
        default: Date.now()
      }
    }

    // 角色
    // role: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Roles'
    // }
  },
  {
    id: false,
    collection: 'users',
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

UserSchema.pre('save', function (next) {
  let user = this

  if (!user.isModified('password')) return next()

  // 如果是修改密码，
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(error)
      user.password = hash
      next()
    })
  })
})

UserSchema.methods = {
  comparePassword: function (_password, password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, function (err, isMatch) {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}

UserSchema.virtual('scope').get(function () {
  return ROLE[this.type]
})

const usersModel = mongoose.model('Users', UserSchema)

export default usersModel
