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
        text="下一步"
        :canSubmit="true"
        @submit="goNext"
      ></submit-button>
    </section>
    <bank-card-limit :bankList="bankCardLimit" v-show="backShow" @hideHandle="backShow=false"></bank-card-limit>
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
    BankCardLimit,
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
        bankCardLimit: [],
        AllBankListObj: {},
        bankLimitShow: false,
        errMsg: '',
        bankNo: '',
        msgCode: '',
        codeText: '获取验证码',
        bankTel: '',
        MESAGE_TOKEN: '',
        bankNameToNo: false,
        params: {},
        ifGet: false,
        OldBankInfo: {},
        needData: null,
        fromPage: '' //  来源页
      }
    },
    mixins: [Mixins.reloadByPassWordErr],
    created() {
      this.getBankList()
      this.getOldBankInfo()
      this.params = this.$store.getters.GET_COMMON_STATE.Infos
      this.fromPage = this.$route.query.fromPage
      this.getBankLimitList()
    },
    watch: {
      bankNo(n, o) {
        if (n.length <= 8) return
        this.checkBankName(this.bankNo)
      },

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
      async getBankLimitList() {
        let data = {}
        let res = await API.common.apiGetBankCardLimit(data)
        this.bankCardLimit = res.bankCardLimit
      },
      getMsgCode(success, error) {
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
        // 需要直接调用绑卡 发送短信验证码
        this.BindingCardAPI(success)
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

      async BindingCardAPI(success) {
        // 绑ding银行卡
        let data = {
          bankName: this.bankText,//银行名称
          accountNo: this.bankNo,//银行账号
          bankCardPhone: this.bankTel,//银行卡开户行手机号
          bindFlg: '1',// 绑定标志 1-绑定，2-解绑
        }
        let res = await API.safe.apiChangeBingCard(data)
        this.needData = res
        success && success()
      },
      async CheckMsg() {
        let data = {
          sernoOriginal: this.needData.reqSerial,
          sendNo: this.needData.apiPackSeq, // 短信验证码编号
          shortCode: this.msgCode, // 短信验证码
          bizType: '2' // 绑卡：2
        }
        let res = await API.open.apiRigesisterShortCodeVerify(data)
        console.log(res);
        this.$router.push({path: this.fromPage})
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
          Bus.$emit(BusName.showToast, '暂不支持该银行')
        } else {
          // / 绑卡短信校验
          this.CheckMsg()

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
