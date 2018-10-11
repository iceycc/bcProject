<template>
    <div class="app">
        <app-bar title="充值"></app-bar>
        <div class="rechargetitle">充值到{{ORG_NAME}}直销银行</div>
        <div class="minshengbank">
            <span class="minshengbankLogo"><img :src="imgSrc + logo" style="width:75%"
                                                alt=""></span>
            {{ORG_NAME}}
        </div>
        <div class="rechargetitle">银行卡</div>
        <div class="minshengbank" style="border-bottom:1px solid #EEEEF0">
            <span class="minshengbankLogo" style=" padding-top: 10px;"><img :src="imgSrc + CARD_BANK_URL"
                                                                            style="width:75%" alt=""></span>
            {{CARD_BANK_NAME}}
        </div>
        <div class=" money">
            <p>每笔限额：{{SINGLE_QUOTA | formatNum}}元</p>
            <p>每日限额：{{DAY_QUOTA | formatNum}}元</p>
        </div>
        <section class="inputAmount" style="border-top: .4rem solid #f6f6f6">
            <span class="Amount">金额</span>
            <input @change="checkMoney"
                   v-model="APPLY_AMOUN" type="number" placeholder="请输入金额">
        </section>
        <section class="inputAmount" v-if="!write">
            <span class="Amount">
                验证码
            </span>
            <input type="text" v-model="msgCode" placeholder="请填写短信验证码">
            <button
                    :disabled="disable"
                    @click="getMsg"
                    class="button">{{codeText}}
            </button>
        </section>
        <button class="tijiao" @click="doNext">确认充值</button>
        <p :class="{'bang':true,'no':agree == false}" v-if="!write"
           @click="doAgree">我已阅读并同意<span @click.stop="showPage" style=" color:#0096FE;">《充值协议》</span></p>
        <section v-show="page" class="page">
            <div class="docs">
                <iframe :src="agreeMentSrc" class="indocs"></iframe>
            </div>
            <div class="btn">
                <mt-button type="primary" @click="cancel">取消</mt-button>
                <mt-button type="primary" @click="doAgreeHandle">确认</mt-button>
            </div>
        </section>
        <section v-if="show" class="bgbox">
            <section class="passbox">
                <p class="title">
                    <img src="../../assets/images/icon_dunpai@2x.png" alt="">
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
    import {API} from "../../service/api";
    import AppBar from '../../components/header/AppBar'
    import {HOST, LsName} from '../../Constant'
    import PassInput from '../../components/commons/PassInput'
    import Bus from '../../plugin/bus'
    import {PageName, imgSrc, BusName} from "../../Constant";
    import {util} from "../../common/utils/util";
    import {Mixin, UtilMixin} from '../../common/mixin/mixin'

    let time = 60
    let timer;
    export default {
        data() {
            return {
                show: false,
                html: '协议',
                page: false,
                PIN: '',
                APPLY_AMOUN: '',
                toUrl: '',
                ifGet: false,
                write: true, // 是否签约
                agree: true, // 是否阅读
                agree1: true, // 是否获取短信
                agreeMentSrc: HOST + '/static/finsuit/js/openapi/js/xieyi/cz.html',
                ORG_NAME: '',
                imgSrc: imgSrc,
                logo: '',
                CARD_BANK_NAME: '',
                CARD_BANK_URL: '',
                DAY_QUOTA: '',
                SINGLE_QUOTA: '',
                msgCode: '',
                codeText: '获取验证码',
                disable: false,

            }
        },
        components: {
            AppBar,
            PassInput
        },
        mixins: [Mixin, UtilMixin],
        created() {
            this.getInfos()
            let lsData = util.storage.session.get(LsName.RechargeQuery)
            console.log('lsData>>', lsData);
            this.ORG_NAME = lsData.ORG_NAME
            this.logo = lsData.LOGO_URL
            this.reChangeHandele()
        },
        methods: {
            getInfos() {
                API.safe.apiBandCard({}, res => {
                    this.CARD_BANK_NAME = res.CARD_BANK_NAME;
                    this.CARD_BANK_URL = res.CARD_BANK_URL
                    this.SINGLE_QUOTA = res.SINGLE_QUOTA
                    this.DAY_QUOTA = res.DAY_QUOTA
                })
            },
            reChangeHandele() { // 39查询用户是否已签约充值协议
                let data = {}
                API.reChange.apiRechargeProtoQuery(data, (res) => {
                    console.log(res);
                    if (res.SIGN_STATE == 'N') {
                        // 没写
                        this.write = false
                        this.page = false
                        this.agree1 = false
                    } else {
                        // 填写了
                        this.write = true
                        this.agree1 = true
                    }
                })
            },

            getCode() { // 获取充值协议码
                API.reChange.apiRechargeProtoCode({}, res => {
                    console.log(res);
                    this.PIN = res.PIN
                    this.agree1 = true
                    // this.page = false
                }, err => {
                    this.codeText = '重新发送'
                    this.disable = false
                    clearInterval(timer)
                })
            },
            getMsg() {
                let msg
                if (msg = util.Check.trim(this.APPLY_AMOUN, '充值金额')) return Bus.$emit(BusName.showToast, msg);
                //
                if (this.APPLY_AMOUN - 0 > this.SINGLE_QUOTA - 0) {
                    Bus.$emit(BusName.showToast, '充值金额大于银行每笔限额规定，请调整充值金额')
                    return
                }
                if (!this.agree) {
                    Bus.$emit(BusName.showToast, '请先同意充值协议')
                    return
                }
                let times = time
                this.disable = true
                timer = setInterval(() => {
                    if (times == 0) {
                        this.codeText = '重新发送'
                        this.disable = false
                        clearInterval(timer)
                        return
                    }
                    times--
                    this.codeText = `${times}s`
                }, 1000)
                this.getCode()
            },
            showPage() {
                this.page = true
            },
            doAgreeHandle() {
                this.agree = true
                this.page = false
            },
            cancel() {
                this.page = false
            },
            checkMoney() {
                if (this.APPLY_AMOUN - 0 > this.SINGLE_QUOTA - 0) {
                    Bus.$emit(BusName.showToast, '充值金额大于银行每笔限额规定，请调整充值金额')
                }
            },
            doNext() {
                console.log(this.write);
                let msg
                if (msg = util.Check.trim(this.APPLY_AMOUN, '充值金额')) return Bus.$emit(BusName.showToast, msg);
                if (this.APPLY_AMOUN - 0 > this.SINGLE_QUOTA - 0) {
                    Bus.$emit(BusName.showToast, '充值金额大于银行每笔限额规定，请调整充值金额')
                    return
                }
                if (!this.agree) {
                    Bus.$emit(BusName.showToast, '您还未签约充值协议')
                    return
                }
                if (!this.write) {
                    if (msg = util.Check.trim(this.msgCode, '手机验证码')) return Bus.$emit(BusName.showToast, msg);
                }
                if (!this.agree1) {
                    Bus.$emit(BusName.showToast, '请获取手机验证码')
                    return
                }
                this.Londing.open()
                setTimeout(() => {
                    this.Londing.close()
                    this.show = true
                }, 1000)
            },
            doAgree() {
                this.agree = !this.agree
            },
            doReCange() {
                this.pass = $('#payPass').$getCiphertext()
                this.len = $('#payPass').$getPasswordLength()
                let msg;
                if (msg = util.Check.payPassLen(this.len)) return Bus.$emit(BusName.showToast, msg);
                this.show = false
                let data = {
                    PHONE_CODE: this.msgCode, // todo
                    PIN: this.PIN,
                    BANK_PAY_PW: this.pass,
                    APPLY_AMOUNT: this.APPLY_AMOUN
                }

                API.reChange.apiRecharge(data, res => {
                    let params = {
                        BIZ_TYPE: '3',
                        BESHARP_SEQ: res.BESHARP_RECHARGE_SEQ
                    }
                    this.queryStatus({
                        text: '正在充值中',
                        data: params,
                        fn: (result) => {
                            util.storage.session.set(LsName.reload, true)
                            if ('1' == result.RES_CODE) {
                                clearInterval(timer)
                                Bus.$emit(BusName.showToast, result.RES_MSG);
                                this.$router.push({ // todo是否要跳转
                                    name: PageName.Rechargefailure,
                                    query: {
                                        err: result.RES_MSG
                                    }
                                })
                                // setTimeout(()=>{
                                //     this.Londing.close()
                                //     window.location.reload()
                                // },1000)
                            }
                            else if ('0' == result.RES_CODE) {
                                clearInterval(timer)
                                Bus.$emit(BusName.showToast, result.RES_MSG);
                                this.Londing.close()
                                this.$router.push({
                                    name: PageName.Rechargesuccess,
                                    query: {
                                        money: this.APPLY_AMOUN,
                                        ...res
                                    }
                                })
                                return
                            } else {
                                Bus.$emit(BusName.showToast, result.RES_MSG);
                                this.$router.push({
                                    name: PageName.Rechargefailure,
                                    query: {
                                        err: result.RES_MSG
                                    }
                                })
                                return
                            }
                        }
                    })
                }, err => {
                    util.storage.session.set(LsName.reload, true)
                    this.$router.push({
                        name: PageName.Rechargefailure,
                        query: {
                            err: err.RES_MSG
                        }
                    })
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .app .rechargetitle {
        padding-left: 0.5rem;
        height: 0.8rem;
        background: #F6F6F9;
        line-height: 0.8rem;
        color: #444444;
        font-size: 0.4rem;
    }

    .app .minshengbank {
        padding-left: 0.5rem;
        height: 1.8rem;
        line-height: 60px;
        font-size: 0.5rem;
    }

    .money {
        padding-left: 0.5rem;
        margin-top: .2rem;
        height: 1.7rem;
        color: #9199A1;
        font-size: 0.4rem;
    }

    .app .inputAmount {
        padding-left: 0.5rem;
        height: 1.2rem;
        line-height: 1rem;
        font-size: 0.4rem;
        border-bottom: 1px solid #EEEEF0;
        .button {
            vertical-align: middle;
            width: 2.5rem;
            display: inline-block;
            padding: .1rem;
            border: 1px solid #508CEE;
            color: #508CEE
        }
    }

    .inputAmount input {
        width: 50%;
        border: none;
        box-sizing: border-box;
        font-size: 0.4rem;
        color: #333;
        /* line-height: 0.5rem; */
        outline: none;

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

    .bang {
        margin-left: 0.5rem;
        margin-top: 0.5rem;
        background: url(../../assets/images/agree@3x.png) no-repeat 0 0.05rem;
        background-size: 0.4rem 0.4rem;
        font-size: 0.4rem;
        color: #808080;
        padding: 0 0.5rem;

    }

    .no {
        background: url(../../assets/images/onagree@3x.png) no-repeat 0 0.05rem;
        background-size: 0.4rem 0.4rem;
    }

    .minshengbankLogo {
        line-height: 100%;
        display: inline-block;
        height: 60%;
        width: 50px;
        float: left;
        padding-top: 0.4rem;
    }

    .page {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        z-index: 100;
        .docs {
            border: none;
            width: 100%;
            height: 90%;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            padding: 0 .2rem;
        }
        .indocs {
            border: none;
            width: 100%;
            height: 100%;
        }
        .btn {
            padding: 0 1rem;
            text-align: center;
            button {
                width: 3.5rem;
                margin-right: .4rem;
            }
        }
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
