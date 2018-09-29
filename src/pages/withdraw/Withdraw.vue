<template>
    <div class="app">
        <app-bar title="充值"></app-bar>
        <div class="rechargetitle">提现到{{ORG_NAME}}直销银行</div>
        <div class="minshengbank">
            <span class="minshengbankLogo"><img src="../../images/img/beijingbank@2x.png" style="width:75%"
                                                alt=""></span>
            {{ORG_NAME}}
        </div>
        <section class="inputAmount">
            <span class="Amount">金额</span>
            <input @change="checkMoney"
                   v-model="APPLY_AMOUN" type="number" placeholder="请输入金额">
        </section>
        <p class="info">本卡当前余额55,899.00元 <span style="color:#389CFF ">全部提现</span></p>
        <button class="tijiao" @click="doNext">确认充值</button>
        <section v-if="show" class="bgbox">
            <section class="passbox">
                <p class="title">
                    <img src="../../images/img/icon_dunpai@2x.png" alt="">
                    由晋商银行提供技术保障</p>
                <section class="field_row_wrap">
                    <p class="field_row_key">
                        交易密码
                    </p>
                    <div class="field_row_value">
                        <pass-input
                                inputID="payPass"
                        ></pass-input>
                    </div>
                    <p class="info">密码由数字组成，必须为6位</p>
                </section>
                <div class="btn">
                    <mt-button @click="show =!show" type="primary">取消</mt-button>
                    <mt-button @click="doReCange" type="primary">提交</mt-button>
                </div>
            </section>
        </section>

    </div>
</template>
<script>
    import {API} from "../../request/api";
    import AppBar from '../../components/header/AppBar'
    import {HOST, LsName} from '../../Constant'
    import PassInput from '../../components/commons/PassInput'
    import Bus from '../../common/js/bus'
    import {PageName, imgSrc, BusName} from "../../Constant";
    import {util} from "../../common/utils/util";
    import {Mixin} from '../../common/utils/mixin'

    let time = 60
    let timer;
    export default {
        data() {
            return {
                show: false,
                html: '协议',
                page: false,
                APPLY_AMOUN: '',
                toUrl: '',
                ORG_NAME: '北京银行',
                imgSrc: imgSrc,

            }
        },
        components: {
            AppBar,
            PassInput
        },
        mixins: [Mixin],
        created() {

        },

        methods: {
            checkMoney() {

            },
            doReCange() {
            },
            doNext() {
                this.show = true
            },

        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/px2rem";
    .rechargetitle {
        padding-left: px2rem(20);
        height: px2rem(30);
        background: #F6F6F9;
        line-height: px2rem(30);
        color: #444444;
        font-size: px2rem(14);
    }

    .minshengbank {
        padding-left: px2rem(20);
        height: px2rem(65);
        line-height: px2rem(65);
        font-size: px2rem(16)
    }

    .inputAmount {
        padding-left: px2rem(20);
        height: px2rem(50);
        line-height: px2rem(50);
        font-size: px2rem(14);
        margin-top: px2rem(20);
        border-top: px2rem(20) solid #f6f6f9;
        border-bottom: 1px solid #EEEEF0;
        .button {
            vertical-align: middle;
            width: 2.5rem;
            display: inline-block;
            padding: .1rem;
            border: 1px solid #508CEE;
            color: #508CEE
        }
        input {
            width: 50%;
            border: none;
            box-sizing: border-box;
            font-size: 0.4rem;
            color: #333;
            /* line-height: 0.5rem; */
            outline: none;

        }
    }

    .Amount {
        display: inline-block;
        height: 100%;
        width: 1.8rem;
    }

    .tijiao {
        margin-top: 50px;
        font-size: 0.5rem;
        color: #fff;
        background-color: #508CEE;
        /* border-radius: 0.1rem; */
        line-height: 1.2rem;
        width: 80%;
        margin: 0 auto;
        text-align: center;
        margin-top: 0.8rem;
        border: 0px;
        outline: none;
        display: block;
    }

    .minshengbankLogo {
        line-height: 100%;
        display: inline-block;
        height: 60%;
        width: 50px;
        float: left;
        padding-top: 0.4rem;
    }
    .info{
        padding-left: px2rem(20);
        padding-top: px2rem(20);
        font-size: px2rem(14);
        color:#9199A1;
    }
    .bgbox {
        z-index: 2;
        width: 100%;
        height: 100%;
        background: rgba(1, 1, 1, .7);
        position: fixed;
        padding-top: 1.7rem;
        top: 0;
        left: 0;
        .passbox {
            background: #fff;
            width: 80%;
            margin: 0 auto;
            padding: 0.4rem;
            box-sizing: border-box;
        }
        .field_row_key {
            font-size: 0.4rem;
        }
        .title {
            margin-bottom: 0.5rem;
            text-align: center;
            font-size: 0.4rem;
            color: #666;
            height: .6rem;
            line-height: .6rem;
            img {
                vertical-align: top;
                width: .5rem;
            }
        }
        .field_row_wrap {
            margin-bottom: 0.2rem;
        }
        .field_row_value {
            border-radius: 4px;
            border: 1px solid #9e9e9e;
            height: 0.9rem;
            line-height: 0.9rem;
            margin: 0.2rem 0;
        }
        .info {
            font-size: 0.3rem;
            line-height: 0.6rem;
            color: #aeaeae;
            span{
                color:#389CFF
            }
        }
        .btn {
            display: flex;
            button {
                margin: 0 .3rem;
                text-align: center;
                flex: 1;
            }
        }
    }
</style>
