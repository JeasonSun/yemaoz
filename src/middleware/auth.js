import jwt from 'jwt-simple'
import config from '~/plugin/config-util'
import { AuthFailed } from '~/plugin/http-exception'

export const USER = 8
export const ADMIN = 16
export const SUPER_ADMIN = 32

class Auth {
  constructor (level) {
    this.level = level || 1
  }

  get m () {
    return async (ctx, next) => {
      let token = ctx.header.authorization

      let errMsg = '无效的token'
      if (!token) {
        errMsg = '需要携带token值'
        throw new AuthFailed(errMsg)
      }
      //使用jwt-simple自行解析数据
      const jwtSecret = config.getItem('tokenSecretKey')
      let decode = {}
      try {
        decode = jwt.decode(token.split(' ')[1], jwtSecret)
      } catch (error) {
        console.log(error)
        throw new AuthFailed(error)
      }

      if(decode.scope < this.level){
        errMsg = '权限不足'
        throw new AuthFailed(errMsg)
      }
      ctx.auth = {
        uid: decode.id,
        scope: decode.scope,
        username: decode.username,
        nickname: decode.nickname,
      }

      await next()
    }
  }
}

export default Auth
