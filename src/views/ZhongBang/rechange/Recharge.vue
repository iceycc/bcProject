<template>
  <div class="app">
    <app-bar title="充值"></app-bar>
    <div class="rechargetitle">充值到{{ORG_NAME}}直销银行</div>
    <div class="minshengbank">
            <span class="minshengbankLogo"><img :src="imgSrc + logo" style="width:75%"
                                                alt=""></span>
      {{ORG_NAME}}
    </div>
    <div class="rechargetitle">银行卡</div>
    <div class="minshengbank"
         @click="clickBank"
         style="border-bottom:1px solid #EEEEF0">
            <span class="minshengbankLogo" style=" padding-top: 10px;">
              <img :src="imgSrc + CARD_BANK_URL" style="width:75%" alt="">
            </span>
      {{CARD_BANK_NAME}}
    </div>
    <div class="money">
      <p>每笔限额：{{SINGLE_QUOTA | formatNum}}元</p>
      <p>每日限额：{{DAY_QUOTA | formatNum}}元</p>
    </div>
    <section class="inputAmount" style="border-top: .4rem solid #f6f6f6">
      <span class="Amount">金额</span>
      <input @change="checkMoney"
             v-model="APPLY_AMOUNT" type="number" placeholder="请输入金额">
    </section>
    <section class="inputAmount" v-if="!write">
            <span class="Amount">
                验证码
            </span>
      <input type="text" v-model="msgCode" placeholder="请填写短信验证码">
      <button
        :disabled="disable"
        @click="getMsg"
        class="button">{{codeText}}
      </button>
    </section>
    <button class="tijiao" @click="doNext">确认充值</button>
    <p :class="{'bang':true,'no':agree == false}" v-if="!write"
       @click="doAgree">我已阅读并同意<span @click.stop="showPage" style=" color:#0096FE;">《充值协议》</span></p>
    <section v-show="page" class="page">
      <div class="docs">
        <iframe :src="agreeMentSrc" class="indocs"></iframe>
      </div>
      <div class="btn">
        <mt-button type="primary" @click="cancel">取消</mt-button>
        <mt-button type="primary" @click="doAgreeHandle">确认</mt-button>
      </div>
    </section>
    <section v-if="show" class="bgbox">
      <section class="passbox">
        <p class="title">
          <img src="@/assets/images/icon_dunpai@2x.png" alt="">
          由郑州银行提供技术保障</p>
        <section class="field_row_wrap">
          <p class="field_row_key">
            交易密码
          </p>
          <div class="field_row_value">
            <pass-word-zhengzhou
              BankCardPass="payPassAA"
            ></pass-word-zhengzhou>
          </div>
          <p class="info">密码由数字组成，必须为6位</p>
        </section>
        <div class="btn">
          <mt-button @click="show =!show" type="primary">取消</mt-button>
          <mt-button @click="doReCange" type="primary">提交</mt-button>
        </div>
      </section>
    </section>
    <up-select
      :show="upseletShow"
      :BankList="mainBankList"
    ></up-select>
  </div>
</template>
<script>
  import API from "@/service";
  import PassWordZhengzhou from '@/components/password/PassInputZhengzhou'
  import {HOST, LsName} from '@/Constant'
  import UpSelect from '@/components/commons/UpSelect'
  import Bus from '@/plugin/bus'
  import {PageName, imgSrc, BusName} from "@/Constant";
  import util from "libs/util";
  // import {HandleMixin, UtilMixin, RechangeMixins, } from '@/mixins'
  import Mixins from "@/mixins";
  import RechangeMixins from "./Rechange";


  let time = 60
  let timer;
  export default {
    data() {
      return {
        show: false,
        html: '协议',
        page: false,
        PIN: '',
        APPLY_AMOUNT: '',
        toUrl: '',
        ifGet: false,
        write: false, // 是否签约
        agree: true, // 是否阅读
        agree1: true, // 是否获取短信
        agreeMentSrc: HOST + '/static/finsuit/js/openapi/js/xieyi/cz.html',
        ORG_NAME: '',
        imgSrc: imgSrc,
        logo: '',
        CARD_BANK_NAME: '',
        CARD_BANK_URL: '',
        DAY_QUOTA: '10000', // 单日限额
        SINGLE_QUOTA: '500',// 单笔限额
        msgCode: '',
        codeText: '获取验证码',
        disable: false,
        upseletShow: false,
        mainBankList: [],

        passCode: '',
        ACCT_NO: '', // TODO
        PHONE_NUM: ''
      }
    },
    components: {
      UpSelect,
      PassWordZhengzhou
    },
    mixins: [Mixins.HandleMixin, Mixins.UtilMixin, RechangeMixins],
    created() {
      this.getInfos()

      // this.reChangeHandele()
    },
    methods: {
      getMsg() {
        if (util.Check.trim(this.APPLY_AMOUNT, '充值金额', true)) return;
        if (this.APPLY_AMOUNT - 0 > this.SINGLE_QUOTA - 0) {
          Bus.$emit(BusName.showToast, '充值金额大于银行每笔限额规定，请调整充值金额')
          return
        }
        if (!this.agree) {
          Bus.$emit(BusName.showToast, '请先同意充值协议')
          return
        }
        let times = time
        this.disable = true
        timer = setInterval(() => {
          if (times == 0) {
            this.codeText = '重新发送'
            this.disable = false
            clearInterval(timer)
            return
          }
          times--
          this.codeText = `${times}s`
        }, 1000)
        this.getCode()
      },
      showPage() {
        this.page = true
      },
      doAgreeHandle() {
        this.agree = true
        this.page = false
      },
      cancel() {
        this.page = false
      },
      checkMoney() {
        if (this.APPLY_AMOUNT - 0 > this.SINGLE_QUOTA - 0) {
          Bus.$emit(BusName.showToast, '充值金额大于银行每笔限额规定，请调整充值金额')
        }
      },
      doNext() {
        console.log(this.write);
        if (util.Check.trim(this.APPLY_AMOUNT, '充值金额', true)) return;
        if (this.APPLY_AMOUNT - 0 > this.SINGLE_QUOTA - 0) {
          Bus.$emit(BusName.showToast, '充值金额大于银行每笔限额规定，请调整充值金额')
          return
        }
        this.doReCange()
      },
      doAgree() {
        this.agree = !this.agree
      },
      doReCange() {
        this.handleApiRecharge()
      },
    }
  }
