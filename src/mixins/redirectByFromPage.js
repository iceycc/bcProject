import store from '@/store'
import API from "@/service";
import {LsName, PageName} from "@/Constant";

export default {
  methods:{
    /** redirectByFromPages
     * 用于登陆和测评结束后判断 源头是购买还是预约  还是电子账户来源
     */
    redirectByFromPage() {
      this.setComState({type:'ISLogin',value:true})
      let SOURCE_URL = this.getComState.loginType
      // let SOURCE_URL = util.storage.session.get(LsName.loginType)
      if (SOURCE_URL == '预约下期') { // 判断是从预约产品过来的 ， 直接预约
        let ProDuctData = store.getters.GET_COMMON_STATE.ProDuctData
        // let ProDuctData = util.storage.session.get(LsName.ProDuctData)
        API.product.apiSaveSubscribeInfo(ProDuctData, res => {
          console.log(res);
          this.$router.push({
            name: PageName.OrderNextSuccess,
            query: {
              PRD_NAME: ProDuctData.PRD_NAME,
            }
          })
          store.commit('REMOVE_COMMON_STATE', 'ProDuctData')
          store.commit('REMOVE_COMMON_STATE', "loginType")
          // util.storage.session.remove(LsName.ProDuctData)
          // util.storage.session.remove(LsName.loginType)
        }, err => {
          this.$router.push({
            path: PageName.ProductList
          })
          // Bus.$emit(BusName.showToast,err)
          store.commit('REMOVE_COMMON_STATE', 'ProDuctData')
          store.commit('REMOVE_COMMON_STATE', "loginType")
          // util.storage.session.remove(LsName.ProDuctData)
          // util.storage.session.remove(LsName.loginType)
          console.log(err);
        })
        return
      } else if (SOURCE_URL == '安全购买') { // 购买页
        // store.commit('REMOVE_COMMON_STATE', 'goBuy')
        store.commit('REMOVE_COMMON_STATE', "loginType")
        // util.storage.session.remove(LsName.goBuy)
        // util.storage.session.remove(LsName.loginType)
        // 其他的话  正常 跳转购买页
        this.$router.push({
          name: PageName.Buying,
        })
      }
      else {
        //
        // util.storage.session.remove(LsName.loginType)
        if (SOURCE_URL) {
          this.$router.push({
            name: SOURCE_URL
          })
          return
        }
        this.$router.push({
          path: PageName.ProductList
        })
      }
    },
  }
}
