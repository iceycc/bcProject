import API from "@/service";
import {PageName, BusName} from "@/Constant";
import Bus from '@/plugin/bus'

export default {
  data() {
    return {}
  },
  created() {
    console.log('JinShang');
  },
  methods: {
    getCode() { // 充值短信
      let data = {
        PHONE_NUM: this.PHONE_NUM,
        BIZ_TYPE: '1', // 充值需要
        BANK_USER_ID: this.BANK_USER_ID,
        BANK_ACCT_NO: this.BANK_USER_CODE
      }
      API.common.apiSendPhoneCode(data, res => {
        console.log(res)
        this.MESAGE_TOKEN = res.MESSAGE_TOKEN
        Bus.$emit(BusName.showSendMsg, this.PHONE_NUM)
      })
    },
    handleApiRecharge() {
      // TYPE	请求类型
      // ORG_ID	机构ID
      // APPLY_AMOUNT	充值金额
      // VRFY_FLAG	校验标志
      // PHONE_CODE	短信验证码
      let data = {
        TYPE: 'API_RECHARGE',
        APPLY_AMOUNT: this.APPLY_AMOUNT,
        PHONE_CODE: this.msgCode,
        MESAGE_TOKEN: this.MESAGE_TOKEN,
        BANK_ACCOUNT_NO: this.CARD_NUM,
        BANK_NAME: this.CARD_BANK_NAME
      }
      API.reChange.apiRecharge(data, res => {
        let params = {
          BIZ_TYPE: '3',
          BESHARP_SEQ: res.BESHARP_RECHARGE_SEQ
        }
        this.queryStatus({
          text: '正在充值中',
          data: params,
          time: 100,
          fn: (result, timer, count) => {
            this.setComState({type: "reload", value: true}) // reload-001
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
                  money: this.APPLY_AMOUNT,
                  ...res
                }
              })
            }
            else if ('20000' == result.RES_CODE) {
              clearInterval(timer)
              this.Londing.close()
              this.$router.push({
                name: PageName.RechargeWait,
              })
            }
            else {
              if (count == 100) {
                clearInterval(timer)
                Bus.$emit(BusName.showToast, result.RES_MSG);
                if ('20000' == result.RES_CODE) {
                  this.$router.push({ // todo是否要跳转
                    name: PageName.RechargeFailure,
                    query: {
                      err: result.RES_MSG
                    }
                  })
                } else {
                  this.$router.push({ // todo是否要跳转
                    name: PageName.RechargeFailure,
                    query: {
                      err: result.RES_MSG
                    }
                  })
                }

              }
            }
          }
        })
      }, err => {
        this.setComState({type: "reload", value: true}) // reload-001
        this.$router.push({
          name: PageName.RechargeFailure,
          query: {
            err: err.RES_MSG
          }
        })
      })
    },
    getInfos() {
      // 获取机构名称  机构logo 用于充值提现
      API.safe.apiBandCard({}, res => {
        console.log(res)
        this.logo = res.BANK_BG_URL
        this.ORG_NAME = res.ORG_NAME
        this.PHONE_NUM = res.PHONE_NUM
        this.CARD_BANK_NAME = res.CARD_LIST[0].CARD_BANK_NAME;
        this.BANK_USER_CODE = res.BANK_USER_CODE
        this.CARD_BANK_URL = res.CARD_LIST[0].CARD_BANK_URL
        this.DAY_QUOTA = res.CARD_LIST[0].DAY_QUOTA
        this.SINGLE_QUOTA = res.CARD_LIST[0].SINGLE_QUOTA
        this.CARD_NUM = res.CARD_LIST[0].CARD_NUM
        this.BANK_USER_ID = res.BANK_USER_ID
        let cardNum = res.CARD_LIST[0].CARD_NUM
        this.mainBankList.push({
          logo: res.CARD_BANK_URL,
          name: res.CARD_BANK_NAME,
          footNum: cardNum.substr(cardNum.length - 4),
          money: '100',
          id: this.mainBankList.length + 1
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
    clickBank() {
      // this.upseletShow = !this.upseletShow
    },
  }
}





