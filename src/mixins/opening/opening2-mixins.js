import API from "../../service";
import Bus from "@/plugin/bus"
import {PageName, BusName} from "@/Constant";
import util from "libs/util";
import store from '@/store'
import {ORG_ID_NUM} from '@/Constant'

let time = 60

/**
 * 开户公共方法，根据ORG_ID区分不同的业务逻辑
 */
let commons = {
  created() {
    console.log('commons');
  },
  methods: {
    // 获取 msg
    getMsgCodeHandle() {
      this.data.PRE_PHONE_NUM = this.tel + ''
      console.log(this.data.PRE_PHONE_NUM);
      if (util.Check.tel(this.data.PRE_PHONE_NUM, true)) return;
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
      this.getMsgCode()
    },
  }
}


/**
 * 晋商银行开户相关
 */
let JinShang = {
  mixins: [commons],
  data() {
    return {}
  },
  created() {
    console.log('JinShang');
  },
  methods: {
    // 晋商需要校验身份证
    checkID(fn) {
      // 回显
      let getStepDatas = {
        ID_NUMBER: this.$route.params.data.USER_CARD_ID
      }
      let delMsg = true
      API.JINSHANG.open.apiGetUserLastCompleteStep(getStepDatas, delMsg, res => {
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
      API.JINSHANG.open.getMsgCode(data, res => {
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
      let REQ_SERIAL = util.storage.session.get(LsName.REQ_SERIAL)
      let LAST_STEP_NUM = util.storage.session.get(LsName.LAST_STEP_NUM)
      if (REQ_SERIAL && LAST_STEP_NUM) {
        this.data.REQ_SERIAL = REQ_SERIAL
        this.data.LAST_STEP_NUM = LAST_STEP_NUM
      }
      this.data.PHONE_NUM = this.data.PRE_PHONE_NUM
      let delMsg = true
      let OTHER = true  // 用于特殊处理，code ==1 且 REQ_SERIAL和LAST_STEP_NUM有值说明 第一步成功第二步未成功
      API.JINSHANG.open.doRegeist(this.data, delMsg, OTHER,
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
/**
 * 郑州银行相关
 */
let ZhengZhou = {
  mixins: [commons],
  data() {
    return {
      // 晋商需要校验身份证
      checkID(fn) {
        // 回显
        let getStepDatas = {
          ID_NUMBER: this.$route.params.data.USER_CARD_ID
        }
        let delMsg = true
        API.JINSHANG.open.apiGetUserLastCompleteStep(getStepDatas, delMsg, res => {
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
        API.JINSHANG.open.getMsgCode(data, res => {
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
        let REQ_SERIAL = util.storage.session.get(LsName.REQ_SERIAL)
        let LAST_STEP_NUM = util.storage.session.get(LsName.LAST_STEP_NUM)
        if (REQ_SERIAL && LAST_STEP_NUM) {
          this.data.REQ_SERIAL = REQ_SERIAL
          this.data.LAST_STEP_NUM = LAST_STEP_NUM
        }
        this.data.PHONE_NUM = this.data.PRE_PHONE_NUM
        let delMsg = true
        let OTHER = true  // 用于特殊处理，code ==1 且 REQ_SERIAL和LAST_STEP_NUM有值说明 第一步成功第二步未成功
        API.JINSHANG.open.doRegeist(this.data, delMsg, OTHER,
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
  },
  created() {
    console.log('ZhengZhou');
  },
  methods: {}
}
/**
 * 众邦银行开户相关
 */
let ZhongBang = {
  mixins: [commons],
  data() {
    return {
      // 配置不同标签的展示
      DOMShow: {
        USER_NAME: true,
        USER_CARD_ID: true,// 身份证号码
        USER_DUTY: true, // 职业
        USER_EDUCATION: false, //学历
        ADDRESS: false, // 地址
        NATION: false, // 民族
        PHONE: true, // 手机号
        USER_CARD_ID_DATA: true, //身份证有效期
      },
      DOCS: 'ZhengZhou'
    }
  },
  created() {
    console.log('ZhengZhou');
  },
  methods: {
    /**
     * 身份证 ocr
     */
    idCardZhengOcr(data) {
      let CARD_BASE = data.split(',')[1].replace(/\+/g, '%2B')
      let params = {
        TYPE: '',
        MEMBER_ID: '15621189933',
        ORG_ID: '49',
        ISFRONT: true,
        CARD_BASE
      }
      API.ZHENGZHOU.open.IdCardFrontPhoneOcr(params, (res) => {

      })
    },
    idCardFanOcr(data) {
      let CARD_BASE = data.split(',')[1].replace(/\+/g, '%2B')
      let params = {
        TYPE: '',
        MEMBER_ID: '15621189933',
        ORG_ID: '49',
        ISFRONT: false,
        CARD_BASE
      }
      API.ZHENGZHOU.open.IdCardFrontPhoneOcr(params, (res) => {

      })
    },

    checkID(fn) {

    },
    doOpengingFirst() {

    }
  }
}

let ORG_ID = store.getters.GET_ORG_ID
let MIX;
switch (ORG_ID) {
  case ORG_ID_NUM.JinShang:
    MIX = JinShang;
    break;
  case ORG_ID_NUM.ZhengZhou:
    MIX = JinShang;
    break;
  case ORG_ID_NUM.ZhongBang:
    MIX = ZhongBang;
    break;
}
export default MIX