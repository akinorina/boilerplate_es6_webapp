import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: null
  },
  getters: {
    // //
    // getActiveUserInfo (state) {
    //   return state.isAuthenticated
    // },

    //
    getResult (state) {
      return state.isAuthenticated
    }
  },
  mutations: {
    //
    setUser (state, userInfo) {
      state.isAuthenticated = userInfo.result === 'ok'
      console.log('setUser(): state.isAuthenticated = ', state.isAuthenticated)
    },
    //
    unsetUser (state) {
      state.isAuthenticated = false
      console.log('unsetUser(): state.isAuthenticated = ', state.isAuthenticated)
    }
  },
  actions: {
    //
    login (context, params) {
      //
      const paramData = { email: params.form.email, password: params.form.password }
      console.log('paramData', paramData)

      axios.post('/api/auth/login', paramData)
        .then((res) => {
          console.log('----- then()')
          // success
          console.log('res.data', res.data)
          context.commit('setUser', res.data)
          //
          if (typeof params.successCallback === 'function') {
            params.successCallback(res.data)
          }
        })
        .catch((err) => {
          console.log('----- catch()')
          // failure
          console.log(':::err', err)
          context.commit('setUser', { result: 'ng' })

          if (typeof params.failureCallback === 'function') {
            params.failureCallback(err)
          }
        })
    },

    //
    logout (context, params) {
      //
      axios.post('/api/auth/logout', {})
        .then((res) => {
          // success
          console.log('res', res)
          context.commit('unsetUser')

          if (typeof params.successCallback === 'function') {
            params.successCallback(res)
          }
        })
        .catch((err) => {
          // failure
          console.log('err', err)
          context.commit('unsetUser')

          if (typeof params.failureCallback === 'function') {
            params.failureCallback(err)
          }
        })
    }
  },
  modules: {
  }
})
