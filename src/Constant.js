// 静态值定义： 【应用配置】


/**
 * [api 后端接口相关，自动根据打包命令加载对应环境接口地址]
 * @type {Object}
 */
export const env = {
    HOST_IP: process.env.HOST_IP,
    CALL_PATH: process.env.CALL_PATH,
    INVOKE_PATH: process.env.INVOKE_PATH,
    CONTEXT_PATH: process.env.CONTEXT_PATH,
    ENV_MODE: process.env.NODE_ENV, //环境模式
    STORE_LOG_SWITCH: true, //打印VUEX日志 (仅限开发环境有效)
    PRINT_DEBUG_URL: true, //打印HTTP请求URL (仅限开发环境有效)
};

export const wx = {
    APP_ID: 'wx5afd32ac14c76152',
    TEST_OPENID: 'oJCmZw9OcAsfy-NEjeJ7uzKF7paU',
    ACCESS_TOKEN: '12_STvLdkcsI8pZfaSiRFHthJ_DwIqIuI0Hg34yWIpprYxARDioPxJ6zTBR8D1SfbyLakDa4bI6pn2qKLjZXdHet9JEvaL4C1PgExk-cMQyqVI'
};

export default {
    env: env,
    // apiBaseUrl: env.HOST_IP + "/" + env.CALL_PATH + "/" + env.INVOKE_PATH,
    apiBaseUrl: env.HOST_IP + '/' + 'finsuit/finsuitPhone/deal',
    imgCodeUrl: env.HOST_IP + '/finsuit/finsuitSafeCode/outer',
    wx_share_url: env.HOST_IP + '/llz/main/index',
    errorMsg: {
        "AccessPermissionDeny": '服务请求被拒绝，检查是否未登陆！',
        "InvalidSign": '鉴权失败，服务请求被拒绝！',
        "java.lang.IllegalStateException": '服务请求失败，请稍后再试！',
        "RuntimeException": '服务请求失败，请稍后再试！',
        "IllegalStateException": '服务请求失败，请稍后再试！',
        "InvalidService": '服务请求失败，请稍后再试！',
        "NoExporterException": '服务请求失败，请稍后再试！',
    },
}


// import login from '../pages/login.vue'
// import Productlist from '../pages/Productlist.vue'
// import Rechargesuccess from '../pages/Rechargesuccess.vue'
// import Rechargefailure from '../pages/Rechargefailure.vue'
// import Resetpassword from '../pages/Resetpassword.vue'
// import Riskassessment from '../pages/Riskassessment.vue'
// import Riskproblom from '../pages/Riskproblom.vue'
// import surebuy from '../pages/surebuy.vue'
// import Verificationsuccess from '../pages/Verificationsuccess.vue'
// import Recharge from '../pages/Recharge.vue'
// import Productlist2 from '../pages/Productlist2.vue'
// import opening3 from '../pages/opening3.vue'
// import opening2 from '../pages/opening2.vue'
// import opening from '../pages/opening.vue'
// import Investmentdetails from '../pages/Investmentdetails.vue'
// import Incomeprogress from '../pages/Incomeprogress.vue'
// import fengxianresult from '../pages/fengxianresult.vue'
// import Buysuccess from '../pages/Buysuccess.vue'
// import Buying from '../pages/Buying.vue'
// import Productreservation from '../pages/Productreservation.vue'
export const PageName = {
    login: 'login',
    Productlist: 'Productlist',
    Rechargesuccess: 'Rechargesuccess',
    Rechargefailure: 'Rechargefailure',
    Resetpassword: 'Resetpassword',
    Riskassessment: 'Riskassessment',
    Riskproblom: 'Riskproblom',
    surebuy: 'surebuy',
    Verificationsuccess: 'Verificationsuccess',
    Recharge: 'Recharge',
    Productlist2: 'Productlist2',
    opening3: 'opening3',
    opening2: 'opening2',
    opening: 'opening',
    Investmentdetails: 'Investmentdetails',
    Incomeprogress: 'Incomeprogress',
    fengxianresult: 'fengxianresult',
    Buysuccess: 'Buysuccess',
    Buying: 'Buying',
    Productreservation: 'Productreservation',
    Buyfailed: 'Buyfailed',
}


export const BusName ={
    showToast:'showToast'
}


export const LsName ={
    token:'TEEs_dW13SDaQ'
}
