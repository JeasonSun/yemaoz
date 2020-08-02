async function indexPage (ctx) {
  const title = 'home'
  await ctx.render('client/page/home', {
    title
  })
}
export default {
  indexPage
}
