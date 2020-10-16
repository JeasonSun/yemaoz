import Koa from 'koa'
import path from 'path'
import { ConnectMongo } from './db/mongo.db'
import koaLogger from 'koa-logger'
import cors from '@koa/cors'
import catchError from '~/middleware/exception'
import bodyParser from 'koa-bodyparser'
import koaStatic from 'koa-static'
import views from 'koa-views'
import config from './plugin/config-util'
import KoaSession from 'koa-session'
import jwtKoa from 'koa-jwt'
import router from './routes'
import { responseFormat } from '~/middleware/responseFormat'

/**
 * 创建Koa的实例
 */
async function createApp () {
  const app = new Koa()

  // 初始化配置
  config.initApp(app)

  // 初始化mongodb
  const connection = await ConnectMongo()
  // console.log(connection)

  // session存储配置
  
  const sessionConfig = config.getItem('sessionConfig');
  const session = KoaSession(sessionConfig, app)
  app.keys =  config.getItem('sessionKeys');

  // 使用session中间件，注意有先后顺序
  app.use(session)

  /**
   * 配置JWT 
   * 删除了JWT：因为JWT和session有些冲突，当前后端分离后，开启JWT，用token验证
   * 加验证
   * 白名单：
   *    1. 普通非api开头的路径
   *    2. api/account/login
   *    3. api/user/register
   *    4. api/account/info
   **/ 

  // app.use(
  //   jwtKoa({ secret: config.getItem('tokenSecretKey'), debug: true }).unless({
  //     path: [
  //       /^(?!(\/api))/,
  //       /\/api\/account\/login/,
  //       /\/api\/user\/register/,
  //       /\/api\/account\/info/
  //     ]
  //   })
  // )

  // 配置控制台日志中间件
  app.use(koaLogger())

  // 添加统一的返回格式  ctx.success ctx.fail
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
