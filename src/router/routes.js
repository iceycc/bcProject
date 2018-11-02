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
    path: '/' + PageName.BuyFailed,
    name: PageName.BuyFailed,
    component: resolve => require(['views/buy/BuyFailed.vue'], resolve),
    meta: {keepAlive: false, title: '购买失败', needLogin: false}
  },
  {
    path: '/' + PageName.BuySuccess,
    name: PageName.BuySuccess,
    component: resolve => require(['views/buy/BuySuccess.vue'], resolve),
    meta: {keepAlive: false, title: '购买成功', needLogin: false}

  },
  {
    path: '/' + PageName.SureBuy,
    name: PageName.SureBuy,
    component: resolve => require(['views/buy/SureBuy.vue'], resolve),
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
    path: '/' + PageName.Login,
    name: PageName.Login,
    component: resolve => require(['views/login/Login.vue'], resolve),
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
    path: '/' + PageName.Opening1,
    name: PageName.Opening1,
    component: resolve => require(['views/open/Opening1.vue'], resolve),
    meta: {keepAlive: false, title: '信息填写', needLogin: false}
  },
  {
    path: '/' + PageName.Opening2,
    name: PageName.Opening2,
    component: resolve => require(['views/open/Opening2.vue'], resolve),
    meta: {keepAlive: false, title: '信息填写', needLogin: false}
  },
  {
    path: '/' + PageName.Opening3,
    name: PageName.Opening3,
    component: resolve => require(['views/open/Opening3.vue'], resolve),
    meta: {keepAlive: false, title: '信息填写', needLogin: false}
  },

  /**
   * product
   */
  {
    path: '/' + PageName.ProductList,
    name: PageName.ProductList,
    component: resolve => require(['views/product/ProductList.vue'], resolve),
    meta: {keepAlive: false, title: '产品列表', needLogin: false}
  },
  {
    path: '/' + PageName.ProductReservation,
    name: PageName.ProductReservation,
    component: resolve => require(['views/product/ProductReservation.vue'], resolve),
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
    path: '/' + PageName.RechargeFailure,
    name: PageName.RechargeFailure,
    component: resolve => require(['views/rechange/RechargeFailure.vue'], resolve),
    meta: {keepAlive: false, title: '充值失败', needLogin: false}
  },
  {
    path: '/' + PageName.RechargeSuccess,
    name: PageName.RechargeSuccess,
    component: resolve => require(['views/rechange/RechargeSuccess.vue'], resolve),
    meta: {keepAlive: false, title: '充值成功', needLogin: false}
  },
  /**
   * riskEvaluation 风险评估
   */
  {
    path: '/' + PageName.VerificationSuccess,
    name: PageName.VerificationSuccess,
    component: resolve => require(['views/riskEvaluation/VerificationSuccess.vue'], resolve),
    meta: {keepAlive: false, title: '风险测评', needLogin: false}
  },
  {
    path: '/' + PageName.Riskproblom,
    name: PageName.Riskproblom,
    component: resolve => require(['views/riskEvaluation/Riskproblom.vue'], resolve),
    meta: {keepAlive: false, title: '风险测评', needLogin: false}
  },
  {
    path: '/' + PageName.FengxianResult,
    name: PageName.FengxianResult,
    component: resolve => require(['views/riskEvaluation/FengxianResult.vue'], resolve),
    meta: {keepAlive: false, title: '风险测评', needLogin: false}
  },
  /**
   * safe
   */
  {
    path: '/' + PageName.ResetPassword,
    name: PageName.ResetPassword,
    component: resolve => require(['views/safe/ResetPassword.vue'], resolve),
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
    path: '/' + PageName.ResetPayPassword,
    name: PageName.ResetPayPassword,
    component: resolve => require(['views/safe/ResetPayPassword.vue'], resolve),
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
    path: '/' + PageName.InvestmentDetails,
    name: PageName.InvestmentDetails,
    component: resolve => require(['views/financingDetail/InvestmentDetails.vue'], resolve),
    meta: {keepAlive: false, title: '银行理财', needLogin: false}
  },
  {
    path: '/' + PageName.IncomeProgress,
    name: PageName.IncomeProgress,
    component: resolve => require(['views/financingDetail/IncomeProgress.vue'], resolve),
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
    path: '/' + PageName.FinancialProducts,
    name: PageName.FinancialProducts,
    component: resolve => require(['views/financingList/FinancialProducts.vue'], resolve),
    meta: {keepAlive: false, title: '理财产品', needLogin: false}
  },
  {
    path: '/' + PageName.TransactionDetails,
    name: PageName.TransactionDetails,
    component: resolve => require(['views/financingList/TransactionDetails.vue'], resolve),
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
