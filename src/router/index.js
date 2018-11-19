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

router.beforeEach((to, from, next) => {
  let ORG_ID = util.storage.session.get('ORG_ID') || null
  console.log('ORG_ID>>',ORG_ID);
  if (!ORG_ID || JSON.stringify(ORG_ID)=='{}') {
    let ORG_ID = to.query.ORG_ID || ''
    util.storage.session.set('ORG_ID', ORG_ID)
    window.location.reload()
  }
  // 注意：外部通过url  DEVICE_ID=xxx   和  CHANNEL_ID=x
  let {DEVICE_ID, CHANNEL_ID} = store.getters.GET_ACCOUNT_STATE
  if (!DEVICE_ID) {
    let DEVICE_ID = to.query.DEVICE_ID
    store.commit('SET_DEVICE_ID', DEVICE_ID)
  }
  if (!CHANNEL_ID) {
    let CHANNEL_ID = to.query.CHANNEL_ID
    store.commit('SET_CHANNEL_ID', CHANNEL_ID)
  }

  if (to.meta.title) {
    document.title = to.meta.title
    util.IOSTitileUpdat()
  }
  if (to.name == PageName.ProductReservation) {
    window.document.title = to.query.title;
    util.IOSTitileUpdat()
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
