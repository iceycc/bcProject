<template>
  <div id="app">
    <div class="wrap">
      <app-bar :title="title"></app-bar>
      <div class="banner">
        <div class="bannercontent">
          <div class="bannertop">
            <div class="bannertopleft">
              <p class="p-text" style="font-size: 0.4rem;">七日年化收益率</p>
              <p>
                <strong style="font-size: 1rem"> {{productDetail.RATE | rateFormat}} </strong>
                <span style="font-size: .5rem;">%</span>
              </p>
            </div>
            <div class="bannertopright">
              <p class="p-text" style="font-size: 0.4rem">理财期限</p>
              <p>
                <strong style="font-size: 1rem"> {{productDetail.PERIOD}} </strong>
                <span style="font-size: .5rem;">天</span>
              </p>
            </div>
          </div>
          <div class="bannerbottom">
            <ul>

              <li class="bannerbottomfirst clearfix">
                <img src="@/assets/images/icon@2x.png" alt="">
                <span>{{productDetail.RISK_LEVEL | RISK_LEVEL_filter}}</span>
              </li>
              <li class="bannerbottomtwo clearfix">{{productDetail.TXT_MIN_AMOUNT}}</li>
              <li class="bannerbottomthree clearfix">累计购买笔数 {{productDetail.BUY_COUNT}}</li>
            </ul>
          </div>
        </div>
      </div>
      <!--<div class="calculation">-->
      <!--<div class="calculation-1">-->
      <!--<span class="label">我要投资(元)</span>-->
      <!--<label class="input" v-show="!canEdit" @click="getFocus">{{investForm}}</label>-->
      <!--<input id="input-1" v-model="invest"-->
      <!--placeholder="0.00"-->
      <!--v-if="canEdit"-->
      <!--@blur="canEdit=false"-->
      <!--v-focus-->
      <!--type="tel"-->
      <!--@change="formatNumHandle(invest)"-->
      <!--&gt;-->

      <!--<img src="@/assets/images/p-invest@2x.png" @click="getFocus">-->
      <!--</div>-->
      <!--<div class="calculation-2">-->
      <!--<label class="label">参考收益(元)</label>-->
      <!--<span>{{this.interest}}</span>-->
      <!--<p>参考收益根据当前产品公开市场披露信息进行推算</p>-->
      <!--</div>-->
      <!--</div>-->
      <div class="contenttop">
        <p>交易规则</p>
        <div class="bannercontent">
          <span class="bannercontenttitle">审核方式</span>
          <span class="bannercontenttitlecontent">{{productDetail.IS_INTERVIEW | IS_INTERVIEW_filter}}</span>
        </div>
        <div class="bannercontent">
          <span class="bannercontenttitle">起购金额</span>
          <!--<span class="bannercontenttitlecontent">{{productDetail.TXT_MIN_AMOUNT | TXT_MIN_AMOUNT_Filter | formatNum}}元</span>-->
          <span class="bannercontenttitlecontent">{{productDetail.TXT_MIN_AMOUNT}}</span>
        </div>
        <div class="bannercontent">
          <span class="bannercontenttitle">递增金额</span>
          <span class="bannercontenttitlecontent">{{productDetail.INCRE_AMOUNT}} 元</span>
        </div>
        <div class="bannercontent">
          <span class="bannercontenttitle">剩余额度</span>
          <span class="bannercontenttitlecontent">{{productDetail.REMAIN_AMT | formatNum}} 元</span>
        </div>
        <div class="progress_bar">
          <div class="circle left">
            <span>{{productDetail.COLLECT_START_DATE}}</span>
            <strong>募集开始</strong>
          </div>
          <div class="circle">
            <span>{{productDetail.COLLECT_END_DATE}}</span>
            <strong>募集结束</strong>
          </div>
          <div class="circle">
            <span>{{productDetail.VALUE_DATE}}</span>
            <strong>起息日</strong>
          </div>
          <div class="circle right">
            <span>{{productDetail.FIN_END_DATE}}</span>
            <strong>到期</strong>
          </div>
        </div>
      </div>
      <div class="wrapicon">
        <p>交易步骤</p>
        <div class="line">
          <img class="number" src="@/assets/images/1copy13@2x.png" alt="">
          <img class="arrow" src="@/assets/images/arowcopy13.png" alt="">
          <img class="number" src="@/assets/images/2copy13@2x.png" alt="">
          <img class="arrow" src="@/assets/images/arowcopy13.png" alt="">
          <img class="number" src="@/assets/images/3copy13@2x.png" alt="">
          <img class="arrow" src="@/assets/images/arowcopy13.png" alt="">
          <img class="number" src="@/assets/images/4copy13@2x.png" alt="">
        </div>
        <div class="text">
          <span>点击安全购买</span>
          <span>直销银行开户</span>
          <span>直销银行购买</span>
          <span>购买完成</span>
        </div>
      </div>
      <div class="contentmain contenttop">
        <div class="contentmaintop">
          直销银行说明
        </div>
        <div class="contentmainbank" style="margin-top:0.5rem;">
          <div style="display: inline-block;float: left;width: 25%">
            <img :src="imgurl + productDetail.LOGO_URL" style="width:90%" alt="">
          </div>
          <div class="bank-info">
            <p class="info-1">{{productDetail.ORG_NAME}}</p>
            <p class="info-2">隶属于 {{productDetail.ORG_DES}} </p>
            <!--<div class="info-3">-->
            <!--<img class="start" v-for="i in productDetail.ORG_LEVEL"-->
            <!--src="@/assets/images/account_icon_star1.png" alt="">-->
            <!--<img class="start" v-for="i in (5 - productDetail.ORG_LEVEL)"-->
            <!--src="@/assets/images/account_icon_star.png" alt="">-->
            <!--</div>-->
            <!--<p class="info-4">比财评级依据产品属性和银行运营情况综合评定</p>-->
          </div>
        </div>
      </div>
      <div class="contentbottom contenttop">
        <div>
          <p
            style="width: 100%;height: 1rem; padding-bottom: 0.2rem;border-bottom: 1px solid #DCDCDC; padding-top: 0.2rem;">
            产品描述</p>
          <div style="font-size: 0.4rem;padding-top:.5rem;color:#666" v-html="DEPICT">
          </div>
        </div>
      </div>
      <div class="p-color">
        <div class="contentbottom2 contenttop">
          <ul style="position: relative;">
            <li class="contentbottom2left"></li>
            <li class="contentbottom2main">比财数据科技</li>
            <li class="contentbottom2right"></li>
          </ul>
          <ul class="contentbottom2content contenttop" style="height:.5rem;">
            <li class="contentbottom2contentleft">
              <div>
                <img src="@/assets/images/platform@2x.png" alt="">
              </div>
              <p>专业平台</p>
            </li>
            <li class="contentbottom2contentleft">
              <div>
                <img src="@/assets/images/account_bottom_label2@2x.png" alt="">
              </div>
              <p>银行直签</p>
            </li>
            <li class="contentbottom2contentleft">
              <div>
                <img src="@/assets/images/account_bottom_label3@2x.png" alt="">
              </div>
              <p>安全保障</p>
            </li>
          </ul>
        </div>
        <div class="baozhang">
          <p>账户资金安全由存管银行保障</p>
        </div>
      </div>
    </div>
    <div class="buttonbottom" @click="goNext(type)">
      <span class="p-icon"></span>{{btnType}}
    </div>
  </div>
