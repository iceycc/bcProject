webpackJsonp([22],{"8fmZ":function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("Dd8w"),i=e.n(a),o=e("0jG4"),n=e("JIj5"),c=e("EOwk"),r=e("b1t1"),l=e("msXN"),v=e("MmTA"),h={data:function(){return{imgSrc:c.g,show:!1,isFocus:!1,typeShow:!1,cur:"0",money:"",normalShow:!1,availBtn:!1,redeemData:{HOLD_AMOUNT:"",FUND_NO:"",PRD_TYPE:"1"},passCode:"",len:"",pass:"",num:""}},computed:{typeText:function(){return 0==this.cur?"快速赎回":1==this.cur?"普通赎回":void 0},ifCheckMoneyEmpty:function(){return!this.money},placeholder:function(){return this.num=this.redeemData.HOLD_AMOUNT,"最多可赎回金额"+n.a.formatNum(this.num)+"元"}},mixins:[l.a.HandleMixin,l.a.UtilMixin],watch:{money:function(s,t){this.availBtn=!!(s&&s-0>0)}},created:function(){this.redeemData=this.getComState.redeemData},components:{PassWordZhengzhou:r.a},methods:{clearNumHandle:function(){this.money=""},focus:function(){this.isFocus=!0},blur:function(){this.money.length>0?this.isFocus=!0:this.isFocus=!1},sure:function(){this.typeShow=!1,this.normalShow=!1,this.show=!0},chooseType:function(s,t){this.cur=s,this.typeShow=!1},selectAll:function(){this.isFocus=!0,this.money=this.redeemData.HOLD_AMOUNT},showPass:function(){if(console.log(this.num),console.log(this.money),this.money-0>this.num-0)v.a.$emit(c.a.showToast,"赎回金额不足");else if(1==this.cur)this.normalShow=!0;else{if(this.money-0>1e4)return void v.a.$emit(c.a.showToast,"每天快速赎回额度为1万元，请调整赎回额度");this.show=!0}},doPay:function(){this.redeemHandle()},goPage:function(){this.$router.push({name:c.e.DocsPage,query:{type:"buy"}})},redeemHandle:function(){var s=this;this.pass=$("#payPasscAAAc").getKBD(),this.len=$("#payPasscAAAc").getLenKBD(),this.passCode=$("#payPasscAAAc").getBDCode();var t={TYPE:"API_REDEMPTION",PRD_ID:this.redeemData.PRD_INDEX_ID,PRD_TYPE:this.redeemData.PRD_TYPE,FUND_TYPE:this.redeemData.PRD_TYPE,APPLY_AMOUNT:n.a.fromatMoney(this.money),REDEEM_TYPE:1==this.redeemData.PRD_TYPE?this.cur:"1",FUND_TRANS_TYPE:"2",PREFIX:this.passCode,BANK_PAY_PW:this.pass};this.show=!1,o.a.redeem.apiRedemption(t,function(t){console.log(t);var e={BIZ_TYPE:"7",BESHARP_SEQ:t.REQ_SERIAL};s.queryStatus({text:"赎回中",data:e,fn:function(t,e,a){"1"==t.RES_CODE?(clearInterval(e),v.a.$emit(c.a.showToast,t.RES_MSG),s.$router.push({name:c.e.RedeemFailure,query:{err:t.RES_MSG}})):"0"==t.RES_CODE?(clearInterval(e),v.a.$emit(c.a.showToast,t.RES_MSG),s.Londing.close(),s.$router.push({name:c.e.RedeemSuccess,query:i()({money:s.money},t)})):(clearInterval(e),v.a.$emit(c.a.showToast,t.RES_MSG),s.$router.push({name:c.e.RedeemFailure,query:{err:t.RES_MSG}}))}})})}}},u={render:function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",[a("app-bar",{attrs:{title:"赎回"}}),s._v(" "),a("div",{staticClass:"r-top"},[a("img",{attrs:{src:s.imgSrc+s.redeemData.LOGO_URL,alt:""}}),s._v(" "),a("div",[a("p",[s._v(s._s(s.redeemData.PRD_NAME))]),s._v(" "),a("span",[s._v("货币基金")])])]),s._v(" "),a("div",{staticClass:"r-cash"},[a("div",{staticClass:"title"},[s._v("赎回金额")]),s._v(" "),a("div",{staticClass:"money"},[a("div",{staticClass:"number"},[a("i",{directives:[{name:"show",rawName:"v-show",value:s.isFocus,expression:"isFocus"}]},[s._v("￥")]),s._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:s.money,expression:"money"}],attrs:{type:"number",placeholder:s.placeholder},domProps:{value:s.money},on:{focus:s.focus,blur:s.blur,input:function(t){t.target.composing||(s.money=t.target.value)}}}),s._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:!s.ifCheckMoneyEmpty,expression:"!ifCheckMoneyEmpty"}],staticClass:"close-icon",attrs:{src:e("rfOz"),alt:""},on:{click:s.clearNumHandle}})]),s._v(" "),a("div",{staticClass:"all",on:{click:s.selectAll}},[s._v("全部赎回")])])]),s._v(" "),a("div",{staticClass:"r-type"},[a("div",{staticClass:"type"},[s._v("赎回类型")]),s._v(" "),a("div",{staticClass:"choose",on:{click:function(t){s.typeShow=!0}}},[a("span",[s._v(s._s(s.typeText))]),s._v(" "),a("i",{staticClass:"iconfont icon-xiangyou"})])]),s._v(" "),s._m(0),s._v(" "),a("button",{class:["r-btn",{active:s.availBtn}],attrs:{disabled:!s.availBtn},on:{click:s.showPass}},[s._v("赎回")]),s._v(" "),a("div",{staticClass:"r-agreement"},[s._v("\n    立即赎回代表您已阅读并同意"),a("span",{on:{click:s.goPage}},[s._v("《“日添利-博时基金 ”产品业务服务协议》")])]),s._v(" "),s._m(1),s._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:s.typeShow,expression:"typeShow"}],staticClass:"grey-mask"}),s._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:s.typeShow,expression:"typeShow"}],staticClass:"r-type-popup"},[a("div",{staticClass:"title"},[s._v("\n      赎回类型\n      "),a("i",{on:{click:function(t){s.typeShow=!1}}},[s._v("×")])]),s._v(" "),a("ul",{staticClass:"r-type-list"},[a("li",{class:"0"==s.cur?"active":"",on:{click:function(t){s.chooseType("0",t)}}},[a("span",[s._v("快速赎回")]),s._v(" "),a("i")]),s._v(" "),a("li",{class:"1"==s.cur?"active":"",on:{click:function(t){s.chooseType("1",t)}}},[a("span",[s._v("普通赎回")]),s._v(" "),a("i")])])]),s._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:s.normalShow,expression:"normalShow"}],staticClass:"white-mask"}),s._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:s.normalShow,expression:"normalShow"}],staticClass:"r-normal-popup"},[a("div",{staticClass:"info"},[s._v("工作日15:30之前发起成功的普通赎回到账时间为下一个工作日16:30后到账，工作日15:00之后以及非工作日发起成功的普通赎回申请视为下一个工作日发起的交易申请。是否进行普通赎回？\n    ")]),s._v(" "),a("div",{staticClass:"cofirm-btn"},[a("div",{on:{click:function(t){s.normalShow=!1}}},[s._v("取消")]),s._v(" "),a("div",{on:{click:s.sure}},[s._v("确定")])])]),s._v(" "),s.show?a("section",{staticClass:"bgbox"},[a("section",{staticClass:"passbox"},[s._m(2),s._v(" "),a("section",{staticClass:"field_row_wrap"},[a("p",{staticClass:"field_row_key"},[s._v("\n          交易密码\n        ")]),s._v(" "),a("div",{staticClass:"field_row_value"},[a("pass-word-zhengzhou",{attrs:{BankCardPass:"payPasscAAAc"}})],1),s._v(" "),a("p",{staticClass:"info"},[s._v("密码由数字组成，必须为6位")])]),s._v(" "),a("div",{staticClass:"btn"},[a("mt-button",{attrs:{type:"primary"},on:{click:function(t){s.show=!s.show}}},[s._v("取消")]),s._v(" "),a("mt-button",{attrs:{type:"primary"},on:{click:s.doPay}},[s._v("提交")])],1)])]):s._e()],1)},staticRenderFns:[function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"r-tips"},[t("p",[this._v("每天快速赎回额度为1万元。")]),this._v(" "),t("p",[this._v("如果赎回金额超过实施赎回额度，请进行普通赎回操作。")]),this._v(" "),t("p",[this._v("普通赎回T+1工作日16:30后到账。")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"r-caption"},[t("p",[this._v("温馨提示：")]),this._v(" "),t("p",[this._v("工作日指上海证券交易所和深圳证券交易所的正常交易日，非工作日指其他日期（如国家法定节假日、周六日、调休等）。\n      工作日15:00之前发起成功的存入交易申请，基金公司于第二个工作日予以确认份额，工作日15:00之后及非工作日发起成功的存入交易申请视为下一个工作日发起的交易申请，具体结果以基金公司的确认结果为准。")]),this._v(" "),t("p",[this._v("风险提示：产品过往业绩不代表其未来表现，不构成产品未来业绩表现的保证。理财有风险，投资需谨慎。")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("p",{staticClass:"title"},[t("img",{attrs:{src:e("j732"),alt:""}}),this._v("\n        由郑州银行提供技术保障")])}]};var _=e("VU/8")(h,u,!1,function(s){e("h0pS")},"data-v-ede8ed24",null);t.default=_.exports},h0pS:function(s,t){}});
//# sourceMappingURL=22.c260081fb7a784466b57.js.map