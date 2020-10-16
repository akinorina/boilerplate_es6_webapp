//
// webapp
//

import express from 'express'
import createError from 'http-errors'
import path from 'path'
import cookieParser from 'cookie-parser'

// systemロガー
import systemLogger from '../lib/log/systemLogger'
// // applicationロガー
// import applicationLogger from '../lib/log/applicationLogger'
// accessロガー
import accessLogger from '../lib/log/accessLogger'
// consoleロガー
import consoleLogger from '../lib/log/consoleLogger'

// routers
import indexRouter from './routes/index'
import usersRouter from './routes/users'

const app = express()

// // アプリケーションログ出力
// applicationLogger.error('app', '*** HERE! 1 ***')
// applicationLogger.error('app2', '*** HERE! 2 ***')
// applicationLogger.error('app2', '*** HERE! 3 ***')

// // 意図的にエラーを起こすルート
// app.get('/error', (req, res) => {
//   throw new Error('システムログの出力テスト Errorです')
// })

// view engine setup
app.set('views', path.join(__dirname, '../../views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../../public')))

// アクセス・ロガー 設定
app.use(accessLogger())

// // テスト用コード
// app.get('/access1', (req, res) => {
//   res.status(200).send('access test 200')
// })
// app.get('/access2', (req, res) => {
//   res.status(304).send('access test 304')
// })
// app.get('/access3', (req, res) => {
//   res.status(404).send('access test 404')
// })
// app.get('/access4', (req, res) => {
//   res.status(500).send('access test 500')
// })

// コンソールログ出力テスト
consoleLogger.debug('--- console.log : debug ---')
consoleLogger.info('--- console.log : info ---')
consoleLogger.warn('--- console.log : warn ---')
consoleLogger.error('--- console.log : error ---')
consoleLogger.fatal('--- console.log : fatal ---')

// routers
app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// systemLogger をExpressに実装
app.use(systemLogger())

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
