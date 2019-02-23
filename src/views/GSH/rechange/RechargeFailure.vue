<template>
  <div class="app">
    <app-bar title="充值"></app-bar>
    <com-deal-result>
      <section slot="resImg">
        <img src="@/assets/images/buyfail@2x.png" alt="">
      </section>
      <section slot="resMsg" class="res-msg">
        <p class="msg1">很抱歉，充值失败!</p>
        <p class="msg2">
          <img src="@/assets/images/error_tips.png" alt="">
          <span>{{errMsg}}</span>
        </p>
      </section>
      <section slot="resBtn">
        <span @click="reCharge" class="btn">重新充值</span>
      </section>
    </com-deal-result>
  </div>
</template>
<script>
  import {ComDealResult} from '@/components'
  export default {
    created() {
      this.errMsg = this.$route.query.err || ''
    },
    components: {
      ComDealResult
    },
    data() {
      return {
        errMsg: ''
      }
    },
    methods: {
      reCharge() {
        this.$router.go(-1)
      },
      goBank(){
        this.$router.push({
          name:''
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
    background: #508CEE;
    border-radius: px2rem(6);
    height: px2rem(44);
    line-height: px2rem(44);
    width: px2rem(255);
    margin:px2rem(30) auto 0;
    text-align: center;
    border: 0;
    outline: none;
    display: block;
  }
</style>
