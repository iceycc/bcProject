<template>
  <div class="hello">
    <app-bar title="安全登录"></app-bar>
    <!--不同银行展示不同的logo和名称,以后抽离组件 专门用于管理-->
    <!--<img class="logo" src="@/assets/images/logoaaa_03.png" alt="">-->
    <div class="logo-box">
      <img src="@/assets/images/common/logo@2x.png" alt="" @click="goBicaiOpen">
      <span>比财平台{{BANK_NAME}}</span>
    </div>
    <div class="login_box">
      <section class="input-box">
        <transition name="fade">
          <p class="label" v-show="telShow">开户手机号</p>
        </transition>
        <input class="input" type="tel"
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
      <button :class="{tijiao:true,active:canClick}" @click="loginFactory()" :disabled="!canClick">登录</button>
      <p class="infos">
        温馨提示：未注册比财账号的手机号，登录时将自动注册，且代表您已同意《用户服务协议》和《比财隐私政策》
      </p>

    </div>
    <section class="safe-code" v-show="showSafeCode">
      <div>
        <p>请填写图形验证码</p>
        <section class="middle">
          <input type="tel" placeholder="请输入图形验证码" v-model="safeCode">
          <img :src="'data:image/png;base64,'+IMG" alt="" @click="getImgCode()">
        </section>
        <section class="btn">
          <button @click="showSafeCode=false">取消</button>
          <button @click="getSafeCode">确定</button>
        </section>
      </div>
    </section>
    <section class="bottomcontent" v-if="ifOpenApi">
      <p>
        <img src="@/assets/images/icon_dunpai@2x.png" alt="">
        {{BANK_NAME}}已与比财实现安全直连</p>
    </section>
  </div>
