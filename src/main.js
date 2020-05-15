import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import md5 from 'js-md5'

import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.prototype.$md5 = md5

router.afterEach((to, from, next) => {
  if (to.path === '/login') {
    localStorage.removeItem('token')
    localStorage.removeItem('info')
    // next()
  }
  window.scrollTo(0, 0)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
