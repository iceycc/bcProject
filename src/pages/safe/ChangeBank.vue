<template>
    <div>
        <app-bar title="更换银行卡"></app-bar>
        <section class="m-form">
            <section class="bank">
                <span class="n-left">选择银行</span>
                <!--<input type="text" name="back" placeholder=" 请选择银行" v-model="data.ORG_ID">-->
                <!-- <span  class="limit">银行限额</span>  -->
                <Bank-select class="bank-box" :text="bankText" :options="bankList" @getValue="getBank"
                             title="银行列表"></Bank-select>

            </section>
            <active-input valuePlaceholder="新绑定卡卡号"></active-input>
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
    import BankSelect from '../../components/commons/BankSelect'
    import ActiveInput from '../../components/commons/ActiveInput'
    import ErrMsg from '../../components/commons/ErrMsg'
    import {API} from "../../request/api";
    import {imgSrc} from "../../Constant";

    export default {
        name: "changeBank",
        components: {
            BankSelect,
            ActiveInput,
            ErrMsg
        },
        data() {
            return {
                bankText: '请选择银行',
                bankList: [],
                AllBankListObj: {},
                errMsg: '错误信息提示',
            }
        },
        created() {
            this.getBankList()
        },
        methods: {
            getBank(val) {
                console.log(val);
                this.bankText = val.name
            },
            getBankList() {
                API.list.apiGetBankCardList({}, res => {
                    let obj = {}
                    res.BAND_CARD_LIST.forEach(item => {
                        obj[item.BANK_CARD_BIN] = item.BANK_NAME
                    })
                    // console.log('bankObj>>>',obj);
                    this.AllBankListObj = obj
                    this.bankList = res.SUPPORT_BANK_LIST.map((item) => {
                        return {
                            name: item.BANK_NAME,
                            value: 0,
                            src: imgSrc + item.BANK_LOGO_URL,
                            Index: item.INITIAL
                        }
                    })
                })
            },
            goNext() {

            }
        },

    }
</script>

<style lang="scss" scoped>
    @import "../../assets/px2rem";
    .m-form{
        width: 100%;
        box-sizing: border-box;
        padding: 0 px2rem(20);
    }
    .bank {
        display: flex;
        box-sizing: border-box;
        line-height: px2rem(42);
        background-size: 0.7rem 0.7rem;
        border-bottom: 1px #E5E5E5 solid;
        .n-left {
            font-size: px2rem(14);
            width: px2rem(60);
        }
        .bank-box {
            width: px2rem(150);
            box-sizing: border-box;
            vertical-align: middle;
        }
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
    .foot-text{
        color: #8e8e8e;
        padding-top: px2rem(20);
    }
</style>