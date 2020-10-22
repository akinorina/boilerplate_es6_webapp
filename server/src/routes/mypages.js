import express from 'express'
import { isAuthenticated } from '../libAuth'

const router = express.Router()

// page: /mypages/
router.get('/', isAuthenticated, function (req, res, next) {
  console.log('req.session: ', req.session)
  console.log('req.session.passport.user: ', req.session.passport.user)
  res.render('mypages/index', {})
})

// page: /mypages/page001
router.get('/page001', isAuthenticated, function (req, res, next) {
  res.render('mypages/page001', {})
})

// page: /mypages/page002
router.get('/page002', isAuthenticated, function (req, res, next) {
  res.render('mypages/page002', {})
})

export default router
