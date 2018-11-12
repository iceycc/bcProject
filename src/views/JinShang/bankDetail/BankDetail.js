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
    getBankDetail() {
      API.account.getMyInvest({}, (res) => {
        this.bankDetail = res
      })
    },
    getProList() { // 获取产品列表
      let data = {
        currentPage: '1',
        PRD_TYPE: '2'
      }
      API.account.getMyInvestHold(data, (res) => {
        this.proList = res.PAGE
      })
    },
  }
}





