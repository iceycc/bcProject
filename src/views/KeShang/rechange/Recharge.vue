<template>
  <div class="app">
    <app-bar title="充值"></app-bar>
    <div class="rechargetitle">充值到{{ORG_NAME}}</div>
    <div class="minshengbank">
      <span class="minshengbankLogo">
        <img :src="imgSrc + logo" style="width:75%" alt="">
      </span>
      <div class="new-add">
        <p>{{ORG_NAME}}</p>
        <p>**** **** **** {{BANK_USER_CODE.substr(BANK_USER_CODE.length - 4)}}</p>
      </div>

    </div>
    <div class="rechargetitle">银行卡</div>
    <div class="minshengbank" @click="clickBank" style="border-bottom:1px solid #EEEEF0">
      <span class="minshengbankLogo">
        <img :src="imgSrc + CARD_BANK_URL" style="width:75%" alt="">
      </span>
      <div class="new-add">
        <p>{{CARD_BANK_NAME}}</p>
        <p>**** **** **** {{CARD_NUM.substr(CARD_NUM.length - 4)}}</p>
      </div>
      <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
    </div>
    <div class="money">
      <p>每日限额：{{DAY_QUOTA | formatNumKS}}</p>
      <p>单笔限额：{{SINGLE_QUOTA | formatNumKS}}</p>
    </div>
    <section class="inputAmount" style="border-top: .4rem solid #f6f6f6">
      <span class="Amount">金额</span>
      <input @change="checkMoney"
             v-model="APPLY_AMOUNT" type="number" placeholder="请输入金额">
      <img
        v-show="!ifCheckMoneyEmpty"
        src="@/assets/images/icon_clear@2x.png" alt="" class="close-icon" @click="clearNumHandle">
    </section>
    <section class="inputAmount" v-if="!write">
            <span class="Amount">
                验证码
            </span>
      <input type="text" v-model="msgCode" placeholder="输入验证码">
      <button
        :disabled="disable"
        @click="getMsg"
        class="button">{{codeText}}
      </button>
    </section>
    <button :class="{tijiao:true,active:canClick}" @click="doNext" :disabled="!canClick">确认充值</button>
    <p :class="{'bang':true,'no':agree == false}" v-if="!write"
       @click="doAgree">我已阅读并同意<span @click.stop="showPage" style=" color:#0096FE;">《充值委托代扣协议》</span></p>

    <up-select
      title="选择银行卡"
      :show="upseletShow"
      :BankList="mainBankList"
      @chooseBank="chooseBank"
    ></up-select>
  </div>
