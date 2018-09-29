<template>
    <div class="m-main">
        <app-bar title="可用余额" class="m-header"></app-bar>
        <section class="m-top">
            <p class="u-title">可用金额（元）</p>
            <p class="u-content">￥567,000.<i>00</i></p>
        </section>
        <section class="m-list">
            <section class="m-li" @click="goPage('Recharge')">
                <span>充值</span>
                <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
            </section>
            <section class="m-li" @click="goPage('Withdraw')">
                <span>提现</span>
                <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
            </section>
            <section class="m-li" @click="goPage('Recharge')">
                <span>明细查询</span>
                <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
            </section>
        </section>
    </div>
</template>

<script>
    import IconFont from '../../components/commons/IconFont'

    export default {
        name: "bankBalance",
        components: {
            IconFont
        },
        methods:{
            goPage(page){
                console.log(page);
                this.$router.push({
                    name:page
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/px2rem";

    i {
        font-style: normal;
    }
    .m-main{
        height: 100%;
        background:#f6f6f6;
    }
    .m-header{
        position: relative;
        z-index: 10;
    }
    .m-top {
        width: 100%;
        height: px2rem(120);
        background: url("../../images/img/OvalCopy.png") no-repeat center center;
        padding-left: px2rem(25);
        padding-top: px2rem(25);
        box-sizing: border-box;
        .u-title {
            font-size: px2rem(14);
            color: #fff;
            opacity: 0.79;
        }
        .u-content {
            font-size: px2rem(40.32);
            color: #fff;
            i{
                font-size: px2rem(28.8);
            }

        }
    }
    .m-list{
        background:#fff;
        .m-li{
            box-sizing: border-box;
            padding:0 px2rem(10);
            display: flex;
            font-size: px2rem(14);
            color:#333;
            height: px2rem(50);
            line-height:px2rem(50);
            border-bottom:1px solid #f6f6f6;
            &:last-child{
                border-bottom:none;
            }
            span{
                flex:1
            }
        }
    }

</style>