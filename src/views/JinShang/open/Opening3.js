import API from "@/service";
import Bus from "@/plugin/bus"
import {PageName, BusName,LsName} from "@/Constant";
import util from "libs/util";
export default {
  data() {
    return {
      showLoginPass:true,
      showPayPass:true
    }
  },
  created() {
    console.log('JinShang');
  },
  methods: {
    setPassWord() {
      if (!this.REQ_SERIAL) {
        Bus.$emit(BusName.showToast, '实名认证异常，请重新注册')
        setTimeout(() => {
          this.$router.push({
            name: PageName.opening
          }, 1000)
        })
        return
      }
      let data = {
        REQ_SERIAL: this.REQ_SERIAL,// BCS2018206470823115514961
        BANK_LOGIN_PW: this.loginpass,
        BANK_PAY_PW: this.paypass,
        LAST_STEP_NUM: this.LAST_STEP_NUM
      }
      API.open.setPassWord(data, res => {
        // let ProDuctData = util.storage.session.get(LsName.ProDuctData)
        let ProDuctData =this.getComState.ProDuctData
        if (ProDuctData) { // 判断是从预约产品过来的 ， 直接预约
          API.product.apiSaveSubscribeInfo(ProDuctData, res => {
            console.log(res);
            this.removeComState('ProDuctData')
            // util.storage.session.remove(LsName.ProDuctData)
            this.$router.push({
              name: PageName.OrderNextSuccess,
              query: {
                PRD_NAME: ProDuctData.PRD_NAME,
              }
            })
          }, err => {
            this.removeComState('ProDuctData')
            // util.storage.session.remove(LsName.ProDuctData)
            console.log(err);
          })
          return
        }
        Bus.$emit(BusName.showToast, '注册成功,即将跳转登录页')
        // util.storage.session.remove(LsName.token)
        this.$store.commit('SET_TOKEN','')
        this.setComState({type:"reload",value:true}) // reload-001
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
    // 密码控件获取密码
    subumit() {
      API.watchApi({
        FUNCTION_ID: 'ptb0A005', // 点位
        REMARK_DATA: '异业合作-开户-设置密码', // 中文备注
      })
      // this.Londing.open()
      // setTimeout(() => {
      //     this.Londing.close()
      // }, 500)
      this.paypass = $('#payPass').$getCiphertext()
      this.paypassLen = $('#payPass').$getPasswordLength() - 0 || 0
      this.loginpass = $('#loginPass').$getCiphertext()
      this.loginpassLen = $('#loginPass').$getPasswordLength() - 0 || 0

      if (util.Check.loginPassLen(this.loginpassLen,true)) return;
      if (util.Check.payPassLen(this.paypassLen,true)) return;
      this.s_loginPass = '********'
      this.s_payPass = '******'
      this.disabled = false
      this.setPassWord()
    },

  }
}






