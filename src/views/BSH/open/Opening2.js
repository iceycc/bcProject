import API from "@/service";
import Bus from "@/plugin/bus"
import {PageName, BusName, LsName} from "@/Constant";
import util from "@/libs/util";
import {ORG_ID_NUM} from '@/Constant'
import {imgSrc} from "@/Constant";
import commons from './common'
import Mixins from '@/mixins'

export default {
  mixins: [commons, Mixins.redirectByFromPage],
  data() {
    return {
      ACC_FLAG: '0',
    }
  },
  filters: {
    CARD_NO_Fliter(n) {
      if (n) {
        return n.substr(n.length - 4)
      } else {
        return n
      }
    }
  },
  methods: {
    // 点击获取验证码
    clickMsgCodeHandle(success, error) {
      let PHONE = this.tel
      PHONE = PHONE + ''
      console.log(PHONE);
      if (util.Check.tel(PHONE, true)) return;
      success()
      this.getMsgCode(PHONE, error)
    },
    // 获取短信验证码
    async getMsgCode(PHONE, error) {
      let data = {
        TYPE: 'API_SEND_PHONE_CODE',
        PHONE_NUM: PHONE,
        BIZ_TYPE: '3',// 开户第二步
        ACCT_NO: this.data.CARD_NO
      }
      try {
        let res = await API.common.apiSendPhoneCode(data)
        Bus.$emit(BusName.showSendMsg, res.BC_PHONE)
        this.data.MESSAGE_TOKEN = res.MESSAGE_TOKEN
      } catch (e) {
        error()
        console.log(err);
      }

    },
    // 注册
    doOpengingSecond() {
      this.doApiOpenging2()
    },
    async doApiOpenging2() {
      this.data.PRE_PHONE_NUM = this.tel
      console.log(this.checkBankName(this.data.CARD_NO));
      if (!this.checkBankName(this.data.CARD_NO)) {
        Bus.$emit(BusName.showToast, '暂不支持该银行卡号')
        return
      }
      if (this.bankText == '请选择银行') {
        Bus.$emit(BusName.showToast, '请选择银行')
        return
      }
      if (this.data.CARD_NO == '') {
        Bus.$emit(BusName.showToast, '银行卡号不能为空')
        return
      }
      if (!this.checkBankName(this.data.CARD_NO)) {
        Bus.$emit(BusName.showToast, '暂不支持该银行卡号')
        return
      }
      if (this.data.PRE_PHONE_NUM == '') {
        Bus.$emit(BusName.showToast, '手机号不能为空')
        return
      }
      if (this.data.PHONE_CODE == '') {
        Bus.$emit(BusName.showToast, '短信验证码不能为空')
        return
      }
      if (this.data.MESSAGE_TOKEN == '') {
        Bus.$emit(BusName.showToast, '请先获取短信验证码')
        return
      }
      let params = {
        PHONE_NUM: this.tel, // 银行预留手机号(绑卡行)
        REQ_SERIAL: this.callbackInfos.BESHARP_REGISTER_VALI_USER_SEQ || '', //比财开户请求ID
        PERIOD: this.transformDATA(this.callbackInfos.CARD_INDATE).END,	// 证件有效期
        BANK_NUM: this.data.CARD_NO, // 绑定银行卡卡号
        MESSAGE_TOKEN: this.data.MESSAGE_TOKEN, //短信验证码Token
        SHORT_CODE: this.data.PHONE_CODE, // 短信验证码
        USER_CARD_ID: this.callbackInfos.USER_CARD_ID, //证件号码
        CARD_FRONT_FILE: encodeURIComponent(this.callbackInfos.CARD_FRONT_URL), //身份证正面信息
        CARD_BACK_FILE: encodeURIComponent(this.callbackInfos.CARD_BACK_URL), //身份证反面信息
        USER_NAME: this.callbackInfos.USER_NAME, //姓名
        HAS_BAND: this.callbackInfos.hasCardList.length > 0 ? '0' : '1', //是否已经绑定过卡 0:已在比财绑卡；1:未在比财绑过卡
        OPEN_BANK: this.bankText, //// 银行卡所属银行名
        TYPE: 'API_REGISTER_BAND_CARD',
      }
      console.log('params', params);
      try {
        await API.open.apiRegisterBandCard(params)
        this.Londing.close()
        API.watchApi({
          FUNCTION_ID: 'ptb0A004', // 点位
          REMARK_DATA: '异业合作-开户-绑定银行卡', // 中文备注
        })
        this.setComState({type: 'ISLogin', value: true})
        this.redirectByFromPage()

      } catch (err) {
        this.errMsg = err
        setTimeout(() => {
          this.errMsg = ''
        }, 2000)
        console.log(err);
        this.disable = false
      }


    },
    /**
     * 获取支持的银行列表
     */
    async getBankList() {
      let res = await API.common.apiGetBankCardList({})
      let obj = {}
      // 1 过滤全部银行列表
      res.supportCardList.forEach(item => {
        obj[item.bankCardBin] = item.bankName
      })
      this.AllBankListObj = obj // 全部银行列表
      // 2 支持的银行列表
      this.supportBankList = res.supportBankList
    },
  }
}





