import API from "@/service";
import Bus from "@/plugin/bus"
import {PageName, BusName, LsName} from "@/Constant";
import util from "libs/util";
import store from '@/store'
import {ORG_ID_NUM} from '@/Constant'
import {imgSrc} from "@/Constant";

let time = 60
/**
 * 开户公共方法，根据ORG_ID区分不同的业务逻辑
 */
let commons = {
  created() {
    console.log('commons');
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

  }
}


/**
 * 晋商银行开户相关
 */
let JinShang = {
  mixins: [commons],
  data() {
    return {
      telDisabled: false
    }
  },
  created() {
    console.log('JinShang');
    this.tel = this.$route.query.PHONE_NUM || ''
  },
  methods: {
    // 晋商需要校验身份证
    checkID(fn) {
      // 回显
      let getStepDatas = {
        ID_NUMBER: this.$route.params.data.USER_CARD_ID
      }
      let delMsg = true
      API.open.apiGetUserLastCompleteStep(getStepDatas, delMsg, res => {
        let step = res.LAST_STEP_NUM
        let REQ_SERIAL = res.REQ_SERIAL
        // let PHONE_NUM = res.PHONE_NUM ||'' // 改身份证是否有手机号回显
        console.log('步数 >>>', step);
        // if (step == 0) {
        //     // Bus.$emit(BusName.showToast,"欢迎注册")
        //     fn && fn(REQ_SERIAL, step,PHONUM_NUM)
        // }
        // if (step == 1) { //
        //     // PHONUM_NUM
        //     // Bus.$emit(BusName.showToast,"第二步")
        //     fn && fn(REQ_SERIAL, step,PHONUM_NUM)
        // }
        if (step == 2) { // 跳转设置密码页
          // Bus.$emit(BusName.showToast, "您已经实名成功")
          setTimeout(() => {
            this.$router.push({
              name: PageName.Opening3,
              params: {
                step
              },
              query: {
                REQ_SERIAL: REQ_SERIAL
              }
            })
          }, 600)
        }
        if (step == 3) {
          // Bus.$emit(BusName.showToast, "您已经开户成功")
          setTimeout(() => {
            this.$router.push({
              name: PageName.Login,
            })
          }, 1000)
        }

      }, err => {
        console.log(err);
      })
    },
    // 点击获取验证码
    clickMsgCodeHandle() {
      this.data.PRE_PHONE_NUM = this.tel + ''
      console.log(this.data.PRE_PHONE_NUM);
      if (util.Check.tel(this.data.PRE_PHONE_NUM, true)) return;
      this.timeDown()
      this.getMsgCode()
    },
    // 获取短信验证码
    getMsgCode() {
      let data = {
        PHONE_NUM: this.data.PRE_PHONE_NUM,
        BIZ_TYPE: '1',
      }
      API.open.getMsgCode(data, res => {
        Bus.$emit(BusName.showToast, '验证码发送成功')
        this.data.MESSAGE_TOKEN = res.MESSAGE_TOKEN
      }, err => {
        this.codeText = '重新发送'
        this.disable = false
        console.log(err);
      })
    },
    // 注册第二步
    doOpengingSecond() {
      this.data.PRE_PHONE_NUM = this.tel
      console.log(this.data.PRE_PHONE_NUM);
      //  ORG_ID: '70',
      // CARD_NO: '6226221234123488', // 银行卡号 6214830182284272  6217730711297810
      //         HAS_BAND: '0', // 是否绑定过
      //         PHONE_NUM: '15621185521', // 15711310733   15011352818
      //         PRE_PHONE_NUM: '15621185521', // 预留
      //         PHONE_CODE: '', // 手机验证码
      //         LAST_STEP_NUM: '0', // 步数
      //         MESSAGE_TOKEN:''
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
      // utilExpand.storage.session.set(LsName.token,this.data.PRE_PHONE_NUM)
      let preData = this.$route.params.data
      this.data = Object.assign(this.data, preData)
      console.log('data >>>', this.data);
      // let REQ_SERIAL = util.storage.session.get(LsName.REQ_SERIAL)
      let REQ_SERIAL = this.getComState.REQ_SERIAL
      // let LAST_STEP_NUM = util.storage.session.get(LsName.LAST_STEP_NUM)
      let LAST_STEP_NUM = this.getComState.LAST_STEP_NUM
      if (REQ_SERIAL && LAST_STEP_NUM) {
        this.data.REQ_SERIAL = REQ_SERIAL
        this.data.LAST_STEP_NUM = LAST_STEP_NUM
      }
      this.data.PHONE_NUM = this.data.PRE_PHONE_NUM
      let delMsg = true
      let OTHER = true  // 用于特殊处理，code ==1 且 REQ_SERIAL和LAST_STEP_NUM有值说明 第一步成功第二步未成功
      API.open.doRegeist(this.data, delMsg, OTHER,
          res => {
            clearInterval(timer)
            this.Londing.close()
            this.errMsg = res.MSG
            setTimeout(() => {
              this.errMsg = ''
            }, 2000)
            API.watchApi({
              FUNCTION_ID: 'ptb0A004', // 点位
              REMARK_DATA: '异业合作-开户-绑定银行卡', // 中文备注
            })
            // Bus.$emit(BusName.showToast, res.MSG)
            if (res.CODE != 0) { // 不是0的话返回
              return
            }
            this.$router.push({
              name: PageName.Opening3,
              query: { // todo方便测试
                REQ_SERIAL: res.REQ_SERIAL,
              }
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
    /**
     * 获取支持的银行列表
     */
    getBankList() {
      API.list.apiGetBankCardList({}, res => {
        let obj = {}
        res.BAND_CARD_LIST.forEach(item => {
          obj[item.BANK_CARD_BIN] = item.BANK_NAME
        })
        // console.log('bankObj>>>',obj);
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
/**
 * 郑州银行相关
 */
let ZhengZhou = {
  mixins: [commons],
  data() {
    return {
      telDisabled: false,
      ZhengZhouPass: false, // 实体卡密码，可空，本行卡和村镇卡必输
      ACC_FLAG: 0,

      pwd:'',
      pwdLen:''
    }
  },
  created() {
    console.log('ZhengZhou');
    this.tel = this.$store.getters.GET_OPENING1_DATA.PHONE || ''
  },
  filters:{
    CARD_NO_Fliter(n){
      if(n){
        return n.substr(n.length-4)
      }else{
        return n
      }
    }
  },
  methods: {
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
      if (util.Check.payPassLen(this.pwdLen,true)) return;
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
        TYPE: 'API_SEND_PHONE_CODE',
        PHONE_NUM: PHONE,
        ORG_ID: '49',
        BIZ_TYPE: '11',// 开户第二步
        ACCT_NO: this.data.CARD_NO
      }
      API.common.apiSendPhoneCode(data, res => {
        Bus.$emit(BusName.showToast, '验证码发送成功')
        this.data.MESSAGE_TOKEN = res.MESSAGE_TOKEN
      }, err => {
        this.codeText = '重新发送'
        this.disable = false
        console.log(err);
      })
    },
    // 注册
    doOpengingSecond() {
      // 判断银行类型 是否调用密码控件
      if (this.ACC_FLAG == 0) {
        $('#PWDKBD').remove();
        $(window).loadKBD();
        this.ZhengZhouPass = true
        // 其他行
        return
      } else {
        // 本地 或者村镇银行 要调取密码控件
        this.ZhengZhouPass = true
      }
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

      let delMsg = true

      let params = {
        TYPE: 'API_REGISTER_BAND_CARD',
        ORG_ID: '49',
        BIND_AC_NO: this.CARD_NO, // 银行卡
        BANK_NAME: this.bankText, //
        // 密码
        ACC_FLAG: this.ACC_FLAG, // 账户类型 0：他行；1：本行；2：村镇
        PREFIX: '', // 密码控件调用时返回，密码必传时该字段必填
        PASSWD:'', //

        COMMON_USER_ID:'', // 用户中心ID

        // 短信
        SND_MSG_TYPE:'11' , // 短信类型
        SND_MSG:this.data.PHONE_CODE,

        ETHNIC_CD:'', // 民族
        ADDR:'', // 地址
        HAS_BAND:'',// 是否已经绑定过卡

        // 身份证相关
        CREDENTIAL_AURL:'', //证件电子照正面批次号
        CREDENTIAL_BURL:'', //证件电子照反面批次号
        CREDENTIAL_POV:'', //
        USER_NAME:'', // 卡所属姓名
        USER_DUTY:'', // 职业


        PHONE_NUM:'', // 银行预留手机号(绑卡行)
        BESHARP_REGISTER_VALI_USER_SEQ:'', //实名认证流水号

      }
      let OTHER = true  // 用于特殊处理，code ==1 且 REQ_SERIAL和LAST_STEP_NUM有值说明 第一步成功第二步未成功
      API.open.apiRegisterBandCard(params, delMsg, OTHER,
          res => {
            clearInterval(timer)
            this.Londing.close()
            this.errMsg = res.MSG
            setTimeout(() => {
              this.errMsg = ''
            }, 2000)
            API.watchApi({
              FUNCTION_ID: 'ptb0A004', // 点位
              REMARK_DATA: '异业合作-开户-绑定银行卡', // 中文备注
            })
            // Bus.$emit(BusName.showToast, res.MSG)
            if (res.CODE != 0) { // 不是0的话返回
              return
            }
            this.$router.push({
              name: PageName.Opening3,
              query: { // todo方便测试
                REQ_SERIAL: res.REQ_SERIAL,
              }
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
    /**
     * 获取支持的银行列表
     */
    getBankList() {
      API.common.apiGetBankCardList({
        ORG_ID: '49'
      }, res => {
        let obj = {}
        res.BAND_CARD_LIST.forEach(item => {
          obj[item.BANK_CARD_BIN] = item.BANK_NAME
        })
        // console.log('bankObj>>>',obj);
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
/**
 * 众邦银行开户相关
 */
let ZhongBang = {
  mixins: [commons],
  data() {
    return {}
  },
  created() {
    console.log('ZhengZhou');
  },
  methods: {
    // 校验身份证
    checkID(fn) {
      // 回显
      let getStepDatas = {
        ID_NUMBER: this.$route.params.data.USER_CARD_ID
      }
      let delMsg = true
      API.open.apiGetUserLastCompleteStep(getStepDatas, delMsg, res => {
        let step = res.LAST_STEP_NUM
        let REQ_SERIAL = res.REQ_SERIAL
        // let PHONE_NUM = res.PHONE_NUM ||'' // 改身份证是否有手机号回显
        console.log('步数 >>>', step);
        // if (step == 0) {
        //     // Bus.$emit(BusName.showToast,"欢迎注册")
        //     fn && fn(REQ_SERIAL, step,PHONUM_NUM)
        // }
        // if (step == 1) { //
        //     // PHONUM_NUM
        //     // Bus.$emit(BusName.showToast,"第二步")
        //     fn && fn(REQ_SERIAL, step,PHONUM_NUM)
        // }
        if (step == 2) { // 跳转设置密码页
          // Bus.$emit(BusName.showToast, "您已经实名成功")
          setTimeout(() => {
            this.$router.push({
              name: PageName.Opening3,
              params: {
                step
              },
              query: {
                REQ_SERIAL: REQ_SERIAL
              }
            })
          }, 600)
        }
        if (step == 3) {
          // Bus.$emit(BusName.showToast, "您已经开户成功")
          setTimeout(() => {
            this.$router.push({
              name: PageName.Login,
            })
          }, 1000)
        }

      }, err => {
        console.log(err);
      })
    },
    // 获取短信验证码
    getMsgCode() {
      let data = {
        PHONE_NUM: this.data.PRE_PHONE_NUM,
        BIZ_TYPE: '1',
      }
      API.open.getMsgCode(data, res => {
        Bus.$emit(BusName.showToast, '验证码发送成功')
        this.data.MESSAGE_TOKEN = res.MESSAGE_TOKEN
      }, err => {
        this.codeText = '重新发送'
        this.disable = false
        console.log(err);
      })
    },
    // 注册
    doOpening() {
      this.data.PRE_PHONE_NUM = this.tel
      console.log(this.data.PRE_PHONE_NUM);
      //  ORG_ID: '70',
      // CARD_NO: '6226221234123488', // 银行卡号 6214830182284272  6217730711297810
      //         HAS_BAND: '0', // 是否绑定过
      //         PHONE_NUM: '15621185521', // 15711310733   15011352818
      //         PRE_PHONE_NUM: '15621185521', // 预留
      //         PHONE_CODE: '', // 手机验证码
      //         LAST_STEP_NUM: '0', // 步数
      //         MESSAGE_TOKEN:''
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
      // utilExpand.storage.session.set(LsName.token,this.data.PRE_PHONE_NUM)
      let preData = this.$route.params.data
      this.data = Object.assign(this.data, preData)
      console.log('data >>>', this.data);
      let REQ_SERIAL = this.getComState.REQ_SERIAL
      let LAST_STEP_NUM = this.getComState.LAST_STEP_NUM
      if (REQ_SERIAL && LAST_STEP_NUM) {
        this.data.REQ_SERIAL = REQ_SERIAL
        this.data.LAST_STEP_NUM = LAST_STEP_NUM
      }
      this.data.PHONE_NUM = this.data.PRE_PHONE_NUM
      let delMsg = true
      let OTHER = true  // 用于特殊处理，code ==1 且 REQ_SERIAL和LAST_STEP_NUM有值说明 第一步成功第二步未成功
      API.open.doRegeist(this.data, delMsg, OTHER,
          res => {
            clearInterval(timer)
            this.Londing.close()
            this.errMsg = res.MSG
            setTimeout(() => {
              this.errMsg = ''
            }, 2000)
            API.watchApi({
              FUNCTION_ID: 'ptb0A004', // 点位
              REMARK_DATA: '异业合作-开户-绑定银行卡', // 中文备注
            })
            // Bus.$emit(BusName.showToast, res.MSG)
            if (res.CODE != 0) { // 不是0的话返回
              return
            }
            this.$router.push({
              name: PageName.Opening3,
              query: { // todo方便测试
                REQ_SERIAL: res.REQ_SERIAL,
              }
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
    }
  }
}


let ORG_ID = util.storage.session.get('ORG_ID') || ''
let MIX = {};
switch (ORG_ID) {
  case ORG_ID_NUM.JinShang:
    MIX = JinShang;
    break;
  case ORG_ID_NUM.ZhengZhou:
    MIX = ZhengZhou;
    break;
  case ORG_ID_NUM.ZhongBang:
    MIX = ZhongBang;
    break;
}
export default MIX
