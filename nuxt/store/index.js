import Vuex from 'vuex'

export default () => new Vuex.Store({
  state: {
    accessToken: null,
    authUser: null,
    keywords: ''
  },
  mutations:{
    updateAuth (state, data) {
      state.accessToken = data.token || null
      state.authUser = data.auth || null
    },
    updateKeyword (state, data) {
      state.keywords = data
    }
  },
  actions: {
    nuxtServerInit({ commit }, { req }) {
      commit('updateAuth', req.user || {})
    }
  }
})
