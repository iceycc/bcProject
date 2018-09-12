<template>
    <div id="app" class="hello">
        <app-bar title="安全登录"></app-bar>
        <img class="logo" src="../../images/img/logoaaa_03.png" alt="">
        <p class="titlecontent">
            欢迎登录晋商银行直销账户</p>
        <div class="login_box">
            <section class="input-box">
                <transition name="fade">
                    <p class="label" v-show="telShow">开户手机号</p>
                </transition>
                <input class="input" type="number"
                       name="text1" :placeholder="telPaceholder" v-model="tel">
            </section>
            <!--<p><input type="password" name="text1" placeholder="登录密码" v-model="pass"></p>-->
            <!--密码控件-->
            <section class="input-box">
                <transition name="fade">
                    <p class="label" v-show="passShow">登录密码</p>
                </transition>
                <pass-input
                        :text="passText"
                        class="input"
                        inputID="login_loginPass"
                ></pass-input>
            </section>

            <button :disabled="rePass" :class="{forget:true,forget2:rePass}" @click="goRePass">忘记密码？</button>
            <button :disabled="disabled" :class="{'tijiao':true, 'agree':!disabled}" @click="doLogin">登录</button>
            <div class="lijizhuce">
                <span @click="goOpen" class="noOpen">还未开户，立即注册</span>
            </div>
            <p class="buy-info">温馨提示：各类理财产品额度有限，提前开户可提高抢购成功率。</p>
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
    import {Mixin, UtilMixin} from '../../common/utils/mixin'

    let watchPassPluginPassTimer

    export default {
        data() {
            return {
                rePass: true,
                disabled: true,
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
                passText: '登录密码',
                telPaceholder: '开户手机号',
                passPluginText: ''
            }
        },
        mixins: [Mixin, UtilMixin],
        components: {
            PassInput
        },
        inject: ['reload'],
        created() {
            clearInterval(watchPassPluginPassTimer)
            let preInfo;
            if (preInfo = util.storage.session.get('loginInfo')) {
                this.tel = preInfo.PHONE_NUM
                Bus.$emit(BusName.showToast, preInfo.msg)
                util.storage.session.remove('loginInfo')
            }
        },
        watch: {
            tel(n, o) {
                console.log(n);
                if (n.length > 11) { // >11截取
                    this.tel = this.tel.toString().substr(0, 11)
                }
                if (n.length > 1) { // >1时不必校验
                    return
                }
                if (!n) { // 删除到 '' 是触发
                    this.telShow = false
                    this.telPaceholder = '开户手机号'
                } else {
                    this.telPaceholder = ''
                    this.telShow = true
                }
            }
        },
        mounted() {
            console.log('mounted');
            this.watchPassPluginPass()
            this.watchPassPlugin()
        },
        beforeRouteLeave(to, from, next) {
            clearInterval(watchPassPluginPassTimer)
            next()
        },
        methods: {
            watchPassPluginPass() {
                let num = 1
                // this.Londing.open({
                //     text: '正在加载密码控件'
                // })
                watchPassPluginPassTimer = setInterval(() => {
                    let flag = this.checkPassWordTextIsEmpty()
                    if (flag > 0) {
                        this.passShow = true

                        if (this.tel.length > 0 && flag == 2) {
                            this.disabled = false

                        } else {
                            this.disabled = true
                        }
                    } else {
                        this.passShow = false
                        this.disabled = true
                    }

                    num++
                }, 500)
            },
            watchPassPlugin() { //
                let num = 1
                let timer = setInterval(() => {
                    let passKey = $('#LowercaseDiv') // 插件基于jq
                    if (passKey[0]) {
                        this.rePass = false
                        clearInterval(timer)
                        return
                    } else {
                        if (num == 10) {
                            clearInterval(timer)
                        }
                    }
                    num++
                }, 300)
            },
            checkPassWordTextIsEmpty() {
                this.passPluginText = $('#login_loginPass').text() //
                let reg = /密码/
                let reg2 = /加载/
                //this.passPluginText.match(reg)
                // console.log('pass>>', this.passPluginText);
                if (this.passPluginText.match(reg)) {
                    return 0
                }
                if (this.passPluginText.match(reg2)) {
                    return 0
                }
                else if (this.passPluginText.length >= 8) {
                    return 2;
                } else {
                    return 1
                }
            },
            goRePass() {
                util.storage.session.set(LsName.reload, true)
                this.$router.push({
                    name: PageName.Resetpassword
                })
            },
            goOpen() {
                API.watch.watchApi({
                    FUNCTION_ID: 'ptb0A008', // 点位
                    REMARK_DATA: '异业合作-还未开户，立即注册', // 中文备注
                })
                util.storage.session.set(LsName.reload, true)
                this.$router.push({name: PageName.opening})
            },

            doLogin() {
                clearInterval(watchPassPluginPassTimer)
                let msg;
                if (msg = util.Check.tel(this.tel)) return Bus.$emit(BusName.showToast, msg);
                let pass = $('#login_loginPass').$getCiphertext()
                let lengths = $('#login_loginPass').$getCiphertext()
                if (msg = util.Check.loginPassLen(lengths)) return Bus.$emit(BusName.showToast, msg);

                let data = {
                    PHONE_NUM: this.tel,
                    BANK_LOGIN_PW: pass
                }
                let SOURCE_URL = util.storage.session.get(LsName.loginType)

                util.storage.session.remove(LsName.token, this.tel)
                API.login(data, (res) => {
                    API.watch.watchApi({
                        FUNCTION_ID: 'ptb0A007', // 点位
                        REMARK_DATA: '异业合作-登录', // 中文备注
                        SOURCE_URL: SOURCE_URL
                    })

                    util.storage.session.set(LsName.reload, true)  // 每次在调用密码框时进行植入标签，下次碰到密码框页面时进行校验刷新
                    util.storage.session.remove('loginInfo')
                    let type = res.HAS_GRADE
                    util.storage.session.set(LsName.HAS_GRADE, type)
                    if (type == 1) {
                        Bus.$emit(BusName.showToast, '请先进行评估')
                        this.$router.push({
                            name: PageName.Verificationsuccess,
                        })
                    }
                    else if (type == 2) { // 评估过
                        // 2的话
                        this.toPreProduct() // 评估过判断是否去哪里

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
        min-height: px2rem(600);
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
        /*position: absolute;*/
        margin-top: px2rem(100);
        width: 100%;
        text-align: center;
        font-size: 0;
        color: #333;
        img {
            vertical-align: top;
            width: .5rem;
        }
    }
    .buy-info{
        margin-top: px2rem(50);
        color: #F77024;
        font-size: px2rem(11);
        text-align: center;
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
            position: relative;
            margin-left: px2rem(20);
            width: 90%;
            height: px2rem(65);
            background-size: 0.7rem 0.7rem;
            border-bottom: 1px #E5E5E5 solid;
            padding-top: px2rem(20);
        }
        .label {
            padding: 0;
            font-size: px2rem(17);
            color: #858E9F;
        }
        .input {
            position: absolute;
            left: 0;
            bottom: 0;
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
        &.agree {
            background: #0072ff;
        }
    }

    .login_box .forget {
        margin-top: 0.2rem;
        color: #1badff;
        position: absolute;
        right: 5%;
    }

    .login_box .forget2 {
        color: #333;
    }

    .lijizhuce {
        margin-top: 0.2rem;
        text-align: center;
        color: #1badff;
        .noOpen {
            display: inline-block;
            width: px2rem(150);
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .6s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>
