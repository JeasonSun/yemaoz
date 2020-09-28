async function indexPage (ctx) {
  const title = 'admin page'
  console.log('object')
  await ctx.render('admin/dashboard', {
    title
  })
}
export default {
  indexPage
}
