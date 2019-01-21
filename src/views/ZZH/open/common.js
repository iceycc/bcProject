import API from "@/service";
import Bus from "@/plugin/bus"
import {PageName, BusName} from "@/Constant";
import util from "libs/util";
import Mixins from "@/mixins";
let MsgText = '应银行监管要求，需先开通银行二类户，通过二类户与银行直接进行交易，资金安全有保障'

export default {
  data() {
    return {
    }
  },
  created() {
  },
  mixins: [Mixins.HandleMixin],
  methods: {
    // 判断该用户在本行的开户状态
    // 通过token + orgID 检查在本行开户状态
    checkBankStatus(fn) {
      let data = {}
      API.common.apiRegisterBackShow(data, res => {
        this.setComState({type:'openingData',value:res})
        fn && fn(res)
        return
        if(fn){
           fn(res)
        }else {
          let step = res.LAST_STEP_NUM
          console.log('step',step);
          // （0未提交，1提交第一步，2提交第二步，3提交第三步）
          if (step == 0) {
            // this.$store.commit('SET_OPENING_DATA', res)
            Bus.$emit(BusName.showToast, MsgText, 3000)
            this.$router.push({name: PageName.Opening1})
          }
          if (step == 1) {
            Bus.$emit(BusName.showToast, '银行实名成功')
            // this.$store.commit('SET_OPENING_DATA', res)
            this.$router.push({name: PageName.Opening2})
          }
          if (step == 2) {
            // this.$store.commit('SET_OPENING_DATA', res)
            this.$router.push({name: PageName.Opening3})
          }
          if (step == 3) {
            // todo登陆成功后判断拿来的去哪里
            this.setComState({type:'ISLogin',value:true})
            this.toPreProduct()
            // this.$router.push({name:PageName.Login})
          }
        }
      })
    },
    /**
     * 通过身份证  注册回显是否成功
     */
    checkID(idCard) {
      // let data = {
      //   ID_NUMBER:idCard,
      // }
      // API.open.apiGetUserLastCompleteStep(data,res=>{
      //   let step = res.LAST_STEP_NUM
      //   let REQ_SERIAL = res.REQ_SERIAL|| ''
      //   let PHONE_NUM = res.PHONE_NUM || '' // 改身份证是否有手机号回显
      //   console.log('步数 >>>', step);
      //   if (step == 0) {
      //     // Bus.$emit(BusName.showToast,"欢迎注册")
      //   }
      //   if (step == 1) { //
      //     // fn && fn(REQ_SERIAL, step, PHONE_NUM)
      //   }
      //   if (step == 2) { // 跳转设置密码页
      //
      //   }
      //   if (step == 3) {
      //
      //   }
      // })
    },
  }
}




