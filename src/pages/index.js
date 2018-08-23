
let Constants = require('../Constant')
const Pages = {}
Pages[Constants.PageName.login] = resolve => require(['./login/login.vue'], resolve);
Pages[Constants.PageName.Productlist] = resolve => require(['./product/Productlist.vue'], resolve);
Pages[Constants.PageName.Rechargesuccess] = resolve => require(['./rechange/Rechargesuccess.vue'], resolve);
Pages[Constants.PageName.Rechargefailure] = resolve => require(['./rechange/Rechargefailure.vue'], resolve);
Pages[Constants.PageName.Resetpassword] = resolve => require(['./safe/Resetpassword.vue'], resolve);
Pages[Constants.PageName.Riskassessment] = resolve => require(['./riskEvaluation/Riskassessment.vue'], resolve);
Pages[Constants.PageName.Riskproblom] = resolve => require(['./riskEvaluation/Riskproblom.vue'], resolve);
Pages[Constants.PageName.surebuy] = resolve => require(['./buy/surebuy.vue'], resolve);
Pages[Constants.PageName.Verificationsuccess] = resolve => require(['./riskEvaluation/Verificationsuccess.vue'], resolve);
Pages[Constants.PageName.Recharge] = resolve => require(['./rechange/Recharge.vue'], resolve);
Pages[Constants.PageName.opening3] = resolve => require(['./open/opening3.vue'], resolve);
Pages[Constants.PageName.opening2] = resolve => require(['./open/opening2.vue'], resolve);
Pages[Constants.PageName.opening] = resolve => require(['./open/opening.vue'], resolve);
Pages[Constants.PageName.Investmentdetails] = resolve => require(['./financingDetail/Investmentdetails.vue'], resolve);
Pages[Constants.PageName.Incomeprogress] = resolve => require(['./financingDetail/Incomeprogress.vue'], resolve);
Pages[Constants.PageName.Buysuccess] = resolve => require(['./buy/Buysuccess.vue'], resolve);
Pages[Constants.PageName.Buyfailed] = resolve => require(['./buy/Buyfailed.vue'], resolve);
Pages[Constants.PageName.Buying] = resolve => require(['./buy/Buying.vue'], resolve);
Pages[Constants.PageName.OrderNextSuccess] = resolve => require(['./product/OrderNextSuccess.vue'], resolve);
Pages[Constants.PageName.Productreservation] = resolve => require(['./product/Productreservation.vue'], resolve);
Pages[Constants.PageName.fengxianresult] = resolve => require(['./riskEvaluation/fengxianresult.vue'], resolve);

export default Pages