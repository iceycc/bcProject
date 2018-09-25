// 静态值定义： 【应用配置】


let url = 'http://192.168.100.96'

let Configs = {
    DEV_HOST:'http://47.94.4.11:8090/finsuit', // 开发环境
    // DEV_HOST: 'https://adv.udomedia.com.cn/finsuit', // 测试
    // PRO_HOST:'http://47.94.4.11:8090/finsuit', //
    PRO_HOST:'https://adv.udomedia.com.cn/finsuit' ,//
    // PRO_HOST:'https://finsuit.udomedia.com.cn/finsuit/' ,// 生产
    APP_DOWN_URL:'http://www.baidu.com',
}
export const HOST = process.env.NODE_ENV == 'development'
        ? Configs.DEV_HOST : Configs.PRO_HOST // api 接口地址

export const AppUrl = { // app下载地址
    Android: '',
    Ios: ''
}

export const imgSrc = process.env.Img_SRC
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
    OrderNextSuccess: 'OrderNextSuccess',
    DocsPage: 'DocsPage',
    UserLicenseAgreement: 'UserLicenseAgreement',
}


export const BusName = {
    showToast: 'showToast',
    showLoading: 'showLoading',
    Indicator: 'Indicator',

}


export const LsName = {
    token: 'token',
    DEVICE_ID: 'DEVICE_ID',
    CHANNEL_ID: 'CHANNEL_ID',
    reload: 'reload', // 用于强制刷新 密码控件暂时只能强制刷新重载 否则不行
    HAS_GRADE: 'HAS_GRADE', // 是否评估 1 否  2 是
    LoginTarget: 'LoginTarget', // 其他页面跳转登录页进行跳转的页面  主要跳转后情况
    ProDuctData: 'ProDuctData', // 其他页面跳转登录页进行跳转的页面  主要跳转后情况
    LAST_STEP_NUM: 'LAST_STEP_NUM', // 开户步数
    REQ_SERIAL: 'REQ_SERIAL', // 开户流水
    loginType: 'loginType', // loginType
    ProTitle: 'ProTitle', // ProTitle
    goBuy: 'goBuy', // goBuy
}

