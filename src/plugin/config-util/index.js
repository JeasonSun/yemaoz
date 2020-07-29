import lodash from 'lodash'
import path from 'path'

class Config {
  constructor () {
    this.store = {}
  }

  /**
   * 将当前的config实例挂载到Koa app的context上
   * @param app  Koa的app实例
   */
  initApp (app) {
    app.context.config = this.store
  }

  /**
   * 获取单个配置项
   * 支持传入默认值，如果不存在该配置，则返回传入的默认值
   * @param key 配置项的路径
   * @param defaultVal 可选参数，默认值
   */
  getItem (key, defaultVal) {
    return lodash.get(this.store, key, defaultVal)
  }

  /**
   * 检查是否存在某个配置项
   * @param key 配置项的路径
   * @returns {Boolean}
   */
  hasItem (key) {
    return lodash.has(this.store, key)
  }

  /**
   * 设置配置项，如果已经存在该配置项，则覆盖
   * @param key 配置项的key
   * @param val 配置项的value
   */
  setItem (key, val) {
    lodash.set(this.store, key, val)
  }

  /**
   * 从文件中导入配置项
   * @param filepath js文件的路径，相对于当前工作目录
   */
  getConfigFromFile (filepath) {
    const baseDir = process.cwd()
    const content = require(path.resolve(baseDir, filepath))
    this.store = lodash.merge(this.store, content)
  }

  /**
   * 从object对象中导入配置，即合并配置
   * @param obj 配置对象
   */
  getConfigFromObj (obj) {
    this.store = lodash.merge(this.store, obj)
  }
}

export default new Config()
