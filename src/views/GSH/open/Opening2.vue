<template>
  <div class="warp">
    <app-bar title="绑定银行卡"></app-bar>
    <open-head :options="[
    {text: '开户信息验证', active: true},
    {text: '绑定银行卡', active: true},
    {text: '短信校验', active: false},
    ]"></open-head>
    <div class="opening_box">
      <select-bank
        :bankText="bankText"
        @showInfo="showXiane"
        @showUpBox="showBindBankList"
      ></select-bank>
      <normal-input
        type="tel"
        v-model="data.CARD_NO"
        text="绑定卡卡号"
        placeholder="请输入银行卡号"
        @blur="checkBankName"
      ></normal-input>
      <normal-input
        type="tel"
        v-model="tel"
        text="手机号码"
        placeholder="请输入手机号码"
      ></normal-input>
    </div>
    <div class="msg-err" v-if="errMsg">
      <span>{{errMsg}}</span>
    </div>
    <submit-button
      class="submit-btn"
      text="下一步"
      bgColor="lightBlue"
      :canSubmit="cantNext"
      @submit="goNext"
    ></submit-button>
    <!--<button :class="{cantNext:cantNext}" :disabled="cantNext" class="tijiao" @click="goNext">下一步</button>-->
    <call-to-bicai info="有疑问，请联系公众号: bicaikef"></call-to-bicai>
    <com-up-select
      @addBank="addBankHandle"
      :show="upseletShow"
      :BankList="mainBankList"
      @chooseBank="chooseBankHandle"
    ></com-up-select>
    <support-bank-list
      v-if="show"
      @getValue="getBank"
      @close="closeHandle"
      :selectValue="bankText"
      :supportBankList="supportBankList"
    ></support-bank-list>
    <bank-card-limit v-if="backShow" @hideHandle="backShow=false"></bank-card-limit>
  </div>
</template>
<script>
  import {PageName, BusName, LsName} from "@/Constant";
  import Bus from '@/plugin/bus'
  import Opening2Mixins from './Opening2'
  import {
    OpenHead,
    UpSelect as ComUpSelect, //
    SupportBankList,
    KshBankCardLimit as BankCardLimit,
    NormalInput,
    SubmitButton,
    CallToBicai,
    SelectBank
  } from '@/components'

  export default {
    data() {
      return {
        backShow: false,// 限额显示
        show: false,
        upseletShow: false,
        title: '选择银行卡',
        mainBankList: [],
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
        AllBankListObj: {},
        errMsg: '',
        checkBankName1: false,
        callbackInfos: {},
        titleSelect: false,
        selectValue: 1,
        IndexObj: {},
        backShow: false
      }
    },
    mixins: [Opening2Mixins],
    components: {
      ComUpSelect,
      BankCardLimit,
      OpenHead,
      NormalInput,
      SubmitButton,
      SupportBankList,
      CallToBicai,
      SelectBank
    },
    watch: {
      tel(n, o) {
        if (n.length > 11) { // >11截取
          console.log(n);
          this.tel = n.toString().substr(0, 11)
        }
      },
    },
    filters: {
      telFlter(n) {
        if (n.length > 11) { // >11截取
          return n.toString().substr(0, 11)
        }
      }
    },
    created() {
      this.getBankList()
      this.callbackInfos = this.getComState.openingData
      console.log('callbackInfos>>>', this.callbackInfos);
      if (this.callbackInfos.hasCardList.length > 0) {
        this.mainBankList = this.callbackInfos.hasCardList
        if (this.callbackInfos.hasCardList[0].isSupport == 0) {
          // 不支持的银行。
        } else {
          this.data.CARD_NO = this.callbackInfos.hasCardList[0].CARD_NO
          this.bankText = this.callbackInfos.hasCardList[0].OPEN_BANK
          this.tel = this.callbackInfos.hasCardList[0].PHONE_NUM
        }
      }
    },
    computed: {
      cantNext() {
        if (this.tel.length >= 11 && this.data.CARD_NO) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      closeHandle() {
        this.show = false
      },
      chooseBankHandle(bank) {
        console.log(bank);
        if (bank.IS_SUPPORT == 0) {
          Bus.$emit(BusName.showToast, '暂不支持该银行')
          return
        }
        // to
        this.bankText = bank.openBank
        this.data.CARD_NO = bank.cardNo
      },
      showXiane() {
        this.backShow = true
      },
      showBindBankList() {
        this.upseletShow = !this.upseletShow
        Bus.$emit('showBankList', true)
      },
      addBankHandle() {
        // this.showBindBankList()
        this.showBankList()
      },
      checkBankName(val) {
        console.log('checkBankName', val);
        return
        if (!val) {
          return false
        }
        this.checkBankName1 = false
        val = val.replace(/\s+/g, "")
        let bankName
        let flag = false
        for (let i = 3; i < 8; i++) {
          if (bankName = this.machBankName((val + '').slice(0, i))) {
            this.bankText = bankName
            flag = true
            console.log('bankName', bankName);
            break
          }
        }
        if (!flag) {
          this.bankText = '请选择开户银行'
          this.data.CARD_NO = ''
          Bus.$emit(BusName.showToast, '暂不支持该银行')
        }
        console.log(this.bankText);
        return flag
      },
      checkBankNo(val) {
        val = val.toString()
        // let reg = /\d{15}|\d{19}/
        // console.log(!reg.test(val));
        if (val == '') {
          Bus.$emit(BusName.showToast, '银行卡号不能为空')
          return true
        } else if (val.length < 15 || val.length > 19) {
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
        this.show = false
        this.bankText = val.name
      },

      // 下一步
      goNext() {
        console.log('goNext');
        return
        this.doOpengingSecond()
      },

      showBankList() {
        console.log(this.bankList);
        if (!this.canClick) {
          return
        }
        if (JSON.stringify(this.IndexObj) == '{}') {
          this.show = true
          this.IndexObj = this.filterOptions(this.bankList)
        } else {
          this.show = true
        }
      },
      filterOptions(arr) {
        let obj = {}
        arr.forEach(bank => {
          if (!obj[bank.Index]) {
            obj[bank.Index] = [bank]
          } else {
            obj[bank.Index].push(bank)
          }
        })
        return obj
      },
      select(index, name) {
        this.titleSelect = true
        this.show = false
        this.bankText = name.name
        // this.$emit('getValue', name)
        this.selectValue = index
      },
      toBank(val) {
        if (document.getElementById(val)) {
          document.getElementById(val).scrollIntoView()

        } else {
          Bus.$emit(BusName.showToast, `没有${val}开头的银行`)
        }
      },
      bankShowHandle() {
        this.backShow = true
      }
    }

  }
</script>

<style lang="scss" scoped>


  .warp {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .opening_box {
    padding-top: px2rem(20);


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

      &.left {
        text-align: left;
        padding-left: px2rem(30);
      }

      &.right {
        text-align: right;
        padding-right: px2rem(30);
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

  .bgbox {
    width: 100%;
    height: 100%;
    background: rgba(1, 1, 1, .7);
    position: absolute;
    padding-top: px2rem(100);
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

  .submit-btn{
    margin-top: px2rem(66);
  }


</style>
