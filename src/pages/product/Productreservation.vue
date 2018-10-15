<template>
    <div id="app">
        <div class="wrap">
            <app-bar :title="title"></app-bar>
            <div class="banner">
                <div class="bannercontent">
                    <div class="bannertop">
                        <div class="bannertopleft">
                            <p class="p-text" style="font-size: 0.4rem;">预期年化收益率</p>
                            <p>
                                <strong style="font-size: 1rem"> {{productDetail.RATE}} </strong>
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

                            <li class="bannerbottomfirst clearfix" v-if="productDetail.RISK_LEVEL == 1 || productDetail.RISK_LEVEL == '-1'">低风险
                            </li>
                            <li class="bannerbottomfirst clearfix" v-if="productDetail.RISK_LEVEL == 2">中低风险</li>
                            <li class="bannerbottomfirst clearfix" v-if="productDetail.RISK_LEVEL == 3">中风险</li>
                            <li class="bannerbottomfirst clearfix" v-if="productDetail.RISK_LEVEL == 4">中高风险</li>
                            <li class="bannerbottomfirst clearfix" v-if="productDetail.RISK_LEVEL == 5">高风险</li>
                            <li class="bannerbottomtwo clearfix">{{productDetail.TXT_MIN_AMOUNT}}起购</li>
                            <li class="bannerbottomthree clearfix">累计购买笔数 {{productDetail.OPENAPI_BUY_COUNT}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="calculation">
                <div class="calculation-1">
                    <label for="input-1">我要投资(元)</label>
                    <input type="number" id="input-1" v-model="invest" ref="content" @keyup="getInterest(invest,productDetail.RATE,productDetail.PERIOD)" @keydown="handleInput2">

                    <!--  -->

                    <img src="../../assets/images/p-invest@2x.png" @click="getFocus">
                </div>
                <div class="calculation-2">
                    <label>参考收益(元)</label>
                    <span>{{this.interest}}</span>
                    <!--                     <input type="type" id="input-2" v-model="interest" >
 -->
                    <p>参考收益根据当前产品公开市场披露信息进行推算</p>
                </div>
            </div>
            <div class="contenttop">
                <p>交易规则</p>
                <div class="bannercontent">
                    <span class="bannercontenttitle">审核方式</span>
                    <span class="bannercontenttitlecontent">{{productDetail.IS_INTERVIEW | IS_INTERVIEW_filter}}</span>
                </div>
                <div class="bannercontent">
                    <span class="bannercontenttitle">起购金额</span>
                    <span class="bannercontenttitlecontent">{{productDetail.TXT_MIN_AMOUNT }}</span>
                </div>
                <div class="bannercontent">
                    <span class="bannercontenttitle">递增金额</span>
                    <span class="bannercontenttitlecontent">{{productDetail.INCRE_AMOUNT}} 元</span>
                </div>
                <div class="bannercontent">
                    <span class="bannercontenttitle">剩余额度</span>
                    <span class="bannercontenttitlecontent">{{productDetail.REMAIN_AMT | formatNum}} 元</span>
                </div>
            </div>
            <div class="wrapicon">
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
            <div class="contentmain contenttop">
                <div class="contentmaintop">
                    直销银行说明
                </div>
                <div class="contentmainbank" style="margin-top:0.5rem;">
                    <div style="display: inline-block;width:25%">
                        <img :src="imgurl + productDetail.LOGO_URL" style="width:90%" alt="">
                    </div>
                    <div style="float:right;width:65%">
                        <p style="font-size:0.5rem;">{{productDetail.ORG_NAME}}</p>
                        <p style="font-size:0.4rem; color:#999999 ">隶属于 {{productDetail.ORG_NAME}} </p>
                        <div style="font-size: 0;padding: 3px 0">
                            <img class="start" v-for="i in productDetail.ORG_LEVEL" src="../../assets/images/account_icon_star1.png" alt="">
                            <img class="start" v-for="i in (5 - productDetail.ORG_LEVEL)" src="../../assets/images/account_icon_star.png" alt="">
                        </div>
                        <p style="font-size:0.4rem;color:#999999">比财评级依据产品属性和银行运营情况综合评定</p>
                    </div>
                </div>
            </div>
            <div class="contentbottom contenttop">
                <div>
                    <p style="width: 100%;height: 1rem; padding-bottom: 0.2rem;border-bottom: 1px solid #DCDCDC; padding-top: 0.2rem;">
                        产品描述</p>
                    <div style="font-size: 0.4rem;padding-top:.5rem;color:#666" v-html="productDetail.DEPICT">
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
                                <img src="../../assets/images/platform@2x.png" alt="">
                            </div>
                            <p>专业平台</p>
                        </li>
                        <li class="contentbottom2contentleft">
                            <div>
                                <img src="../../assets/images/account_bottom_label2@2x.png" alt="">
                            </div>
                            <p>银行直签</p>
                        </li>
                        <li class="contentbottom2contentleft">
                            <div>
                                <img src="../../assets/images/account_bottom_label3@2x.png" alt="">
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
import { API,WatchApi } from "../../service/api";
import Bus from "../../plugin/bus";
import { PageName, imgSrc, LsName, BusName } from "../../Constant";
import util from "../../common/utils/util";

// import {Index} from '../../common/utils/mixin'

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
      invest: "",
      interest: "0" ? "0" : "0"
    };
  },
  activated() {},
  created() {
    this.title = this.$route.query.title;
    this.proID = this.$route.query.id;
    this.getData(this.proID);
  },
  filters: {
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
  mounted() {},

  methods: {
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

    handleInput2(e) {
      // 通过正则过滤小数点后两位
      if (e.target.value == "") {
        this.interest = "0";
      }
      e.target.value = e.target.value.match(/^\d*(\.?\d{0,1})/g)[0] || null;
    },
    getInterest(cash, profit, day) {
      let e = cash * profit / 100 * day / 360;
      let a = cash * profit / 100 * day / 360;
      a = a + "";
      let b = a.indexOf(".");
      if (b != -1) {
        let c = a.substring(b + 1, a.length);
        if (c.length > 3) {
          this.interest =
            "￥" +  util.formatNum( ""+(this.numFilter(e)) )  + "~" + "￥" + util.formatNum( ""+(this.numFilter1(e)) );
        } else {
          this.interest = "￥" + util.formatNum( ""+(this.numFilter(e)));
        }
      } else {
        this.interest = "￥" +util.formatNum( ""+ e);
      }
    },
    getFocus() {
      this.invest = "";
      this.interest = "￥0";
      this.$refs.content.focus();
    },
    getData(id) {
      let data = {
        ID: id + ""
      };
      API.product.apiGetChannelPrdInfo(data, res => {
        this.productDetail = res;
        // 判断起购金额是否大于默认金额
        let str = this.productDetail.TXT_MIN_AMOUNT;
        let invest = str.substring(0, str.length - 1);
        util.storage.session.set(LsName.PRD_TYPE, this.productDetail.PRD_TYPE);
        if(this.productDetail.PRD_TYPE==2){
             if (invest > 3000) {
                this.invest = invest;
                this.getInterest(
                    invest,
                    this.productDetail.RATE,
                    this.productDetail.PERIOD
                );
                } else {
                this.invest = "3000";
                this.getInterest(
                    "3000",
                    this.productDetail.RATE,
                    this.productDetail.PERIOD
                );
            }     
        }else{
            if (invest > 1000) {
                this.invest = invest;
                this.getInterest(
                    invest,
                    this.productDetail.RATE,
                    this.productDetail.PERIOD
                );
                } else {
                this.invest = "1000";
                this.getInterest(
                    "1000",
                    this.productDetail.RATE,
                    this.productDetail.PERIOD
                );
            }
        }

        this.type = res.IS_ENABLED;
        this.btnType = this.type == 1 ? "安全购买" : "预约下期";
      });
    },
    goNext(type) {
      util.storage.session.remove(LsName.ProDuctData);
      let target = this.$route.fullPath;
      // todo 判断登录
      //
      let data = {
        // 跳转购买需要的参数
        PRD_NAME: this.productDetail.PRD_NAME,
        TXT_MIN_AMOUNT: this.productDetail.TXT_MIN_AMOUNT,
        REMAIN_AMT: this.productDetail.REMAIN_AMT,
        INCRE_AMOUNT: this.productDetail.INCRE_AMOUNT,
        ORG_NAME: this.productDetail.ORG_NAME
      };
      if (type == 1) {
        // 去安全购买
          WatchApi.watch.watchApi({
          FUNCTION_ID: "ptb0A002",
          REMARK_DATA: "异业合作-产品详情页-购买-安全购买", // 中文备注
          FROM_ID: this.proID // 产品ID、机构ID
        });
        let sign = util.storage.session.get(LsName.token);
        // 购买参数
        let goBuyData = {
          id: this.proID,
          logo: this.productDetail.LOGO_URL,
          ...data
        };
        util.storage.session.set(LsName.goBuy, goBuyData); // 跳转购买的参数
        util.storage.session.set(LsName.loginType, "安全购买"); //
        let HAS_GRADE = util.storage.session.get(LsName.HAS_GRADE) || 0;
        if (HAS_GRADE == 1) {
          // 未评估
          Bus.$emit(BusName.showToast, "请先进行评估");
          this.$router.push({
            name: PageName.Verificationsuccess
          });
        } else {
          // 其他的话  正常
          this.$router.push({
            name: PageName.Buying,
            query: goBuyData
          });
        }
      } else {
        // 预约 得先登录
          WatchApi.watch.watchApi({
          FUNCTION_ID: "ptb0A002",
          REMARK_DATA: "异业合作-产品详情页-购买-预约下期", // 中文备注
          FROM_ID: this.proID // 产品ID、机构ID
        });
        let data = {
          PRD_TYPE: "2",
          PRD_NUMBER: this.productDetail.ID + ""
        };
        let sign = util.storage.session.get(LsName.token);
        if (sign) {
          // 正常
          API.product.apiSaveSubscribeInfo(
            data,
            res => {
              this.$router.push({
                name: PageName.OrderNextSuccess,
                query: {
                  PRD_NAME: this.productDetail.PRD_NAME
                }
              });
            },
            err => {
              console.log(err);
            }
          );
        } else {
          // 未登录
          Bus.$emit(BusName.showToast, "您还未登录，请先登录");
          // 预约或者参数
          util.storage.session.set(
            LsName.ProDuctData,
            Object.assign(data, { PRD_NAME: this.productDetail.PRD_NAME })
          );
          util.storage.session.set(LsName.loginType, "预约下期");
          setTimeout(() => {
            this.$router.push({
              name: PageName.login,
              query: {
                target
              }
            });
          }, 500);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
    @import "../../assets/px2rem";

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
        border-bottom: 1px solid rgba(255,255,255,.5);
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
        margin-top: 0.2rem;
        width: 97%;
        height: 20%;
    }

    .banner .bannercontent .bannerbottom ul {
        width: 100%;
        height: 100%;
        color: #fff;
    }

    .banner .bannercontent .bannerbottom ul li {
        text-align: center;
        line-height: 1rem;
        font-size: 0.3rem;
        float: left;
        height: 100%;
    }

    .banner .bannercontent .bannerbottom .bannerbottomfirst {
        background-image: url(../../assets/images/icon@2x.png);
        background-repeat: no-repeat;
        background-position: 0.1rem;
        background-size: 0.5rem;
        width: 30%;
        border-right: 1px solid rgba(255,255,255,.5);
    }

    .banner .bannercontent .bannerbottom .bannerbottomtwo {
        width: 30%;
        border-right: 1px solid rgba(255,255,255,.5);
    }

    .banner .bannercontent .bannerbottom .bannerbottomthree {
        width: 39%;
    }

    .contenttop {
        padding: 0.5rem 0.5rem;
        color: black;
    }

    .contenttop p {
        font-size: 0.6rem;
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
    }

    .contentmain {
        border-top: 0.3rem solid #f9fbff;
        border-bottom: 0.3rem solid #f9fbff;
        overflow: hidden;
    }

    .contentmain .contentmaintop {
        font-size: 0.6rem;
        width: 100%;
        height: 1rem;
        border-bottom: 1px solid #efefef; padding-bottom: .2rem;
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
        background-image: url(../../assets/images/logo@2x.png);
        background-repeat: no-repeat;
        background-position: 0.3rem 0.05rem;
        background-size: 0.5rem 0.5rem;
        height: 1rem;
        width: 30%;
        float: left;
        padding-left: 1rem;
        padding-top: 0.1rem;
        font-size: 0.3rem;
        color:#A0B2CF;
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
        color:#666666;
    }

    .baozhang {
        text-align: center;
        font-size: 0.4rem;
        background-image: url(../../assets/images/icon_dunpai@2x.png);
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

    .wrapicon {
        position: relative;
        margin: 0.8rem auto 1.2rem;
        display: flex;
        width: px2rem(335);
        justify-content: space-between;
        color: #666;


    }

    .wrapicon:before {
        position: absolute;
        top: 50%;
        left: 0;
        content: '';
        display: block;
        width: 100%;
        height: px2rem(2);
        background: #2B74FE;;
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

    .circle strong {
        position: absolute;
        left: -0.3rem;
        top: -0.8rem;
        font-size: 0.4rem;

    }

    .start {
        width: px2rem(12);
        height: px2rem(12);
    }
    .p-text{ color:rgba(255,255,255,0.7);}
    .calculation{ 
        label{font-size: px2rem(14); color:#333; line-height: px2rem(50);}

        background:#fff;
        padding:0 px2rem(20) px2rem(12);
        margin-bottom: px2rem(9);
        border-bottom:  px2rem(9) solid #f9fbff;

        input{ display:inline-block; width:50%; float: right; padding-top:px2rem(18); color:#FF9200; font-size: px2rem(14); text-align: right;}
        
        .calculation-1{
            height:px2rem(50);border-bottom:px2rem(1) solid rgba(220,220,220,0.50);
            padding-right: 19px;
            position: relative;
            img{ width:px2rem(14);height:px2rem(14); position:absolute; right:0; top: px2rem(20);}
        }
        .calculation-2{
            span{ text-align: right;color:#FF9200; font-size: px2rem(14); float:right; line-height: px2rem(50);}
            p{ color:#B3B3B3; font-size:px2rem(12); line-height:px2rem(17); }
        }

    }
    .p-color{ background:#f9fbff; padding-bottom:px2rem(25); padding-top:px2rem(.5);}
    .p-icon{ width:22px; height:22px; background:url("../../assets/images/p-safe@2x.png") no-repeat 0 0; background-size: 100%; position:relative; top:px2rem(6); margin-right: px2rem(4)}
</style>

