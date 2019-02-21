<template>
  <div class="m-swiper">
    <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
      <!-- slides -->
      <swiper-slide v-for="item,index in NAV_List" :key="index">
        <div class="card">
          <div class="top"><img src="~@/assets/images/production/rili.png"
                                alt=""><span>{{item.PERIOD}}</span></div>
          <section class="center">{{item.RATE | rateFormat}}%</section>

        </div>
      </swiper-slide>

    </swiper>
    <div class="m-bannerbottom">
      <span>累计购买笔数 {{productDetail.BUY_COUNT}}</span>
    </div>
  </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'

  export default {
    name: "ProSwiper",
    data() {
      return {
        swiperOption: {
          slidesPerView: "auto",
          centeredSlides: !0,
          watchSlidesProgress: !0,
          pagination: ".swiper-pagination",
          paginationClickable: !0,
          // onProgress: function (a) {
          //   var b, c, d;
          //   for (b = 0; b < a.slides.length; b++) c = a.slides[b], d = c.progress, scale = 1 - Math.min(Math.abs(.2 * d), 1), es = c.style, es.opacity = 1 - Math.min(Math.abs(d / 2), 1), es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = "translate3d(0px,0," + -Math.abs(150 * d) + "px)"
          // },
          // onSetTransition: function (a, b) {
          //   for (var c = 0; c < a.slides.length; c++) es = a.slides[c].style, es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = b + "ms"
          // }
        },
      }
    },
    props: {
      NAV_List: {
        type: Array,
        default() {
          return []
        }
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
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },
    },
    watch: {
      swiperIndex(n) {
        setTimeout(() => {
          this.swiper.slideTo(n + 1, 1000, false)
        }, 100)
      }
    },
    components: {
      swiper,
      swiperSlide,
    },
    methods: {
      callback() {
      }
    }
  }
</script>

<style scoped lang="scss">
  .m-swiper {
    .m-bannerbottom {
      text-align: center;
      font-size: px2rem(13);
      color: #508CEE;
    }

    .swiper-container {
      width: 100%;
      perspective: 1200px
    }

    .swiper-slide {
      width: 80%;
      transform-style: preserve-3d;
      margin: 0 auto;
      height: px2rem(170);
      background: url("~@/assets/images/production/Bankcopy@2x.png") no-repeat center center;
      background-size: contain;
    }

    .swiper-slide-next, .swiper-slide-prev {
      width: 70%;
    }

    .card {
      width: 100%;
      margin: 0 auto;
      display: block;
      box-sizing: border-box;
      padding: px2rem(30) px2rem(30) 0;
      color: #fff;

      .center {
        font-size: px2rem(51);
        height: px2rem(51);
        text-align: center;
      }

      .m-bottom {
        display: flex;
        padding-top: px2rem(15);
        height: px2rem(30);
        font-size: px2rem(11);
        text-align: center;

        span {
          flex: 1;

        }
      }

      .top {
        vertical-align: top;
        font-size: 0;

        span {
          padding-left: px2rem(10);
          font-size: px2rem(15);
          line-height: px2rem(15);
        }

        img {
          display: inline-block;
          width: px2rem(17);
        }
      }

    }
  }
</style>
