<template>
  <section>
    <!--货币基金-->
    <template v-if="proType.PRD_TYPE_ID=='1'">
      <section class="banner">
        <section class="b-top">
          <section class="b-left">
            <p class="b-test">{{productDetail.IS_XIAOYU_BANK==1?productDetail.RATE_DESC:'七日年化收益率'}}</p>
            <section class="b-rate">
              <strong>{{productDetail.RATE}}</strong>
              <span>%</span>
            </section>
          </section>
          <section class="b-right">
            <p class="b-test">赎回到账时间</p>
            <section class="b-rate">
              <strong> T+{{productDetail.PERIOD_ACCOUNT}}</strong>
              <span>天</span>
            </section>
          </section>
        </section>
        <ul class="b-bottom">
          <li class="b-li">{{productDetail.TXT_MIN_AMOUNT}}</li>
          <li class="b-li">累计申购笔数 {{productDetail.BUY_COUNT}}</li>
        </ul>
      </section>
    </template>
    <!--理财产品-->
    <template v-if="proType.PRD_TYPE_ID=='2'">
      <section class="banner">
        <section class="b-top">
          <section class="b-left">
            <p class="b-test">七日年化收益率</p>
            <section class="b-rate">
              <strong>{{productDetail.RATE | rateFormat}}</strong>
              <span>%</span>
            </section>
          </section>
          <section class="b-right">
            <p class="b-test">理财期限</p>
            <section class="b-rate">
              <strong> {{productDetail.PERIOD}} </strong>
              <span>天</span>
            </section>
          </section>
        </section>
        <ul class="b-bottom">
          <li class="b-li">
            <img src="~@/assets/images/icon_dunpai@2x.png" alt="">
            <span>受存款保险保护 ></span>
          </li>
          <li class="b-li">{{productDetail.TXT_MIN_AMOUNT}}</li>
          <li class="b-li">累计申购笔数 {{productDetail.BUY_COUNT}}</li>
        </ul>
      </section>
    </template>
    <!--纯债-->
    <template v-if="proType.PRD_TYPE_ID=='3'">
      <section class="banner">
        <section class="b-top">
          <section class="b-left">
            <p class="b-test">七日年化收益率</p>
            <section class="b-rate">
              <strong>{{productDetail.RATE}}</strong>
              <span>%</span>
            </section>
          </section>
          <section class="b-right">
            <p class="b-test">赎回到账时间</p>
            <section class="b-rate">
              <strong>T+{{productDetail.PERIOD_ACCOUNT?productDetail.PERIOD_ACCOUNT:0}}</strong>
              <span style="font-size: .5rem;">天</span>
            </section>
          </section>
        </section>
        <ul class="b-bottom">
          <li class="b-li">{{productDetail.TXT_MIN_AMOUNT}}</li>
          <li class="b-li">累计申购笔数 {{productDetail.BUY_COUNT}}</li>
        </ul>
      </section>
    </template>
    <!--活期-->
    <template v-if="proType.PRD_TYPE_ID=='4' && proType.DEPOSIT_TYPE_ID=='1'">
      <section class="banner">
        <section class="b-top">
          <section class="b-left">
            <p class="b-test">七日年化收益率</p>
            <section class="b-rate">
              <strong>{{productDetail.RATE}}</strong>
              <span>%</span>
            </section>
          </section>
          <section class="b-right">
            <p class="b-test">赎回到账时间</p>
            <section class="b-rate">
              <strong>T+{{productDetail.PERIOD_ACCOUNT?productDetail.PERIOD_ACCOUNT:0}}</strong>
              <span style="font-size: .5rem;">天</span>
            </section>
          </section>
        </section>
        <ul class="b-bottom">
          <li class="b-li">{{productDetail.TXT_MIN_AMOUNT}}</li>
          <li class="b-li">累计申购笔数 {{productDetail.BUY_COUNT}}</li>
        </ul>
      </section>
    </template>
    <!--智能存款 == 轮播图 todo-->
    <template v-if="proType.PRD_TYPE_ID=='4' && proType.DEPOSIT_TYPE_ID=='2'">
      <section class="banner white">
        <pro-swiper :swiperIndex="swiperIndex" :NAV_List="NAV_List" :productDetail="productDetail"></pro-swiper>
      </section>
    </template>
    <!--结构性-->
    <template v-if="proType.PRD_TYPE_ID=='4' && proType.DEPOSIT_TYPE_ID=='3'">
      <section class="banner">
        <section class="b-top">
          <section class="b-left">
            <p class="b-test">七日年化收益率</p>
            <section class="b-rate">
              <strong>{{productDetail.RATE}}</strong>
              <span>%</span>
            </section>
          </section>
          <section class="b-right">
            <p class="b-test">赎回到账时间</p>
            <section class="b-rate">
              <strong>T+{{productDetail.PERIOD_ACCOUNT?productDetail.PERIOD_ACCOUNT:0}}</strong>
              <span style="font-size: .5rem;">天</span>
            </section>
          </section>
        </section>
        <ul class="b-bottom">
          <li class="b-li">{{productDetail.TXT_MIN_AMOUNT}}</li>
          <li class="b-li">累计申购笔数 {{productDetail.BUY_COUNT}}</li>
        </ul>
      </section>
    </template>
    <!--定期-->
    <template v-if="proType.PRD_TYPE_ID=='4' && proType.DEPOSIT_TYPE_ID=='4'">
      <section class="banner">
        <section class="b-top">
          <section class="b-left">
            <p class="b-test">利率</p>
            <section class="b-rate">
              <strong>{{productDetail.RATE}}</strong>
              <span>%</span>
            </section>
          </section>
          <section class="b-right">
            <p class="b-test">期限</p>
            <section class="b-rate">
              <p>{{productDetail.LOCKUP_PERIOD_TEXT}}</p>
            </section>
          </section>
        </section>
        <ul class="b-bottom">
          <li class="b-li">
            <img src="~@/assets/images/icon_dunpai@2x.png" alt="">
            <span>受存款保险保护 ></span>
          </li>
          <li class="b-li">累计申购笔数 {{productDetail.BUY_COUNT}}</li>
        </ul>
      </section>
    </template>
  </section>
