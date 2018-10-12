<template>
    <div>
        <app-bar title="更换手机号"></app-bar>
        <section class="m-form">
            <section class="m-line">
                <span class="n-left">原手机号</span>
                <span class="n-right">{{tel}}</span>
            </section>
            <active-input valuePlaceholder="新手机号" v-model="params.PHONE_NUM"></active-input>
            <active-input valuePlaceholder="验证码" v-model="params.PHONE_CODE">
                <template slot="btn">
                    <button class="slot" @click="getMsgCode" :disabled="disable">{{codeText}}</button>
                </template>
            </active-input>
            <section class="submit-box">
                <err-msg :errMsg="errMsg" classStyle="err-msg"></err-msg>
                <button class="submit-btn" @click="goNext">提交</button>
            </section>
            <section class="foot-text">
                <p>温馨提示：</p>
                <p>更换手机号之前，请您确认新手机号与绑定的银行卡的预留手机号相同，如果不同请先更换绑定银行卡的预留手机号。</p>
            </section>
        </section>
    </div>
</template>

<script>
    import ActiveInput from '../../components/commons/ActiveInput'
    import ErrMsg from '../../components/commons/ErrMsg'
    import {API} from "../../service/api";
    import Bus from '../../plugin/bus'
    import {PageName, BusName, LsName} from "../../Constant";
    import {util} from "../../common/utils/util";

    export default {
        name: "ResetPhone",
        components: {
            ActiveInput,
            ErrMsg
        },
        data() {
            return {
                errMsg: '',
                params:{
                    PHONE_NUM:'',
                    PHONE_CODE:'',
                    MESSAGE_TOKEN:''
                },
                tel:'',
                disable:false,
                codeText:'获取验证码',
                time:60
            }
        },
        created() {
            this.tel = util.storage.session.get(LsName.Infos).PHONE_NUM
        },
        methods: {
            goNext() {
                let msg;
                if (msg = util.Check.tel(this.params.PHONE_NUM)) {
                    this.showErrMsg(msg)
                    return
                }
                if (!this.params.MESSAGE_TOKEN) {
                    this.showErrMsg('请获取短信验证码')
                    return
                }
                if (!this.params.PHONE_CODE) {
                    this.showErrMsg('请填写短信验证码')
                    return
                }
                let data = {
                    PHONE_NUM:this.params.PHONE_NUM,
                    PHONE_CODE:this.params.PHONE_CODE,
                    MESSAGE_TOKEN:this.params.MESSAGE_TOKEN,
                }
                API.safe.apiChangePhoneNum(data,true,res=>{
                    Bus.$emit(BusName.showToast,'更换手机号成功，请重新登陆')
                    // 是否应该
                    util.storage.session.remove(LsName.token)
                    util.storage.session.remove(LsName.Infos)
                    util.storage.session.set(LsName.loginType,PageName.BankDetail)
                    this.$router.push({
                        name:PageName.login
                    })
                },err=>{
                    this.showErrMsg(err)
                })
            },
            showErrMsg(msg){
                this.errMsg = msg;
                setTimeout(()=>{
                    this.errMsg = '';
                },2000)
            },
            // 15621118888
            getMsgCode(){
                let sTime = this.time
                this.disable = true
                let timer = setInterval(()=>{
                    if(sTime == 0 ){
                        this.codeText = '重新发送'
                        this.disable = false
                        clearInterval(timer)
                        return
                    }
                    sTime--
                    this.codeText = `${sTime}s`
                },1000)
                let data = {
                    PHONE_NUM: this.tel + '',
                    BIZ_TYPE: '10', //
                }
                API.open.getMsgCode(data, res => {
                    Bus.$emit(BusName.showToast, '验证码发送成功')
                    this.params.MESSAGE_TOKEN = res.MESSAGE_TOKEN
                }, err => {
                    clearInterval(timer)
                    this.codeText = '重新发送'
                    this.disable = false
                    console.log(err);
                })
            },

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