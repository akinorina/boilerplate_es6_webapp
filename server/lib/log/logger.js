import log4js from 'log4js'
import config from '../../config/log4js_config'

// logger設定
log4js.configure(config)

// それぞれのログ種別ごとに作成、エクスポート
export var console = log4js.getLogger('default')
export var system = log4js.getLogger('system')
