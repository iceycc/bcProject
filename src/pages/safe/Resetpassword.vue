<template>
    <div id="app" class="app">
        <app-bar title="重置密码"></app-bar>
        <div class="opening_box">
            <section>
                <span>姓名</span>
                <input v-model="data.USER_REAL_NAME" type="text" name="text1" placeholder=" 请输入您的真实姓名">
                <!-- <span  class="limit">银行限额</span>  -->
            </section>
            <section>
                <span>身份证证号</span>
                <input v-model="data.USER_CARD_ID" type="text" name="text1" placeholder="请输入18位身份证号">
            </section>
            <section>
                <span>手机号</span>
                <input v-model="tel" type="number" name="text1" placeholder="请输入登录手机号">
            </section>
            <section>
                <span>新登录密码</span>
                <!--<div id="loginPass"-->
                <!--@click="getKey('loginPass')"-->
                <!--style="display: inline-block;color: #9e9e9e"-->
                <!--modulus-hex="9c4ebeacd2f30283df44853e59b1c825f1a95760c44f48db786560806431faccc8b54e19bc5f37ba54ffc2b138ba336b545e51a51e1b5b297e84e4149e4440f845f6d2ac44829aa301b742a30e28efa619bcd7d148a5ec819808ae3974b5fd7672a2df0fce835031f45b897cb82887de57a5247f1989d24ac79cbb1df678918b"-->
                <!--maxlength="20" name="Password">-->
                <!--请输入密码-->
                <!--</div>-->
                <pass-input
                        style="display:inline-block;color: #dedede"
                        inputID="loginPass"
                ></pass-input>
                <!--<input v-model="data.BANK_LOGIN_PW" type="password" class="newpassword" name="text1" style="width:72%"-->
                <!--placeholder="登录密码需包含8-20位数字，大小字母组成">-->
            </section>
            <section>
                <span>确认登录密码</span>
                <!--<div id="reLoginPass"-->
                <!--@click="getKey('reLoginPass')"-->
                <!--style="display: inline-block;color: #9e9e9e"-->
                <!--modulus-hex="9c4ebeacd2f30283df44853e59b1c825f1a95760c44f48db786560806431faccc8b54e19bc5f37ba54ffc2b138ba336b545e51a51e1b5b297e84e4149e4440f845f6d2ac44829aa301b742a30e28efa619bcd7d148a5ec819808ae3974b5fd7672a2df0fce835031f45b897cb82887de57a5247f1989d24ac79cbb1df678918b"-->
                <!--maxlength="20" name="Password">-->
                <!--请输入密码-->
                <!--</div>-->
                <pass-input
                        style="display:inline-block;color: #dedede"
                        inputID="reLoginPass"
                ></pass-input>
            </section>
            <section>
                <span>验证码</span>
                <input v-model="data.PHONE_CODE" type="password" style="width: 48%;" name="text1"
                       placeholder="请输入您的短信验证码">
                <button :disabled="disable" class="getpassword" @click="getCode">{{codeText}}</button>
            </section>
        </div>
        <div class="msg-err" v-if="errMsg">{{errMsg}}</div>
        <mt-button class="tijiao" @click="doRePass">重置密码</mt-button>
    </div>
