<template>
    <div class="main">
        <app-bar title="我的银行"></app-bar>
        <section class="banner container">
            <section>
                <span class="bk-text1">总资产</span>
                <span class="bk-text2">（元）</span>
                <icon-font iconClass="icon-eye" iconStyle="eye"></icon-font>
            </section>
            <p class="money">10,000.00</p>
            <section class="income">
                <p>昨日到账收益 <span class="left-text">+100.30</span></p>
                <p style="text-align: right">累计收益 <span class="right-text">+100.30</span></p>
            </section>
        </section>
        <section class="info-card container">
            <div class="ic-left">
                <span class="bk-text1">可用余额</span><span class="bk-text2">（元）</span>
                <p class="money">10,000.00</p>
            </div>
            <span class="ic-right">
                    明细
                    <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
                </span>
        </section>
        <div class="empty-line"></div>
        <section class="bank-card container">
            <div class="bank-logo">
                <img src="../../images/img/beijingbank@2x.png" alt="">
            </div>
            <div class="bank-test">
                <p class="">广发银行信用卡</p>
                <p class="card-no">XXXX XXXX XXXX XXXX XXXX</p>
            </div>
        </section>
        <div class="empty-line"></div>
        <section class="financing-list">
            <section class="top">
                <div class="top-left">
                    <img src="" alt="">
                    <span>理财</span>
                </div>
                <div class="top-right">

                </div>
            </section>
            <ul>
                <li>
                    <span>
                        <img src="" alt=""> 
                        理财</span>
                    <span>
                        ¥ 10.000.<i>30</i>
                    </span>
                </li>
            </ul>
        </section>

    </div>
</template>

<script>
    import IconFont from '../../components/commons/IconFont'

    export default {
        name: "bankDetail",
        components: {
            IconFont
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/px2rem";

    .main {
        height: 100%;
    }

    .empty-line {
        height: px2rem(10);
        background: #f6f6f6;
    }

    .container {
        margin: 0 auto;
        width: px2rem(355);
        box-sizing: border-box;
    }

    .banner {
        height: px2rem(120);
        background: url("../../images/img/background@2x.png") no-repeat;
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
    }

    .bank-card {
        display: flex;
        box-sizing: border-box;
        padding: px2rem(10) 0 px2rem(10) px2rem(10);
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

    }

    .financing-list {
        box-sizing: border-box;
        padding: px2rem(10) 0 px2rem(10) px2rem(10);
    }

</style>