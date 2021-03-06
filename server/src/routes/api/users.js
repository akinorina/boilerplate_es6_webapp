'use strict'

/**
 * Restful API
 *
 * http method   URI                   Controller#Action        http status code
 * -------------+---------------------+------------------------+------------------
 *      GET      /api/users            users#index (get list)   200 (OK)
 *      POST     /api/users            users#create             200 (OK) / 403 (Forbidden)
 *      GET      /api/users/:id        users#show               200 (OK) / 404 (Not Found)
 *      PUT      /api/users/:id        users#update             200 (OK) / 404 (Not Found)
 *      PATCH    /api/users/:id        users#update             200 (OK) / 404 (Not Found)
 *      DELETE   /api/users/:id        users#delete             200 (OK) / 404 (Not Found)
 *
 */

// Express
import express from 'express'

// Node.js
import crypto from 'crypto'

// libAuth
import { isAuthenticatedForApi } from '../../libAuth'

// console logger
import consoleLogger from '../../../lib/log/consoleLogger'
// applicationロガー
import applicationLogger from '../../../lib/log/applicationLogger'

// Sequelize ORM
import { Sequelize, DataTypes, Op } from 'sequelize'
import UserOrm from '../../../models/user'

// express router
const usersRouter = express.Router()

// sequelize orm
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false
})
const Users = UserOrm(sequelize, DataTypes)

/**
 * get Parameters, Queries, body parameters
 */
function getAllParameters (req) {
  // consoleLogger.debug('--- getAllParams(req) --- start. ---')
  const aryNames = ['query', 'params', 'body']
  const params = {}
  aryNames.forEach((sName) => {
    // consoleLogger.debug('req', req[sName])
    Object.keys(req[sName]).forEach((sKey) => {
      params[sKey] = req[sName][sKey]
    })
  })
  // consoleLogger.debug('params', params)
  // consoleLogger.debug('--- getAllParams(req) --- end. ---')
  return params
}

/**
 * パスワード文字列のHash化
 *
 */
function makeHashForPassword (sPassword) {
  return crypto.createHash('sha256').update(sPassword).digest('hex')
}

// ------------------------------------------------------------------------------------------
// #index
// ------------------------------------------------------------------------------------------
usersRouter.get('/', isAuthenticatedForApi, function (req, res, next) {
  consoleLogger.info('--- run /api/users #index --- start. ---')

  // (1). get parameters for conditions
  const parameters = getAllParameters(req)
  consoleLogger.debug('parameters', parameters)
  const conditions = { offset: 0, limit: 10, where: {} }
  Object.keys(parameters).forEach((sKey) => {
    if (['name', 'name_kana', 'email', 'password'].indexOf(sKey) !== -1) {
      // STRING: like
      conditions.where[sKey] = { [Op.like]: '%' + parameters[sKey] + '%' }
    } else if (['offset', 'limit'].indexOf(sKey) !== -1) {
      // NUMBER
      if (!isNaN(parameters[sKey] - 0)) {
        conditions[sKey] = parameters[sKey] - 0
      }
    }
  })

  // (2). DB access
  Users.findAndCountAll(conditions).then(resPeople => {
    consoleLogger.debug('resPeople', resPeople)

    // (3). make & send the response data.
    const responseData = { code: 0, message: 'ok', total: null, count: null, offset: null, limit: null, data: [] }
    responseData.total = resPeople.count
    responseData.count = resPeople.rows.length
    responseData.offset = conditions.offset
    responseData.limit = conditions.limit
    responseData.data = resPeople.rows
    res.status(200).json(responseData)
  })

  consoleLogger.info('--- run /api/users #index --- end. ---')
})

// ------------------------------------------------------------------------------------------
// #create
// ------------------------------------------------------------------------------------------
usersRouter.post('/', isAuthenticatedForApi, function (req, res, next) {
  consoleLogger.info('--- run /api/users/ #create --- start. ---')

  // (1). パラメータ取得
  const parameters = getAllParameters(req)
  consoleLogger.debug('parameters', parameters)
  // (2). DB情報（column）を取得
  Users.describe().then(attributes => {
    consoleLogger.debug('attributes', attributes)

    // (3). 生成データの key 一覧を作成
    const attrKeys = []
    Object.keys(attributes).forEach((sKey) => {
      if (sKey.match(/_at$/) === null) {
        attrKeys.push(sKey)
      }
    })
    consoleLogger.debug('attrKeys', attrKeys)

    // (4). 生成データ作成
    const params = {}
    attrKeys.forEach((sKey) => {
      if (parameters[sKey]) {
        if (sKey === 'password') {
          // パスワード sha256化
          params[sKey] = makeHashForPassword(parameters[sKey])
        } else {
          //
          params[sKey] = parameters[sKey]
        }
      }
    })
    consoleLogger.debug('--- params', params)

    // (5). create it.
    Users.create(params).then(resPerson => {
      consoleLogger.debug('--- resPerson', resPerson)

      // (6). APIレスポンスデータ作成、返信
      const responseData = { code: 0, message: 'ok', data: null }
      if (resPerson === null) {
        responseData.code = 1001
        responseData.message = '対象データが見つかりませんでした。'
        res.status(200).json(responseData)
      } else {
        responseData.data = resPerson.dataValues
        res.status(200).json(responseData)
      }
    })
  })

  consoleLogger.info('--- run /api/users/ #create --- end. ---')
})

