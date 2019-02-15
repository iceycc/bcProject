<template>
  <div class="main">
    <!--<app-bar :title="bankObj.ORG_NAME"></app-bar>-->
    <app-bar title="工商银行321321"></app-bar>
    <section class="container" style="padding-top: 7px">
      <section class="banner">
        <section>
          <span class="bk-text1">总资产</span>
          <span class="bk-text2">（元）</span>
          <icon-font :iconClass="pass?'icon-eye':'icon-icon-eye-close'" iconStyle="eye"
                     @doClick="pass =!pass"></icon-font>
        </section>
        <p class="money" v-if="pass">{{bankDetail.totalAssetDesc}}</p>
        <p class="money" v-if="!pass">****</p>
        <section class="income">
          <section class="left">
            <p>预计最大收益</p>
            <span class="left-text" v-if="pass">
                             <i>{{bankDetail.ysdIncomeDesc>=0?'+':''}}</i>
                            {{bankDetail.ysdIncomeDesc}}</span>
            <span class="left-text" v-if="!pass">
                            ****
                        </span>
          </section>
          <section class="right">
            <p>累计到账收益</p>
            <span class="right-text" v-if="pass">
                             <i>{{bankDetail.totalIncomeDesc>=0?'+':''}}</i>
                            {{bankDetail.totalIncomeDesc}}</span>
            <span class="right-text" v-if="!pass">
                            ****
                        </span>
          </section>
        </section>
      </section>
    </section>
    <section class="container">
      <section class="info-card">
        <div class="ic-left">
          <span class="bk-text1">可用余额</span><span class="bk-text2">（元）</span>
          <p class="money" v-if="pass">{{bankDetail.accRestDesc}}</p>
          <p class="money" v-else>****</p>
        </div>
        <span class="ic-right" @click="goPage(toPageName.BankBalance)">
                    明细
                    <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
                </span>

      </section>
    </section>
    <section class="bank-card container">
      <div class="bank-logo">
        <img :src="imgSrc + bankObj.logo" alt="">
      </div>
      <div class="bank-test">
        <p class="">{{bankObj.ORG_NAME}}银行卡</p>
        <p class="card-no">{{bankObj.ACCT_NO | BankNo_Filter}}</p>
      </div>
    </section>
    <!--银行存款-->
    <section class="financing-list">
      <section class="top" @click="goPage(toPageName.FinancialProducts)">
                    <span class="top-left">
                        {{proList.PRD_TYPE_NAME}}</span>
        <span :class="{'top-right':true,select:licaiShow}" v-if="pass">
                        ¥{{proList.TOTAL_AMT | formatNum | preLcAssetFilter}}<i class="small-number">{{proList.TOTAL_AMT |formatNum| lastLcAssetFilter}}</i>
                    </span>
        <span class="top-right" v-if="!pass">
                    ****
                </span>
        <span class="ic-right">
                    明细
                    <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
                </span>
      </section>
      <ul v-if="licaiShow">
        <!-- @click="geDetails(item)"-->
        <li class="financing-li" v-for="item,index in proList.PAGE.retList"
            @click="geDetails(item)" v-if="index<3"
        >
          <icon-font iconClass="icon-yuan" iconStyle="li-yuan"></icon-font>
          <span class="li-left">
                        {{item.PRD_NAME}}</span>
          <span v-if="pass">
                        ¥{{item.HOLD_AMOUNT | formatNum | preLcAssetFilter}}<i class="small-number2">{{item.HOLD_AMOUNT |formatNum| lastLcAssetFilter}}</i>
                    </span>
          <span v-if="!pass">
                        ****
                    </span>

        </li>
      </ul>
    </section>
    <!--更多服务-->
    <section class="more" @click="goPage(toPageName.MoreService)">
             <span class="more-left">
                        更多服务</span>
      <span class="more-right">
                <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
                    </span>
    </section>

    <p class="foot-text">
      银行热线 <a :href="'tel:'+TEL_HERF">{{bankDetail.custServiceHotLine}}</a>
      <br>
      {{bankDetail.custServiceHotLine}}

    </p>
  </div>
