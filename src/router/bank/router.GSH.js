import {PageName} from "@/Constant";

export default [

  /**
   * buy
   */
  {
    path: '/' + PageName.BuyFailed,
    name: PageName.BuyFailed,
    component: resolve => require(['views/GSH/buy/BuyFailed.vue'], resolve),
    meta: {keepAlive: false, title: '存入', needLogin: false}
  },
  {
    path: '/' + PageName.BuySuccess,
    name: PageName.BuySuccess,
    component: resolve => require(['views/GSH/buy/BuySuccess.vue'], resolve),
    meta: {keepAlive: false, title: '存入', needLogin: false}

  },
  {
    path: '/' + PageName.Buying,
    name: PageName.Buying,
    component: resolve => require(['views/GSH/buy/Buying.vue'], resolve),
    meta: {keepAlive: false, title: '存入', needLogin: false}
  },

  /**
   * open 开户
   */
  {
    path: '/' + PageName.Opening1,
    name: PageName.Opening1,
    component: resolve => require(['views/GSH/open/Opening1.vue'], resolve),
    meta: {keepAlive: false, title: '开户', needLogin: false}
  },
  {
    path: '/' + PageName.Opening2,
    name: PageName.Opening2,
    component: resolve => require(['views/GSH/open/Opening2.vue'], resolve),
    meta: {keepAlive: false, title: '绑定银行卡', needLogin: false}
  },
  {
    path: '/' + PageName.Opening3,
    name: PageName.Opening3,
    component: resolve => require(['views/GSH/open/Opening3.vue'], resolve),
    meta: {keepAlive: false, title: '信息填写', needLogin: false}
  },
  /**
   * rechange
   */
  {
    path: '/' + PageName.Recharge,
    name: PageName.Recharge,
    component: resolve => require(['views/GSH/rechange/Recharge.vue'], resolve),
    meta: {keepAlive: false, title: '充值', needLogin: false}
  },
  {
    path: '/' + PageName.RechargeFailure,
    name: PageName.RechargeFailure,
    component: resolve => require(['views/GSH/rechange/RechargeFailure.vue'], resolve),
    meta: {keepAlive: false, title: '充值', needLogin: false}
  },
  {
    path: '/' + PageName.RechargeSuccess,
    name: PageName.RechargeSuccess,
    component: resolve => require(['views/GSH/rechange/RechargeSuccess.vue'], resolve),
    meta: {keepAlive: false, title: '充值', needLogin: false}
  },
  {
    path: '/' + PageName.RechargeWait,
    name: PageName.RechargeWait,
    component: resolve => require(['views/GSH/rechange/RechargeWait.vue'], resolve),
    meta: {keepAlive: false, title: '充值', needLogin: false}
  },
  /**
   * safe
   */

  {
    path: '/' + PageName.DocsPage,
    name: PageName.DocsPage,
    component: resolve => require(['views/GSH/safe/DocsPage.vue'], resolve),
    meta: {keepAlive: false, title: '协议', needLogin: false}
  },
  {
    path: '/' + PageName.UserLicenseAgreement,
    name: PageName.UserLicenseAgreement,
    component: resolve => require(['views/GSH/safe/UserLicenseAgreement.vue'], resolve),
    meta: {keepAlive: false, title: '用户授权服务协议', needLogin: false}
  },
  {
    path: '/' + PageName.AddNewBank,
    name: PageName.AddNewBank,
    component: resolve => require(['views/GSH/safe/AddNewBank.vue'], resolve),
    meta: {keepAlive: false, title: '添加新银行卡', needLogin: false}
  },

  /**
   * bankDetail
   */
  {
    path: '/' + PageName.BankDetail,
    name: PageName.BankDetail,
    component: resolve => require(['views/GSH/bankDetail/BankDetail.vue'], resolve),
    meta: {keepAlive: false, title: '工商银行', needLogin: false}
  },
  {
    path: '/' + PageName.BankBalance,
    name: PageName.BankBalance,
    component: resolve => require(['views/GSH/bankDetail/BankBalance.vue'], resolve),
    meta: {keepAlive: false, title: '可用余额', needLogin: false}
  },
  {
    path: '/' + PageName.MoreService,
    name: PageName.MoreService,
    component: resolve => require(['views/GSH/bankDetail/MoreService.vue'], resolve),
    meta: {keepAlive: false, title: '更多服务', needLogin: false}
  },
  {
    path: '/' + PageName.DealDetails,
    name: PageName.DealDetails,
    component: resolve => require(['views/GSH/bankDetail/DealDetails.vue'], resolve),
    meta: {keepAlive: false, title: '交易明细', needLogin: false}
  },

  /**
   * Withdraw
   */
  {
    path: '/' + PageName.Withdraw,
    name: PageName.Withdraw,
    component: resolve => require(['views/GSH/withdraw/Withdraw.vue'], resolve),
    meta: {keepAlive: false, title: '提现', needLogin: false}
  },
  {
    path: '/' + PageName.WithdrawSuccess,
    name: PageName.WithdrawSuccess,
    component: resolve => require(['views/GSH/withdraw/WithdrawSuccess.vue'], resolve),
    meta: {keepAlive: false, title: '提现', needLogin: false}
  },
  {
    path: '/' + PageName.WithdrawFaild,
    name: PageName.WithdrawFaild,
    component: resolve => require(['views/GSH/withdraw/WithdrawFaild.vue'], resolve),
    meta: {keepAlive: false, title: '提现', needLogin: false}
  },
  {
    path: '/' + PageName.PayDetail,
    name: PageName.PayDetail,
    component: resolve => require(['views/GSH/bankDetail/PayDetail.vue'], resolve),
    meta: {keepAlive: false, title: '交易明细', needLogin: false}
  },
  {
    path: '/' + PageName.PayOneDetail,
    name: PageName.PayOneDetail,
    component: resolve => require(['views/GSH/bankDetail/PayOneDetail.vue'], resolve),
    meta: {keepAlive: false, title: '明细', needLogin: false}
  },
  {
    path: '/' + PageName.WaitForWithdraw,
    name: PageName.WaitForWithdraw,
    component: resolve => require(['views/GSH/withdraw/WaitForWithdraw.vue'], resolve),
    meta: {keepAlive: false, title: '提现', needLogin: false}
  },
  // InHanding 提现进度查询
  {
    path: '/' + PageName.InHanding,
    name: PageName.InHanding,
    component: resolve => require(['views/GSH/bankDetail/InHanding.vue'], resolve),
    meta: {keepAlive: false, title: '提现处理中记录', needLogin: false}
  },
  /**
   * financingList
   */
  {
    path: '/' + PageName.FinancialProducts,
    name: PageName.FinancialProducts,
    component: resolve => require(['views/GSH/financingList/FinancialProducts.vue'], resolve),
    meta: {keepAlive: false, title: '存款产品', needLogin: false}
  },
  {
    path: '/' + PageName.TransactionDetails,
    name: PageName.TransactionDetails,
    component: resolve => require(['views/GSH/financingList/TransactionDetails.vue'], resolve),
    meta: {keepAlive: false, title: '交易明细', needLogin: false}
  },
  /**
   * 新增：支取
   */
  {
    path: '/' + PageName.Redeem,
    name: PageName.Redeem,
    component: resolve => require(['views/GSH/redeem/Redeem.vue'], resolve),
    meta: {keepAlive: false, title: '支取', needLogin: false}
  },
  {
    path: '/' + PageName.RedeemSuccess,
    name: PageName.RedeemSuccess,
    component: resolve => require(['views/GSH/redeem/RedeemSuccess.vue'], resolve),
    meta: {keepAlive: false, title: '支取', needLogin: false}
  },
  {
    path: '/' + PageName.RedeemFailure,
    name: PageName.RedeemFailure,
    component: resolve => require(['views/GSH/redeem/RedeemFailure.vue'], resolve),
    meta: {keepAlive: false, title: '支取', needLogin: false}
  },
  /**
   *  BindingBank
   */
  {
    path: '/' + PageName.BindingBank,
    name: PageName.BindingBank,
    component: resolve => require(['views/GSH/safe/BindingBank.vue'], resolve),
    meta: {keepAlive: false, title: '绑定银行卡', needLogin: false}
  }
]
