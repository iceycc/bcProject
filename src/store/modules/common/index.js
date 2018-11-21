export default {
  state: {
    reload: false, // 用于强制刷新 密码控件暂时只能强制刷新重载 否则不行
    HAS_GRADE: '', // 是否评估 1 否  2 是
    LoginTarget: '', // 其他页面跳转登录页进行跳转的页面  主要跳转后情况
    ProDuctData: '', // 其他页面跳转登录页进行跳转的页面  主要跳转后情况
    LAST_STEP_NUM: '', // 开户步数
    REQ_SERIAL: '', // 开户流水
    loginType: '', //  用于测评完成后跳转功能（购买，预约，电子账户，更多服务）
    goBuy: { // 去购买需要的参数
      PRD_NAME: ' 民生xx产品',
      TXT_MIN_AMOUNT:'200', // 起购金额
      REMAIN_AMT: '10000', // 可投金额
      INCRE_AMOUNT: '10', // 最小递增
      ORG_NAME: '民生银行', // 银行名称
      id: '100', // 产品id
      logo: '', // 直销银行logo
    },
    Infos: '', // 存储个人信息

    RechargeQuery:{} , // 充值页需要的参数
    PRD_TYPE: '', // 产品类型
    OriginPage: '', // 用于存储来源页。比如进入充值页会有多个入口，充值成功后要返回该入口
    ErrMsg: '', // 用于保存返回的错误信息 刷新时可以展示
    loginInfo: '',// 登录刷新需要的信息
    buyNextData: '',
    buyData: { // 购买成功后跳转页面需要展示的参数
      PRD_NAME:'民生xx基金',
      ORG_NAME:'郑州银行',
      money:'1000',
      OPERA_DATE:'2011-10-1',
      EXPECT_PROFIT_DATE:'2020-10-1',
      BESHARP_BUY_SEQ:'2111211111211111'
    }, //
    availableBalance:'' ,// 可用余额
    redeemData:{},
    openingData:{},


  },
  //
  actions: {},
  //
  mutations: {
    SET_COMMON_STATE(state, {type, value}) {
      state[type] = value
    },
    REMOVE_COMMON_STATE(state, type) {
      state[type] = null
    },
  },
  getters: {
    GET_COMMON_STATE: (state) => {
      return state
    },
  }
}
