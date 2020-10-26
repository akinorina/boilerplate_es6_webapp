import applicationLogger from '../lib/log/applicationLogger'

/**
 * 認証済みか判定
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export function isAuthenticated (req, res, next) {
  if (req.isAuthenticated()) { // 認証済
    return next()
  } else { // 認証されていない
    res.redirect('/auth/login') // ログイン画面に遷移
  }
}

/**
 * 認証済みか判定 for API
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export function isAuthenticatedForApi (req, res, next) {
  if (req.isAuthenticated()) { // 認証済
    //
    applicationLogger.info('app', '----- Yes, Authenticated.')
    applicationLogger.info('app', req)
    return next()
  } else { // 認証されていない
    // ERROR発生
    const responseData = { code: 401, message: 'Unauthorized', data: null }
    res.status(401).json(responseData)
  }
}
