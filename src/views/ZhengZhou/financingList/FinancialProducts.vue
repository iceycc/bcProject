<template>
  <div class="wrap pro">
    <div class="w-top">
      <app-bar title="货币基金" :ifShow="false"></app-bar>
      <div></div>
      <div class="f-box">
        <!-- 头部详情样式改动 -->
        <div class="total-price">
          <p>总资产<i>(元)</i></p>
          <p>{{TOTAL| formatNum}}</p>
        </div>
        <div class="profit">
          <div>
            <p>昨日收益</p>
            <p>{{financialData.YSD_INCOME>=0?'+':''}}{{financialData.YSD_INCOME | formatNum}}</p>
          </div>
          <div>
            <p>累计收益</p>
            <p>
              <!--{{financialData.TOTAL_INCOME>=0?'+':''}}-->
              {{financialData.TOTAL_INCOME | formatNum}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="tab-box">
      <ul class="tabs">
        <li class="li-tab" v-for="(item,index) in tabsParam" @click="toggleTabs(index)"
            :class="{active:index==nowIndex}">{{item}}
        </li>
      </ul>
      <div class="no-data" v-if="nowIndex===0 && pageList1.length == 0">
        <img src="~@/assets/images/icon_open_zhengzhou_no_data.png" alt="">
        <p class="infos">对不起，目前没有数据</p>
      </div>
      <div class="no-data" v-if="nowIndex===1 && pageList2.length == 0">
        <img src="~@/assets/images/icon_open_zhengzhou_no_data.png" alt="">
        <p class="infos">对不起，目前没有数据</p>
      </div>
      <div class="divTab">
        <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
          <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
                      :auto-fill="false" ref="loadmore">
            <div style="padding-bottom: 20px">

              <div v-if="nowIndex===0" class="divTab-1" v-for="(item,index) in pageList1" :key="index">
                <!-- 新加明细按钮 -->
                <span class="detail" @click="geDetails(item)">明细</span>
                <h4>
                  <strong>{{item.PRD_NAME}}</strong>
                  <!-- <router-link to="/TransactionDetails">明细</router-link> -->
                </h4>
                <p>{{item.DESCRIPT}}</p>
                <!--todo 这三个参数现在还不对别忘记改-->
                <p>持有金额（元）
                  <span>{{item.HOLD_AMOUNT | formatNum}}</span>
                </p>
                <p>昨日收益
                  <span>{{item.CURRENT_INCOME}}</span>
                </p>
                <p>累计收益
                  <span>{{item.ADD_INCOME | formatNum}}</span>
                </p>
                <p>七日年化
                  <span>{{item.RATE}}%</span>
                </p>
                <!-- 新加赎回追加按钮 -->
                <div class="bottom-btn">
                  <div>
                    <span @click="goRedeem(item)">赎回</span>
                  </div>
                  <div>
                    <span @click="goAdd(item)">追加</span>
                  </div>
                </div>
              </div>
              <div v-if="nowIndex===1" class="divTab-1" v-for="(item,index) in pageList2" :key="index">
                <!-- 新加明细按钮 -->
                <span class="detail" @click="geDetails(item)">明细</span>
                <h4>
                  <strong>{{item.PRD_NAME}}</strong>
                   <!--<router-link to="/TransactionDetails">明细</router-link>-->
                </h4>
                <p>{{item.DESCRIPT}}</p>
                <p>累计收益
                  <span>{{item.ADD_INCOME | formatNum}}</span>
                </p>
              </div>
            </div>
          </v-loadmore>
        </div>
      </div>
      <!--<div class="divTab" v-show="nowIndex===1">-->
      <!--<div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">-->
      <!--<v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"-->
      <!--:auto-fill="false" ref="loadmore1">-->
      <!---->
      <!--</v-loadmore>-->
      <!--</div>-->

      <!--</div>-->
    </div>
  </div>
</template>
<script>
  import API from "@/service";
  import {BusName} from "@/Constant";
  import Bus from "@/plugin/bus";
  import {Loadmore} from "mint-ui";
  import util from "libs/util";
  import Mixins from "@/mixins";
  import {PageName} from "../../../Constant";


  export default {
    mixins: [''],
    data() {
      return {
        searchCondition: {
          //分页属性
          pageNo: "1",
          pageSize: "10"
        },
        // pageList1: [],
        // pageList2: [],
        pageList: [],
        allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        scrollMode: "touch", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动

        searchCondition1: {
          //分页属性
          pageNo: "1",
          pageSize: "10"
        },
        tabsParam: ["持有中", "已到期"], //（这个也可以用对象key，value来实现）
        nowIndex: 0, //默认第一个tab为激活状态
        financialData: {
          TOTAL_ASSET: '0.00',
          ACC_REST: '0.00',
          YSD_INCOME: '0.00',
          TOTAL_INCOME: '0.00',
        },
        total: '',
        TYPE: '0'
      };
    },

    components: {
      "v-loadmore": Loadmore
    },
    created() {
      this.getData(); //理财产品列表
      // this.total = this.$route.query.total
    },
    mounted() {
      this.loadPageList(); //初次访问查询列表
      let winHeigt = util.getWinSize().winHeight
      let wTopHeight = util.getDivSize('.w-top').height
      let tabsHeight = util.getDivSize('.tabs').height
      let bottomHeight = winHeigt - wTopHeight - tabsHeight - 25
      document.querySelector('.main-body').style.height = bottomHeight + 'px'
      document.querySelector('.tab-box').style.top = wTopHeight + 'px'
    },
    watch: {
    },
    computed: {
      pageList1() {
        if (this.TYPE == 1) {
          // 持有中
          return this.pageList
        } else {
          return []
        }
      },
      pageList2() {
        if (this.TYPE == 2) {
          // 已到期
          return this.pageList
        } else {
          return []
        }
      },
      TOTAL() {
        let t = this.financialData.TOTAL_ASSET - this.financialData.ACC_REST
        return t ? t : '0.00'
      }
    },
    methods: {
      goAdd(val) {
        this.setComState({type: 'goBuy', value: {...val,ID:val.PRD_INDEX_ID}})
        this.$router.push({name: PageName.Buying})
      },
      geDetails(item) {
        let {FUND_NO, PRD_INDEX_ID, PRD_NAME} = item
        this.$router.push({name: PageName.TransactionDetails, query: {FUND_NO, PRD_INDEX_ID, PRD_NAME}})
      },
      goRedeem(data) {
        this.setComState({
          type: 'redeemData',
          value: data
        })
        this.$router.push({name: PageName.Redeem})
      },
      toggleTabs(index) {
        this.pageList = []
        this.nowIndex = index;
        this.loadPageList();
      },
      getData() {
        let data = {
          type: 'API_QRY_ASSET',
        };
        //
        API.bank.apiQryAsset(data, res => {
          this.financialData = res;
        });
      },
      loadTop: function () {
        //组件提供的下拉触发方法
        //下拉加载
        console.log('下拉加载');
        this.loadPageList();

        this.$refs.loadmore.onTopLoaded(); // 固定方法，查询完要调用一次，用于重新定位
      },
      loadBottom: function () {
        // 上拉加载
        console.log('上拉加载');
        this.more(); // 上拉触发的分页查询
        this.$refs.loadmore.onBottomLoaded(); // 固定方法，查询完要调用一次，用于重新定位
      },
      loadPageList: function () {
        // 初始化
        this.searchCondition.pageNo = "1";
        this.searchCondition1.pageNo = "1";
        this.allLoaded = false;
        let data = {
          currentPage: this.searchCondition.pageNo,
          PRD_TYPE: "1"
        };
        API.bank.apiQryHoldInfo(data, res => {
          this.TYPE = res.TYPE
          this.pageList = res.retList || [];
          // this.pageList = res.PAGE.retList;
          if (this.pageList.length < this.searchCondition.pageSize) {
            this.allLoaded = true;
          }
          this.$nextTick(function () {
            // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，
            // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，
            // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
            this.scrollMode = "touch";
          });
        });
      },
      more: function () {
        // 已持有分页查询
        this.searchCondition.pageNo =
          "" + (parseInt(this.searchCondition.pageNo) + 1);
        let data = {
          currentPage: this.searchCondition.pageNo,
          PRD_TYPE: "2"
        };
        API.bank.apiQryHoldInfo(data, res => {
          this.pageList = this.pageList.concat(res.retList);
          if (this.pageList.length < this.searchCondition.pageSize) {
            this.allLoaded = true;
            Bus.$emit(BusName.showToast, "数据全部加载完成");
          }
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "~@/assets/px2rem";

  .pro .header img {
    display: none;
  }

  i {
    font-style: normal;
  }

  .pro .header:after {
    position: absolute;
    content: "";
    border-right: 2px solid #fff;
    border-top: 2px solid #fff;
    height: px2rem(11);
    width: px2rem(11);
    left: px2rem(18);
    top: 0.6rem;
    -webkit-transform: rotate(228deg);
    border-left: px2rem(2) solid transparent;
    border-bottom: px2rem(2) solid transparent;
  }

  .wrap {
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    background: #f4f4f8;
    overflow: hidden;
    position: relative;
  }

  .header {
    background-color: #518bee;
    color: #fff;
    border-bottom: 1px solid #518bee;
    position: relative;
  }

  .w-top {
    position: absolute;
    top: px2rem(0);
    width: 100%;
    z-index: 10;
  }

  .f-box {
    width: 100%;
    height: px2rem(150);
    background: #518bee;
    z-index: 2;
    color: #ffffff;
    text-align: center;
    font-size: px2rem(14);
    .total-price {
      padding: px2rem(8) 0;
      p:last-child {
        font-size: px2rem(34);
      }
    }
    .profit {
      display: flex;
      div {
        flex: 1;
        p:last-child {
          font-weight: bold;
          padding-top: px2rem(6);
          font-size: px2rem(18);
        }
      }
    }
  }

  .tab-box {
    position: absolute;
    width: 100%;
    .no-data{

      width: 100%;
      img{
        width: 100%;
      }
      .infos{
        text-align: center;
        font-size: px2rem(16);
        color: #1badff;
      }
    }
    ul {
      background: #fff;
      display: flex;
      margin-bottom: px2rem(10);
      li {
        flex: 1;
        height: px2rem(50);
        font-size: px2rem(18);
        line-height: px2rem(50);
        text-align: center;
      }
      li.active {
        color: #508cee;
        position: relative;
      }
      li.active:after {
        position: absolute;
        width: px2rem(20);
        height: px2rem(3);
        content: "";
        background: #508cee;
        border-radius: px2rem(2);
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
      }
    }
    .divTab {
      background: #f4f4f8;
      padding-bottom: px2rem(10);


      .divTab-1 {
        background: #fff;
        position: relative;
        font-size: px2rem(12);
        margin: px2rem(10) px2rem(15) 0;
        border-radius: px2rem(12);
        box-sizing: border-box;
        padding: px2rem(15) px2rem(15) 0 px2rem(15);
        .detail {
          position: absolute;
          right: px2rem(15);
          top: px2rem(15);
          color: #508CEE;
        }
        &:last-child {
          margin-bottom: px2rem(50);
        }
        h4 {
          overflow: hidden;
        }
        h4 strong {
          color: #333333;
          font-size: px2rem(16);
          line-height: px2rem(12);
        }
        h4 a {
          font-size: px2rem(12);
          color: #508cee;
          line-height: px2rem(17);
          float: right;
          font-weight: normal;
        }
        p {
          color: #666;
          font-size: px2rem(12);
          line-height: px2rem(17);
          padding-bottom: px2rem(8);
          overflow: hidden;
          span {
            float: right;
            color: #999999;
          }
        }
        p:first-of-type {
          padding: px2rem(4) 0 px2rem(10);
          border-bottom: px2rem(1) solid #f5f5f5;
          margin-bottom: px2rem(16);
        }
        // p:last-of-type{ padding-bottom: 0;}
        .bottom-btn {
          padding: px2rem(4) 0;
          text-align: center;
          display: flex;
          border-top: 1px solid #F5F5F5;
          div {
            flex: 1;
            font-size: px2rem(14);
            padding: px2rem(11) 0;
            color: #333333;
            &:first-child {
              border-right: 1px solid #F6F6F9;
            }
          }
        }
      }
    }
  }

  .main-body {
    overflow-y: auto;
    box-sizing: border-box;
    /*padding-bottom: px2rem(50);*/
  }

</style>
