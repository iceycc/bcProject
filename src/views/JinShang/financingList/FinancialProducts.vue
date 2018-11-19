<template>
  <div class="wrap pro">
    <div class="w-top">
      <app-bar title="理财产品"></app-bar>
      <div></div>
      <div class="f-box">
        <!-- 头部详情样式改动 -->
        <div class="total-price">
          <p>总资产<i>(元)</i></p>
          <p>{{financialData.TOTAL_AMOUNT | formatNum}}</p>
        </div>
        <div class="profit">
          <div>
            <p>昨日收益</p>
            <p>{{financialData.YSD_INCOME | formatNum}}</p>
          </div>
          <div>
            <p>累计收益</p>
            <p>{{financialData.TOTAL_INCOME | formatNum}}</p>
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
      <div class="divTab" v-show="nowIndex===0">
        <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
          <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
                      :auto-fill="false" ref="loadmore">
            <div style="padding-bottom: 20px">
              <div class="divTab-1" v-for="(item,index) in pageList" :key="index">
                <!-- 新加明细按钮 -->
                <span class="detail">明细</span>
                <h4>
                  <strong>{{item.PRD_NAME}}</strong>
                  <!-- <router-link to="/TransactionDetails">明细</router-link> -->
                </h4>
                <p>隶属于{{item.ORG_NAME}}</p>
                <p>当前价值（元）
                  <span>{{item.INVEST_AMOUNT | formatNum}}</span>
                </p>
                <p>预期年化收益率
                  <span>{{item.RATE}}%</span>
                </p>
                <p>预期参考收益（元）
                  <span>{{item.YQ_INCOME_AMOUNT | formatNum}}</span>
                </p>
                <p>到期日期
                  <span>{{item.OVER_DATE}}</span>
                </p>
              </div>
            </div>
          </v-loadmore>
        </div>
      </div>
      <div class="divTab" v-show="nowIndex===1">
        <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
          <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
                      :auto-fill="false" ref="loadmore1">
            <div class="divTab-1" v-for="(item,index) in pageList1" :key="index">
              <!-- 新加明细按钮 -->
              <span class="detail">明细</span>
              <h4>
                <strong>{{item.PRD_NAME}}</strong>
                <!-- <router-link to="/TransactionDetails">明细</router-link> -->
              </h4>
              <p>隶属于{{item.ORG_NAME}}</p>
              <p>投资金额（元）
                <span>{{item.INVEST_AMOUNT | formatNum}}</span>
              </p>
              <p>投资收益（元）
                <span>{{item.TOTAL_INCOME | formatNum}}</span>
              </p>
              <p>到期日期
                <span>{{item.OVER_DATE}}</span>
              </p>
            </div>
          </v-loadmore>
        </div>

      </div>
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


  export default {
    mixins: [''],
    data() {
      return {
        searchCondition: {
          //分页属性
          pageNo: "1",
          pageSize: "10"
        },

        pageList: [
          {
            PRD_NAME:'测试产品1',
            ORG_NAME:'郑州银行',
            INVEST_AMOUNT:'0.00',
            RATE:'0',
            YQ_INCOME_AMOUNT:'0.00',
          }
        ],
        allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        scrollMode: "touch", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动

        searchCondition1: {
          //分页属性
          pageNo: "1",
          pageSize: "10"
        },
        pageList1: [],
        tabsParam: ["持有中", "已到期"], //（这个也可以用对象key，value来实现）
        nowIndex: 0, //默认第一个tab为激活状态
        financialData: {},
        total: ''
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
    methods: {
      toggleTabs(index) {
        this.nowIndex = index;
        this.loadPageList();
      },
      getData() {
        let data = {
          PRD_TYPE: ""
        };
        API.financial.apiMyAssetByType(data, res => {
          this.financialData = res.lcAsset;
        });
      },
      loadTop: function () {
        //组件提供的下拉触发方法
        //下拉加载
        console.log('下拉加载');
        this.loadPageList();
        if (this.nowIndex == 1) {
          this.$refs.loadmore1.onTopLoaded(); // 固定方法，查询完要调用一次，用于重新定位
        } else {
          this.$refs.loadmore.onTopLoaded(); // 固定方法，查询完要调用一次，用于重新定位
        }
      },
      loadBottom: function () {
        // 上拉加载
        console.log('上拉加载');
        this.more(); // 上拉触发的分页查询
        if (this.nowIndex == 1) {
          this.$refs.loadmore1.onBottomLoaded(); // 固定方法，查询完要调用一次，用于重新定位
        } else {
          this.$refs.loadmore.onBottomLoaded(); // 固定方法，查询完要调用一次，用于重新定位
        }
      },
      loadPageList: function () {
        // 初始化
        this.searchCondition.pageNo = "1";
        this.searchCondition1.pageNo = "1";
        this.allLoaded = false;
        // 查询数据

        //   alert(this.nowIndex);
        if (this.nowIndex == 1) {
          //已到期数据
          let data = {
            currentPage: this.searchCondition1.pageNo,
            PRD_TYPE: "2"
          };
          API.financial.getMyInvestOver(data, res => {
            this.pageList1 = res.PAGE.retList;
            if (this.pageList1.length == 0) {
              // this.allLoaded = true;
            }
            //    if (this.pageList1.length <= 0) {
            //     Bus.$emit(BusName.showToast, "暂无数据");
            //    }
            this.$nextTick(function () {
              // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，
              // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，
              // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
              this.scrollMode = "touch";
            });
          });
        } else {
          //持有数据
          let data = {
            currentPage: this.searchCondition.pageNo,
            PRD_TYPE: "2"
          };
          API.financial.getMyInvestHold(data, res => {
            this.pageList = res.PAGE.retList;
            // this.pageList = res.PAGE.retList;
            if (this.pageList.length < this.searchCondition.pageSize) {
              this.allLoaded = true;
            }
            //   if (this.pageList.length <= 0) {
            //     Bus.$emit(BusName.showToast, "暂无数据");
            //   }
            this.$nextTick(function () {
              // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，
              // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，
              // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
              this.scrollMode = "touch";
            });
          });
        }
      },
      more: function () {
        if (this.nowIndex == 1) {
          // 已到期分页查询
          this.searchCondition1.pageNo =
            "" + (parseInt(this.searchCondition1.pageNo) + 1);
          let data = {
            currentPage: this.searchCondition1.pageNo,
            PRD_TYPE: "2"
          };
          API.financial.getMyInvestOver(data, res => {
            this.pageList1 = this.pageList1.concat(res.PAGE.retList);
            if (this.pageList1.length < this.searchCondition1.pageSize) {
              this.allLoaded = true;
              Bus.$emit(BusName.showToast, "数据全部加载完成");
            }
          });
        } else {
          // 已持有分页查询
          this.searchCondition.pageNo =
            "" + (parseInt(this.searchCondition.pageNo) + 1);
          let data = {
            currentPage: this.searchCondition.pageNo,
            PRD_TYPE: "2"
          };
          API.financial.getMyInvestHold(data, res => {
            this.pageList = this.pageList.concat(res.PAGE.retList);
            if (this.pageList.length < this.searchCondition.pageSize) {
              this.allLoaded = true;
              Bus.$emit(BusName.showToast, "数据全部加载完成");
            }
          });
        }
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
    padding-bottom: px2rem(50);
  }

</style>
