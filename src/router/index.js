import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
var constantRouterMap = [
  {
    path: '/', component: _import('index/index')
  },
  {
    path: '/chat', component: _import('chat/chat')
  },
  {
    path: '/about', component: _import('about/about')
  },
  {
    path: '/bms', component: _import('bms/layout/index')
  },
  {
    path: '/bms/login', component: _import('bms/login/index')
  },
  {
    path: '/redog', component: _import('redog/redog')
  },
  {
    path: '/diycp', component: _import('diycp/diycp')
  },
  {
    path: '/tool',
    component: _import('tool/tool'),
    children: [
      {
        path: '/tool/hex', component: _import('tool/hex/hex')
      },
      {
        path: '/tool/timestamp', component: _import('tool/timestamp/timestamp')
      },
      {
        path: '/tool/strhex', component: _import('tool/strhex/strhex')
      },
      {
        path: '/tool/bcc', component: _import('tool/bcc/bcc')
      },
      {
        path: '/tool/lrc', component: _import('tool/lrc/lrc')
      },
      {
        path: '/tool/portScan', component: _import('tool/portScan/portScan')
      },
      {
        path: '/tool/countdown', component: _import('tool/countdown/countdown')
      }
    ]
  },
  {
    path: '/bigdata', component: _import('bigdata/bigdata')
  }
]
export default new Router({
  routes: constantRouterMap
})
