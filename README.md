# 夜猫子博客系统

## 介绍

一款基于语雀API的博客管理系统，技术栈为：Node.js + Koa + MongoDB + Pug + 语雀 API

## 主要功能

1. 用户管理

   a. 管理员登录/登出
   b. 游客访问（无须注册登录，匿名 ID 访问）

2. 文章发布（将语雀文章同步到网站）

   a. 拉取全部文章清单
   ⅰ. 后台点击同步按钮、手动触发拉取文章列表任务
   b. 选择目标文章发布
   ⅰ. 后台选择文章点击按钮，完成文章的持久化

3. 文章展示

   a. 网站首页
   ⅰ. 放文章的列表，支持分页
   ⅱ. 支持现有文章检索
   ⅲ. 点击单条文章记录进入文章详情
   b. 文章详情
   ⅰ. 点击进入文章详情

4. 后台统计

   a. 每个页面的访问 PV
   b. 每个页面的访问 UV
   ⅰ. 用户首次进入网站时，种一个 uuid 的 cookie

5. 不做严格意义用户去重，只根据浏览器的 cookie 识别是否是老用户

   c. 在后台展示已发布页面的 PV/UV

## 安装教程

### 开发模式

``` bash

## 1.安装依赖

$ npm install

## 2.运行watch，通过babel编译，源代码支持ES6语法

$ npm run watch

## 3.nodemon自动重启服务

$ npm run dev

```

## 使用说明

### 目录结构

``` 
DAO 层：
DAO 层叫数据访问层，全称为 data access object，属于一种比较底层，比较基础的操作，具体到对于某个表的增删改查，也就是说某个 DAO 一定是和数据库的某一张表一一对应的，其中封装了增删改查基本操作，建议 DAO 只做原子操作，增删改查。

Service 层：
Service 层叫服务层，被称为服务，内置服务,接收来自 Controller 层的消息和将 Dao 层反馈信息传递至 Controller 层。粗略的理解就是对一个或多个 DAO 进行的再次封装，封装成一个服务，所以这里也就不会是一个原子操作了，需要事物控制。

Controler 层：
Controler 负责请求转发，接受页面过来的参数，传给 Service 处理，接到返回值，再传给页面。

```

## 接口说明

项目的所有接口文档都这里，可以逐个文档看。

* [管理员接口文档说明](./doc/admin.md)

## 项目里程碑

### 里程碑 1 - 项目初始化及页面可渲染

#### 任务详情

* [x] 完成项目环境搭建
* [x] 完成项目的目录文件结构初始化
* [ ] ~~Koa 中引入 Pug 引擎，能把项目跑起来~~
* [x] Koa中引入ejs引擎，能把项目跑起来
* [x] 首页/详情页的样式完成，可以渲染出页面效果
* [x] 数据可以用伪造数据展示

#### 验收指标

* 项目目录拆分合理
* 项目的各种配置文件完整
* 首页详情页可以正常渲染出来

#### 任务详情

### 里程碑 2 - 数据建模及管理员注册登录

* [x] 完成 MongoDB 环境搭建与数据库连接
* [ ] 完成 BLOG 相关数据表结构的 Schema 设计
* [ ] 如用户表、文章表、页面访问数据表
* [ ] 完成 MongoDB 中用户相关数据表增删改查 API 接口设计
* [ ] 完成 BLOG 后台管理页面的开发与渲染
* [ ] 后台首页、发布与已发布的列表页
* [ ] 完成管理员注册登录的功能流程
* [ ] 管理员注册字段前台提交到后台存储
* [ ] 管理员密码校验与成功的登录跳转流程

#### 验收指标

* 数据建模合理
* 后台页面正常渲染
* 管理员可注册登录
