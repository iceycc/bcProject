webpackJsonp([65],{"7hzA":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("EOwk"),i=a("MmTA"),n=a("xEK7"),o=a("woOf"),c=a.n(o),l=a("0jG4"),r=a("JIj5"),_={data:function(){return{telDisabled:!1}},created:function(){console.log("JinShang"),this.tel=this.$route.query.PHONE_NUM||""},methods:{timeDown:function(){var t=this,e=60;this.disable=!0;var a=setInterval(function(){if(0==e)return t.codeText="重新发送",t.disable=!1,void clearInterval(a);e--,t.codeText=e+"s"},1e3)},checkID:function(t){var e=this,a={ID_NUMBER:this.$route.params.data.USER_CARD_ID};l.a.open.apiGetUserLastCompleteStep(a,!0,function(t){var a=t.LAST_STEP_NUM,i=t.REQ_SERIAL;console.log("步数 >>>",a),2==a&&setTimeout(function(){e.$router.push({name:s.e.Opening3,params:{step:a},query:{REQ_SERIAL:i}})},600),3==a&&setTimeout(function(){e.$router.push({name:s.e.Login})},1e3)},function(t){console.log(t)})},clickMsgCodeHandle:function(){this.data.PRE_PHONE_NUM=this.tel+"",console.log(this.data.PRE_PHONE_NUM),r.a.Check.tel(this.data.PRE_PHONE_NUM,!0)||(this.timeDown(),this.getMsgCode())},getMsgCode:function(){var t=this,e={PHONE_NUM:this.data.PRE_PHONE_NUM,BIZ_TYPE:"1"};l.a.open.getMsgCode(e,function(e){i.a.$emit(s.a.showToast,"验证码发送成功"),t.data.MESSAGE_TOKEN=e.MESSAGE_TOKEN},function(e){t.codeText="重新发送",t.disable=!1,console.log(e)})},doOpengingSecond:function(){var t=this;if(this.data.PRE_PHONE_NUM=this.tel,console.log(this.data.PRE_PHONE_NUM),"请选择银行"!=this.bankText)if(""!=this.data.CARD_NO){if(this.checkBankName1)i.a.$emit(s.a.showToast,"您输入的银行卡号和选择的银行名称不匹配");else if(!this.checkBankNo(this.data.CARD_NO))if(""!=this.data.PRE_PHONE_NUM)if(""!=this.data.PHONE_CODE)if(""!=this.data.MESSAGE_TOKEN){var e=this.$route.params.data;this.data=c()(this.data,e),console.log("data >>>",this.data);var a=this.getComState.REQ_SERIAL,n=this.getComState.LAST_STEP_NUM;a&&n&&(this.data.REQ_SERIAL=a,this.data.LAST_STEP_NUM=n),this.data.PHONE_NUM=this.data.PRE_PHONE_NUM;l.a.open.doRegeist(this.data,!0,!0,function(e){clearInterval(timer),t.Londing.close(),t.errMsg=e.MSG,setTimeout(function(){t.errMsg=""},2e3),l.a.watchApi({FUNCTION_ID:"ptb0A004",REMARK_DATA:"异业合作-开户-绑定银行卡"}),0==e.CODE&&t.$router.push({name:s.e.Opening3,query:{REQ_SERIAL:e.REQ_SERIAL}})},function(e){l.a.watchApi({FUNCTION_ID:"ptb0A004",REMARK_DATA:"异业合作-开户-绑定银行卡"}),t.errMsg=e,setTimeout(function(){t.errMsg=""},2e3),console.log(e),t.disable=!1}),this.pollHandle()}else i.a.$emit(s.a.showToast,"短信验证码异常");else i.a.$emit(s.a.showToast,"短信验证码不能为空");else i.a.$emit(s.a.showToast,"手机号不能为空")}else i.a.$emit(s.a.showToast,"银行卡号不能为空");else i.a.$emit(s.a.showToast,"请选择银行")},pollHandle:function(){var t=this,e=0,a=setInterval(function(){if(e++,console.log(e),6==e)return t.Londing.close(),void clearInterval(a);t.Londing.open(),t.checkID()},5e3)},getBankList:function(){var t=this;l.a.list.apiGetBankCardList({},function(e){var a={};e.BAND_CARD_LIST.forEach(function(t){a[t.BANK_CARD_BIN]=t.BANK_NAME}),t.AllBankListObj=a,t.bankList=e.SUPPORT_BANK_LIST.map(function(t){return{name:t.BANK_NAME,value:0,src:s.g+t.BANK_LOGO_URL,Index:t.INITIAL}})})}}},d=a("b1t1"),h={data:function(){return{data:{CARD_NO:"",HAS_BAND:"0",PHONE_NUM:"",PRE_PHONE_NUM:"",PHONE_CODE:"",LAST_STEP_NUM:"",MESSAGE_TOKEN:"",REQ_SERIAL:""},tel:"",canClick:!0,codeText:"获取验证码",disable:!1,bankList:[],bank:"-1",bankText:"请选择开户银行",stepImg:a("T201"),stepImg2:a("r2sr"),stepImg3:a("yIMT"),AllBankListObj:{},errMsg:"",checkBankName1:!1}},mixins:[_],components:{BankSelect:n.a,PassWordZhengzhou:d.a},watch:{tel:function(t,e){t.length>11&&(console.log(t),this.tel=t.toString().substr(0,11))},bankText:function(t,e){this.checkBankName(this.data.CARD_NO)}},filters:{telFlter:function(t){if(t.length>11)return t.toString().substr(0,11)}},created:function(){this.data.REQ_SERIAL=this.$route.query.REQ_SERIAL,this.data.LAST_STEP_NUM=this.$route.query.LAST_STEP_NUM,this.getBankList()},methods:{checkBankName:function(t){this.checkBankName1=!1,t=t.replace(/\s+/g,"");for(var e=void 0,a=3;a<10;a++)if(e=this.machBankName((t+"").slice(0,a))){if(e!=this.bankText)return void(this.checkBankName1=!0);break}},checkBankNo:function(t){console.log(1),this.checkBankType&&this.checkBankType(),t=t.toString();return console.log(!/\d{15}|\d{19}/.test(t)),""==t?(i.a.$emit(s.a.showToast,"银行卡号不能为空"),!0):(t.length<15||t.length>19)&&(i.a.$emit(s.a.showToast,"银行卡号格式不正确"),!0)},machBankName:function(t){return this.AllBankListObj[t]},getBank:function(t){console.log(t),this.bankText=t.name},goNext:function(){this.doOpengingSecond()}}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"warp"},[a("app-bar",{attrs:{title:"信息填写"}}),t._v(" "),a("section",{staticClass:"wrapicon"},[a("section",{staticClass:"circle"},[a("span",{staticClass:"line1"},[a("img",{attrs:{src:t.stepImg,alt:""}})]),t._v(" "),a("p",{staticClass:"step-text"},[t._v("开户信息验证")])]),t._v(" "),a("section",{staticClass:"circle"},[a("span",{staticClass:"line2"},[a("img",{attrs:{src:t.stepImg,alt:""}})]),t._v(" "),a("p",{staticClass:"step-text"},[t._v("绑定银行卡")])]),t._v(" "),a("section",{staticClass:"circle"},[a("span",{staticClass:"line3 hui"},[a("img",{attrs:{src:t.stepImg3,alt:""}})]),t._v(" "),a("p",{staticClass:"step-text",staticStyle:{color:"#D3D3D3"}},[t._v("设置密码")])])]),t._v(" "),a("div",{staticClass:"opening_box"},[a("section",{staticClass:"bank"},[a("span",{staticClass:"left-p",staticStyle:{"padding-right":"0px"}},[t._v("选择银行")]),t._v(" "),a("Bank-select",{staticClass:"bank-box",attrs:{text:t.bankText,options:t.bankList,title:"银行列表"},on:{getValue:t.getBank}})],1),t._v(" "),a("section",{staticClass:"input-box"},[a("p",{staticClass:"left-p"},[t._v(" 绑定卡卡号")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.CARD_NO,expression:"data.CARD_NO"}],attrs:{type:"number",name:"backname",placeholder:"请输入储蓄卡卡号"},domProps:{value:t.data.CARD_NO},on:{blur:function(e){t.checkBankNo(t.data.CARD_NO)},input:[function(e){e.target.composing||t.$set(t.data,"CARD_NO",e.target.value)},function(e){t.checkBankName(t.data.CARD_NO)}]}})]),t._v(" "),a("section",{staticClass:"input-box"},[a("p",{staticClass:"left-p"},[t._v("手机号码")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tel,expression:"tel"}],attrs:{disabled:t.telDisabled,type:"text",name:"tel",placeholder:"银行预留手机号"},domProps:{value:t.tel},on:{input:function(e){e.target.composing||(t.tel=e.target.value)}}})]),t._v(" "),a("section",{staticClass:"input-box"},[a("p",{staticClass:"left-p"},[t._v("验证码")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.PHONE_CODE,expression:"data.PHONE_CODE"}],attrs:{type:"text",placeholder:"验证码"},domProps:{value:t.data.PHONE_CODE},on:{input:function(e){e.target.composing||t.$set(t.data,"PHONE_CODE",e.target.value)}}}),t._v(" "),a("button",{staticClass:"msg-code",attrs:{disabled:t.disable},on:{click:t.clickMsgCodeHandle}},[t._v(t._s(t.codeText))])])]),t._v(" "),t.errMsg?a("div",{staticClass:"msg-err"},[a("span",[t._v(t._s(t.errMsg))])]):t._e(),t._v(" "),a("button",{staticClass:"tijiao",on:{click:t.goNext}},[t._v("下一步")])],1)},staticRenderFns:[]};var p=a("VU/8")(h,u,!1,function(t){a("IlUR")},"data-v-6124b3e6",null);e.default=p.exports},IlUR:function(t,e){}});
//# sourceMappingURL=65.a1f66c56420863316107.js.map