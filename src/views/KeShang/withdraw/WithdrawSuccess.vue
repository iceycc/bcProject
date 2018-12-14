<template>
  <div class="app">
    <app-bar title="提现"></app-bar>
    <div class="chattuimg">
      <img src="@/assets/images/Verificationsuccess@2x.png" class="img" alt="">
      <h2>提现成功</h2>
    </div>
    <section class="m-card">
      <p><span>提现金额</span>{{money | formatNum}}</p>
      <p><span>交易流水号</span>{{BESHARP_CASH_SEQ}}</p>
    </section>
    <button class="begain" @click="goNext">完成</button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        money: '',
        num: '',
        BESHARP_CASH_SEQ: '',
      }
    },
    created() {
      let preData = this.$route.query
      this.BESHARP_CASH_SEQ = preData.BESHARP_CASH_SEQ
      this.money = preData.money
    },
    methods: {
      goNext() {
        this.$router.go(-2)
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
    .img {
        width: px2rem(70);
    }
    margin-top: px2rem(70);
    color: #2B74FE;
    text-align: center;
    h2 {
      font-size: px2rem(18);
      margin: px2rem(20) 0;
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
    font-size: px2rem(18);
    background: #518BEE;
    border-radius: px2rem(6);
    width: px2rem(255);
    height: px2rem(44);
    color: #fff;
    text-align: center;
    margin: px2rem(30) auto;
  }
</style>
