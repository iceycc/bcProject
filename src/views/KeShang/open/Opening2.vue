<template>
  <div class="warp">
    <app-bar title="信息填写"></app-bar>
    <section class="wrapicon">
      <section class="circle left">
                <span class="line1">
                    <img :src='stepImg' alt="">
                </span>
        <span class="step-text">开户信息验证</span>
      </section>
      <section class="circle right">
                 <span class="line2 hui">
                    <img :src='stepImg' alt="">
                </span>
        <span class="step-text" style="color:#D3D3D3">绑定银行卡</span>
      </section>
    </section>

    <div class="opening_box">

      <section class="bank">
        <span style="padding-right: 0px" class="left-p">选择银行</span>
        <!--<input type="text" name="back" placeholder=" 请选择银行" v-model="data.ORG_ID">-->
        <!-- <span  class="limit">银行限额</span>  -->
        <Bank-select class="bank-box" :text="bankText" :options="bankList" @getValue="getBank"
                     title="银行列表"></Bank-select>

      </section>
      <section class="input-box">
        <p class="left-p"> 绑定卡卡号</p>
        <input type="number"
               @blur="checkBankName(data.CARD_NO)"
               name="backname" placeholder="请输入储蓄卡卡号" v-model="data.CARD_NO">
      </section>
      <section class="input-box">
        <p class="left-p">手机号码</p>
        <input
          :disabled="telDisabled"
          type="text" name="tel" placeholder="银行预留手机号" v-model="tel">
      </section>
      <section class="input-box">
        <p class="left-p">验证码</p>
        <input
          type="text" placeholder="验证码" v-model="data.PHONE_CODE">
        <button class="msg-code" @click="clickMsgCodeHandle" :disabled="disable">{{codeText}}</button>
      </section>
    </div>
    <!--errMsg-->
    <div class="msg-err" v-if="errMsg">
      <span>{{errMsg}}</span>
    </div>
    <!-- <div class="tijiao Tips">请使用该预留手机号进行开户</div> -->
    <button class="tijiao" @click="goNext">下一步</button>
  </div>
