import API from "@/service";
import {PageName, BusName, LsName} from "@/Constant";

export default {
  methods: {
    getBankDetail() {
      API.account.apiQueryAccRest({}, (res) => {
        this.setComState({type: 'availableBalance', value: res.ACC_REST})
        this.ACC_REST = res.ACC_REST // 可用余额
        let goBuy = Object.assign(this.getComState.goBuy, {
          ORG_NAME: res.ORG_NAME,
          logo: res.LOGO_URL
        })
        this.setComState({type: 'goBuy', value: goBuy})
      })
    },
  }
}







