import Router from 'koa-router'
// import Dashboard from '~/controllers/admin/dashboard.js'
import Admin from '~/controllers/cms/admin'
import User from '~/controllers/cms/user'

const router = new Router({
  prefix: '/cms'
})

router.post('/admin/create', Admin.create)

router.post('/user/register', User.register)
// router.get('/users/list', Admin.list)
// router.get('/users/:id', Admin.one)
// router.put('/users/:id', Admin.update)
// router.delete('/users/:id', Admin.remove)

// router.get('/dashboard', Dashboard.indexPage)

export default router
