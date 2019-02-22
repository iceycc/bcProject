<template>
  <div class="app">
    <app-bar title="提现"></app-bar>
    <com-deal-result>
      <section slot="resImg">
        <img src="@/assets/images/Verificationsuccess@2x.png" class="img" alt="">
      </section>
      <section slot="resMsg">
        <h2 class="msg">{{RES_MSG2}}</h2>
        <section class="m-card">
          <p><span class="r-left">提现金额</span><span class="r-right">{{money | formatNum}}</span></p>
          <p><span class="r-left">交易流水号</span><span class="r-right">{{BESHARP_CASH_SEQ}}</span></p>
        </section>
      </section>
      <section slot="resBtn">
        <button class="begain" @click="goNext">完成</button>
      </section>
    </com-deal-result>
  </div>
</template>
<script>
  import {ComDealResult} from '@/components'

  export default {
    data() {
      return {
        money: '',
        num: '',
        BESHARP_CASH_SEQ: '',
      }
    },
    components: {
      ComDealResult
    },
    created() {
      let preData = this.$route.query
      this.BESHARP_CASH_SEQ = preData.reqSerial
      this.RES_MSG2 = preData.resMsg2
      this.money = preData.amount
    },
    methods: {
      goNext() {
        this.$router.go(-2)
      }
    }
  }
</script>

<style lang="scss" scoped>

  .msg {
    text-align: center;
    color: #508CEE;
  }

  .m-card {
    font-size: px2rem(14);
    color: #9199A1;
    border-top: 1px solid #eeeef0;
    margin-top: px2rem(20);

    p {
      display: flex;
      border-bottom: 1px solid #eeeef0;
      height: px2rem(44);
      line-height: px2rem(44);
      padding: 0 px2rem(20);
    }

    .r-left {
      width: px2rem(100);
    }

    .r-right {
      text-align: right;
      flex: 1;
    }
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
    margin: 0 auto;
  }
</style>
