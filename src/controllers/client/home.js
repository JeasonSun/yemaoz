async function indexPage (ctx) {
  const title = '夜猫子前端日记'
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => ({
    id: i + '' + Math.floor(Math.random() * 99999999),
    thumb: '',
    name: 'VSCode插件大全' +i,
    author: '摩诘',
    category: [
      {
        id: 1,
        name: '源码分析'
      }
    ]
  }))
  return ctx.render('client/page/home', {
    title,
    latest: list
  })
}
export default {
  indexPage
}
