<template>
  <div class="hello">
    <app-bar title="安全登录"></app-bar>
    <!--不同银行展示不同的logo和名称,以后抽离组件 专门用于管理-->
    <!--<img class="logo" src="@/assets/images/logoaaa_03.png" alt="">-->
    <div class="logo-box">
      <img src="@/assets/images/common/logo@2x.png" alt="">
      <span>你好，欢迎来到比财</span>
    </div>
    <div class="login_box">
      <section class="input-box">
        <transition name="fade">
          <p class="label" v-show="telShow">开户手机号</p>
        </transition>
        <input class="input" type="input"
               name="text1" :placeholder="telPaceholder" v-model="tel">
      </section>
      <section class="input-box">
        <transition name="fade">
          <p class="label" v-show="cmsShow">短信验证码</p>
        </transition>
        <input class="input" type="input"
               name="text1" :placeholder="cmsholder" v-model="cms">
        <button class="get-msg" @click="clickMsgCodeHandle" :disabled="msgDisabled">{{codeText}}</button>
      </section>
      <!--<button :disabled="disabled" :class="{'tijiao':true, 'agree':!disabled}" @click="loginFactory(ORG_ID)">-->
      <!--登录-->
      <!--</button>-->
      <button class="tijiao" @click="loginFactory(ORG_ID)">
        登录
      </button>
      <p class="infos">
        温馨提示：未注册比财账号的手机号，登录时将自动注册，且代表您已同意《用户服务协议》和《比财隐私政策》
      </p>

    </div>
    <section class="safe-code" v-show="showSafeCode">
      <div>
        <img :src="safeCodeUrl+ SESSION_ID" alt="" @click="reImg">
        <input type="text" placeholder="请输入图形验证码" v-model="safeCode">
        <button @click="getSafeCode">确定</button>
      </div>
    </section>
  </div>
