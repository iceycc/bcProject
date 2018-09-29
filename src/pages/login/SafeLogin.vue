<template>
    <div>
        <app-bar title="安全登录"></app-bar>
        <section class="m-bank-box">
            <p>已登陆</p>
            <section class="m-bank-card">
                <div class="m-top">
                    <div class="m-logo">
                        <img src="../../images/img/beijingbank@2x.png" alt="">
                    </div>
                    <div class="m-name">
                        <h3>廊坊直销银行</h3>
                        <p>隶属于廊坊银行</p>
                    </div>
                    <div class="m-btn">
                        <span class="u-btn">安全登陆</span>
                    </div>

                </div>
                <ul class="m-bottom">
                    <li>
                        总资产
                    </li>
                    <li>
                        昨日收益
                    </li>
                    <li>
                        累计收益
                    </li>
                </ul>
            </section>
        </section>

    </div>
</template>

<script>
    export default {
        name: "SafeLogin"
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/px2rem";

    .m-bank-box {
        width: 100%;
        .m-top {
            display: flex;
            border-bottom: 1px solid #ccc;
            box-sizing: border-box;
            padding-left: px2rem(20);
            .m-logo{
                box-sizing: border-box;
                width: px2rem(52);
                img{
                    width: px2rem(34);
                    height: px2rem(34);
                }
            }
            .m-name{
                width: px2rem(200);
                p{
                    color:#A8B4C4;
                }
            }
            .m-btn{

            }


        }
        .m-bottom{
            display: flex;
            li{
                width: px2rem(141);
                &:last-child{
                    width: auto;
                }
            }
        }
    }
    .u-btn{
        display: inline-block;
        width: px2rem(80);
        height: px2rem(24);
        background: #FFB403;
        border-radius: px2rem(10);
        color: #fff;
        text-align: center;
        line-height: px2rem(24);
    }

</style>