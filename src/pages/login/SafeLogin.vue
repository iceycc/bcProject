<template>
    <div style="background: #f6f6f9;height: 100%">
        <app-bar title="安全登录"></app-bar>
        <section class="m-bank-box">
            <p class="m-title">已登陆</p>
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
                        <span class="u-btn" @click="goLogin">安全登陆</span>
                    </div>

                </div>
                <ul class="m-bottom">
                    <li>
                        <P>总资产</P>
                        <P>500.00</P>
                    </li>
                    <li>
                        <P>昨日收益</P>
                        <P>0.30</P>
                    </li>
                    <li>
                        <P>累计收益</P>
                        <P>+100.30</P>
                    </li>
                </ul>
            </section>
        </section>

    </div>
</template>

<script>
    export default {
        name: "SafeLogin",
        methods:{
            goLogin(){
                this.$router.push({
                    name:'login'
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/px2rem";

    .m-bank-box {
        width: 100%;
        .m-title{
            padding-left: px2rem(20);
            font-size: px2rem(12);
            height: px2rem(30);
            line-height: px2rem(30);
        }
        .m-top {
            background: #fff;
            display: flex;
            border-bottom: 1px solid #f6f6f9;
            box-sizing: border-box;
            padding-left: px2rem(20);
            padding-top: px2rem(20);
            padding-bottom: px2rem(18);
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
            background: #fff;
            padding-left: px2rem(20);
            padding-bottom: px2rem(13);
            font-size: px2rem(14);
            li{
                display: inline-block;
                width: px2rem(130);
                box-sizing: border-box;
                padding-top: px2rem(15);
                &:last-child{
                    width: auto;
                }
                p:first-child{
                    color: #666;
                    line-height: 1.5;
                }
                p:last-child{
                    color: #333;
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