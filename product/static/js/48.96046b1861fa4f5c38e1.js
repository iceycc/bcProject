webpackJsonp([48],{Dicj:function(t,e){},"gC/1":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("Dd8w"),s=i.n(n),a=i("0jG4"),o=(i("MmTA"),i("EOwk")),r=i("JIj5"),c=i("msXN"),l={data:function(){return{productDetail:{RATE:"",PERIOD:"",RISK_LEVEL:"",TXT_MIN_AMOUNT:"",OPENAPI_BUY_COUNT:"",IS_INTERVIEW:"",DEPICT:"",ORG_LEVEL:"",COLLECT_START_DATE:"",COLLECT_END_DATE:"",VALUE_DATE:"",FIN_END_DATE:""},btnType:"安全购买",proID:"",type:"1",imgurl:o.g,xing:5,title:"",PRD_TYPE:"",canEdit:!1,defaultManey:"",currentVal:"",invest:"",IS_REALTIME_DATA_PRD:""}},mixins:[c.a.HandleMixin,c.a.UtilMixin,c.a.CheckAccountMixin],computed:{investForm:function(){return"¥"+r.a.formatNum(this.invest+"")},interest:function(){return this.getInterest(this.invest,this.productDetail.RATE,this.productDetail.PERIOD)}},created:function(){this.title=this.$route.query.title,this.proID=this.$route.query.PRO_ID,this.getData(this.proID)},directives:{focus:{inserted:function(t){t.focus()}}},filters:{PRD_TYPE_ID_FILTER:function(t){var e="产品类型";switch(t-0){case 1:e="货币基金";break;case 2:e="理财";break;case 3:e="纯债"}return e},TXT_MIN_AMOUNT_Filter:function(t){var e=t.toString();return e.substring(0,e.length-1)},IS_INTERVIEW_filter:function(t){return"首次购买无需面签"}},beforeRouteEnter:function(t,e,i){i()},beforeRouteLeave:function(t,e,i){i()},methods:{formatNumHandle:function(t){this.canEdit=!1,t-0&&t||(t=this.defaultManey+"",this.invest=this.defaultManey),this.currentVal=""},numFilter:function(t){var e=Number(t).toFixed(3),i=e.substring(0,e.length-1);return Number(i)},numFilter1:function(t){var e=t,i=e+"",n=i.indexOf("."),s="";-1==n?s=this.numFilter(e):i.substring(n+1,i.length).length>=3?(s=1e11*(this.numFilter(e)+.01)/1e11,s=this.numFilter(s)):s=this.numFilter(e);return s},getInterest:function(t,e,i){var n=void 0;t+="",this.invest=t,""==t&&(t=0),r.a.isValueNumber(t-0)?this.currentVal=t:(this.invest=this.currentVal,t=this.currentVal);var s=t*e/100*i/360,a=t*e/100*i/360,o=(a+="").indexOf(".");-1!=o?n=a.substring(o+1,a.length).length>3&&4==this.PRD_TYPE?"￥"+r.a.formatNum(""+this.numFilter(s))+"~￥"+r.a.formatNum(""+this.numFilter1(s)):"￥"+r.a.formatNum(""+this.numFilter(s)):n="￥"+r.a.formatNum(""+s);return n},getFocus:function(){this.canEdit=!this.canEdit},getData:function(t){var e=this,i={ID:t+""};a.a.bicai.getPrdInfo(i,function(t){e.productDetail=t,e.productDetail.ORG_LEVEL=Math.floor(e.productDetail.ORG_LEVEL),e.title=t.PRD_NAME;var i=e.productDetail.TXT_MIN_AMOUNT,n=i.substring(0,i.length-1);e.setComState({type:"PRD_TYPE",value:e.productDetail.PRD_TYPE}),e.IS_REALTIME_DATA_PRD=t.IS_REALTIME_DATA_PRD,e.setComState({type:"IS_REALTIME_DATA_PRD",value:""}),e.PRD_TYPE=e.productDetail.PRD_TYPE,2==e.productDetail.PRD_TYPE?n>"3000"?(e.defaultManey=n,e.invest=n):(e.defaultManey="3000",e.invest="3000"):n>1e3?(e.defaultManey=n,e.invest=n):(e.defaultManey="1000",e.invest="1000"),e.type=t.IS_ENABLED,e.btnType=1==e.type?"安全购买":"预约下期"})},goNext:function(){console.log(this.proID),this.removeComState("ProDuctData");var t=s()({id:this.proID,logo:this.productDetail.LOGO_URL},this.productDetail);this.setComState({type:"goBuy",value:t}),this.setComState({type:"loginType",value:"安全购买"}),this.$store.getters.GET_ACCOUNT_STATE.TOKEN?this.getBankStatus(o.e.Buying):this.$router.push({name:o.e.Login})}}},_={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"wrap"},[n("app-bar",{attrs:{title:t.title}}),t._v(" "),n("div",{staticClass:"banner"},[n("div",{staticClass:"bannercontent"},[n("div",{staticClass:"bannertop"},[n("div",{staticClass:"bannertopleft"},[n("p",{staticClass:"p-text",staticStyle:{"font-size":"0.4rem"}},[t._v("七日年化收益率")]),t._v(" "),n("p",[n("strong",{staticStyle:{"font-size":"1rem"}},[t._v(" "+t._s(t.productDetail.RATE)+" ")]),t._v(" "),n("span",{staticStyle:{"font-size":".5rem"}},[t._v("%")])])]),t._v(" "),t._m(0)]),t._v(" "),n("div",{staticClass:"bannerbottom"},[n("ul",[n("li",{staticClass:"bannerbottomtwo clearfix"},[t._v(t._s(t.productDetail.TXT_MIN_AMOUNT))]),t._v(" "),n("li",{staticClass:"bannerbottomthree clearfix"},[t._v("累计购买笔数 "+t._s(t.productDetail.BUY_COUNT))])])])])]),t._v(" "),n("div",{staticClass:"contenttop"},[n("p",[t._v("交易规则")]),t._v(" "),n("div",{staticClass:"bannercontent"},[n("span",{staticClass:"bannercontenttitle"},[t._v("审核方式")]),t._v(" "),n("span",{staticClass:"bannercontenttitlecontent"},[t._v(t._s(t._f("IS_INTERVIEW_filter")(t.productDetail.IS_INTERVIEW)))])]),t._v(" "),n("div",{staticClass:"bannercontent"},[n("span",{staticClass:"bannercontenttitle"},[t._v("起购金额")]),t._v(" "),n("span",{staticClass:"bannercontenttitlecontent"},[t._v(t._s(t.productDetail.MIN_AMOUNT)+"元")])]),t._v(" "),n("div",{staticClass:"bannercontent"},[n("span",{staticClass:"bannercontenttitle"},[t._v("产品类型")]),t._v(" "),n("span",{staticClass:"bannercontenttitlecontent"},[t._v(t._s(t._f("PRD_TYPE_ID_FILTER")(t.productDetail.PRD_TYPE_ID)))])])]),t._v(" "),n("div",{staticClass:"contentmain contenttop"},[n("div",{staticClass:"contentmaintop"},[t._v("\n        直销银行说明\n      ")]),t._v(" "),n("div",{staticClass:"contentmainbank",staticStyle:{"margin-top":"0.5rem"}},[n("div",{staticStyle:{display:"inline-block",width:"25%"}},[n("img",{staticStyle:{width:"90%"},attrs:{src:t.imgurl+t.productDetail.LOGO_URL,alt:""}})]),t._v(" "),n("div",{staticClass:"bank-info"},[n("p",{staticClass:"info-1"},[t._v(t._s(t.productDetail.ORG_NAME))]),t._v(" "),n("p",{staticClass:"info-2"},[t._v("隶属于 "+t._s(t.productDetail.ORG_DES)+" ")]),t._v(" "),n("div",{staticClass:"info-3"},[t._l(t.productDetail.ORG_LEVEL,function(t){return n("img",{staticClass:"start",attrs:{src:i("I5vy"),alt:""}})}),t._v(" "),t._l(5-t.productDetail.ORG_LEVEL,function(t){return n("img",{staticClass:"start",attrs:{src:i("8lbE"),alt:""}})})],2),t._v(" "),n("p",{staticClass:"info-4"},[t._v("比财评级依据产品属性和银行运营情况综合评定")])])])]),t._v(" "),n("div",{staticClass:"contentbottom contenttop"},[n("div",[n("p",{staticStyle:{width:"100%",height:"1rem","padding-bottom":"0.2rem","border-bottom":"1px solid #DCDCDC","padding-top":"0.2rem"}},[t._v("\n          产品描述")]),t._v(" "),n("div",{staticStyle:{"font-size":"0.4rem","padding-top":".5rem",color:"#666"},domProps:{innerHTML:t._s(t.productDetail.DEPICT)}})])]),t._v(" "),t._m(1)],1),t._v(" "),n("div",{staticClass:"buttonbottom",on:{click:function(e){t.goNext(t.type)}}},[n("span",{staticClass:"p-icon"}),t._v(t._s(t.btnType)+"\n  ")])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"bannertopright"},[e("p",{staticClass:"p-text",staticStyle:{"font-size":"0.4rem"}},[this._v("赎回到账时间")]),this._v(" "),e("p",[e("strong",{staticStyle:{"font-size":"1rem"}},[this._v(" T+0")]),this._v(" "),e("span",{staticStyle:{"font-size":".5rem"}},[this._v("天")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"p-color"},[n("div",{staticClass:"contentbottom2 contenttop"},[n("ul",{staticStyle:{position:"relative"}},[n("li",{staticClass:"contentbottom2left"}),t._v(" "),n("li",{staticClass:"contentbottom2main"},[t._v("比财数据科技")]),t._v(" "),n("li",{staticClass:"contentbottom2right"})]),t._v(" "),n("ul",{staticClass:"contentbottom2content contenttop",staticStyle:{height:".5rem"}},[n("li",{staticClass:"contentbottom2contentleft"},[n("div",[n("img",{attrs:{src:i("niR1"),alt:""}})]),t._v(" "),n("p",[t._v("专业平台")])]),t._v(" "),n("li",{staticClass:"contentbottom2contentleft"},[n("div",[n("img",{attrs:{src:i("85mh"),alt:""}})]),t._v(" "),n("p",[t._v("银行直签")])]),t._v(" "),n("li",{staticClass:"contentbottom2contentleft"},[n("div",[n("img",{attrs:{src:i("pQwa"),alt:""}})]),t._v(" "),n("p",[t._v("安全保障")])])])]),t._v(" "),n("div",{staticClass:"baozhang"},[n("p",[t._v("账户资金安全由存管银行保障")])])])}]};var u=i("VU/8")(l,_,!1,function(t){i("Dicj")},"data-v-7efd0ab5",null);e.default=u.exports}});
//# sourceMappingURL=48.96046b1861fa4f5c38e1.js.map