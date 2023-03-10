import { route } from 'quasar/wrappers'
import useAuthUser from 'src/composables/UseAuthUser'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to) => {
    const { isLoggedIn } = useAuthUser()
    if (to.hash.includes('type=recovery') && to.path !== '/reset-password') {
      const param = new URLSearchParams(to.hash)
      const accessToken = param.get('#access_token')
      return { path: 'reset-password', query: { accessToken } }
    }
    if (!isLoggedIn() && to.meta.requiresAuth && !Object.keys(to.query).includes('fromEmail')) {
      return { path: 'login' }
    }
    if (isLoggedIn() && (to.path === '/login' || to.path === '/')) {
      return { path: 'me' }
    }
  })

  return Router
})
