export default {
  // 用于管理当前访问银行信息
  state: {
    ORG_ID: '70',
    ORG_NAME: '晋享财富',
    LOGO_URL: "ORG/6041f447-bc2a-4177-a5a0-1d807edc9cfd.png",
    DESCRIPT: '隶属于晋商银行',
    BANK_NAME: '晋商银行'
  },
  // dispatch -> actions
  actions: {
    // 存储当前访问的银行信息 用于处理业务
    SET_BANK_INFO({state, commit}, {ORG_ID, ORG_NAME, LOGO_URL, DESCRIPT}) {
      commit('SET_ORG_ID', ORG_ID)
      commit('SET_ORG_NAME', ORG_NAME)
      commit('SET_BANK_LOGO', LOGO_URL)
      commit('SET_DESCRIPT', DESCRIPT)
      commit('SET_BANK_NAME', DESCRIPT.substring(3))
    },
  },
  // commit-> mutations  直接操作state，与业务无关
  mutations: {
    SET_ORG_ID(state, ORG_ID) {
      state.ORG_ID = ORG_ID
    },
    SET_ORG_NAME(state, ORG_NAME) {
      state.ORG_NAME = ORG_NAME
    },
    SET_BANK_LOGO(state, LOGO_URL) {
      state.LOGO_URL = LOGO_URL
    },
    SET_DESCRIPT(state, DESCRIPT) {
      state.DESCRIPT = DESCRIPT
    },
    SET_BANK_NAME(state, BANK_NAME) {
      state.BANK_NAME = BANK_NAME
    }
  },
  getters: {
    GET_BANK_INFO: (state) => {
      return state
    },
    GET_ORG_ID: (state) => {
      return state.ORG_ID
    },
  }

}
