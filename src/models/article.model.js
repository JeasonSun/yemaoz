import mongoose, { Schema } from 'mongoose'

const ArticleSchema = new Schema(
  {
    _id: Number,
    slug: String,
    title: String,
    description: String,
    book_id: {
      type: Number,
      ref: 'Category'
    },
    public: Number, // 是否公开
    y_status: {
      // 夜猫子的状态： [0-未同步,1-已同步]
      type: Number,
      default: 0
    },
    y_publish: {
      // 是否发布
      type: Number,
      default: 0
    },
    body: String,
    body_draft: String,
    body_html: String,
    body_lake: String,
    format: {
      type: String,
      enum: ['lake', 'markdown'],
      default: 'markdown'
    },
    user_id: Number, // 语雀的用户ID
    content_updated_at: Date,
    created_at: Date,
    updated_at: Date
  },
  {
    id: false,
    collection: 'articles'
  }
)

const articleModel = mongoose.model('Article', ArticleSchema)

export default articleModel
