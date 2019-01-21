<template>
  <div class="app">
    <app-bar title="充值"></app-bar>
    <div class="chattuimg">
      <img src="@/assets/images/applying@2x.png" alt="">
      <h2>银行已经受理，预计两小时到账。</h2>
      <p class="msg">处理时间以客商银行时间为准。</p>
      <p class="msg second">处理结果可在充值处理中页面查询。</p>
    </div>
    <span @click="reWithdraw" class="btn">确定</span>
    <!--<span @click="goBank" class="btn btn-back">返回银行页</span>-->
  </div>
</template>
<script>
  export default {
    data() {
      return {
        errMsg:''
      }
    },
    created() {
      this.errMsg = this.$route.query.err
    },
    methods: {
      reWithdraw() {
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
  @import "~@/assets/px2rem";

  .app {
    width: 100%;
    margin: 0 auto;
  }

  .chattuimg {
    margin-top: px2rem(60);
    text-align: center;
    img{
      width: px2rem(70);
      height: px2rem(70);
    }
    h2 {
      font-size: px2rem(18);
      margin: px2rem(20) 0;
    }
    .msg{
      font-size: px2rem(14);
      text-align: center;
      &.second{
        margin-top: px2rem(70);
      }
    }

  }

  .btn {
    font-size: px2rem(18);
    color: #fff;
    background: #0096FE;
    border-radius: px2rem(6);
    height: px2rem(44);
    line-height: px2rem(44);
    width: px2rem(255);
    margin:px2rem(30) auto 0;
    text-align: center;
    border: 0;
    outline: none;
    display: block;
    &.btn-back{
      color: #0096FE;
      background-color: #fff;
      border: 1px solid #0096FE;
    }
  }
</style>
