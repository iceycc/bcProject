<template>
    <div style="background: #f6f6f9;height: 100%">
        <app-bar title="更多服务"></app-bar>
        <section class="m-main">
            <section class="more" @click="goPage('Riskassessment')">
             <span class="more-left">
                        风险测评</span>
                <span class="more-right">
                    谨慎性
                <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
                    </span>
            </section>
            <section class="more" @click="goPage('ChangeBank')">
             <span class="more-left">
                        更换银行卡</span>
                <span class="more-right">
                    已绑定招商银行卡
                <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
                    </span>
            </section>
            <section class="more" @click="goPage('ResetPhone')">
             <span class="more-left">
                        更换绑定手机号</span>
                <span class="more-right">
                <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
                    </span>
            </section>
            <section class="more" @click="goPage('ResetPayPassWord')">
             <span class="more-left">
                        更换支付密码</span>
                <span class="more-right">
                <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
                    </span>
            </section>
        </section>
    </div>
</template>

<script>
    import IconFont from '../../components/commons/IconFont'

    export default {
        name: "MoreService",
        components: {
            IconFont
        },
        methods:{
            goPage(pageName){
                console.log(pageName)
                this.$router.push({
                    name:pageName
                })
            }
        }

    }
</script>

<style lang="scss" scoped>
    @import "../../assets/px2rem";

    .m-main {
        margin-top: px2rem(10);
    }

    .more {
        font-size: px2rem(14);
        padding: 0 px2rem(20);
        height: px2rem(50);
        line-height: px2rem(50);
        box-sizing: border-box;
        display: flex;
        background: #fff;
        .more-left {
            flex: 1;
            vertical-align: middle;
        }
        .more-right {
            color: #6e6e6e;
            font-size: px2rem(12);
        }
        .detail {
            color: #6e6e6e;
            font-size: px2rem(12);

        }
        margin-bottom: px2rem(1);
    }
</style>