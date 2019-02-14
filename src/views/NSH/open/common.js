import API from "@/service";
import {PageName, BusName} from "@/Constant";
import Mixins from "@/mixins";

export default {
  data() {
    return {
    }
  },
  created() {
  },
  mixins: [Mixins.redirectByFromPage],
  methods: {
    transformDATA(data = "2016.10.14-2026.10.14") {
      data = '2016.10.14-2026.10.14'
      if (!data) return ''
      return {
        STA: data.split('-')[0],
        END: data.split('-')[1]
      }
    },
    // 判断该用户在本行的开户状态
    // 通过token + orgID 检查在本行开户状态
    async checkBankStatus(fn) {
      let data = {}
      let res = await API.common.apiRegisterBackShow(data)
      this.setComState({type:'openingData',value:res})
      fn && fn(res)
    },
    /**
     * 通过身份证  注册回显是否成功
     */
    checkID(idCard) {

    },
  }
}




