import express from 'express'
// consoleロガー
import consoleLogger from '../../lib/log/consoleLogger'

const router = express.Router()

// GET home page.
router.get('/', function (req, res, next) {
  consoleLogger.debug('--- console.log : debug ---')
  consoleLogger.info('--- console.log : info ---')
  consoleLogger.warn('--- console.log : warn ---')
  consoleLogger.error('--- console.log : error ---')
  consoleLogger.fatal('--- console.log : fatal ---')

  res.render('index', { title: 'Express' })
})

export default router
