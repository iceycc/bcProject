// 静态值定义： 【应用配置】
import {version} from '../package'

/**
 *
 */
let Configs = {
  /**
   * dev
   */
  // DEV_HOST: 'https://finsuitdev.bicai365.com', // dev开发环境
  // DEV_HOST: 'http://192.168.100.109:8080', // 个人
  DEV_HOST: 'https://adv.bicai365.com', // adv测试
  // DEV_HOST:'https://graytest.bicai365.com' ,// 灰度测试
  /**
   * build
   */
  // PRO_HOST: 'https://adv.bicai365.com',// adv
  // PRO_HOST:'https://finsuit.bicai365.com' ,// 生产/**/
  PRO_HOST:'https://graytest.bicai365.com' ,// 灰度生产
}
export const HOST = process.env.NODE_ENV == 'development'
  ? Configs.DEV_HOST : Configs.PRO_HOST

export const HOST_API = HOST + '/finsuit' // // api 接口地址
/**
 *
 */
export const AppUrl = { // app下载地址
  Android: '',
  Ios: ''
}

/**
 * 项目前缀
 */
export const PROJECT_PREFIX = 'YIDU' + version
export const STORE_PREFIX = '_MX_'

/**
 * logo图片地址
 */
let imgSrcHost = {
  dev: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/",
  pro: "https://finsuit.oss-cn-beijing.aliyuncs.com/",
  // pro: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/",
}

export const imgSrc = process.env.NODE_ENV == 'development' ? imgSrcHost.dev : imgSrcHost.pro


/**
 * page名称
 */
export const PageName = {

  /**
   * test
   */
  TestPage: 'TestPage',
  /**
   * 登陆
   */
  LoginByBicai: 'LoginByBicai',
  /**
   * main
   */
  // 一期
  Login: 'Login',
  ProductList: 'ProductList',
  RechargeSuccess: 'RechargeSuccess',
  RechargeFailure: 'RechargeFailure',
  ResetPassword: 'ResetPassword',
  Riskproblom: 'Riskproblom',
  SureBuy: 'SureBuy',
  VerificationSuccess: 'VerificationSuccess',
  Recharge: 'Recharge',
  Opening3: 'Opening3',
  Opening2: 'Opening2',
  Opening1: 'Opening1',
  InvestmentDetails: 'InvestmentDetails',
  IncomeProgress: 'IncomeProgress',
  FengxianResult: 'FengxianResult',
  BuySuccess: 'BuySuccess',
  Buying: 'Buying',
  ProductReservation: 'ProductReservation',
  BuyFailed: 'BuyFailed',
  OrderNextSuccess: 'OrderNextSuccess',
  DocsPage: 'DocsPage',
  UserLicenseAgreement: 'UserLicenseAgreement',
  // 理财列表
  FinancialProducts: 'FinancialProducts',
  // 交易明细
  TransactionDetails: 'TransactionDetails',
  //wby二期新增
  BankDetail: 'BankDetail', // 银行详情
  BankBalance: 'BankBalance', // 可用余额
  ChangeBank: 'ChangeBank', // 更改银行
  ResetPayPassword: 'ResetPayPassword', // 重制密码
  ResetPayPasswordApply: 'ResetPayPasswordApply', // 重制密码申请
  ResetPayPasswordStatus: 'ResetPayPasswordStatus', // 重制密码申请结果
  ResetPhone: 'ResetPhone', // 重制手机号
  MoreService: 'MoreService', // 更多服务
  BankAccount: 'BankAccount', // 安全登陆 ->电子账户
  Withdraw: 'Withdraw', // 提现
  WithdrawSuccess: 'WithdrawSuccess', // 提现成功
  WithdrawFaild: 'WithdrawFaild', // 提现失败
  WaitForWithdraw: 'WaitForWithdraw', // 提现zhong
  PayDetail: 'PayDetail', // 提现失败
  /**
   * 比财新加
   */
  BcOpening3: 'BcOpening3',
  BcOpening2: 'BcOpening2',
  BcOpening1: 'BcOpening1',
  BicaiPageDocs: 'BicaiPageDocs',
  /**
   * 郑州新增
   */
  // 赎回相关
  Redeem: 'Redeem',
  RedeemFailure: 'RedeemFailure',
  RedeemSuccess: 'RedeemSuccess',
  DealDetails: 'DealDetails',
  ChangePayPassword: 'ChangePayPassword',

  /**
   * 银行新增
   */
  BindingBank: 'BindingBank',
  InHanding: 'InHanding',
  RechargeWait: 'RechargeWait',
  /**
   * 郑州银行 密码控件
   * 原生交互
   */
  PasswordOneForZhengZhou: 'PayPassWord',
  PasswordThreeForZhengZhou: 'PasswordThreeForZhengZhou',
  PasswordTowForZhengZhou: 'PasswordTowForZhengZhou',
}
/**
 * 传值的bus名称
 */
export const BusName = {
  showToast: 'showToast',
  showLoading: 'showLoading',
  Indicator: 'Indicator',
  showSendMsg: 'showSendMsg',
}

/**
 * storage的名字
 */
export const LsName = {
  token: 'token',
  DEVICE_ID: 'DEVICE_ID',
  CHANNEL_ID: 'CHANNEL_ID',
  reload: 'reload', // 用于强制刷新 密码控件暂时只能强制刷新重载 否则不行
  HAS_GRADE: 'HAS_GRADE', // 是否评估 1 否  2 是
  LoginTarget: 'LoginTarget', // 其他页面跳转登录页进行跳转的页面  主要跳转后情况
  ProDuctData: 'ProDuctData', // 其他页面跳转登录页进行跳转的页面  主要跳转后情况
  LAST_STEP_NUM: 'LAST_STEP_NUM', // 开户步数
  REQ_SERIAL: 'REQ_SERIAL', // 开户流水
  loginType: 'loginType', //  用于测评完成后跳转功能（购买，预约，电子账户，更多服务）
  goBuy: 'goBuy', // goBuy
  ORG_ID: 'ORG_ID', // 机构id
  Infos: 'Infos', // 存储个人信息
  // RechargeQuery: 'RechargeQuery', // 充值页需要的参数
  PRD_TYPE: 'PRD_TYPE', // 产品类型
  // OriginPage: 'OriginPage', // 用于存储来源页。比如进入充值页会有多个入口，充值成功后要返回该入口
}

/**
 * ORG_ID 对应不同的机构
 */

export const ORG_ID_NUM = {
  JinShang: '70',
  ZhengZhou: '49',
  ZhongBang: '227'
}
/**
 *  外部参数默认设置
 */
export const PRO_PARAMS = {
  DEVICE_ID: '001002003',
  CHANNEL_ID: '91',
  APP_FLAG: 'BC'
}


export const CheckBank = function (val) {
  let arr = []
  Object.keys(ORG_ID_NUM).forEach(function (key) {
    arr.push(ORG_ID_NUM[key])
  });
  return arr.indexOf(val) != '-1';
}
