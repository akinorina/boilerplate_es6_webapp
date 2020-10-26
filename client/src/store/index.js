import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: false,
    userData: null
  },
  getters: {
    // 認証済み(true) or not(false) 取得
    isAuthenticated (state) {
      return state.authenticated
    },

    // ユーザー名
    getUserName (state) {
      return state.userData.name
    },

    // ユーザーデータ取得
    getUserData (state) {
      return state.userData
    }
  },
  mutations: {
    //
    setUser (state, userInfo) {
      state.authenticated = typeof userInfo === 'object' && userInfo.user_id > 0
      state.userData = userInfo
    },
    //
    unsetUser (state) {
      state.authenticated = false
      state.userData = null
    }
  },
  actions: {
    //
    login (context, params) {
      //
      const paramData = { email: params.form.email, password: params.form.password }

      axios.post('/api/auth/login', paramData)
        .then((res) => {
          // success
          context.commit('setUser', res.data.data)
          // callback
          if (typeof params.successCallback === 'function') {
            params.successCallback(res.data)
          }
        })
        .catch((err) => {
          // failure
          context.commit('unsetUser')
          // callback
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
          context.commit('unsetUser')
          // callback
          if (typeof params.successCallback === 'function') {
            params.successCallback(res)
          }
        })
        .catch((err) => {
          // failure
          context.commit('unsetUser')
          // callback
          if (typeof params.failureCallback === 'function') {
            params.failureCallback(err)
          }
        })
    }
  },
  modules: {
  }
})
