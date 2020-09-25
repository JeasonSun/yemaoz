import { getRepos } from '~/tasks/yuque'
import { CategoryDao } from '~/dao/category.dao'

const cateDao = new CategoryDao()

async function list (ctx) {}

async function create (ctx) {}

async function update (ctx) {}

async function detail (ctx) {}

// 从语雀中同步数据
async function fetch (ctx) {
  // 1.拉取数据
  const repos = await getRepos()
  const list = (repos && repos.data) || []
  await Promise.all(
    list.map(cate => {
      return cateDao.save(cate)
    })
  )

  ctx.success({
    list: repos && repos.data
  })
}

export default {
  fetch
}
