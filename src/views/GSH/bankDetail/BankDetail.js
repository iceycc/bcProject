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
    async getProList() {
      let data = {
        TYPE: 'API_QRY_HOLD_INFO',
        currentPage: '1',
        PRD_TYPE: '4',
        DEPOSIT_TYPE_ID: '4',
      };
      //
      let res = await API.bank.apiQryHoldInfo(data);
      this.proList = res;
    },
    async getBankList() {
      // 获取机构名称  机构logo 用于充值提现
      let res = await API.safe.apiBandCard({})
      this.bankObj = {
        logo: res.BANK_BG_URL,
        ORG_NAME: res.ORG_NAME,
        ACCT_NO: res.BANK_USER_CODE
      }
    },
    async getBankDetail() { // 获取产品列表
      let data = {}
      let res = await API.bank.apiQryAsset(data)
      this.bankDetail = res

    },
  }
}





