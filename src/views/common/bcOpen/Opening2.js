import API from "@/service";
import Bus from "@/plugin/bus"
import {PageName, BusName, LsName} from "@/Constant";
import util from "libs/util";
import {ORG_ID_NUM} from '@/Constant'
import {imgSrc} from "@/Constant";

let time = 60

export default {
  data() {
    return {
      telDisabled: false,
      ZhengZhouPass: false, // 实体卡密码，可空，本行卡和村镇卡必输
      ACC_FLAG: 0,

      pwd: '',
      pwdLen: ''
    }
  },
  created() {
    console.log('ZhengZhou');
    this.tel = this.$store.getters.GET_OPENING1_DATA.PHONE || ''
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
      this.pwd = $("#bank-pass").getKBD(); //获取密码
      this.pwdLen = $("#bank-pass").getLenKBD(); //获取密码长度
      console.log(this.pwd);
      console.log(this.pwdLen);
      if (util.Check.payPassLen(this.pwdLen, true)) return;
      this.ZhengZhouPass = false
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
        PHONE_NUM: PHONE,
        SAFT_CODE: '', // 图片验证码
        BANK_CARD: this.data.CARD_NO
      }
      API.bicai.sendSMSCode(data, res => {
        Bus.$emit(BusName.showToast, '验证码发送成功')

      }, err => {
        this.codeText = '重新发送'
        this.disable = false
        console.log(err);
      })
    },
    // 注册
    doOpengingSecond() {
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
      if (this.checkBankName1) {
        Bus.$emit(BusName.showToast, '您输入的银行卡号和选择的银行名称不匹配')
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
      let params = {
        bankCardNo: data.CARD_NO,
        mobile: this.tel,
        smsCode: this.data.PHONE_CODE
      }
      API.bicai.bindCardFourELement(params,
        res => {
          clearInterval(timer)
          this.Londing.close()
          setTimeout(() => {
            this.errMsg = ''
          }, 2000)
          API.watchApi({
            FUNCTION_ID: 'ptb0A004', // 点位
            REMARK_DATA: '异业合作-开户-绑定银行卡', // 中文备注
          })

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
      this.pollHandle()
    },
    // 注册第一次返回失败 需要轮询 查询 是否成功
    pollHandle() {
      let conut = 0
      let timer = setInterval(() => {
        conut++
        console.log(conut);
        if (conut == 6) {
          this.Londing.close()
          clearInterval(timer)
          return
        }
        this.Londing.open()
        this.checkID()
      }, 5000)
    },
    // 根据银行卡号获取银行名称
    getBankNameByCardNo() {
      let data = {
        cardNo: this.data.CARD_NO
      }
      API.bicai.getCardBinList(data)
    },
    /**
     * 获取银行列表
     */
    getBankList() {
      API.bicai.getBingingCardsList({}, res => {
        let obj = {}
        // res.bankList.forEach(item => {
        //   obj[item.BANK_CARD_BIN] = item.BANK_NAME
        // })
        // console.log('bankObj>>>',obj);
        this.AllBankListObj = obj
        this.bankList = res.bankList.map((item) => {
          return {
            name: item.ORG_NAME,
            value: 0,
            src: imgSrc + item.LOGO_URL,
            Index: item.ORG_NAME_FIRST_LETTER
          }
        })
      })
    },

  }
}





