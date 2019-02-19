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
        currentPage: '1',
        prdType: '4',
        depositTypeId: '4',
        accNo:'123456',
        accCode:'',
        prodCode:'',
        fxSeqNo:'0',
        cashExFlag:'0',
        ccy:'001'

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





