import articleModel from '~/models/article.model'
import moment from 'moment'
import { getDocs } from '~/tasks/yuque'
import { DATEFORMAT } from '~/models/model.util'

class ArticleDao {
  async create (data) {
    const { id, ...rest } = data
    const article = await articleModel.findById(id)

    let updatedArticle = article
    if (article) {
      const yuqueLastDate = moment(data.updated_at).format(DATEFORMAT)
      // const yemaozLastDate = moment(article.updated_at).toString()
      console.log(yuqueLastDate, article.updated_at)
      // 如果上次更新时间和本次不相同，需要更新
      if (yuqueLastDate !== article.updated_at) {
        updatedArticle = await articleModel.update(
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

  async fetchList (id) {
    const articles = await getDocs(id)
    const list = (articles && articles.data) || []
    const localList = await Promise.all(
      list.map(article => {
        return this.create(article)
      })
    )
    return localList

    // const dirtyList = updated.filter(article => article.y_status === 0)
  }
}

export { ArticleDao }
