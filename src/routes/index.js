import Router from 'koa-router'
import AdminRoute from './admin'

const router = new Router()
router.use(AdminRoute.routes(), AdminRoute.allowedMethods())

export default router
