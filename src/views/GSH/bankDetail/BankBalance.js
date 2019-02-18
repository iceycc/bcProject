import API from "@/service";
import {PageName, BusName, LsName} from "@/Constant";

export default {
  methods: {
    async getBankDetail() {
      let res = await API.bank.apiQryEleAccount({ccy: '1'})
      this.ACC_REST = res.accRestDesc
      this.WITH_DRAWABLE_CASH = res.accFrozenDesc // todo
    },
  }
}







