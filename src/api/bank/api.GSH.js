import http from '@/service/http/http.bank.new'
import {HOST_API} from "@/Constant";

/**
 * axios 配置
 */
const Config = {
  config: {
    baseURL: HOST_API,
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    timeout: 300000,
  },
}

/**
 * 业务api
 */
export default {
  test(params, success, error) {
    let options = {
      url: '/openapi/account/apiRegisterBackShow',
      params,
    }
    return http.post(options, Config.config, success, error)
  },
  /**
   *
   */
  common: {
    // 查询是否该银行的登陆 开户 等状态
    apiQryLoginStatus(params, success, error) {
      let options = {
        url: '/openapi/comm/apiQryLoginStatus',
        params,
      }
      return http.post(options, Config.config, success, error)
    },
    // async 2.1.	用户开户相关接口（获取短信验证码接口）
    apiSendPhoneCode(params, success, error) {
      let options = {
        url: '/openapi/account/apiSendPhoneCode',
        params,
      }
      return http.post(options, Config.config, success, error)
    },
    // async 查询
    apiGetBankCardList(params, success, error) {
      let options = {
        url: '/openapi/comm/apiGetBankCardList',
        params
      }
      return http.post(options, Config.config, success, error)
    },

    // 用户注册信息回显
    apiRegisterBackShow(params, success, error) {
      let options = {
        url: '/openapi/account/apiRegisterBackShow',
        params,
      }
      return http.post(options, Config.config, success, error)
    },
    // 轮询查询状态
    apiQueryBizStatus(params, success, error) {
      let options = {
        url: '/openapi/comm/apiQueryBizStatus',
        params
      }
      return http.post(options, Config.config, success, error)

    },
    // 查询银行卡限额列表 组件有用到
    apiGetBankCardLimit(params, success, error) {
      let options = {
        url: '/openapi/comm/apiGetBankCardLimit',
        params,
      }
      return http.post(options, Config.config, success, error)
    },
  },
  /**
   * 注册相关 open
   */
  open: {
    /**
     * 注册分三步
     */
    // (实名认证) async
    apiRegisterValiUser(params, success, error) {
      let options = {
        url: '/openapi/comm/apiRegisterValiUser',
        params,
      }
      return http.post(options, Config.config, success, error)
    },
    // (绑卡) async
    apiRegisterBandCard(params, delMsg, success, error) {
      let options = {
        url: '/openapi/comm/apiRegisterBandCard',
        params,
        delMsg
      }
      return http.post(options, Config.config, success, error)
    },
    // （设置密码）
    apiRegisterSetPsw(params, success, error) {
      let options = {
        url: '/openapi/comm/apiRegisterSetPsw',
        params,
      }
      return http.post(options, Config.config, success, error)
    },

  },
  /**
   *  buying
   */
  buy: {
    // 购买 async
    apiBuy(params, success, error) {
      let options = {
        url: '/openapi/biz/apiBuy',
        params
      }
      return http.post(options, Config.config, success, error)
    },
  },
  /**
   * 充值相关
   */
  reChange: {
    // 充值 async
    apiRecharge(params, success, error) {
      let options = {
        url: '/openapi/biz/apiRecharge',
        params
      }
      return http.post(options, Config.config, success, error)
    },

  },
  /**
   * 提现相关
   */
  withdraw: {
    // 提现 async
    apiCash(params, success, error) {
      let options = {
        url: '/openapi/biz/apiCash',
        params
      }
      return http.post(options, Config.config, success, error)
    },
  },
  /**
   *  安全相关
   */
  safe: {
    // async  查询登录用户某机构绑定卡信息
    apiBandCard(params, success, error) {
      let options = {
        url: '/openapi/comm/apiBandCard',
        params
      }
      return http.post(options, Config.config, success, error)
    },
    // async 设置默认卡
    apiDefaultBankCard(params, success, error) {
      let options = {
        url: '/openapi/comm/apiDefaultBankCard',
        params,
      }
      return http.post(options, Config.config, success, error)

    },
    // async 用户解绑卡
    apiChangeBingCard(params, success, error) {
      let options = {
        url: '/openapi/comm/apiChangeBingCard',
        params,
      }
      return http.post(options, Config.config, success, error)
    },
  },

  /**
   * 账户相关
   */
  account: {
    // async 账户明细
    apiQryRechCashHis(params, success, error) {
      let options = {
        url: 'openapi/bank/apiQryRechCashHis',
        params,
      }
      return http.post(options, Config.config, success, error)
    },

  },
  /**
   * 银行产品相关的
   */
  bank: {

    //  async 获取我的投资持有中数据
    apiQryHoldInfo(params, success, error) {
      let options = {
        url: '/openapi/bank/apiQryHoldInfo',
        params
      }
      return http.post(options, Config.config, success, error)
    },
    // async 获取单个银行资产数据(汇总) 未到期
    apiQryAsset(params, success, error) {
      let options = {
        url: '/openapi/bank/apiMyAssetByOrg',
        params
      }
      return http.post(options, Config.config, success, error)
    },
    // async	获取单个银行资产数据(汇总) 未到期
    apiQryEleAccount(params, success, error) {
      let options = {
        url: '/openapi/bank/apiQryEleAccount',
        params
      }
      return http.post(options, Config.config, success, error)
    },
    // async 理财产品已到期（分页）
    getMyInvestOver(params, success, error) {
      let options = {
        url: '/openapi/bank/getMyInvestOver',
        params
      }
      return http.post(options, Config.config, success, error)

    },
    // async	查询用户近期交易信息
    apiQryBuyHis(params, success, error) {
      let options = {
        url: 'openapi/bank/apiQryBuyHis',
        params
      }
      return http.post(options, Config.config, success, error)
    },
    // async 电子账户交易明细查询
    apiQryEleTransDetail(params, success, error) {
      let options = {
        url: 'openapi/bank/apiQryEleTransDetail',
        params
      }
      return http.post(options, Config.config, success, error)
    },
  },

  /**
   * 产品
   */
  financial: {},

  /**
   * 赎回
   */
  redeem: {
    //  async 支取校验 v2
    apiRedemptionValid2(params, success, error) {
      let options = {
        url: '/openapi/ksh/biz/v2/apiRedemptionValid',
        params
      }
      return http.post(options, Config.config, success, error)
    },
    // async 支取
    apiRedemption(params, success, error) {
      let options = {
        url: '/openapi/biz/apiRedemption',
        params
      }
      return http.post(options, Config.config, success, error)
    },
  },
  doc: {

    // async 购买协议： 客商宝产品服务协议（个人活期版）
    personalAccountServiceAgreement(params, success, error) {
      let options = {
        url: '/openapi/comm/personalAccountServiceAgreement',
        params
      }
      return http.post(options, Config.config, success, error)
    },
    // async 开户协议：银行直销银行电子账户服务协议
    electronicAccountAgreement(params, success, error) {
      let options = {
        url: '/openapi/comm/openAnAccountAgreement',
        params
      }
      return http.post(options, Config.config, success, error)
    },

    // async充值代扣协议
    rechargeAgreement(params, success, error) {
      let options = {
        url: '/openapi/comm/rechargeAgreement',
        params
      }
      return http.post(options, Config.config, success, error)
    },
  }
}