</template>

<script>
  import {PageName, imgSrc} from "@/Constant";
  import BankDetailMixins from "./BankDetail";
  import {IconFont} from '@/components'

  export default {
    name: "bankDetail",
    components: {
      IconFont
    },
    mixins: [BankDetailMixins],
    data() {
      return {
        CUST_SERVICE_HOTLINE: '',
        imgSrc,
        proList: {
          TOTAL_AMT: '0.00',
          PAGE: {}
        },
        pass: true,
        licaiShow: true,
        toPageName: {
          BankBalance: PageName.BankBalance,
          MoreService: PageName.MoreService,
          FinancialProducts: PageName.FinancialProducts,
        },
        bankDetail: {
          TOTAL_ASSET: '0.00',
          TOTAL_INCOME: '0.00',
          ACC_REST: '0.00',
          YSD_INCOME: '0.00',
        },
        bankObj: {} // 绑定点银行点列表

      }
    },
    filters: {
      preLcAssetFilter(val) {
        if (!val) return ''
        return val.slice(0, val.length - 2)
      },
      lastLcAssetFilter(val) {
        if (!val) return ''
        return val.slice(val.length - 2, val.length)
      }
    },
    computed: {
      TEL_HERF() {
        if (this.bankDetail.custServiceHotLine) {
          let str = this.bankDetail.custServiceHotLine
          str = str.replace(/[^0-9]/ig, "")
          return str
        } else {
          return ''
        }
      }
    },
    created() {
      this.getBankDetail()  // 获取产品列表
      // this.scroll() // 这个暂时注释 忘记干啥的了
      this.getProList() // 获取持有中的产品列表
      this.getBankList() // 获取二类户信息
    }
    ,
    methods: {
      goPage(pageName) {
        this.$router.push({
          name: pageName,
        })
      }
      ,
      show() {
        console.log('show');
      }
      ,
      geDetails(item) {
        let {FUND_NO, PRD_INDEX_ID, PRD_NAME, ORDER_NUM} = item
        this.$router.push({name: PageName.TransactionDetails, query: {FUND_NO, PRD_INDEX_ID, PRD_NAME, ORDER_NUM}})
      },


      scroll() {
        let _this = this
        //--------------上拉加载更多---------------
        //获取滚动条当前的位置
        function getScrollTop() {
          var scrollTop = 0;
          if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
          } else if (document.body) {
            scrollTop = document.body.scrollTop;
          }
          return scrollTop;
        }

        //获取当前可视范围的高度
        function getClientHeight() {
          var clientHeight = 0;
          if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
          } else {
            clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
          }
          return clientHeight;
        }

        //获取文档完整的高度
        function getScrollHeight() {
          return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        }

        //滚动事件触发
        window.onscroll = function () {
          if (getScrollTop() + getClientHeight() == getScrollHeight()) {

          }
        }
        //-----------------结束--------------------
      }
    }
  }
</script>

