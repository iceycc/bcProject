<template>
    <div class="warp">
        <app-bar title="信息填写"></app-bar>

        <section class="wrapicon">
            <section class="circle">
                <span class="line1">
                    <img :src='stepImg' alt="">
                </span>
                <p class="step-text">开户信息验证</p>
            </section>
            <section class="circle">
                 <span class="line2">
                    <img :src='stepImg' alt="">
                </span>
                <p class="step-text">绑定银行卡</p>
            </section>

            <section class="circle">
                 <span class="line3 hui">
                    <img :src='stepImg3' alt="">
                </span>
                <p class="step-text" style="color:#D3D3D3">设置密码</p>
            </section>
        </section>

        <div class="opening_box">
            <p>
                <span>选择银行</span>
                <!--<input type="text" name="back" placeholder=" 请选择银行" v-model="data.ORG_ID">-->
                <!-- <span  class="limit">银行限额</span>  -->
                <Bank-select class="bank-box" :text="bankText" :options="bankList" @getValue="getBank"
                             title="银行列表"></Bank-select>

            </p>
            <p>
                <span> 绑定卡卡号</span>
                <input type="number" @change="checkBankNo(data.CARD_NO)" @input="checkBankName(data.CARD_NO)"
                       name="backname" placeholder="绑定卡卡号" v-model="data.CARD_NO">
            </p>
            <p>
                <span>手机号码</span>
                <input type="text" name="tel" placeholder="手机号码" v-model="data.PRE_PHONE_NUM">
            </p>
            <p style="display: flex">
                <span>验证码</span>
                <input type="password" placeholder="验证码" v-model="data.PHONE_CODE">
                <button class="msg-code" @click="getMsgCodeHandle" :disabled="disable">{{codeText}}</button>
            </p>
        </div>
        <div class="msg-err" v-if="errMsg">{{errMsg}}</div>
        <!-- <div class="tijiao Tips">请使用该预留手机号进行开户</div> -->
        <button class="tijiao" @click="goNext">下一步</button>
    </div>
</template>
<script>
    import {API} from "../../request/api";
    import {PageName, BusName, LsName} from "../../Constant";
    import {util} from "../../common/utils/util";
    import Bus from '../../common/js/bus'
    import BankSelect from '../../components/commons/BankSelect'
    import {imgSrc} from "../../Constant";

    let time = 60
    export default {
        data() {
            return {
                data: {
                    ORG_ID: '70',
                    CARD_NO: '', // 银行卡号 6214830182284272  6217730711297810
                    HAS_BAND: '0', // 是否绑定过
                    PHONE_NUM: '', // 15711310733   15011352818
                    PRE_PHONE_NUM: '', // 预留 这个是页面取的
                    PHONE_CODE: '', // 手机验证码
                    LAST_STEP_NUM: '0', // 步数
                    MESSAGE_TOKEN: ''
                },
                codeText: "获取验证码",
                disable: false,
                bankList: [],
                bank: '-1',
                bankText: '请选择银行',
                stepImg: require('../../images/img/account_icon_green2@2x.png'),
                stepImg2: require('../../images/img/step2@2x.png'),
                stepImg3: require('../../images/img/step3.png'),
                AllBankListObj: {},
                errMsg:''

            }
        },
        components: {
            BankSelect
        },
        created() {
            this.getBankList()
        },
        methods: {
            checkBankName(val) {
                val = val.replace(/\s+/g, "")
                let bankName
                for (var i = 3; i < 10; i++) {
                    if (bankName = this.machBankName((val + '').slice(0, i))) {
                        break
                    }
                }
                this.bankText = bankName
            },
            checkBankNo(val) {
                let reg = /^([1-9]{1})(\d{14}|\d{18})$/
                if (val == '') {
                    Bus.$emit(BusName.showToast, '银行卡号不能为空')
                    return
                }
                // if(!reg.test(val)){
                //     Bus.$emit(BusName.showToast,'银行卡号格式不正确')
                //     return
                // }

            },
            machBankName(pin) {
                return this.AllBankListObj[pin]
            },
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
            getMsgCodeHandle() {
                let msg
                if (msg = util.Check.tel(this.data.PRE_PHONE_NUM)) return Bus.$emit(BusName.showToast, msg)
                let sTime = time
                this.disable = true
                let timer = setInterval(() => {
                    if (sTime == 0) {
                        this.codeText = '重新发送'
                        this.disable = false
                        clearInterval(timer)
                        return
                    }
                    sTime--
                    this.codeText = `${sTime}s`
                }, 1000)

                let data = {
                    PHONE_NUM: this.data.PRE_PHONE_NUM,
                    BIZ_TYPE: '1',
                }
                API.open.getMsgCode(data, res => {
                    this.data.MESSAGE_TOKEN = res.MESSAGE_TOKEN
                }, err => {
                    console.log(err);
                })
            },

            goNext() {

                //  ORG_ID: '70',
                // CARD_NO: '6226221234123488', // 银行卡号 6214830182284272  6217730711297810
                //         HAS_BAND: '0', // 是否绑定过
                //         PHONE_NUM: '15621185521', // 15711310733   15011352818
                //         PRE_PHONE_NUM: '15621185521', // 预留
                //         PHONE_CODE: '', // 手机验证码
                //         LAST_STEP_NUM: '0', // 步数
                //         MESSAGE_TOKEN:''
                if (this.data.CARD_NO == '') {
                    Bus.$emit(BusName.showToast, '请选择银行')
                    return
                }
                if (this.data.CARD_NO == '') {
                    Bus.$emit(BusName.showToast, '请选择银行')
                    return
                }
                if (this.data.CARD_NO == '') {
                    Bus.$emit(BusName.showToast, '请选择银行')
                    return
                }
                if (this.data.CARD_NO == '') {
                    Bus.$emit(BusName.showToast, '请选择银行')
                    return
                }
                if (this.data.CARD_NO == '') {
                    Bus.$emit(BusName.showToast, '请选择银行')
                    return
                }
                if (this.data.PRE_PHONE_NUM == '') {
                    Bus.$emit(BusName.showToast, '手机号不能为空')
                    return
                }
                if (this.data.PHONE_CODE == '') {
                    Bus.$emit(BusName.showToast, '短信验证码不能为空')
                    return
                }
                if (this.data.MESSAGE_TOKEN == '') {
                    Bus.$emit(BusName.showToast, '短信验证码异常')
                    return
                }
                // util.storage.session.set(LsName.token,this.data.PRE_PHONE_NUM)
                let preData = this.$route.params.data
                this.data = Object.assign(this.data, preData)
                console.log('data >>>', this.data);
                Object.assign(this.data, {
                    PHONE_NUM: this.data.PRE_PHONE_NUM
                })
                API.open.doRegeist(this.data,
                        res => {
                            this.errMsg = res.MSG
                            API.watch.watchApi({
                                FUNCTION_ID: 'ptb0A004', // 点位
                                REMARK_DATA: '异业合作-开户-绑定银行卡', // 中文备注
                            })
                            // todo 判断
                            Bus.$emit(BusName.showToast, res.MSG)
                            if (res.CODE != 0) { // 不是0的话返回
                                return
                            }
                            this.$router.push({
                                name: PageName.opening3,
                                query: { // todo方便测试
                                    REQ_SERIAL: res.REQ_SERIAL
                                }
                            })
                        },
                        err => {
                            API.watch.watchApi({
                                FUNCTION_ID: 'ptb0A004', // 点位
                                REMARK_DATA: '异业合作-开户-绑定银行卡', // 中文备注
                            })
                            console.log(err);
                            this.disable = false
                        })
            }
        }

    }
