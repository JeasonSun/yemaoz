import Router from 'koa-router'
import User from '~/controllers/admin/user.js'
import Dashboard from '~/controllers/admin/dashboard.js'


const router = new Router({
  prefix: '/admin'
})

// 登录页
router.get('/login', User.login)

// 登出页

// 欢迎页面
router.get('/dashboard', Dashboard.home)

// 分类
router.get('/category', Dashboard.category)

// 某分类下的文章列表
router.get('/category/:id', Dashboard.list)


export default router
