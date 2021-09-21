import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import SignIn from '@/views/auth/SignIn.vue'

import TheNavigation from '@/components/layout/TheNavigation.vue'

Vue.use(Router)

const constantRoutes = [
  {
    path: '/signin',
    name: 'SignIn',
    components: {
      default: SignIn
    }
  },
  {
    path: '/',
    name: 'Home',
    components: {
      default: Home,
      TheNavigation: TheNavigation
    },
    meta: {
      auth: true
    }
  }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
