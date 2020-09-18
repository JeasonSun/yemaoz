import Koa from 'koa'
import path from 'path'
import koaLogger from 'koa-logger'
import cors from '@koa/cors'
import catchError from '~/middleware/exception'
import bodyParser from 'koa-bodyparser'
import koaStatic from 'koa-static'
import views from 'koa-views'
import config from './plugin/config-util'
import router from './routes'
import { responseFormat } from '~/middleware/responseFormat'

/**
 * 创建Koa的实例
 */
async function createApp () {
  const app = new Koa()

  // 初始化配置
  config.initApp(app)

  // session存储配置

  // 配置session中间件

  // 配置JWT

  // 配置控制台日志中间件
  app.use(koaLogger())
  app.use(responseFormat())


  // 配置跨域
  app.use(cors())

  // 全局错误捕捉
  app.use(catchError)

  // 配置bodyParser
  app.use(bodyParser())

  // 配置静态资源
  app.use(koaStatic(path.join(__dirname, './public')))

  // 配置服务端模板渲染引擎
  app.use(
    views(path.join(__dirname, './views'), {
      map: { html: 'ejs' }
    })
  )

  // 配置路由
  app.use(router.routes(), router.allowedMethods())

  

  return app
}

export { createApp }
