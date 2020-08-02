import Router from 'koa-router'
import Home from '~/controllers/client/home.js'
import Article from '~/controllers/client/article.js'

const ClientRoute = new Router()

ClientRoute.get('/', Home.indexPage)
ClientRoute.get('/p/:id', Article.articleDetail)

export default ClientRoute
