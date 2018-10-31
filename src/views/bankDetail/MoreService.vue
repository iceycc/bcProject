<template>
    <div style="background: #f6f6f9;height: 100%">
        <app-bar title="更多服务"></app-bar>
        <section class="m-main">
            <section class="more" @click="goPage(toPageName.fenxian)">
             <span class="more-left">
                        风险测评</span>
                <span class="more-right">
                    {{RISK_TOLERANCE_LEVEL | RISK_TOLERANCE_LEVEL_Filter}}
                <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
                    </span>
            </section>
            <section class="more" @click="goPage(toPageName.ChangeBank)">
             <span class="more-left">
                        更换银行卡</span>
                <span class="more-right">
                    已绑定{{CARD_BANK_NAME}}
                <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
                    </span>
            </section>
            <section class="more" @click="goPage(toPageName.ResetPhone)">
             <span class="more-left">
                        更换绑定手机号</span>
                <span class="more-right">
                <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
                    </span>
            </section>
            <section class="more" @click="goPage(toPageName.ResetPayPassWord)">
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
    import {API} from "../../service/api";
    import {LsName, PageName} from "../../Constant";
    import util from "libs/util";

    export default {
        name: "MoreService",
        components: {
            IconFont
        },
        data() {
            return {
                RISK_TOLERANCE_LEVEL: '',
                CARD_BANK_NAME: '',
                toPageName: {
                    fenxian: PageName.fengxianresult,
                    ChangeBank: PageName.ChangeBank,
                    ResetPhone: PageName.ResetPhone,
                    ResetPayPassWord: PageName.ResetPayPassWord,
                },
                PHONE_NUM:'',
                fenxianQuery: {}
            }
        },
        created() {
            this.getInfos()
        },
        filters: {
            RISK_TOLERANCE_LEVEL_Filter(val) {
                switch (val) {
                    case '1':
                        return '保守型'
                        break;

                    case '2':
                        return '谨慎型'
                        break;

                    case '3':
                        return '稳健型'
                        break;

                    case '4':
                        return '积极型'
                        break;

                    case '5':
                        return '激进型'
                        break;
                }
            }
        },
        methods: {
            goPage(pageName) {
                let data = {}
                console.log(pageName);
                if (pageName == PageName.fengxianresult) {
                    util.storage.session.set(LsName.loginType,PageName.MoreService) // 用于跳转风险测评返回判断
                    data = this.fenxianQuery
                }
                else {
                    data = {}
                }
                this.$router.push({
                    name: pageName,
                    query:data
                })
            },
            getInfos() {
                let data = {}
                API.safe.apiBandCard(data, (res) => {
                    util.storage.session.set(LsName.Infos,{
                        PHONE_NUM:res.PHONE_NUM,
                        USER_CARD_ID:res.USER_CARD_ID,
                        USER_NAME:res.USER_NAME,
                    })
                    this.RISK_TOLERANCE_LEVEL = res.RISK_TOLERANCE_LEVEL
                    this.CARD_BANK_NAME = res.CARD_BANK_NAME
                    this.toPageName.fenxian = res.HAS_GRADE ==2
                            ?PageName.fengxianresult:PageName.Riskassessment
                    this.fenxianQuery = {
                        RISK_LEV_EXPLAIN:res.RISK_LEV_EXPLAIN,
                        RISK_TOLERANCE_DESC:res.RISK_TOLERANCE_DESC, //
                        RISK_TOLERANCE_SCORE:res.RISK_TOLERANCE_SCORE, // 分数
                    }

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