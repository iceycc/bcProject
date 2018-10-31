import Vue from 'vue'

import store from './store/index'
import {
  Button,
  Cell,
  Radio,
  MessageBox,
  Indicator
} from 'mint-ui'
import 'mint-ui/lib/style.css'

import App from './App'

Vue.prototype.Londing = Indicator
Vue.prototype.Meg = MessageBox
Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
Vue.component(Radio.name, Radio)


import AppBar from './components/header/AppBar'
import Calendar from 'vue2-datepick';

Vue.use(Calendar);

Vue.component('app-bar', AppBar);
import custom from './common/filters';

console.log(custom);

Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})


import router from './router'
import './assets/css/my-mint.css';
import './assets/css/common.css'


new Vue({
  el: '#app',
  components: {App},
  template: '<App/>',
  router,
  store
})
