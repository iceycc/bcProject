import Vue from 'vue'
import store from './store/index'
import App from './App'
import router from './router/selectBankRoute/jinshang'
// import $ from 'jquery'
/**
 * 核心插件引入
 */
import admin from './plugin/admin'

Vue.use(admin)
new Vue({
  el: '#app',
  components: {App},
  template: '<App/>',
  router,
  store
})
