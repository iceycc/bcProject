<template>
    <div id="app" class="hello">
        <app-bar title="安全登录"></app-bar>
        <img class="logo" src="../../images/img/logoaaa_03.png" alt="">
        <p class="titlecontent">
            欢迎登录晋商银行直销账户</p>
        <div class="login_box">
            <section class="input-box">
                <transition name="fade">
                    <p class="label" v-if="telShow">开户手机号</p>
                </transition>
                <input class="input" type="text"
                       name="text1" :placeholder="telPaceholder" v-model="tel">
            </section>
            <!--<p><input type="password" name="text1" placeholder="登录密码" v-model="pass"></p>-->
            <!--密码控件-->
            <section class="input-box">
                <transition name="fade">
                    <p class="label" v-if="passShow">登陆密码</p>
                </transition>
                <pass-input
                        :text="passText"
                        class="input"
                        inputID="login_loginPass"
                ></pass-input>
            </section>

            <span class="forget" @click="goRePass">忘记密码？</span>
            <button :disabled="disabled" :class="{'tijiao':true, 'agree':!disabled}"  @click="doLogin">登录</button>
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
    import {LsName, BusName, PageName} from "../../Constant";
    import Bus from '../../common/js/bus'
    import {HOST} from "../../Constant";
    import PassInput from '../../components/commons/PassInput'
    import {Mixin} from '../../common/utils/mixin'


    export default {
        data() {
            return {
                disabled:true,
                tel: '',
                pass: '',
                passLay: '',
                toUrl: "",
                loginPass: 'loginPass',
                num: 1,
                ifGet: false,
                refur: false,
                telShow: false,
                passShow: false,
                passText:'登陆密码',
                telPaceholder: '开户手机号',
            }
        },
        mixins: [Mixin],
        components: {
            PassInput
        },
        inject: ['reload'],
        created() {
            let preInfo;
            if (preInfo = util.storage.session.get('loginInfo')) {
                this.tel = preInfo.PHONE_NUM
                Bus.$emit(BusName.showToast, preInfo.msg)
                util.storage.session.remove('loginInfo')
            }


        },
        watch:{
            tel(n,o){
                if(n==''){
                    this.disabled = true
                    this.telShow = false
                    this.telPaceholder = '开户手机号'
                }else {
                    this.telShow = true
                    this.telPaceholder = ''
                }
            }
        },
        mounted() {
            console.log('mounted');
           this.watchPassPlugin()
        },
        methods: {
            watchPassPlugin(){
                let num = 1
                // this.Londing.open({
                //     text: '正在加载密码控件'
                // })
                let timer = setInterval(() => {
                    let passKey = $('#LowercaseDiv')
                    if (passKey[0]) {
                        // this.Londing.close()
                        passKey.on('click', '.buttonUp',  () =>{
                            this.passShow = true
                            if (this.tel != '' ) {
                                this.disabled = false
                            }
                        })
                        let close = $('#login_loginPass')
                        var reg = RegExp(/密码/)
                        $('#F2').on('click',()=>{
                            if(close.text().match(reg)){
                                this.passShow =false
                                this.disabled = true
                            }
                        })
                        clearInterval(timer)
                        return
                    }else {
                        $('#F2').off('click')
                        passKey.off('click', '.buttonUp')
                    }
                    num++
                }, 1000)
            },
            goRePass() {
                this.$router.push({
                    name: PageName.Resetpassword
                })
            },
            goOpen() {
                API.watch.watchApi({
                    FUNCTION_ID: 'ptb0A008', // 点位
                    REMARK_DATA: '异业合作-还未开户，立即注册', // 中文备注
                })
                this.$router.push({name: PageName.opening})
            },
            doLogin() {

                let msg;
                if (msg = util.Check.tel(this.tel)) return Bus.$emit(BusName.showToast, msg);
                let pass = $('#login_loginPass').$getCiphertext()
                let lengths = $('#login_loginPass').$getCiphertext()
                if (msg = util.Check.loginPassLen(lengths)) return Bus.$emit(BusName.showToast, msg);

                let data = {
                    PHONE_NUM: this.tel,
                    BANK_LOGIN_PW: pass
                }
                util.storage.session.remove(LsName.token, this.tel)
                API.login(data, (res) => {
                    API.watch.watchApi({
                        FUNCTION_ID: 'ptb0A007', // 点位
                        REMARK_DATA: '异业合作-登录', // 中文备注
                    })
                    util.storage.session.set(LsName.reload, true)  // 每次在调用密码框时进行植入标签，下次碰到密码框页面时进行校验刷新
                    util.storage.session.remove('loginInfo')
                    let type = res.HAS_GRADE
                    let target = this.$route.query.target
                    if (type == 1) {
                        Bus.$emit(BusName.showToast, '您还为做评估')
                        this.$router.push({
                            name: PageName.Verificationsuccess
                        })
                    }
                    else if (type == 2) {
                        // 2的话
                        this.$router.push({
                            path: target ? target : '/' + PageName.Productlist
                        })
                    } else {

                    }

                }, err => {
                    API.watch.watchApi({
                        FUNCTION_ID: 'ptb0A007', // 点位
                        REMARK_DATA: '异业合作-登录', // 中文备注
                    })
                    util.storage.session.remove(LsName.token)
                    util.storage.session.set('loginInfo', {
                        PHONE_NUM: this.tel,
                        msg: err
                    })
                    // this.reload()
                    setTimeout(() => {
                        window.location.reload()
                    }, 1500)
                    // this.refur =!this.refur
                    // this.show = false;
                    // this.$nextTick(()=>{
                    //     this.show = true
                    // })
                })


            },
            focusHandle() {
                this.telShow = true
                this.telPaceholder = ''
                this.passText = ''
                $('.input').css({
                    fontSize: '.5rem'
                })
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../assets/px2rem";

    .logo {
        width: px2rem(140);
        margin-left: px2rem(20);
        margin-top: px2rem(20);
        font-size: px2rem(18);
    }

    .hello {
        box-sizing: border-box;
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

    .bottomcontent {
        position: absolute;
        width: 100%;
        text-align: center;
        bottom: px2rem(70);
        font-size: 0;
        color: #333;
        img {
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
        padding-left: px2rem(20);
        padding-top: px2rem(24);
        font-size: px2rem(18);
        img {
            width: .6rem;
            vertical-align: top;
        }
    }

    .login_box {
        position: relative;
        .input-box {
            margin-left:px2rem(20);
            width: 90%;
            background-size: 0.7rem 0.7rem;
            border-bottom: 1px #E5E5E5 solid;
        }
        .label {
            padding: 0;
            margin-top: px2rem(30);
            font-size: px2rem(17);
            color: #858E9F;
        }
        .input {
            @include placeholder(#dedede);
            height: px2rem(24);
            margin: px2rem(10) 0;
            width: 50%;
            border: none;
            box-sizing: border-box;
            font-size: px2rem(16);
            color: #333;
            /* line-height: 40px; */
            outline: none;
        }
    }

    .tijiao {
        background: #e4e4e4;
        color: #fff;
        font-size: px2rem(18);
        border-radius: px2rem(5);
        width: px2rem(255);
        height: px2rem(44);
        margin: px2rem(66) auto 0;
        text-align: center;
        display: block;
        &.agree{
            background: #0072ff;
        }
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

    .fade-enter-active, .fade-leave-active {
        transition: opacity .6s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>
