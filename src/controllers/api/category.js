import _ from 'lodash'
import { getRepos, getDocs } from '~/tasks/yuque'
import { CategoryDao } from '~/dao/category.dao'
import { ArticleDao } from '~/dao/article.dao'

const cateDao = new CategoryDao()
const articleDao = new ArticleDao()

/**
 * 从语雀中同步分组的状态
 * 查看是否有更新
 * 语雀中新建组，或者更新了内容都会导致Repo的更新
 * 由此可以通知同步分组下的所有文章Docs的同步更新
 * @param {*} ctx
 */
async function list (ctx) {
  // 1.拉取数据
  const repos = await getRepos()
  const list = (repos && repos.data) || []
  const allList = await Promise.all(
    list.map(cate => {
      return cateDao.save(cate)
    })
  )

  ctx.success({
    list: allList
  })
}

// 从语雀中同步数据
async function updateArticlesByCategoryId (ctx) {
  // 1. 获取ID
  const id = _.get(ctx.request.body, 'id')
  if (!id) {
    return ctx.fail('id不能为空')
  }
  // 2.查看是否存在该category
  const cate = await cateDao.findById(id)
  if (!cate) {
    return ctx.fail(`不存在id为${id}的分类`)
  }
  // 3. 根据ID获取并且更新所有的文章
  const articles = await getDocs(id)
  const list = (articles && articles.data) || []
  const updated = await Promise.all(
    list.map(article => {
      return articleDao.create(article)
    })
  )

  const dirtyList = updated.filter(article => article.y_status === 0)

  // const result = await Promise.all(
  //   dirtyList.map(async(article) => {
  //     const detail = await
  //     return articleDao.update(article)
  //   })
  // )

  ctx.success({
    list: dirtyList
  })
}

export default {
  list,
  updateArticlesByCategoryId
}