</template>
<script>
  import {HOST_API, LsName} from '@/Constant'
  import UpSelect from '@/components/keshang/UpSelect'
  import Bus from '@/plugin/bus'
  import {PageName, imgSrc, BusName} from "@/Constant";
  import util from "libs/util";
  import Mixins from "@/mixins";
  import RechangeMixins from "./Rechange";
  import IconFont from '@/components/commons/IconFont'


  let time = 60
  export default {
    data() {
      return {
        timer: null,
        html: '协议',
        page: false,
        PIN: '',
        APPLY_AMOUNT: '',
        toUrl: '',
        ifGet: false,
        write: false, // 是否签约
        agree: true, // 是否阅读
        agree1: true, // 是否获取短信
        agreeMentSrc: HOST_API + '/static/finsuit/js/openapi/js/xieyi/cz.html',
        ORG_NAME: '',
        CARD_NUM: '', //一类户卡号
        BANK_USER_CODE: '', //二类户卡号
        BANK_USER_ID: '', //银行用户ID
        MESAGE_TOKEN: '', //短信验证码标识
        imgSrc: imgSrc,
        logo: '',
        CARD_BANK_NAME: '',
        CARD_BANK_URL: '',
        DAY_QUOTA: '-1', // 单日限额
        SINGLE_QUOTA: '-1',
        msgCode: '',
        codeText: '获取验证码',
        disable: false,
        upseletShow: false,
        mainBankList: [],
        passCode: '',
        ACCT_NO: '', // TODO
        PHONE_NUM: '',
        ORIGIN_PAGE: ''// 来源页面
      }
    },
    components: {
      UpSelect,
      IconFont
    },
    mixins: [Mixins.UtilMixin, RechangeMixins],
    created() {
      this.getInfos()
      this.ORIGIN_PAGE = this.$route.query.ORIGIN_PAGE || ''
    },
    filters: {
      formatNumKS(str) {
        if (str == '-1') {
          return '无限额'
        }
        if (!str) return '0.00'
        str = str + ''
        // if(str == '' || !str) return
        // if (!Number(str)) return str
        var newStr = "";
        var count = 0;
        if (str.indexOf(".") == -1) {
          for (var i = str.length - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
              newStr = str.charAt(i) + "," + newStr;
            } else {
              newStr = str.charAt(i) + newStr;
            }
            count++;
          }
          str = newStr + ".00"; //自动补小数点后两位
          return str + '元'
        } else {
          for (var i = str.indexOf(".") - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
              newStr = str.charAt(i) + "," + newStr; //碰到3的倍数则加上“,”号
            } else {
              newStr = str.charAt(i) + newStr; //逐个字符相接起来
            }
            count++;
          }
          str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
          return str + '元'
        }
      },
    },
    computed: {
      ifCheckMoneyEmpty() {
        if (this.APPLY_AMOUNT) {
          return false
        } else {
          return true
        }
      },
      canClick() {
        if (Number(this.APPLY_AMOUNT) && this.msgCode && this.agree) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      chooseBank(bank) {
        this.CARD_BANK_NAME = bank.CARD_BANK_NAME;// 银行名称
        this.CARD_BANK_URL = bank.CARD_BANK_URL
        this.DAY_QUOTA = bank.DAY_QUOTA
        this.SINGLE_QUOTA = bank.SINGLE_QUOTA
        this.CARD_NUM = bank.CARD_NUM
      },
      clearNumHandle() {
        this.APPLY_AMOUNT = ''
      },
      getMsg() {
        if (util.Check.trim(this.APPLY_AMOUNT, '充值金额', true)) return;
        if (this.APPLY_AMOUNT - 0 > this.DAY_QUOTA - 0 && this.DAY_QUOTA != '-1') {
          Bus.$emit(BusName.showToast, '充值金额大于银行每日限额规定，请调整充值金额')
          return
        }
        if (this.APPLY_AMOUNT - 0 > this.SINGLE_QUOTA - 0 && this.SINGLE_QUOTA != '-1') {
          Bus.$emit(BusName.showToast, '充值金额大于银行单笔限额规定，请调整充值金额')
          return
        }
        if (!this.agree) {
          Bus.$emit(BusName.showToast, '请先同意充值协议')
          return
        }
        let times = time
        this.disable = true
        this.timer = setInterval(() => {
          if (times == 0) {
            this.codeText = '重新发送'
            this.disable = false
            clearInterval(this.timer)
            return
          }
          times--
          this.codeText = `${times}s`
        }, 1000)
        this.getCode()
      },
      showPage() {
        this.$router.push({name: PageName.DocsPage, query: {type: 'recharge'}})
      },
      doAgreeHandle() {
        this.agree = true
        this.page = false
      },
      cancel() {
        this.page = false
      },
      checkMoney() {
        if (this.APPLY_AMOUNT - 0 > this.DAY_QUOTA - 0 && this.DAY_QUOTA != '-1') {
          Bus.$emit(BusName.showToast, '充值金额大于银行每日限额规定，请调整充值金额')
          return
        }
        if (this.APPLY_AMOUNT - 0 > this.SINGLE_QUOTA - 0 && this.SINGLE_QUOTA != '-1') {
          Bus.$emit(BusName.showToast, '充值金额大于银行单笔限额规定，请调整充值金额')
          return
        }
      },
      doNext() {
        console.log(this.write);
        if (util.Check.trim(this.APPLY_AMOUNT, '充值金额', true)) return;
        if (this.APPLY_AMOUNT - 0 > this.DAY_QUOTA - 0 && this.DAY_QUOTA != '-1') {
          Bus.$emit(BusName.showToast, '充值金额大于银行每日限额规定，请调整充值金额')
          return
        }
        if (this.APPLY_AMOUNT - 0 > this.SINGLE_QUOTA - 0 && this.SINGLE_QUOTA != '-1') {
          Bus.$emit(BusName.showToast, '充值金额大于银行单笔限额规定，请调整充值金额')
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
  @import "~@/assets/px2rem";

  .rechargetitle {
    padding-left: 0.5rem;
    height: 0.8rem;
    background: #F6F6F9;
    line-height: 0.8rem;
    color: #444444;
    font-size: 0.4rem;
  }

  .minshengbank {
    position: relative;
    padding-left: 0.5rem;
    height: 1.8rem;
    font-size: 0.5rem;
    display: flex;
    align-items: center;

    .new-add {
      font-size: px2rem(16);

      p:last-child {
        color: #9199A1;
      }
    }

    .detail {
      right: px2rem(20);
      top: px2rem(15);
      color: #999999;
      position: absolute;
    }
  }

  .money {
    padding: .2rem 0 .2rem 0.5rem;
    color: #9199A1;
    font-size: 0.4rem;
  }

  .inputAmount {
    position: relative;
    padding-left: 0.5rem;
    height: 1.2rem;
    line-height: 1rem;
    font-size: 0.4rem;
    border-bottom: 1px solid #EEEEF0;

    .close-icon {
      position: absolute;
      display: inline-block;
      width: px2rem(15);
      height: px2rem(15);
      top: 50%;
      transform: translateY(-50%);
      right: px2rem(30);
    }

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
    font-size: px2rem(18);
    color: #fff;
    background: #ccc;
    border-radius: px2rem(6);
    line-height: 1.2rem;
    width: px2rem(255);
    margin: px2rem(30) auto px2rem(10);
    text-align: center;
    border: 0px;
    outline: none;
    display: block;

    &.active {
      background: #508CEE;
    }
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
    width: px2rem(50);
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


</style>
