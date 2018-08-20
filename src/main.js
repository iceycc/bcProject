
import Vue from 'vue'
import App from './App'
import router from './router'

import AppBar from './components/header/AppBar'
Vue.component('app-bar',AppBar)


new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
