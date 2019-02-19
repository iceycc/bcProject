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

    async handleApiRecharge() {

      let data = {
        amount: this.APPLY_AMOUNT,
        bindMedium:this.cardNum,
        PHONE_CODE: this.msgCode,
        bankName: this.cardBankName,
        ccy:'1',
        cashExFlag:'0',
        summary:'',


        BANK_ACCOUNT_NO: this.cardNum,
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
      this.logo = res.bankBgUrl
      this.orgName = res.orgName
      this.phoneNum = res.phoneNum
      this.bankUserCode = res.bankUserCode // 二类户卡号
      this.cardBankName = res.cardList[0].cardBankName;// 银行名称
      this.cardBankUrl = res.cardList[0].cardBankUrl
      this.dayQuota = res.cardList[0].dayQuota
      this.singleQuota = res.cardList[0].singleQuota
      this.cardNum = res.cardList[0].cardNum

      this.userCardId = res.userCardId
      this.mainBankList = res.cardList
      let rechargeData = {
        USER_NAME: res.userName,
        USER_CARD_ID: res.userCardId
      }
      this.setComState({type: 'rechargeData', value: rechargeData})

    },
    clickBank() {
      this.upseletShow = !this.upseletShow
    },
  }
}





