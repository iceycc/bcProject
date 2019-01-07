<template>
  <div class="app">
    <app-bar title="支取"></app-bar>
    <div class="chattuimg">
      <img src="@/assets/images/Verificationsuccess@2x.png" class="img" alt="">
      <h2>恭喜你，支取成功</h2>
    </div>
    <section class="m-card">
      <p><span>支取金额</span><span class="flex1">{{money}}</span></p>
      <p><span>收款账户</span><span class="flex1">{{BANK_USER_CODE}}</span></p>
      <p><span>资金预计到账日期</span><span class="flex1">{{date}}</span></p>
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
        BESHARP_SEQ: '',
        date: '',
        BANK_USER_CODE: ''
      }
    },
    created() {
      let preData = this.getComState.pollResult
      this.BESHARP_SEQ = preData.BESHARP_SEQ
      this.BANK_USER_CODE = preData.BANK_USER_CODE
      this.money = preData.PAY_AMOUT || preData.money
      this.date = preData.OPERA_DATE
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
    font-size: px2rem(16);
    color: #9199A1;
    border-top: 1px solid #eeeef0;
    border-bottom: 1px solid #eeeef0;

    p {
      display: flex;

      /*.width100 {*/
        /*width: px2rem(100);*/
      /*}*/


      .flex1 {
        flex: 1;
        text-align: right;
      }
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
