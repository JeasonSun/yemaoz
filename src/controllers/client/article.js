import marked from 'marked'

async function articleDetail (ctx) {
  const title = '文章详情'

  const content = marked(`![](https://my-wechat.mdnice.com/logo.svg)

请使用 **Chrome** 浏览器。

请阅读下方文本熟悉工具使用方法，本文可直接拷贝到微信中预览。

## 1 Markdown Nice 简介

- 支持自定义样式的 Markdown 编辑器
- 支持微信公众号、知乎和稀土掘金
- 欢迎扫码回复「排版」加入用户群

![](https://my-wechat.mdnice.com/wechat.jpg)

## 2 主题

**https://preview.mdnice.com/themes/**

欢迎提交主题，提供更多文章示例~~

## 3 通用语法

### 3.1 标题

在文字写书写不同数量的#可以完成不同的标题，如下：`)
  return ctx.render('client/page/article', {
    title,
    detail: {
      id: 432432423,
      name: 'VSCode插件大全测试',
      category: [{
        id:1,
        name: '源码分析'
      }],
      create_time: '1529462887135',
      update_time: '1599475887135',
      tags:[{
        id:1,
        name: '标签一',
      }],
      content: content
    }
  })
}
export default {
  articleDetail
}
