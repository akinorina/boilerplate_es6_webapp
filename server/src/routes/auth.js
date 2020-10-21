// Routing for Passport
import express from 'express'
import applicationLogger from '../../lib/log/applicationLogger'

var router = express.Router()

// Passport
var passport = require('passport')
passport.serializeUser(function (user, done) {
  done(null, user)
})
passport.deserializeUser(function (user, done) {
  done(null, user)
})

// Local Strategy - Passport 認証データ
var Userlist = [
  { username: 'user001', password: 'pw001' }
]

// Local Strategy
var LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(
  function (username, password, done) {
    applicationLogger.info('app', 'LocalStrategy ===')

    //
    var targetUser = false
    Userlist.forEach((u, idx) => {
      if (u.username === username) {
        targetUser = { username: '', password: '' }
        targetUser.username = u.username
        targetUser.password = u.password
      }
    })
    if (targetUser === false) {
      return done(null, false, { message: 'ユーザーIDが正しくありません。' })
    }
    if (targetUser.password === password) {
      console.log('targetUser', targetUser)
      return done(null, targetUser)
    } else {
      return done(null, false, { message: 'パスワードが正しくありません。' })
    }
  }
))

// Local Strategy - Routing
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/auth/miss',
  successRedirect: '/mypages'
}))

// login page.
router.get('/login', function (req, res, next) {
  applicationLogger.info('app', '/auth/login ===')
  res.render('auth/login', {})
})
// logout page.
router.get('/logout', function (req, res) {
  applicationLogger.info('app', '/auth/logout ===')
  req.logout()
  res.render('auth/logout', {})
})
// miss page.
router.get('/miss', function (req, res, next) {
  applicationLogger.info('app', '/auth/miss ===')
  res.render('auth/miss', {})
})

export default router
