/**
 * 路由器js模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import {BusName, LsName, PageName} from '../Constant'
import util from "libs/util";
import Bus from '../plugin/bus/index'
import routes from "./routes"


Vue.use(VueRouter)

let router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    // todo 外部通过url  DEVICE_ID=xxx   和  CHANNEL_ID=x
    if (!util.storage.session.get(LsName.DEVICE_ID)) {
        let DEVICE_ID = to.query.DEVICE_ID || '321234'
        util.storage.session.set(LsName.DEVICE_ID, DEVICE_ID)
    }
    if (!util.storage.session.get(LsName.CHANNEL_ID)) {
        let CHANNEL_ID = to.query.CHANNEL_ID || '3'
        util.storage.session.set(LsName.CHANNEL_ID, CHANNEL_ID)
    }

    if (to.meta.title) {
        document.title = to.meta.title
        util.IOSTitileUpdat()
    }
    if (to.name == PageName.Productreservation) {
        window.document.title = to.query.title;
        util.IOSTitileUpdat()
    }
    if (to.meta && to.meta.needLogin) {
        let sign = util.storage.session.get(LsName.token)
        if (sign) {
            next()
        } else {

            Bus.$emit(BusName.showToast, '您还未登录，请先登录')
            next({
                name: PageName.login,
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