</script>

<style lang="scss" scoped>
  .app .rechargetitle {
    padding-left: 0.5rem;
    height: 0.8rem;
    background: #F6F6F9;
    line-height: 0.8rem;
    color: #444444;
    font-size: 0.4rem;
  }

  .minshengbank {
    padding-left: 0.5rem;
    height: 1.8rem;
    line-height: 60px;
    font-size: 0.5rem;
  }

  .money {
    padding-left: 0.5rem;
    margin-top: .2rem;
    height: 1.7rem;
    color: #9199A1;
    font-size: 0.4rem;
  }

  .app .inputAmount {
    padding-left: 0.5rem;
    height: 1.2rem;
    line-height: 1rem;
    font-size: 0.4rem;
    border-bottom: 1px solid #EEEEF0;
    .button {
      vertical-align: middle;
      width: 2.5rem;
      display: inline-block;
      padding: .1rem;
      border: 1px solid #508CEE;
      color: #508CEE
    }
    input {
      width: 50%;
      border: none;
      box-sizing: border-box;
      font-size: 0.4rem;
      color: #333;
      /* line-height: 0.5rem; */
      outline: none;

    }
  }

  .Amount {
    display: inline-block;
    height: 100%;
    width: 1.8rem;
  }

  .tijiao {
    margin-top: 50px;
    font-size: 0.5rem;
    color: #fff;
    background-color: #508CEE;
    /* border-radius: 0.1rem; */
    line-height: 1.2rem;
    width: 80%;
    margin: 0 auto;
    text-align: center;
    margin-top: 0.8rem;
    border: 0px;
    outline: none;
    display: block;
  }

  .bang {
    margin-left: 0.5rem;
    margin-top: 0.5rem;
    background: url(~@/assets/images/agree@3x.png) no-repeat 0 0.05rem;
    background-size: 0.4rem 0.4rem;
    font-size: 0.4rem;
    color: #808080;
    padding: 0 0.5rem;

  }

  .no {
    background: url(~@/assets/images/onagree@3x.png) no-repeat 0 0.05rem;
    background-size: 0.4rem 0.4rem;
  }

  .minshengbankLogo {
    line-height: 100%;
    display: inline-block;
    height: 60%;
    width: 50px;
    float: left;
    padding-top: 0.4rem;
  }

  .page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 100;
    .docs {
      border: none;
      width: 100%;
      height: 90%;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      padding: 0 .2rem;
    }
    .indocs {
      border: none;
      width: 100%;
      height: 100%;
    }
    .btn {
      padding: 0 1rem;
      text-align: center;
      button {
        width: 3.5rem;
        margin-right: .4rem;
      }
    }
  }

  .bgbox {
    z-index: 2;
    width: 100%;
    height: 100%;
    background: rgba(1, 1, 1, .7);
    position: fixed;
    padding-top: 1.7rem;
    top: 0;
    left: 0;
    .passbox {
      background: #fff;
      width: 80%;
      margin: 0 auto;
      padding: 0.4rem;
      box-sizing: border-box;
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
      border-radius: 4px;
      border: 1px solid #9e9e9e;
      height: 0.9rem;
      line-height: 0.9rem;
      margin: 0.2rem 0;
    }
    .info {
      font-size: 0.3rem;
      line-height: 0.6rem;
      color: #aeaeae;
    }
    .btn {
      display: flex;
      button {
        margin: 0 .3rem;
        text-align: center;
        flex: 1;
      }
    }
  }
</style>