// ------------------------------------------------------------------------------------------
// #show
// ------------------------------------------------------------------------------------------
usersRouter.get('/:id', isAuthenticatedForApi, function (req, res, next) {
  consoleLogger.info('--- run /api/users/:id #show --- start. ---')

  // (1). パラメータ取得
  const parameters = getAllParameters(req)
  consoleLogger.debug('parameters', parameters)
  if (parameters.id === undefined) {
    throw new Error('no data id.')
  }

  // (2). 対応する個人データ取得
  Users.findByPk(parameters.id).then(resPerson => {
    // consoleLogger.debug('resPerson', resPerson)

    // (3). APIレスポンスデータ作成、返信
    const responseData = { code: 0, message: 'ok', data: null }
    if (resPerson === null) {
      responseData.code = 1001
      responseData.message = '対象データが見つかりませんでした。'
      res.status(200).json(responseData)
    } else {
      responseData.data = resPerson.dataValues
      res.status(200).json(responseData)
    }
  })

  consoleLogger.info('--- run /api/users/:id #show --- end. ---')
})

// ------------------------------------------------------------------------------------------
// #update (put)
// ------------------------------------------------------------------------------------------
usersRouter.put('/:id', isAuthenticatedForApi, function (req, res, next) {
  consoleLogger.info('--- run /api/users/:id #update --- start. ---')

  // (1). パラメータ取得
  const parameters = getAllParameters(req)
  consoleLogger.debug('parameters', parameters)
  if (req.params.id === undefined) {
    throw new Error('no data id.')
  }
  consoleLogger.debug('parameters.id', parameters.id)

  // (2). DB情報（column）を取得
  Users.describe().then(attributes => {
    consoleLogger.debug('result', attributes)

    // (3). 生成データの key 一覧を作成
    const attrKeys = []
    Object.keys(attributes).forEach((sKey) => {
      if (sKey.match(/_at$/) === null) {
        attrKeys.push(sKey)
      }
    })
    consoleLogger.debug('attrKeys', attrKeys)

    // (4). 生成データ作成
    const params = {}
    attrKeys.forEach((sKey) => {
      consoleLogger.debug('key> ', sKey, parameters[sKey])
      if (parameters[sKey]) {
        if (sKey === 'password') {
          // パスワード sha256化
          params[sKey] = makeHashForPassword(parameters[sKey])
        } else {
          //
          params[sKey] = parameters[sKey]
        }
      }
    })
    consoleLogger.debug('--- params', params)

    // (5). update it.
    Users.update(params, { where: { id: parameters.id } }).then(result => {
      consoleLogger.debug('--- result: ', result)

      // (6). 更新後の個人データを取得
      Users.findByPk(parameters.id).then(resPerson => {
        consoleLogger.debug('--- resPerson', resPerson)

        // (7). APIレスポンスデータ作成、返信
        const responseData = { code: 0, message: 'ok', data: null }
        if (resPerson === null) {
          // no data.
          responseData.code = 1001
          responseData.message = '対象データが見つかりませんでした。'
          res.status(200).json(responseData)
        } else {
          // available.
          responseData.data = resPerson.dataValues
          res.status(200).json(responseData)
        }
      })
    })
  })

  consoleLogger.info('--- run /api/users/:id #update --- end. ---')
})

// ------------------------------------------------------------------------------------------
// #update (patch)
// ------------------------------------------------------------------------------------------
usersRouter.patch('/:id', isAuthenticatedForApi, function (req, res, next) {
  consoleLogger.info('--- run /api/users/:id #update (patch) --- start. ---')

  // (1). パラメータ取得
  const parameters = getAllParameters(req)
  consoleLogger.debug('parameters', parameters)
  if (req.params.id === undefined) {
    throw new Error('no data id.')
  }
  consoleLogger.debug('parameters.id', parameters.id)

  // (2). DB情報（column）を取得
  Users.describe().then(attributes => {
    consoleLogger.debug('result', attributes)

    // (3). 生成データの key 一覧を作成
    const attrKeys = []
    Object.keys(attributes).forEach((sKey) => {
      if (sKey.match(/_at$/) === null) {
        attrKeys.push(sKey)
      }
    })
    consoleLogger.debug('attrKeys', attrKeys)

    // (4). 既存データを取得
    Users.findByPk(parameters.id).then(resPerson => {
      consoleLogger.debug('resPerson', resPerson)

      // (5). 生成データ作成
      const params = {}
      attrKeys.forEach((sKey) => {
        consoleLogger.debug('key> ', sKey, parameters[sKey])
        if (parameters[sKey]) {
          if (sKey === 'password') {
            // パスワード sha256化
            params[sKey] = makeHashForPassword(parameters[sKey])
          } else {
            //
            params[sKey] = parameters[sKey]
          }
        } else {
          params[sKey] = resPerson.dataValues[sKey]
        }
      })
      consoleLogger.debug('--- params', params)

      // (6). update it.
      Users.update(params, { where: { id: parameters.id } }).then(result => {
        consoleLogger.debug('--- result: ', result)

        // (7). 更新後の個人データを取得
        Users.findByPk(parameters.id).then(resPerson => {
          consoleLogger.debug('--- resPerson', resPerson)

          // (8). APIレスポンスデータ作成、返信
          const responseData = { code: 0, message: 'ok', data: null }
          if (resPerson === null) {
            // no data.
            responseData.code = 1001
            responseData.message = '対象データが見つかりませんでした。'
            res.status(200).json(responseData)
          } else {
            // available.
            responseData.data = resPerson.dataValues
            res.status(200).json(responseData)
          }

          res.send('routed: users#update (patch)')
        })
      })
    })
  })

  consoleLogger.info('--- run /api/users/:id #update (patch) --- end. ---')
})

