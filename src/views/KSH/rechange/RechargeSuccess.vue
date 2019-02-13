<template>
  <div class="app">
    <app-bar title="充值"></app-bar>
    <div class="chattuimg">
      <img src="@/assets/images/Verificationsuccess@2x.png" class="img" alt="">
      <h2>充值成功</h2>
    </div>
    <section class="m-card">
      <p><span>充值金额</span>{{data.money | formatNum}}</p>
      <p><span>交易流水号</span>{{data.BESHARP_RECHARGE_SEQ}}</p>
    </section>
    <!--<div class="fenxiangcontent">成功预约xx产品，请下载比财APP关注下期</div>-->
    <!--<div class="begain">下载比财app</div>-->
    <!--<button class="begain" @click="goBalance">查看余额</button>-->
    <button v-if="ORIGIN_PAGE=='buying'" class="begain" @click="goBuyNext">继续购买</button>
    <button v-if="!ORIGIN_PAGE  " class="begain" @click="goProList">购买产品</button>
    <button v-if="!ORIGIN_PAGE" class="begain write" @click="goBalance">查看余额</button>
  </div>
</template>
<script>
  import {LsName} from "@/Constant";
  //
  import Mixins from "@/mixins";
  import util from "@/libs/util";
  import {PageName} from "../../../Constant";

  export default {
    data() {
      return {
        data: {
          money: '',
          BESHARP_RECHARGE_SEQ: '',
          ORIGIN_PAGE:''
        }
      }
    },
    created() {
      this.data = this.$route.query
      this.ORIGIN_PAGE = this.data.ORIGIN_PAGE
      // this.ORIGIN_PAGE = ''
    },
    methods: {
      goBuyNext(){
        this.$router.go(-2)
      },
      goBank(){
        this.$router.go(-2)
      },
      goProList(){
        this.$router.push({name:PageName.ProductList})
      },
      goBalance() {
        this.$router.push({
          name: PageName.BankDetail
        })
      }

    }
  }
</script>

<style lang="scss" scoped>


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
    &.write{
      border: 1px solid #518BEE;
      background: #fff;
      color: #518BEE;
    }
  }
</style>
