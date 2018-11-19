import API from "@/service";
import Bus from "@/plugin/bus"
import {PageName, BusName} from "@/Constant";
import util from "libs/util";

let commons = {
  data() {
    return {
    }
  },
  created() {
    console.log('commons');
  },
  methods: {
    doOpeningFirstFactory() {
      API.watchApi({
        FUNCTION_ID: 'ptb0A003', // 点位
        REMARK_DATA: '异业合作-开户-开户信息验证', // 中文备注
      })
      this.$store.commit('SET_OPENING1_DATA',this.data)
      this.doOpengingFirst()


    },
    imgToBaseFan(e) {
      let newsrc = this.getObjectURL(e.target.files[0]);
      console.log(e.target);
      this.imgStyle2 = 'width:100%;max-height:100%'
      util.imgScale(newsrc, e.target.files[0], 4).then((data) => {
        this.preSrc2 = data
        this.data.CARD_BACK_FILE = data.split(',')[1].replace(/\+/g, '%2B')
        this.idCardFanOcr(data)
      })
    },
    imgToBaseZheng(e) {
      let newsrc = this.getObjectURL(e.target.files[0]);
      console.log(e.target);
      this.imgStyle1 = 'width:100%;max-height:100%'
      util.imgScale(newsrc, e.target.files[0], 4).then((data) => {
        this.preSrc1 = data
        this.data.CARD_FRONT_FILE = data.split(',')[1].replace(/\+/g, '%2B')
        this.idCardZhengOcr(data)
      })
    },
    //建立一個可存取到該file的url
    getObjectURL(file) {
      let url = null;
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
export default {
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
        NATION: false, // 民族
        PHONE: false, // 手机号
        USER_CARD_ID_DATA: false// 期限
      },
      DOCS: 'JinShang',
      job: [
        {name: '国家机关、社会组织、企事业单位负责人', value: '0'},
        {name: '科、教、工、贸等专业技术人员', value: '1'},
        {name: '批发、零售业服务人员', value: '2'},
        {name: '交通运输、仓储、邮政业服务人员', value: '3'},
        {name: '信息传输、软件和信息技术服务人员', value: '4'},
        {name: '水利、环境和公共设施管理服务人员', value: '5'},
        {name: '电力、燃气及水供应服务人员', value: '6'},
        {name: '文化、体育和娱乐服务人员', value: '7'},
        {name: '旅游、餐饮、住宿服务人员', value: '8'},
        {name: '金融服务人员', value: '9'},
        {name: '房地产、物业、建筑、装修服务人员', value: '10'},
        {name: '居民生活服务人员', value: '11'},
        {name: '军人、警察、安全、消防人员', value: '12'},
        {name: '农林牧渔业生产及辅助人员', value: '13'},
        {name: '学生', value: '14'},
        {name: '退休人员', value: '15'},
        {name: '不便分类劳动者', value: '16'},
      ],
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
      API.open.apiGetUserLastCompleteStep(getStepDatas, delMsg, res => {
        let step = res.LAST_STEP_NUM
        let REQ_SERIAL = res.REQ_SERIAL
        let PHONE_NUM = res.PHONE_NUM || '' // 改身份证是否有手机号回显
        console.log('步数 >>>', step);
        if (step == 0) {
          // Bus.$emit(BusName.showToast,"欢迎注册")
          fn && fn(REQ_SERIAL, step)
        }
        if (step == 1) { //
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
    idCardZhengOcr() {
      // 扫描身份证 正面
      let params = {
        idcardFrontPhoto: this.data.CARD_FRONT_FILE,
        memberId: this.data.memberId,
        phoneNum: this.data.phoneNum
      }
      API.open.apiIdCardFrontPhoneOcr(params, res => {
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
    idCardFanOcr() { //反
      let params = {
        idcardBackPhoto: this.data.CARD_BACK_FILE,
        memberId: this.data.memberId,
        phoneNum: this.data.phoneNum
      }
      API.open.apiIdCardBackPhoneOcr(params, res => {
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




