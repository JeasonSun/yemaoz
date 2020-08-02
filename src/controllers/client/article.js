async function articleDetail (ctx) {
  const title = '文章详情'
  await ctx.render('client/page/article', {
    title
  })
}
export default {
  articleDetail
}
