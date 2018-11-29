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
    getProList() {
      // API.account.getMyInvest({}, (res) => {
      //   this.bankDetail = res
      // })
      let data = {
        TYPE:'API_QRY_INCOM_HIS',
        currentPage:'1',
        PRD_TYPE:'4',
        DEPOSIT_TYPE_ID:'1',
        FUN_NO:'1',
      };
      //
      API.bank.apiQryHoldInfo(data, res => {
        this.proList = res;
      });

    },
    getBankList() {
      // 获取机构名称  机构logo 用于充值提现
      API.safe.apiBandCard({}, res => {
        this.bankObj = {
          logo: res.BANK_BG_URL,
          ORG_NAME: res.ORG_NAME,
          ACCT_NO: res.BANK_USER_CODE
        }
      })
    },
    getBankDetail() { // 获取产品列表
      let data = {
        TYPE:'API_QRY_ASSET'
      }
      API.bank.apiQryAsset(data, (res) => {
        this.bankDetail = res
      })
    },
  }
}