</template>
<script>
  import ProSwiper from './ProSwiper'

  export default {
    name: "ProBanner",
    components: {
      ProSwiper
    },
    props: {
      bgColor: {
        type: String,
        default: 'blue'
      },
      productDetail: {
        type: Object,
        default() {
          return {}
        }
      },
      swiperIndex: {
        type: null,
        default: 0
      },
      NAV_List: {
        type: Array,
        default() {
          return []
        }
      },
      proType: {
        type: Object,
        default() {
          return {
            // 产品类型
            PRD_TYPE_ID: '4',
            DEPOSIT_TYPE_ID: '4'
          }
        }
      }
    },
    created() {
      console.log(this.proType);

    }
  }
</script>
<style scoped lang="scss">
  .banner {
    width: 100%;
    padding: 0 px2rem(20);
    background: #5e8ce7;

    box-sizing: border-box;

    &.white {
      background: #fff;
    }

    .b-top {
      width: 100%;
      height: px2rem(121);
      box-sizing: border-box;
      display: flex;
      padding-top: px2rem(36);
      box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.5);

      .b-left, .b-right {
        flex: 1;
      }


      .b-test {
        color: #fff;
        font-size: px2rem(13);
        opacity: 0.7;
      }

      .b-rate {
        color: #fff;

        strong {
          font-size: px2rem(48);
        }

        span {
          font-size: px2rem(14);
        }

        p {
          margin-top: px2rem(12);
          font-size: px2rem(28);
        }
      }

      .b-right {
        .b-test, .b-rate {
          padding-left: px2rem(20);
        }
      }
    }

    .b-bottom {
      display: flex;
      height: px2rem(43);
      line-height: px2rem(43);

      .b-li {
        position: relative;
        margin-right: px2rem(5);
        padding-right: px2rem(4);
        color: #fff;

        img {
          width: px2rem(13);
        }

        &:after {
          position: absolute;
          content: '';
          right: px2rem(1);
          top: 50%;
          transform: translateY(-50%);
          width: px2rem(1);
          height: px2rem(16);
          box-shadow: 1px 0 0 0 rgba(255, 255, 255, 0.5);
          opacity: 0.7;
        }

        &:last-child:after {
          opacity: 0;
        }
      }
    }
  }
</style>
