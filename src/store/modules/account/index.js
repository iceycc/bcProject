// 存储当前登录银行的凭证信息 ji
export default {
  state: {
    // 当前登录银行的TOKEN
    TOKEN: '',
    // 保存登录过银行的凭证信息
    BANKS_TOKEN: []
  },
  actions: {

  },
  mutations: {
    SET_TOKEN(state,TOKEN){
      state.TOKEN = TOKEN
    }
  },
  getters:{
    GET_TOKEN(state){
      return state.TOKEN
    }
  }
}