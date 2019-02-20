<template>
  <div class="wrap pro">
    <div class="w-top">
      <app-bar title="存款产品" :ifShow="false"></app-bar>
      <div></div>
      <div class="f-box">
        <div class="profit">
          <div>
            <p>{{financialData.totalAmtDesc}}</p>
            <p>存款总资产（元）</p>
          </div>
          <span class="line"></span>
          <div>
            <p>{{financialData.totalIncomeDesc}}</p>
            <p>预计最大收益</p>
          </div>
        </div>
      </div>
    </div>
    <div class="tab-box">
      <ul class="tabs">
        <li class="li-tab" v-for="(item,index) in tabsParam" @click="toggleTabs(index)" :class="{active:index==nowIndex}">{{item}}
        </li>
      </ul>
      <div class="divTab">
        <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
          <div class="no-data" v-if="pageList.length == 0">
            <img src="~@/assets/images/icon_open_zhengzhou_no_data.png" alt="">
            <p class="infos">对不起，目前没有数据</p>
          </div>
          <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
            <div style="padding-bottom: 20px">
              <div v-if="nowIndex===0" class="divTab-1" v-for="(item,index) in pageList" :key="index">
                <!-- 新加明细按钮 -->
                <!-- <span class="detail" @click="geDetails(item)">明细</span> -->
                <h4>
                  <strong>{{item.prdName}}</strong>
                  <!-- <router-link to="/TransactionDetails">明细</router-link> -->
                </h4>
                <p class="org-name">{{item.orgName}}</p>
                <p>持有金额（元）
                  <span>{{item.holdAmtDesc}}</span>
                </p>
                <p>购买时间
                  <span>{{item.buyTime}}</span>
                </p>
                <p>到期日期
                  <span>{{item.expireDate}}</span>
                </p>
                <p>最大存款利率<img class="info" src="@/assets/images/problom2@2x.png" alt="" @click="showTip">
                  <span>{{item.rate}}%</span>
                </p>
                <p>预计最大收益<img class="info" src="@/assets/images/problom2@2x.png" alt="" @click="showTip">
                  <span>{{item.expectIncome}}</span>
                </p>

                <!-- 新加赎回追加按钮 -->
                <div class="bottom-btn">
                  <div>
                    <span @click="goRedeem(item)">提前支取</span>
                  </div>
                  <div>
                    <span @click="goBuy(item)">再次存入</span>
                  </div>
                </div>
              </div>
              <div v-if="nowIndex===1" class="divTab-1" v-for="(item,index) in pageList" :key="index">
                <!-- 新加明细按钮 -->
                <!-- <span class="detail" @click="geDetails(item)">明细</span> -->
                <h4>
                  <strong>{{item.prdName}}</strong>
                  <!-- <router-link to="/TransactionDetails">明细</router-link> -->
                </h4>
                <p class="org-name">{{item.orgName}}</p>
                <p>投资金额（元）
                  <span>{{item.investAmtDesc}}</span>
                </p>
                <p>投资收益
                  <span>{{item.addIncome}}</span>
                </p>
                <!--<p>支取时间-->
                <!--<span>{{item.OVER_DATE}}</span>-->
                <!--</p>-->
                <!-- 新加赎回追加按钮 -->
                <div class="bottom-btn">
                  <div>
                    <span @click="goBuy(item)">再次存入</span>
                  </div>
                </div>
              </div>

            </div>
          </v-loadmore>
        </div>
      </div>
      <!--<div class="divTab" v-show="nowIndex===1">-->
      <!--<div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">-->
      <!--<v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"-->
      <!--:auto-fill="false" ref="loadmore1">-->
      <!--</v-loadmore>-->
      <!--</div>-->

      <!--</div>-->
    </div>
    <div v-if="infoShow">
      <div class='popContainer'></div>
      <section class="waiting">
        <p>{{waitingMsg}}</p>
        <div class="btn" v-if="canRedeem">
          <div @click="close" class="cancel">取消</div>
          <div @click="sureRedeem" class="sure">继续支取</div>
        </div>
        <div class="btn" v-else>
          <div @click="close" class="cancel">确定</div>
        </div>

      </section>

    </div>
    <PopTip v-show="isShow" @closePop='popClose'></PopTip>
  </div>

