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
        TYPE: 'API_QRY_INCOM_HIS',
        currentPage: '1',
        PRD_TYPE: '1',
        PRD_INDEX_ID: '1',
        FUN_NO: '1',

      };
      //
      API.bank.apiQryHoldInfo(data, res => {
        // console.log('res',res);
        // this.proList = res.retList;
        this.proList = res;
      });

    },
    getBankList() {
      // 获取机构名称  机构logo 用于充值提现
      API.safe.apiBandCard({}, res => {
        this.bankObj = {
          logo: res.BANK_BG_URL,
          ORG_NAME: res.ORG_NAME,
          BANK_USER_CODE: res.BANK_USER_CODE
        }
      })
    },
    getBankDetail() { // 获取产品列表
      let data = {}
      API.bank.apiQryAsset(data, (res) => {
        this.bankDetail = res
      })
    },
  }
}





