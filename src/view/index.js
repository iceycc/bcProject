// import {PageName} from "../Constant";
//
// let Constants = require('../Constant')
// const Pages = {}
// // Pages[Constants.PageName.login] = resolve => require(['./login/login.vue'], resolve);
// // Pages[Constants.PageName.BankAccount] = resolve => require(['./login/BankAccount.vue'], resolve);
// // Pages[Constants.PageName.Productlist] = resolve => require(['./product/Productlist.vue'], resolve);
// // Pages[Constants.PageName.Rechargesuccess] = resolve => require(['./rechange/Rechargesuccess.vue'], resolve);
// // Pages[Constants.PageName.Rechargefailure] = resolve => require(['./rechange/Rechargefailure.vue'], resolve);
// // Pages[Constants.PageName.Resetpassword] = resolve => require(['./safe/Resetpassword.vue'], resolve);
// // Pages[Constants.PageName.DocsPage] = resolve => require(['./safe/DocsPage.vue'], resolve);
// // Pages[Constants.PageName.UserLicenseAgreement] = resolve => require(['./safe/UserLicenseAgreement.vue'], resolve);
// // Pages[Constants.PageName.Riskassessment] = resolve => require(['./riskEvaluation/Riskassessment.vue'], resolve);
// // Pages[Constants.PageName.Riskproblom] = resolve => require(['./riskEvaluation/Riskproblom.vue'], resolve);
// Pages[Constants.PageName.surebuy] = resolve => require(['./buy/surebuy.vue'], resolve);
// // Pages[Constants.PageName.Verificationsuccess] = resolve => require(['./riskEvaluation/Verificationsuccess.vue'], resolve);
// // Pages[Constants.PageName.Recharge] = resolve => require(['./rechange/Recharge.vue'], resolve);
// // Pages[Constants.PageName.opening3] = resolve => require(['./open/opening3.vue'], resolve);
// // Pages[Constants.PageName.opening2] = resolve => require(['./open/opening2.vue'], resolve);
// // Pages[Constants.PageName.opening] = resolve => require(['./open/opening.vue'], resolve);
// // Pages[Constants.PageName.Investmentdetails] = resolve => require(['./financingDetail/Investmentdetails.vue'], resolve);
// // Pages[Constants.PageName.Incomeprogress] = resolve => require(['./financingDetail/Incomeprogress.vue'], resolve);
// // Pages[Constants.PageName.Buysuccess] = resolve => require(['./buy/Buysuccess.vue'], resolve);
// // Pages[Constants.PageName.Buyfailed] = resolve => require(['./buy/Buyfailed.vue'], resolve);
// // Pages[Constants.PageName.Buying] = resolve => require(['./buy/Buying.vue'], resolve);
// // Pages[Constants.PageName.OrderNextSuccess] = resolve => require(['./product/OrderNextSuccess.vue'], resolve);
// // Pages[Constants.PageName.Productreservation] = resolve => require(['./product/Productreservation.vue'], resolve);
// // Pages[Constants.PageName.fengxianresult] = resolve => require(['./riskEvaluation/fengxianresult.vue'], resolve);
// // 理财产品
// // Pages[Constants.PageName.Financialproducts] = resolve => require(['./financingList/Financialproducts.vue'], resolve);
// // 交易明细
// // Pages[Constants.PageName.Transactiondetails ] = resolve => require(['./financingList/Transactiondetails.vue'], resolve);
//
//
//
// // Pages[Constants.PageName.BankDetail] = resolve => require(['./bankDetail/bankDetail.vue'], resolve);
// // Pages[Constants.PageName.BankBalance] = resolve => require(['./bankDetail/BankBalance.vue'], resolve);
// // Pages[Constants.PageName.MoreService] = resolve => require(['./bankDetail/MoreService.vue'], resolve);
// // Pages[Constants.PageName.ChangeBank] = resolve => require(['./safe/ChangeBank.vue'], resolve);
// // Pages[Constants.PageName.ResetPayPassWord] = resolve => require(['./safe/ResetPayPassWord.vue'], resolve);
// // Pages[Constants.PageName.ResetPhone] = resolve => require(['./safe/ResetPhone.vue'], resolve);
// // Pages[Constants.PageName.Withdraw] = resolve => require(['./withdraw/Withdraw.vue'], resolve);
// // Pages[Constants.PageName.WithdrawSuccess] = resolve => require(['./withdraw/WithdrawSuccess.vue'], resolve);
// // Pages[Constants.PageName.WithdrawFaild] = resolve => require(['./withdraw/WithdrawFaild.vue'], resolve);
// // Pages[Constants.PageName.WaitForWithdraw] = resolve => require(['./withdraw/WaitForWithdraw.vue'], resolve);
// // Pages[Constants.PageName.PayDetail] = resolve => require(['./bankDetail/PayDetail.vue'], resolve);
//
// export default Pages
//
// function addRouter(name, meta) {
//   frameIn.push({
//     path: '/' + name.replace(/-/g, '/'),
//     name: name,
//     component: PageComponents[name],
//     meta: Object.assign(
//         {
//           keepAlive: false,
//           needLogin: true
//         }
//         , meta)
//   });
// }
//
// /**
//  * buy
//  */
//
// addRouter(PageName.Buyfailed, {keepAlive: false, title: '购买失败',needLogin: false});
// addRouter(PageName.Buysuccess, {keepAlive: false, title: '购买成功',needLogin: false});
// addRouter(PageName.surebuy, {keepAlive: false, title: '购买'});
// addRouter(PageName.Buying, {keepAlive: false, title: '购买'});
//
// /**
//  * login
//  */
// addRouter(PageName.login, {keepAlive: false, title: '安全登录', needLogin: false});
// addRouter(PageName.BankAccount, {keepAlive: false, title: '电子账户', needLogin: false});
// /**
//  * open
//  */
// addRouter(PageName.opening, {keepAlive: true, title: '信息填写', needLogin: false});
// addRouter(PageName.opening2, {keepAlive: false, title: '信息填写', needLogin: false});
// addRouter(PageName.opening3, {keepAlive: false, title: '信息填写', needLogin: false});
//
//
// /**
//  * product
//  */
// addRouter(PageName.Productlist, {keepAlive: false, title: '产品列表', needLogin: false});
// addRouter(PageName.Productlist2, {keepAlive: false, title: '产品列表', needLogin: false});
// addRouter(PageName.Productreservation, {keepAlive: false, needLogin: false});
// addRouter(PageName.OrderNextSuccess, {keepAlive: false, title: '预约成功'});
//
// /**
//  * rechange
//  */
// addRouter(PageName.Recharge, {keepAlive: false, title: '充值'});
// addRouter(PageName.Rechargefailure, {keepAlive: false, title: '充值失败'});
// addRouter(PageName.Rechargesuccess, {keepAlive: false, title: '充值成功'});
//
// /**
//  * riskEvaluation 风险评估
//  */
// addRouter(PageName.Verificationsuccess, {keepAlive: false, title: '风险测评'}); //
// addRouter(PageName.Riskassessment, {keepAlive: false, title: '风险测评'}); // ？？
// addRouter(PageName.Riskproblom, {keepAlive: false, title: '风险测评'}); // 问题
// addRouter(PageName.fengxianresult, {keepAlive: false, title: '风险测评'}); // 结果
//
// /**
//  * safe
//  */
// addRouter(PageName.Resetpassword, {keepAlive: false, title: '重置密码', needLogin: false});
// addRouter(PageName.DocsPage, {keepAlive: false, title: '协议', needLogin: true});
// addRouter(PageName.UserLicenseAgreement, {keepAlive: false, title: '用户授权服务协议', needLogin: false});
// addRouter(PageName.ChangeBank, {keepAlive: false, title: '更换银行卡',needLogin:false});
// addRouter(PageName.ResetPayPassWord, {keepAlive: false, title: '更换支付密码',needLogin:false});
// addRouter(PageName.ResetPhone, {keepAlive: false, title: '修改手机号',needLogin:false});
//
//
// /**
//  * financingDetail
//  */
// addRouter(PageName.Investmentdetails, {keepAlive: false, title: '银行理财'});
// addRouter(PageName.Incomeprogress, {keepAlive: false, title: '货币基金'});
//
// /**
//  * bankDetail
//  */
// addRouter(PageName.BankDetail, {keepAlive: true, title: '我的银行',needLogin:false});
// addRouter(PageName.BankBalance, {keepAlive: false, title: '可用余额',needLogin:false});
// addRouter(PageName.MoreService, {keepAlive: false, title: '更多服务',needLogin:false});
//
// /**
//  * Withdraw
//  */
// addRouter(PageName.Withdraw, {keepAlive: false, title: '提现',needLogin:false});
// addRouter(PageName.WithdrawSuccess, {keepAlive: false, title: '提现成功',needLogin:false});
// addRouter(PageName.WithdrawFaild, {keepAlive: false, title: '提现失败',needLogin:false});
// addRouter(PageName.PayDetail, {keepAlive: false, title: '交易明细',needLogin:false});
// addRouter(PageName.WaitForWithdraw, {keepAlive: false, title: '提现',needLogin:false});
//
//
// //
//
// /**
//  * financingList
//  */
// addRouter(PageName.Financialproducts, {keepAlive: false, title: '理财产品', needLogin: true});
// addRouter(PageName.Transactiondetails, {keepAlive: false, title: '交易明细', needLogin: true});
