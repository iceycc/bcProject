<template>
  <div class="app">
    <app-bar title="支取"></app-bar>
    <div class="chattuimg">
      <img src="@/assets/images/Verificationsuccess@2x.png" class="img" alt="">
      <h2>支取成功</h2>
    </div>
    <section class="m-card">
      <p>
        <span>支取金额</span>
        <span class="flex1">{{redeemAmountDesc}}元</span>
      </p>
      <p>
        <span>收益金额</span>
        <span class="flex1">{{incomeDesc}}元</span>
      </p>
      <p>
        <span>收款账户</span>
        <span class="flex1">{{bankUserCode}}</span>
      </p>
    </section>
    <button class="begain" @click="goNext">完成</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      redeemAmountDesc: "",
      incomeDesc: "",
      bankUserCode: ""
    };
  },
  created() {
    let preData = { ...this.$route.query };
    this.redeemAmountDesc = preData.redeemAmountDesc;
    this.incomeDesc = preData.incomeDesc;
    this.bankUserCode = preData.bankUserCode;
    //this.BESHARP_SEQ = preData.BESHARP_SEQ
  },
  methods: {
    goNext() {
      this.$router.go(-2);
    }
  }
};
</script>

<style lang="scss" scoped>
.app {
  width: 100%;
  margin: 0 auto;
}
.chattuimg {
  .img {
    width: px2rem(70);
  }
  margin-top: px2rem(70);
  text-align: center;

  h2 {
    font-size: px2rem(18);
    margin: px2rem(20) 0;
    color: #508cee !important;
  }
}

.m-card {
  font-size: px2rem(14);
  color: #333;
  p {
    display: flex;
    border-top: 1px solid #dddddd;
    padding: px2rem(11) px2rem(12);
    .flex1 {
      flex: 1;
      text-align: right;
      color: #444444;
    }
  }
  p:last-child {
    border-bottom: 1px solid #dddddd;
  }
}

.begain {
  display: block;
  font-size: px2rem(18);
  background: #518bee;
  border-radius: px2rem(6);
  width: px2rem(255);
  height: px2rem(44);
  color: #fff;
  text-align: center;
  margin: px2rem(30) auto;
}
</style>
