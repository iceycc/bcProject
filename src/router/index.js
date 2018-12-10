/**
 * 路由器js模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import {BusName, LsName, PageName} from '@/Constant'
import util from "libs/util";
import Bus from '@/plugin/bus/index'
import routes from "./routes"
import store from "@/store";

Vue.use(VueRouter)

let router = new VueRouter({
  routes
});

function getComParams(to) {
  let ORG_ID = util.storage.session.get('ORG_ID')
  console.log('ORG_ID>>', ORG_ID);
  // 注意：外部通过url  DEVICE_ID=xxx   和  CHANNEL_ID=x
  // let {DEVICE_ID, CHANNEL_ID, APP_FLAG} = store.getters.GET_ACCOUNT_STATE
  //
  let URL_DEVICE_ID = to.query.DEVICE_ID || ''
  if (URL_DEVICE_ID) {
    store.commit('SET_DEVICE_ID', URL_DEVICE_ID)
  }
  //
  let URL_CHANNEL_ID = to.query.CHANNEL_ID || ''
  if (URL_CHANNEL_ID) {
    store.commit('SET_CHANNEL_ID', URL_CHANNEL_ID)
    util.storage.session.set('CHANNEL_ID',URL_CHANNEL_ID)
  }
  //
  let URL_APP_FLAG = to.query.APP_FLAG || ''
  if (URL_APP_FLAG) {
    store.commit('SET_APP_FLAG', URL_APP_FLAG)
  }
}

router.beforeEach((to, from, next) => {

  getComParams(to)
  if (to.meta.title) {
    document.title = to.meta.title
    util.IOSTitileUpdat()
  }
  if (to.name == PageName.ProductReservation) {
    window.document.title = to.query.title;
    // util.IOSTitileUpdat()
  }
  if (to.meta && to.meta.needLogin) {
    let {TOKEN} = store.getters.GET_ACCOUNT_STATE
    if (TOKEN) {
      next()
    } else {
      Bus.$emit(BusName.showToast, '您还未登录，请先登录')
      next({
        name: PageName.Login,
        query: {
          target: to.fullPath
        }
      })
      next()
    }
  }
  next()
});

router.afterEach((to, from) => {
  // Indicator.close()

});

export default router
