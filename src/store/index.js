import Vue from 'vue'
import Vuex from 'vuex'

import login from './modules/login/login'
import bankaccount from './modules/login/bankaccount'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        login,
        bankaccount
    }
})