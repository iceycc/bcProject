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

// <!--<script src="http://47.94.4.11:8090/finsuit/static/finsuit/js/openapi/js/jquery-1.10.1.min.js"></script>-->
// <!--<script src="http://47.94.4.11:8090/finsuit/static/finsuit/js/openapi/js/login-password-widget.min.js"></script>-->
// <!--<script src="http://47.94.4.11:8090/finsuit/static/finsuit/js/openapi/js/password-widget.min.js"></script>-->
// <!--<script src="http://47.94.4.11:8090/finsuit/static/finsuit/js/openapi/js/jquery.base64.js"></script>
// import {HOST} from "./Constant";


import router from './router'
import './assets/css/my-mint.css';
import './assets/css/common.css'
new Vue({
    el: '#app',
    components: {App},
    template: '<App/>',
    router
})
