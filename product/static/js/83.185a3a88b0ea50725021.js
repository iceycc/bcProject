webpackJsonp([83],{"2C8+":function(t,n){},vK5o:function(t,n,s){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=s("xEK7"),e=s("xoIZ"),i=s("Ij8P"),o=s("0jG4"),r=s("EOwk"),c=s("MmTA"),h=(s("JIj5"),s("msXN")),k={name:"changeBank",components:{BankSelect:a.a,ActiveInput:e.a,ErrMsg:i.a},data:function(){return{bankText:"请选择银行",bankList:[],AllBankListObj:{},errMsg:"",bankNo:"",bankNameToNo:!1,params:{},ifGet:!1,OldBankInfo:{}}},mixins:[h.a.HandleMixin],created:function(){var t=this;this.getErrMsg(function(n){t.errMsg=n.msg}),this.getBankList(),this.getOldBankInfo(),this.params=this.$store.getters.GET_COMMON_STATE.Infos},watch:{bankNo:function(t,n){this.checkBankName(this.bankNo)},bankText:function(t,n){this.checkBankName(this.bankNo)}},methods:{getOldBankInfo:function(){this.OldBankInfo=this.getComState.Infos.hasCardList[0],console.log(this.OldBankInfo)},getBank:function(t){this.bankText=t.name},checkBankName:function(t,n){this.bankNameToNo=!1,t=t.replace(/\s+/g,"");for(var s=void 0,a=3;a<10;a++)if(s=this.machBankName((t+"").slice(0,a))){if(s!=this.bankText)return;this.bankNameToNo=!0;break}},checkBankNo:function(t){return t=t.toString(),"请选择银行"==this.bankText?(this.showErrMsg("请选择银行"),!0):""==t?(this.showErrMsg("银行卡号不能为空"),!0):t.length<15||t.length>19?(this.showErrMsg("银行卡号有误，请确认后再次输入"),!0):(this.checkBankName(t),!1)},machBankName:function(t){return this.AllBankListObj[t]},getBankList:function(){var t=this;o.a.list.apiGetBankCardList({},function(n){var s={};n.BAND_CARD_LIST.forEach(function(t){s[t.BANK_CARD_BIN]=t.BANK_NAME}),t.AllBankListObj=s,t.bankList=n.SUPPORT_BANK_LIST.map(function(t){return{name:t.BANK_NAME,value:0,src:r.g+t.BANK_LOGO_URL,Index:t.INITIAL}})})},showErrMsg:function(t){var n=this;this.errMsg=t,setTimeout(function(){n.errMsg=""},4e3)},checkBankType:function(){},subumit:function(){var t=this,n={PHONE_NUM:this.OldBankInfo.PHONE_NUM,OLD_ACCOUNT_NO:this.OldBankInfo.CARD_NO,NEW_ACCOUNT_NO:this.bankNo,BANK_NO:""};o.a.safe.apiChangeBingCard(n,!0,function(n){c.a.$emit(r.a.showToast,"更换银行卡成功"),t.$router.push({name:r.e.MoreService})},function(n){console.log("err>>>>>>>>1111",n),t.errMsg=n,t.ifShow=!1,t.setErrMsg({msg:n}),setTimeout(function(){window.location.reload()},500)})},goNext:function(){this.checkBankNo(this.bankNo)||(console.log("goNext>>",this.bankNameToNo),this.bankNameToNo?this.subumit():this.showErrMsg("银行卡和银行名称不匹配"))}}},l={render:function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",[s("app-bar",{attrs:{title:"更换银行卡"}}),t._v(" "),s("section",{staticClass:"m-form"},[s("section",{staticClass:"bank"},[s("span",{staticClass:"n-left"},[t._v("选择银行")]),t._v(" "),s("Bank-select",{staticClass:"bank-box",attrs:{text:t.bankText,options:t.bankList,title:"银行列表"},on:{getValue:t.getBank}})],1),t._v(" "),s("active-input",{attrs:{"check-type":"number",valuePlaceholder:"新绑定卡卡号",max:"20"},model:{value:t.bankNo,callback:function(n){t.bankNo=n},expression:"bankNo"}}),t._v(" "),s("section",{staticClass:"submit-box"},[s("err-msg",{attrs:{errMsg:t.errMsg,classStyle:"err-msg"}}),t._v(" "),s("button",{staticClass:"submit-btn",on:{click:t.goNext}},[t._v("下一步")])],1),t._v(" "),t._m(0)],1)],1)},staticRenderFns:[function(){var t=this.$createElement,n=this._self._c||t;return n("section",{staticClass:"foot-text"},[n("p",[this._v("温馨提示：")]),this._v(" "),n("p",[this._v("1.请您确认新绑定银行卡在银行绑定的手机号与旧卡 绑定手机号相同。")]),this._v(" "),n("p",[this._v("2.更换绑定银行卡前，请转出所有的投资资金并提现")])])}]};var u=s("VU/8")(k,l,!1,function(t){s("2C8+")},"data-v-45b0b150",null);n.default=u.exports}});
//# sourceMappingURL=83.185a3a88b0ea50725021.js.map