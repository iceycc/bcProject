// 存储当前登录银行的凭证信息 以及个人信息
export default {
  state: {
    // 当前登录银行的TOKEN
    TOKEN: '',
    // 设备id
    DEVICE_ID: '3213111',
    // 渠道id
    CHANNEL_ID: '91',
    //
    APP_FLAG: 'BC',
    // TODO 保存登录过银行的凭证信息
    BANKS_TOKEN: [],
    //
    SESSION_ID: '',
    //
    BICAI_USER: {},
    //
    // IS_REALTIME_DATA_PRD
    // 1是，走无密码登录带红色提示（亿联）
    // 0否，走无密码的登录页（郑州，众邦)
    IS_REALTIME_DATA_PRD: '0'

  },
  actions: {},
  mutations: {
    // a
    SET_ACCOUNT_STATE(state, {type, value}) {
      state[type] = value
    },
    SET_TOKEN(state, TOKEN) {
      state.TOKEN = TOKEN
    },
    SET_DEVICE_ID(state, DEVICE_ID) {
      state.DEVICE_ID = DEVICE_ID + ''
    },
    SET_CHANNEL_ID(state, CHANNEL_ID) {
      state.CHANNEL_ID = CHANNEL_ID + ''
    },
    SET_SESSION_ID(state, SESSION_ID = '') {
      state.SESSION_ID = SESSION_ID + ''
    },
    SET_BICAI_USER(state, BICAI_USER) {
      state.BICAI_USER = BICAI_USER
    },
    SET_APP_FLAG(state, APP_FLAG) {
      state.APP_FLAG = APP_FLAG
    },
  },
  getters: {
    // 箭头函数
    GET_ACCOUNT_STATE: (state) => {
      return state
    }
  }
}
