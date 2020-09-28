import articleModel from '~/models/article.model'
import moment from 'moment'

class ArticleDao {
  async create (data) {
    const { id, ...rest } = data
    const article = await articleModel.findById(id)

    let updatedArticle = article
    if (article) {
      const yuqueLastDate = moment(data.updated_at).toString()
      const yemaozLastDate = moment(article.updated_at).toString()
      // 如果上次更新时间和本次不相同，需要更新
      if (yuqueLastDate !== yemaozLastDate) {
        updatedCategory = await articleModel.update(
          { _id: id },
          { y_status: 0, ...rest }
        )
        console.log('更新')
      } else {
        console.log('不需要更新')
      }
    } else {
      // 创建
      console.log('创建', article)
      updatedArticle = await articleModel.create({ _id: id, ...rest })
    }
    return updatedArticle
  }

  async update (data) {
    // 不需要更新的可以排除在rest之外
    const { id, ...rest } = data
    const updateAttribute = {
      y_status: 1
    }
    const updated = await articleModel.update(
      { _id: id },
      { ...rest, ...updateAttribute }
    )
    return updated
  }

  async isDirty (id, updatedAt) {
    const article = await articleModel.findById(id)
    if (!article) {
      return true
    }
    const yuqueLastDate = moment(updatedAt).toString()
    const yemaozLastDate = moment(article.updated_at).toString()
    return yuqueLastDate !== yemaozLastDate
  }

  async createOrUpdate (data) {}
}

export { ArticleDao }