</template>
<script>
  import API from "@/service";
  import Bus from "@/plugin/bus";
  import {PageName, imgSrc, LsName, BusName} from "@/Constant";
  import util from "libs/util";
  import Mixins from "@/mixins";
  import Register from './commom'

  export default {
    data() {
      return {
        productDetail: {
          RATE: "",
          PERIOD: "",
          RISK_LEVEL: "",
          TXT_MIN_AMOUNT: "",
          OPENAPI_BUY_COUNT: "",
          IS_INTERVIEW: "",
          DEPICT: "",
          ORG_LEVEL: "",
          COLLECT_START_DATE: "",
          COLLECT_END_DATE: "",
          VALUE_DATE: "",
          FIN_END_DATE: ""
        },
        btnType: "安全购买",
        proID: "",
        type: "1",
        imgurl: imgSrc,
        xing: 5,
        title: "",
        PRD_TYPE: "",
        canEdit: false,

        defaultManey: '',
        currentVal: '',
        invest: "", // 计算传人
        IS_REALTIME_DATA_PRD: ''
      };
    },
    mixins: [Register, Mixins.HandleMixin, Mixins.UtilMixin],
    computed: {
      investForm() {
        return '¥' + util.formatNum(this.invest + '')
      },
      interest() {
        return this.getInterest(
          this.invest,
          this.productDetail.RATE,
          this.productDetail.PERIOD
        );

      }
    },

    created() {
      this.title = this.$route.query.title;
      this.proID = this.$route.query.PRO_ID;
      this.getData(this.proID);
    },
    directives: {
      focus: { // 自定义事件
        inserted(el) {
          el.focus()
        }
      }
    },
    filters: {
      RISK_LEVEL_filter(val) {
        let str = ''
        switch (val - 0) {
          case -1:
          case 1:
            str = '低风险'
            break;
          case 2:
            str = '中低风险'
            break
          case 3:
            str = '中风险'
            break
          case 4:
            str = '中高风险'
            break
          case 5:
            str = '高风险'
            break
        }
         return str
      },
      PRD_TYPE_ID_FILTER(val) {
        let str = '产品类型';
        switch (val - 0) {
          case 1:
            str = '货币基金'
            break;
          case 2:
            str = '理财'
            break;
          case 3:
            str = '纯债'
        }
        return str
      },
      TXT_MIN_AMOUNT_Filter(val) {
        let str = val.toString()
        return str.substring(0, str.length - 1)
      },
      IS_INTERVIEW_filter(val) {
        // if(!val) return val
        let msg = "";
        if (val == 0) {
          return (msg = "首次购买无需面签");
        }

        if (val == 1) {
          return (msg = "首次购买无需面签");
        }

        if (val == 2) {
          return (msg = "首次购买无需面签");
        }
        return (msg = "首次购买无需面签");
      }
    },
    beforeRouteEnter(to, from, next) {
      next();
    },
    beforeRouteLeave(to, from, next) {
      next();
    },
    methods: {
      formatNumHandle(cash) {
        this.canEdit = false
        if (!(cash - 0) || !cash) {
          cash = this.defaultManey + ''
          this.invest = this.defaultManey
        }
        this.currentVal = ''
      },
      // 保留小数点后两位的过滤器，尾数不四舍五入
      numFilter(value) {
        // 截取当前数据到小数点后三位

        let transformVal = Number(value).toFixed(3);

        let realVal = transformVal.substring(0, transformVal.length - 1); // num.toFixed(3)获取的是字符串

        return Number(realVal);
      },

      // 例如:小数是：10.521  处理之后结果应该是10.53
      numFilter1(n) {
        var num = n;

        var bb = num + "";
        var dian = bb.indexOf(".");
        var result = "";
        if (dian == -1) {
          result = this.numFilter(num);
        } else {
          var cc = bb.substring(dian + 1, bb.length);
          if (cc.length >= 3) {
            result = (this.numFilter(num) + 0.01) * 100000000000 / 100000000000; //js小数计算小数点后显示多位小数
            result = this.numFilter(result);
          } else {
            result = this.numFilter(num);
          }
        }
        return result;
      },
      /**
       * 计算收益率
       */
      getInterest(cash, profit, day) {
        let interest;
        cash = cash + ''
        this.invest = cash
        if (cash == '') cash = 0
        if (!util.isValueNumber(cash - 0)) {
          this.invest = this.currentVal
          cash = this.currentVal
        } else {
          this.currentVal = cash
        }
        let e = cash * profit / 100 * day / 360;
        let a = cash * profit / 100 * day / 360;
        a = a + "";
        let b = a.indexOf(".");
        if (b != -1) {
          let c = a.substring(b + 1, a.length);
          if (c.length > 3) {

            if (this.PRD_TYPE == 4) {
              interest =
                "￥" + util.formatNum("" + (this.numFilter(e))) + "~" + "￥" + util.formatNum("" + (this.numFilter1(e)));
            } else {
              interest =
                "￥" + util.formatNum("" + (this.numFilter(e)));
            }

          } else {
            interest = "￥" + util.formatNum("" + (this.numFilter(e)));
          }
        } else {
          interest = "￥" + util.formatNum("" + e);
        }
        return interest
      },
      /**
       * 切换样式
       */
      getFocus() {
        this.canEdit = !this.canEdit
      },

      getData(id) {
        let data = {
          ID: id + ""
        };
        // API.commonApi.apiGetChannelPrdInfo(data, res => {
        API.bicai.getPrdInfo(data, res => {
          this.setProType(data)
          this.productDetail = res;
          this.productDetail.ORG_LEVEL = Math.floor(this.productDetail.ORG_LEVEL)
          this.title = res.PRD_NAME
          // 判断起购金额是否大于默认金额
          let str = this.productDetail.TXT_MIN_AMOUNT;
          let invest = str.substring(0, str.length - 1);
          this.setComState({type: 'PRD_TYPE', value: this.productDetail.PRD_TYPE})
          // IS_REALTIME_DATA_PRD
          // 1是，走无密码登录带红色提示（亿联）
          // 0否，走无密码的登录页（郑州，众邦
          // todo

          this.IS_REALTIME_DATA_PRD = res.IS_REALTIME_DATA_PRD
          this.setComState({type: 'IS_REALTIME_DATA_PRD', value: ''})
          this.PRD_TYPE = this.productDetail.PRD_TYPE;
          if (this.productDetail.PRD_TYPE == 2) {
            if (invest > '3000') {
              this.defaultManey = invest
              this.invest = invest;

            } else {
              this.defaultManey = '3000'
              this.invest = '3000';

            }
          } else {
            if (invest > 1000) {
              this.defaultManey = invest
              this.invest = invest
            } else {
              this.defaultManey = '1000'
              this.invest = "1000";
            }
          }

          this.type = res.IS_ENABLED;
          this.btnType = this.type == 1 ? "安全购买" : "预约下期";
        });
      },
    }
  };
