import {PageName} from "@/Constant";

export default [
  {
    path: '/' + PageName.ProductReservation,
    name: PageName.ProductReservation,
    component: resolve => require(['views/ZZH/product/ProductReservation.vue'], resolve),
    meta: {keepAlive: false, needLogin: false}
  },
  {
    path: '/' + PageName.OrderNextSuccess,
    name: PageName.OrderNextSuccess,
    component: resolve => require(['views/ZZH/product/OrderNextSuccess.vue'], resolve),
    meta: {keepAlive: false, title: '预约成功', needLogin: false}
  },
  /**
   * buy
   */
  {
    path: '/' + PageName.BuyFailed,
    name: PageName.BuyFailed,
    component: resolve => require(['views/ZZH/buy/BuyFailed.vue'], resolve),
    meta: {keepAlive: false, title: '购买', needLogin: false}
  },
  {
    path: '/' + PageName.BuySuccess,
    name: PageName.BuySuccess,
    component: resolve => require(['views/ZZH/buy/BuySuccess.vue'], resolve),
    meta: {keepAlive: false, title: '购买', needLogin: false}

  },
  {
    path: '/' + PageName.SureBuy,
    name: PageName.SureBuy,
    component: resolve => require(['views/ZZH/buy/SureBuy.vue'], resolve),
    meta: {keepAlive: false, title: '购买', needLogin: false}
  },
  {
    path: '/' + PageName.Buying,
    name: PageName.Buying,
    component: resolve => require(['views/ZZH/buy/Buying.vue'], resolve),
    meta: {keepAlive: false, title: '购买', needLogin: false}
  },


  /**
   * login
   */
  // {
  //   path: '/' + PageName.Login,
  //   name: PageName.Login,
  //   component: resolve => require(['views/common/login/LoginByBicai/Login.vue'], resolve),
  //   // component: resolve => require(['views/ZZH/login/Login.vue'], resolve),
  //   meta: {keepAlive: false, title: '安全登录', needLogin: false}
  // },
  /**
   * open 开户
   */
  {
    path: '/' + PageName.Opening1,
    name: PageName.Opening1,
    component: resolve => require(['views/ZZH/open/Opening1.vue'], resolve),
    meta: {keepAlive: false, title: '开户', needLogin: false}
  },
  {
    path: '/' + PageName.Opening2,
    name: PageName.Opening2,
    component: resolve => require(['views/ZZH/open/Opening2.vue'], resolve),
    meta: {keepAlive: false, title: '绑定银行卡', needLogin: false}
  },
  {
    path: '/' + PageName.Opening3,
    name: PageName.Opening3,
    component: resolve => require(['views/ZZH/open/Opening3.vue'], resolve),
    meta: {keepAlive: false, title: '设置密码', needLogin: false}
  },
  /**
   * rechange
   */
  {
    path: '/' + PageName.Recharge,
    name: PageName.Recharge,
    component: resolve => require(['views/ZZH/rechange/Recharge.vue'], resolve),
    meta: {keepAlive: false, title: '充值', needLogin: false}
  },
  {
    path: '/' + PageName.RechargeFailure,
    name: PageName.RechargeFailure,
    component: resolve => require(['views/ZZH/rechange/RechargeFailure.vue'], resolve),
    meta: {keepAlive: false, title: '充值失败', needLogin: false}
  },
  {
    path: '/' + PageName.RechargeSuccess,
    name: PageName.RechargeSuccess,
    component: resolve => require(['views/ZZH/rechange/RechargeSuccess.vue'], resolve),
    meta: {keepAlive: false, title: '充值成功', needLogin: false}
  },
  /**
   * riskEvaluation 风险评估
   */
  {
    path: '/' + PageName.VerificationSuccess,
    name: PageName.VerificationSuccess,
    component: resolve => require(['views/ZZH/riskEvaluation/VerificationSuccess.vue'], resolve),
    meta: {keepAlive: false, title: '风险测评', needLogin: false}
  },
  {
    path: '/' + PageName.Riskproblom,
    name: PageName.Riskproblom,
    component: resolve => require(['views/ZZH/riskEvaluation/Riskproblom.vue'], resolve),
    meta: {keepAlive: false, title: '风险测评', needLogin: false}
  },
  {
    path: '/' + PageName.FengxianResult,
    name: PageName.FengxianResult,
    component: resolve => require(['views/ZZH/riskEvaluation/FengxianResult.vue'], resolve),
    meta: {keepAlive: false, title: '风险测评', needLogin: false}
  },
  /**
   * safe
   */
  {
    path: '/' + PageName.ResetPassword,
    name: PageName.ResetPassword,
    component: resolve => require(['views/ZZH/safe/ResetPassword.vue'], resolve),
    meta: {keepAlive: false, title: '重置密码', needLogin: false}
  },
  {
    path: '/' + PageName.DocsPage,
    name: PageName.DocsPage,
    component: resolve => require(['views/ZZH/safe/DocsPage.vue'], resolve),
    meta: {keepAlive: false, title: '协议', needLogin: false}
  },
  {
    path: '/' + PageName.UserLicenseAgreement,
    name: PageName.UserLicenseAgreement,
    component: resolve => require(['views/ZZH/safe/UserLicenseAgreement.vue'], resolve),
    meta: {keepAlive: false, title: '用户授权服务协议', needLogin: false}
  },
  {
    path: '/' + PageName.ChangeBank,
    name: PageName.ChangeBank,
    component: resolve => require(['views/ZZH/safe/ChangeBank.vue'], resolve),
    meta: {keepAlive: false, title: '更换银行卡', needLogin: false}
  },
  {
    path: '/' + PageName.ResetPayPassword,
    name: PageName.ResetPayPassword,
    component: resolve => require(['views/ZZH/safe/ResetPayPassword.vue'], resolve),
    meta: {keepAlive: false, title: '重置支付密码', needLogin: false}
  },
  {
    path: '/' + PageName.ResetPayPasswordApply,
    name: PageName.ResetPayPasswordApply,
    component: resolve => require(['views/ZZH/safe/ResetPayPasswordApply.vue'], resolve),
    meta: {keepAlive: false, title: '重置支付密码申请', needLogin: false}
  },
  {
    path: '/' + PageName.ResetPayPasswordStatus,
    name: PageName.ResetPayPasswordStatus,
    component: resolve => require(['views/ZZH/safe/ResetPayPasswordStatus.vue'], resolve),
    meta: {keepAlive: false, title: '重置支付密码申请', needLogin: false}
  },
  {
    path: '/' + PageName.ResetPhone,
    name: PageName.ResetPhone,
    component: resolve => require(['views/ZZH/safe/ResetPhone.vue'], resolve),
    meta: {keepAlive: false, title: '修改手机号', needLogin: false}
  },
  {
    path: '/' + PageName.ChangePayPassword,
    name: PageName.ChangePayPassword,
    component: resolve => require(['views/ZZH/safe/ChangePayPassword.vue'], resolve),
    meta: {keepAlive: false, title: '更换支付密码', needLogin: false}
  },

  /**
   * financingDetail
   */
  {
    path: '/' + PageName.InvestmentDetails,
    name: PageName.InvestmentDetails,
    component: resolve => require(['views/ZZH/financingDetail/InvestmentDetails.vue'], resolve),
    meta: {keepAlive: false, title: '银行理财', needLogin: false}
  },
  {
    path: '/' + PageName.IncomeProgress,
    name: PageName.IncomeProgress,
    component: resolve => require(['views/ZZH/financingDetail/IncomeProgress.vue'], resolve),
    meta: {keepAlive: false, title: '货币基金', needLogin: false}
  },

  /**
   * bankDetail
   */
  {
    path: '/' + PageName.BankDetail,
    name: PageName.BankDetail,
    component: resolve => require(['views/ZZH/bankDetail/BankDetail.vue'], resolve),
    meta: {keepAlive: false, title: '郑州银行', needLogin: false}
  },
  {
    path: '/' + PageName.BankBalance,
    name: PageName.BankBalance,
    component: resolve => require(['views/ZZH/bankDetail/BankBalance.vue'], resolve),
    meta: {keepAlive: false, title: '可用余额', needLogin: false}
  },
  {
    path: '/' + PageName.MoreService,
    name: PageName.MoreService,
    component: resolve => require(['views/ZZH/bankDetail/MoreService.vue'], resolve),
    meta: {keepAlive: false, title: '更多服务', needLogin: false}
  },
  {
    path: '/' + PageName.DealDetails,
    name: PageName.DealDetails,
    component: resolve => require(['views/ZZH/bankDetail/DealDetails.vue'], resolve),
    meta: {keepAlive: false, title: '交易明细', needLogin: false}
  },
  {
    path: '/' + PageName.PayOneDetail,
    name: PageName.PayOneDetail,
    component: resolve => require(['views/ZZH/bankDetail/PayOneDetail.vue'], resolve),
    meta: {keepAlive: false, title: '明细', needLogin: false}
  },
  /**
   * Withdraw
   */
  {
    path: '/' + PageName.Withdraw,
    name: PageName.Withdraw,
    component: resolve => require(['views/ZZH/withdraw/Withdraw.vue'], resolve),
    meta: {keepAlive: false, title: '提现', needLogin: false}
  },
  {
    path: '/' + PageName.WithdrawSuccess,
    name: PageName.WithdrawSuccess,
    component: resolve => require(['views/ZZH/withdraw/WithdrawSuccess.vue'], resolve),
    meta: {keepAlive: false, title: '提现成功', needLogin: false}
  },
  {
    path: '/' + PageName.WithdrawFaild,
    name: PageName.WithdrawFaild,
    component: resolve => require(['views/ZZH/withdraw/WithdrawFaild.vue'], resolve),
    meta: {keepAlive: false, title: '提现失败', needLogin: false}
  },
  {
    path: '/' + PageName.PayDetail,
    name: PageName.PayDetail,
    component: resolve => require(['views/ZZH/bankDetail/PayDetail.vue'], resolve),
    meta: {keepAlive: false, title: '交易明细', needLogin: false}
  },
  {
    path: '/' + PageName.WaitForWithdraw,
    name: PageName.WaitForWithdraw,
    component: resolve => require(['views/ZZH/withdraw/WaitForWithdraw.vue'], resolve),
    meta: {keepAlive: false, title: '提现', needLogin: false}
  },
  /**
   * financingList
   */
  {
    path: '/' + PageName.FinancialProducts,
    name: PageName.FinancialProducts,
    component: resolve => require(['views/ZZH/financingList/FinancialProducts.vue'], resolve),
    meta: {keepAlive: false, title: '货币基金', needLogin: false}
  },
  {
    path: '/' + PageName.TransactionDetails,
    name: PageName.TransactionDetails,
    component: resolve => require(['views/ZZH/financingList/TransactionDetails.vue'], resolve),
    meta: {keepAlive: false, title: '交易明细', needLogin: false}
  },
  {
    path: '/' + PageName.ProPayDetail,
    name: PageName.ProPayDetail,
    component: resolve => require(['views/ZZH/financingList/ProPayDetail.vue'], resolve),
    meta: {keepAlive: false, title: '明细', needLogin: false}
  },
  /**
   * 郑州新增：赎回
   */
  {
    path: '/' + PageName.Redeem,
    name: PageName.Redeem,
    component: resolve => require(['views/ZZH/redeem/Redeem.vue'], resolve),
    meta: {keepAlive: false, title: '赎回', needLogin: false}
  },
  {
    path: '/' + PageName.RedeemSuccess,
    name: PageName.RedeemSuccess,
    component: resolve => require(['views/ZZH/redeem/RedeemSuccess.vue'], resolve),
    meta: {keepAlive: false, title: '赎回', needLogin: false}
  },
  {
    path: '/' + PageName.RedeemFailure,
    name: PageName.RedeemFailure,
    component: resolve => require(['views/ZZH/redeem/RedeemFailure.vue'], resolve),
    meta: {keepAlive: false, title: '赎回', needLogin: false}
  },


]