// 静态值定义： 【应用配置】


let url = 'http://192.168.100.96'

/**
 *
 */
let Configs = {
    DEV_HOST: 'http://47.94.4.11:8090/finsuit', // 开发环境
    // DEV_HOST: 'https://adv.udomedia.com.cn/finsuit', // 测试
    // PRO_HOST:'http://47.94.4.11:8090/finsuit', //
    PRO_HOST: 'https://adv.udomedia.com.cn/finsuit',//
    // PRO_HOST:'https://finsuit.udomedia.com.cn/finsuit/' ,// 生产
    APP_DOWN_URL: 'http://www.baidu.com',
}
export const HOST = process.env.NODE_ENV == 'development'
        ? Configs.DEV_HOST : Configs.PRO_HOST // api 接口地址

/**
 *
 */
export const AppUrl = { // app下载地址
    Android: '',
    Ios: ''
}

/**
 * logo图片地址
 */
let imgSrcHost = {
    dev:"https://finsuit-test.oss-cn-beijing.aliyuncs.com/",
    // pro:"https://finsuit.oss-cn-beijing.aliyuncs.com/",
    pro:"https://finsuit-test.oss-cn-beijing.aliyuncs.com/",
}

export const imgSrc = process.env.NODE_ENV == 'development'?imgSrcHost.dev:imgSrcHost.pro

/**
 * page名称
 */
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
    // 理财列表
    Financialproducts: 'Financialproducts',
    // 交易明细
    Transactiondetails: 'Transactiondetails',

    /*
    wby二期新增
     */
    BankDetail:'BankDetail', // 银行详情
    BankBalance:'BankBalance', // 可用余额
    ChangeBank:'ChangeBank', // 更改银行
    ResetPayPassWord:'ResetPayPassWord', // 重制密码
    ResetPhone:'ResetPhone', // 重制手机号
    MoreService:'MoreService', // 更多服务
    SafeLogin:'SafeLogin', // 安全登陆 银行列表
    Withdraw:'Withdraw', // 提现
    WithdrawSuccess:'WithdrawSuccess', // 提现成功
    WithdrawFaild:'WithdrawFaild', // 提现失败
}

/**
 * 传值的bus名称
 */
export const BusName = {
    showToast: 'showToast',
    showLoading: 'showLoading',
    Indicator: 'Indicator',

}

/**
 * storage的名字
 */
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

