import mongoose from 'mongoose'
import config from '~/plugin/config-util'

const ConnectMongo = function () {
  const dbHost = config.getItem('dbHost')
  const dbPort = config.getItem('dbPort')
  const dbName = config.getItem('dbName')
  const dbUser = config.getItem('dbUser')
  const dbPassword = config.getItem('dbPassword')
  let dbUrl = ''
  if (dbUser && dbPassword) {
    dbUrl = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=admin`
  } else {
    dbUrl = `mongodb://${dbHost}:${dbPort}/${dbName}`
  }

  mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })

  mongoose.connection.on('connected', function () {
    console.log('Mongoose连接成功： ' + dbName)
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
