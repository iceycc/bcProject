<template>
    <div class="warp">
        <app-bar title="信息填写"></app-bar>
        <section class="wrapicon">
            <section class="circle">
                <span class="line1">
                    <img :src='stepImg' alt="">
                </span>
                <p>开户信息验证</p>
            </section>
            <section class="circle">
                 <span class="line2">
                    <img :src='stepImg' alt="">
                </span>
                <p>绑定银行卡</p>
            </section>

            <section class="circle">
                 <span class="line3">
                    <img :src='stepImg' alt="">
                </span>
                <p>设置密码</p>
            </section>
        </section>
        <form action="">
            <div class="opening_box">
                <p>
                    <span>登录密码</span>
                    <input type="password" placeholder="请输入登录密码" v-model="s_loginPass" autocomplete="false"
                           @focus="showBox">
                </p>
                <p>
                    <span>交易密码</span>
                    <input type="password" placeholder="请输入交易密码" v-model="s_payPass" autocomplete="false"
                           @focus="showBox">
                </p>
            </div>
            <div class="tijiao Tips" v-if="errMsg">{{errMsg}}</div>
            <button class="tijiao" @click="showBox">开户</button>
        </form>
        <div v-if="ifShow" class="bgbox">
            <div class="passbox">
                <p class="title">
                    <img src="../../images/img/icon_dunpai@2x.png" alt="">
                    由晋商银行提供技术保障</p>
                <div class="field_row_wrap">
                    <p class="field_row_key">
                        登陆密码
                    </p>
                    <div class="field_row_value">
                        <pass-input
                                inputID="loginPass"
                                :doGetData="ifGet"
                        ></pass-input>
                    </div>
                    <p class="info">密码由大写，小写英文字母以及数字组成</p>
                    <p class="info">密码位数大于等于8位，小于等于20位</p>
                </div>

                <div class="field_row_wrap">
                    <p class="field_row_key">
                        交易密码
                    </p>
                    <div class="field_row_value">
                        <pass-input
                                inputID="payPass"
                                :doGetData="ifGet"
                        ></pass-input>
                    </div>

                    <p class="info">密码由数字组成，必须为6位</p>
                </div>
                <div class="btn">
                    <mt-button @click="cancel" type="primary">取消</mt-button>
                    <mt-button @click="subumit" type="primary">提交</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {API} from "../../request/api";
    import Bus from '../../common/js/bus'
    import PassInput from '../../components/commons/PassInput'
    import {BusName, LsName, PageName} from "../../Constant";
    import {util} from "../../common/utils/util";

    export default {
        data() {
            return {
                reGet: true,
                s_loginPass: '',
                s_payPass: '',
                REQ_SERIAL: '',
                ifShow: false,
                orgId: 70,
                loginpass: '',
                loginpassLen: 0,
                paypass: '',
                paypassLen: 0,
                ifGet: false,
                stepImg: require('../../images/img/account_icon_green2@2x.png'),
                stepImg2: require('../../images/img/step2@2x.png'),
                stepImg3: require('../../images/img/step3.png'),
                errMsg:''

            }
        },
        components: {
            PassInput
        },
        created() {
            this.REQ_SERIAL = this.$route.query.REQ_SERIAL || this.$route.params.seq
            let beforeInfo;
            if(beforeInfo = util.storage.session.get('setPasswordInfo')){
                this.errMsg = beforeInfo.msg
                util.storage.session.remove('setPasswordInfo')
            }

        },
        destroyed() {

        },

        methods: {
            showBox() {
                this.Londing.open()
                setTimeout(() => {
                    this.Londing.close()
                    this.ifShow = true
                }, 500)
            },

            cancel() {
                this.ifShow = false
            },
            subumit() {
                API.watch.watchApi({
                    FUNCTION_ID: 'ptb0A005', // 点位
                    REMARK_DATA: '异业合作-开户-设置密码', // 中文备注
                })
                this.Londing.open()
                setTimeout(() => {
                    this.Londing.close()
                }, 500)
                this.paypass = $('#payPass').$getCiphertext()
                this.paypassLen = $('#payPass').$getPasswordLength()
                this.loginpass = $('#loginPass').$getCiphertext()
                this.loginpassLen = $('#loginPass').$getPasswordLength()
                let msg;
                if(msg=util.Check.loginPassLen(this.loginpassLen)) return Bus.$emit(BusName.showToast,msg);
                if(msg=util.Check.payPassLen(this.paypassLen)) return Bus.$emit(BusName.showToast,msg);


                let data = {
                    REQ_SERIAL: this.REQ_SERIAL,// BCS2018206470823115514961
                    BANK_LOGIN_PW: this.loginpass,
                    BANK_PAY_PW: this.paypass
                }
                API.open.setPassWord(data, res => {
                    // todo
                    Bus.$emit(BusName.showToast, '注册成功')
                    util.storage.session.remove(LsName.token)
                    this.$router.replace({
                        name: PageName.login
                    })
                }, err => {
                    this.ifShow = false
                    util.storage.session.set('setPasswordInfo',{
                        msg:err
                    })
                    setTimeout(() => {
                        window.location.reload()
                    }, 500)
                })

            }

        }

    }
</script>

<style lang="scss" scoped>

    .bgbox {
        width: 100%;
        height: 100%;
        background: rgba(1, 1, 1, .7);
        position: absolute;
        padding-top: 0.7rem;
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

    .warp {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .header {
        background-color: #fff;
        height: 1.3rem;
        line-height: 1.3rem;
        font-size: 0.4rem;
        border-bottom: 1px solid #e6e6e6;
    }

    .header p {
        text-align: center;
        font-size: 0.5rem;
    }



    .opening_box p {
        margin-left: 0.533333rem;
        background-repeat: no-repeat;
        background-color: #fff;
        line-height: 1.2rem;
        width: 90%;
        background-position: 0.2rem 0.3rem;
        border-bottom: 1px #E5E5E5 solid;
    }

    .opening_box p span {
        font-family: PingFangSC-Regular;
        color: #444444;
        font-size: 14px;
        display: inline-block;
        width: 80px;
    }

    .opening_box p .limit {
        color: #0096FE;
        font-family: PingFangSC-Regular;
    }

    .opening_box p .getpassword {
        display: inline-block;
        text-align: center;
        line-height: 30px;
        font-size: 14px;
        width: 80px;
        height: 30px;
        border: 1px solid #2B74FE;
        color: #2B74FE;
        border-radius: 6px;
    }

    .opening_box input {
        width: 50%;
        border: none;
        box-sizing: border-box;
        font-size: 14px; /*px*/
        color: #333;
        line-height: 40px;
        outline: none;
    }

    .tijiao {
        font-size: 0.4rem;
        color: #fff;
        background-color: #0096FE;
        border-radius: 0.2rem;
        line-height: 1rem;
        width: 85%;
        margin: 0 auto;
        text-align: center;
        margin-top: 0.5rem;
        /* border: 0px; */
        outline: none;
        display: block;
    }

    .Tips {
        margin-top: 0.533333rem;
        background-color: #FF5B05;
        width: 90%;
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
</style>
