//
// webapp
//

import express from 'express'
import createError from 'http-errors'
import path from 'path'
import cookieParser from 'cookie-parser'

// logger
import log4js from 'log4js'

// routers
import indexRouter from './routes/index'
import usersRouter from './routes/users'

// logger
const logger = log4js.getLogger()
logger.level = 'debug'

const app = express()

app.get('/test', (req, res) => {
  logger.debug('デバッグログが出力されます')
  res.send('log test')
})

// view engine setup
app.set('views', path.join(__dirname, '../../views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../../public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

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
