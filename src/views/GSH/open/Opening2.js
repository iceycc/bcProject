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
      // console.log(this.checkBankName(this.data.CARD_NO));
      // if (!this.checkBankName(this.data.CARD_NO)) {
      //   Bus.$emit(BusName.showToast, '暂不支持该银行卡号')
      //   return
      // }
      if (this.bankText == '请选择银行') {
        Bus.$emit(BusName.showToast, '请选择银行')
        return
      }
      if (this.data.CARD_NO == '') {
        Bus.$emit(BusName.showToast, '银行卡号不能为空')
        return
      }
      // if (!this.checkBankName(this.data.CARD_NO)) {
      //   Bus.$emit(BusName.showToast, '暂不支持该银行卡号')
      //   return
      // }
      if (this.data.PRE_PHONE_NUM == '') {
        Bus.$emit(BusName.showToast, '手机号不能为空')
        return
      }

      let params = {
        openBank: this.bankText, //// 银行卡所属银行名
        accountNo:this.data.CARD_NO,
        bankCardPhone:this.tel
      }
      console.log('params', params);
      try {
        let res = await API.open.apiRegisterBandCard(params)
        this.Londing.close()
        API.watchApi({
          FUNCTION_ID: 'ptb0A004', // 点位
          REMARK_DATA: '异业合作-开户-绑定银行卡', // 中文备注
        })
        this.$router.push({name:PageName.Opening3,query:{...res},params:{flag:'opening2'}})
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





