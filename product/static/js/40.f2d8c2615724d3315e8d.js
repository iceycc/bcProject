webpackJsonp([40],{GiHB:function(s,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});a("0jG4");var i=a("EOwk"),e={mixins:[a("msXN").a.StoreMixin],data:function(){return{datas:{},downUrl:"http://www.baidu.com"}},created:function(){this.datas=this.getComState.buyData||{},console.log(this.datas)},methods:{goMyAssets:function(){this.$router.push({name:i.e.BankDetail})},goBuyOther:function(){this.$router.push({name:i.e.ProductList})}}},c={render:function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",[a("app-bar",{attrs:{title:"存入"}}),s._v(" "),s._m(0),s._v(" "),a("div",{staticClass:"buysuccessdetail"},[a("div",{staticClass:"buysuccessdetails"},[a("div",{staticClass:"buysuccessdetailleft"},[s._v("理财产品名称")]),s._v(" "),a("div",{staticClass:"buysuccessdetailright"},[s._v(s._s(s.datas.PRD_NAME))])]),s._v(" "),a("div",{staticClass:"buysuccessdetails"},[a("div",{staticClass:"buysuccessdetailleft"},[s._v("交易银行")]),s._v(" "),a("div",{staticClass:"buysuccessdetailright"},[s._v(s._s(s.datas.ORG_NAME))])]),s._v(" "),a("div",{staticClass:"buysuccessdetails"},[a("div",{staticClass:"buysuccessdetailleft"},[s._v("存入金额")]),s._v(" "),a("div",{staticClass:"buysuccessdetailright"},[s._v(s._s(s.datas.PAY_AMOUT)+"元")])]),s._v(" "),a("div",{staticClass:"buysuccessdetails"},[a("div",{staticClass:"buysuccessdetailleft"},[s._v("存入日期")]),s._v(" "),a("div",{staticClass:"buysuccessdetailright"},[s._v(s._s(s.datas.OPERA_DATE))])]),s._v(" "),a("div",{staticClass:"buysuccessdetails"},[a("div",{staticClass:"buysuccessdetailleft"},[s._v("交易流水号")]),s._v(" "),a("div",{staticClass:"buysuccessdetailright"},[s._v(s._s(s.datas.BESHARP_SEQ))])])]),s._v(" "),a("div",{staticClass:"btn"},[a("span",{staticClass:"begain",on:{click:s.goMyAssets}},[s._v("查看我的资产")]),s._v(" "),a("span",{staticClass:"begain",on:{click:s.goBuyOther}},[s._v("存入其它产品")])])],1)},staticRenderFns:[function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"buysuccessimg"},[t("img",{attrs:{src:a("Q3HA"),alt:""}}),this._v(" "),t("p",[this._v("存入成功")])])}]};var u=a("VU/8")(e,c,!1,function(s){a("jeBb")},"data-v-8f206a6e",null);t.default=u.exports},jeBb:function(s,t){}});
//# sourceMappingURL=40.f2d8c2615724d3315e8d.js.map