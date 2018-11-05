import Vue from 'vue'
import Vuex from 'vuex'
import bank from './modules/bank'
import account from './modules/account'
import common from './modules/common'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    bank,
    account,
    common
  }
})