import Router from 'koa-router'
// import Dashboard from '~/controllers/admin/dashboard.js'
import Users from '~/controllers/admin/users'

const router = new Router({
  prefix: '/admin'
})

router.get('/users/list', Users.list)
router.post('/users/create', Users.create)
router.get('/users/:id', Users.one)
router.put('/users/:id', Users.update)
router.delete('/users/:id', Users.remove)

// router.get('/dashboard', Dashboard.indexPage)

export default router
