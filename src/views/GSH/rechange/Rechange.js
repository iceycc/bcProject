import API from "@/service";
import {PageName, BusName} from "@/Constant";

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
        bindMedium: this.cardNum,
        bankName: this.cardBankName,
        ccy: '1',
        cashExFlag: '0',
        summary: '摘要',
        remarks: '摘要'
      }

      try {
        let res = await API.reChange.apiRecharge(data)
        // 查询接口
        let params = {
          bizType: '3', // 充值
          reqSerial: res.reqSerial,
          apiPackSeq: res.apiPackSeq,
          besharpOrderNo: res.besharpOrderNo
        }
        // 轮询查询交易状态！！
        let qureyRes = await this.queryBizStatus(params, '正在充值中')
        console.log(qureyRes);
        if ('0' == qureyRes.resCode) {
          this.$router.push({
            name: PageName.RechargeSuccess,
            query: {
              ORIGIN_PAGE: this.ORIGIN_PAGE,
              amount: this.APPLY_AMOUNT,
              ...qureyRes
            }
          })
        } else if ('1' == qureyRes.resCode) {
          this.$router.push({
            name: PageName.RechargeFailure,
            query: {
              err: qureyRes.resMsg,
            }
          })
        } else if ('20000' == qureyRes.resCode) {
          this.$router.push({
            name: PageName.RechargeWait,
            query: {
              ...qureyRes
            }
          })
        }
      } catch (err) {
        console.log(err);
        this.$router.push({
          name: PageName.RechargeFailure,
          query: {
            err: err,
          }
        })
      }

    },
    async getInfos() {
      // 获取机构名称  机构logo 用于充值提现
      let res = await API.safe.apiBandCard({})
      if ('{}' === JSON.stringify(res)) return
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





