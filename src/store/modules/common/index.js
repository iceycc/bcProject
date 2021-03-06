export default {
  state: {
    idName: '',//  用户名
    rechargeData: {},//  重置协议需要的参数
    hasCardList: [], //绑定的银行卡列表
    reload: false, // 用于强制刷新 密码控件暂时只能强制刷新重载 否则不行
    HAS_GRADE: '0', // 是否评估 1 否  2 是
    LoginTarget: '', // 其他页面跳转登录页进行跳转的页面  主要跳转后情况
    ProDuctData: '', // 其他页面跳转登录页进行跳转的页面  主要跳转后情况
    LAST_STEP_NUM: '', // 开户步数
    REQ_SERIAL: '', // 开户流水
    loginType: '', //  用于测评完成后跳转功能（购买，预约，电子账户，更多服务）
    goBuy: { // 去购买需要的参数
      PRD_NAME: ' 民生xx产品',
      TXT_MIN_AMOUNT: '200', // 起购金额
      REMAIN_AMT: '10000', // 可投金额
      INCRE_AMOUNT: '10', // 最小递增
      ORG_NAME: '民生银行', // 银行名称
      id: '100', // 产品id
      logo: '', // 直销银行logo
    },
    pollResult: {},// 交易完成后 轮询结构存储 用于成功页信息展示
    Infos: '', // 存储个人信息
    userTel: '',
    RechargeQuery: {}, // 充值页需要的参数
    PRD_TYPE: '', // 产品类型
    OriginPage: '', // 用于存储来源页。比如进入充值页会有多个入口，充值成功后要返回该入口
    ErrMsg: '', // 用于保存返回的错误信息 刷新时可以展示
    loginInfo: '',// 登录刷新需要的信息
    buyNextData: '',
    buyData: { // 购买成功后跳转页面需要展示的参数
      PRD_NAME: '',
      ORG_NAME: '',
      money: '',
      OPERA_DATE: '',
      EXPECT_PROFIT_DATE: '',
      BESHARP_BUY_SEQ: ''
    }, //
    availableBalance: '',// 可用余额
    redeemData: {},
    openingData: {},
    ISLogin: false,// 前端记录是否登录成功 ，包括实名成功

    ProAndOrgType: {
      ID: '',// 产品id
      ORG_NAME: '',//机构名称
      PRD_NAME: '', // 产品名称
      ORG_ID: '', // 机构id
      IS_SYNC_FLAG: '1', // '是否由openAPI同步产品, 0：否, 1：是',
      IS_REALTIME_DATA_PRD: '', // 'H5实时数据对接标识： 0不是  1是',
      IS_RZ_FLAG: '', // '是否实名认证, 0：否, 1：是',
      H5_URL_ANDRIOD: '',// 非打通openApi 跳转链接 安卓
      H5_URL_IOS: '' // 非打通openApi 跳转链接 ios
    },

    FromH5Active: false // h5活动页面来的
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
