import Vue from 'vue'
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
// Vue.component(Indicator.name, Indicator)

// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.use(MintUI)

import AppBar from './components/header/AppBar'

Vue.component('app-bar', AppBar)

import router from './router'

new Vue({
    el: '#app',
    components: {App},
    template: '<App/>',
    router
})