</template>
<script>
    import util from '../../common/utils/util'
    import {API} from '../../service/api'
    import {LsName, BusName, PageName} from "../../Constant";
    import Bus from '../../plugin/bus'
    import PassInput from '../../components/commons/PassInput'
    import {Mixin} from '../../common/mixin/mixin'

    let time = 60
    export default {
        data() {
            return {
                data: {
                    USER_REAL_NAME: '', // 姓名
                    USER_CARD_ID: '', // idCard
                    PHONE_NUM: '', //tel
                    BANK_LOGIN_PW: '', // newpass
                    BANK_LOGIN_PW2: '',//
                    MESSAGE_TOKEN: '',
                    PHONE_CODE: '',

                },
                toUrl: "",
                errMsg: '',
                codeText: '获取验证码',
                disable: false,
                tel: ''
            }
        },
        watch: {
            tel(n, o) {
                if (n.length > 11) { // >11截取
                    console.log(n);
                    this.tel = n.toString().substr(0, 11)
                    return
                }
            }
        },
        mixins: [Mixin],
        components: {
            PassInput
        },
        created() {
            if (util.storage.session.get(LsName.reload)) {
                location.reload()
                util.storage.session.remove(LsName.reload)
            }
            let beforeInfo;
            if (beforeInfo = util.storage.session.get('rePasswordInfo')) {
                this.data = {
                    USER_REAL_NAME: beforeInfo.USER_REAL_NAME, // 姓名
                    USER_CARD_ID: beforeInfo.USER_CARD_ID, // idCard
                    PHONE_NUM: beforeInfo.PHONE_NUM, //tel
                }
                this.errMsg = beforeInfo.msg
                setTimeout(() => {
                    this.errMsg = ''
                }, 2000)
                util.storage.session.remove('rePasswordInfo')
            }
        },
        methods: {
            getCode() {
                this.data.PHONE_NUM = this.tel
                let msg
                if (msg = util.Check.tel(this.data.PHONE_NUM)) return Bus.$emit(BusName.showToast, msg)
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
                    PHONE_NUM: this.data.PHONE_NUM + '',
                    BIZ_TYPE: '9'
                }
                API.open.getMsgCode(data, res => {
                    this.data.MESSAGE_TOKEN = res.MESSAGE_TOKEN
                })
            },

            showErrMsg(msg){
                this.errMsg = msg;
                setTimeout(()=>{
                    this.errMsg = '';
                },2000)
            },
            doRePass() {
                this.data.PHONE_NUM = this.tel
                let msg;
                if (msg = util.Check.name(this.data.USER_REAL_NAME)) {
                   this.showErrMsg(msg)
                    return
                }
                if (msg = util.Check.idNumber(this.data.USER_CARD_ID)) {
                    this.showErrMsg(msg)
                    return
                }
                if (msg = util.Check.tel(this.data.PHONE_NUM)) {
                    this.showErrMsg(msg)
                    return
                }

                this.data.BANK_LOGIN_PW = $('#loginPass').$getCiphertext()
                this.data.BANK_LOGIN_PW_LEN = $('#loginPass').$getPasswordLength()
                this.data.BANK_LOGIN_PW2 = $('#reLoginPass').$getCiphertext()
                this.data.BANK_LOGIN_PW2_LEN = $('#reLoginPass').$getPasswordLength()
                if (msg = util.Check.trim(this.data.BANK_LOGIN_PW, ',密码')) {

                    this.showErrMsg(msg)
                    return
                }
                if (msg = util.Check.loginPassLen(this.data.BANK_LOGIN_PW_LEN)) {
                    this.showErrMsg(msg)
                    return
                }
                if (msg = util.Check.trim(this.data.BANK_LOGIN_PW2, ',密码')){
                    this.showErrMsg(msg)
                    return
                }
                if (msg = util.Check.loginPassLen(this.data.BANK_LOGIN_PW2_LEN)){
                    this.showErrMsg(msg)
                    return
                }
                if (msg = util.Check.trim(this.data.PHONE_CODE, '验证码')) {
                    this.showErrMsg(msg)
                    return
                }

                let data = {
                    ...this.data
                }
                let delMsg = true;
                API.safe.apiUserResetLoginPass(data, delMsg, res => {
                    Bus.$emit(BusName.showToast, '修改密码成功')
                    util.storage.session.remove(LsName.token)
                    util.storage.session.set(LsName.reload, true)
                    util.storage.session.remove('rePasswordInfo')
                    this.$router.replace({
                        name: PageName.login
                    })
                }, err => {
                    util.storage.session.set('rePasswordInfo', {
                        USER_REAL_NAME: this.data.USER_REAL_NAME, // 姓名
                        USER_CARD_ID: this.data.USER_CARD_ID, // idCard
                        PHONE_NUM: this.data.PHONE_NUM, //tel
                        msg: err
                    })
                    window.location.reload()
                })
            },
        }

    }
</script>

<style lang="scss" scoped>
    @import "../../assets/px2rem";

    .warp {
        width: 100%;
        position: relative;
    }

    .opening_box section {
        margin-left: 0.5rem;
        background-repeat: no-repeat;
        background-color: #fff;
        line-height: 1.3rem;
        width: 90%;
        background-size: 0.7rem 0.7rem;
        background-position: .2rem .2rem;
        border-bottom: 1px #E5E5E5 solid;
    }

    .opening_box section span {
        font-family: PingFangSC-Regular;
        color: #444444;
        font-size: 0.3rem;
        display: inline-block;
        width: 2rem;
    }

    .opening_box section .limit {
        background-image: url(../../assets/images/problom2@2x.png);
        background-size: 12px 12px;
        background-position: 0 2.5px;
        background-repeat: no-repeat;
        padding-left: 20px;
        color: #0096FE;
        font-family: PingFangSC-Regular;
    }

    .opening_box section .getpassword {
        display: inline-block;
        text-align: center;
        line-height: 1.3rem;
        color: #2B74FE;
        border-radius: 0.3rem;
        float: right;
    }

    .opening_box input {
        width: 50%;
        border: none;
        box-sizing: border-box;
        font-size: 14px;
        color: #333;
        outline: none;
        height: px2rem(20);
    }

    .tijiao {
        font-size: 0.4rem;
        color: #fff;
        background-color: #0096FE;
        border-radius: 0.2rem;
        line-height: 1.2rem;
        width: 80%;
        margin: 0 auto;
        text-align: center;
        margin-top: 0.5rem;
        border: 0px;
        outline: none;
        display: block;
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
