/**
 * UserList オブジェクト
 *
 */

import axios from 'axios'

export default class UserList {
  /**
   * constructor
   *
   * @return {void}
   */
  constructor () {
    // 取得したユーザーデータ
    this.users = []
  }

  /**
   * load
   *
   */
  load (params, successCallback, failureCallback) {
    //
    axios.get('/api/users', { params: params })
      .then((res) => {
        // success
        this.users = res.data.data

        // callback
        if (typeof successCallback === 'function') {
          successCallback(res.data)
        }
      })
      .catch((err) => {
        // failure
        console.log('UserList.load() - catch() : err:')
        console.log(err)
        console.log(typeof err)
        console.log(Object.keys(err))
        console.log(err.toJSON())
        console.log(err.response.status === 401)

        // callback
        if (typeof failureCallback === 'function') {
          failureCallback(err)
        }
      })
  }
}
