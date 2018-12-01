import API from "@/service";
import Bus from "@/plugin/bus"
import {PageName, BusName} from "@/Constant";
import util from "libs/util";
import commons from './common'

export default {
  mixins: [commons],
  data() {
    return {
      // 配置不同标签的展示
      DOMShow: {
        USER_NAME: true,
        USER_CARD_ID: true,// 身份证号码
        USER_DUTY:false,// 职业
        USER_EDUCATION: false, //学历
        ADDRESS: false, // 地址
        NATION: false, // 民族
        PHONE: false, // 手机号
        USER_CARD_ID_DATA: true, //身份证有效期
      },
      DOCS: 'ZhengZhou',
      job: [
        {name: '党的机关、国家机关、群众团体和社会组织、企事业单位负责人', value: '10000'},
        {name: '专业技术人员', value: '20000'},
        {name: '办事人员和有关人员', value: '30000'},
        {name: '社会生产服务和生活服务人员', value: '40000'},
        {name: '农、林、牧、渔业生产及辅助人员', value: '50000'},
        {name: '生产制造及有关人员', value: '60000'},
        {name: '军人', value: '70000'},
        {name: '其他从业人员', value: '80000'},
        {name: '未知', value: '90000'},
      ],
    }
  },
  created() {
    console.log('ZhengZhou');
  },
  methods: {
    doOpeningFirstFactory() {
      API.watchApi({
        FUNCTION_ID: 'ptb0A003', // 点位
        REMARK_DATA: '异业合作-开户-开户信息验证', // 中文备注
      })
      this.$store.commit('SET_OPENING1_DATA', this.data)
      this.ORG_ID = util.storage.session.get('ORG_ID')  || ''

      // this.ORG_ID = this.$store.getters.GET_ORG_ID
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
    /**
     * 身份证 ocr
     */


    idCardZhengOcr() {
      let params = {
        PHONE_NUM:this.data.PHONE,
        TYPE: 'ID_CARD_FRONT_PHONE_OCR',
        IDENT_PHOTO:this.data.CARD_FRONT_FILE.replace(/\+/g, '%2B'),
        MARK: '1',
      }
      API.open.IdCardFrontPhoneOcr(params, (res) => {
        this.data.USER_NAME = res.ID_NAME
        this.data.USER_CARD_ID = res.ID_NUMBER
        this.data.PARTNER_ORDER_ID = res.PARTNER_ORDER_ID
        // this.data.ADDRESS = res.ADDRESS

        // this.checkID()
        // this.data.CREDENTIAL_AURL = res.SUN_ECM_CONTENT_ID
      })
    },
    // TYPE	请求类型
    // ORG_ID	机构ID
    // PHONE_NUM	手机号码
    // IDENT_PHOTO // 身份证图片
    // MARK // 身份证正反面标识


    idCardFanOcr() {
      let params = {
        PHONE_NUM:this.data.PHONE,
        TYPE: 'ID_CARD_BACK_PHONE_OCR',
        MARK: '2',
        IDENT_PHOTO: this.data.CARD_BACK_FILE.replace(/\+/g, '%2B'),

      }
      API.open.IdCardFrontPhoneOcr(params, (res) => {
        console.log('aaaaaaaaaaaaaa');
        console.log(res.VALIDITY_PERIOD);
        this.data.USER_CARD_ID_DATA = res.VALIDITY_PERIOD,
        this.data.IDENT_VLD_DT =this.transformDATA(res.VALIDITY_PERIOD).END
        this.data.IDENT_LSS_DT = this.transformDATA(res.VALIDITY_PERIOD).STA
        this.data.PARTNER_ORDER_ID = res.PARTNER_ORDER_ID

        // IDENT_LSS_DT	证件签发日期
        // IDENT_VLD_DT	证件有效期

      })
    },

    /**
     *注册
     */
    // 1 实名认证
    doOpengingFirst() {
      // todo 校验
      // TYPE	请求类型
      // ORG_ID	机构ID
      // PHONE_NUM	注册手机号
      // USER_CARD_ID// 身份证号
      // USER_NAME// 姓名
      // CARD_FRONT_FILE // 身份证正面图像
      // CARD_BACK_FILE // 身份证反面图像

      // IDENT_LSS_DT	证件签发日期
      // IDENT_VLD_DT	证件有效期
      let params = {
        TYPE: 'API_REGISTER_VALI_USER',
        PHONE_NUM: this.data.PHONE + '',
        USER_NAME: this.data.USER_NAME + '',
        USER_CARD_ID: this.data.USER_CARD_ID + '',
        CARD_FRONT_FILE: this.data.CARD_FRONT_FILE,
        CARD_BACK_FILE: this.data.CARD_BACK_FILE,
        IDENT_LSS_DT:this.data.IDENT_LSS_DT,
        IDENT_VLD_DT:this.data.IDENT_VLD_DT,
      }
      console.log('open1Params>>', params);

      API.open.apiRegisterValiUser(params, (res) => {
        // todo
        // 保存第一步的数据
        this.setComState({type: 'openingState', value: {...res, ...params}})
        // 回显是否实名成功
        // this.checkBankStatus() //
        this.$router.push({name:PageName.Opening2})
      },err=>{
        setTimeout(()=>{
          this.checkBankStatus() //
        })
      })
    },

  }
}