</template>
<script>
  import API from "@/service"
  import {LsName, BusName, PageName} from "@/Constant";
  import Bus from '@/plugin/bus'
  import PassWordZhengzhou from '@/components/password/PassInputZhengzhou'
  import Mixins from "@/mixins";
  import LoginMixins from './login'
  import util from "@/libs/util";
  import {HOST} from "@/Constant";

  let time = 60
  let timer;
  export default {
    data() {
      return {
        ifOpenApi: true,
        IMG: '',
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
        LOGO_URL: '',
        safeCode: '',
        showSafeCode: false,
        getMsgCodeSuccess: false,

        BANK_NAME: '',
        href: '',
        ORG_ID: '',
        OPEN_H5_STATUS: ''
      }
    },
    mixins: [Mixins.HandleMixin, Mixins.UtilMixin, LoginMixins],
    components: {
      PassWordZhengzhou
    },
    created() {
      this.getImgCode()
    },
    computed: {
      disabled() {
        if (this.tel.length == 11 && this.cms.length > 0 && this.getMsgCodeSuccess) {
          return false
        } else {
          return true
        }
      },
      canClick() {
        if (this.tel && this.cms) {
          return true
        } else {
          return false
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
      // 测试
      goBicaiOpen() {
        let {TOKEN} = this.$store.getters.GET_ACCOUNT_STATE
        if (TOKEN) {
          this.checkAuthStatus()
        }
      },
      // 登录
      loginFactory() {
        if (util.Check.tel(this.tel, true)) return
        let data = {
          PHONE_NUM: this.tel + '',
          PHONE_CODE: this.cms,
          SAFT_CODE: this.safeCode
        }
        let SOURCE_URL = this.getComState.loginType
        console.log(SOURCE_URL);
        this.$store.commit('SET_TOKEN', null)
        API.bicai.login(data, (res) => {
          API.watchApi({
            FUNCTION_ID: 'ptb0A007', // 点位
            REMARK_DATA: '异业合作-登录', // 中文备注
            SOURCE_URL: SOURCE_URL
          })
          // 优先级第一 如果是 活动页投资来的 登录后直接携带members_id 跳到来源页
          if (this.isfinancial == '1') {
            window.location.href = 'https://adv.bicai365.com/nay/#/myInvestment?members_id=' + res.ID
            return
          }

          this.$store.commit('SET_BICAI_USER', res)
          this.$store.commit('SET_TOKEN', res.PHONE_TOKEN)
          // 判断openApi
          if (this.ProAndOrgType.IS_SYNC_FLAG == 0) {
            // 不是 openApi
            // if (this.ProAndOrgType.IS_REALTIME_DATA_PRD == 0) {
            // 不是h5直联
            if (this.ProAndOrgType.IS_RZ_FLAG == 0) {
              // 不需要实名
              // let href = this.ProAndOrgType.H5_URL_ANDRIOD || this.ProAndOrgType.H5_URL_IOS
              if (this.href) {
                window.location.href = this.href;
                // let tempwindow = window.open('_blank'); // 先打开页面
                // tempwindow.location = this.href; // 后更改页面地址
              } else {
                alert('跳转第三方链接获取异常')
              }
            } else {
              // 需要实名
              this.checkAuthStatus()
            }
            // }
            // else if (this.ProAndOrgType.IS_REALTIME_DATA_PRD == 1) {
            // h5直联
            // this.checkAuthStatus()
            // } else {
            //   this.checkAuthStatus()
            // }
          }
          else if (this.ProAndOrgType.IS_SYNC_FLAG == 1) {
            // 是 openApi
            // this.checkBankStatus()
            // this.checkBankOpenAndLogin()
            this.checkAuthStatus()
          }
          else {
            this.checkAuthStatus()
          }
        }, err => {
          API.watchApi({
            FUNCTION_ID: 'ptb0A007', // 点位
            REMARK_DATA: '异业合作-登录', // 中文备注
          })
          this.cms = ''
          // this.getMsgCodeSuccess = false
          // this.codeText = '重新发送'
          // this.msgDisabled = false
          // clearInterval(timer)
          // util.storage.session.remove(LsName.token)
          // this.getImgCode()
          this.$store.commit('SET_TOKEN', '')
        })
      },
      // 刷新图片
      getImgCode() {
        API.commonApi.getImgCode({}, res => {
          this.IMG = res
        }, err => {
        })
      },
      // 点击获取验证码
      getSafeCode() {
        if (this.safeCode === '') {
          Bus.$emit(BusName.showToast, '请输入图形验证码')
          return
        }
        this.getMsg(true)
      },
      // 数字校验
      isValueNumber(value) {
        return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value);
      },
      // 获取验证码
      getMsg(canLogin = false) {
        // this.getMsgCodeSuccess = false
        let data = {
          PHONE_NUM: this.tel + '',
          SAFT_CODE: this.safeCode
        }
        this.safeCode = ''
        API.bicai.sendSMS(data, (res) => {
          let data = res
          let mark = data.mark // 0 未满5次，1满五次
          if (mark == 0) {
            // Bus.$emit(BusName.showSendMsg, this.tel)
            // this.getMsgCodeSuccess = true
            this.timeDown()
          } else {
            console.log(canLogin);
            if (canLogin) { // 用于拦截第一次
              // 成功！
              // this.getMsgCodeSuccess = true
              // Bus.$emit(BusName.showSendMsg, this.tel)
              this.timeDown()
            } else {
              this.getImgCode()
              this.showSafeCode = true
            }
          }
        }, err => {
          this.getImgCode()
          // this.getMsgCodeSuccess = false
          this.codeText = '重新发送'
          this.msgDisabled = false
          clearInterval(timer)
          this.$store.commit('SET_TOKEN', '')
        })
      },
      // 焦点
      focusHandle() {
        this.telShow = true
        this.telPaceholder = ''
        $('.input').css({
          fontSize: '.5rem'
        })
      },
      //
      clickMsgCodeHandle() {
        let PHONE = this.tel
        PHONE = PHONE + ''
        if (util.Check.tel(PHONE, true)) return;
        this.getImgCode()
        this.getMsg()
      },
      // msg倒计时
      timeDown() {
        this.showSafeCode = false
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
    padding-left: px2rem(20);
    span {
      padding-top: px2rem(10);
      padding-left: px2rem(20);
      font-size: px2rem(20);
      color: #49546C;
      vertical-align: top;
    }
    img {
      vertical-align: top;
      width: px2rem(50);
      height: px2rem(46);
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
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      margin: px2rem(200) auto 0;
      background: #fff;
      padding-top: px2rem(10);
      text-align: center;
      width: px2rem(280);
      height: px2rem(150);
      border-radius: px2rem(6);
    }
    p {
      flex: 1;
      font-size: px2rem(18);
    }
    .btn {
      flex: 2;
      display: flex;
      button {
        flex: 1;
        border-top: 1px solid #ccc;
        color: #007aff;
        &:first-child {
          border-right: 1px solid #ccc;
        }
      }

    }

    .middle {
      display: flex;
      padding: px2rem(15);
      flex: 2;
      img {
        width: px2rem(80);
        height: px2rem(40);
      }
      input {
        flex: 1;
        padding-left: px2rem(10);
        height: px2rem(40);
        border: 1px solid #ccc;
      }
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
    color: #cccccc;
    border: 1px solid #cccccc;
    font-size: px2rem(18);
    border-radius: px2rem(6);
    width: px2rem(255);
    height: px2rem(44);
    margin: px2rem(66) auto 0;
    text-align: center;
    display: block;
    &.active {
      color: #508CEE;
      border: 1px solid #508CEE;
    }
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
</style>
