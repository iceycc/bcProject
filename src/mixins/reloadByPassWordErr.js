import storeMixin from "./storeMixin";
import store from '@/store'

// 最初用于处理晋商银行密码控件不刷新无法重置的缺陷 现在没用了
export default {
  mixins: [storeMixin],
  beforeCreate() {
    console.log('beforeCreate');
    let reload = store.getters.GET_COMMON_STATE.reload
    if (reload) {
      store.commit('SET_COMMON_STATE', {type: "reload", value: false})
      location.reload()
    }
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
