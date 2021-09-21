import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_OLINE: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username, password: password })
        .then(response => {
          // eslint-disable-next-line camelcase
          const { access_token } = response
          console.log('----------', access_token)
          commit('SET_TOKEN', access_token)
          setToken(access_token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          // const { data } = response
          // console.log(response.email)
          if (!response) {
            // eslint-disable-next-line prefer-promise-reject-errors
            return reject('Verification failed, please Login again.')
          }
          const { username, online } = response

          commit('SET_NAME', username)
          commit('SET_OLINE', online)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken() // must remove token  first
          resetRouter()
          commit('RESET_STATE')
          resolve()
        })
        .catch(error => {
          removeToken() // must remove token  first
          resetRouter()
          reject(error)
        })
    })
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
