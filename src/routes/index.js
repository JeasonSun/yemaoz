import Router from 'koa-router'
import ApiRoute from './api'
import ClientRoute from './client'
import AdminRoute from './admin'

const router = new Router()

// 前端展示路由
router.use(ClientRoute.routes(), ClientRoute.allowedMethods())

// 后台页面路由
router.use(AdminRoute.routes(), AdminRoute.allowedMethods())

// API路由
router.use(ApiRoute.routes(), ApiRoute.allowedMethods())


export default router
