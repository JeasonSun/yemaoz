/**
 * 用户登录页
 */
async function login (ctx) {
  
  return ctx.render('admin/page/login', {
    title: '用户登录'
  })
}


export default { login }
