<template>
    <div id="app" class="hello">
        <app-bar title="安全登录"></app-bar>
        <p class="titlecontent">
            <img src="../../images/img/icon_dunpai@2x.png" alt="">
            欢迎登录晋商银行直销账户</p>
        <div class="login_box">
            <p><input type="text" name="text1" placeholder="开户手机号" v-model="tel"></p>
            <!--<p><input type="password" name="text1" placeholder="登录密码" v-model="pass"></p>-->
            <!--密码控件-->
            <div class="field_row_wrap" style="padding: 0 .5rem;">
                <div class="field_row_value" style="width: 100%;height: 2rem;border-bottom: 1px #E5E5E5 solid;">
                    <pass-input
                            style="height: 2rem;line-height: 2rem;color: #dedede"
                            inputID="loginPass"
                    ></pass-input>
                </div>
            </div>

            <span class="forget" @click="goRePass">忘记密码？</span>
            <mt-button class="tijiao" type="primary" @click="doLogin">登录</mt-button>
            <div class="lijizhuce">
                <span @click="goOpen">还未开户，立即注册</span>
            </div>
        </div>
        <div class="bottomcontent">
            <p>
                <img src="../../images/img/icon_dunpai@2x.png" alt="">
                晋商银行已与比财实现安全直连</p>
        </div>
    </div>
</template>
<script>
    import util from '../../common/utils/util'
    import {API} from '../../request/api'
    import {LsName,BusName,PageName} from "../../Constant";
    import Bus from '../../common/js/bus'
    import {HOST} from "../../Constant";
    import PassInput from '../../components/commons/PassInput'



    export default {
        data(){
            return {
                tel:'',
                pass:'',
                passLay:'',
                toUrl:"",
                loginPass:'loginPass',
                num:1,
                ifGet:false,
                refur:false
            }
        },
        components:{
            PassInput
        },
        inject:['reload'],
        created(){
            let preInfo;
            if(preInfo = util.storage.session.get('loginInfo')){
                this.tel = preInfo.PHONE_NUM
                Bus.$emit(BusName.showToast,preInfo.msg)
                util.storage.session.remove('loginInfo')
            }
        },
        methods:{

            goRePass(){
                this.$router.push({
                    name:PageName.Resetpassword
                })
            },
            goOpen(){
                API.watch.watchApi({
                    FUNCTION_ID: 'ptb0A008', // 点位
                    REMARK_DATA: '异业合作-还未开户，立即注册', // 中文备注
                })
                this.$router.push({name:PageName.opening})
            },
            doLogin(){
                API.watch.watchApi({
                    FUNCTION_ID: 'ptb0A007', // 点位
                    REMARK_DATA: '异业合作-登录', // 中文备注
                })
                let msg;
                if(msg=util.Check.tel(this.tel)) return Bus.$emit(BusName.showToast,msg);
                let pass = $('#loginPass').$getCiphertext()
                let lengths =$('#loginPass').$getCiphertext()
                if(msg=util.Check.loginPassLen(lengths)) return Bus.$emit(BusName.showToast,msg);

                let data = {
                    PHONE_NUM:this.tel,
                    BANK_LOGIN_PW:pass
                }
                util.storage.session.remove(LsName.token,this.tel)
                API.login(data,(res)=>{
                    util.storage.session.remove('loginInfo')
                    let type = res.HAS_GRADE
                    let target = this.$route.query.target
                    if(type==1){
                        Bus.$emit(BusName.showToast,'您还为做评估')
                        this.$router.push({
                            name:PageName.Verificationsuccess
                        })
                    }
                    else if(type ==2){
                        this.$router.push({
                            path:target? target: '/'+ PageName.Productlist
                        })
                    }else {

                    }

                },err=>{
                    util.storage.session.remove(LsName.token)
                    util.storage.session.set('loginInfo',{
                        PHONE_NUM:this.PHONE_NUM,
                        msg:err
                    })
                    // this.reload()
                    setTimeout(()=>{
                        window.location.reload()
                    },1500)
                    // this.refur =!this.refur
                    // this.show = false;
                    // this.$nextTick(()=>{
                    //     this.show = true
                    // })
                })


            }
        }
    }
</script>
<style lang="scss" scoped>
    .hello {
        box-sizing: border-box;
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
        position: fixed;
        width: 100%;
        text-align: center;
        bottom: 0.1rem;
        font-size: 0;
        img{
            vertical-align: top;
            width: .5rem;
        }
    }

    .bottomcontent p {
        margin-top: 10px;
        font-size: 0.4rem;
        color: #808080;
        background-repeat: no-repeat;
        background-size: 0.4rem 0.4rem;
        padding-left: 0.5rem;
        background-position: 20%;
    }

    .titlecontent {
        padding-top: .2rem;
        text-align: center;
        font-size: 0.5rem;
        img{
            width: .6rem;
            vertical-align: top;
        }
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
        border-radius: 0.2rem;
        line-height: 1rem;
        width: 70%;
        margin: 2rem auto 0;
        text-align: center;
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
