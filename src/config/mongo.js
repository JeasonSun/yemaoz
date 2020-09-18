module.exports = {
  // db_url: 'mongodb://admin:123456@localhost:27017/yemaoz_dev?authSource=admin',
  dbHost: process.env.dbHost || 'localhost',
  dbPort: process.env.dbPort || 27017,
  dbName: process.env.dbName || 'yemaoz_dev',
  dbUser: process.env.dbUser || 'admin',
  dbPassword: process.env.dbPassword || '123456'
}