</script>

<style lang="scss" scoped>
    @import "../../assets/px2rem";

    .warp {
        width: 100%;
        position: relative;
    }

    .opening_box p {
        margin-left: 0.6rem;
        line-height: 1.3rem;
        width: 90%;
        background-size: 0.7rem 0.7rem;
        border-bottom: 1px #E5E5E5 solid;
        display: flex;
    }

    .opening_box p span {
        font-family: PingFangSC-Regular;
        color: #444444;
        font-size: 0.4rem;
        display: inline-block;
        width: 2rem;
    }

    .opening_box p .limit {
        background-image: url(../../images/img/problom2@2x.png);
        background-size: 12px 12px;
        background-position: 0 2.5px;
        background-repeat: no-repeat;
        padding-left: 20px;
        color: #0096FE;
        font-family: PingFangSC-Regular;
    }

    .opening_box p .getpassword {
        margin-top: 0.3rem;
        float: right;
        display: inline-block;
        text-align: center;
        line-height: 0.7rem;
        font-size: 0.3rem;
        width: 2rem;
        height: 0.7rem;
        border: 1px solid #2B74FE;
        color: #2B74FE;
        border-radius: 0.2rem;
    }

    .opening_box input {
        flex: 1;
        padding-left: px2rem(6);
        border: none;
        box-sizing: border-box;
        font-size: 0.4rem;
        color: #333;
        line-height: 1.3rem;
        outline: none;
    }

    .tijiao {
        display: block;
        font-size: px2rem(16);
        color: #fff;
        background-color: #508CEE;
        border-radius: px2rem(4);
        line-height: 1rem;
        width: px2rem(255);
        height: px2rem(44);
        margin: px2rem(55) auto px2rem(20);
        text-align: center;
        border: none;
        outline: none;
    }

    .bank-box {
        display: inline-block;
        width: px2rem(160);
    }

    .msg-code {
        font-size: px2rem(13);
        width: px2rem(81);
        height: px2rem(26);
        line-height: px2rem(26);
        border: 1px solid #2B74FE;
        border-radius:px2rem(4);
        color: #2B74FE;
        margin-top: px2rem(10);
    }

    .wrapicon {
        text-align: center;
        display: flex;
        position: relative;
        margin-bottom: .3rem;
        .circle {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        .step-text {
            padding-top: px2rem(7);
        }

        .line1, .line2, .line3 {
            position: relative;
            img {
                width: .5rem;
            }
            &:after {
                display: block;
                position: absolute;
                top: 50%;
                right: 0;
                transform: translateY(-100%);
                content: '';
                width: 45%;
                background: #92d048;
                height: .1rem;
                overflow: hidden;

            }
        }
        .hui {
            &:after, &.line2:before {
                background: #dee1e3 !important;
            }

        }
        .line2 {
            &:after {
                left: 0;
                right: auto;
            }
            &:before {
                display: block;
                position: absolute;
                top: 50%;
                right: 0;
                transform: translateY(-100%);
                content: '';
                width: 45%;
                background: #92d048;
                height: .1rem;
                overflow: hidden;
            }
        }
        .line3 {
            &:after {
                left: 0;
                right: auto;
            }
        }

    }

    .msg-err {
        font-size: px2rem(12);
        color: #fff;
        background-color: #FF5B05;
        border-radius: px2rem(5);
        width: px2rem(204);
        height: px2rem(29);
        line-height: px2rem(29);
        margin: px2rem(20) auto 0;
        text-align: center;
    }


</style>
