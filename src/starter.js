import path from 'path'
import fs from 'fs'

import config from './plugin/config-util'
import { ConnectMongo } from './db/monogo.db'
import { createApp } from './app'

function applyConfig () {
  const baseDir = path.resolve(__dirname, '..')
  const files = fs.readdirSync(path.resolve(`${baseDir}/src/config`))
  for (const file of files) {
    config.getConfigFromFile(`src/config/${file}`)
  }
}

const run = async () => {
  applyConfig()
  ConnectMongo()
  const app = await createApp()
  const port = config.getItem('port')
  app.listen(port, () => {
    console.log(`yemaoz-server is start at http://localhost:${port}`)
  })
}

run()
