/**
 * User オブジェクト
 *
 */

import axios from 'axios'

export default class User {
  /**
   * constructor
   *
   * @return {void}
   */
  constructor () {
    this.id = null
    this.name = ''
    this.name_kana = ''
    this.email = ''
    this.password = ''

    this._keys = []
    Object.keys(this).forEach((sK) => {
      if (sK[0] !== '_') {
        this._keys.push(sK)
      }
    })
  }

  /**
   * load
   *
   */
  load (params, successCallback, failureCallback) {
    //
    axios.get('/api/users/' + params.id)
      .then((res) => {
        // success
        this._keys.forEach((sK) => {
          this[sK] = res.data.data[sK]
        })

        // callback
        if (typeof successCallback === 'function') {
          successCallback(res.data)
        }
      })
      .catch((err) => {
        // failure

        // callback
        if (typeof failureCallback === 'function') {
          failureCallback(err)
        }
      })
  }

  /**
   * create
   *
   */
  create (successCallback, failureCallback) {
    // make the parameter data.
    const params = {}
    this._keys.forEach((sK) => {
      params[sK] = this[sK]
    })

    // execute to update
    axios.post('/api/users', params)
      .then((res) => {
        // success
        this._keys.forEach((sK) => {
          this[sK] = res.data.data[sK]
        })

        // callback
        if (typeof successCallback === 'function') {
          successCallback(res.data)
        }
      })
      .catch((err) => {
        // failure

        // callback
        if (typeof failureCallback === 'function') {
          failureCallback(err)
        }
      })
  }

  /**
   * update
   *
   */
  update (successCallback, failureCallback) {
    // make the parameter data.
    const params = {}
    this._keys.forEach((sK) => {
      if (sK !== 'password') {
        params[sK] = this[sK]
      }
    })

    // execute to update
    axios.put('/api/users/' + params.id, params)
      .then((res) => {
        // success
        this._keys.forEach((sK) => {
          if (sK !== 'password') {
            this[sK] = res.data.data[sK]
          }
        })

        // callback
        if (typeof successCallback === 'function') {
          successCallback(res.data)
        }
      })
      .catch((err) => {
        // failure

        // callback
        if (typeof failureCallback === 'function') {
          failureCallback(err)
        }
      })
  }

  /**
   * delete
   *
   */
  delete (successCallback, failureCallback) {
    // make the parameter data.
    const params = {}
    params.id = this.id
    if (isNaN(parseInt(params.id))) {
      if (typeof failureCallback === 'function') {
        failureCallback(new Error('bad id'))
      } else {
        return false
      }
    }

    // execute to update
    axios.delete('/api/users/' + params.id, params)
      .then((res) => {
        // success
        this._keys.forEach((sK) => {
          if (sK === 'id') {
            this[sK] = null
          } else {
            this[sK] = ''
          }
        })

        // callback
        if (typeof successCallback === 'function') {
          successCallback(res.data)
        }
      })
      .catch((err) => {
        // failure

        // callback
        if (typeof failureCallback === 'function') {
          failureCallback(err)
        }
      })
  }

  /**
   * changePassword
   *
   */
  changePassword (params, successCallback, failureCallback) {
    // params の内容
    // params.id - パスワード変更するユーザーの ID
    // params.password - 変更前のパスワード
    // params.new_password - 変更後のパスワード
    if (isNaN(parseInt(params.id))) {
      if (typeof failureCallback === 'function') {
        failureCallback()
      } else {
        return false
      }
    }

    // execute to update
    axios.put('/api/users/update-password/' + params.id, params)
      .then((res) => {
        // success

        // callback
        if (typeof successCallback === 'function') {
          successCallback(res.data)
        }
      })
      .catch((err) => {
        // failure

        // callback
        if (typeof failureCallback === 'function') {
          failureCallback(err)
        }
      })
  }
}
