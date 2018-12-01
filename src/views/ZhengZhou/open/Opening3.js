import API from "@/service";
import Bus from "@/plugin/bus"
import {PageName, BusName, LsName} from "@/Constant";
import util from "libs/util";
import Mixins from "@/mixins";


export default {
  data() {
    return {
      showLoginPass: false,
      showPayPass: true,
      pwd: '',
      pwdLen: '',
      pwdCode: ''
    }
  },
  mixins: [Mixins.HandleMixin, Mixins.UtilMixin],
  created() {
    console.log('ZhengZhou');
  },
  methods: {
    setPassWord() {
      let opening3 = this.getComState.openingData
      this.REQ_SERIAL = opening3.BESHARP_REGISTER_VALI_USER_SEQ

      let CUST_NO = opening3.CUST_NO || null
      let data = {
        TYPE: 'API_REGISTER_SET_PSW',
        PREFIX: this.pwdCode,　// 密码控件唯一标识
        REQ_SERIAL: this.REQ_SERIAL,// BCS2018206470823115514961
        PASSWD: this.pwd,
        CUST_NO: CUST_NO, // 客户号
      }
      console.log(data);
      API.open.apiRegisterSetPsw(data, res => {
        // Bus.$emit(BusName.showToast, '注册成功,即将跳转登录页')
        // this.$store.commit('SET_TOKEN', '')
        this.setComState({type:'ISLogin',value:true})
        this.toPreProduct()
      }, err => {
        this.ifShow = false
        this.setErrMsg({
          msg: err
        })

      })
    },
    subumit() {
      API.watchApi({
        FUNCTION_ID: 'ptb0A005', // 点位
        REMARK_DATA: '异业合作-开户-设置密码', // 中文备注
      })
      this.pwd = $("#pay-pass").getKBD(); //获取密码
      this.pwdLen = $("#pay-pass").getLenKBD(); //获取密码长度
      this.pwdCode = $("#pay-pass").getBDCode(); //获取密码长度
      this.disabled = false
      this.setPassWord()
    }
  }
}






