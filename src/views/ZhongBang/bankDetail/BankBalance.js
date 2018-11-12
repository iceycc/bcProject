import API from "@/service";
import {PageName, BusName, LsName} from "@/Constant";

export default {
  methods: {
    getBankDetail() {
      API.account.apiQueryAccRest({}, (res) => {
        this.ACC_REST = res.ACC_REST
        let ReChargeData = {
          ORG_NAME: res.ORG_NAME,
          LOGO_URL: res.LOGO_URL
        }
        this.setComState({type:'ReChargeData',value:ReChargeData})
      })
    },
  }
}







