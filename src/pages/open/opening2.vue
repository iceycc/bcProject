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
            <section class="bank">
                <span style="padding-right: 5px">选择银行</span>
                <!--<input type="text" name="back" placeholder=" 请选择银行" v-model="data.ORG_ID">-->
                <!-- <span  class="limit">银行限额</span>  -->
                <Bank-select class="bank-box" :text="bankText" :options="bankList" @getValue="getBank"
                             title="银行列表"></Bank-select>

            </section>
            <section class="input-box">
                <p> 绑定卡卡号</p>
                <input type="number" @change="checkBankNo(data.CARD_NO)" @input="checkBankName(data.CARD_NO)"
                       name="backname" placeholder="绑定卡卡号" v-model="data.CARD_NO">
            </section>
            <section class="input-box">
                <p>手机号码</p>
                <input type="text" name="tel" placeholder="银行预留手机号" v-model="tel">
            </section>
            <section class="input-box">
                <p>验证码</p>
                <section style="display: flex">
                    <input type="text" placeholder="验证码" v-model="data.PHONE_CODE">
                    <button class="msg-code" @click="getMsgCodeHandle" :disabled="disable">{{codeText}}</button>
                </section>
            </section>
        </div>
        <!--errMsg-->
        <div class="msg-err" v-if="errMsg">
            <span>{{errMsg}}</span>
        </div>
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
                    LAST_STEP_NUM: '', // 步数
                    MESSAGE_TOKEN: '',
                    REQ_SERIAL: ''
                },
                tel: '',
                canClick: true,
                codeText: "获取验证码",
                disable: false,
                bankList: [],
                bank: '-1',
                bankText: '请选择银行',
                stepImg: require('../../images/img/account_icon_green2@2x.png'),
                stepImg2: require('../../images/img/step2@2x.png'),
                stepImg3: require('../../images/img/step3.png'),
                AllBankListObj: {},
                errMsg: '',
                checkBankName1: false
            }
        },
        components: {

            BankSelect
        },
        watch: {
            tel(n, o) {
                if (n.length > 11) { // >11截取
                    console.log(n);
                    this.tel = n.toString().substr(0, 11)
                }
            },
            bankText(n, o) {

                this.checkBankName(this.data.CARD_NO)
            }
        },
        filters: {
            telFlter(n) {
                if (n.length > 11) { // >11截取
                    return n.toString().substr(0, 11)
                }
            }
        },
        created() {
            this.data.REQ_SERIAL = this.$route.query.REQ_SERIAL
            this.data.LAST_STEP_NUM = this.$route.query.LAST_STEP_NUM
            this.tel = this.$route.query.PHONE_NUM || ''
            this.getBankList()
        },
        methods: {
            checkBankName(val) {
                // if(this.bankText == '请选择银行'){
                //     Bus.$emit(BusName.showToast, '请选择银行')
                //     return
                // }
                this.checkBankName1 = false
                // if(val.length <=6){
                //     this.canClick = true
                //     return
                // }
                val = val.replace(/\s+/g, "")
                // console.log(this.canClick);
                let bankName
                // if(bankName =='请选择银行'){
                //     Bus.$emit(BusName.showToast, '请选择银行')
                //     this.checkBankName1 = true
                //     return
                // }
                for (var i = 3; i < 10; i++) {
                    if (bankName = this.machBankName((val + '').slice(0, i))) {

                        if (bankName != this.bankText) {
                            // Bus.$emit(BusName.showToast, '您输入的银行卡号和选择的银行名称不匹配')
                            this.checkBankName1 = true
                            return
                        }
                        break
                    }
                }
                // this.canClick = false
                // this.bankText = bankName
            },
            checkBankNo(val) {
                val = val.toString()
                let reg = /\d{15}|\d{19}/
                console.log(!reg.test(val));
                if (val == '') {
                    Bus.$emit(BusName.showToast, '银行卡号不能为空')
                    return true
                }
                else if (val.length < 15 || val.length > 19) {
                    Bus.$emit(BusName.showToast, '银行卡号格式不正确')
                    return true
                } else {
                    return false
                }

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
                this.data.PRE_PHONE_NUM = this.tel + ''
                console.log(this.data.PRE_PHONE_NUM);
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
                    Bus.$emit(BusName.showToast, '验证码发送成功')
                    this.data.MESSAGE_TOKEN = res.MESSAGE_TOKEN
                }, err => {
                    console.log(err);
                })
            },
            checkID(fn) {
                // 回显
                let getStepDatas = {
                    ID_NUMBER: this.$route.params.data.USER_CARD_ID
                }

                API.open.apiGetUserLastCompleteStep(getStepDatas, res => {
                    let step = res.LAST_STEP_NUM
                    let REQ_SERIAL = res.REQ_SERIAL
                    // let PHONE_NUM = res.PHONE_NUM ||'' // 改身份证是否有手机号回显
                    console.log('步数 >>>', step);
                    // if (step == 0) {
                    //     // Bus.$emit(BusName.showToast,"欢迎注册")
                    //     fn && fn(REQ_SERIAL, step,PHONUM_NUM)
                    // }
                    // if (step == 1) { //
                    //     // PHONUM_NUM
                    //     // Bus.$emit(BusName.showToast,"第二步")
                    //     fn && fn(REQ_SERIAL, step,PHONUM_NUM)
                    // }
                    if (step == 2) { // 跳转设置密码页
                        // Bus.$emit(BusName.showToast, "您已经实名成功")
                        setTimeout(() => {
                            this.$router.push({
                                name: PageName.opening3,
                                params: {
                                    step
                                },
                                query: {
                                    REQ_SERIAL: REQ_SERIAL
                                }
                            })
                        }, 600)
                    }
                    if (step == 3) {
                        // Bus.$emit(BusName.showToast, "您已经开户成功")
                        setTimeout(() => {
                            this.$router.push({
                                name: PageName.login,
                            })
                        }, 1000)
                    }

                }, err => {
                    console.log(err);
                })
            },
            goNext() {
                this.data.PRE_PHONE_NUM = this.tel
                console.log(this.data.PRE_PHONE_NUM);
                //  ORG_ID: '70',
                // CARD_NO: '6226221234123488', // 银行卡号 6214830182284272  6217730711297810
                //         HAS_BAND: '0', // 是否绑定过
                //         PHONE_NUM: '15621185521', // 15711310733   15011352818
                //         PRE_PHONE_NUM: '15621185521', // 预留
                //         PHONE_CODE: '', // 手机验证码
                //         LAST_STEP_NUM: '0', // 步数
                //         MESSAGE_TOKEN:''
                if (this.bankText == '请选择银行') {
                    Bus.$emit(BusName.showToast, '请选择银行')
                    return
                }
                if (this.data.CARD_NO == '') {
                    Bus.$emit(BusName.showToast, '银行卡号不能为空')
                    return
                }
                if (this.checkBankName1) {
                    Bus.$emit(BusName.showToast, '您输入的银行卡号和选择的银行名称不匹配')
                    return
                }
                if (this.checkBankNo(this.data.CARD_NO)) {
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
                let REQ_SERIAL = util.storage.session.get(LsName.REQ_SERIAL)
                let LAST_STEP_NUM = util.storage.session.get(LsName.LAST_STEP_NUM)
                if (REQ_SERIAL && LAST_STEP_NUM) {
                    this.data.REQ_SERIAL = REQ_SERIAL
                    this.data.LAST_STEP_NUM = LAST_STEP_NUM
                }
                this.data.PHONE_NUM = this.data.PRE_PHONE_NUM
                let delMsg = true
                let OTHER = true  // 用于特殊处理，code ==1 且 REQ_SERIAL和LAST_STEP_NUM有值说明 第一步成功第二步未成功
                API.open.doRegeist(this.data, delMsg, OTHER,
                        res => {
                            clearInterval(timer)
                            this.Londing.close()
                            this.errMsg = res.MSG
                            setTimeout(()=>{
                                this.errMsg = ''
                            },2000)
                            API.watch.watchApi({
                                FUNCTION_ID: 'ptb0A004', // 点位
                                REMARK_DATA: '异业合作-开户-绑定银行卡', // 中文备注
                            })
                            // Bus.$emit(BusName.showToast, res.MSG)
                            if (res.CODE != 0) { // 不是0的话返回
                                return
                            }
                            this.$router.push({
                                name: PageName.opening3,
                                query: { // todo方便测试
                                    REQ_SERIAL: res.REQ_SERIAL,
                                }
                            })
                        },
                        err => {
                            API.watch.watchApi({
                                FUNCTION_ID: 'ptb0A004', // 点位
                                REMARK_DATA: '异业合作-开户-绑定银行卡', // 中文备注
                            })
                            this.errMsg = err
                            setTimeout(()=>{
                                this.errMsg =''
                            },2000)
                            console.log(err);
                            this.disable = false
                        })
                let conut = 0
                let timer = setInterval(() => {
                    conut++
                    console.log(conut);
                    if (conut == 6) {
                        this.Londing.close()
                        clearInterval(timer)
                        return
                    }
                    this.Londing.open()
                    this.checkID()
                }, 5000)
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

    .opening_box {
        .bank {
            margin-left: 0.6rem;
            line-height: 1.3rem;
            width: 90%;
            background-size: 0.7rem 0.7rem;
            border-bottom: 1px #E5E5E5 solid;
            display: flex;
        }
        .input-box {
            margin-left: 0.6rem;
            width: 90%;
            background-size: 0.7rem 0.7rem;
            border-bottom: 1px #E5E5E5 solid;
            p {
                font-size: px2rem(12);
                font-family: PingFangSC-Regular;
                color: #858E9F;
                padding-bottom: 0;
                padding-top: px2rem(15);
            }
            input {
                font-size: px2rem(20);
                color: #333

            }
        }
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
        vertical-align: middle;
    }

    .msg-code {
        vertical-align: middle;
        font-size: px2rem(13);
        width: px2rem(100);
        height: px2rem(26);
        line-height: px2rem(26);
        border: 1px solid #2B74FE;
        border-radius: px2rem(4);
        color: #2B74FE;
        margin-bottom: px2rem(10);
    }

    .wrapicon {
        text-align: center;
        display: flex;
        position: relative;
        margin-bottom: .3rem;
        margin-top: px2rem(4);
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
        text-align: center;
        margin: px2rem(20) auto 0;
        span {
            display: inline-block;
            min-width: px2rem(200);
            font-size: px2rem(12);
            color: #fff;
            background-color: #FF5B05;
            border-radius: px2rem(5);
            height: px2rem(29);
            line-height: px2rem(29);
            padding: 0 px2rem(10);
        }
    }


</style>