</template>
<script>
  import {PageName, BusName, LsName} from "@/Constant";
  import Bus from '@/plugin/bus'
  import BankSelect from '@/components/commons/BankSelect'
  import Opening2Mixins from './Opening2'
  import util from "../../../libs/util";

  import PassWordZhengzhou from '@/components/password/PassInputZhengzhou'

  export default {
    data() {
      return {
        data: {
          CARD_NO: '', // 银行卡号 6214830182284272  6217730711297810
          HAS_BAND: '0', // 是否绑定过
          PHONE_NUM: '', // 15711310733   15011352818
          PRE_PHONE_NUM: '', // 预留 这个是页面取的
          PHONE_CODE: '', // 手机验证码
          LAST_STEP_NUM: '', // 步数
          MESSAGE_TOKEN: '',
          REQ_SERIAL: ''
        },
        tel: '',
        canClick: true,
        codeText: "获取验证码",
        disable: false,
        bankList: [],
        bank: '-1',
        bankText: '请选择开户银行',
        stepImg: require('@/assets/images/account_icon_green2@2x.png'),
        stepImg2: require('@/assets/images/step2@2x.png'),
        stepImg3: require('@/assets/images/step3.png'),
        AllBankListObj: {},
        errMsg: '',
        checkBankName1: false,
        callbackInfos: {}
      }
    },
    mixins: [Opening2Mixins],
    components: {
      BankSelect,
      PassWordZhengzhou
    },
    watch: {
      tel(n, o) {
        if (n.length > 11) { // >11截取
          console.log(n);
          this.tel = n.toString().substr(0, 11)
        }
      },
      bankText(n, o) {
        this.checkBankName(this.data.CARD_NO)
      }
    },
    filters: {
      telFlter(n) {
        if (n.length > 11) { // >11截取
          return n.toString().substr(0, 11)
        }
      }
    },
    created() {
      // if (this.$route.name !== PageName.Opening1) {
      //   this.checkBankStatus()
      // }
      this.callbackInfos = this.getComState.openingData
      console.log('callbackInfos>>>', this.callbackInfos);
      this.tel = this.callbackInfos.PHONE_NUM || ''
      this.getBankList()
    },
    methods: {
      checkBankName(val) {
        this.checkBankName1 = false
        // this.checkBankType()
        val = val.replace(/\s+/g, "")
        let bankName
        for (var i = 3; i < 8; i++) {
          if (bankName = this.machBankName((val + '').slice(0, i))) {
            this.bankText = bankName
            console.log('bankName', bankName);
            break
          }
        }
      },
      checkBankNo(val) {
        // 查询银行账户类型
        // this.checkBankType && this.checkBankType()
        val = val.toString()
        let reg = /\d{15}|\d{19}/
        console.log(!reg.test(val));
        if (val == '') {
          Bus.$emit(BusName.showToast, '银行卡号不能为空')
          return true
        }
        else if (val.length < 15 || val.length > 19) {
          Bus.$emit(BusName.showToast, '银行卡号格式不正确')
          return true
        } else {
          return false
        }

      },
      machBankName(pin) {
        return this.AllBankListObj[pin]
      },
      getBank(val) {
        console.log(val);
        this.bankText = val.name
      },

      // 下一步
      goNext() {
        this.doOpengingSecond()
      }
    }

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/px2rem";

  .warp {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .opening_box {
    .bank {
      margin-left: 0.6rem;
      line-height: 1.3rem;
      width: 90%;
      background-size: 0.7rem 0.7rem;
      border-bottom: 1px #E5E5E5 solid;
      display: flex;
      font-size: px2rem(14);
    }
    .input-box {
      margin: 0 auto;
      width: px2rem(330);
      border-bottom: 1px #E5E5E5 solid;
      display: flex;
      .left-p {
        width: px2rem(80) !important;
        box-sizing: border-box;
        font-size: px2rem(14);
        font-family: PingFangSC-Regular;
        color: #444;
        padding: px2rem(15) 0;
      }
      input {
        text-align: left;
        font-size: px2rem(14);
        flex: 1;
        color: #333
      }
      button {
        margin-top: px2rem(12);
      }
    }
  }

  .tijiao {
    display: block;
    font-size: px2rem(16);
    color: #fff;
    background-color: #508CEE;
    border-radius: px2rem(4);
    line-height: 1rem;
    width: px2rem(255);
    height: px2rem(44);
    margin: px2rem(55) auto px2rem(20);
    text-align: center;
    border: none;
    outline: none;
  }

  .bank-box {
    display: inline-block;
    width: px2rem(150);
    vertical-align: middle;
  }

  .msg-code {
    vertical-align: middle;
    font-size: px2rem(13);
    width: px2rem(100);
    height: px2rem(26);
    line-height: px2rem(26);
    border: 1px solid #2B74FE;
    border-radius: px2rem(4);
    color: #2B74FE;
    margin-bottom: px2rem(10);
  }

  .wrapicon {
    display: flex;
    position: relative;
    margin-bottom: .3rem;
    margin-top: px2rem(4);
    .step-text {
      padding-top: px2rem(7);
    }
    .circle {
      flex: 1;
      display: flex;
      flex-direction: column;
      &.left{
        text-align: left;
        padding-left:px2rem(30) ;
      }

      &.right{
        text-align: right;
        padding-right:px2rem(30) ;
      }
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
        width: 90%;
        background: #92d048;
        height: .1rem;
        overflow: hidden;

      }
    }
    
    .line2 {
      &:after {
        left: 0;
        right: auto;
      }
    }
    .line3 {
      &:after {
        left: 0;
        right: auto;
      }
    }

  }

  .msg-err {
    text-align: center;
    margin: px2rem(20) auto 0;
    span {
      display: inline-block;
      min-width: px2rem(200);
      font-size: px2rem(12);
      color: #fff;
      background-color: #FF5B05;
      border-radius: px2rem(5);
      height: px2rem(29);
      line-height: px2rem(29);
      padding: 0 px2rem(10);
    }
  }


</style>
