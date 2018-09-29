<template>
    <div>
        <app-bar title="更换手机号"></app-bar>
        <section class="m-form">
            <section class="m-line">
                <span class="n-left">原手机号</span>
                <span class="n-right">1521189997</span>
            </section>
            <active-input valuePlaceholder="身份证号码"></active-input>
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
                <p>1.请您确认新绑定银行卡在银行绑定的手机号与旧卡 绑定手机号相同。</p>
                <p>2.更换绑定银行卡前，请转出所有的投资资金并提现</p>
            </section>
        </section>
    </div>
</template>

<script>
    import ActiveInput from '../../components/commons/ActiveInput'
    import ErrMsg from '../../components/commons/ErrMsg'
    import {API} from "../../request/api";

    export default {
        name: "ResetPhone",
        components: {
            ActiveInput,
            ErrMsg
        },
        data() {
            return {
                errMsg: '错误信息提示',
            }
        },
        created() {
        },
        methods: {

            goNext() {

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
</style>