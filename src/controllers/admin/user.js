import { LoginValidator } from '~/validators/account.validator'
/**
 * 用户登录
 */
async function login (ctx) {
  ctx.success('login')
  return ctx.render('admin/page/login', {
    title: '用户登录'
  })
}

/**
 * 用户登出
 */
async function logout (ctx) {
  ctx.success('logout')
}

export default { login, logout }
