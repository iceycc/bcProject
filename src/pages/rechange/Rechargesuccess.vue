<template>
    <div class="app">
        <app-bar title="充值"></app-bar>
        <div class="chattuimg">
            <img src="../../images/img/Verificationsuccess@2x.png" style="width:30%" alt="">
            <h2>充值成功</h2>
        </div>
        <section style="padding-left:1rem">
            <p>充值金额：{{data.money}} 元</p>
            <p>交易流水号：{{data.BESHARP_RECHARGE_SEQ}}</p>
        </section>
        <!--<div class="fenxiangcontent">成功预约xx产品，请下载比财APP关注下期</div>-->
        <!--<div class="begain">下载比财app</div>-->
        <mt-button class="begain" @click="goNext">完成</mt-button>
    </div>
</template>
<script>
    import util from "../../common/utils/util";
    import {LsName} from "../../Constant";
    // import {Mixin} from '../../common/utils/mixin'

    export default {
        data(){
            return{
                money:'',
                num:'',
                data:''
            }
        },
        // mixins: [Mixin],
        created(){
            this.data = this.$route.query
        },
        methods:{
            goNext(){
                this.$router.go(-2)
            }

        }
    }
</script>

<style lang="scss" scoped>
    .app {
        width: 100%;
        margin: 0 auto;
    }

    .chattuimg {
        margin-top: 2.5rem;
        text-align: center
    }

    .fenxiangcontent {
        font-size: 0.4rem;
        color: #F22C17;
        margin-top: 1.5rem;
        padding: 0 0.9rem;
    }

    .begain {
        font-size: 16px;
        color: #fff;
        background-color: #0096FE;
        border-radius: 6px;
        line-height: 40px;
        width: 80%;
        margin: 0 auto;
        text-align: center;
        margin-top: 30px;
        border: 0px;
        outline: none;
        display: block;
    }
</style>
