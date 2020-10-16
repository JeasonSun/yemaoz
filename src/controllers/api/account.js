import { LoginValidator } from '~/validators/account.validator'
import { UserDao } from '~/dao/user.dao'
import { generateToken } from '~/plugin/utils/index'
import { use } from 'marked'

const userDao = new UserDao()

/**
 * 用户登录
 */
async function login (ctx) {
  const v = await new LoginValidator().validate(ctx)
  const email = v.get('body.email')
  const password = v.get('body.password')

  // 查找是否有这个用户
  const user = await userDao.findUser({ email })

  if (!user) {
    return ctx.fail('用户不存在，请输入正确账号')
  }

  const isMatch = await userDao.compare(password, user.password)

  if (!isMatch) {
    return ctx.fail('账号和密码不匹配')
  }

  const userInfo = {
    id: user._id,
    type: user.type,
    email: user.email,
    username: user.username,
    nickname: user.nickname,
    scope: user.scope
  }

  let session = ctx.session
  session.isLogin = true
  session.userInfo = userInfo

  // const token = generateToken(userInfo)

  
  // //返回结果
  return ctx.success({
    userId: user._id
  })
}

/**
 * 用户登出
 */
async function logout (ctx) {
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

/**
 * 获取用户信息
 * @param ctx
 */
async function info (ctx) {
  // 获取用户ID
  const id = ctx.auth.uid

  // 查询用户信息
  const userInfo = await userDao.findUser({ _id: id })
  const { email, nickname, scope, type, username, id: _id } = userInfo

  ctx.success({
    email,
    nickname,
    scope,
    type,
    username,
    id
  })
}

export default { login, logout, info }
