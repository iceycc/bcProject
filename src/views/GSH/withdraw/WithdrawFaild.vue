<template>
  <div class="app">
    <app-bar title="提现"></app-bar>
    <com-deal-result>
      <section slot="resImg">
        <img src="@/assets/images/buyfail@2x.png" alt="">
      </section>
      <section slot="resMsg" class="res-msg">
        <p class="msg1">很抱歉，提现失败!</p>
        <p class="msg2">
          <img src="@/assets/images/error_tips.png" alt="">
          <span>{{errMsg}}</span>
        </p>
      </section>
      <section slot="resBtn">
        <span @click="reWithdraw" class="btn">重新提现</span>
      </section>
    </com-deal-result>
  </div>
</template>
<script>
  import {PageName} from "@/Constant";
  import {ComDealResult} from '@/components'

  export default {
    data() {
      return {
        errMsg: ''
      }
    },
    components: {ComDealResult},
    created() {
      this.errMsg = this.$route.query.err
    },
    methods: {
      reWithdraw() {
        // this.$router.go(-1)
        this.$router.push({name: PageName.BankBalance})
      },
      goBank() {
        this.$router.push({
          name: ''
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .res-msg {
    text-align: center;

    .msg1 {
      font-size: px2rem(18);
      color: #000000;
      margin-bottom: px2rem(20);
    }

    .msg2 {
      color: #F4333C;

      img {
        width: px2rem(14);
        height: px2rem(14);
        vertical-align: middle;
      }

      span {
        font-size: px2rem(12);
        vertical-align: middle;

      }
    }
  }

  .btn {
    font-size: px2rem(18);
    color: #fff;
    background: #518BEE;
    border-radius: px2rem(6);
    height: px2rem(44);
    line-height: px2rem(44);
    width: px2rem(255);
    margin: px2rem(30) auto 0;
    text-align: center;
    border: 0;
    outline: none;
    display: block;

    &.btn-back {
      color: #0096FE;
      background-color: #fff;
      border: 1px solid #0096FE;
    }
  }
</style>
