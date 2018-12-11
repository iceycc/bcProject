import API from "@/service"
import {LsName, BusName, PageName} from "@/Constant";
import Bus from '@/plugin/bus'
import util from "../../../libs/util";
let MsgText = '应银行监管要求，需先开通银行二类户，通过二类户与银行直接进行交易，资金安全有保障'


export default {
  methods:{
    // 判断该用户在比财的实名认证状态
    checkAuthStatus() {
      this.setComState({type:'ISLogin',value:false})
      API.bicai.getAuthStatus({}, res => {
        let {AUTH_STATUS, isOldMember} = res
        //  AUTH_STATUS 返回码：
        // 0:未认证，
        // 1:身份证认证，
        // 2:银行卡认证，
        // 3:密码设置，
        // 4:认证完成，
        // 5:身份证过期
        console.log(AUTH_STATUS);
        switch (Number(AUTH_STATUS)) {
          case 0:
          case 1:
            Bus.$emit(BusName.showToast,MsgText,3000)

            this.$router.push(PageName.BcOpening1)
            break;
          case 2:
            Bus.$emit(BusName.showToast,MsgText,3000)

            this.$router.push(PageName.BcOpening2)
            break;
          case 3:
          case 4:
            this.checkBankStatus()
            // todo 再判断对应的直销银行有没有开户
            break;
          case 5:
            //
            Bus.$emit(BusName.showToast,MsgText,3000)

            this.$router.push(PageName.BcOpening1)
            break;
        }
      })
    },
    // 判断该用户在本行的开户状态
    checkBankStatus() {
      // 登陆比财成功 且在比财实名成功 然后 检查在本行状态
      let data = {}
      API.common.apiRegisterBackShow(data, res => {
        let step = res.LAST_STEP_NUM
        this.setComState({type: 'TEL', value: this.tel})

        // （0未提交，1提交第一步，2提交第二步，3提交第三步）
        // util.storage.session.set('USERINFO', res)
        if (step == 0) {
          Bus.$emit(BusName.showToast,MsgText,3000)
          this.setComState({type:'openingData',value:res})
          this.$router.push({name: PageName.Opening1})
        }
        if (step == 1) {
          Bus.$emit(BusName.showToast,MsgText,3000)
          this.setComState({type:'openingData',value:res})
          this.$router.push({name: PageName.Opening2})
        }
        if (step == 2) {
          this.setComState({type:'Infos',value:res})

          // this.$store.commit('SET_OPENING_DATA', 1)
          // this.$router.push({name: PageName.Opening3})
          this.checkIfPinggu(res)
        }
        if (step == 3) {
          // todo登陆成功后判断拿来的去哪里
          this.setComState({type:'ISLogin',value:true})
          this.setComState({type:'Infos',value:res})

          // this.$router.push({name:PageName.Opening3})
          this.checkIfPinggu(res)
        }

      },err=>{
        this.codeText = '重新发送'
        this.msgDisabled = false
      })
    },
    // 判断是否评估
    checkIfPinggu(res){
      // this.$router.push({name:PageName.Opening3})
      this.removeComState('loginInfo')
      let type = res.HAS_GRADE
      this.setComState({type: 'HAS_GRADE', value: type})
      // util.storage.session.set(LsName.HAS_GRADE, type)
      if (type == 1) {
        Bus.$emit(BusName.showToast, '请先进行评估')
        this.$router.push({
          name: PageName.VerificationSuccess,
        })
      }
      else if (type == 2) { // 评估过
        // 2的话
        this.toPreProduct() // 评估过判断是否去哪里

      } else {
        this.toPreProduct() // 评估过判断是否去哪里
      }
    },
  }
}
