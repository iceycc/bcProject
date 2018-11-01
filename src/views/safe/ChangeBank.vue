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
            <active-input check-type="number" valuePlaceholder="新绑定卡卡号" v-model="bankNo" max="20"></active-input>
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
        <div v-if="ifShow" class="bgbox">
            <div class="passbox">
                <div class="top">
                    <p class="title">
                        <img src="../../assets/images/icon_dunpai@2x.png" alt="">
                        由晋商银行提供技术保障</p>
                    <div class="field_row_wrap">
                        <p class="field_row_key">
                            支付密码
                        </p>
                        <div class="field_row_value">
                            <pass-input
                                    inputID="change_bank_pay_pass"
                                    :doGetData="ifGet"
                            ></pass-input>
                        </div>
                        <p class="info">密码由数字组成，必须为6位</p>
                    </div>

                </div>
                <div class="btn">
                    <button @click="ifShow =false">取消</button>
                    <button @click="subumit">提交</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import BankSelect from '../../components/commons/BankSelect'
    import ActiveInput from '../../components/commons/ActiveInput'
    import ErrMsg from '../../components/commons/ErrMsg'
    import API from "../../service";
    import {imgSrc, BusName, LsName,PageName} from "../../Constant";
    import Bus from '../../plugin/bus'
    import util from "libs/util";
    import PassInput from '../../components/commons/PassInput'
    import {Mixin} from '../../common/mixins'

    export default {
        name: "changeBank",
        components: {
            BankSelect,
            ActiveInput,
            ErrMsg,
            PassInput
        },
        data() {
            return {
                bankText: '请选择银行',
                bankList: [],
                AllBankListObj: {},
                errMsg: '',
                bankNo: '',
                bankNameToNo: false,
                params: {},
                ifGet: false,
                ifShow: false

            }
        },
        mixins: [Mixin],
        created() {
            let beforeInfo;
            if (beforeInfo = util.storage.session.get('ChangeBankInfo')) {
                this.errMsg = beforeInfo.msg
                setTimeout(() => {
                    this.errMsg = ''
                }, 2000)
                util.storage.session.remove('ChangeBankInfo')
            }

            this.getBankList()
            this.params = util.storage.session.get(LsName.Infos)
        },
        watch: {
            bankNo(n, o) {
                this.checkBankName(this.bankNo)
            },
            bankText(n, o) {
                this.checkBankName(this.bankNo)
            }
        },
        methods: {
            getBank(val) {
                this.bankText = val.name
            },
            checkBankName(val, fn) {
                this.bankNameToNo = false
                val = val.replace(/\s+/g, "")
                let bankName
                for (var i = 3; i < 10; i++) {
                    if (bankName = this.machBankName((val + '').slice(0, i))) {
                        if (bankName != this.bankText) {
                            return
                        }
                        this.bankNameToNo = true
                        break
                    }
                }
            },
            checkBankNo(val) {
                val = val.toString()
                if (this.bankText == '请选择银行') {
                    this.showErrMsg('请选择银行')
                    return true
                }
                if (val == '') {
                    this.showErrMsg('银行卡号不能为空')
                    return true
                }
                else if (val.length < 15 || val.length > 19) {
                    this.showErrMsg('银行卡号有误，请确认后再次输入')
                    return true
                }
                else {
                    this.checkBankName(val)
                    return false
                }

            },
            machBankName(pin) {
                return this.AllBankListObj[pin]
            },
            getBankList() {
                API.list.apiGetBankCardList({}, res => {
                    let obj = {}
                    res.BAND_CARD_LIST.forEach(item => {
                        obj[item.BANK_CARD_BIN] = item.BANK_NAME
                    })
                    // console.log('bankObj>>>',obj);
                    // 全部银行
                    this.AllBankListObj = obj
                    // 支持的银行
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
            showErrMsg(msg) {
                this.errMsg = msg;
                setTimeout(() => {
                    this.errMsg = '';
                }, 4000)
            },
            subumit() {
                let LoginPass = $('#change_bank_pay_pass').$getCiphertext()
                let LoginPassLen = $('#change_bank_pay_pass').$getPasswordLength() - 0 || 0
                let msg;
                if (msg = util.Check.payPassLen(LoginPassLen)) {
                    this.showErrMsg(msg)
                    return
                }
                let data = {
                    CARD_NO: this.bankNo,
                    BANK_PAY_PW: LoginPass,
                    ...this.params,
                }
                let delMsg = true

                API.safe.apiChangeBingCard(data, delMsg, res => {
                    Bus.$emit(BusName.showToast,'更换银行卡成功')
                    this.$router.push({
                        name:PageName.MoreService
                    })
                }, err => {
                    console.log('err>>>>>>>>1111', err);
                    this.errMsg = err
                    this.ifShow = false
                    util.storage.session.set('ChangeBankInfo', {
                        msg: err
                    })
                    setTimeout(() => {
                        window.location.reload()
                    }, 500)
                })
            },
            goNext() {
                if (this.checkBankNo(this.bankNo)) return
                console.log('goNext>>', this.bankNameToNo);
                if (!this.bankNameToNo) {
                    this.showErrMsg('银行卡和银行名称不匹配')
                } else {
                    this.ifShow = true
                }

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
        padding-top: px2rem(30);
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
        margin: px2rem(20) auto 0;
        text-align: center;
        border: none;
        outline: none;
    }

    .err-msg {
        /*position: absolute;*/
        /*top: px2rem(0);*/
        /*left: 50%;*/
        /*transform: translateX(-50%);*/
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