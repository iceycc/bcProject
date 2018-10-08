<template>
    <div class="main">
        <app-bar title="我的银行"></app-bar>
        <section class="container" style="padding-top: 7px">
            <section class="banner">
                <section>
                    <span class="bk-text1">总资产</span>
                    <span class="bk-text2">（元）</span>
                    <icon-font iconClass="icon-eye" iconStyle="eye" @doClick="pass =!pass"></icon-font>
                </section>
                <p class="money" v-show="pass">10,000.00</p>
                <p class="money" v-show="!pass">****</p>
                <section class="income">
                    <p>昨日到账收益 <span class="left-text">+100.30</span></p>
                    <p style="text-align: right">累计收益 <span class="right-text">+100.30</span></p>
                </section>
            </section>
        </section>
        <section class="container">
            <section class="info-card">
                <div class="ic-left">
                    <span class="bk-text1">可用余额</span><span class="bk-text2">（元）</span>
                    <p class="money" v-show="pass">10,000.00</p>
                    <p class="money" v-show="!pass">****</p>
                </div>
                <span class="ic-right" @click="goPage('PayDetail')">
                    明细
                    <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
                </span>

            </section>
        </section>
        <section class="bank-card container">
            <div class="bank-logo">
                <img src="../../images/img/beijingbank@2x.png" alt="">
            </div>
            <div class="bank-test">
                <p class="">广发银行信用卡</p>
                <p class="card-no" v-show="pass">XXXX XXXX XXXX XXXX XXXX</p>
                <p class="card-no" v-show="!pass">****</p>
            </div>
        </section>
        <section v-if="pass"  class="financing-list">
            <section class="top">
                    <span class="top-left">
                        理财</span>
                <span class="top-right">
                        ¥10.000.<i>30</i>
                    </span>
            </section>
            <ul>
                <li class="financing-li" v-for="i in 1">
                    <span class="li-left">
                        理财产品1</span>
                    <span>
                        ¥10.000.<i>30</i>
                    </span>
                </li>
            </ul>
        </section>
        <section class="more" @click="goPage('MoreService')">
             <span class="more-left">
                        更多服务</span>
            <span class="more-right">
                <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
                    </span>
        </section>
        <p class="foot-text">
            如有疑问请拔打银行客服电话95105588
        </p>
    </div>
</template>

<script>
    import IconFont from '../../components/commons/IconFont'
    import {API} from "../../request/api";

    export default {
        name: "bankDetail",
        components: {
            IconFont
        },
        data(){
            return {
                pass:true
            }
        },
        methods:{
            goPage(pageName){
                console.log(pageName)
                this.$router.push({
                    name:pageName
                })
            },
            show(){
                console.log('show');
            },


        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/px2rem";
    i{
        font-style: normal;
    }
    .main {
        height: 100%;
        background: #f6f6f6;
    }
    .container {
        padding: 0 px2rem(15);
        background: #fff;
        box-sizing: border-box;
    }

    .banner {
        height: px2rem(120);
        background:url("../../images/img/background@2x.png") no-repeat;
        background-size: contain;
        box-sizing: border-box;
        padding: px2rem(0) px2rem(10);
        color: #fff;
        font-size: 0;
        .bk-text1 {
            font-size: px2rem(18);
            opacity: .7;
        }
        .bk-text2 {
            font-size: px2rem(10);
            opacity: .7;

        }
        .eye {
            margin-left: px2rem(19);
            font-size: px2rem(24);

        }
        .money {
            font-size: px2rem(23);
        }
        .income {
            margin-top: px2rem(8);
            display: flex;
            font-size: px2rem(12);
            color: rgba(255, 255, 255, .7);
            p {
                flex: 1;
            }
        }
        .left-text {
            color: #FFA054;

        }
        .right-text {
            color: #fff;
        }

    }

    .info-card {
        display: flex;
        font-size: 0;
        padding: px2rem(30) 0 px2rem(11) px2rem(10);
        .ic-left {
            flex: 1;
        }
        .ic-right {
            font-size: px2rem(12);
            color: #666;
            display: inline-block;
            height: px2rem(56);
            line-height: px2rem(56);
        }
        .bk-text1 {
            font-size: px2rem(14);
            opacity: .7;
        }
        .bk-text2 {
            font-size: px2rem(10);
            opacity: .7;
            margin-left: px2rem(-3);

        }
        .money {
            font-size: px2rem(24);
        }
        .detail {
            font-size: px2rem(12);
        }
        margin-bottom: px2rem(10);
    }

    .bank-card {
        display: flex;
        box-sizing: border-box;
        padding: px2rem(10);
        .bank-logo {
            width: px2rem(48);
            height: px2rem(48);
            img {
                width: 100%;
                height: 100%;
            }
        }
        .card-no {
            color: #999
        }
        .bank-test {
            padding-left: px2rem(10);
            font-size: px2rem(16);
        }
        margin-bottom: px2rem(10);
    }

    .financing-list {
        box-sizing: border-box;
        padding: px2rem(10) px2rem(10) px2rem(0) px2rem(20);
        background: #fff;
        .top{
            display: flex;
            font-size: px2rem(14);
            height: px2rem(28);
            line-height: px2rem(28);
            color: #000;
            .top-left{
                position: relative;
                flex: 1;
                padding-left: px2rem(20);
                box-sizing: border-box;
                &:before{
                    position: absolute;
                    left: px2rem(0);
                    top: 50%;
                    transform: translateY(-50%);
                    content: '';
                    width: px2rem(15);
                    height: px2rem(15);
                    background: url("../../images/img/property_icon_financing.png") no-repeat center;
                    background-size: contain;
                }
            }
            .top-right{
                font-size: px2rem(18);
                color: #666;
            }
            margin-bottom: px2rem(10);

        }
        .financing-li{
            display: flex;
            font-size: px2rem(14);
            padding: px2rem(15) 0;
            border-bottom: 1px solid #ccc;
            height: px2rem(28);
            line-height: px2rem(28);
            color: #333;
            .li-left{
                position: relative;
                flex: 1;
                padding-left: px2rem(10);
                box-sizing: border-box;
                &:before{
                    position: absolute;
                    left: px2rem(0);
                    top: 50%;
                    transform: translateY(-50%);
                    content: '';
                    width: px2rem(4);
                    height: px2rem(4);
                    border-radius: px2rem(2);
                    background: #4F96FF;
                }
            }
            &:last-child{
                border-bottom:none;
            }

        }
        margin-bottom: px2rem(10);

    }
    .more{
        background: #fff;
        font-size: px2rem(14);
        padding: px2rem(10) px2rem(10) px2rem(10) px2rem(20);
        box-sizing: border-box;
        display: flex;
        .more-left{
            flex: 1;
        }
        margin-bottom: px2rem(10);

    }
    .foot-text{
       background: #f6f6f6;
        text-align: center;
        padding: px2rem(30) 0;
        color: #2B74FE;
    }

</style>