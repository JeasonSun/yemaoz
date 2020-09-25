import { HttpException } from '~/plugin/http-exception'

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // 开发环境
    const isHttpException = error instanceof HttpException
    // const isDev = global.config.environment === 'dev'
    // console.log(isHttpException)
    
    if (!isHttpException) {
      console.log(error)
      return ctx.fail(error.toString(), error.errorCode, 500)
    }

    // 生产环境
    // if (isHttpException) {
    //   // ctx.body = {
    //   //   msg: error.msg,
    //   //   error_code: error.errorCode,
    //   //   request: `${ctx.method} ${ctx.path}`
    //   // }
    //   // ctx.response.status = error.code
    //   // console.log('-----捕捉错误');
    //   ctx.fail(error.msg, error.errorCode, error.code || 500)
    // } else {
    //   ctx.body = {
    //     msg: '未知错误！',
    //     error_code: 9999,
    //     request: `${ctx.method} ${ctx.path}`
    //   }
    //   ctx.response.status = 500
    // }
    // ctx.fail(error.msg, error.errorCode, error.code || 500)
    ctx.fail(error.msg, error.errorCode, 200)

  }
}

export default catchError
