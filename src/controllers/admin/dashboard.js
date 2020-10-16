import { CategoryDao } from '~/dao/category.dao'
import { ArticleDao } from '~/dao/article.dao'


const cateDao = new CategoryDao()
const articleDao = new ArticleDao()
/**
 * 后台管理首页
 */
async function home (ctx) {
  const { session } = ctx
  const { userInfo, isLogin } = session
  if (!isLogin) {
    return ctx.redirect('/admin/login')
  }

  return ctx.render('admin/page/dashboard', {
    title: '后台管理首页',
    userInfo
  })
}

async function list (ctx) {
  const { session } = ctx
  const { userInfo, isLogin } = session
  if (!isLogin) {
    return ctx.redirect('/admin/login')
  }

  const categoryId = +ctx.params.id

  // 查看是否存在该category
  let cate
  try {
    cate = await cateDao.findById(categoryId)
  } catch (error) {}
  cate = cate || {
    name: '未知分类',
    description: '请检查分类ID'
  }

  let list = []
  // 如果数据库中存在，才能获取_id
  if (cate._id) {
    // 根据ID获取并且更新所有的文章
      list = await articleDao.fetchList(cate._id) || []
  }

  console.log(list,'===')

  return ctx.render('admin/page/list', {
    title: '语雀知识库',
    userInfo,
    menu: 'yuque',
    category: cate,
    list: list
    // category
  })
}

async function category (ctx) {
  const { session } = ctx
  const { userInfo, isLogin } = session
  if (!isLogin) {
    return ctx.redirect('/admin/login')
  }

  const list = await cateDao.fetchList()

  return ctx.render('admin/page/category', {
    title: '语雀知识库',
    userInfo,
    menu: 'yuque',
    list
  })
}

export default { home, category, list }
