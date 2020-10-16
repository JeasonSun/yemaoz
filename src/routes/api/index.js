import Router from 'koa-router'
// import Auth from '~/middleware/auth'
// import Dashboard from '~/controllers/admin/dashboard.js'
import Admin from '~/controllers/api/admin'
import User from '~/controllers/api/user'
import Account from '~/controllers/api/account'
import Article from '~/controllers/api/article'
import Category from '~/controllers/api/category'

const router = new Router({
  prefix: '/api'
})

router.post('/account/login', Account.login)
router.get('/account/info', Account.info)

router.post('/admin/create', Admin.create)
router.post('/user/register', User.register)

router.post('/account/logout', Account.logout)

router.get('/article/repos', Article.repos)
router.get('/article/docs', Article.docs)
router.post('/article/fetch', Article.fetch)
router.get('/category/list', Category.list)
router.post('/category/update', Category.updateArticlesByCategoryId)

// router.get('/users/list', Admin.list)
// router.get('/users/:id', Admin.one)
// router.put('/users/:id', Admin.update)
// router.delete('/users/:id', Admin.remove)

// router.get('/dashboard', Dashboard.indexPage)

export default router
