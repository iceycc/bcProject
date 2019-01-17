import API from '@/service'
import {PageName, imgSrc, LsName, BusName} from "@/Constant";
import Bus from "@/plugin/bus";

export const CheckAccountMixin ={
  methods:{
    // 判断该用户在比财的实名认证状态
    checkAuthStatus() {
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
            this.$router.push(PageName.BcOpening0)
            break;
          case 2:
            this.$router.push(PageName.BcOpening2)
            break;
          case 3:
            this.$router.push(PageName.BcOpening3)
            break;
          case 4:
            this.checkBankStatus()
            break;
          case 5:
            //
            this.$router.push(PageName.BcOpening0)
            break;
        }
      },err=>{
        this.codeText = '重新发送'
        this.msgDisabled = false
        clearInterval(timer)
      })
    },
    // 获取改比财用户在银行的状态
    getBankStatus(Page){
      let data = {
        IS_RET_GRADE:'1'
      }
      API.common.apiQryLoginStatus(data,res=>{
        let HAS_LOGIN = res.HAS_LOGIN // 是否已经登陆 0：不需要登录 1：已登录 2：未登陆
        let HAS_OPEN_BANK = res.HAS_OPEN_BANK  //  1：已开户 2：未开户
        let HAS_GRADE = res.HAS_GRADE
        this.setComState({type: 'HAS_GRADE', value:HAS_GRADE})
        if(HAS_OPEN_BANK==1){
           // 已经开户
          this.$router.push({name: Page})
        }else {
          // 未开户 去
          Bus.$emit(BusName.showToast,'您在本行还未开户，请先开户')
          this.$router.push({name:PageName.Opening1})
        }

      })
    },
    // 回显该用户在本行的开户状态
    checkBankStatus() {
      // 登陆比财成功 且在比财实名成功 然后 检查在本行状态
      let data = {}
      API.common.apiRegisterBackShow(data, res => {
        let step = res.LAST_STEP_NUM
        // （0未提交，1提交第一步，2提交第二步，3提交第三步）
        // util.storage.session.set('USERINFO', res)
        if (step == 0) {
          // this.$store.commit('SET_OPENING_DATA', 1)
          this.setComState({type:'openingData',value:res})
          this.$router.push({name: PageName.Opening1})
        }
        if (step == 1) {
          this.setComState({type:'openingData',value:res})
          // this.$store.commit('SET_OPENING_DATA', 1)
          this.$router.push({name: PageName.Opening2})
        }
        if (step == 2) {
          this.setComState({type:'openingData',value:res})
          // this.$store.commit('SET_OPENING_DATA', 1)
          this.$router.push({name: PageName.Opening3})
        }
        if (step == 3) {
          // todo登陆成功后判断拿来的去哪里
          // this.setComState({type:'Infos',value:res})
          this.checkIfPinggu(res)
        }
      },err=>{

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


export const FromPCMixin = {
  methods:{

  }
}
