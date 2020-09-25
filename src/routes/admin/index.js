import Router from 'koa-router'
// import Dashboard from '~/controllers/admin/dashboard.js'
import Admin from '~/controllers/cms/admin'
import User from '~/controllers/cms/user'
import Account from '~/controllers/cms/account'
import Article from '~/controllers/cms/article'
import Category from '~/controllers/cms/category'


const router = new Router({
  prefix: '/cms'
})

router.post('/admin/create', Admin.create)

router.post('/user/register', User.register)

router.post('/account/login', Account.login)
router.post('/account/logout', Account.logout)
router.get('/account/info', Account.info)

router.get('/article/repos', Article.repos)
router.get('/article/docs', Article.docs)
router.post('/category/fetch', Category.fetch)

// router.get('/users/list', Admin.list)
// router.get('/users/:id', Admin.one)
// router.put('/users/:id', Admin.update)
// router.delete('/users/:id', Admin.remove)

// router.get('/dashboard', Dashboard.indexPage)

export default router
