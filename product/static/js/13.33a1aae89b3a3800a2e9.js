webpackJsonp([13],{AWux:function(t,e,s){t.exports=s.p+"static/img/logoaaa_03.2c70ed8.png"},XQ1G:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("0jG4"),i=s("EOwk"),n=s("MmTA"),o=s("UNnc"),l=s("JIj5"),r=s("IcnI"),c=void 0,u=l.a.storage.session.get("ORG_ID")||"",h={mixins:[{data:function(){return{ORG_ID_NUM:i.d,ORG_ID:u,rePass:!0}},created:function(){console.log("commons")},methods:{}}],data:function(){return{}},created:function(){console.log("JinShang")},beforeRouteLeave:function(t,e,s){clearInterval(c),s()},mounted:function(){console.log("mounted"),this.watchPassPluginPass(),this.watchPassPlugin()},methods:{loginFactory:function(){var t=this;if(clearInterval(c),!l.a.Check.tel(this.tel,!0)){var e=$("#login_loginPass").$getCiphertext(),s=$("#login_loginPass").$getCiphertext();if(!l.a.Check.loginPassLen(s,!0)){var o={PHONE_NUM:this.tel,BANK_LOGIN_PW:e},u=r.a.getters.GET_COMMON_STATE.loginType;this.$store.commit("SET_TOKEN",null),a.a.login.apiLoginBank(o,function(e){a.a.watchApi({FUNCTION_ID:"ptb0A007",REMARK_DATA:"异业合作-登录",SOURCE_URL:u}),t.setComState({type:"reload",value:!0}),t.removeComState("loginInfo");var s=e.HAS_GRADE;t.setComState({type:"HAS_GRADE",value:s}),1==s?(n.a.$emit(i.a.showToast,"请先进行评估"),t.$router.push({name:i.e.VerificationSuccess})):2==s&&t.toPreProduct()},function(e){a.a.watchApi({FUNCTION_ID:"ptb0A007",REMARK_DATA:"异业合作-登录"}),t.$store.commit("SET_TOKEN",null),t.setComState({type:"loginInfo",value:{PHONE_NUM:t.tel,msg:e}}),setTimeout(function(){window.location.reload()},1500)})}}},watchPassPluginPass:function(){var t=this;c=setInterval(function(){var e=t.checkPassWordTextIsEmpty();e>0?(t.passShow=!0,t.tel.length>0&&2==e?t.disabled=!1:t.disabled=!0):(t.passShow=!1,t.disabled=!0),0},500)},watchPassPlugin:function(){var t=this,e=1,s=setInterval(function(){if($("#LowercaseDiv")[0])return t.rePass=!1,void clearInterval(s);100==e&&(t.rePass=!1,clearInterval(s)),e++},300)},checkPassWordTextIsEmpty:function(){this.passPluginText=$("#login_loginPass").text();return this.passPluginText.match(/密码/)?0:this.passPluginText.match(/加载/)?0:this.passPluginText.length>=8?2:1}}},p=s("msXN"),d={data:function(){return{disabled:!0,tel:"",pass:"",passLay:"",toUrl:"",loginPass:"loginPass",num:1,ifGet:!1,refur:!1,telShow:!1,passShow:!1,passText:"登录密码",telPaceholder:"开户手机号",passPluginText:"",currentTel:"",ORG_ID:"",BANK_NAME:"",LOGO_URL:""}},mixins:[p.a.HandleMixin,p.a.UtilMixin,h],components:{PassInput:o.a},inject:["reload"],created:function(){this.ORG_ID=l.a.storal,this.BANK_NAME=this.$store.getters.GET_BANK_INFO.BANK_NAME;var t=this.getComState.loginInfo;t&&(this.tel=t.PHONE_NUM,n.a.$emit(i.a.showToast,t.msg),this.removeComState("loginInfo"))},watch:{tel:function(t,e){""!=t&&(this.isValueNumber(t)?(t.length>11&&(this.tel=this.tel.toString().substr(0,11)),this.currentTel=t,t.length>1||(t?(this.telPaceholder="",this.telShow=!0):(this.telShow=!1,this.telPaceholder="开户手机号"))):this.tel=this.currentTel)}},methods:{isValueNumber:function(t){return/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/.test(t)},goRePass:function(){this.setComState({type:"reload",value:!0}),this.$router.push({name:i.e.ResetPassword})},goOpen:function(){a.a.watchApi({FUNCTION_ID:"ptb0A008",REMARK_DATA:"异业合作-还未开户，立即注册"}),this.setComState({type:"reload",value:!0}),this.$router.push({name:i.e.Opening1})},focusHandle:function(){this.telShow=!0,this.telPaceholder="",this.passText="",$(".input").css({fontSize:".5rem"})}}},g={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"hello",attrs:{id:"app"}},[a("app-bar",{attrs:{title:"安全登录"}}),t._v(" "),a("img",{staticClass:"logo",attrs:{src:s("AWux"),alt:""}}),t._v(" "),a("p",{staticClass:"titlecontent"},[t._v("\n    欢迎登录晋商银行直销账户")]),t._v(" "),a("div",{staticClass:"login_box"},[a("section",{staticClass:"input-box"},[a("transition",{attrs:{name:"fade"}},[a("p",{directives:[{name:"show",rawName:"v-show",value:t.telShow,expression:"telShow"}],staticClass:"label"},[t._v("开户手机号")])]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tel,expression:"tel"}],staticClass:"input",attrs:{type:"input",name:"text1",placeholder:t.telPaceholder},domProps:{value:t.tel},on:{input:function(e){e.target.composing||(t.tel=e.target.value)}}})],1),t._v(" "),a("section",{staticClass:"input-box"},[a("transition",{attrs:{name:"fade"}},[a("p",{directives:[{name:"show",rawName:"v-show",value:t.passShow,expression:"passShow"}],staticClass:"label"},[t._v("登录密码")])]),t._v(" "),a("pass-input",{staticClass:"input",attrs:{text:t.passText,inputID:"login_loginPass"}})],1),t._v(" "),a("button",{class:{forget:!0,forget2:t.rePass},attrs:{disabled:t.rePass},on:{click:t.goRePass}},[t._v("忘记密码？")]),t._v(" "),a("button",{class:{tijiao:!0,agree:!t.disabled},attrs:{disabled:t.disabled},on:{click:function(e){t.loginFactory(t.ORG_ID)}}},[t._v("\n      登录\n    ")]),t._v(" "),a("div",{staticClass:"lijizhuce"},[a("span",{staticClass:"noOpen",on:{click:t.goOpen}},[t._v("还未开户，立即注册")])]),t._v(" "),a("p",{staticClass:"buy-info"},[t._v("温馨提示：各类理财产品额度有限，提前开户可提高抢购成功率。")])]),t._v(" "),t._m(0)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"bottomcontent"},[e("p",[e("img",{attrs:{src:s("j732"),alt:""}}),this._v("\n      晋商银行已与比财实现安全直连")])])}]};var v=s("VU/8")(d,g,!1,function(t){s("tk9z")},"data-v-361eb5ae",null);e.default=v.exports},tk9z:function(t,e){}});
//# sourceMappingURL=13.33a1aae89b3a3800a2e9.js.map