</script>
<style lang="scss" scoped>
  @import "~@/assets/px2rem";

  html, body {
    width: 100%;
  }

  .header {
    background-color: #fff;
    height: 1.3rem;
    line-height: 1.3rem;
    font-size: 0.4rem;
  }

  .header p {
    text-align: center;
    font-size: 0.5rem;
  }

  .header {
    background-color: #fff;
    height: 1.3rem;
    line-height: 1.3rem;
    font-size: 0.4rem;
    border-bottom: 1px solid #e6e6e6;
  }

  .header p {
    text-align: center;
    font-size: 0.5rem;
  }

  .banner {
    width: 100%;
    box-sizing: border-box;
    height: 5rem;
    background: #508CEE;
  }

  .banner .bannercontent {
    width: 90%;
    height: 85%;
    margin-left: 5%;
    padding-top: 5%;

  }

  .banner .bannercontent .bannertop {
    box-sizing: border-box;
    padding-top: 0.6rem;
    width: 100%;
    height: 75%;
    border-bottom: 1px solid rgba(255, 255, 255, .5);
  }

  .banner .bannercontent .bannertop .bannertopleft {
    display: inline-block;
    width: 50%;
    color: #fff;
  }

  .banner .bannercontent .bannertop .bannertopright {
    display: inline-block;
    width: 48%;
    color: #fff;
    text-align: center;
  }

  .banner .bannercontent .bannerbottom {
    width: 97%;
    height: px2rem(25);

    ul {
      width: 100%;
      height: px2rem(25);
      margin-top: px2rem(10);
      color: #fff;

      li {
        margin-right: px2rem(10);
        text-align: left;
        line-height: px2rem(19);
        font-size: px2rem(12);
        float: left;
        height: px2rem(19);
      }
    }
  }

  .banner .bannercontent .bannerbottom .bannerbottomfirst {
    padding-right: px2rem(20);
    border-right: 1px solid rgba(255, 255, 255, .5);

    img {
      width: px2rem(16);
      height: px2rem(16);
      vertical-align: top;
    }

    span {
      vertical-align: top;
      font-size: px2rem(12);
    }
  }

  .banner .bannercontent .bannerbottom .bannerbottomtwo {
    padding-right: px2rem(20);
    border-right: 1px solid rgba(255, 255, 255, .5);
  }

  .banner .bannercontent .bannerbottom .bannerbottomthree {
    padding-right: px2rem(20);
  }

  .contenttop {
    padding: 0.5rem 0.5rem;
    color: black;
  }

  .contenttop p {
    font-size: px2rem(16);
    margin-top: -.2rem;
  }

  .contenttop .bannercontent {
    width: 100%;
    height: 2rem;
    border-bottom: 1px solid #DCDCDC;
    color: #666;
  }

  .contenttop .bannercontent .bannercontenttitle {
    height: 100%;
    width: 30%;
    font-size: 0.4rem;
    line-height: 2rem;

  }

  .contenttop .bannercontent .bannercontenttitlecontent {
    height: 100%;
    width: 50%;
    font-size: 0.4rem;
    line-height: 2rem;
    vertical-align: middle;
  }

  .contentmain {
    border-top: 0.3rem solid #f9fbff;
    border-bottom: 0.3rem solid #f9fbff;
    overflow: hidden;
  }

  .contentmain .contentmaintop {
    font-size: px2rem(16);
    width: 100%;
    height: 1rem;
    border-bottom: 1px solid #efefef;
    padding-bottom: .2rem;
  }

  .contentmain .contentmaintop .contentmainbank {
    margin-top: 0.5rem;
  }

  .contentbottom2 {
    height: 3rem;
    margin: 0.6rem 0;
  }

  .contentbottom2 .contentbottom2left {
    float: left;
    height: 1px;
    width: 33%;
    background: #efefef;
  }

  .contentbottom2 .contentbottom2main {
    margin-top: -0.3rem;
    background-image: url(~@/assets/images/logo@2x.png);
    background-repeat: no-repeat;
    background-position: 0.3rem 0.05rem;
    background-size: 0.5rem 0.5rem;
    height: 1rem;
    width: 30%;
    float: left;
    padding-left: 1rem;
    padding-top: 0.1rem;
    font-size: 0.3rem;
    color: #A0B2CF;
  }

  .contentbottom2 .contentbottom2right {
    position: absolute;
    right: 0;
    height: 1px;
    width: 33%;
    background: #DCDCDC;
  }

  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .contentbottom2content .contentbottom2contentleft {
    text-align: center;
    float: left;
    display: inline-block;
    width: 33%;
    height: 3rem;
  }

  .contentbottom2content .contentbottom2contentleft img {
    width: 60%;
  }

  .contentbottom2content .contentbottom2contentleft p {
    font-size: 0.4rem;
    padding-top: px2rem(7);
    color: #666666;
  }

  .baozhang {
    text-align: center;
    font-size: 0.4rem;
    background-image: url(~@/assets/images/icon_dunpai@2x.png);
    background-repeat: no-repeat;
    background-size: 0.5rem 0.5rem;
    background-position: 20%;
  }

  .buttonbottom {
    width: 100%;
    height: 1.5rem;
    text-align: center;
    line-height: 1.5rem;
    background: #508CEE;
    color: #fff;
    font-size: 0.4rem;

  }

  .progress_bar {
    position: relative;
    margin: px2rem(50) auto px2rem(10);
    display: flex;
    width: px2rem(335);
    justify-content: space-between;
    color: #666;

    &:before {
      position: absolute;
      top: 50%;
      left: 0;
      content: '';
      display: block;
      width: 100%;
      height: px2rem(2);
      background: #2B74FE;;
    }

    .circle {
      position: relative;
      z-index: 2;
      width: 0.3rem;
      height: 0.3rem;
      border-radius: 50%;
      border: 0.07rem solid #2B74FE;;
      box-sizing: border-box;
      background: radial-gradient(#fff 50%, #fff 50%);
      white-space: nowrap;

      &.left {
        margin-left: px2rem(5);
      }

      &.right {
        margin-right: px2rem(5);
      }
    }

    .circle strong {
      position: absolute;
      left: px2rem(-12);
      top: px2rem(-26);
      font-size: px2rem(12);
    }

    .circle span {
      position: absolute;
      left: px2rem(-30);
      top: 0.5rem;
      font-size: px2rem(13);
    }

    .left span {
      left: px2rem(-15);
    }

    .right span {
      left: px2rem(-45);

    }

  }


  .wrapicon {
    box-sizing: border-box;

    p {
      padding-left: px2rem(20);
      width: 30%;
      height: px2rem(40);
      font-size: px2rem(16);
    }

    .text {
      text-align: center;
      display: flex;
      padding: px2rem(10) px2rem(10) 0;

      span {
        flex: 1;
        font-size: px2rem(13);
        color: #333;
      }
    }

    .line {
      text-align: center;
      line-height: px2rem(20);

      img {
        vertical-align: middle;
      }

      .number {
        width: px2rem(20);
        height: px2rem(20);
      }

      .arrow {
        width: px2rem(66);
      }
    }
  }

  /*.wrapicon:before {*/
  /*position: absolute;*/
  /*top: 50%;*/
  /*left: 0;*/
  /*content: '';*/
  /*display: block;*/
  /*width: 100%;*/
  /*height: px2rem(2);*/
  /*background: #2B74FE;;*/
  /*}*/


  .start {
    width: px2rem(12);
    height: px2rem(12);
  }

  .p-text {
    color: rgba(255, 255, 255, 0.7);
  }

  .calculation {
    .label {
      font-size: px2rem(14);
      color: #333;
      line-height: px2rem(50);
    }

    background: #fff;
    padding: 0 px2rem(20) px2rem(12);
    margin-bottom: px2rem(9);
    border-bottom: px2rem(9) solid #f9fbff;

    .input {
      display: inline-block;
      width: 50%;
      float: right;
      padding-top: px2rem(18);
      color: #FF9200;
      font-size: px2rem(14);
      text-align: right;
    }

    input {
      display: inline-block;
      width: 50%;
      float: right;
      padding-top: px2rem(18);
      color: #FF9200;
      font-size: px2rem(14);
      text-align: right;
    }

    .calculation-1 {
      height: px2rem(50);
      border-bottom: px2rem(1) solid rgba(220, 220, 220, 0.50);
      padding-right: 19px;
      position: relative;

      img {
        width: px2rem(14);
        height: px2rem(14);
        position: absolute;
        right: 0;
        top: px2rem(20);
      }
    }

    .calculation-2 {
      span {
        text-align: right;
        color: #FF9200;
        font-size: px2rem(14);
        float: right;
        line-height: px2rem(50);
      }

      p {
        color: #B3B3B3;
        font-size: px2rem(12);
        line-height: px2rem(17);
      }
    }

  }

  .bank-info {
    float: left;
    padding-left: px2rem(10);
    /*width: 70%;*/
    .info-1 {
      padding-top: px2rem(15);
      font-size: px2rem(16);
    }

    .info-2 {
      padding-top: px2rem(15);
      font-size: px2rem(12);
      color: #999999
    }

    .info-3 {
      font-size: 0;
      padding-bottom: px2rem(10)
    }

    .info-4 {
      line-height: 1.2;
      font-size: 0.4rem;
      color: #999999
    }
  }

  .p-color {
    background: #f9fbff;
    padding-bottom: px2rem(25);
    padding-top: px2rem(.5);
  }

  .p-icon {
    width: 22px;
    height: 22px;
    background: url("~@/assets/images/p-safe@2x.png") no-repeat 0 0;
    background-size: 100%;
    position: relative;
    top: px2rem(6);
    margin-right: px2rem(4)
  }
</style>

