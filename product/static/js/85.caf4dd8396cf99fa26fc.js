webpackJsonp([85],{"9p2c":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Dd8w"),i=a.n(s),n=a("JIj5"),o=a("0jG4"),r=a("EOwk"),_=a("MmTA"),d=a("UNnc"),l={data:function(){return{data:{USER_REAL_NAME:"",USER_CARD_ID:"",PHONE_NUM:"",BANK_LOGIN_PW:"",BANK_LOGIN_PW2:"",MESSAGE_TOKEN:"",PHONE_CODE:""},toUrl:"",errMsg:"",codeText:"获取验证码",disable:!1,tel:""}},watch:{tel:function(t,e){if(t.length>11)return console.log(t),void(this.tel=t.toString().substr(0,11))}},mixins:[a("msXN").a.HandleMixin,""],components:{PassInput:d.a},created:function(){var t=this;this.getErrMsg(function(e){t.data={USER_REAL_NAME:e.USER_REAL_NAME,USER_CARD_ID:e.USER_CARD_ID,PHONE_NUM:e.PHONE_NUM},t.errMsg=e.msg})},methods:{getCode:function(){var t=this;if(this.data.PHONE_NUM=this.tel,!n.a.Check.tel(this.data.PHONE_NUM,!0)){var e=60;this.disable=!0;var a=setInterval(function(){if(0==e)return t.codeText="重新发送",t.disable=!1,void clearInterval(a);e--,t.codeText=e+"s"},1e3),s={PHONE_NUM:this.data.PHONE_NUM+"",BIZ_TYPE:"9"};o.a.open.getMsgCode(s,function(e){t.data.MESSAGE_TOKEN=e.MESSAGE_TOKEN})}},showErrMsg:function(t){var e=this;this.errMsg=t,setTimeout(function(){e.errMsg=""},2e3)},doRePass:function(){var t=this;this.data.PHONE_NUM=this.tel;var e=void 0;if(e=n.a.Check.name(this.data.USER_REAL_NAME))this.showErrMsg(e);else if(e=n.a.Check.idNumber(this.data.USER_CARD_ID))this.showErrMsg(e);else if(e=n.a.Check.tel(this.data.PHONE_NUM))this.showErrMsg(e);else if(this.data.BANK_LOGIN_PW=$("#loginPass").$getCiphertext(),this.data.BANK_LOGIN_PW_LEN=$("#loginPass").$getPasswordLength(),this.data.BANK_LOGIN_PW2=$("#reLoginPass").$getCiphertext(),this.data.BANK_LOGIN_PW2_LEN=$("#reLoginPass").$getPasswordLength(),e=n.a.Check.trim(this.data.BANK_LOGIN_PW,",密码"))this.showErrMsg(e);else if(e=n.a.Check.loginPassLen(this.data.BANK_LOGIN_PW_LEN))this.showErrMsg(e);else if(e=n.a.Check.trim(this.data.BANK_LOGIN_PW2,",密码"))this.showErrMsg(e);else if(e=n.a.Check.loginPassLen(this.data.BANK_LOGIN_PW2_LEN))this.showErrMsg(e);else if(e=n.a.Check.trim(this.data.PHONE_CODE,"验证码"))this.showErrMsg(e);else{var a=i()({},this.data);o.a.safe.apiUserResetLoginPass(a,!0,function(e){_.a.$emit(r.a.showToast,"修改密码成功"),t.$store.commit("SET_TOKEN",""),t.setErrMsg(null),t.$router.replace({name:r.e.Login})},function(e){t.setErrMsg({USER_REAL_NAME:t.data.USER_REAL_NAME,USER_CARD_ID:t.data.USER_CARD_ID,PHONE_NUM:t.data.PHONE_NUM,msg:e})})}}}},E={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app",attrs:{id:"app"}},[a("app-bar",{attrs:{title:"重置密码"}}),t._v(" "),a("div",{staticClass:"opening_box"},[a("section",[a("span",[t._v("姓名")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.USER_REAL_NAME,expression:"data.USER_REAL_NAME"}],attrs:{type:"text",name:"text1",placeholder:" 请输入您的真实姓名"},domProps:{value:t.data.USER_REAL_NAME},on:{input:function(e){e.target.composing||t.$set(t.data,"USER_REAL_NAME",e.target.value)}}})]),t._v(" "),a("section",[a("span",[t._v("身份证证号")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.USER_CARD_ID,expression:"data.USER_CARD_ID"}],attrs:{type:"text",name:"text1",placeholder:"请输入18位身份证号"},domProps:{value:t.data.USER_CARD_ID},on:{input:function(e){e.target.composing||t.$set(t.data,"USER_CARD_ID",e.target.value)}}})]),t._v(" "),a("section",[a("span",[t._v("手机号")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tel,expression:"tel"}],attrs:{type:"number",name:"text1",placeholder:"请输入登录手机号"},domProps:{value:t.tel},on:{input:function(e){e.target.composing||(t.tel=e.target.value)}}})]),t._v(" "),a("section",[a("span",[t._v("新登录密码")]),t._v(" "),a("pass-input",{staticStyle:{display:"inline-block",color:"#dedede"},attrs:{inputID:"loginPass"}})],1),t._v(" "),a("section",[a("span",[t._v("确认登录密码")]),t._v(" "),a("pass-input",{staticStyle:{display:"inline-block",color:"#dedede"},attrs:{inputID:"reLoginPass"}})],1),t._v(" "),a("section",[a("span",[t._v("验证码")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.PHONE_CODE,expression:"data.PHONE_CODE"}],staticStyle:{width:"48%"},attrs:{type:"password",name:"text1",placeholder:"请输入您的短信验证码"},domProps:{value:t.data.PHONE_CODE},on:{input:function(e){e.target.composing||t.$set(t.data,"PHONE_CODE",e.target.value)}}}),t._v(" "),a("button",{staticClass:"getpassword",attrs:{disabled:t.disable},on:{click:t.getCode}},[t._v(t._s(t.codeText))])])]),t._v(" "),t.errMsg?a("div",{staticClass:"msg-err"},[t._v(t._s(t.errMsg))]):t._e(),t._v(" "),a("mt-button",{staticClass:"tijiao",on:{click:t.doRePass}},[t._v("重置密码")])],1)},staticRenderFns:[]};var c=a("VU/8")(l,E,!1,function(t){a("AsoC")},"data-v-4438eeae",null);e.default=c.exports},AsoC:function(t,e){}});
//# sourceMappingURL=85.caf4dd8396cf99fa26fc.js.map