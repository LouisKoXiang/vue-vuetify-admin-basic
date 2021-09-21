import axios from 'axios'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: 'http://localhost:3000', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // console.log('store.getters.token', store.getters.token)
    if (store.getters.token) {
      config.headers.authorization = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response
    return res.data
  },
  error => {
    console.log(error.response.data)

    let errorMsg
    try {
      errorMsg = error.response.data.message
      console.log(errorMsg)
      const statusCode = error.response.data.statusCode
      // 401 token error
      if (statusCode === 401) {
        removeToken()
        if (store.getters.token) {
          router.push('/signin')
        }
      }
    } catch (error) {}
    return Promise.reject(error.response.data)
  }
)

export default service
