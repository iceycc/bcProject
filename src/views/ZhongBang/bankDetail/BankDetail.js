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





