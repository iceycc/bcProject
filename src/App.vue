<template>
  <div id="app" style="height: 100%">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive && isRouterAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive && isRouterAlive"></router-view>
    <!--自己的提示-->
    <transition name="fade">
      <div class="toast" v-if="showToast">
        <p>{{msg}}</p>
      </div>
    </transition>

    <!--自己的提示-->
    <transition name="fade">
      <div class="msg-toast" v-if="showMsgToast">
        <p>短信已发送至{{TEL}}请注意查收</p>
      </div>
    </transition>
    <!--<transition name="fade">-->
    <div class="banklonding" v-if="banklonding">
      <div class="londingBox">
        <div>
          <img :src="imgSrc+ORG_URL" alt="" class="orgLogo">
          <span class="orgName">{{ORG_NAME}}</span>
        </div>
        <p>正在跳转至{{ORG_NAME}}页面…</p>
      </div>
    </div>
    <!--</transition>-->
  </div>
</template>

<script>
  import Bus from './plugin/bus'
  import {BusName, imgSrc} from './Constant'
  import util from "libs/util";

  export default {
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        imgSrc,
        msg: '',
        showToast: false,
        isRouterAlive: true,
        TEL: '',
        showMsgToast: false,
        banklonding: false,
        ORG_URL: '',
        ORG_NAME: ''
      }
    },

    destroyed() {
      Bus.$off(BusName.showToast)
      Bus.$off(BusName.Indicator);
    },
    methods: {
      reload() {
        console.log('执行reload')
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      },
      getComParams() {
        // let {DEVICE_ID, CHANNEL_ID, APP_FLAG} = this.$store.getters.GET_ACCOUNT_STATE
        //
        // let urlQuery = this.$route
        // console.log('DEVICE_ID',DEVICE_ID);
        // console.log('CHANNEL_ID',CHANNEL_ID);
        // console.log('APP_FLAG',APP_FLAG);
        // console.log('urlQuery',urlQuery);
        // if (!DEVICE_ID) {
        //   let DEVICE_ID = urlQuery.DEVICE_ID || '300100100123'
        //   this.$store.commit('SET_DEVICE_ID', DEVICE_ID)
        // }
        // if (!CHANNEL_ID) {
        //   let CHANNEL_ID = urlQuery.CHANNEL_ID || '1'
        //   this.$store.commit('SET_CHANNEL_ID', CHANNEL_ID)
        // }
        // if (!APP_FLAG) {
        //   let APP_FLAG = urlQuery.APP_FLAG || 'BC'
        //   this.$store.commit('SET_APP_FLAG', APP_FLAG)
        // }
      }
    },
    created() {
      // 在页面加载时读取 sessionStorage 里的状态信息
      if (util.storage.session.get("store")) {
        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(util.storage.session.get("store"))))
      }

      window.addEventListener("beforeunload", () => {
        console.log('beforeunload');
        util.storage.session.set("store", JSON.stringify(this.$store.state))
      })
      // ios
      window.addEventListener("pagehide", () => {
        console.log('pagehide');
        util.storage.session.set("store", JSON.stringify(this.$store.state))
      })
      // console.log('设备userAgent>>' + navigator.userAgent);
      Bus.$on(BusName.showToast, (val, time = 2000) => {
        if (!val) return
        this.showToast = true
        this.msg = val
        setTimeout(() => {
          this.showToast = false
        }, time)
      })
      Bus.$on(BusName.showBankLonding, ({LOGO_URL = '', ORG_NAME = ''}, time = 2000) => {
        // todo
        // return
        if (!LOGO_URL) return
        if (!ORG_NAME) return
        // if(ORG_NAME=='鼎融易'){
        //   ORG_NAME = '郑州银行'
        // }
        this.banklonding = true
        this.ORG_URL = LOGO_URL
        this.ORG_NAME = ORG_NAME
        setTimeout(() => {
          this.banklonding = false
        }, time)
      })
      Bus.$on(BusName.showSendMsg, (val) => {
        console.log(val);
        if (!val) {
          // let BANK_CARD_PHONE = this.getComState.TEL
          let PHONE_NUM = this.getComState.Infos.PHONE_NUM || this.$store.getters.BICAI_USER.PHONE_NUM
          val = PHONE_NUM
        }
        val = val + ''
        if (val.length !== 11) return
        this.showMsgToast = true
        let msg = val.substr(0, 3) + '***' + val.substr(7)
        this.TEL = msg
        setTimeout(() => {
          this.showMsgToast = false
        }, 2000)
      })

      Bus.$on(BusName.Indicator, (val = 'Loading...') => {
        this.Londing.open({
          text: val,
          spinnerType: 'triple-bounce'
        });
        setTimeout(function () {
          this.Londing.close()
        })
      })
      // this.getComParams()
      // console.log('设备userAgent>>' + navigator.userAgent);

    }

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/px2rem";

  .toast {
    color: #fff;
    bottom: 0;
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    padding: px2rem(5);
    background: rgba(0, 0, 0, 0.9);
    z-index: 9999;
    text-align: center;
    font-size: 0.4rem;
  }

  .banklonding {
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    width: 100%;
    height: 100%;
    z-index: 10;
    text-align: center;

    .londingBox {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }

    .orgLogo {
      height: px2rem(36);
      width: px2rem(36);
      margin-right: px2rem(6);
      vertical-align: top;

    }

    .orgName {
      vertical-align: top;
      display: inline-block;
      height: px2rem(36);
      line-height: px2rem(36);
      font-size: px2rem(22);
    }

    p {
      font-size: px2rem(12);
    }
  }

  .msg-toast {
    position: fixed;
    width: px2rem(274);
    height: px2rem(36);
    line-height: px2rem(36);
    border-radius: px2rem(6);
    font-size: px2rem(13);
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: #3a3a3a;
    opacity: 0.9;
    color: #fff;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }


</style>
