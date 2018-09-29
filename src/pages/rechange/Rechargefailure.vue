<template>
    <div class="app">
        <app-bar title="充值"></app-bar>
        <div class="chattuimg">
            <img src="../../images/img/buyfail@2x.png" alt="">
        </div>
        <div class="fenxiangcontent">
            <h2>很抱歉，充值失败!</h2>
            <p style="margin-top:0.6rem; color:#F22C17;">{{errMsg}}</p>
        </div>
        <span @click="reCharge" class="begain">重新充值</span>
    </div>
</template>
<script>
    export default {
        created() {
            this.errMsg = this.$route.query.err || '系统繁忙，请稍后再试'
        },
        data(){
            return {
                errMsg:''
            }
        },
        methods: {
            reCharge() {
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
        margin-top: 2rem;
        text-align: center;
        img{
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

    .begain {
        font-size: 0.4rem;
        color: #fff;
        background-color: #0096FE;
        border-radius: 0.3rem;
        line-height: 1rem;
        width: 80%;
        margin: 0 auto;
        text-align: center;
        margin-top: 1rem;
        border: 0px;
        outline: none;
        display: block;
    }
</style>
