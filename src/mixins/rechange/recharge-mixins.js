import API from "../../service";
import Bus from "@/plugin/bus"
import {PageName, BusName} from "@/Constant";
import util from "libs/util";
import store from '@/store'
import {ORG_ID_NUM} from '@/Constant'
let ORG_ID = store.getters.GET_ORG_ID

/**
 * 开户公共方法，根据ORG_ID区分不同的业务逻辑
 */
let commons = {
  data(){
    return{
      ORG_ID_NUM,
      ORG_ID
    }
  },
  created() {
    console.log('commons');
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
  }
}


/**
 * 晋商银行开户相关
 */
let JinShang = {
  mixins: [commons],
  data() {
    return {}
  },
  created() {
    console.log('JinShang');
  },
  methods: {
    clickBank(){
      this.upseletShow = !this.upseletShow
    },
  }
}
/**
 * 郑州银行相关
 */
let ZhengZhou = {
  mixins: [commons],
  data() {
    return {}
  },
  created() {
    console.log('ZhengZhou');
  },
  methods: {
    clickBank(){
        this.upseletShow = !this.upseletShow
    },
  }
}
/**
 * 众邦银行开户相关
 */
let ZhongBang = {
  mixins: [commons],
  data() {
    return {}
  },
  created() {
    console.log('ZhengZhou');
  },
  methods: {}
}




let MIX = {};
switch (ORG_ID) {
  case ORG_ID_NUM.JinShang:
    MIX = JinShang;
    break;
  case ORG_ID_NUM.ZhengZhou:
    MIX = ZhengZhou;
    break;
  case ORG_ID_NUM.ZhongBang:
    MIX = ZhongBang;
    break;
}
export default MIX