<style scoped lang="scss">


  i {
    font-style: normal;
  }

  .main {
    height: 100%;
    background: #f6f6f6;
  }

  .container {
    padding: 0 px2rem(15);
    background: #fff;
    box-sizing: border-box;
  }

  .banner {
    height: px2rem(120);
    background: url("~@/assets/images/background@2x.png") no-repeat;
    background-size: contain;
    box-sizing: border-box;
    padding: px2rem(0) px2rem(10);
    color: #fff;
    font-size: 0;

    .bk-text1 {
      font-size: px2rem(18);
      opacity: .7;
    }

    .bk-text2 {
      font-size: px2rem(10);
      opacity: .7;

    }

    .eye {
      margin-left: px2rem(19);
      font-size: px2rem(24);

    }

    .money {
      font-size: px2rem(23);
    }

    .income {
      margin-top: px2rem(8);
      display: flex;
      font-size: px2rem(12);
      color: rgba(255, 255, 255, .7);

      .left {
        flex: 1;
      }

      .right {
        flex: 1;
        text-align: right;
      }
    }

    .left-text {
      color: #FFA054;

    }

    .right-text {
      color: #fff;
    }

  }

  .info-card {
    display: flex;
    font-size: 0;
    padding: px2rem(30) 0 px2rem(11) px2rem(10);

    .ic-left {
      flex: 1;
    }

    .ic-right {
      font-size: px2rem(12);
      color: #666;
      display: inline-block;
      height: px2rem(56);
      line-height: px2rem(56);
    }

    .bk-text1 {
      font-size: px2rem(14);
      opacity: .7;
    }

    .bk-text2 {
      font-size: px2rem(10);
      opacity: .7;
      margin-left: px2rem(-3);

    }

    .money {
      font-size: px2rem(24);
    }

    .detail {
      font-size: px2rem(12);
    }

    margin-bottom: px2rem(10);
  }

  .bank-card {
    display: flex;
    box-sizing: border-box;
    padding: px2rem(10);

    .bank-logo {
      width: px2rem(48);
      height: px2rem(48);

      img {
        width: 100%;
        height: 100%;
      }
    }

    .card-no {
      color: #999
    }

    .bank-test {
      padding-left: px2rem(10);
      font-size: px2rem(16);
    }

    margin-bottom: px2rem(10);
  }

  .financing-list {
    box-sizing: border-box;
    padding: px2rem(10) px2rem(10) px2rem(0) px2rem(20);
    background: #fff;

    .top {
      display: flex;
      font-size: px2rem(14);
      height: px2rem(28);
      line-height: px2rem(28);
      color: #000;

      .top-left {
        position: relative;
        flex: 1;
        padding-left: px2rem(20);
        box-sizing: border-box;

        &:before {
          position: absolute;
          left: px2rem(0);
          top: 50%;
          transform: translateY(-50%);
          content: '';
          width: px2rem(15);
          height: px2rem(15);
          background: url("~@/assets/images/property_icon_financing.png") no-repeat center;
          background-size: contain;
        }
      }

      .ic-right {
        padding-left: px2rem(25);
        font-size: px2rem(12);
        color: #666;
        display: inline-block;

        .detail {
          font-size: px2rem(12);
        }
      }

      .top-right {
        font-size: px2rem(18);
        color: #333;

        &.select {
          color: #999;
        }
      }

      .small-number {
        font-size: px2rem(14);
      }

      margin-bottom: px2rem(10);

    }

    .financing-li {
      position: relative;
      display: flex;
      font-size: px2rem(14);
      padding: px2rem(15) 0;
      border-bottom: 1px solid #ccc;
      height: px2rem(28);
      line-height: px2rem(28);
      color: #333;

      .li-yuan {
        position: absolute;
        left: 0;
        font-size: px2rem(4);
        color: #4F96FF;
      }

      .li-left {
        position: relative;
        flex: 1;
        padding-left: px2rem(10);
        box-sizing: border-box;
      }

      &:last-child {
        border-bottom: none;
      }

    }

    .small-number2 {
      font-size: px2rem(10);
    }

    margin-bottom: px2rem(10);

  }

  .more {
    background: #fff;
    font-size: px2rem(14);
    padding: px2rem(10) px2rem(10) px2rem(10) px2rem(20);
    box-sizing: border-box;
    display: flex;

    .more-left {
      flex: 1;
    }

    margin-bottom: px2rem(10);

  }

  .foot-text {
    background: #f6f6f6;
    text-align: center;
    padding: px2rem(30) 0;
    color: #2B74FE;

    a {
      color: #2B74FE;

    }
  }

</style>
