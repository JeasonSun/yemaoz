import { RegisterValidator } from '~/validators/users.validator'
import { UserDao } from '~/dao/user.dao'

const userDao = new UserDao()


/**
 * 创建管理员用户
 * @param {Object} ctx
 *        {String}
 * @param {Object} res
 */
async function create (ctx) {
  // 通过验证器校验参数是否通过
  const v = await new RegisterValidator().validate(ctx)
  // 创建管理员
  const admin = await userDao.save({
    email: v.get('body.email'),
    password: v.get('body.password2'),
    username: v.get('body.username'),
    nickname: v.get('body.nickname'),
    type: 'admin'
  })

  //返回结果
  ctx.success(admin)
}

export default { create }
