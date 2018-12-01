<template>
  <div class="app">
    <app-bar title="购买"></app-bar>
    <div class="chattuimg">
      <img src="@/assets/images/buyfail@2x.png" alt="">
    </div>
    <div class="fenxiangcontent">
      <h2>很抱歉，购买失败!</h2>
      <div>
        <img src="@/assets/images/error_tips.png" alt="">
        <span>{{errMsg}}</span>
      </div>
      
    </div>
    <div class="btn">
      <span @click="goMyAssets" class="begain">重新购买</span>
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
    margin-top: 1rem;
    text-align: center;
    img {
      width: px2rem(70);
      height: px2rem(70);
    }
  }

  .fenxiangcontent {
    text-align: center;
    padding: 0 .4rem;
    font-size: 0.4rem;
    color: #333;
    margin-top: .6rem;
    div {
      display: flex;
      align-items: center;
      padding: 0 px2rem(50);
    }
    h2 {
      padding-bottom: .6rem;
    }
    span {
      color: #F22C17;
      font-size: px2rem(13);
      padding-left: px2rem(6);
    }
    img {
      width: px2rem(16);
      height: px2rem(16);
    }
  }

  .btn{
    margin-top: px2rem(40);
    text-align: center;
    .begain {
      margin: 0 px2rem(5);
      display: inline-block;
      color: #fff;
      background: #508CEE;
      border-radius: px2rem(6);
      font-size: px2rem(18);
      width: px2rem(255);
      height: px2rem(44);
      line-height: px2rem(44);
      text-align: center;
      border: 0px;
      outline: none;
    }
  }


</style>
