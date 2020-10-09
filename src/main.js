import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import './promission'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
console.log('router')
console.log(router)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
