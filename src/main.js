import Vue from 'vue'
import router from './router'
import {
    Button,
    Cell
} from 'mint-ui'
import 'mint-ui/lib/style.css'

import App from './App'

Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)

// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.use(MintUI)

import AppBar from './components/header/AppBar'
Vue.component('app-bar', AppBar)

new Vue({
    el: '#app',
    components: {App},
    template: '<App/>',
    router
})
