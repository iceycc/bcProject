<template>
  <div class="app">
    <app-bar title="充值"></app-bar>
    <div class="chattuimg">
      <img src="@/assets/images/buyfail@2x.png" alt="">
    </div>
    <div class="fenxiangcontent">
      <h2>很抱歉，充值失败!</h2>
      <div>
        <img src="@/assets/images/error_tips.png" alt="">
        <span style="margin-top:0.6rem; color:#F22C17;">{{errMsg}}</span>
      </div>
    </div>
    <span @click="reCharge" class="btn">重新充值</span>
    <!--<span @click="goBank" class="btn btn-back">返回银行页</span>-->
  </div>
</template>
<script>

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
  @import "~@/assets/px2rem";

  .app {
    width: 100%;
    margin: 0 auto;
  }

  .chattuimg {
    margin-top: 2rem;
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
    margin-top: 1rem;
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
