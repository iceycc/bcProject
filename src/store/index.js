import Vue from 'vue'
import Vuex from 'vuex'
import bank from './modules/bank'
import account from './modules/account'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    bank,
    account
  }
})