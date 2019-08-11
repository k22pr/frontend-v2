import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: "penguin-stats-state"
    })
  ],
  state: {
    data: {},
    settings: {
      dark: true,
      locale: 'zh'
    },
    auth: {
      username: null
    }
  },
  mutations: {
    store: (state, d) => {
      state.data = {...d}
    },
    switchDark (state, newState) {
      state.settings.dark = newState
    },
    changeLocale (state, newLocale) {
      state.settings.locale = newLocale
    },
    authLogin (state, username) {
      state.auth.username = username
    },
    authLogout (state) {
      state.auth.username = null
    }
  },
  getters: {
    authed: state => {
      return !!state.auth.username
    },
    authUsername: state => {
      return state.auth.username || ''
    }
  }
})
