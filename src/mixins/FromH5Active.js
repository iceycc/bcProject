import API from '@/service'
import {PageName, imgSrc, LsName, BusName} from "@/Constant";
import Bus from "@/plugin/bus";

/**
 * 外链跳转购买
 * @type {{methods: {}}}
 */
export const ToBuying ={
  data(){
    return{
      ProID:''
    }
  },
  created() {
    // ProID=19758&moneyNum=100
    let ProID = util.storage.session.get('ProID') || this.$route.query.ProID // H5活动页外链过来的
    let moneyNum = this.$route.query.moneyNum // H5活动页外链过来的
    util.storage.session.set('moneyNum', moneyNum)
    if (ProID) {
      this.ProID = ProID
      this.getData(ProID)
    } else {
      this.getInfo()
      let proData = this.getComState.goBuy
      this.initData(proData)
    }
  },
  methods:{

  }
}


export const FromPCMixin = {
  methods:{

  }
}
