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
      ORG_ID,
      ORG_ID_NUM
    }
  },
  created() {
    console.log('commons');
  },
  methods: {}
}


/**
 * 晋商银行开户相关
 */
let JinShang = {
  mixins: [commons],
  data() {
    return {
      showLoginPass:true,
      showPayPass:true
    }
  },
  created() {
    console.log('JinShang');
  },
  methods: {}
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
  methods: {}
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