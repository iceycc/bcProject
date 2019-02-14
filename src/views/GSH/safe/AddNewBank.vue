<template>
  <div>
    <app-bar title="添加新银行卡"></app-bar>
    <section class="m-form">
      <select-bank
        :bankText="bankText"
        @showInfo="showXiane"
        @showUpBox="showBindBankList"
      ></select-bank>
      <normal-input
        type="tel"
        v-model="bankNo"
        text="新绑定卡卡号"
        placeholder="请输入绑定卡卡号"
        @change="changeHandle"
      ></normal-input>
      <normal-input
        type="tel"
        v-model="bankTel"
        text="手机号码"
        placeholder="请输入手机号"
      ></normal-input>
      <sms-code-input
        @sendTelCode="getMsgCode"
        v-model="msgCode"
      ></sms-code-input>
      <submit-button
        class="submit-btn"
        text="开户"
        :canSubmit="true"
        @submit="goNext"
      ></submit-button>
    </section>
    <bank-card-limit v-if="backShow" @hideHandle="backShow=false"></bank-card-limit>
    <support-bank-list
      v-if="show"
      @getValue="getBank"
      @close="show=false"
      :selectValue="bankText"
      :supportBankList="supportBankList"
    ></support-bank-list>
  </div>
</template>

<script>
  import API from "@/service";
  import {imgSrc, BusName, LsName, PageName} from "@/Constant";
  import Bus from '@/plugin/bus'
  import Mixins from "@/mixins";
  import util from "@/libs/util";
  import {
    SmsCodeInput,
    NormalInput,
    SupportBankList,
    KshBankCardLimit as BankCardLimit,
    ErrMsg,
    SelectBank,
    SubmitButton,
    KshBankSelect as BankSelect,
    ActiveInput
  } from '@/components'

  let timer;
  export default {
    name: "changeBank",
    components: {
      BankSelect,
      ActiveInput,
      ErrMsg,
      SelectBank,
      BankCardLimit,
      SupportBankList,
      NormalInput,
      SmsCodeInput,
      SubmitButton
    },
    data() {
      return {
        bankText: '请选择开户银行',
        backShow: false,
        show: false,
        bankList: [],
        AllBankListObj: {},
        bankLimitShow: false,
        errMsg: '',
        bankNo: '',
        msgCode: '',
        codeText: '获取验证码',
        disable: false,
        bankTel: '',
        MESAGE_TOKEN: '',
        bankNameToNo: false,
        params: {},
        ifGet: false,
        OldBankInfo: {},
        time: 60
      }
    },
    mixins: [Mixins.reloadByPassWordErr],
    created() {
      this.getBankList()
      this.getOldBankInfo()
      // this.params = util.storage.session.get(LsName.Infos)
      this.params = this.$store.getters.GET_COMMON_STATE.Infos
    },
    watch: {
      bankNo(n, o) {
        if (n.length <= 8) return
        this.checkBankName(this.bankNo)
      },
      // bankText(n, o) {
      //   this.checkBankName(this.bankNo)
      // }
    },
    methods: {
      showBindBankList() {
        this.show = true
      },
      showXiane() {
        this.backShow = true
      },
      changeHandle(val) {
        console.log(val);
        // if (val.length <= 8) return
        this.checkBankNo(val)
      },
      getMsgCode() {
        if (this.bankText == '请选择开户银行') {
          Bus.$emit(BusName.showToast, '请选择开户银行')
          return
        }
        if (!this.bankNo) {
          Bus.$emit(BusName.showToast, '请输入银行卡号')
          return
        }
        if (!this.bankTel) {
          Bus.$emit(BusName.showToast, '请输入银行卡预留手机号')
          return
        }
        if (util.Check.tel(this.bankTel, true)) return;
        let sTime = this.time
        this.disable = true
        timer = setInterval(() => {
          if (sTime == 0) {
            this.codeText = '重新发送'
            this.disable = false
            clearInterval(timer)
            return
          }
          sTime--
          this.codeText = `${sTime}s`
        }, 1000)
        this.getCode()
      },
      getOldBankInfo() {
        this.OldBankInfo = this.getComState.hasCardList[0]
        // console.log(this.OldBankInfo);
      },
      getBank(val) {
        this.show = false
        this.bankText = val.name
      }, // bankNameToNo
      /**
       * 校验是否是支持的银行
       * @param val
       * @returns {boolean}
       */
      checkBankName(val) {
        if (!val) {
          return false
        }
        this.bankNameToNo = false
        // this.checkBankType()
        val = val.replace(/\s+/g, "")
        let bankName
        let flag = false
        for (let i = 3; i < 8; i++) {
          if (bankName = this.machBankName((val + '').slice(0, i))) {
            this.bankText = bankName
            this.bankNameToNo = true
            flag = true
            break
          }
        }
        if (!flag) {
          this.bankText = '请选择开户银行'
          Bus.$emit(BusName.showToast, '不支持该银行或银行卡号错误')
          this.showErrMsg('不支持该银行或银行卡号错误')
        }
        console.log(this.bankText);
        return flag
      },
      /**
       * 整体校验银行卡号和银行名 是否填写 银行的
       * @param val
       * @returns {boolean}
       */
      checkBankNo(val) {
        val = val.toString()
        if (this.bankText == '请选择开户银行') {
          this.showErrMsg('请选择开户银行')
          return true
        }
        if (val == '') {
          this.showErrMsg('银行卡号不能为空')
          return true
        } else {
          this.checkBankName(val)
          return false
        }

      },
      /**
       * 匹配支持的银行
       * @param pin
       * @returns {*}
       */
      machBankName(pin) {
        return this.AllBankListObj[pin]
      },
      /**
       * 获取银行列表。全部银行列表和银行支持的银行列表
       */
      async getBankList() {
        let res = await API.common.apiGetBankCardList({})
        let obj = {}
        res.supportCardList.forEach(item => {
          obj[item.bankCardBin] = item.bankName
        })
        // console.log('bankObj>>>',obj);
        // 全部银行
        this.AllBankListObj = obj
        // console.log(this.AllBankListObj);
        this.supportBankList = res.supportBankList // 支持的银行列表
        // 支持的银行
        this.bankList = res.supportBankList.map((item) => {
          return {
            name: item.bankName,
            value: 0,
            src: imgSrc + item.bankLogoUrl,
            Index: item.INITIAL
          }
        })
      },
      showErrMsg(msg) {
        this.errMsg = msg;
        setTimeout(() => {
          this.errMsg = '';
        }, 4000)
      },
      checkBankType() {

      },
      async getCode() { //
        let query = this.$route.query
        let data = {
          BIZ_TYPE: '8', // 绑卡需要
          BANK_USER_ID: query.BANK_USER_ID,// 银行用户ID
          BANK_ACCT_NO: query.BANK_ACCT_NO,// 电子账户
        }
        let res = await API.common.apiSendPhoneCode(data)
        this.MESAGE_TOKEN = res.MESSAGE_TOKEN
        Bus.$emit(BusName.showSendMsg, res.BC_PHONE)
      },
      async BindingCardAPI() {
        // 解绑银行卡
        let data = {
          BANK_NAME: this.bankText,//银行名称
          BANK_ACCOUNT_NO: this.bankNo,//银行账号
          BANK_INNER: '0',// 行内外标识 暂时默认全传他行
          DEFAULT_MARK: '1',//是否默认卡
          PHONE_NUM: this.bankTel,//银行卡开户行手机号
          BIND_FLG: '1',// 绑定标志 1-绑定，2-解绑
          MESSAGE_TOKEN: this.MESAGE_TOKEN,
          VALIDATE_CODE: this.msgCode,// 短信验证码

          BANK_CARD_TYPE: '',//
          BANK_NO: '',  //银行行号
          CARD_BIN: '', //卡Bin
          CLEAR_BANK: '',// 清算银行
          CLEAR_BANK_NO: '',// 清算银行行号
        }
        await API.safe.apiChangeBingCard(data)
        this.$router.push({name: PageName.BindingBank})
      },

      goNext() {
        if (this.bankText == '请选择开户银行') {
          Bus.$emit(BusName.showToast, '请选择开户银行')
          return
        }
        if (!this.bankNo) {
          Bus.$emit(BusName.showToast, '请输入银行卡号')
          return
        }
        if (!this.bankTel) {
          Bus.$emit(BusName.showToast, '请输入银行卡预留手机号')
          return
        }
        if (this.checkBankNo(this.bankNo)) return
        console.log('goNext>>', this.bankNameToNo);
        if (!this.bankNameToNo) {
          // this.showErrMsg('暂不支持该银行')

        } else {
          this.BindingCardAPI()
        }

      }
    },

  }
</script>

<style lang="scss" scoped>
  .submit-btn {
    margin-top: px2rem(249);
  }
</style>
