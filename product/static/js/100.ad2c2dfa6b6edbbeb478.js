webpackJsonp([100],{sRRt:function(s,a){},wEqf:function(s,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t=e("mvHQ"),n=e.n(t),o={data:function(){return{show:!0,oldPassShow:!1,newPassShow:!1,preNewPassShow:!1,len1:0,len2:0,len3:0}},computed:{canClick:function(){return this.len1>0&&this.len2>0&&this.len3>0}},components:{PassWordZhengzhou:e("8Xt1").a},name:"PayPassWord",created:function(){this.winLoad()},mounted:function(){$("#PWDKBD").remove(),$(window).loadKBD();var s=this;jQuery.fn.extend({validKBD:function(){console.log("Input的onchange事件"),s.len1=$("#payPasscc1").getLenKBD()+"",s.len2=$("#payPasscc2").getLenKBD()+"",s.len3=$("#payPasscc3").getLenKBD()+""}})},methods:{close:function(){var s=navigator.userAgent,a=s.indexOf("Android")>-1||s.indexOf("Adr")>-1,e=!!s.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);a&&window.android.clickOnBack(),e&&window.IOSWebJSInterface.clickOnBack()},submit:function(){var s=navigator.userAgent,a=s.indexOf("Android")>-1||s.indexOf("Adr")>-1,e=!!s.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),t={pass:$("#payPasscc1").getKBD()+"",len:$("#payPasscc1").getLenKBD()+"",passFix:$("#payPasscc1").getBDCode()+""},o={pass:$("#payPasscc2").getKBD()+"",len:$("#payPasscc2").getLenKBD()+"",passFix:$("#payPasscc2").getBDCode()+""},i={pass:$("#payPasscc3").getKBD()+"",len:$("#payPasscc3").getLenKBD()+"",passFix:$("#payPasscc3").getBDCode()+""};console.log(t),console.log(o),console.log(i);var c={oldPass:t,newPass:o,reNewPass:i};c=n()(c),a&&window.android.getThreePasswordFromZhengZhou(c),e&&window.IOSWebJSInterface.getThreePasswordFromZhengZhou(c)},winLoad:function(){window.sendParam=function(s){JSON.parse($.base64().decode(s))}}}},i={render:function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("div",{staticClass:"bgbox"},[e("app-bar",{staticClass:"m-header",attrs:{title:"更换支付密码"}}),s._v(" "),e("div",{staticClass:"top"},[e("div",{staticClass:"field_row_wrap"},[s.oldPassShow?s._e():e("p",{staticClass:"field_row_key",on:{click:function(a){s.oldPassShow=!0}}},[e("span",{staticClass:"left"},[s._v("原密码")]),s._v(" "),e("span",{staticClass:"right"},[s._v("密码由6位数字组成")])]),s._v(" "),e("transition",{attrs:{name:"fade"}},[s.oldPassShow?e("p",{staticClass:"field_row_key low"},[e("span",{staticClass:"left"},[s._v("原密码")])]):s._e()]),s._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:s.oldPassShow,expression:"oldPassShow"}],staticClass:"field_row_value"},[e("pass-word-zhengzhou",{attrs:{BankCardPass:"payPasscc1"}})],1)],1),s._v(" "),e("div",{staticClass:"field_row_wrap"},[s.newPassShow?s._e():e("p",{staticClass:"field_row_key",on:{click:function(a){s.newPassShow=!0}}},[e("span",{staticClass:"left"},[s._v("新密码")]),s._v(" "),e("span",{staticClass:"right"},[s._v("密码由6位数字组成")])]),s._v(" "),e("transition",{attrs:{name:"fade"}},[s.newPassShow?e("p",{staticClass:"field_row_key low"},[e("span",{staticClass:"left"},[s._v("新密码")])]):s._e()]),s._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:s.newPassShow,expression:"newPassShow"}],staticClass:"field_row_value"},[e("pass-word-zhengzhou",{attrs:{BankCardPass:"payPasscc2"}})],1)],1),s._v(" "),e("div",{staticClass:"field_row_wrap"},[s.preNewPassShow?s._e():e("p",{staticClass:"field_row_key",on:{click:function(a){s.preNewPassShow=!0}}},[e("span",{staticClass:"left"},[s._v("重复新密码")]),s._v(" "),e("span",{staticClass:"right"},[s._v("请重复输入新密码")])]),s._v(" "),e("transition",{attrs:{name:"fade"}},[s.preNewPassShow?e("p",{staticClass:"field_row_key low"},[e("span",{staticClass:"left"},[s._v("重复新密码")])]):s._e()]),s._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:s.preNewPassShow,expression:"preNewPassShow"}],staticClass:"field_row_value"},[e("pass-word-zhengzhou",{attrs:{BankCardPass:"payPasscc3"}})],1)],1)]),s._v(" "),e("div",{staticClass:"btn"},[e("button",{class:{active:s.canClick},attrs:{disabled:!s.canClick},on:{click:s.submit}},[s._v("确定")])])],1)},staticRenderFns:[]};var c=e("VU/8")(o,i,!1,function(s){e("sRRt")},"data-v-272d5930",null);a.default=c.exports}});
//# sourceMappingURL=100.ad2c2dfa6b6edbbeb478.js.map