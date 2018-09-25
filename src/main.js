import Vue from 'vue'
// import libRender from './common/importLib'
// libRender()
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
// import {HOST} from "./Constant";
import * as custom from './common/filters'
Object.keys(custom).forEach(key=>{
    Vue.filter(key, custom[key])
})


import router from './router'
import './assets/css/my-mint.css';
import './assets/css/common.css'


new Vue({
    el: '#app',
    components: {App},
    template: '<App/>',
    router
})
