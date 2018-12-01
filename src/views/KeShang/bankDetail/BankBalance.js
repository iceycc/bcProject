import API from "@/service";
import {PageName, BusName, LsName} from "@/Constant";

export default {
  methods: {
    getBankDetail() {
      API.bank.apiQryAsset({}, (res) => {
        this.ACC_REST = res.ACC_REST
      })

    },

  }
}







