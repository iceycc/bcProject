<template>
  <div>
    <app-bar title="提现"></app-bar>
    <com-deal-result>
      <section slot="resImg">
        <img src="@/assets/images/deal_notice_wait.png" alt="">
      </section>
      <section slot="resMsg">
        <p class="msg">{{resMsg2}}</p>
        <p class="msg2">处理结果可在“明细-处理中”页面查询</p>
      </section>
      <section slot="resBtn">
        <span @click="reWithdraw" class="btn">确定</span>
      </section>
    </com-deal-result>
  </div>
</template>
<script>
  import {ComDealResult} from '@/components'

  export default {
    data() {
      return {
        resMsg2: ''
      }
    },
    components: {ComDealResult},
    created() {
      this.resMsg2 = this.$route.query.resMsg2

    },
    methods: {
      reWithdraw() {
        this.$router.go(-1)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .msg {
    text-align: center;
    margin-bottom: px2rem(20);
    font-size: px2rem(18);
    color: #29AB91
  }

  .msg2 {
    text-align: center;
    font-size: px2rem(12);
    color: #999;
  }

  .btn {
    font-size: px2rem(18);
    color: #fff;
    background: #0096FE;
    border-radius: px2rem(6);
    height: px2rem(44);
    line-height: px2rem(44);
    width: px2rem(255);
    margin: px2rem(60) auto 0;
    text-align: center;
    border: 0;
    outline: none;
    display: block;
  }
</style>
