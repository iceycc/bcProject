<template>
  <div class="main">
    <app-bar :title="title" class="app-bar"></app-bar>
    <!--产品详情-->
    <section class="banner">
      <section class="b-top">

      </section>
      <section class="b-bottom">

      </section>
    </section>
    <section class="content">
      <!--产品详情-->
      <p class="title">产品详情</p>
      <ul class="pro-detail">
        <li class="pro-li"><span class="left">起存金额</span><span>1000元</span></li>
        <li class="pro-li"><span class="left">递增金额</span><span>1000元</span></li>
        <li class="pro-li"><span class="left">支取时间</span><span>1000元</span></li>
        <li class="pro-li"><span class="left">产品类型</span><span>1000元</span></li>
        <li class="pro-li"><span class="left">锁定期</span><span>1000元</span></li>

      </ul>
      <!--交易步骤-->
      <p class="title">交易步骤</p>
      <section class="pay-step">
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
      </section>
      <!--直销银行说明-->
      <p class="title">直销银行说明</p>
      <section class="bank-detail">

      </section>
    </section>
  </div>
</template>
<script>
  import API from "@/service";
  import {PageName, imgSrc, LsName, BusName} from "@/Constant";
  import util from "@/libs/util";
  import Mixins from "@/mixins";
  import Register from './commom'
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  // require styles
  import 'swiper/dist/css/swiper.css'

  export default {
    data() {
      return {
        NAV_List: [{}, {}],
        swiperOption: {
          slidesPerView: "auto",
          centeredSlides: 0,
          watchSlidesProgress: 0,
          pagination: ".swiper-pagination",
          paginationClickable: 0,
          onProgress: function (a) {
            var b, c, d;
            for (b = 0; b < a.slides.length; b++) c = a.slides[b], d = c.progress, scale = 1 - Math.min(Math.abs(.2 * d), 1), es = c.style, es.opacity = 1 - Math.min(Math.abs(d / 2), 1), es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = "translate3d(0px,0," + -Math.abs(150 * d) + "px)"
          },
          onSetTransition: function (a, b) {
            for (var c = 0; c < a.slides.length; c++) es = a.slides[c].style, es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = b + "ms"
          }
        },
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
    mixins: [Register, Mixins.redirectByFromPage],
    computed: {
      // swiper() {
      //   return this.$refs.mySwiper.swiper
      // },
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
    mounted() {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      // console.log('this is current swiper instance object', this.swiper)
      // this.swiper.slideTo(1, 1000, false)
    },
    components: {
      // swiper,
      // swiperSlide
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
      PRD_TYPE_ID_FILTER(val, type) {
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
            break;
          case 4:
            //  1：活期
            //  2：智能
            //  3：结构性
            //  4：
            if (type == 1) {
              str = '活期存款'
            }
            if (type == 2) {
              str = '智能存款'
            }
            if (type == 3) {
              str = '结构性存款'
            }
            if (type == 4) {
              str = '存款'
            }
            break;
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
      callback() {
      },
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
        // let data = {
        //   ID: '13661',
        //   // RATEID:'394'
        // }
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
          this.NAV_List = res.NAV_List
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
  .main {

  }

  .app-bar {

  }

  .banner {
    width: 100%;
    height: px2rem(165);
    background: #5e8ce7;
    padding: 0 px2rem(20);

    .b-top {
      height: px2rem(121);
    }
  }

  .content {
    .title {
      padding: 0 px2rem(20);
      height: px2rem(39);
      box-shadow: 0 1px 0 0 rgba(220, 220, 220, 0.5);
      line-height: px2rem(39);
      font-size: px2rem(16);
      color: #333;
    }

    .pro-detail {
      padding: 0 px2rem(20);
      color: #666;

      .pro-li {
        height: px2rem(49);
        line-height: px2rem(49);
        box-shadow: 0 1px 0 0 rgba(220, 220, 220, 0.5);
        .left{
          display: inline-block;
          width: px2rem(100);
        }
        &:last-child{
          box-shadow:none
        }
      }
    }

    .pay-step {
      box-sizing: border-box;
      padding-top: px2rem(13);
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
  }


</style>

