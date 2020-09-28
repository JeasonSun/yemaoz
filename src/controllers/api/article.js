import _ from 'lodash'
import { getRepos, getDocs, getDocDetail } from '~/tasks/yuque'
import { RequiredValidator } from '~/validators/common.validator'
import { ArticleDao } from '~/dao/article.dao'

const articleDao = new ArticleDao()

// 获取库中已经保存的文章列表
async function list (ctx) {}

async function create (ctx) {}

// 同步更新文章列表
async function update (ctx) {}

//
async function publish (ctx) {}

async function repos (ctx) {
  // 权限
  //
  const list = await getRepos()
  ctx.success({
    list: list
  })
}

async function docs (ctx) {
  const list = await getDocs()
  ctx.success({
    list: list
  })
}

async function fetch (ctx) {
  const v = await new RequiredValidator(['repoId', 'id']).validate(ctx)
  const id = v.get('body.id')
  const repoId = v.get('body.repoId')
  const detail = await getDocDetail(repoId, id)
  const content = (detail && detail.data) || {}
  if (!content.id) {
    // 没有相关的文章
    return ctx.fail(`不存在repoId:${repoId} id:${id}的文章`)
  }
  // 开始更新内容
  const updated = await articleDao.update(content)
  if (updated.ok !== 1) {
    return ctx.fail('更新失败，请重试')
  }
  ctx.success(content, '更新成功')
}

export default {
  repos,
  docs,
  list,
  fetch
}
