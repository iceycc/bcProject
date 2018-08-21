<template>
    <div id="app" class="hello">
        <header class="header">
            <a class="return" href=""></a>
            <p>安全登录</p>
        </header>
        <p class="titlecontent">欢迎登录晋商银行直销账户</p>
        <div class="login_box">
            <p><input type="text" name="text1" placeholder="开户手机号" v-model="tel"></p>
            <!--<p><input type="password" name="text1" placeholder="登录密码" v-model="pass"></p>-->
            <!--密码控件-->
            <div class="field_row_wrap" style="padding: 0 .5rem;">
                <div class="field_row_key"
                style="font-size: 0.5rem;padding-top: .1rem"
                     @click="getPass">
                    登陆密码
                </div>
                <div class="field_row_value" style="width: 100%;height: 2rem;border-bottom: 1px #E5E5E5 solid;">
                    <div id="loginPass"
                         style="height: 2rem;line-height: 2rem;color: #ccc"
                         modulus-hex="9c4ebeacd2f30283df44853e59b1c825f1a95760c44f48db786560806431faccc8b54e19bc5f37ba54ffc2b138ba336b545e51a51e1b5b297e84e4149e4440f845f6d2ac44829aa301b742a30e28efa619bcd7d148a5ec819808ae3974b5fd7672a2df0fce835031f45b897cb82887de57a5247f1989d24ac79cbb1df678918b"
                         maxlength="20" name="Password">
                        请输入密码
                    </div>
                </div>
            </div>

            <span class="forget">忘记密码？</span>
            <mt-button class="tijiao" @click="doLogin">登录</mt-button>
            <div class="lijizhuce">
                <span>还未开户，立即注册</span>
            </div>
        </div>
        <div class="bottomcontent">
            <p>晋商银行已与比财实现安全直连</p>
        </div>
    </div>
</template>
<script>
    import util from '../../common/utils/util'
    import {API} from '../../request/api'
    import {LsName,DeviceId} from "../../Constant";
    let base_url = 'http://47.94.4.11:8090/finsuit/openapi/jsBankPsw/getJpPsw'
    export default {
        data(){
            return {
                tel:'',
                pass:'',
                toUrl:"",
            }
        },
        created(){
            // 15011352818
            // lydong09
        },
        mounted(){
            this.toUrl = base_url + '?orgId=' + 70 + "&isPasswd=" + true + "&deviceId=" + DeviceId + "&width="
            console.log(this.toUrl);
        },
        methods:{
            getPass(){
                this.getKey('loginPass')
            },
            getKey(id) {
                $(`#${id}`).attr('v-password-widget', this.toUrl)

                $(`#${id}`).PasswordWidget()
            },
            doLogin(){
                util.storage.local.set(LsName.token,this.tel)
                let pass = $('#loginPass').$getCiphertext()
                let lengths = $('#loginPass').$getPasswordLength();
                console.log(pass)
                let data = {
                    PHONE_NUM:this.tel,
                    BANK_LOGIN_PW:pass
                }
                API.login(data,(res)=>{
                    console.log(res);

                    // this.getKey('loginPass')

                })


            }
        }
    }
</script>
<style lang="scss" scoped>
    .hello {
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

    .bottomcontent {
        margin-top: 7rem;
        text-align: center;
    }

    .bottomcontent p {
        margin-top: 10px;
        background-image: url(../../images/img/icon_dunpai@2x.png);
        font-size: 0.4rem;
        color: #808080;
        background-repeat: no-repeat;
        background-size: 0.4rem 0.4rem;
        padding-left: 0.5rem;
        background-position: 20%;
    }

    .titlecontent {
        margin-left: 0.5rem;
        font-size: 0.5rem;
    }

    .login_box {
        position: relative;
    }

    .login_box p {
        height: 2rem;
        margin-left: 0.6rem;
        background-repeat: no-repeat;
        background-color: #fff;
        line-height: 1.2rem;
        width: 90%;
        background-size: 0.7rem 0.7rem;
        background-position: .2rem .2rem;
        border-bottom: 1px #E5E5E5 solid;
    }

    .login_box input {
        height: 2rem;
        width: 50%;
        border: none;
        box-sizing: border-box;
        font-size: 0.4rem;
        color: #333;
        /* line-height: 40px; */
        outline: none;
    }

    .tijiao {
        font-size: 0.4rem;
        color: #fff;
        background-color: #1badff;
        border-radius: 0.2rem;
        line-height: 1rem;
        width: 70%;
        margin: 0 auto;
        text-align: center;
        margin-top: 2rem;
        border: 0px;
        outline: none;
        display: block;
    }

    .login_box .forget {
        margin-top: 0.2rem;
        color: #1badff;
        position: absolute;
        right: 5%;
    }

    .lijizhuce {
        margin-top: 0.2rem;
        text-align: center;
        color: #1badff;
    }
</style>