</template>
<script>
  import API from "@/service"
  import {LsName, BusName, PageName} from "@/Constant";
  import Bus from '@/plugin/bus'
  import PassWordZhengzhou from '@/components/password/PassInputZhengzhou'
  import Mixins from "@/mixins";
  import util from "../../../libs/util";
  import {HOST} from "@/Constant";

  const safeCodeUrl = HOST + '/finsuitSafeCode?SESSION_ID='
  let time = 60
  let timer;

  export default {
    data() {
      return {
        SESSION_ID: '',
        safeCodeUrl,
        msgDisabled: false,
        tel: '',
        cms: '',
        pass: '',
        passLay: '',
        toUrl: "",
        loginPass: 'loginPass',
        num: 1,
        ifGet: false,
        refur: false,
        telShow: false,
        cmsShow: false,
        telPaceholder: '开户手机号',
        cmsholder: '短信验证码',
        codeText: '获取验证码',
        passPluginText: '',
        currentTel: '',
        ORG_ID: '', //
        BANK_NAME: '',
        LOGO_URL: '',
        safeCode: '',
        showSafeCode: false
      }
    },
    mixins: [Mixins.HandleMixin, Mixins.UtilMixin],
    components: {
      PassWordZhengzhou
    },
    inject: ['reload'],
    created() {
      this.ORG_ID = util.storage.session.get('ORG_ID')  || ''

      // this.ORG_ID = this.$store.getters.GET_BANK_INFO.ORG_ID
      this.BANK_NAME = this.$store.getters.GET_BANK_INFO.BANK_NAME
      let preInfo = this.getComState.loginInfo;
      if (preInfo) {
        this.tel = preInfo.PHONE_NUM
        Bus.$emit(BusName.showToast, preInfo.msg)
        this.removeComState('loginInfo')
      }
    },
    computed: {
      disabled() {
        if (this.tel.length == 11 && this.cms.length > 0) {
          return false
        } else {
          return true
        }
      }

    },
    watch: {
      tel(n, o) {
        if (n == '') {
          return
        }
        if (!this.isValueNumber(n)) {
          this.tel = this.currentTel
          return
        }
        if (n.length > 11) { // >11截取
          this.tel = this.tel.toString().substr(0, 11)
        }
        this.currentTel = n
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
      },
      cms(n, o) {
        if (n == '') {
          return
        }
        if (n.length > 1) { // >1时不必校验
          return
        }
        if (!n) { // 删除到 '' 是触发
          this.cmsShow = false
          this.cmsholder = '短信验证码'
        } else {
          this.cmsholder = ''
          this.cmsShow = true
        }
      }
    },

    methods: {
      reImg() {

      },
      getSafeCode() {
        this.getMsg(true)
        this.showSafeCode = false
      },
      isValueNumber(value) {
        return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value);
      },

      getMsg(canLogin = false) {
        let data = {
          PHONE_NUM: this.tel + '',
          SAFT_CODE: this.safeCode
        }
        this.safeCode = ''
        this.SESSION_ID = ''
        API.bicai.sendSMS(data, (res, SESSION_ID) => {
          let data = res
          let mark = data.mark // 0 未满5次，1满五次
          this.SESSION_ID = SESSION_ID
          if (mark == 0) {
            Bus.$emit(BusName.showToast, '验证码发送成功')
            this.timeDown()
          } else {
            console.log(canLogin);
            if (canLogin) { // 用于拦截第一次
              this.timeDown()
            } else {
              this.showSafeCode = true
            }
          }
        }, err => {
        })
      },
      loginFactory() {
        if (util.Check.tel(this.tel, true)) return
        let data = {
          PHONE_NUM: this.tel + '',
          PHONE_CODE: this.cms,
          SAFT_CODE: this.safeCode
        }
        let SOURCE_URL = this.$store.getters.GET_COMMON_STATE.loginType
        this.$store.commit('SET_TOKEN', null)
        API.bicai.login(data, (res) => {
          API.watchApi({
            FUNCTION_ID: 'ptb0A007', // 点位
            REMARK_DATA: '异业合作-登录', // 中文备注
            SOURCE_URL: SOURCE_URL
          })
          this.$store.commit('SET_BICAI_USER', res)
          this.$store.commit('SET_TOKEN', res.PHONE_TOKEN)
          // todo 登陆比财 首先判断比财开户的状态 暂时注释。
          // this.checkAuthStatus()
          // 跳过校验比财开户状态 直接判断郑州银行回显
          this.checkBankStatus()
        }, err => {
          API.watchApi({
            FUNCTION_ID: 'ptb0A007', // 点位
            REMARK_DATA: '异业合作-登录', // 中文备注
          })
          // util.storage.session.remove(LsName.token)
          this.$store.commit('SET_TOKEN', null)
          this.setComState({
            type: 'loginInfo',
            value: {
              PHONE_NUM: this.tel,
              msg: err
            }
          })

        })
      },
      // 判断该用户在比财的实名认证状态
      checkAuthStatus() {
        API.bicai.getAuthStatus({}, res => {
          let {AUTH_STATUS, isOldMember} = res
          //  AUTH_STATUS 返回码：
          // 0:未认证，
          // 1:身份证认证，
          // 2:银行卡认证，
          // 3:密码设置，
          // 4:认证完成，
          // 5:身份证过期
          console.log(AUTH_STATUS);
          switch (Number(AUTH_STATUS)) {
            case 0:
            case 1:
              this.$router.push(PageName.BcOpening1)
              break;
            case 2:
              this.$router.push(PageName.BcOpening2)
              break;
            case 3:
              this.$router.push(PageName.BcOpening3)
              break;
            case 4:
              this.checkBankStatus()
              // todo 再判断对应的直销银行有没有开户
              break;
            case 5:
              //
              this.$router.push(PageName.BcOpening1)
              break;
          }
        },err=>{
          this.codeText = '重新发送'
          this.msgDisabled = false
          clearInterval(timer)
        })
      },
      // 判断该用户在本行的开户状态
      checkBankStatus() {
        // 登陆比财成功 且在比财实名成功 然后 检查在本行状态
        let data = {}
        API.common.apiRegisterBackShow(data, res => {
          let step = res.LAST_STEP_NUM
          // （0未提交，1提交第一步，2提交第二步，3提交第三步）
          util.storage.session.set('USERINFO', res)
          if (step == 0) {
            // this.$store.commit('SET_OPENING_DATA', 1)
            this.setComState({type:'openingData',value:res})
            this.$router.push({name: PageName.Opening1})
          }
          if (step == 1) {
            this.setComState({type:'openingData',value:res})
            // this.$store.commit('SET_OPENING_DATA', 1)
            this.$router.push({name: PageName.Opening2})
          }
          if (step == 2) {
            this.setComState({type:'openingData',value:res})
            // this.$store.commit('SET_OPENING_DATA', 1)
            this.$router.push({name: PageName.Opening3})
          }
          if (step == 3) {
            // todo登陆成功后判断拿来的去哪里
            this.setComState({type:'Infos',value:res})
            this.checkIfPinggu(res)
          }
        },err=>{
          this.codeText = '重新发送'
          this.msgDisabled = false
          clearInterval(timer)
        })
      },
      // 判断是否评估
      checkIfPinggu(res){
        // this.$router.push({name:PageName.Opening3})
        this.removeComState('loginInfo')
        let type = res.HAS_GRADE
        this.setComState({type: 'HAS_GRADE', value: type})
        // util.storage.session.set(LsName.HAS_GRADE, type)
        if (type == 1) {
          Bus.$emit(BusName.showToast, '请先进行评估')
          this.$router.push({
            name: PageName.VerificationSuccess,
          })
        }
        else if (type == 2) { // 评估过
          // 2的话
          this.toPreProduct() // 评估过判断是否去哪里

        } else {
          this.toPreProduct() // 评估过判断是否去哪里
        }
      },
      //
      focusHandle() {
        this.telShow = true
        this.telPaceholder = ''
        $('.input').css({
          fontSize: '.5rem'
        })
      },
      clickMsgCodeHandle() {
        let PHONE = this.tel
        PHONE = PHONE + ''
        console.log(PHONE);
        if (util.Check.tel(PHONE, true)) return;
        this.getMsg()
      },
      // msg倒计时
      timeDown() {
        let sTime = time
        this.msgDisabled = true
        timer = setInterval(() => {
          if (sTime == 0) {
            this.codeText = '重新发送'
            this.msgDisabled = false
            clearInterval(timer)
            return
          }
          sTime--
          this.codeText = `${sTime}s`
        }, 1000)
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import "~@/assets/px2rem";

  .logo-box {
    font-size: 0;
    width: 100%;
    padding-top: px2rem(40);
    box-sizing: border-box;
    text-align: center;
    span {
      padding-top: px2rem(10);
      padding-left: px2rem(20);
      font-size: px2rem(20);
      color: #49546C;
      vertical-align: top;
    }
    img {
      vertical-align: top;
      width: px2rem(59);
      height: px2rem(54);
    }
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

  .safe-code {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 10;
    div {
      box-sizing: border-box;
      margin: px2rem(200) auto 0;
      background: #fff;
      padding-top: px2rem(10);
      text-align: center;
      width: px2rem(250);
      height: px2rem(150);
    }
    img {

    }
    button {
      width: px2rem(80);
      height: px2rem(30);
      background: #2f74ff;
      color: #fff;
    }
    input {
      margin: px2rem(10) auto px2rem(10);
      padding-left: px2rem(10);
      display: block;
      width: px2rem(150);
      height: px2rem(40);
      border: 1px solid #ccc;
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
    .get-msg {
      position: absolute;
      right: 0;
      top: px2rem(46);
      font-size: px2rem(12);
      height: px2rem(30);
      width: px2rem(90);
      color: #508CEE;
      border: 1px solid #508CEE;
      border-radius: px2rem(6)
    }
    .input {
      position: absolute;
      left: 0;
      bottom: 0;
      @include placeholder(#dedede);
      height: px2rem(24) !important;
      margin: px2rem(10) 0;
      width: 50%;
      border: none;
      box-sizing: border-box;
      font-size: px2rem(16);
      color: #333;
      outline: none;
    }
  }

  .tijiao {
    background: #fff;
    color: #508CEE;
    border: 1px solid #508CEE;
    font-size: px2rem(18);
    border-radius: px2rem(6);
    width: px2rem(255);
    height: px2rem(44);
    margin: px2rem(66) auto 0;
    text-align: center;
    display: block;
    /*&.agree {*/
    /*background: #508CEE;*/
    /*}*/
  }

  .infos {
    margin: px2rem(60) auto 0;
    width: px2rem(315);
    height: px2rem(34);
    color: #B3B3B3;
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

  .fade-enter-active, .fade-leave-active {
    transition: opacity .6s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }
</style>
