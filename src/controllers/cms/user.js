import { RegisterValidator } from '~/validators/users.validator'
import { UserDao } from '~/dao/user.dao'

const userDao = new UserDao()

/**
 * 创建普通用户
 * @param {Object} ctx
 *        {String}
 * @param {Object} res
 */
async function register (ctx) {
  // 通过验证器校验参数是否通过
  const v = await new RegisterValidator().validate(ctx)
  const user = await userDao.save({
    email: v.get('body.email'),
    password: v.get('body.password2'),
    username: v.get('body.username'),
    nickname: v.get('body.nickname'),
    type: 'user'
  })

  //返回结果
  ctx.success(user)
}

export default { register }
