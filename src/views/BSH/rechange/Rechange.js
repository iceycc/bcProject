import API from "@/service";
import {PageName, BusName} from "@/Constant";
import Bus from '@/plugin/bus'

export default {
  data() {
    return {
      rechargeData: {}
    }
  },
  created() {
    console.log('JinShang');
  },
  methods: {
    async getCode() { // 充值短信
      let data = {
        BIZ_TYPE: '1', // 充值需要
        BANK_USER_ID: this.BANK_USER_ID,
        BANK_ACCT_NO: this.BANK_USER_CODE
      }
      try {
        let res = await API.common.apiSendPhoneCode(data)
        console.log(res)
        this.MESAGE_TOKEN = res.MESSAGE_TOKEN
        Bus.$emit(BusName.showSendMsg, res.BC_PHONE)
      } catch (e) {
        this.codeText = '重新发送'
        this.disable = false
        clearInterval(this.timer)
      }


    },
    async handleApiRecharge() {
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

      try {
        let res = await API.reChange.apiRecharge(data)
        let params = {
          BIZ_TYPE: '3',
          BESHARP_SEQ: res.BESHARP_RECHARGE_SEQ
        }
        // 查询接口
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
            } else if ('0' == result.RES_CODE) {
              clearInterval(timer)
              Bus.$emit(BusName.showToast, result.RES_MSG);
              this.Londing.close()
              this.$router.push({
                name: PageName.RechargeSuccess,
                query: {
                  ORIGIN_PAGE: this.ORIGIN_PAGE,
                  money: this.APPLY_AMOUNT,
                  ...res
                }
              })
            } else if ('20000' == result.RES_CODE) {
              clearInterval(timer)
              this.Londing.close()
              this.$router.push({
                name: PageName.RechargeWait,
              })
            } else {
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
      } catch (err) {
        Bus.$emit(BusName.showToast, err)
      }

    },
    async getInfos() {
      // 获取机构名称  机构logo 用于充值提现
      let res = await API.safe.apiBandCard({})
      if('{}' === JSON.stringify(res)) return
      this.logo = res.BANK_BG_URL
      this.ORG_NAME = res.ORG_NAME
      this.PHONE_NUM = res.PHONE_NUM
      this.BANK_USER_CODE = res.BANK_USER_CODE // 二类户卡号
      this.CARD_BANK_NAME = res.CARD_LIST[0].CARD_BANK_NAME;// 银行名称
      this.CARD_BANK_URL = res.CARD_LIST[0].CARD_BANK_URL
      this.DAY_QUOTA = res.CARD_LIST[0].DAY_QUOTA
      this.SINGLE_QUOTA = res.CARD_LIST[0].SINGLE_QUOTA
      this.CARD_NUM = res.CARD_LIST[0].CARD_NUM
      this.BANK_USER_ID = res.BANK_USER_ID
      this.mainBankList = res.CARD_LIST
      let rechargeData = {
        USER_NAME: res.USER_NAME,
        USER_CARD_ID: res.USER_CARD_ID
      }
      this.setComState({type: 'rechargeData', value: rechargeData})

    },
    clickBank() {
      this.upseletShow = !this.upseletShow
    },
  }
}





