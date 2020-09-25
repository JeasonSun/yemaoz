import jwt from 'jsonwebtoken'
import config from '~/plugin/config-util'
import { AuthFailed } from '../http-exception'
/***
 *
 */
const findMembers = function (instance, { prefix, specifiedType, filter }) {
  // 递归函数
  function _find (instance) {
    //基线条件（跳出递归）
    if (instance.__proto__ === null) return []

    let names = Reflect.ownKeys(instance)
    names = names.filter(name => {
      // 过滤掉不满足条件的属性或方法名
      return _shouldKeep(name)
    })

    return [...names, ..._find(instance.__proto__)]
  }

  function _shouldKeep (value) {
    if (filter) {
      if (filter(value)) {
        return true
      }
    }
    if (prefix) if (value.startsWith(prefix)) return true
    if (specifiedType) if (instance[value] instanceof specifiedType) return true
  }

  return _find(instance)
}

/**
 * 签发token
 * @param {*} uid  用户ID
 * @param {*} scope 权限
 */
const generateToken = function (data) {
  const secretKey = config.getItem('tokenSecretKey')
  const expiresIn = config.getItem('tokenExpiresIn')
  const token = jwt.sign(data, secretKey, {
    expiresIn: expiresIn
  })
  return token
}

const checkToken = async function (token) {
  const secretKey = config.getItem('tokenSecretKey')
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, res)=>{
      if(!err){
        return resolve(res)
      }else {
        console.log(err)
        return reject(new AuthFailed('token验证失败'))
      }
    })
  })
}

export { findMembers, generateToken, checkToken }
