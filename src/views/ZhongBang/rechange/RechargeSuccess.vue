<template>
  <div class="app">
    <app-bar title="充值"></app-bar>
    <div class="chattuimg">
      <img src="@/assets/images/Verificationsuccess@2x.png" class="img" alt="">
      <h2>充值成功</h2>
    </div>
    <section class="m-card">
      <p><span>充值金额</span>{{data.money}}</p>
      <p><span>交易流水号</span>{{data.BESHARP_RECHARGE_SEQ}}</p>
    </section>
    <!--<div class="fenxiangcontent">成功预约xx产品，请下载比财APP关注下期</div>-->
    <!--<div class="begain">下载比财app</div>-->
    <!--<button class="begain" @click="goBalance">查看余额</button>-->
    <button class="begain" @click="goBank">完成</button>
  </div>
</template>
<script>
  import {LsName} from "@/Constant";
  //
  import Mixins from "@/mixins";
  import util from "libs/util";
  import {PageName} from "../../../Constant";

  export default {
    data() {
      return {
        data: {
          money: '',
          BESHARP_RECHARGE_SEQ: ''
        }
      }
    },
    created() {
      this.data = this.$route.query
    },
    methods: {
      goBank(){
        this.$router.go(-2)
      },
      goBalance() {
        this.$router.push({
          name: PageName.BankBalance
        })
      }

    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/px2rem";

  .app {
    width: 100%;
    margin: 0 auto;
  }

  .chattuimg {
    margin-top: px2rem(80);
    color: #2B74FE;
    text-align: center;
    h2 {
      margin: px2rem(20) 0;
    }
    .img {
      width: px2rem(70);
    }
  }

  .m-card {
    padding: px2rem(20);
    font-size: px2rem(14);
    color: #9199A1;
    border-top: 1px solid #eeeef0;
    border-bottom: 1px solid #eeeef0;
    span {
      display: inline-block;
      width: px2rem(100);
    }
  }

  .fenxiangcontent {
    font-size: 0.4rem;
    color: #F22C17;
    margin-top: 1.5rem;
    padding: 0 0.9rem;
  }

  .begain {
    display: block;
    font-size: px2rem(16);
    background: #518BEE;
    border-radius: px2rem(6);
    width: px2rem(255);
    height: px2rem(44);
    color: #fff;
    text-align: center;
    margin: px2rem(30) auto;
  }
</style>
