import { getRepos, getDocs } from '~/tasks/yuque'

// 获取库中已经保存的文章列表
async function list(ctx){
  

}

async function create(ctx){
  
}

// 同步更新文章列表
async function update(ctx){

}

//
async function publish(ctx){

}

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

export default {
  repos,
  docs,
  list
}
