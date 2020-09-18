function responseFormat (option = {}) {
  return async function (ctx, next) {
    ctx.success = function (data, msg) {
      ctx.type = option.type || 'json'
      ctx.body = JSON.stringify({
        code: option.successCode || 0,
        msg: msg || option.successMsg || 'success',
        data: data
      })
    }

    ctx.fail = function (msg, errorCode, code) {
      ctx.type = option.type || 'json'
      let errorMsg = msg || option.errorMsg || 'fail'
      errorMsg = [].concat(errorMsg)

      ctx.body = JSON.stringify({
        code: errorCode || option.errorCode || 10000,
        msg: errorMsg
      })
      ctx.response.status = code
    }

    await next()
  }
}

export { responseFormat }
