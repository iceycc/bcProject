<template>
  <div class="warp">
    <app-bar title="信息填写"></app-bar>
    <section class="wrapicon">
      <section class="circle">
                <span class="line1">
                    <img :src='stepImg' alt="">
                </span>
        <p class="step-text">开户信息验证</p>
      </section>
      <section class="circle">
                 <span class="line2">
                    <img :src='stepImg' alt="">
                </span>
        <p class="step-text">绑定银行卡</p>
      </section>

      <section class="circle">
                 <span class="line3">
                    <img :src='stepImg' alt="">
                </span>
        <p class="step-text">设置密码</p>
      </section>
    </section>
    <div class="login_box">
      <section class="input-box" v-if="showLoginPass">
        <transition name="fade">
          <p class="label" v-if="loginShow">登录密码</p>
        </transition>
        <!--name="text1" :placeholder="telPaceholder" v-model="s_loginPass"-->
        <span class="input"
              @click="showBox"
        >{{telPaceholder}}</span>
      </section>
      <section class="input-box" v-if="showPayPass">
        <transition name="fade">
          <p class="label" v-if="loginShow">交易密码</p>
        </transition>
        <!--name="text1" :placeholder="payPaceholder" v-model="s_payPass"-->
        <span class="input"
              @click="showBox"
        >{{payPaceholder}}</span>
      </section>
      <p class="info">密码由数字组成，必须为6位</p>
    </div>
    <div class="Tips" v-if="errMsg">
      <span>{{errMsg}}</span>
    </div>
    <button
      :class="{'tijiao':true, 'agree':!disabled}"
      :disabled="disabled">开户
    </button>
    <div v-if="ifShow" class="bgbox">
      <!--郑州-->
      <div class="passbox">
        <div class="top">
          <p class="title">
            <img src="@/assets/images/icon_dunpai@2x.png" alt="">
            由郑州银行提供技术保障</p>
          <div class="field_row_wrap">
            <p class="field_row_key">
              交易密码
            </p>
            <div class="field_row_value">
              <pass-word-zhengzhou
                BankCardPass="pay-pass"
              ></pass-word-zhengzhou>
            </div>

            <p class="info">密码由数字组成，必须为6位</p>
          </div>

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

  import PassInput from '@/components/password/PassInput'
  import {BusName, LsName, PageName} from "@/Constant";
  // import {HandleMixin, Opening3Mixins,} from '@/mixins'
  import Mixins from "@/mixins";
  import Opening3Mixins from './Opening3'
  import PassWordZhengzhou from '@/components/password/PassInputZhengzhou'
import Common from './common'

  export default {
    data() {
      return {
        loginShow: false,
        payPaceholder: '交易密码',
        disabled: true,
        reGet: true,
        s_loginPass: '',
        s_payPass: '',
        REQ_SERIAL: '',
        LAST_STEP_NUM: '',
        ifShow: false,
        orgId: 70,
        loginpass: '',
        loginpassLen: 0,
        paypass: '',
        paypassLen: 0,
        ifGet: false,
        stepImg: require('@/assets/images/account_icon_green2@2x.png'),
        stepImg2: require('@/assets/images/step2@2x.png'),
        stepImg3: require('@/assets/images/step3.png'),
        errMsg: ''

      }
    },
    components: {
      PassInput,
      PassWordZhengzhou
    },
    mixins: [Mixins.HandleMixin, Opening3Mixins,Common],
    created() {
      this.checkBankStatus()
      this.getErrMsg((beforeInfo) => {
        this.errMsg = beforeInfo.msg
      })
    },
    methods: {
      cancel() {
        this.ifShow = false
      },
      showBox() {
        this.Londing.open()
        setTimeout(() => {
          this.Londing.close()
          this.ifShow = true
        }, 500)
      },
    }

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/px2rem";

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
      box-sizing: border-box;
    }
    .top {
      padding: 0.4rem;
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
      border-radius: px2rem(4);
      border: 1px solid #DDD;
      height: px2rem(34);
      line-height: px2rem(34);
      padding-left: px2rem(3);
      margin: 0.2rem 0;
    }
    .info {
      font-size: 0.3rem;
      line-height: 0.6rem;
      color: #aeaeae;
    }
    .btn {
      border-top: 1px solid #efefef;
      padding: px2rem(14) 0;
      display: flex;
      button {
        color: #108EE9;
        font-size: px2rem(17);
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
    background: #e4e4e4;
    color: #fff;
    font-size: px2rem(18);
    border-radius: px2rem(5);
    width: px2rem(261);
    height: px2rem(44);
    line-height: px2rem(44);
    margin: px2rem(50) auto 0;
    text-align: center;
    display: block;
    &.agree {
      background: #0072ff;
    }
  }

  .Tips {
    margin: px2rem(17) auto 0;
    text-align: center;
    span {
      box-sizing: border-box;
      display: inline-block;
      background-color: #FF5B05;
      color: #fff;
      min-width: px2rem(261);
      height: px2rem(29);
      line-height: px2rem(29);
      padding: 0 px2rem(6);
      border-radius: px2rem(4);

    }
  }

  .wrapicon {
    text-align: center;
    display: flex;
    position: relative;
    margin-bottom: .3rem;
    margin-top: px2rem(4);

    .circle {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .step-text {
      padding-top: px2rem(7);
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

  .login_box {
    position: relative;
    padding-top: px2rem(20);
    .input-box {
      margin-left: px2rem(20);
      width: 90%;
      background-size: 0.7rem 0.7rem;
      border-bottom: 1px #E5E5E5 solid;
      input {
        @include placeholder(#333)
      }
    }
    .info{
      padding-left: px2rem(20);
      color: #B3B3B3;
      font-size: px2rem(14);
    }
    .label {
      padding: 0;
      margin-top: px2rem(30);
      font-size: px2rem(17);
      color: #858E9F;
    }

    .input {
      /*@include placeholder(#dedede);*/
      height: px2rem(24);
      margin: px2rem(10) 0;
      width: 50%;
      border: none;
      box-sizing: border-box;
      font-size: px2rem(14);
      color: #333;
      /* line-height: 40px; */
      outline: none;
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
