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
            path: PageName.BankAccount
        }
    }
]

addRouter(PageName.testLogin, {keepAlive: false, title: 'testLogin', needLogin: false});

/**
 * buy
 */

addRouter(PageName.Buyfailed, {keepAlive: false, title: '理财产品'});
addRouter(PageName.Buysuccess, {keepAlive: false, title: '购买成功'});
addRouter(PageName.surebuy, {keepAlive: false, title: '购买'});
addRouter(PageName.Buying, {keepAlive: true, title: '购买'});

/**
 * login
 */
addRouter(PageName.login, {keepAlive: false, title: '安全登录', needLogin: false});
addRouter(PageName.BankAccount, {keepAlive: false, title: '电子账户', needLogin: false});
/**
 * open
 */
addRouter(PageName.opening, {keepAlive: true, title: '信息填写', needLogin: false});
addRouter(PageName.opening2, {keepAlive: false, title: '信息填写', needLogin: false});
addRouter(PageName.opening3, {keepAlive: false, title: '信息填写', needLogin: false});


/**
 * product
 */
addRouter(PageName.Productlist, {keepAlive: false, title: '产品列表', needLogin: false});
addRouter(PageName.Productlist2, {keepAlive: false, title: '产品列表', needLogin: false});
addRouter(PageName.Productreservation, {keepAlive: false, needLogin: false});
addRouter(PageName.OrderNextSuccess, {keepAlive: false, title: '预约成功'});

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
addRouter(PageName.Resetpassword, {keepAlive: false, title: '重置密码', needLogin: false});
addRouter(PageName.DocsPage, {keepAlive: false, title: '协议', needLogin: true});
addRouter(PageName.UserLicenseAgreement, {keepAlive: false, title: '用户授权服务协议', needLogin: false});
addRouter(PageName.ChangeBank, {keepAlive: false, title: '更换银行卡',needLogin:false});
addRouter(PageName.ResetPayPassWord, {keepAlive: false, title: '更换支付密码',needLogin:false});
addRouter(PageName.ResetPhone, {keepAlive: false, title: '更换手机号',needLogin:false});


/**
 * financingDetail
 */
addRouter(PageName.Investmentdetails, {keepAlive: false, title: '银行理财'});
addRouter(PageName.Incomeprogress, {keepAlive: false, title: '货币基金'});

/**
 * bankDetail
 */
addRouter(PageName.BankDetail, {keepAlive: false, title: '我的银行',needLogin:false});
addRouter(PageName.BankBalance, {keepAlive: false, title: '可用余额',needLogin:false});
addRouter(PageName.MoreService, {keepAlive: false, title: '更多服务',needLogin:false});

/**
 * Withdraw
 */
addRouter(PageName.Withdraw, {keepAlive: false, title: '提现',needLogin:false});
addRouter(PageName.WithdrawSuccess, {keepAlive: false, title: '提现成功',needLogin:false});
addRouter(PageName.WithdrawFaild, {keepAlive: false, title: '提现失败',needLogin:false});
addRouter(PageName.PayDetail, {keepAlive: false, title: '交易明细',needLogin:false});
addRouter(PageName.WaitForWithdraw, {keepAlive: false, title: '提现',needLogin:false});


//

/**
 * financingList
 */
addRouter(PageName.Financialproducts, {keepAlive: false, title: '理财产品', needLogin: false});
addRouter(PageName.Transactiondetails, {keepAlive: false, title: '交易明细', needLogin: false});



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
        // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
        if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            const hackIframe = document.createElement('iframe');
            hackIframe.style.display = 'none';
            hackIframe.src = '/static/html/fixIosTitle.html?r=' + Math.random();
            document.body.appendChild(hackIframe);
            setTimeout(_ => {
                document.body.removeChild(hackIframe)
            }, 300)
        }
        var iframe = document.createElement('iframe');
        iframe.style.visibility = 'hidden';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.onload = function () {
            setTimeout(function () {
                document.body.removeChild(iframe);
            }, 0);
        };
        document.body.appendChild(iframe);
    }
    // let Prot = util.storage.session.get(LsName.ProTitle) || '产品详情'
    if (to.name == PageName.Productreservation) {
        window.document.title = to.query.title;
        if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            const hackIframe = document.createElement('iframe');
            hackIframe.style.display = 'none';
            hackIframe.src = '/static/html/fixIosTitle.html?r=' + Math.random();
            document.body.appendChild(hackIframe);
            setTimeout(_ => {
                document.body.removeChild(hackIframe)
            }, 300)
        }
        var iframe = document.createElement('iframe');
        iframe.style.visibility = 'hidden';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.onload = function () {
            setTimeout(function () {
                document.body.removeChild(iframe);
            }, 0);
        };
        document.body.appendChild(iframe);
    }
    if (to.meta && to.meta.needLogin) {
        let sign = util.storage.session.get(LsName.token)
        if (sign) {
            next()
        } else {
            // Indicator.open({
            //     text:'您还未登录，请先登录'
            // })
            // setTimeout(()=>{
            //     Indicator.close()
            // },300)
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
