<template>
    <div class="app">
        <app-bar title="提现失败"></app-bar>
        <div class="chattuimg">
            <img src="../../images/img/buyfail@2x.png" alt="">
            <h2>很抱歉，提现失败!</h2>
            <p class="err-msg">{{errMsg}}</p>
        </div>
        <button class="begain" @click="goNext">重现提现</button>
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
            goNext() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/px2rem";

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

    .begain {
        display: block;
        font-size: px2rem(16);
        background: #518BEE;
        border-radius: px2rem(6);
        width: px2rem(255);
        height: px2rem(44);
        color: #fff;
        text-align: center;
        margin: px2rem(30) auto;
    }
</style>
