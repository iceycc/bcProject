<template>
    <div id="app" class="warp">
        <app-bar title="信息填写"></app-bar>
        <div class="wrapicon">
            <div class="circle"><span>开户信息验证</span></div>
            <div class="circle"><span>绑定银行卡</span></div>
            <div class="circle"><span>设置密码</span></div>
        </div>
        <form action="">
            <div class="opening_box">
                <p>
                    <span>登录密码</span>
                    <input type="password" placeholder="请输入登录密码" v-model="s_loginPass" autocomplete="false" @focus="showBox">
                </p>
                <p>
                    <span>交易密码</span>
                    <input type="password" placeholder="请输入交易密码" v-model="s_payPass" autocomplete="false" @focus="showBox">
                </p>
            </div>
            <div class="tijiao Tips">登录密码需包含8-20位数字，大小字母组成</div>
            <button class="tijiao" @click="goOpen">开户</button>
        </form>
        <!--<pass-word :REQ_SERIAL="REQ_SERIAL"></pass-word>-->
        <div v-show="ifShow" class="bgbox">
            <div class="passbox">
                <p class="title">由晋商银行提供技术保障</p>
                <div class="field_row_wrap">
                    <p class="field_row_key">
                        登陆密码
                    </p>
                    <div class="field_row_value">
                        <div id="loginPass"
                             modulus-hex="9c4ebeacd2f30283df44853e59b1c825f1a95760c44f48db786560806431faccc8b54e19bc5f37ba54ffc2b138ba336b545e51a51e1b5b297e84e4149e4440f845f6d2ac44829aa301b742a30e28efa619bcd7d148a5ec819808ae3974b5fd7672a2df0fce835031f45b897cb82887de57a5247f1989d24ac79cbb1df678918b"
                             maxlength="20" name="Password">
                            请输入密码
                        </div>
                    </div>
                    <p class="info">密码由大写，小写英文字母以及数字组成</p>
                    <p class="info">密码位数大于等于8位，小于等于20位</p>
                </div>

                <div class="field_row_wrap">
                    <p class="field_row_key">
                        交易密码
                    </p>
                    <div class="field_row_value">
                        <div id="payPass"
                             modulus-hex="9c4ebeacd2f30283df44853e59b1c825f1a95760c44f48db786560806431faccc8b54e19bc5f37ba54ffc2b138ba336b545e51a51e1b5b297e84e4149e4440f845f6d2ac44829aa301b742a30e28efa619bcd7d148a5ec819808ae3974b5fd7672a2df0fce835031f45b897cb82887de57a5247f1989d24ac79cbb1df678918b"
                             maxlength="20" name="Password">
                            请输入密码
                        </div>
                    </div>
                    <p class="info">密码由数字组成，必须为6位</p>
                </div>
                <div class="btn">
                    <button @click="cancel">取消</button>
                    <button @click="subumit">提交</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {API} from "../../request/api";
    import {DeviceId} from "../../Constant";

    let base_url = 'http://47.94.4.11:8090/finsuit/openapi/jsBankPsw/getJpPsw'
    export default {
        data() {
            return {
                s_loginPass: '',
                s_payPass:'',
                REQ_SERIAL:'',
                ifShow:false,
                toUrl: '',
                orgId: 70,
                deviceId: DeviceId,
                loginpass: '',
                paypass: '',

            }
        },
        components:{
        },
        created(){
            this.REQ_SERIAL = this.$route.params.REQ_SERIAL || this.$route.params.seq
        },
        mounted() {
            this.toUrl = base_url + '?orgId=' + 70 + "&isPasswd=" + true + "&deviceId=" + this.deviceId + "&width=414"
            this.getKey('loginPass')
        },
        methods: {
            showBox(){
                this.ifShow = true
                this.getKey('payPass')
            },
            goOpen(){
                let data = {
                    REQ_SERIAL,
                    BANK_LOGIN_PW:this.s_loginPass,
                    BANK_PAY_PW:this.s_payPass
                }
                return
                API.open.setPassWord(data,(res)=>{
                    console.log(res);
                })
            },

            getKey(id) {
                $(`#${id}`).attr('v-password-widget', this.toUrl)
                $(`#${id}`).PasswordWidget()
            },
            cancel(){
                this.ifShow = false
            },
            subumit() {
                this.loginpass = $('#loginPass').$getCiphertext()
                // this.paypass = $('#payPass').$getCiphertext()
                let data = {
                    REQ_SERIAL: this.REQ_SERIAL,
                    BANK_LOGIN_PW: this.loginpass,
                    BANK_PAY_PW: this.paypass
                }
                console.log(data);
                API.open.setPassWord(data, (res) => {
                    console.log(res);
                })
            }

        }

    }
</script>

<style lang="scss" scoped>

    .bgbox{
        z-index: 999;
        width: 100%;
        height: 100%;
        background: #9e9e9e;
        position: fixed;
        padding-top: 0.7rem;
        top: 0;
        left: 0;
        .passbox{
            background: #fff;
            width: 80%;
            margin: 0 auto;
            padding: 0.4rem;
            box-sizing: border-box;
        }
        .field_row_key{
            font-size: 0.4rem;
        }
        .title{
            margin-bottom: 0.5rem;
            text-align: center;
            font-size: 0.4rem;
            color: #666;
        }
        .field_row_wrap{
            margin-bottom: 0.2rem;
        }
        .field_row_value{
            border-radius: 4px;
            border: 1px solid #9e9e9e;
            height: 0.9rem;
            line-height: 0.9rem;
            margin: 0.2rem 0;
        }
        .info{
            font-size: 0.3rem;
            line-height: 0.6rem;
            color: #aeaeae;
        }
        .btn{
            display: flex;
            button{
                text-align: center;
                flex: 1;
                font-size: 0.4rem;
                color: #11cdcd;
            }
        }
    }

    .warp {
        width: 100%;
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

    .return {
        display: block;
        position: absolute;
        left: 0.4rem;
        top: 0.2rem;
        background-image: url(../../images/img/back@2x.png);
        background-size: cover;
        width: 0.3rem;
        height: 0.9rem;
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

    .circle {
        position: relative;
        z-index: 2;
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 50%;
        border: 1px solid #7ED321;
        box-sizing: border-box;
        background: radial-gradient(#7ED321 50%, #7ED321 50%);
        white-space: nowrap;
    }

    .wrapicon {
        position: relative;
        margin: 1rem auto 0.8rem;
        display: flex;
        width: 80%;
        justify-content: space-between;
    }

    .wrapicon:before {
        position: absolute;
        top: 50%;
        left: 0;
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #7ED321;
    }

    .circle span {
        position: absolute;
        left: -0.5rem;
        top: 0.5rem;
        font-size: .4rem;
    }
</style>
