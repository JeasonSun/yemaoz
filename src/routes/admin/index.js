import Router from 'koa-router'
import Dashboard from '~/controllers/admin/dashboard.js'

const AdminRoute = new Router()
AdminRoute.prefix('/admin')

AdminRoute.get('/dashboard', Dashboard.indexPage)

export default AdminRoute
