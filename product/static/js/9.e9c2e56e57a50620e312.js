webpackJsonp([9],{WMKc:function(t,e){},mXFF:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("ehhp");var i=a("NVmV"),s=a.n(i),n=a("0jG4"),o=a("EOwk"),r=a("MmTA"),c=a("JIj5"),l={data:function(){return{cur:1,pageList1:[{TRANS_TYPE_NAME:"百度",TRANS_TIEM:"AAA",TRANS_AMT:"11"}],PRD_NAME:"",searchCondition:{pageNo:"1",pageSize:"10"},pageList:[],allLoaded:!1,scrollMode:"auto",pageList3:[],tabsParam:["近一个月","近二个月","近三个月"," "],nowIndex:0,startDate:"",endDate:"",divSizeObj:{small:{},large:{}},FUND_NO:"",PRD_INDEX_ID:""}},watch:{cur:function(){this.loadPageList(),this.setEleSize()}},created:function(){this.FUND_NO=this.$route.query.FUND_NO,this.PRD_INDEX_ID=this.$route.query.PRD_INDEX_ID,this.PRD_NAME=this.$route.query.PRD_NAME},components:{"v-loadmore":s.a},mounted:function(){this.loadPageList(),this.setEleSize()},methods:{getData:function(){this.cur,this.cur},tap:function(t){this.cur=t},setEleSize:function(){console.log(this.nowIndex);var t=c.a.getWinSize().winHeight,e=c.a.getDivSize(".wrap-top").height,a=c.a.getDivSize(".tabs").height,i=3==this.nowIndex?a:0,s=t-e-i;console.log(e,s,i),document.querySelector(".t-tab").style.top=e+"px",document.querySelector(".main-body").style.height=s+"px"},loadTop:function(){this.loadPageList(),this.$refs.loadmore.onTopLoaded()},loadBottom:function(){this.more(),this.$refs.loadmore.onBottomLoaded()},loadPageList:function(){this.searchCondition.pageNo="1",this.allLoaded=!1;var t=this.nowIndex;this.setEleSize(),3==this.nowIndex&&(t=0),this.endDate=this.getLastMonthYestdy(0),this.startDate=this.getLastMonthYestdy(t+1),this.apiQryTradeHis(this.startDate,this.endDate)},more:function(){var t=this;this.searchCondition.pageNo=""+(parseInt(this.searchCondition.pageNo)+1);var e={TYPE:"API_QRY_BUY_HIS",QRY_TYPE:"0",PRD_TYPE:"1",FUND_NO:this.FUND_NO,PRD_INDEX_ID:this.PRD_INDEX_ID,currentPage:this.searchCondition.pageNo,START_DATE:this.startDate,END_DATE:this.endDate};1==this.cur&&n.a.bank.apiQryIncomHis(e,function(e){t.pageList=t.pageList.concat(e.PAGE.retList),e.PAGE.currentPage==e.PAGE.totalPage&&(t.allLoaded=!0,r.a.$emit(o.a.showToast,"数据全部加载完成"))}),2==this.cur&&n.a.bank.apiQryBuyHis(e,function(e){t.pageList=t.pageList.concat(e.PAGE.retList),e.PAGE.currentPage==e.PAGE.totalPage&&(t.allLoaded=!0,r.a.$emit(o.a.showToast,"数据全部加载完成"))})},apiQryTradeHis:function(t,e){var a=this,i={TYPE:"API_QRY_BUY_HIS",currentPage:"1",QRY_TYPE:"0",PRD_TYPE:"1",FUND_NO:this.FUND_NO,PRD_INDEX_ID:"",START_DATE:t,END_DATE:e};1==this.cur&&n.a.bank.apiQryIncomHis(i,function(t){a.pageList=t.PAGE.retList,a.pageList.length<a.searchCondition.pageSize&&(a.allLoaded=!0),a.pageList.length<=0&&r.a.$emit(o.a.showToast,"暂无数据"),a.$nextTick(function(){this.scrollMode="touch"})}),2==this.cur&&n.a.bank.apiQryBuyHis(i,function(t){a.pageList=t.PAGE.retList,a.pageList.length<a.searchCondition.pageSize&&(a.allLoaded=!0),a.pageList.length<=0&&r.a.$emit(o.a.showToast,"暂无数据"),a.$nextTick(function(){this.scrollMode="touch"})})},toggleTabs:function(t){this.nowIndex=t,this.pageList=[],this.loadPageList()},setDate:function(){var t=this;this.$picker.show({type:"datePicker",endTime:this.getLastYearYestdy(0),startTime:this.getLastYearYestdy(2),onOk:function(e){t.endDate=t.fomateDate(e)}})},setDate2:function(){var t=this;this.$picker.show({type:"datePicker",date:this.startDate,endTime:this.getLastYearYestdy(0),startTime:this.getLastYearYestdy(2),onOk:function(e){t.startDate=t.fomateDate(e)}})},fomateDate:function(t){return t.split("-").map(function(t){return t.length>1?t:0+t}).join("-")},getLastMonthYestdy:function(t){var e=new Date,a=new Array([0],[31],[28],[31],[30],[31],[30],[31],[31],[30],[31],[30],[31]),i=e.getFullYear(),s=e.getDate(),n=e.getMonth()+1;return i%4==0&&i%100!=0&&(a[2]=29),n-t==0?(i-=1,n=12):n-=t,s=Math.min(s,a[n]),n<10&&(n="0"+n),s<10&&(s="0"+s),i+"-"+n+"-"+s},checkTime:function(t,e){var a=t,i=e;if(!i)return!0;var s=new Date(a).getTime(),n=new Date(i).getTime();if(""==a)return r.a.$emit(o.a.showToast,"开始日期不能为空"),!1;if(""==i)return r.a.$emit(o.a.showToast,"结束日期不能为空"),!1;if(s>n)return r.a.$emit(o.a.showToast,"开始日期不能大于结束日期"),!1;var c=a.split("-"),l=i.split("-");c[1]=parseInt(c[1]),c[2]=parseInt(c[2]),l[1]=parseInt(l[1]),l[2]=parseInt(l[2]);var h=!0;return c[0]==l[0]?l[1]-c[1]>3?h=!1:l[1]-c[1]==3&&l[2]>c[2]&&(h=!1):l[0]-c[0]>1?h=!1:l[0]-c[0]==1&&(c[1]<10?h=!1:c[1]+3-l[1]<12?h=!1:c[1]+3-l[1]==12&&l[2]>c[2]&&(h=!1)),!!h||(r.a.$emit(o.a.showToast,"查询日期范围太大，最大可查三个月的记录"),!1)},getLastYearYestdy:function(t){var e=new Date,a=e.getFullYear()-t,i=e.getDate(),s=e.getMonth()+1;return s<10&&(s="0"+s),i<10&&(i="0"+i),a+"-"+s+"-"+i},query:function(){this.checkTime(this.startDate,this.endDate),this.apiQryTradeHis(this.startDate,this.endDate)}}},h={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"wrap"},[a("div",{staticClass:"wrap-top"},[a("app-bar",{attrs:{title:"明细"}}),t._v(" "),a("ul",{staticClass:"w-tap"},[a("li",{class:{actvie:1==t.cur},on:{click:function(e){t.tap(1)}}},[t._v("收益明细")]),t._v(" "),a("li",{class:{actvie:2==t.cur},on:{click:function(e){t.tap(2)}}},[t._v("交易明细")])]),t._v(" "),a("ul",{staticClass:"tabs"},t._l(t.tabsParam,function(e,i){return a("li",{staticClass:"li-tab",class:{active:i==t.nowIndex},on:{click:function(e){t.toggleTabs(i)}}},[t._v(t._s(e)+"\n      ")])}))],1),t._v(" "),a("div",{staticClass:"t-tab"},[a("div",{staticClass:"divTab"},[a("div",{directives:[{name:"show",rawName:"v-show",value:3===t.nowIndex,expression:"nowIndex===3"}],staticClass:"t-date"},[a("ul",[a("li",{on:{click:t.setDate2}},[t._v("\n            "+t._s(t.startDate)+"\n            "),a("span")]),t._v(" "),a("li",{on:{click:t.setDate}},[t._v("\n            "+t._s(t.endDate)+"\n            "),a("span")])]),t._v(" "),a("div",{staticClass:"t-query",on:{click:t.query}},[t._v("查询")])]),t._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:3===t.nowIndex,expression:"nowIndex===3"}],staticClass:"t-text"},[t._v("根据银行要求，只能查询最近两年记录，每次查询最大范围三个月")]),t._v(" "),a("div",{staticClass:"t-content main-body",style:{"-webkit-overflow-scrolling":t.scrollMode}},[a("v-loadmore",{ref:"loadmore",attrs:{"top-method":t.loadTop,"bottom-method":t.loadBottom,"bottom-all-loaded":t.allLoaded,"auto-fill":!1}},[a("div",[a("ul",t._l(t.pageList,function(e,i){return a("li",{key:i},[a("h5",{staticStyle:{display:"flex"}},[a("span",{staticStyle:{flex:"1"}},[t._v(t._s(t.PRD_NAME))]),t._v(" "),1==t.cur?a("span",{staticStyle:{width:"40%","text-align":"right",color:"#E62224"}},[t._v("收益")]):t._e(),t._v(" "),2==t.cur&&1==e.TYPE?a("span",{staticStyle:{width:"40%","text-align":"right",color:"#E62224"}},[t._v("买入")]):t._e(),t._v(" "),2==t.cur&&2==e.TYPE?a("span",{staticStyle:{width:"40%","text-align":"right",color:"#E62224"}},[t._v("赎回")]):t._e()]),t._v(" "),a("p",[a("span",[t._v(t._s(e.OPERA_TIME))]),t._v(" "),a("em",[t._v(t._s(2==e.TYPE?"-":"+")+" "+t._s(e.TRANS_AMT))])])])}))])])],1)])])])},staticRenderFns:[]};var d=a("VU/8")(l,h,!1,function(t){a("uCEb"),a("WMKc")},"data-v-5267e43e",null);e.default=d.exports},uCEb:function(t,e){}});
//# sourceMappingURL=9.e9c2e56e57a50620e312.js.map