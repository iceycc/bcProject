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
      // DOMShow: {
      //   USER_NAME: true,
      //   USER_CARD_ID: true,// 身份证号码
      //   USER_DUTY:false,// 职业
      //   USER_EDUCATION: false, //学历
      //   ADDRESS: false, // 地址
      //   NATION: false, // 民族
      //   PHONE: false, // 手机号
      //   CARD_INDATE: true, //身份证有效期
      // },
      DOCS: 'ZZH',
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

  },
  methods: {
    doOpeningFirstFactory() {
      if(this.agree==false){
        Bus.$emit(BusName.showToast,'您还未同意相关协议')
        return
      }
      API.watchApi({
        FUNCTION_ID: 'ptb0A003', // 点位
        REMARK_DATA: '异业合作-开户-开户信息验证', // 中文备注
      })
      this.$store.commit('SET_OPENING1_DATA', this.data)
      this.ORG_ID = util.storage.session.get('ORG_ID')  || ''

      // this.ORG_ID = this.$store.getters.GET_ORG_ID
      this.doOpengingFirst()

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
      // PERIOD	证件有效期
      let params = {
        TYPE: 'API_REGISTER_VALI_USER',
        PHONE_NUM: this.data.PHONE + '',
        USER_NAME: this.data.USER_NAME + '',
        USER_CARD_ID: this.data.USER_CARD_ID + '',
        CARD_FRONT_FILE: encodeURIComponent(this.data.CARD_FRONT_FILE),
        CARD_BACK_FILE: encodeURIComponent(this.data.CARD_BACK_FILE),
        PERIOD: this.data.CARD_INDATE,
        BUYER_CERT_TYPE: '0'
      }
      console.log('open1Params>>', params);

      API.open.apiRegisterValiUser(params, (res) => {
        // todo
        // 保存第一步的数据
        this.setComState({
          type: 'openingData',
          value: {...this.suerinfo, BESHARP_REGISTER_VALI_USER_SEQ: res.REQ_SERIAL}
        })
        // 回显是否实名成功
        // this.checkBankStatus() //
        this.$router.push({name:PageName.Opening2})
      },err=>{
        // setTimeout(()=>{
        //   this.checkBankStatus() //
        // })
      })
    },

  }
}




