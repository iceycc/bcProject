<template>
    <div>
        <app-bar title="更换支付密码"></app-bar>
        <section class="m-form">
            <section class="m-line">
                <span class="n-left">姓名</span>
                <span class="n-right">{{Infos.USER_NAME}}</span>
            </section>
            <active-input check-type="idCard" valuePlaceholder="身份证号" v-model="IDCardNum" type="text"></active-input>
            <section class="m-line">
                <span class="n-left">手机号</span>
                <span class="n-right">{{tel}}</span>
            </section>
            <active-input valuePlaceholder="验证码" v-model="PHONE_CODE">
                <template slot="btn">
                    <button class="slot" @click="getMsgCode" :disabled="disable">{{codeText}}</button>
                </template>
            </active-input>
            <section class="submit-box">
                <err-msg :errMsg="errMsg" classStyle="err-msg"></err-msg>
                <button class="submit-btn" @click="goNext">下一步</button>
            </section>
        </section>

        <div v-if="ifShow" class="bgbox">
            <div class="passbox">
                <div class="top">
                    <p class="title">
                        <img src="@/assets/images/icon_dunpai@2x.png" alt="">
                        由晋商银行提供技术保障</p>
                    <div class="field_row_wrap">
                        <p class="field_row_key">
                            交易密码
                        </p>
                        <div class="field_row_value">
                            <pass-input
                                    inputID="reset_payPass"
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
                                    inputID="reset_repayPass"
                                    :doGetData="ifGet"
                            ></pass-input>
                        </div>

                        <p class="info">密码由6位数字组成</p>
                    </div>

                </div>
                <div class="btn">
                    <button @click="cancel">取消</button>
                    <button @click="submit">确定</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import ActiveInput from '@/components/form/ActiveInput'
    import ErrMsg from '@/components/commons/ErrMsg'
    import API from "@/service";
    import PassInput from '@/components/password/PassInput'
    import Bus from '@/plugin/bus'
    import {PageName, BusName, LsName} from "@/Constant";
    import util from "@/libs/util";
    import Mixins from "@/mixins";

    export default {
        name: "ResetPayPassword",
        components: {
            ActiveInput,
            ErrMsg,
            PassInput
        },
        data() {
            return {
                errMsg: '',
                ifShow: false,
                ifGet: false,
                disable: false,
                codeText: '获取验证码',
                time: 60,
                tel: '',
                IDCardNum: "",
                Infos: {
                    USER_NAME:'',
                },
                PHONE_CODE: '',
                MESSAGE_TOKEN:''
            }
        },
        mixins:[Mixins.reloadByPassWordErr],
        created() {
          this.getErrMsg((beforeInfo)=>{
                this.IDCardNum = beforeInfo.USER_CARD_ID
                this.errMsg = beforeInfo.msg
          })

            this.Infos =this.$store.getters.GET_COMMON_STATE.Infos || this.Infos
            // this.Infos = util.storage.session.get(LsName.Infos) || this.Infos
            this.tel = this.Infos.PHONE_NUM
        },
        methods: {
            goNext() {
                console.log(this.IDCardNum);
                let msg;
                if (msg = util.Check.idNumber(this.IDCardNum)) {
                    this.showErrMsg(msg)
                    return
                }
                if (!this.PHONE_CODE) {
                    this.showErrMsg('请填写短信验证码')
                    return
                }

                this.Londing.open()
                setTimeout(()=>{
                    this.ifShow = true
                    this.Londing.close()
                },300)
            },
            cancel() {
                this.ifShow = false
            },
            showErrMsg(msg){
                this.errMsg = msg;
                setTimeout(()=>{
                    this.errMsg = '';
                },2000)
            },
            submit() {

                // API.open.apiGetUserLastCompleteStep({
                //     ID_NUMBER:this.IDCardNum,
                // })
                let BANK_PAY_PW = $('#reset_payPass').$getCiphertext(),
                        reset_payPass_len = $('#reset_payPass').$getPasswordLength() - 0 || 0,
                        BANK_PAY_PW2 = $('#reset_repayPass').$getCiphertext(),
                        reset_repayPass_len = $('#reset_repayPass').$getPasswordLength() - 0 || 0;
                if(util.Check.payPassLen(reset_payPass_len,true)) return;
                if(util.Check.payPassLen(reset_repayPass_len,true)) return;
                let data = {
                    PHONE_CODE: this.PHONE_CODE,
                    USER_CARD_ID: this.IDCardNum,
                    BANK_PAY_PW: BANK_PAY_PW,
                    BANK_PAY_PW2: BANK_PAY_PW2,
                    MESSAGE_TOKEN:this.MESSAGE_TOKEN,
                    PHONE_NUM:this.tel
                }
                API.safe.apiUserResetPayPass(data, true,res=>{
                    Bus.$emit(BusName.showToast,'修改支付密码成功')
                    this.$router.push({
                        name:PageName.MoreService
                    })
                },err=>{
                    this.setErrMsg({
                      USER_CARD_ID: this.IDCardNum,
                      msg: err
                    })
                    // util.storage.session.set('rePayPasswordInfo', {
                    //     USER_CARD_ID: this.IDCardNum,
                    //     msg: err
                    // })
                    window.location.reload()
                })
                console.log(data);

            },
            getMsgCode() {
                let sTime = this.time
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
                    PHONE_NUM: this.tel + '',
                    BIZ_TYPE: '9', // 类型
                }
                API.open.getMsgCode(data, res => {
                    Bus.$emit(BusName.showToast, '验证码发送成功')

                    this.MESSAGE_TOKEN = res.MESSAGE_TOKEN
                    console.log(this.MESSAGE_TOKEN);
                }, err => {
                    clearInterval(timer)
                    this.codeText = '重新发送'
                    this.disable = false
                    console.log(err);
                })
            }

        },

    }
</script>

<style lang="scss" scoped>


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
            color: #8e8e8e
        }
    }

    .slot {
        position: absolute;
        display: inline-block;
        z-index: 3;
        right: 0;
        top:auto !important;
        bottom: px2rem(8);
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
