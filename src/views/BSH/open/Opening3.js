import API from "@/service";
import Bus from "@/plugin/bus"
import {PageName, BusName, LsName} from "@/Constant";
import util from "@/libs/util";

export default {
  data() {
    return {
      showLoginPass: false,
      showPayPass: true,
      pwd: '',
      pwdLen: '',
      pwdCode:''
    }
  },
  created() {

  },
  methods: {
    setPassWord() {
      let opening3 = this.getComState.openingData
      this.REQ_SERIAL = opening3.BESHARP_REGISTER_VALI_USER_SEQ
      if (!this.REQ_SERIAL) {
        Bus.$emit(BusName.showToast, '实名认证异常，请重新注册')
        setTimeout(() => {
          this.$router.push({
            name: PageName.opening
          }, 1000)
        })
        return
      }

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
        // todo 是否要判断预约来的还是购买来的

        Bus.$emit(BusName.showToast, '注册成功,即将跳转登录页')
        this.$store.commit('SET_TOKEN', '')
        this.setComState({type: "reload", value: true}) // reload-001
        this.Londing.open({
          text: '即将跳转登录页'
        })
        setTimeout(() => {
          this.Londing.close()
          this.$router.replace({
            name: PageName.Login
          })
        }, 1500)
      }, err => {
        this.ifShow = false
        this.setErrMsg({
          msg: err
        })
        setTimeout(() => {
          window.location.reload()
        }, 500)
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






