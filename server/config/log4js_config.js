// APP_ROOT設定
import path from 'path'

const APP_ROOT = path.join(__dirname, '../')

// ログ出力設定
// log4jsはルートロガーで使用するので、エクスポートに変更
export default {
  appenders: {
    consoleLog: {
      // 出力方法
      type: 'console'
    },
    //
    systemLog: {
      // 出力方法
      type: 'file',
      // システムログ出力先
      filename: path.join(APP_ROOT, './log/system/system.log'),
      // 5MB
      maxLogSize: 5000000,
      // 世代管理は5ファイルまで、古いログファイルを gz で圧縮されていく
      backups: 5,
      // 圧縮
      compress: true
    }
  },
  categories: {
    default: {
      // appenders
      appenders: ['consoleLog'],
      // 最小出力レベル
      level: 'ALL'
    },
    //
    system: {
      // appenders
      appenders: ['systemLog'],
      // 最小出力レベル
      level: 'ALL'
    }
  }
}
