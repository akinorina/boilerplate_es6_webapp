import log4js from 'log4js'
import { levels } from 'log4js/lib/levels'
import config from '../../config/log4js_config'

// logger設定
log4js.configure(config)

// アプリケーションロガー拡張
const ApplicationLogger = function () {
  this.logger = log4js.getLogger('application')
}
const proto = ApplicationLogger.prototype
for (let level of levels) {
  // log4jsのソースコード見ると、大文字になっているので小文字にします。
  level = level.toString().toLowerCase()
  proto[level] = (function (level) {
    return function (key, message) {
      const logger = this.logger
      logger.addContext('key', key)
      logger[level](message)
    }
  })(level)
}

// それぞれのログ種別ごとに作成、エクスポート
export var console = log4js.getLogger('default')
export var system = log4js.getLogger('system')
export var application = new ApplicationLogger()
export var access = log4js.getLogger('access')
