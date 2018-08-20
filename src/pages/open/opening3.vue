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
                    <input type="password" placeholder="请输入登录密码" v-model="loginPass" autocomplete="false">
                </p>
                <p>
                    <span>交易密码</span>
                    <input type="password" placeholder="请输入交易密码" v-model="payPass" autocomplete="false">
                </p>
            </div>
            <div class="tijiao Tips">登录密码需包含8-20位数字，大小字母组成</div>
            <button class="tijiao" @click="goOpen">开户</button>
        </form>
    </div>
</template>
<script>
    import {API} from "../../request/api";
    export default {
        data() {
            return {
                loginPass: '',
                payPass:''
            }
        },
        component:{
        },
        created(){

        },
        methods: {
            goOpen(){
                let REQ_SERIAL = this.$route.params.REQ_SERIAL || this.$route.params.seq
                let data = {
                    REQ_SERIAL,
                    BANK_LOGIN_PW:this.loginPass,
                    BANK_PAY_PW:this.payPass
                }
                API.open.setPassWord(data,(res)=>{
                    console.log(res);
                })
            }
        }

    }
</script>

<style lang="scss" scoped>
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
