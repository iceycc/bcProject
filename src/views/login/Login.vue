<template>
  <div id="app" class="hello">
    <app-bar title="安全登录"></app-bar>
    <!--不同银行展示不同的logo和名称,以后抽离组件 专门用于管理-->
    <template v-if="ORG_ID=='70'">
      <img class="logo" src="@/assets/images/logoaaa_03.png" alt="">
    </template>
    <template v-if="ORG_ID=='100'">
      <img class="logo" src="@/assets/images/logoaaa_03.png" alt="">
    </template>
    <p class="titlecontent">
      欢迎登录{{BANK_NAME}}直销账户</p>
    <div class="login_box">
      <section class="input-box">
        <transition name="fade">
          <p class="label" v-show="telShow">开户手机号</p>
        </transition>
        <input class="input" type="input"
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
      <button :disabled="disabled" :class="{'tijiao':true, 'agree':!disabled}" @click="loginFactory(ORG_ID)">
        登录
      </button>
      <div class="lijizhuce">
        <span @click="goOpen" class="noOpen">还未开户，立即注册</span>
      </div>
      <p class="buy-info">温馨提示：各类理财产品额度有限，提前开户可提高抢购成功率。</p>
    </div>
    <div class="bottomcontent">
      <p>
        <img src="@/assets/images/icon_dunpai@2x.png" alt="">
        晋商银行已与比财实现安全直连</p>
    </div>
  </div>
</template>
<script>
  import API from "@/service"
  import {LsName, BusName, PageName} from "@/Constant";
  import Bus from '@/plugin/bus'
  import PassInput from '@/components/password/PassInput'
  import {Mixin, UtilMixin, LoginMixins,StoreMixin} from '@/mixins'
  import util from 'libs/util'

  export default {
    data() {
      return {
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
        passPluginText: '',
        currentTel: '',

        ORG_ID: '70', //
        BANK_NAME: '',
        LOGO_URL: ''
      }
    },
    mixins: [Mixin, UtilMixin, LoginMixins,StoreMixin],
    components: {
      PassInput
    },
    inject: ['reload'],
    created() {
      this.ORG_ID = this.$store.getters.GET_BANK_INFO.ORG_ID
      this.BANK_NAME = this.$store.getters.GET_BANK_INFO.BANK_NAME
      let preInfo = this.getComState.loginInfo;
      if (preInfo) {
        this.tel = preInfo.PHONE_NUM
        Bus.$emit(BusName.showToast, preInfo.msg)
        this.removeComState('loginInfo')
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
      }
    },

    methods: {
      isValueNumber(value) {
        return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value);
      },

      goRePass() { // 去重制密码
        // this.setComState({type:"reload",value:true}) // reload-001
        this.setComState({type: 'reload', value: true})
        this.$router.push({
          name: PageName.ResetPassword
        })
      },
      goOpen() { // 去开户
        API.watchApi({
          FUNCTION_ID: 'ptb0A008', // 点位
          REMARK_DATA: '异业合作-还未开户，立即注册', // 中文备注
        })
        this.setComState({type: 'reload', value: true})
        // this.setComState({type:"reload",value:true}) // reload-001
        this.$router.push({name: PageName.Opening1})
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
  @import "~@/assets/px2rem";

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

  .buy-info {
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
