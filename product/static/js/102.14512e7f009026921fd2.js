webpackJsonp([102],{"oT+i":function(t,a){},xf3G:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e("JIj5"),n=e("0jG4"),s=e("MmTA"),c=e("EOwk"),r={mixins:[""],data:function(){return{PRD_NAME:"比财"}},created:function(){this.PRD_NAME=this.$route.query.PRD_NAME},methods:{goApp:function(){n.a.watchApi({FUNCTION_ID:"ptb0A009",REMARK_DATA:"异异业合作-预约成功-下载比财"}),i.a.downLoad(function(){s.a.$emit(c.a,"请在浏览器中下载")})}}},o={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"app"},[e("app-bar",{attrs:{title:"预约成功"}}),t._v(" "),t._m(0),t._v(" "),e("div",{staticClass:"fenxiangcontent"},[e("h2",[t._v("预约成功")]),t._v(" "),e("p",{staticStyle:{"margin-top":"0.6rem",color:"#F22C17"}},[t._v("成功预约"+t._s(t.PRD_NAME)+"，请下载比财APP关注下期")])]),t._v(" "),e("span",{staticClass:"begain",on:{click:t.goApp}},[t._v("下载比财APP")])],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"chattuimg"},[a("img",{staticStyle:{width:"25%"},attrs:{src:e("Q3HA"),alt:""}})])}]};var _=e("VU/8")(r,o,!1,function(t){e("oT+i")},"data-v-2290b11c",null);a.default=_.exports}});
//# sourceMappingURL=102.14512e7f009026921fd2.js.map