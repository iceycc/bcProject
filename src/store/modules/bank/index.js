export default {
  // 用于管理当前访问银行信息
  state: {
    ORG_ID: '',
    ORG_NAME: '',
    LOGO_URL: '',
    DESCRIPT: '',
    BANK_NAME: '',
    BANK_BG_URL:''
  },
  // dispatch -> actions
  actions: {
    //
    SET_BANL_STATE(){

    },
    // 存储当前访问的银行信息 用于处理业务

  },
  // commit-> mutations  直接操作state，与业务无关
  mutations: {
    SET_BANK_STATE(state,{type,value}){
      state[type] = value
    }
  },
  getters: {
    GET_BANK_STATE:(state)=>{
      return state
    },
    GET_BANK_INFO: (state) => {
      return state
    },
    GET_ORG_ID: (state) => {
      return state.ORG_ID
    },
  }

}
