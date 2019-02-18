// 存储当前登录银行的凭证信息 以及个人信息
import {PRO_PARAMS} from '@/Constant'
import {BusName} from "../../../Constant";
import Bus from '@/plugin/bus/index'

export default {
  state: {
    // 当前登录银行的TOKEN
    TOKEN: '',
    // 设备id
    DEVICE_ID: PRO_PARAMS.DEVICE_ID,
    // 渠道id
    CHANNEL_ID: PRO_PARAMS.CHANNEL_ID,
    //
    APP_FLAG: PRO_PARAMS.APP_FLAG,
    // TODO 保存登录过银行的凭证信息
    BANKS_TOKEN: [],
    //
    OPEN_API_CHANNEL_ID: '',
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
      if (!DEVICE_ID) {
        return
      }
      state.DEVICE_ID = DEVICE_ID + ''
    },
    SET_CHANNEL_ID(state, CHANNEL_ID) {
      if (!CHANNEL_ID) {
        return
      }
      state.CHANNEL_ID = CHANNEL_ID + ''
    },
    SET_OPEN_API_CHANNEL_ID(state, OPEN_API_CHANNEL_ID) {
      if (!OPEN_API_CHANNEL_ID) {
        return
      }
      state.OPEN_API_CHANNEL_ID = OPEN_API_CHANNEL_ID + ''
    },
    SET_SESSION_ID(state, SESSION_ID = '') {

      state.SESSION_ID = SESSION_ID + ''
    },
    SET_BICAI_USER(state, BICAI_USER) {
      state.BICAI_USER = BICAI_USER
    },
    SET_APP_FLAG(state, APP_FLAG) {
      if (!APP_FLAG) {
        return
      }
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
