import jwt from 'jsonwebtoken'
import crypto from 'crypto'
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

// 颁布令牌
const generateToken = function (uid, scope) {
  const secretKey = global.config.security.secretKey
  const expiresIn = global.config.security.expiresIn
  const token = jwt.sign(
    {
      uid,
      scope
    },
    secretKey,
    {
      expiresIn: expiresIn
    }
  )
  return token
}


/**
 * 进行SHA1加密
 * @param { String } value 原值
 * @return { String } SHA1 值
 */

 const toSha1 = function(value){
   const sha1 = crypto.createHash('sha1')
   sha1.update(value)
   return sha1.digest('hex')
 }

export { findMembers, generateToken, toSha1 }
