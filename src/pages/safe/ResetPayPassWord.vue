<template>
    <div>
        <app-bar title="更换支付密码"></app-bar>
        <section class="m-form">
            <section class="m-line">
                <span class="n-left">姓名</span>
                <span class="n-right">阿克</span>
            </section>
            <active-input valuePlaceholder="身份证号码"></active-input>
            <section class="m-line">
                <span class="n-left">手机号</span>
                <span class="n-right">15621189999</span>
            </section>
            <active-input valuePlaceholder="验证码">
                <template slot="btn">
                    <button class="slot ">获取验证码</button>
                </template>
            </active-input>
            <section class="submit-box">
                <err-msg :errMsg="errMsg" classStyle="err-msg"></err-msg>
                <button class="submit-btn" @click="goNext">下一步</button>
            </section>
            <section class="foot-text">
                <p>温馨提示：</p>
                <p> 更换手机号之前，请您确认新手机号与绑定的银行卡的预留手机号相同，如果不同请先更换绑定银行卡的预留手机号。</p>
            </section>
        </section>

        <div v-if="ifShow" class="bgbox">
            <div class="passbox">
                <div class="top">
                    <p class="title">
                        <img src="../../images/img/icon_dunpai@2x.png" alt="">
                        由晋商银行提供技术保障</p>
                    <div class="field_row_wrap">
                        <p class="field_row_key">
                            交易密码
                        </p>
                        <div class="field_row_value">
                            <pass-input
                                    inputID="loginPass"
                                    :doGetData="ifGet"
                            ></pass-input>
                        </div>
                        <p class="info">密码由6位数字组成</p>
                    </div>

                    <div class="field_row_wrap">
                        <p class="field_row_key">
                            重置交易密码
                        </p>
                        <div class="field_row_value">
                            <pass-input
                                    inputID="payPass"
                                    :doGetData="ifGet"
                            ></pass-input>
                        </div>

                        <p class="info">密码由6位数字组成</p>
                    </div>

                </div>
                <div class="btn">
                    <button @click="cancel">取消</button>
                    <button @click="subumit">提交</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import ActiveInput from '../../components/commons/ActiveInput'
    import ErrMsg from '../../components/commons/ErrMsg'
    import {API} from "../../request/api";
    import PassInput from '../../components/commons/PassInput'

    export default {
        name: "ResetPayPassWord",
        components: {
            ActiveInput,
            ErrMsg,
            PassInput
        },
        data() {
            return {
                errMsg: '错误信息提示',
                ifShow:false,
                ifGet: false,
            }
        },
        created() {
        },
        methods: {

            goNext() {
                this.ifShow = true
            },
            cancel() {
                this.ifShow = false
            },
            subumit(){

            }
        },

    }
</script>

<style lang="scss" scoped>
    @import "../../assets/px2rem";

    .m-form {
        width: 100%;
        box-sizing: border-box;
        padding: 0 px2rem(20);
    }

    .m-line {
        display: flex;
        box-sizing: border-box;
        line-height: px2rem(42);
        background-size: 0.7rem 0.7rem;
        border-bottom: 1px #E5E5E5 solid;
        font-size: px2rem(14);
        .n-left {
            flex: 1;
        }
        .n-right {
            color:#8e8e8e
        }
    }
    .slot{
        position: absolute;
        display: inline-block;
        z-index: 3;
        bottom: px2rem(8);
        right: 0;
        border: 1px solid #2B74FE;
        color: #2B74FE;
        width: px2rem(80);
        height: px2rem(25);
        border-radius: px2rem(6);
    }

    .submit-box {
        position: relative;
        padding-top: px2rem(60);
    }

    .submit-btn {
        display: block;
        font-size: px2rem(16);
        color: #fff;
        background-color: #508CEE;
        border-radius: px2rem(4);
        line-height: 1rem;
        width: px2rem(255);
        height: px2rem(44);
        margin: 0 auto;
        text-align: center;
        border: none;
        outline: none;
    }

    .err-msg {
        position: absolute;
        top: px2rem(0);
        left: 50%;
        transform: translateX(-50%);
    }

    .foot-text {
        color: #8e8e8e;
        padding-top: px2rem(20);
    }

    .bgbox {
        width: 100%;
        height: 100%;
        background: rgba(1, 1, 1, .7);
        position: absolute;
        padding-top: 0.7rem;
        top: 0;
        left: 0;
        z-index: 3;
        .passbox {
            background: #fff;
            width: 80%;
            margin: 0 auto;
            box-sizing: border-box;
        }
        .top {
            padding: 0.4rem;
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
            border-radius: px2rem(4);
            border: 1px solid #DDD;
            height: px2rem(34);
            line-height: px2rem(34);
            padding-left: px2rem(3);
            margin: 0.2rem 0;
        }
        .info {
            font-size: 0.3rem;
            line-height: 0.6rem;
            color: #aeaeae;
        }
        .btn {
            border-top: 1px solid #efefef;
            padding: px2rem(14) 0;
            display: flex;
            button {
                color: #108EE9;
                font-size: px2rem(17);
                margin: 0 .3rem;
                text-align: center;
                flex: 1;
            }
        }
    }
</style>