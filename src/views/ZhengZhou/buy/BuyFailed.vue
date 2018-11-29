<template>
  <div class="app">
    <app-bar title="购买"></app-bar>
    <div class="chattuimg">
      <img src="@/assets/images/buyfail@2x.png" style="width:25%" alt="">
    </div>
    <div class="fenxiangcontent">
      <h2>很抱歉，购买失败!</h2>
      <p style="margin-top:0.6rem; color:#F22C17;">{{errMsg}}</p>
    </div>
    <div class="btn">
      <span @click="goMyAssets" class="begain">查看我的资产</span>
      <span @click="goBuyOther" class="begain">购买其它产品</span>
    </div>
  </div>
</template>
<script>
  import {PageName } from "@/Constant";
  import {WatchApi} from "@/service";
  // import util from "libs/util";


  export default {
    created() {
      this.errMsg = this.$route.query.err || '系统繁忙，请稍后再试'
    },
    data() {
      return {
        errMsg: ''
      }
    },
    methods: {
      goMyAssets(){
        this.$router.push({name:PageName.FinancialProducts})
      },
      goBuyOther(){
        this.$router.push({name:PageName.ProductList})
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
    margin-top: 2rem;
    text-align: center;
  }

  .fenxiangcontent {
    text-align: center;
    padding: 0 .4rem;
    font-size: 0.4rem;
    color: #333;
    margin-top: 1rem;
  }

  .btn{
    margin-top: px2rem(60);
    text-align: center;
    .begain {
      margin: 0 px2rem(5);
      display: inline-block;
      color: #fff;
      background: #508CEE;
      border-radius: px2rem(6);
      font-size: px2rem(18);
      width: px2rem(160);
      height: px2rem(44);
      line-height: px2rem(44);
      text-align: center;
      border: 0px;
      outline: none;
    }
  }


</style>