</template>
<script>
import API from "@/service";
import { BusName } from "@/Constant";
import Bus from "@/plugin/bus";
import { Loadmore } from "mint-ui";
import util from "@/libs/util";
import { PageName } from "../../../Constant";
import { PopTip } from "@/components"; //工商行弹窗提示组件

export default {
  mixins: [""],
  data() {
    return {
      isShow: false, //工商行弹窗
      holdParame: "", //持有参数
      waitingMsg: "暂不支持",
      infoShow: false,
      searchCondition: {
        //分页属性
        pageNo: "1",
        pageSize: "10"
      },
      pageList: [
        // {
        //   PRD_NAME:'测试产品1',
        //   ORG_NAME:'郑州银行22',
        //   INVEST_AMOUNT:'0.00',
        //   RATE:'0',
        //   YQ_INCOME_AMOUNT:'0.00',
        //   OVER_DATE:'0',
        //   PRD_INDEX_ID:'0'
        // }
      ],
      allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
      scrollMode: "touch", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动

      searchCondition1: {
        //分页属性
        pageNo: "1",
        pageSize: "10"
      },
      tabsParam: ["持有中", "已支取"], //（这个也可以用对象key，value来实现）
      nowIndex: 0, //默认第一个tab为激活状态
      financialData: {},
      total: "",
      flags: [
        // { resCode: "3", resMsg: "333" },
        // { resCode: "4", resMsg: "4444" },
        // { resCode: "4", resMsg: "55555" }
      ],
      flagsLength: 1,
      currentFlagIndex: 0, // 多次弹窗，判断当前第几个弹窗.该处为数组索引
      canRedeem: false // 是否可以支取
    };
  },
  components: {
    "v-loadmore": Loadmore,
    PopTip
  },
  created() {
    //  this.getData(); //理财产品列表
    // this.total = this.$route.query.total
  },
  mounted() {
    this.loadPageList(); //初次访问查询列表
    let winHeigt = util.getWinSize().winHeight;
    let wTopHeight = util.getDivSize(".w-top").height;
    let tabsHeight = util.getDivSize(".tabs").height;
    let bottomHeight = winHeigt - wTopHeight - tabsHeight - 25;
    document.querySelector(".main-body").style.height = bottomHeight + "px";
    document.querySelector(".tab-box").style.top = wTopHeight + "px";
  },
  methods: {
    //显示工商行提示
    showTip() {
      this.isShow = true;
    },
    //关闭工商行提示
    popClose() {
      this.isShow = !this.isShow;
    },
    close() {
      this.infoShow = false;
    },
    goBuy(item) {
      let ORG_ID = util.storage.session.get("ORG_ID") || "";
      let { APP_FLAG, CHANNEL_ID } = this.$store.getters.GET_ACCOUNT_STATE;
      this.$router.push({
        name: PageName.KeShangProDetail,
        query: {
          ORG_ID: item.orgId || ORG_ID,
          title: item.prdName,
          APP_FLAG,
          CHANNEL_ID,
          PRO_ID: item.prdIndexId
        }
      });
    },
    geDetails(item) {
      let { FUND_NO, PRD_INDEX_ID, PRD_NAME, ORDER_NUM } = item;
      this.$router.push({
        name: PageName.TransactionDetails,
        query: { FUND_NO, PRD_INDEX_ID, PRD_NAME, ORDER_NUM }
      });
    },
    sureRedeem() {
      // 需要判断flags的长度
      console.log("currentFlagIndex>>", this.currentFlagIndex);
      console.log("flagsLength>>", this.flagsLength);

      if (this.currentFlagIndex == this.flagsLength) {
        this.$router.push({ name: PageName.Redeem });
      } else {
        this.flagPopup(this.currentFlagIndex);
      }
    },
    async goRedeem(item) {
      let params = {
        prdIndexId: item.prdIndexId, //调接口先注释 产品id
        expireDate: item.expireDate
      };
      let res = await API.redeem.apiRedemptionValid2(params);
      console.log(res);
      this.setComState({
        type: "redeemData",
        value: item
      });
      this.flags = [];
      this.flagsLength = res.length;
      for (let i = 0; i < res.length; i++) {
        this.flags.push(res[i]);
      }
      setTimeout(() => {
        this.flagPopup();
      }, 200);
    },

    flagPopup(step = 0) {
      //console.log(this.flags);
      this.currentFlagIndex = step + 1;
      let flag = this.flags[step];
      console.log(flag);
      if (flag.resCode == -1) {
        // 2.不可支取
        this.waitingMsg = flag.resMsg;
        this.canRedeem = false;
        this.infoShow = true;
      } else {
        // RES_CODE
        // 3：未满收益周期的天数将按照该行活期利率计算，收益周期请在产品详情查看，是否继续支取
        // 4：若现在支取，将无法享受活动额外奖励，仅可获得产品正常收益
        // 文案后台
        this.waitingMsg = flag.resMsg;
        this.canRedeem = true;
        this.infoShow = true;
        // this.$router.push({name: PageName.Redeem})
      }
    },
    toggleTabs(index) {
      this.pageList = [];
      this.nowIndex = index;
      this.loadPageList();
    },
    // async getData() {
    //   let data = {};
    //   //
    //   let res = await API.bank.apiQryAsset(data)
    //   this.financialData = res;

    // },
    loadTop: function() {
      //组件提供的下拉触发方法
      //下拉加载
      console.log("下拉加载");
      this.loadPageList();
      this.$refs.loadmore.onTopLoaded(); // 固定方法，查询完要调用一次，用于重新定位
    },
    loadBottom: function() {
      // 上拉加载
      console.log("上拉加载");
      this.more(); // 上拉触发的分页查询
      this.$refs.loadmore.onBottomLoaded(); // 固定方法，查询完要调用一次，用于重新定位
    },
    async loadPageList() {
      // 初始化
      this.searchCondition.pageNo = "1";
      this.searchCondition1.pageNo = "1";
      this.allLoaded = false;
      // 查询数据
      //   alert(this.nowIndex);
      if (this.nowIndex == 1) {
        //已到期数据
        let data = {
          // currentPage: this.searchCondition1.pageNo - 1 + '',
          currentPage: "1",
          prdType: "4",
          depositTypeId: "4"
        };
        let res = await API.bank.getMyInvestOver(data);
        this.pageList = res.PAGE.retList || [];

        if (res.PAGE.currentPage == res.PAGE.totalPage) {
          this.allLoaded = true;
          Bus.$emit(BusName.showToast, "数据全部加载完成");
          return;
        }

        // if (!res.PAGE) {
        //   this.allLoaded = true;
        //   Bus.$emit(BusName.showToast, "数据全部加载完成");
        //   return
        // }

        //    if (this.pageList.length <= 0) {
        //     Bus.$emit(BusName.showToast, "暂无数据");
        //    }
        this.$nextTick(function() {
          // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，
          // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，
          // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
          this.scrollMode = "touch";
        });
      } else {
        // //持有数据
        let data = {
          // currentPage: this.searchCondition.pageNo - 1 + '',
          currentPage: "1",
          prdType: "4",
          depositTypeId: "4"
        };
        let res = await API.bank.apiQryHoldInfo(data);
        //console.log(res)
        this.financialData = res; // 存款总资产  预计最大收益
        this.pageList = res.PAGE.retList;
        if (this.pageList.length <= 0) {
          this.allLoaded = true;
          Bus.$emit(BusName.showToast, "暂无数据");
          return;
        }
        this.MIN_AMOUNT = this.pageList[0] && this.pageList[0].MIN_AMOUNT;

        //是否是最后一页
        if (res.PAGE.nextPageFlag == 0) {
          this.allLoaded = true;
          Bus.$emit(BusName.showToast, "数据全部加载完成");
        } else {
          //为翻页传递参数
          this.holdParame = this.pageList[this.pageList.length - 1];
        }

        this.$nextTick(function() {
          // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，
          // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，
          // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
          this.scrollMode = "touch";
        });
      }
    },
    async more() {
      if (this.nowIndex == 1) {
        // 到期分页查询
        this.searchCondition1.pageNo =
          "" + (parseInt(this.searchCondition1.pageNo) + 1);
        let data = {
          currentPage: this.searchCondition1.pageNo + "",
          prdType: "4",
          depositTypeId: "4"
        };
        let res = await API.bank.getMyInvestOver(data);
        let pageList = res.PAGE.retList || [];
        this.pageList = this.pageList.concat(pageList);
        // if (this.pageList.length < this.searchCondition1.pageSize) {
        //   this.allLoaded = true;
        //   Bus.$emit(BusName.showToast, "数据全部加载完成");
        // }

        if (res.PAGE.currentPage == res.PAGE.totalPage) {
          this.allLoaded = true;
          Bus.$emit(BusName.showToast, "数据全部加载完成");
          return;
        }

        // if (!res.PAGE) {
        //   this.allLoaded = true;
        //   Bus.$emit(BusName.showToast, "数据全部加载完成");
        //   return
        // }
      } else {
        // 持有分页查询
        this.searchCondition.pageNo =
          "" + (parseInt(this.searchCondition.pageNo) + 1);
        let data = {
          currentPage: this.searchCondition.pageNo + "",
          prdType: "4",
          depositTypeId: "4",
          accNo: this.holdParame.accNo, //账号
          accCode: this.holdParame.accCode, //账户代码
          prodCode: this.holdParame.prodCode, //产品代码
          fxSeqNo: this.holdParame.fxSeqNo, //存单序号
          cashExFlag: this.holdParame.cashExFlag, //钞汇标志
          ccy: this.holdParame.ccy //币种
        };
        let res = await API.bank.apiQryHoldInfo(data);
        // if (!res.PAGE) {
        //   this.allLoaded = true;
        //   Bus.$emit(BusName.showToast, "数据全部加载完成");
        //   return
        // }
        let pageList = res.PAGE.retList || [];

        this.pageList = this.pageList.concat(pageList);
        //是否是最后一页
        if (res.PAGE.nextPageFlag == 0) {
          this.allLoaded = true;
          Bus.$emit(BusName.showToast, "数据全部加载完成");
        } else {
          //为翻页传递参数
          this.holdParame = pageList[pageList.length - 1];
        }
        // if (this.pageList.length < this.searchCondition.pageSize) {
        //   this.allLoaded = true;
        //   Bus.$emit(BusName.showToast, "数据全部加载完成");
        // }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
/*.pro .header .goBackImg {*/
/*display: none !important;*/
/*}*/

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
  // border-bottom: 1px solid #518bee;
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

  .profit {
    display: flex;

    div {
      padding-top: px2rem(40);
      flex: 1;

      p:first-child {
        font-size: px2rem(22);
      }

      p:last-child {
        padding-top: px2rem(6);
        font-size: px2rem(12);
      }
    }

    .line {
      display: inline-block;
      width: px2rem(2) !important;
      height: px2rem(25);
      background: #fff;
      margin-top: px2rem(60);
    }
  }
}

.tab-box {
  position: absolute;
  width: 100%;

  .no-data {
    width: 100%;

    img {
      width: 100%;
    }

    .infos {
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
      // border-radius: px2rem(12);
      box-sizing: border-box;
      // padding: px2rem(15) px2rem(15) 0 px2rem(15);
      padding-top: px2rem(15);

      .org-name {
        color: #999;
      }

      .detail {
        position: absolute;
        right: px2rem(15);
        top: px2rem(15);
        color: #508cee;
      }

      &:last-child {
        margin-bottom: px2rem(50);
      }

      h4,
      p {
        padding: 0 px2rem(15);
      }

      h4 {
        overflow: hidden;
      }

      h4 strong {
        color: #333333;
        font-size: px2rem(16);
      }

      h4 a {
        font-size: px2rem(12);
        color: #508cee;
        float: right;
        font-weight: normal;
      }

      p {
        color: #666;
        font-size: px2rem(14);
        line-height: px2rem(22);
        height: px2rem(22);
        padding-bottom: px2rem(8);
        overflow: hidden;
        vertical-align: middle;

        span {
          float: right;
          color: #999999;
        }

        .info {
          margin-left: px2rem(6);
          width: px2rem(14);
          height: px2rem(14);
        }
      }

      p:first-of-type {
        padding: px2rem(4) px2rem(15) px2rem(10);
        border-bottom: px2rem(1) solid #f5f5f5;
        margin-bottom: px2rem(16);
      }

      // p:last-of-type{ padding-bottom: 0;}
      .bottom-btn {
        // padding: px2rem(4) 0;
        text-align: center;
        display: flex;
        height: px2rem(45);
        border-top: 1px solid #f5f5f5;

        div {
          flex: 1;
          font-size: px2rem(14);
          padding: px2rem(11) 0;
          color: #333333;

          &:first-child {
            border-right: 1px solid #f6f6f9;
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

.popContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 99;
}

.waiting {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  background: #fff;
  width: px2rem(270);
  z-index: 100;
  border: 1px solid #e5e5e5;
  border-radius: px2rem(6);
  // box-shadow: px2rem(3) px2rem(3) px2rem(3) #e5e5e5;
  p {
    text-align: center;
    padding: px2rem(35) px2rem(15);
    font-size: px2rem(14);
    color: #333;
  }

  .btn {
    border-top: 1px solid #f5f5f5;
    display: flex;
  }

  .cancel,
  .sure {
    position: relative;
    text-align: center;
    flex: 1;
    padding: px2rem(10) 0 px2rem(10);
    font-size: px2rem(17);
  }

  .cancel::after {
    position: absolute;
    content: "";
    width: 1px;
    height: px2rem(20);
    right: 0;
    top: px2rem(12);
    background: #f5f5f5;
  }

  .cancel {
    color: #508cee;
  }

  .sure {
    color: #000;
  }
}

.pop-mask {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99;
}

.pop .pop-main {
  position: fixed;
  left: 0;
  right: 0;
  height: px2rem(409);
  top: inherit;
  bottom: px2rem(-409);
  border-radius: 0;
  -webkit-transition: all 0.35s;
  -moz-transition: all 0.35s;
  -o-transition: all 0.35s;
  transition: all 0.35s;
  z-index: 999;
}

.pop .pop-box {
  padding: px2rem(11) px2rem(15);
  overflow: hidden;
  height: px2rem(338);
  background: #fff;
  font-size: px2rem(14);
  overflow-y: auto;
}

.pop .pop-main.show1 {
  bottom: 0;
}

.pop .none {
  display: none;
}

.pop .pop-box p {
  color: #333333;
  line-height: px2rem(24);
}

.pop .pop-box p.yel {
  color: #ff5b05;
}

.pop .pop-box ul {
  color: #666666;
  line-height: px2rem(24);
}

.pop-close {
  display: block;
  position: absolute;
  top: px2rem(20);
  right: px2rem(13);
  width: px2rem(13);
  height: px2rem(13);
  background: url(~@/assets/images/control_close@2x.png) 0 0;
  background-size: px2rem(13);
}

.pop-title {
  position: relative;
  line-height: px2rem(48);
  text-align: center;
  border-bottom: 1px solid #c5c5c5;
  background: #f6f6f6;
}

.pop-title ins {
  font-size: px2rem(18);
  color: #333333;
  text-decoration: none;
}
</style>
