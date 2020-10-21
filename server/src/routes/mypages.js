import express from 'express'

const router = express.Router()

//
function isAuthenticated (req, res, next) {
  if (req.isAuthenticated()) { // 認証済
    return next()
  } else { // 認証されていない
    res.redirect('/auth/login') // ログイン画面に遷移
  }
}

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
