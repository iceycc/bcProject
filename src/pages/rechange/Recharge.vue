<template>
    <div class="app">
        <app-bar title="充值"></app-bar>
        <div class="rechargetitle">充值到民生直销银行</div>
        <div class="minshengbank">
            <span class="minshengbankLogo"><img src="../../images/img/Payingbankicon@2x.png" style="width:75%"
                                                alt=""></span>
            民生直销银行
        </div>
        <div class="rechargetitle">银行卡</div>
        <div class="minshengbank" style="border-bottom:1px solid #EEEEF0">
            <span class="minshengbankLogo" style=" padding-top: 10px;"><img src="../../images/img/beijingbank@2x.png"
                                                                            style="width:75%" alt=""></span>
            北京银行
        </div>
        <div class=" money">
            <p>每笔限额：10000.00元</p>
            <p>每日限额：200000.00元</p>
        </div>
        <div class="inputAmount"><span class="Amount">金额</span> <input v-model="APPLY_AMOUN" type="text"
                                                                       placeholder="请输入金额"></div>
        <button class="tijiao" @click="doNext">确认充值</button>
        <p class="bang">我已阅读并同意注册<span style=" color:#0096FE;">《充值协议》</span></p>
        <section v-show="page" class="page">
            <div v-html="html"></div>
            <mt-button @click="getCode">确认</mt-button>
        </section>

        <div v-show="show"
             class="field_row_wrap" style="padding: 0.4rem">
            <p class="field_row_key"
               style='font-size: 0.3rem'>
                交易密码
            </p>
            <div class="field_row_value"
                 style="border: 1px solid #aeaeae;height: .8rem">
                <div id="payPass"
                     modulus-hex="9c4ebeacd2f30283df44853e59b1c825f1a95760c44f48db786560806431faccc8b54e19bc5f37ba54ffc2b138ba336b545e51a51e1b5b297e84e4149e4440f845f6d2ac44829aa301b742a30e28efa619bcd7d148a5ec819808ae3974b5fd7672a2df0fce835031f45b897cb82887de57a5247f1989d24ac79cbb1df678918b"
                     maxlength="20" name="Password">
                    请输入密码
                </div>
            </div>
            <p class="info">密码由数字组成，必须为6位</p>
            <mt-button @click="doReCange">确认支付</mt-button>
        </div>
    </div>
</template>
<script>
    import {API} from "../../request/api";
    import AppBar from '../../components/header/AppBar'

    let base_url = 'http://47.94.4.11:8090/finsuit/openapi/jsBankPsw/getJpPsw'
    import {DeviceId, PageName} from "../../Constant";
    import PassInput from '../../components/commons/PassInput'

    export default {
        data() {
            return {
                show: true,
                html: '协议',
                page: false,
                PIN: '',
                APPLY_AMOUN: '',
                toUrl: ''

            }
        },
        components: {
            AppBar,
            PassInput
        },
        created() {
            this.reChangeHandele()
        },
        mounted() {
            this.toUrl = base_url + '?orgId=' + 70 + "&isPasswd=" + true + "&deviceId=" + DeviceId + "&width="
        },
        methods: {
            reChangeHandele() { // 39查询用户是否已签约充值协议
                let data = {}
                API.reChange.apiRechargeProtoQuery(data, (res) => {
                    console.log(res);
                    if (res.SIGN_STATE == 'N') {
                        this.page = true
                    }
                })
            },

            getCode() { // 获取充值协议码
                API.reChange.apiRechargeProtoCode({}, res => {
                    console.log(res);
                    this.PIN = res.PIN
                    this.page = false
                })
            },
            doNext() {
                this.show = true
                $('#payPass').attr('v-password-widget', this.toUrl)
                $('#payPass').PasswordWidget()
            },
            doReCange() {
                let pass = $('#payPass').$getCiphertext()

                let data = {
                    PHONE_CODE: '111111',
                    PIN: this.PIN,
                    BANK_PAY_PW: pass,
                    APPLY_AMOUNT: this.APPLY_AMOUN
                }
                API.reChange.apiRecharge(data, res => {
                    this.$router.push({
                        name:PageName.Rechargesuccess,
                        query:{
                            money:this.APPLY_AMOUN,
                                ...res
                        }
                    })
                })
            }
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
        height: 1.7rem;
        color: #9199A1;
        font-size: 0.4rem;
    }

    .app .inputAmount {
        padding-left: 0.5rem;
        height: 1.2rem;
        line-height: 1rem;
        font-size: 0.4rem;
        border-top: 0.4rem solid #EEEEF0;
        border-bottom: 1px solid #EEEEF0;
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
        background-image: url(../../images/img/agree@3x.png);
        font-size: 0.4rem;
        color: #808080;
        background-repeat: no-repeat;
        background-size: 0.3rem 0.3rem;
        padding: 0 0.5rem;
        background-position: 0 0.2rem;
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
        background: #ccc;
        z-index: 999;
    }
</style>
