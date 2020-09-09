import { RegisterValidator } from '~/validators/users.validator'
import { UserDao } from '~/dao/user.dao'

const userDao = new UserDao()

async function list (ctx) {
  ctx.body = 'admin/users/list'
}

/**
 * 创建管理员用户
 * @param {Object} ctx
 *        {String}
 * @param {Object} res
 */
async function create (ctx) {
  // 通过验证器校验参数是否通过
  const v = await new RegisterValidator().validate(ctx)
  // console.log()
  // 创建管理员
  const admin = userDao.save({
    email: v.get('body.email'),
    password: v.get('body.password2'),
    nickname: v.get('body.nickname')
  })

  //返回结果
  ctx.response.status = 200
  ctx.body = JSON.stringify(v)
}

async function one (ctx) {
  ctx.body = 'admin/users/one'
}

async function update (ctx) {
  ctx.body = 'admin/users/update'
}

async function remove (ctx) {
  ctx.body = 'admin/users/remove'
}

export default { list, create, one, update, remove }
