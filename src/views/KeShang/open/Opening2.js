import API from "@/service";
import Bus from "@/plugin/bus"
import {PageName, BusName, LsName} from "@/Constant";
import util from "libs/util";
import {ORG_ID_NUM} from '@/Constant'
import {imgSrc} from "@/Constant";
import commons from './common'
import Mixins from '@/mixins'
let time = 60
let pollTimer;
export default {
  mixins: [commons,Mixins.HandleMixin,Mixins.UtilMixin],
  data() {
    return {
      telDisabled: false,
      ZhengZhouPass: false, // 实体卡密码，可空，本行卡和村镇卡必输
      ACC_FLAG: '0',
      pwd: '',
      pwdLen: '',
      pwCode: ''
    }
  },
  created() {
    console.log('ZhengZhou');

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
    // msg倒计时
    timeDown() {
      let sTime = time
      this.disable = true
      let timer = setInterval(() => {
        if (sTime == 0) {
          this.codeText = '重新发送'
          this.disable = false
          clearInterval(timer)
          return
        }
        sTime--
        this.codeText = `${sTime}s`
      }, 1000)
    },
    //

    cancel() {
      $('#PWDKBD').remove();
      this.ZhengZhouPass = false
    },
    subumit() {
      $('#PWDKBD').remove();
      this.pwd = $("#bank-passCCCC").getKBD(); //获取密码
      this.pwdLen = $("#bank-passCCCC").getLenKBD(); //获取密码长度
      this.pwCode = $("#bank-passCCCC").getBDCode();
      console.log(this.pwd);
      console.log(this.pwdLen);
      console.log(this.pwCode);
      if (util.Check.payPassLen(this.pwdLen, true)) return;
      this.ZhengZhouPass = false
      this.doApiOpenging2()
    },
    /**
     * 银行账户属性查询
     */
    checkBankType() {
      API.common.apiUserAccountProperties({
        TYPE: 'API_USER_ACCOUNT_PROPERTIES',
        BIND_AC_NO: this.data.CARD_NO + ''
      }, res => {
        this.ACC_FLAG = res.ACC_FLAG
      })
    },
    // 校验身份证
    checkID() {
    },
    // 点击获取验证码
    clickMsgCodeHandle() {
      let PHONE = this.tel
      PHONE = PHONE + ''
      console.log(PHONE);
      if (util.Check.tel(PHONE, true)) return;
      this.timeDown()
      this.getMsgCode(PHONE)
    },
    // 获取短信验证码
    getMsgCode(PHONE) {
      let data = {
        TYPE: 'API_SEND_PHONE_CODE',
        PHONE_NUM: PHONE,
        BIZ_TYPE: '3',// 开户第二步
        ACCT_NO: this.data.CARD_NO
      }
      API.common.apiSendPhoneCode(data, res => {
        Bus.$emit(BusName.showSendMsg, PHONE)
        this.data.MESSAGE_TOKEN = res.MESSAGE_TOKEN
      }, err => {
        this.codeText = '重新发送'
        this.disable = false
        try {
          clearInterval(timer)
        } catch (e) {

        }
        console.log(err);
      })
    },
    // 注册
    doOpengingSecond() {
      // 判断银行类型 是否调用密码控件
      // 实体卡密码，可空，本行卡和村镇卡必输
      this.doApiOpenging2()
      // this.ZhengZhouPass = true
      // 其他行
    },
    doApiOpenging2() {
      this.data.PRE_PHONE_NUM = this.tel
      console.log(this.data.PRE_PHONE_NUM);
      if (this.bankText == '请选择银行') {
        Bus.$emit(BusName.showToast, '请选择银行')
        return
      }
      if (this.data.CARD_NO == '') {
        Bus.$emit(BusName.showToast, '银行卡号不能为空')
        return
      }
      if (this.checkBankNo(this.data.CARD_NO)) {
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
        Bus.$emit(BusName.showToast, '短信验证码异常')
        return
      }
      let delMsg = true
      let params = {
        PHONE_NUM: this.tel, // 银行预留手机号(绑卡行)
        REQ_SERIAL: this.callbackInfos.BESHARP_REGISTER_VALI_USER_SEQ || '', //比财开户请求ID
        PERIOD: this.transformDATA(this.callbackInfos.CARD_INDATE).END,	// 证件有效期
        BANK_NUM: this.data.CARD_NO, // 绑定银行卡卡号
        MESSAGE_TOKEN: this.data.MESSAGE_TOKEN, //短信验证码Token
        SHORT_CODE: this.data.PHONE_CODE, // 短信验证码
        USER_CARD_ID: this.callbackInfos.USER_CARD_ID, //证件号码
        CARD_FRONT_FILE: this.callbackInfos.CARD_FRONT_URL, //身份证正面信息
        CARD_BACK_FILE: this.callbackInfos.CARD_BACK_URL, //身份证反面信息
        USER_NAME: this.callbackInfos.USER_NAME, //姓名
        HAS_BAND: this.callbackInfos.hasCardList.length > 0 ? '0' : '1', //是否已经绑定过卡 0:已在比财绑卡；1:未在比财绑过卡
        OPEN_BANK: this.bankText, //// 银行卡所属银行名
        TYPE: 'API_REGISTER_BAND_CARD',
      }
      let OTHER = true  // 用于特殊处理，code ==1 且 REQ_SERIAL和LAST_STEP_NUM有值说明 第一步成功第二步未成功
      console.log('params');
      console.log(params);
      API.open.apiRegisterBandCard(params, delMsg, OTHER,
        res => {
          // clearInterval(timer)
          this.Londing.close()
          // this.errMsg = res.MSG
          // setTimeout(() => {
          //   this.errMsg = ''
          // }, 2000)
          API.watchApi({
            FUNCTION_ID: 'ptb0A004', // 点位
            REMARK_DATA: '异业合作-开户-绑定银行卡', // 中文备注
          })
          // Bus.$emit(BusName.showToast, res.MSG)
          this.setComState({type:'ISLogin',value:true})
          this.toPreProduct()
        },
        err => {
          API.watchApi({
            FUNCTION_ID: 'ptb0A004', // 点位
            REMARK_DATA: '异业合作-开户-绑定银行卡', // 中文备注
          })
          this.errMsg = err
          setTimeout(() => {
            this.errMsg = ''
          }, 2000)
          console.log(err);
          this.disable = false
        })
      // this.pollHandle()
    },
    // 注册第一次返回失败 需要轮询 查询 是否成功
    pollHandle() {
      let conut = 0
      pollTimer = setInterval(() => {
        conut++
        console.log(conut);
        if (conut == 6) {
          this.Londing.close()
          clearInterval(pollTimer)
          return
        }
        this.Londing.open()
        this.checkID()
      }, 5000)
    },
    /**
     * 获取支持的银行列表
     */
    getBankList() {
      API.common.apiGetBankCardList({}, res => {
        let obj = {}
        res.BAND_CARD_LIST.forEach(item => {
          obj[item.BANK_CARD_BIN] = item.BANK_NAME
        })
        this.AllBankListObj = obj
        this.bankList = res.SUPPORT_BANK_LIST.map((item) => {
          return {
            name: item.BANK_NAME,
            value: 0,
            src: imgSrc + item.BANK_LOGO_URL,
            Index: item.INITIAL
          }
        })
      })
    },
  }
}





