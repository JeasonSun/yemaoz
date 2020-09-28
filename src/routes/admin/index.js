import Router from 'koa-router'
import User from '~/controllers/admin/user.js'


const router = new Router({
  prefix: '/admin'
})

router.get('/login', User.login)


export default router
