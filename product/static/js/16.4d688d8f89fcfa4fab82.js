webpackJsonp([16],{"Nx/j":function(t,e,a){"use strict";var s=a("0jG4"),n=a("MmTA"),i=a("EOwk"),o=a("JIj5");e.a={data:function(){return{}},created:function(){},methods:{transformDATA:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return{STA:(t="2016.10.14-2026.10.14").split("-")[0],END:t.split("-")[1]}},checkBankStatus:function(t){var e=this;s.a.common.apiRegisterBackShow({},function(t){var a=t.LAST_STEP_NUM;console.log("step",a),e.setComState({type:"openingData",value:t}),0==a?(o.a.storage.session.set("USERINFO",t),e.$router.push({name:i.e.Opening1})):1==a?(o.a.storage.session.set("USERINFO",t),e.$router.push({name:i.e.Opening2})):(n.a.$emit(i.a.showToast,"你已经开户成功"),setTimeout(function(){e.$router.push({name:i.e.Login})},400))})},checkID:function(t){}}}},rzsw:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("EOwk"),n=a("MmTA"),i=a("xEK7"),o=a("0jG4"),c=a("JIj5"),l=void 0,r={mixins:[a("Nx/j").a],data:function(){return{telDisabled:!1,ZhengZhouPass:!1,ACC_FLAG:"0",pwd:"",pwdLen:"",pwCode:""}},created:function(){console.log("ZhengZhou")},filters:{CARD_NO_Fliter:function(t){return t?t.substr(t.length-4):t}},methods:{timeDown:function(){var t=this,e=60;this.disable=!0;var a=setInterval(function(){if(0==e)return t.codeText="重新发送",t.disable=!1,void clearInterval(a);e--,t.codeText=e+"s"},1e3)},cancel:function(){$("#PWDKBD").remove(),this.ZhengZhouPass=!1},subumit:function(){$("#PWDKBD").remove(),this.pwd=$("#bank-passCCCC").getKBD(),this.pwdLen=$("#bank-passCCCC").getLenKBD(),this.pwCode=$("#bank-passCCCC").getBDCode(),console.log(this.pwd),console.log(this.pwdLen),console.log(this.pwCode),c.a.Check.payPassLen(this.pwdLen,!0)||(this.ZhengZhouPass=!1,this.doApiOpenging2())},checkBankType:function(){var t=this;o.a.common.apiUserAccountProperties({TYPE:"API_USER_ACCOUNT_PROPERTIES",BIND_AC_NO:this.data.CARD_NO+""},function(e){t.ACC_FLAG=e.ACC_FLAG})},checkID:function(){},clickMsgCodeHandle:function(){var t=this.tel;t+="",console.log(t),c.a.Check.tel(t,!0)||(this.timeDown(),this.getMsgCode(t))},getMsgCode:function(t){var e=this,a={TYPE:"API_SEND_PHONE_CODE",PHONE_NUM:t,BIZ_TYPE:"11",ACCT_NO:this.data.CARD_NO};o.a.common.apiSendPhoneCode(a,function(a){n.a.$emit(s.a.showSendMsg,t),e.data.MESSAGE_TOKEN=a.MESSAGE_TOKEN},function(t){e.codeText="重新发送",e.disable=!1;try{clearInterval(timer)}catch(t){}console.log(t)})},doOpengingSecond:function(){if(0!=this.ACC_FLAG)return $("#PWDKBD").remove(),void(this.ZhengZhouPass=!0);this.doApiOpenging2()},doApiOpenging2:function(){var t=this;if(this.data.PRE_PHONE_NUM=this.tel,console.log(this.data.PRE_PHONE_NUM),"请选择银行"!=this.bankText)if(""!=this.data.CARD_NO){if(!this.checkBankNo(this.data.CARD_NO))if(""!=this.data.PRE_PHONE_NUM)if(""!=this.data.PHONE_CODE)if(""!=this.data.MESSAGE_TOKEN){var e={REGISTER_PHONE:this.callbackInfos.PHONE_NUM||this.tel,PHONE_NUM:this.callbackInfos.PHONE_NUM||this.tel,IDENT_LSS_DT:this.transformDATA(this.callbackInfos.CARD_INDATE).STA,IDENT_VLD_DT:this.transformDATA(this.callbackInfos.CARD_INDATE).END,BANK_NO:this.data.CARD_NO,BANK_NUM:this.data.CARD_NO,SHORT_CODE:this.data.PHONE_CODE,CARD_BIN:this.data.CARD_NO.substring(0,6),BANK_INNER:"0",OPEN_BANK:this.bankText,TYPE:"API_REGISTER_BAND_CARD"};console.log("params"),console.log(e),o.a.open.apiRegisterBandCard(e,!0,!0,function(e){t.Londing.close(),o.a.watchApi({FUNCTION_ID:"ptb0A004",REMARK_DATA:"异业合作-开户-绑定银行卡"}),0==e.CODE&&t.$router.push({name:s.e.Login})},function(e){o.a.watchApi({FUNCTION_ID:"ptb0A004",REMARK_DATA:"异业合作-开户-绑定银行卡"}),t.errMsg=e,setTimeout(function(){t.errMsg=""},2e3),console.log(e),t.disable=!1})}else n.a.$emit(s.a.showToast,"短信验证码异常");else n.a.$emit(s.a.showToast,"短信验证码不能为空");else n.a.$emit(s.a.showToast,"手机号不能为空")}else n.a.$emit(s.a.showToast,"银行卡号不能为空");else n.a.$emit(s.a.showToast,"请选择银行")},pollHandle:function(){var t=this,e=0;l=setInterval(function(){if(e++,console.log(e),6==e)return t.Londing.close(),void clearInterval(l);t.Londing.open(),t.checkID()},5e3)},getBankList:function(){var t=this;o.a.common.apiGetBankCardList({},function(e){var a={};e.BAND_CARD_LIST.forEach(function(t){a[t.BANK_CARD_BIN]=t.BANK_NAME}),t.AllBankListObj=a,t.bankList=e.SUPPORT_BANK_LIST.map(function(t){return{name:t.BANK_NAME,value:0,src:s.g+t.BANK_LOGO_URL,Index:t.INITIAL}})})}}},h=a("b1t1"),_={data:function(){return{data:{CARD_NO:"",HAS_BAND:"0",PHONE_NUM:"",PRE_PHONE_NUM:"",PHONE_CODE:"",LAST_STEP_NUM:"",MESSAGE_TOKEN:"",REQ_SERIAL:""},tel:"",canClick:!0,codeText:"获取验证码",disable:!1,bankList:[],bank:"-1",bankText:"请选择开户银行",stepImg:a("T201"),stepImg2:a("r2sr"),stepImg3:a("yIMT"),AllBankListObj:{},errMsg:"",checkBankName1:!1,callbackInfos:{}}},mixins:[r],components:{BankSelect:i.a,PassWordZhengzhou:h.a},watch:{tel:function(t,e){t.length>11&&(console.log(t),this.tel=t.toString().substr(0,11))},bankText:function(t,e){this.checkBankName(this.data.CARD_NO)}},filters:{telFlter:function(t){if(t.length>11)return t.toString().substr(0,11)}},created:function(){this.callbackInfos=this.getComState.openingData,console.log("callbackInfos>>>",this.callbackInfos),this.tel=this.callbackInfos.PHONE_NUM||"",this.getBankList()},methods:{checkBankName:function(t){this.checkBankName1=!1,t=t.replace(/\s+/g,"");for(var e=void 0,a=3;a<8;a++)if(e=this.machBankName((t+"").slice(0,a))){this.bankText=e,console.log("bankName",e);break}},checkBankNo:function(t){t=t.toString();return console.log(!/\d{15}|\d{19}/.test(t)),""==t?(n.a.$emit(s.a.showToast,"银行卡号不能为空"),!0):(t.length<15||t.length>19)&&(n.a.$emit(s.a.showToast,"银行卡号格式不正确"),!0)},machBankName:function(t){return this.AllBankListObj[t]},getBank:function(t){console.log(t),this.bankText=t.name},goNext:function(){this.doOpengingSecond()}}},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"warp"},[a("app-bar",{attrs:{title:"信息填写"}}),t._v(" "),a("section",{staticClass:"wrapicon"},[a("section",{staticClass:"circle left"},[a("span",{staticClass:"line1"},[a("img",{attrs:{src:t.stepImg,alt:""}})]),t._v(" "),a("span",{staticClass:"step-text"},[t._v("开户信息验证")])]),t._v(" "),a("section",{staticClass:"circle right"},[a("span",{staticClass:"line2 hui"},[a("img",{attrs:{src:t.stepImg2,alt:""}})]),t._v(" "),a("span",{staticClass:"step-text",staticStyle:{color:"#D3D3D3"}},[t._v("绑定银行卡")])])]),t._v(" "),a("div",{staticClass:"opening_box"},[a("section",{staticClass:"bank"},[a("span",{staticClass:"left-p",staticStyle:{"padding-right":"0px"}},[t._v("选择银行")]),t._v(" "),a("Bank-select",{staticClass:"bank-box",attrs:{text:t.bankText,options:t.bankList,title:"银行列表"},on:{getValue:t.getBank}})],1),t._v(" "),a("section",{staticClass:"input-box"},[a("p",{staticClass:"left-p"},[t._v(" 绑定卡卡号")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.CARD_NO,expression:"data.CARD_NO"}],attrs:{type:"number",name:"backname",placeholder:"请输入储蓄卡卡号"},domProps:{value:t.data.CARD_NO},on:{blur:function(e){t.checkBankName(t.data.CARD_NO)},input:function(e){e.target.composing||t.$set(t.data,"CARD_NO",e.target.value)}}})]),t._v(" "),a("section",{staticClass:"input-box"},[a("p",{staticClass:"left-p"},[t._v("手机号码")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tel,expression:"tel"}],attrs:{disabled:t.telDisabled,type:"text",name:"tel",placeholder:"银行预留手机号"},domProps:{value:t.tel},on:{input:function(e){e.target.composing||(t.tel=e.target.value)}}})]),t._v(" "),a("section",{staticClass:"input-box"},[a("p",{staticClass:"left-p"},[t._v("验证码")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.PHONE_CODE,expression:"data.PHONE_CODE"}],attrs:{type:"text",placeholder:"验证码"},domProps:{value:t.data.PHONE_CODE},on:{input:function(e){e.target.composing||t.$set(t.data,"PHONE_CODE",e.target.value)}}}),t._v(" "),a("button",{staticClass:"msg-code",attrs:{disabled:t.disable},on:{click:t.clickMsgCodeHandle}},[t._v(t._s(t.codeText))])])]),t._v(" "),t.errMsg?a("div",{staticClass:"msg-err"},[a("span",[t._v(t._s(t.errMsg))])]):t._e(),t._v(" "),a("button",{staticClass:"tijiao",on:{click:t.goNext}},[t._v("下一步")])],1)},staticRenderFns:[]};var u=a("VU/8")(_,d,!1,function(t){a("xLsw")},"data-v-26b94bfa",null);e.default=u.exports},xLsw:function(t,e){}});
//# sourceMappingURL=16.4d688d8f89fcfa4fab82.js.map