// 存储当前登录银行的凭证信息
export default {
  state: {
    // 当前登录银行的TOKEN
    TOKEN: '',
    // 设备id
    DEVICE_ID: '',
    // 渠道id
    CHANNEL_ID: '',
    // TODO 保存登录过银行的凭证信息
    BANKS_TOKEN: [],
    //
    SESSION_ID:''
  },
  actions: {},
  mutations: {
    SET_TOKEN(state, TOKEN) {
      state.TOKEN = TOKEN
    },
    SET_DEVICE_ID(state, DEVICE_ID = '3000000') {
      state.DEVICE_ID = DEVICE_ID + ''
    },
    SET_CHANNEL_ID(state, CHANNEL_ID = 3) {
      state.CHANNEL_ID = CHANNEL_ID + ''
    },
    SET_SESSION_ID(state, SESSION_ID = '') {
      state.SESSION_ID = SESSION_ID + ''
    },
  },
  getters: {
    // 箭头函数
    GET_ACCOUNT_STATE: (state) => {
      return state
    }
  }
}
