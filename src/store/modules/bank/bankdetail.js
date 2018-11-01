export default {
  state: {
    bankInfo: {
      bankName: '',
      bankLogo: '',
      ifNeedPass: '',
      msgTime: '',
    }
  },
  // dispatch -> actions
  actions: {
    addBankInfo({state, dispatch}, {
      bankName,
      bankLogo,
      ifNeedPass,
      msgTime
    }) {
      state.bankInfo = {
        bankName,
        bankLogo,
        ifNeedPass,
        msgTime
      }
      dispatch('printInfos')
    },
    printInfos() {
      console.log('printInfos');
    }
  },
  // commit-> mutations
  mutations: {
    setMsgTime({bankInfo}) {
      bankInfo.msgTime++
    }
  },
  getters: {
    getMsg:(state) =>{
      return state.bankInfo.msgTime
    }
  }

}