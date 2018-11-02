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

  </div>
</template>

<script>
  import Bus from './plugin/bus'
  import {BusName} from './Constant'


  export default {
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        msg: '',
        showToast: false,
        isRouterAlive: true
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
    },
    created() {

      //在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem("store")) {
        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
      }

      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("store", JSON.stringify(this.$store.state))
      })


      // console.log('设备userAgent>>' + navigator.userAgent);
      Bus.$on(BusName.showToast, (val) => {
        console.log(val);
        if(!val) return
        this.showToast = true
        this.msg = val
        setTimeout(() => {
          this.showToast = false
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

      // console.log('设备userAgent>>' + navigator.userAgent);

    }
  }
</script>

<style lang="scss" scoped>
  .toast {

    color: #fff;
    bottom: 0;
    position: fixed;
    width: 100%;
    height: 1.3rem;
    background: rgba(0, 0, 0, 0.9);
    z-index: 9999;
    text-align: center;
    font-size: 0.4rem;
    line-height: 1.3rem;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }


</style>
