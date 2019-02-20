<template>
  <div class="app">
    <app-bar title="支取"></app-bar>
    <div class="chattuimg">
      <img src="@/assets/images/buyfail@2x.png" alt="">
      <h2>很抱歉，支取失败!</h2>
      <p class="err-msg">
        <img class="err-img" src="@/assets/images/error_tips.png" alt=""> {{errMsg}}
      </p>
    </div>
    <span @click="reWithdraw" class="btn">再次支取</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      errMsg: ""
    };
  },
  created() {
    this.errMsg = this.$route.query.err;
  },
  methods: {
    reWithdraw() {
      this.$router.go(-1);
    },
    goBank() {
      this.$router.push({
        name: ""
      });
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
  margin-top: px2rem(80);
  text-align: center;
  img {
    width: px2rem(70);
    height: px2rem(70);
  }
  h2 {
    font-size: px2rem(18);
    margin: px2rem(20) 0;
  }

  .err-msg {
    .err-img {
      width: px2rem(16);
      height: px2rem(16);
      vertical-align: top;
    }
    font-size: px2rem(12);
    line-height: px2rem(16);
    text-align: center;
    color: #f22c17;
  }
}

.btn {
  font-size: px2rem(18);
  color: #fff;
  background: #518bee;
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
    color: #0096fe;
    background-color: #fff;
    border: 1px solid #0096fe;
  }
}
</style>
