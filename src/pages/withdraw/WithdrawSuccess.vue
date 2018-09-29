<template>
    <div class="app">
        <app-bar title="提现"></app-bar>
        <div class="chattuimg">
            <img src="../../images/img/Verificationsuccess@2x.png" style="width:30%" alt="">
            <h2>提现成功</h2>
        </div>
        <section class="m-card">
            <p><span>提现金额</span>{{data.money}}</p>
            <p><span>交易流水号</span>{{data.BESHARP_RECHARGE_SEQ}}</p>
        </section>
        <button class="begain" @click="goNext">完成</button>
    </div>
</template>
<script>


    export default {
        data() {
            return {
                money: '',
                num: '',
                data: {
                    BESHARP_RECHARGE_SEQ: 10000000,
                    money:'1,111'
                }
            }
        },
        created() {

        },
        methods: {
            goNext() {
                this.$router.go(-2)
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
        color: #2B74FE;
        text-align: center;
        h2{
            margin: px2rem(20) 0;
        }

    }

    .m-card {
        padding: px2rem(20);
        font-size: px2rem(14);
        color:#9199A1;
        border-top: 1px solid #eeeef0;
        border-bottom: 1px solid #eeeef0;
        span{
            display: inline-block;
            width: px2rem(100);
        }
    }

    .fenxiangcontent {
        font-size: 0.4rem;
        color: #F22C17;
        margin-top: 1.5rem;
        padding: 0 0.9rem;
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
