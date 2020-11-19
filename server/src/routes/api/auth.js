// Node.js
import crypto from 'crypto'

// Routing for Passport
import express from 'express'
import applicationLogger from '../../../lib/log/applicationLogger'

// Sequelize ORM
import { Sequelize, DataTypes, Op } from 'sequelize'
import UserOrm from '../../../models/user'

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
router.post('/login', passport.authenticate('local'), function (req, res) {
  applicationLogger.info('app', '------------------------- POST /login --- success')
  applicationLogger.info('app', req.session.cookie)
  applicationLogger.info('app', req.session.passport)
  //
  const responseData = { code: 0, message: 'ok', data: {} }
  responseData.data.user_id = req.session.passport.user.id
  responseData.data.name = req.session.passport.user.name
  responseData.data.name_kana = req.session.passport.user.name_kana
  responseData.data.email = req.session.passport.user.email
  res.status(200).json(responseData)
})

// logout page.
router.post('/logout', function (req, res) {
  req.logout()
  res.status(200).json({ code: 0, message: 'ok', data: null })
})

export default router
