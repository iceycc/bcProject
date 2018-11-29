import API from "@/service";
import {PageName, BusName} from "@/Constant";
import Bus from '@/plugin/bus'
import util from "libs/util";


export default {
  data() {
    return {
      BankType: '1',
      applyDate: '',
      CARD_NUM: '', // 二类卡
      BANK_USER_CODE: '',// 一类卡
    }
  },
  created() {
    console.log('JinShang');
  },
  methods: {
    checkBankType() {
      let data = {
        BIND_AC_NO: this.ACCT_NO
      }
      // apiUserAccountProperties
      API.common.apiUserAccountProperties(data, res => {
        // 必填
        // 0：他行；
        // 1：本行；
        // 2：村镇
        this.BankType = res.ACC_FLAG
      })
    },

    handleApiRecharge() {
      let data = {
        TYPE: 'API_RECHARGE',
        PHONE_CODE: this.msgCode,
        // PIN: this.PIN,
        BANK_PAY_PW: this.pass,
        // APPLY_AMOUNT: this.APPLY_AMOUNT,
        APPLY_AMOUNT: util.fromatMoney(this.APPLY_AMOUNT),
        PREFIX: this.passCode,
        IS_UNIONPAY: this.BankType,
        // ORIGWORKDATE	充值申请日期
        // ORIGAGENTSERIALNO	充值申请流水号
        ORIGWORKDATE: this.applyDate.WORKDATE,
        ORIGAGENTSERIALNO: this.applyDate.AGENTSERIALNO
      }
      API.reChange.apiRecharge(data, res => {
        let params = {
          BIZ_TYPE: '3',
          BESHARP_SEQ: res.BESHARP_RECHARGE_SEQ
        }
        console.log(params);
        this.queryStatus({
          text: '正在充值中',
          data: params,
          fn: (result, timer, count) => {
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
        this.logo = res.BANK_BG_URL
        this.ORG_NAME = res.ORG_NAME
        this.ACCT_NO = res.CARD_NUM
        this.PHONE_NUM = res.PHONE_NUM
        this.CARD_BANK_NAME = res.CARD_BANK_NAME;
        this.CARD_BANK_URL = res.CARD_BANK_URL
        this.SINGLE_QUOTA = res.SINGLE_QUOTA
        this.DAY_QUOTA = res.DAY_QUOTA

        this.BANK_USER_CODE = res.BANK_USER_CODE
        this.CARD_NUM = res.CARD_NUM
        let cardNum = res.CARD_NUM
        this.checkBankType()
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
      // API.reChange.apiRechargeProtoQuery(data, (res) => {
      //   console.log(res);
      //   if (res.SIGN_STATE == 'N') {
      //     // 没写
      //     this.write = false
      //     this.page = false
      //     this.agree1 = false
      //   } else {
      //     // 填写了
      //     this.write = true
      //     this.agree1 = true
      //   }
      // })
    },
    clickBank() {
      this.upseletShow = !this.upseletShow
    },
  }
}





