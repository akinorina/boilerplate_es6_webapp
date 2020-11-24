// Node.js
import crypto from 'crypto'

// Routing for Passport
import express from 'express'
import applicationLogger from '../../lib/log/applicationLogger'

// Sequelize ORM
import { Sequelize, DataTypes, Op } from 'sequelize'
import UserOrm from '../../models/user'

// sequelize orm
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false
})
const Users = UserOrm(sequelize, DataTypes)

var router = express.Router()

/**
 * パスワード文字列のHash化
 *
 */
function makeHashForPassword (sPassword) {
  return crypto.createHash('sha256').update(sPassword).digest('hex')
}

// Passport
var passport = require('passport')
passport.serializeUser(function (user, done) {
  applicationLogger.info('app', '------------------------- serialize')
  applicationLogger.info('app', user)
  done(null, user)
})
passport.deserializeUser(function (user, done) {
  applicationLogger.info('app', '------------------------- deserialize')
  applicationLogger.info('app', user)
  done(null, user)
})

// Local Strategy
var LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function (username, password, done) {
    // パスワード文字列の sha256() Hash化
    const encryptedPassword = makeHashForPassword(password)
    // 検索条件
    const conditions = {
      where: {
        [Op.and]: [
          { email: username },
          { password: encryptedPassword }
        ]
      }
    }
    // DBからユーザー検索
    Users.findAndCountAll(conditions)
      .then(result => {
        if (result.count === 1) {
          //
          const targetUser = { id: '', name: '', email: '' }
          targetUser.id = result.rows[0].dataValues.id
          targetUser.name = result.rows[0].dataValues.name
          targetUser.email = result.rows[0].dataValues.email
          return done(null, targetUser)
        } else {
          //
          return done(null, false, { message: 'emailアドレス または パスワード が一致しませんでした。' })
        }
      })
  }
))

// Local Strategy - Routing
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/auth/miss',
  successRedirect: '/mypages'
}))

// login page.
router.get('/login', function (req, res, next) {
  res.render('auth/login', {})
})
// logout page.
router.get('/logout', function (req, res) {
  req.logout()
  res.render('auth/logout', {})
})
// miss page.
router.get('/miss', function (req, res, next) {
  res.render('auth/miss', {})
})

export default router
