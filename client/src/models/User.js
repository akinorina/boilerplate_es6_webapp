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
        console.error('--- error', err)

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
    // console.log('params', params)

    // execute to update
    axios.post('/api/users', params)
      .then((res) => {
        // success

        // callback
        if (typeof successCallback === 'function') {
          successCallback(res.data)
        }
      })
      .catch((err) => {
        // failure
        console.error('--- error', err)

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
      params[sK] = this[sK]
    })
    // console.log('params', params)

    // execute to update
    axios.put('/api/users/' + params.id, params)
      .then((res) => {
        // success

        // callback
        if (typeof successCallback === 'function') {
          successCallback(res.data)
        }
      })
      .catch((err) => {
        // failure
        console.error('--- error', err)

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
    // console.log('params', params)
    if (isNaN(parseInt(params.id))) {
      return false
    }

    // execute to update
    axios.delete('/api/users/' + params.id, params)
      .then((res) => {
        // success

        // callback
        if (typeof successCallback === 'function') {
          successCallback(res.data)
        }
      })
      .catch((err) => {
        // failure
        console.error('--- error', err)

        // callback
        if (typeof failureCallback === 'function') {
          failureCallback(err)
        }
      })
  }
}
