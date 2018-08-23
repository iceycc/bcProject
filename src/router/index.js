/**
 * 路由器js模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import PageComponents from '../pages/index'
import {BusName, LsName, PageName} from '../Constant'
import util from "../common/utils/util";
import Bus from '../common/js/bus'
import {Indicator} from 'mint-ui'

Vue.use(VueRouter)

function addRouter(name, meta) {
    routes.push({
        path: '/' + name.replace(/-/g, '/'),
        name: name,
        component: PageComponents[name],
        meta: Object.assign(
                {
                    keepAlive: false,
                    needLogin: true
                }
                , meta)
    });
}


let routes = [
    {
        path: '/',
        redirect: {
            path: PageName.Productlist
        }
    }
]

/**
 * buy
 */

addRouter(PageName.Buyfailed, {keepAlive: false, title: '理财产品'});
addRouter(PageName.Buysuccess, {keepAlive: false, title: '购买成功'});
addRouter(PageName.surebuy, {keepAlive: false, title: '购买'});
addRouter(PageName.Buying, {keepAlive: false, title: '购买'});

/**
 * login
 */
addRouter(PageName.login, {keepAlive: false, title: '登陆',needLogin:false});
/**
 * open
 */
addRouter(PageName.opening, {keepAlive: false, title: '开户',needLogin:false});
addRouter(PageName.opening2, {keepAlive: false, title: '开户',needLogin:false});
addRouter(PageName.opening3, {keepAlive: false, title: '开户',needLogin:false});



/**
 * product
 */
addRouter(PageName.Productlist, {keepAlive: false, title: '理财产品'});
addRouter(PageName.Productlist2, {keepAlive: false, title: '理财产品'});
addRouter(PageName.Productreservation, {keepAlive: false, title: '理财产品'});
addRouter(PageName.OrderNextSuccess, {keepAlive: false, title: '理财产品'});

/**
 * rechange
 */
addRouter(PageName.Recharge, {keepAlive: false, title: '充值'});
addRouter(PageName.Rechargefailure, {keepAlive: false, title: '充值失败'});
addRouter(PageName.Rechargesuccess, {keepAlive: false, title: '充值成功'});

/**
 * riskEvaluation 风险评估
 */
addRouter(PageName.Verificationsuccess, {keepAlive: false, title: '风险测评'}); //
addRouter(PageName.Riskassessment, {keepAlive: false, title: '风险测评'}); // ？？
addRouter(PageName.Riskproblom, {keepAlive: false, title: '风险测评'}); // 问题
addRouter(PageName.fengxianresult, {keepAlive: false, title: '风险测评'}); // 结果

/**
 * safe
 */
addRouter(PageName.Resetpassword, {keepAlive: false, title: '重置密码'});

/**
 * financingDetail
 */
addRouter(PageName.Investmentdetails, {keepAlive: false, title: '银行理财'});
addRouter(PageName.Incomeprogress, {keepAlive: false, title: '货币基金'});

// .
let router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.title) {
        document.title = to.meta.title;
    }
    // Indicator.open()

    if(to.meta.needLogin){
        let sign = util.storage.session.get(LsName.token)
        if(sign){
            next()
        }else {
            Bus.$emit(BusName.showToast,'正在去往登陆页')
            next({
                name:PageName.login,
                query:{
                    target: to.name
                }
            })
            next()
        }
    }


    next()
});


router.afterEach((to, from) => {

    Indicator.close()

});

export default router
