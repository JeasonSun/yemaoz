import Router from 'koa-router'
import AdminRoute from './admin'
import ClientRoute from './client'

const router = new Router()
// 后台管理路由
router.use(AdminRoute.routes(), AdminRoute.allowedMethods())

// 前端展示路由
router.use(ClientRoute.routes(), ClientRoute.allowedMethods())

export default router
