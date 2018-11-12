import API from "@/service";
import {PageName, BusName} from "@/Constant";
export default {
  data() {
    return {}
  },
  created() {
    console.log('JinShang');
  },
  methods: {
    getCode() { // 获取充值协议码
      API.reChange.apiRechargeProtoCode({}, res => {
        console.log(res);
        this.PIN = res.PIN
        this.agree1 = true
        // this.page = false
      }, err => {
        this.codeText = '重新发送'
        this.disable = false
        clearInterval(timer)
      })
    },
    handleApiRecharge(){
      let data = {
        TYPE:'API_RECHARGE',
        PHONE_CODE: this.msgCode,
        PIN: this.PIN,
        BANK_PAY_PW: this.pass,
        APPLY_AMOUNT: this.APPLY_AMOUN
      }
      API.reChange.apiRecharge(data, res => {
        let params = {
          BIZ_TYPE: '3',
          BESHARP_SEQ: res.BESHARP_RECHARGE_SEQ
        }
        this.queryStatus({
          text: '正在充值中',
          data: params,
          fn: (result, timer, count) => {
            this.setComState({type:"reload",value:true}) // reload-001
            if ('1' == result.RES_CODE) {
              clearInterval(timer)
              Bus.$emit(BusName.showToast, result.RES_MSG);
              this.$router.push({ // todo是否要跳转
                name: PageName.RechargeFailure,
                query: {
                  err: result.RES_MSG
                }
              })

            }
            else if ('0' == result.RES_CODE) {
              clearInterval(timer)
              Bus.$emit(BusName.showToast, result.RES_MSG);
              this.Londing.close()
              this.$router.push({
                name: PageName.RechargeSuccess,
                query: {
                  money: this.APPLY_AMOUN,
                  ...res
                }
              })
            } else {
              if (count == 5) {
                clearInterval(timer)
                Bus.$emit(BusName.showToast, result.RES_MSG);
                this.$router.push({ // todo是否要跳转
                  name: PageName.RechargeFailure,
                  query: {
                    err: result.RES_MSG
                  }
                })
              }
            }
          }
        })
      }, err => {
        this.setComState({type:"reload",value:true}) // reload-001
        this.$router.push({
          name: PageName.RechargeFailure,
          query: {
            err: err.RES_MSG
          }
        })
      })
    },
    getInfos() {
      API.safe.apiBandCard({}, res => {
        this.CARD_BANK_NAME = res.CARD_BANK_NAME;
        this.CARD_BANK_URL = res.CARD_BANK_URL
        this.SINGLE_QUOTA = res.SINGLE_QUOTA
        this.DAY_QUOTA = res.DAY_QUOTA
        let cardNum =res.CARD_NUM
        this.mainBankList.push({
          logo:res.CARD_BANK_URL,
          name:res.CARD_BANK_NAME,
          footNum:cardNum.substr(cardNum.length-4),
          money:'100',
          id:this.mainBankList.length+1
        })
      })
    },
    reChangeHandele() { // 查询用户是否已签约充值协议
      let data = {}
      API.reChange.apiRechargeProtoQuery(data, (res) => {
        console.log(res);
        if (res.SIGN_STATE == 'N') {
          // 没写
          this.write = false
          this.page = false
          this.agree1 = false
        } else {
          // 填写了
          this.write = true
          this.agree1 = true
        }
      })
    },
    clickBank(){
      this.upseletShow = !this.upseletShow
    },
  }
}





