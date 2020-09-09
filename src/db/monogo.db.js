import mongoose from 'mongoose'
import config from '~/plugin/config-util'

const ConnectMongo = function () {
  const DB_URL = config.getItem('db_url')

  mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

  mongoose.connection.on('connected', function () {
    console.log('Mongoose连接成功： ' + DB_URL)
  })
  /**
   * 连接异常 error 数据库连接错误
   */
  mongoose.connection.on('error', function (err) {
    console.log('Mongoose 连接错误 ' + err)
  })
  /**
   * 连接断开 disconnected 连接异常断开
   */
  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose 连接断开')
  })
}

export { ConnectMongo }
