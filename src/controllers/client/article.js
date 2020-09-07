async function articleDetail (ctx) {
  const title = '文章详情'
  await ctx.render('client/page/article', {
    title,
    detail: {
      id: 432432423,
      name: 'VSCode插件大全',
      category: [{
        id:1,
        name: '源码分析'
      }],
      create_time: '1529462887135',
      update_time: '1599475887135',
      tag:[{
        id:1,
        name: '标签一',
      }]
    }
  })
}
export default {
  articleDetail
}
