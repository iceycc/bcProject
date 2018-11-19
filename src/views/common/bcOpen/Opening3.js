import API from "@/service";
import Bus from "@/plugin/bus"
import {PageName, BusName, LsName} from "@/Constant";
import util from "libs/util";

export default {
  data() {
    return {
      showLoginPass: false,
      showPayPass: true,
      pwd: '',
      pwdLen: ''
    }
  },
  created() {
    console.log('ZhengZhou');
  },
  methods: {
    setPassWord() {
      if (!this.REQ_SERIAL) {
        Bus.$emit(BusName.showToast, '实名认证异常，请重新注册')
        setTimeout(() => {
          this.$router.push({
            name: PageName.opening
          })
        },1000)
        return
      }
      let data = {
        TYPE: 'API_REGISTER_SET_PSW',
        ORG_ID: '',
        PREFIX: '',　// 密码控件唯一标识
        REQ_SERIAL: this.REQ_SERIAL,// BCS2018206470823115514961
        PASSWD: this.loginpass,
        CUST_NO: '', // 客户号
      }
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
      $('#PWDKBD').remove();
      this.pwd = $("#pay-pass").getKBD(); //获取密码
      this.pwdLen = $("#pay-pass").getLenKBD(); //获取密码长度
      console.log(this.pwd);
      console.log(this.pwdLen);
      this.disabled = false
      this.setPassWord()
    }
  }
}






