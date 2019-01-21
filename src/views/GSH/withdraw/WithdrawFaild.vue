<template>
    <div class="app">
        <app-bar title="提现失败"></app-bar>
        <div class="chattuimg">
            <img src="@/assets/images/buyfail@2x.png" alt="">
            <h2>很抱歉，提现失败!</h2>
            <p class="err-msg">{{errMsg}}</p>
        </div>
      <span @click="reWithdraw" class="btn">重新提现</span>
      <!--<span @click="goBank" class="btn btn-back">返回银行页</span>-->
    </div>
</template>
<script>
    import {PageName} from "../../../Constant";

    export default {
        data() {
            return {
                errMsg:''
            }
        },
        created() {
            this.errMsg = this.$route.query.err2 || this.$route.query.err1
        },
        methods: {
          reWithdraw() {
            // this.$router.go(-1)
            this.$router.push({name:PageName.BankBalance})
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
        margin-top: px2rem(80);
        text-align: center;
        img{
            width: px2rem(70);
            height: px2rem(70);
        }
        h2 {
            font-size: px2rem(18);
            margin: px2rem(20) 0;
        }
        .err-msg{
            font-size: px2rem(16);
            text-align: center;
            color:#F22C17
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
