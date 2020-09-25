import mongoose, { Schema } from 'mongoose'

const CategorySchema = new Schema(
  {
    _id: String, // 仓库编号
    type: String, // 类型
    slug: String, // 仓库路径
    name: String, // 名称
    namespace: String, // 仓库完整路径  user.login/book.slug
    description: String, // 介绍
    user_id: String, // 所属的团队
    public: Number,
    status: {
      type: Number,
      default: 0
    },
    created_at: Date,
    updated_at: Date
  },
  {
    id: false,
    collection: 'category'
  }
)

const categoryModel = mongoose.model('Category', CategorySchema)

export default categoryModel
