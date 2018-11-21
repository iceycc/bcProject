import util from "libs/util";
import {LsName, PageName} from "@/Constant";
import API from "@/service";
import {mapMutations, mapGetters} from 'vuex'
import store from '@/store'
import {ORG_ID_NUM} from '@/Constant'
import * as Common from './common'


// 展开开户需要的store方法
// 展开公共的store方法
const StoreMixin = {
  methods: {
    ...mapMutations({
      setComState: 'SET_COMMON_STATE',
      removeComState: 'REMOVE_COMMON_STATE',
      setOpenState: 'SET_OPEN_STATE'
    })
  },
  computed: {
    ...mapGetters({
      getComState: 'GET_COMMON_STATE',
      getOpenState: 'GET_OPEN_STATE'
    })
  }
}
const HandleMixin = {
  mixins: [StoreMixin],
  beforeCreate() {
    console.log('beforeCreate');
    let reload = store.getters.GET_COMMON_STATE.reload
    if (reload) {
      store.commit('SET_COMMON_STATE', {type: "reload", value: false})
      location.reload()
    }
  },
  created() {

  },
  methods: {
    getErrMsg(fn) {
      let beforeInfo = this.$store.getters.GET_COMMON_STATE.ErrMsg
      if (beforeInfo) {
        fn && fn(beforeInfo)
        setTimeout(() => {
          this.errMsg = ''
        }, 2000)
        // util.storage.session.remove('setPasswordInfo')
        this.removeComState('ErrMsg')
      }
    },
    setErrMsg(err) {
      this.setComState({type: 'ErrMsg', err})
    }
  }
}
const UtilMixin = {
  methods: {
    /**
     * 用于登陆和测评结束后判断 源头是购买还是预约  还是电子账户来源
     */
    toPreProduct() {
      let SOURCE_URL = store.getters.GET_COMMON_STATE.loginType
      // let SOURCE_URL = util.storage.session.get(LsName.loginType)
      let goBuyData = store.getters.GET_COMMON_STATE.goBuy
      // let goBuyData = util.storage.session.get(LsName.goBuy)
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
          query: goBuyData
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
    /**
     * 用于处理 交易时的轮询
     * @param text
     * @param data
     * @param fn
     */
    queryStatus({
                  text = '等待中...', // 轮询等待提示
                  data, // 轮询参数
                  fn // 轮询回调
                }) {
      this.Londing.open({
        text: text
      })
      let i = 1
      let timer = setInterval(() => {
        i++
        API.common.apiQueryBizStatus(data, result => {
          console.log('RES_CODE>>', result.RES_CODE);
          fn && fn(result, timer, i) // result轮询结果，timer用于回调內清除定时器
        }, err => {
          clearInterval(timer)
        })
        if (i == 5) {
          clearInterval(timer)
          this.Londing.close()
          return
        }
      }, 2000)
    }

  }
}

export default {
  StoreMixin,
  HandleMixin,
  UtilMixin,
  ...Common
}
