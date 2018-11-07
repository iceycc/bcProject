import API from "../../service";
import Bus from "@/plugin/bus"
import {PageName, BusName} from "@/Constant";
import util from "libs/util";
import store from '@/store'
import {ORG_ID_NUM} from '@/Constant'

/**
 * 开户公共方法，根据ORG_ID区分不同的业务逻辑
 */
let commons = {
  created() {
    console.log('commons');
  },
  methods: {
    doOpeningFirstFactory() {
      API.watchApi({
        FUNCTION_ID: 'ptb0A003', // 点位
        REMARK_DATA: '异业合作-开户-开户信息验证', // 中文备注
      })
      this.ORG_ID = this.$store.getters.GET_ORG_ID
      this.doOpengingFirst()

    },
    imgToBaseFan(e) {
      var newsrc = this.getObjectURL(e.target.files[0]);
      console.log(e.target);
      this.imgStyle2 = 'width:100%;max-height:100%'
      util.imgScale(newsrc, e.target.files[0], 4).then((data) => {
        this.preSrc2 = data
        this.idCardFanOcr(data)
      })
    },
    imgToBaseZheng(e) {
      var newsrc = this.getObjectURL(e.target.files[0]);
      console.log(e.target);
      this.imgStyle1 = 'width:100%;max-height:100%'
      util.imgScale(newsrc, e.target.files[0], 4).then((data) => {
        this.preSrc1 = data
        this.idCardZhengOcr(data)
      })
    },
    //建立一個可存取到該file的url
    getObjectURL(file) {
      var url = null;
      // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
      if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
  }
}


/**
 * 晋商银行开户相关
 */
let JinShang = {
  mixins: [commons],
  data() {
    return {
      // 配置不同标签的展示
      DOMShow: {
        USER_NAME: true,
        USER_CARD_ID: true,// 身份证号码
        USER_DUTY: true, // 职业
        USER_EDUCATION: true, //学历
        ADDRESS: false, // 地址
        NATION: true, // 民族
        PHONE: false, // 手机号
        USER_CARD_ID_DATA: false// 期限
      },
      DOCS: 'JinShang'
    }
  },
  created() {
    console.log('JinShang');
  },
  methods: {
    /**
     * 用于查询注册到第几步
     */
    checkID(fn) {
      // 回显
      let getStepDatas = {
        ID_NUMBER: this.data.USER_CARD_ID
      }
      let delMsg = false
      API.JINSHANG.open.apiGetUserLastCompleteStep(getStepDatas, delMsg, res => {
        let step = res.LAST_STEP_NUM
        let REQ_SERIAL = res.REQ_SERIAL
        let PHONE_NUM = res.PHONE_NUM || '' // 改身份证是否有手机号回显
        console.log('步数 >>>', step);
        if (step == 0) {
          // Bus.$emit(BusName.showToast,"欢迎注册")
          fn && fn(REQ_SERIAL, step)
        }
        if (step == 1) { //
          // todo
          // fn && fn(REQ_SERIAL, step, PHONE_NUM)
          this.$router.push({
            name: PageName.Opening2,
            query: {
              REQ_SERIAL: REQ_SERIAL,
              LAST_STEP_NUM: step,
              PHONE_NUM: PHONE_NUM
            },
            params: {
              data: this.data,
            }
          })
        }
        if (step == 2) { // 跳转设置密码页
          Bus.$emit(BusName.showToast, "您已经实名成功")
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
          Bus.$emit(BusName.showToast, "您已经开户成功")
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
    /**
     * 流程第一步
     */
    doOpengingFirst() {
      this.data.USER_CARD_ID = this.data.USER_CARD_ID.toString().toUpperCase()
      let data = this.data
      // 校验
      if (!this.agree) {
        Bus.$emit(BusName.showToast, '请同意相关协议')
        return
      }
      if (util.Check.name(data.USER_NAME, true)) return;
      if (util.Check.idNumber(data.USER_CARD_ID, true)) return;

      if (data.USER_DUTY == '') {
        Bus.$emit(BusName.showToast, '请选择职业')
        return
      }
      if (data.USER_EDUCATION == '') {
        Bus.$emit(BusName.showToast, '请选择学历')
        return
      }
      if (data.CARD_FRONT_FILE == '') {
        Bus.$emit(BusName.showToast, '身份证正面未成功上传')
        return
      }
      if (data.CARD_BACK_FILE == '') {
        Bus.$emit(BusName.showToast, '身份证反面未成功上传')
        return
      }
      this.checkID((REQ_SERIAL, step, PHONE_NUM = '') => {
        this.$router.push({
          name: PageName.Opening2,
          query: {
            REQ_SERIAL: REQ_SERIAL,
            LAST_STEP_NUM: step,
            PHONE_NUM: PHONE_NUM
          },
          params: {
            data: this.data,
          }
        })
      })
    },

    /**
     * 身份证 ocr
     */
    // 上传并回显身份证正面信息
    idCardZhengOcr(data) {
      this.data.CARD_FRONT_FILE = data.split(',')[1].replace(/\+/g, '%2B')
      // console.log(this.data.CARD_FRONT_FILE);
      // 扫描身份证 正面
      let params = {
        idcardFrontPhoto: this.data.CARD_FRONT_FILE,
        memberId: this.data.memberId,
        phoneNum: this.data.phoneNum
      }
      API.JINSHANG.open.apiIdCardFrontPhoneOcr(params, res => {
        if (res.status != 0) {
          this.data.CARD_FRONT_FILE = ''
          Bus.$emit(BusName.showToast, res.message)
          return
        }
        this.data.memberId = res.memberId
        this.data.phoneNum = res.phoneNum
        this.data.USER_NAME = res.idName
        this.data.USER_CARD_ID = res.idNumber

        this.checkID()
      })
    },
    // 上传并回显身份证反面信息
    idCardFanOcr(data) { //反
      this.data.CARD_BACK_FILE = data.split(',')[1].replace(/\+/g, '%2B')
      let params = {
        idcardBackPhoto: this.data.CARD_BACK_FILE,
        memberId: this.data.memberId,
        phoneNum: this.data.phoneNum
      }
      API.JINSHANG.open.apiIdCardBackPhoneOcr(params, res => {
        if (res.status != 0) {
          this.data.CARD_BACK_FILE = ''
          Bus.$emit(BusName.showToast, res.message)
          return
        }
        this.data.memberId = res.memberId
        this.data.phoneNum = res.phoneNum
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