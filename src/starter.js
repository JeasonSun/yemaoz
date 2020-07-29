import path from 'path'
import fs from 'fs'

import { createApp } from './app'
import config from './plugin/config-util'

function applyConfig () {
  const baseDir = path.resolve(__dirname, '..')
  const files = fs.readdirSync(path.resolve(`${baseDir}/src/config`))
  for (const file of files) {
    config.getConfigFromFile(`src/config/${file}`)
  }
}

const run = async () => {
  applyConfig()
  const app = await createApp()
  const port = config.getItem('port')
  app.listen(port, () => {
    console.log(`yemaoz-server is start at http://localhost:${port}`)
  })
}

run()
