webpackJsonp([25],{MMLb:function(s,a){},lSMo:function(s,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t,o=e("bOdI"),n=e.n(o),i=e("xoIZ"),r=e("Ij8P"),c=e("0jG4"),l=e("MmTA"),w=e("EOwk"),d=(e("JIj5"),e("msXN"),e("8Xt1")),_={name:"ResetPayPassword",components:{ActiveInput:i.a,ErrMsg:r.a,PassWordZhengzhou:d.a},data:function(){return{show:!0,msgCodeShow:!1,newPassShow:!1,preNewPassShow:!1,CHECK_CODE:"",ifShow:!1,errMsg:"",len2:0,len3:0}},computed:{canClick:function(){return!!(this.CHECK_CODE&&this.len2>0&&this.len3>0)}},mounted:function(){$("#PWDKBD").remove(),$(window).loadKBD();var s=this;jQuery.fn.extend({validKBD:function(){console.log("Input的onchange事件"),s.len2=$("#payPasscc2").getLenKBD()+"",s.len3=$("#payPasscc3").getLenKBD()+""}})},methods:(t={showBD:function(s){$("#"+s).attr("title","输入密码"),$("#"+s).showKBD({areaId:s+"_Pwd_Area",pageId:s,minLen:0,maxLen:6,cursor:!0,mask:!0})},showErrMsg:function(s){var a=this;setTimeout(function(){a.errMsg=s},1e3)},cancel:function(){this.ifShow=!1}},n()(t,"showErrMsg",function(s){var a=this;this.errMsg=s,setTimeout(function(){a.errMsg=""},2e3)}),n()(t,"submit",function(){var s=this,a={pass:$("#payPasscc2").getKBD()+"",len:$("#payPasscc2").getLenKBD()+"",passFix:$("#payPasscc2").getBDCode()+""},e={pass:$("#payPasscc3").getKBD()+"",len:$("#payPasscc3").getLenKBD()+"",passFix:$("#payPasscc3").getBDCode()+""};console.log(a),console.log(e);var t={NEW_PASSWD:a.pass,CONFIRM_PASSWD:e.pass,PREFIX:e.passFix,CHECK_CODE:this.CHECK_CODE};c.a.safe.resetTransactionPassword(t,function(a){s.$router.push({name:w.e.MoreService}),l.a.$emit(w.a.showToast,"更换密码成功")},function(a){$("#PWDKBD").remove(),$(window).loadKBD(),s.CHECK_CODE="",s.showErrMsg(a),s.ifShow=!1})}),t)},p={render:function(){var s=this,a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"bgbox"},[t("app-bar",{staticClass:"m-header",attrs:{title:"重置支付密码"}}),a._v(" "),t("div",{staticClass:"top"},[t("div",{staticClass:"field_row_wrap"},[a.newPassShow?a._e():t("p",{staticClass:"field_row_key",on:{click:function(){s.newPassShow=!0,s.showBD("payPasscc2")}}},[t("span",{staticClass:"left"},[a._v("新密码")]),a._v(" "),t("span",{staticClass:"right"},[a._v("密码由6位数字组成")])]),a._v(" "),t("transition",{attrs:{name:"fade"}},[a.newPassShow?t("p",{staticClass:"field_row_key low"},[t("span",{staticClass:"left"},[a._v("新密码")])]):a._e()]),a._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:a.newPassShow,expression:"newPassShow"}],staticClass:"field_row_value"},[t("pass-word-zhengzhou",{attrs:{BankCardPass:"payPasscc2"}})],1)],1),a._v(" "),t("div",{staticClass:"field_row_wrap"},[a.preNewPassShow?a._e():t("p",{staticClass:"field_row_key",on:{click:function(){s.preNewPassShow=!0,s.showBD("payPasscc3")}}},[t("span",{staticClass:"left"},[a._v("重复新密码")]),a._v(" "),t("span",{staticClass:"right"},[a._v("密码由6位数字组成")])]),a._v(" "),t("transition",{attrs:{name:"fade"}},[a.preNewPassShow?t("p",{staticClass:"field_row_key low"},[t("span",{staticClass:"left"},[a._v("重复新密码")])]):a._e()]),a._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:a.preNewPassShow,expression:"preNewPassShow"}],staticClass:"field_row_value"},[t("pass-word-zhengzhou",{attrs:{BankCardPass:"payPasscc3"}})],1)],1),a._v(" "),t("div",{staticClass:"field_row_wrap"},[a.msgCodeShow?a._e():t("p",{staticClass:"field_row_key",on:{click:function(s){a.msgCodeShow=!0}}},[t("span",{staticClass:"left"},[a._v("验证码")])]),a._v(" "),t("transition",{attrs:{name:"fade"}},[a.msgCodeShow?t("p",{staticClass:"field_row_key low"},[t("span",{staticClass:"left"},[a._v("验证码")])]):a._e()]),a._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:a.msgCodeShow,expression:"msgCodeShow"}],staticClass:"field_row_value"},[t("input",{directives:[{name:"model",rawName:"v-model",value:a.CHECK_CODE,expression:"CHECK_CODE"}],attrs:{type:"tel"},domProps:{value:a.CHECK_CODE},on:{input:function(s){s.target.composing||(a.CHECK_CODE=s.target.value)}}})])],1)]),a._v(" "),t("div",{staticClass:"btn"},[t("button",{class:{active:a.canClick},attrs:{disabled:!a.canClick},on:{click:a.submit}},[a._v("确定")])])],1)},staticRenderFns:[]};var C=e("VU/8")(_,p,!1,function(s){e("MMLb")},"data-v-de773e66",null);a.default=C.exports}});
//# sourceMappingURL=25.d4976b95fb19178273d9.js.map