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
    getInfos() {
      API.safe.apiBandCard({}, res => {
        this.CARD_BANK_NAME = res.CARD_BANK_NAME;
        this.CARD_BANK_URL = res.CARD_BANK_URL
        this.SINGLE_QUOTA = res.SINGLE_QUOTA
        this.DAY_QUOTA = res.DAY_QUOTA
        let cardNum =res.CARD_NUM
        this.mainBankList.push({
          logo:res.CARD_BANK_URL,
          name:res.CARD_BANK_NAME,
          footNum:cardNum.substr(cardNum.length-4),
          money:'100',
          id:this.mainBankList.length+1
        })
      })
    },
    reChangeHandele() { // 39查询用户是否已签约充值协议
      let data = {}
      API.reChange.apiRechargeProtoQuery(data, (res) => {
        console.log(res);
        if (res.SIGN_STATE == 'N') {
          // 没写
          this.write = false
          this.page = false
          this.agree1 = false
        } else {
          // 填写了
          this.write = true
          this.agree1 = true
        }
      })
    },
    clickBank(){
      this.upseletShow = !this.upseletShow
    },
  }
}





