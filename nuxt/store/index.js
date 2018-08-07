import Vuex from 'vuex'

export default () => new Vuex.Store({
  state: {
    accessToken: null,
    authUser: null
  },
  mutations:{
    update (state, data) {
      state.accessToken = data.token || null
      state.authUser = data.auth || null
    },
  },
  actions: {
    nuxtServerInit({ commit }, { req }) {
      commit('update', req.user || {})
    }
  }
})
