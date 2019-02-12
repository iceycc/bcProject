import API from "@/service";
import {PageName, BusName, LsName} from "@/Constant";

export default {
  methods: {
    getBankDetail() {
      API.bank.apiQryEleAccount({TYPE:'API_MY_ASSET_BY_ORG'}, (res) => {
        this.ACC_REST = res.ACC_REST
        this.WITH_DRAWABLE_CASH = res.WITH_DRAWABLE_CASH
      })
    },

  }
}







