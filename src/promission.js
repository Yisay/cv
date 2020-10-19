import router from './router'
import Layout from '@/views/bms/layout'
import axios from 'axios'
const _import = require('./router/_import_' + process.env.NODE_ENV)

var getRouter

router.beforeEach((to, from, next) => {
  console.log(getRouter)
  // 判断是否为登录界面和主界面，如是则中断
  if (to.path === '/bms/login' || to.path === '/' || to.path === '/chat' || to.path === '/bigdata' || to.path === '/bms' || to.path === '/redog' || to.path === '/diycp' || to.path === '/about' || to.path === '/tool') {
    console.log('执行中断')
    next()
  }
  // 判断是否在其他界面登录状态为空,如是则获取跳转至登录界面。

  if (window.localStorage.getItem('userid') == null && to.path !== '/bms/login') {
    console.log('go to login')
    next({ path: '/bms/login' })
  } else if (!getRouter) { // 否则判断路由变量是否为空，如是则获取对应账户路由信息，否则直接用已保存的路由信息
    if (!getObjArr('router')) {
      axios.get('http://api.25cl.cn/project/bms/auth', {
        headers: {
          'userid': window.localStorage.getItem('userid'),
          'token': window.localStorage.getItem('token')
        }
      }).then(res => {
        console.log('res')
        console.log(res.data)
        getRouter = res.data
        saveObjArr('router', getRouter)
        routerGo(to, next)
      })
    } else {
      getRouter = getObjArr('router')
      console.log(getRouter)
      routerGo(to, next)
    }
  } else {
    next()
  }
})

function routerGo (to, next) {
  getRouter = filterAsyncRouter(getRouter)

  router.addRoutes(getRouter)
  console.log(router)
  global.antRouter = getRouter
  next({ ...to, replace: true })
}
function saveObjArr (name, data) {
  localStorage.setItem(name, JSON.stringify(data))
}
function getObjArr (name) {
  // 返回‘router’的数组
  return JSON.parse(window.localStorage.getItem(name))
}
function filterAsyncRouter (asyncRouterMap) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        try {
          console.log(route.component)
          console.log(_import(route.component))
          route.component = _import(route.component)
        } catch ($e) {
          route.component = _import('errormodule/index')
        }
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
  return accessedRouters
}