// ------------------------------------------------------------------------------------------
// #delete
// ------------------------------------------------------------------------------------------
usersRouter.delete('/:id', isAuthenticatedForApi, function (req, res, next) {
  consoleLogger.info('--- run /api/users/:id #delete --- start. ---')

  // (1). パラメータ取得
  const parameters = getAllParameters(req)
  consoleLogger.debug('parameters', parameters)
  if (parameters.id === undefined) {
    throw new Error('no data id.')
  }
  consoleLogger.debug('parameters.id', parameters.id)

  // (2). データ削除
  Users.destroy({ where: { id: parameters.id }, force: false }).then(result => {
    consoleLogger.debug('result', result)

    // (3). APIレスポンスデータ作成、返信
    const responseData = { code: 0, message: 'ok', count: 0, data: null }
    if (result === 0) {
      responseData.code = 1001
      responseData.message = '対象データが見つかりませんでした。'
      res.status(200).json(responseData)
    } else {
      responseData.count = result
      res.status(200).json(responseData)
    }
  })

  consoleLogger.info('--- run /api/users/:id #delete --- end. ---')
})

// ------------------------------------------------------------------------------------------
// #update password (put)
// ------------------------------------------------------------------------------------------
usersRouter.put('/update-password/:id', isAuthenticatedForApi, function (req, res, next) {
  // consoleLogger.info('--- run /api/users/update-password/:id #update (put) --- start. ---')

  // (1). パラメータ取得
  const parameters = getAllParameters(req)
  // consoleLogger.debug('parameters', parameters)
  if (req.params.id === undefined) {
    throw new Error('no data id.')
  }
  // consoleLogger.debug('parameters.id', parameters.id)
  applicationLogger.info('app', 'parameters: ' + JSON.stringify(parameters))

  // (2). DB情報（column）を取得
  Users.describe().then(attributes => {
    // consoleLogger.debug('result', attributes)

    // (3). 生成データの key 一覧を作成
    const attrKeys = []
    Object.keys(attributes).forEach((sKey) => {
      if (sKey.match(/_at$/) === null) {
        attrKeys.push(sKey)
      }
    })
    // consoleLogger.debug('attrKeys', attrKeys)

    // (4). 既存データを取得
    Users.findByPk(parameters.id).then(resPerson => {
      // consoleLogger.debug('resPerson', resPerson)
      applicationLogger.info('app', '-----')
      applicationLogger.info('app', 'resPerson: ' + JSON.stringify(resPerson))

      // (xx). 現在のパスワード一致を確認
      if (makeHashForPassword(parameters.password) !== resPerson.password) {
        // 不一致の場合はエラーを返す
        const responseData = { code: 1001, message: 'NG: 現在のパスワードが不一致。', data: null }
        res.status(200).json(responseData)
      } else {
        // (xx). 生成データ作成
        const params = {}
        attrKeys.forEach((sKey) => {
          // consoleLogger.debug('key> ', sKey, parameters[sKey])
          if (sKey === 'password' && parameters.new_password) {
            // パスワード sha256化
            params[sKey] = makeHashForPassword(parameters.new_password)
          } else {
            params[sKey] = resPerson.dataValues[sKey]
          }
        })
        // consoleLogger.debug('--- params', params)

        // (xx). update it.
        Users.update(params, { where: { id: parameters.id } }).then(result => {
          // consoleLogger.debug('--- result: ', result)

          // (xx). APIレスポンスデータ作成、返信
          const responseData = { code: 0, message: 'ok', data: null }
          res.status(200).json(responseData)

          // res.send('routed: users#update (put)')
        })
      }
    })
  })

  // consoleLogger.info('--- run /api/users/update-password/:id #update (put) --- end. ---')
})

export default usersRouter
