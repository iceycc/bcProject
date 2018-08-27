// 静态值定义： 【应用配置】




let Configs = {
    DEV_HOST:'http://47.94.4.11:8090/finsuit', // 开发环境
    // DEV_HOST:'http://192.168.100.109:8080/finsuit', // 测试
    PRO_HOST:'http://47.94.4.11:8090/finsuit' ,//
    APP_DOWN_URL:'http://www.baidu.com',
}
export const HOST = process.env.NODE_ENV == 'development'
? Configs.DEV_HOST : Configs.PRO_HOST // api 接口地址

export const AppUrl = { // app下载地址
    Android:'',
    Ios:''
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
}


export const BusName ={
    showToast:'showToast',
    showLoading:'showLoading',
    Indicator:'Indicator',

}


export const LsName ={
    token:'token',
    DEVICE_ID:'DEVICE_ID'
}

