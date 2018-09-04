import Vuex from 'vuex'

export default () => new Vuex.Store({
  state: {
    accessToken: null,
    authUser: null,
    keywords: '',
    avatarUrl: '/uploadfile/avatar/'
  },
  mutations:{
    updateAuth (state, data) {
      state.accessToken = data.token || null
      state.authUser = data.auth || null
    },
    updateKeyword (state, data) {
      state.keywords = data
    },
    updateAuthByAvatar (state, data) {
      state.authUser = {
        ...state.authUser,
        avatar: data + '?' + Math.random()
      }
    },
    updateAuthByInfo (state, data) {
      state.authUser = data
    }
  },
  actions: {
    nuxtServerInit({ commit }, { req }) {
      commit('updateAuth', req.user || {})
    }
  }
})
