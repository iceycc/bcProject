<template>
  <div class="warp">
    <app-bar title="信息填写"></app-bar>
    <section class="wrapicon">
      <section class="circle">
                <span class="line1">
                    <img :src='stepImg' alt="">
                </span>
        <p class="step-text" style="color:#92d048">开户信息验证</p>
      </section>
      <section class="circle">
                 <span class="line2">
                    <img :src='stepImg' alt="">
                </span>
        <p class="step-text" style="color:#92d048">绑定银行卡</p>
      </section>
      <section class="circle">
                 <span class="line3 hui">
                    <img :src='stepImg3' alt="">
                </span>
        <p class="step-text" style="color:#D3D3D3">设置密码</p>
      </section>
    </section>

    <div class="opening_box">
      <p class="infos" style="margin: 10px 0;">请拍摄并上传身份证</p>
      <section class="input-box">
        <p class="left-p"> 绑定卡卡号</p>
        <input type="number"
               @blur="checkBankNo(data.CARD_NO)"
               @input="checkBankName(data.CARD_NO)"
               name="backname" placeholder="请输入储蓄卡卡号" v-model="data.CARD_NO">
      </section>
      <section class="bank">
        <span style="padding-right: 0px" class="left-p">选择银行</span>
        <!--<input type="text" name="back" placeholder=" 请选择银行" v-model="data.ORG_ID">-->
        <!-- <span  class="limit">银行限额</span>  -->
        <Bank-select class="bank-box" :text="bankText" :options="bankList" @getValue="getBank"
                     title="银行列表"></Bank-select>

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
    <button :class="{cantNext:cantNext}" :disabled="cantNext" class="tijiao" @click="goNext">下一步</button>

  </div>
</template>
<script>
  import {PageName, BusName, LsName} from "@/Constant";
  import Bus from '@/plugin/bus'
  import BankSelect from '@/components/commons/BankSelect'
  import Opening2Mixins from './Opening2'
  import Mixins from "@/mixins";

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
        cantNext:true,
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
        checkBankName1: false
      }
    },
    mixins: [Opening2Mixins],
    components: {
      BankSelect,
      PassWordZhengzhou,
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
      this.data.REQ_SERIAL = this.$route.query.REQ_SERIAL
      this.data.LAST_STEP_NUM = this.$route.query.LAST_STEP_NUM
      // this.tel = this.$route.query.PHONE_NUM || ''
      this.getBankList()
    },
    methods: {
      checkBankName() {
        this.getBankNameByCardNo()
      },
      checkBankNo(val) {
        console.log(1);
        this.checkBankType && this.checkBankType()
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
    width: px2rem(335);
    height: px2rem(44);
    margin: px2rem(55) auto px2rem(20);
    text-align: center;
    border: none;
    outline: none;
    &.cantNext{
      background: #ccc;
      color: #fff;
    }
  }
  .infos{
    padding-left: px2rem(20);
    font-size:px2rem(14)
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
    margin:  px2rem(4) auto px2rem(10);
    text-align: center;
    display: flex;
    position: relative;
    width: px2rem(235);
    .step-text {
      padding-top: px2rem(7);
    }
    .circle {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .line1, .line2, .line3 {
      position: relative;
      img {
        width: px2rem(23);
      }
      &:after {
        display: block;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-100%);
        content: '';
        width: 39%;
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
        width: 36%;
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
