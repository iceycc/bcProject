webpackJsonp([110],{W3vU:function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=i("DFVY"),a=(i("EOwk"),i("msXN")),e=i("0jG4"),c={methods:{getBankDetail:function(){var t=this;e.a.bank.apiQryAsset({},function(n){t.ACC_REST=n.ACC_REST})}}},o={name:"bankBalance",components:{IconFont:s.a},data:function(){return{ACC_REST:"0.00"}},mixins:[a.a.HandleMixin,c],filters:{preLcAssetFilter:function(t){return t?t.slice(0,t.length-2):""},lastLcAssetFilter:function(t){return t?t.slice(t.length-2,t.length):""}},created:function(){this.getBankDetail()},methods:{goPage:function(t){var n={};this.setComState({type:"OriginPage",value:this.$route.fullPath}),"Withdraw"==t&&(n={ACC_REST:this.ACC_REST}),console.log(t),this.$router.push({name:t,query:n})}}},l={render:function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"m-main"},[i("app-bar",{staticClass:"m-header",attrs:{title:"可用余额"}}),t._v(" "),i("section",{staticClass:"m-top"},[i("p",{staticClass:"u-title"},[t._v("可用金额（元）")]),t._v(" "),i("p",{staticClass:"u-content"},[t._v("￥"+t._s(t._f("preLcAssetFilter")(t._f("formatNum")(t.ACC_REST)))),i("i",[t._v(t._s(t._f("lastLcAssetFilter")(t._f("formatNum")(t.ACC_REST))))])])]),t._v(" "),i("section",{staticClass:"m-list"},[i("section",{staticClass:"m-li",on:{click:function(n){t.goPage("Recharge")}}},[i("span",[t._v("充值")]),t._v(" "),i("icon-font",{attrs:{iconClass:"icon-xiangyou",iconStyle:"detail"}})],1),t._v(" "),i("section",{staticClass:"m-li",on:{click:function(n){t.goPage("Withdraw")}}},[i("span",[t._v("提现")]),t._v(" "),i("icon-font",{attrs:{iconClass:"icon-xiangyou",iconStyle:"detail"}})],1),t._v(" "),i("section",{staticClass:"m-li",on:{click:function(n){t.goPage("DealDetails")}}},[i("span",[t._v("明细查询")]),t._v(" "),i("icon-font",{attrs:{iconClass:"icon-xiangyou",iconStyle:"detail"}})],1),t._v(" "),i("section",{staticClass:"m-li",on:{click:function(n){t.goPage("InHanding")}}},[i("span",[t._v("处理中记录查询")]),t._v(" "),i("icon-font",{attrs:{iconClass:"icon-xiangyou",iconStyle:"detail"}})],1)])],1)},staticRenderFns:[]};var r=i("VU/8")(o,l,!1,function(t){i("sRZA")},"data-v-1c5b85f1",null);n.default=r.exports},sRZA:function(t,n){}});
//# sourceMappingURL=110.024ac8f1e1aefc7f6281.js.map