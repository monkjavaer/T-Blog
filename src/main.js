import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
// highlight.js代码高亮插件
import Highlight from './plugins/highlight'
// 导入请求包axios
import axios from 'axios'
// 配置请求路径
axios.defaults.baseURL = 'http://47.105.75.209:8081/api/'
// 请求统一加上token
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 必须返回
  return config
})
Vue.use(Highlight)
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
