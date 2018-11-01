import {PageName} from '../Constant'

let frameIn = [
  {
    path: '/',
    redirect: {
      path: PageName.BankAccount
    }
  },
  /**
   * buy
   */
  {
    path: '/' + PageName.Buyfailed,
    name: PageName.Buyfailed,
    component: resolve => require(['views/buy/Buyfailed.vue'], resolve),
    meta: {keepAlive: false, title: '购买失败', needLogin: false}
  },
  {
    path: '/' + PageName.Buysuccess,
    name: PageName.Buysuccess,
    component: resolve => require(['views/buy/Buysuccess.vue'], resolve),
    meta: {keepAlive: false, title: '购买成功', needLogin: false}

  },
  {
    path: '/' + PageName.surebuy,
    name: PageName.surebuy,
    component: resolve => require(['views/buy/surebuy.vue'], resolve),
    meta: {keepAlive: false, title: '购买', needLogin: false}
  },
  {
    path: '/' + PageName.Buying,
    name: PageName.Buying,
    component: resolve => require(['views/buy/Buying.vue'], resolve),
    meta: {keepAlive: false, title: '购买', needLogin: false}
  },

  /**
   * login
   */
  {
    path: '/' + PageName.login,
    name: PageName.login,
    component: resolve => require(['views/login/login.vue'], resolve),
    meta: {keepAlive: false, title: '安全登录', needLogin: false}
  },
  {
    path: '/' + PageName.BankAccount,
    name: PageName.BankAccount,
    component: resolve => require(['views/login/BankAccount.vue'], resolve),
    meta: {keepAlive: false, title: '电子账户', needLogin: false}
  },


  /**
   * open 开户
   */
  {
    path: '/' + PageName.opening,
    name: PageName.opening,
    component: resolve => require(['views/open/opening.vue'], resolve),
    meta: {keepAlive: false, title: '信息填写', needLogin: false}
  },
  {
    path: '/' + PageName.opening2,
    name: PageName.opening2,
    component: resolve => require(['views/open/opening2.vue'], resolve),
    meta: {keepAlive: false, title: '信息填写', needLogin: false}
  },
  {
    path: '/' + PageName.opening3,
    name: PageName.opening3,
    component: resolve => require(['views/open/opening3.vue'], resolve),
    meta: {keepAlive: false, title: '信息填写', needLogin: false}
  },

  /**
   * product
   */
  {
    path: '/' + PageName.Productlist,
    name: PageName.Productlist,
    component: resolve => require(['views/product/Productlist.vue'], resolve),
    meta: {keepAlive: false, title: '产品列表', needLogin: false}
  },
  {
    path: '/' + PageName.Productreservation,
    name: PageName.Productreservation,
    component: resolve => require(['views/product/Productreservation.vue'], resolve),
    meta: {keepAlive: false, needLogin: false}
  },
  {
    path: '/' + PageName.OrderNextSuccess,
    name: PageName.OrderNextSuccess,
    component: resolve => require(['views/product/OrderNextSuccess.vue'], resolve),
    meta: {keepAlive: false, title: '预约成功', needLogin: false}
  },

  /**
   * rechange
   */
  {
    path: '/' + PageName.Recharge,
    name: PageName.Recharge,
    component: resolve => require(['views/rechange/Recharge.vue'], resolve),
    meta: {keepAlive: false, title: '充值', needLogin: false}
  },
  {
    path: '/' + PageName.Rechargefailure,
    name: PageName.Rechargefailure,
    component: resolve => require(['views/rechange/Rechargefailure.vue'], resolve),
    meta: {keepAlive: false, title: '充值失败', needLogin: false}
  },
  {
    path: '/' + PageName.Rechargesuccess,
    name: PageName.Rechargesuccess,
    component: resolve => require(['views/rechange/Rechargesuccess.vue'], resolve),
    meta: {keepAlive: false, title: '充值成功', needLogin: false}
  },
  /**
   * riskEvaluation 风险评估
   */
  {
    path: '/' + PageName.Verificationsuccess,
    name: PageName.Verificationsuccess,
    component: resolve => require(['views/riskEvaluation/Verificationsuccess.vue'], resolve),
    meta: {keepAlive: false, title: '风险测评', needLogin: false}
  },
  {
    path: '/' + PageName.Riskproblom,
    name: PageName.Riskproblom,
    component: resolve => require(['views/riskEvaluation/Riskproblom.vue'], resolve),
    meta: {keepAlive: false, title: '风险测评', needLogin: false}
  },
  {
    path: '/' + PageName.fengxianresult,
    name: PageName.fengxianresult,
    component: resolve => require(['views/riskEvaluation/fengxianresult.vue'], resolve),
    meta: {keepAlive: false, title: '风险测评', needLogin: false}
  },
  /**
   * safe
   */
  {
    path: '/' + PageName.Resetpassword,
    name: PageName.Resetpassword,
    component: resolve => require(['views/safe/Resetpassword.vue'], resolve),
    meta: {keepAlive: false, title: '重置密码', needLogin: false}
  },
  {
    path: '/' + PageName.DocsPage,
    name: PageName.DocsPage,
    component: resolve => require(['views/safe/DocsPage.vue'], resolve),
    meta: {keepAlive: false, title: '协议', needLogin: false}
  },
  {
    path: '/' + PageName.UserLicenseAgreement,
    name: PageName.UserLicenseAgreement,
    component: resolve => require(['views/safe/UserLicenseAgreement.vue'], resolve),
    meta: {keepAlive: false, title: '用户授权服务协议', needLogin: false}
  },
  {
    path: '/' + PageName.ChangeBank,
    name: PageName.ChangeBank,
    component: resolve => require(['views/safe/ChangeBank.vue'], resolve),
    meta: {keepAlive: false, title: '更换银行卡', needLogin: false}
  },
  {
    path: '/' + PageName.ResetPayPassWord,
    name: PageName.ResetPayPassWord,
    component: resolve => require(['views/safe/ResetPayPassWord.vue'], resolve),
    meta: {keepAlive: false, title: '更换支付密码', needLogin: false}
  },
  {
    path: '/' + PageName.ResetPhone,
    name: PageName.ResetPhone,
    component: resolve => require(['views/safe/ResetPhone.vue'], resolve),
    meta: {keepAlive: false, title: '修改手机号', needLogin: false}
  },

  /**
   * financingDetail
   */
  {
    path: '/' + PageName.Investmentdetails,
    name: PageName.Investmentdetails,
    component: resolve => require(['views/financingDetail/Investmentdetails.vue'], resolve),
    meta: {keepAlive: false, title: '银行理财', needLogin: false}
  },
  {
    path: '/' + PageName.Incomeprogress,
    name: PageName.Incomeprogress,
    component: resolve => require(['views/financingDetail/Incomeprogress.vue'], resolve),
    meta: {keepAlive: false, title: '货币基金', needLogin: false}
  },

  /**
   * bankDetail
   */
  {
    path: '/' + PageName.BankDetail,
    name: PageName.BankDetail,
    component: resolve => require(['views/bankDetail/BankDetail.vue'], resolve),
    meta: {keepAlive: false, title: '我的银行', needLogin: false}
  },
  {
    path: '/' + PageName.BankBalance,
    name: PageName.BankBalance,
    component: resolve => require(['views/bankDetail/BankBalance.vue'], resolve),
    meta: {keepAlive: false, title: '可用余额', needLogin: false}
  },
  {
    path: '/' + PageName.MoreService,
    name: PageName.MoreService,
    component: resolve => require(['views/bankDetail/MoreService.vue'], resolve),
    meta: {keepAlive: false, title: '更多服务', needLogin: false}
  },

  /**
   * Withdraw
   */
  {
    path: '/' + PageName.Withdraw,
    name: PageName.Withdraw,
    component: resolve => require(['views/withdraw/Withdraw.vue'], resolve),
    meta: {keepAlive: false, title: '提现', needLogin: false}
  },
  {
    path: '/' + PageName.WithdrawSuccess,
    name: PageName.WithdrawSuccess,
    component: resolve => require(['views/withdraw/WithdrawSuccess.vue'], resolve),
    meta: {keepAlive: false, title: '提现成功', needLogin: false}
  },
  {
    path: '/' + PageName.WithdrawFaild,
    name: PageName.WithdrawFaild,
    component: resolve => require(['views/withdraw/WithdrawFaild.vue'], resolve),
    meta: {keepAlive: false, title: '提现失败', needLogin: false}
  },
  {
    path: '/' + PageName.PayDetail,
    name: PageName.PayDetail,
    component: resolve => require(['views/bankDetail/PayDetail.vue'], resolve),
    meta: {keepAlive: false, title: '交易明细', needLogin: false}
  },
  {
    path: '/' + PageName.WaitForWithdraw,
    name: PageName.WaitForWithdraw,
    component: resolve => require(['views/withdraw/WaitForWithdraw.vue'], resolve),
    meta: {keepAlive: false, title: '提现', needLogin: false}
  },
  /**
   * financingList
   */
  {
    path: '/' + PageName.Financialproducts,
    name: PageName.Financialproducts,
    component: resolve => require(['views/financingList/Financialproducts.vue'], resolve),
    meta: {keepAlive: false, title: '理财产品', needLogin: false}
  },
  {
    path: '/' + PageName.Transactiondetails,
    name: PageName.Transactiondetails,
    component: resolve => require(['views/financingList/Transactiondetails.vue'], resolve),
    meta: {keepAlive: false, title: '交易明细', needLogin: false}
  },

]


let testPage = [
  {
    path: '/' + PageName.testPage,
    name: PageName.testPage,
    component: resolve => require(['views/testPages/testPage.vue'], resolve),
  }
]

export default [
  ...frameIn,
  ...testPage
]
