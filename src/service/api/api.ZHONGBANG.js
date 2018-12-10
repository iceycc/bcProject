import http from '../http/http.ZHENGZHOU'
import {HOST_API} from "@/Constant";

/**
 * axios 配置
 */
const Config = {
  config: {
    baseURL: HOST_API,
    // baseURL: 'https://finsuitdev.udomedia.com.cn/finsuit/',
    // baseURL:'http://192.168.100.141:8080/',
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    timeout: 300000,
  },
}

/**
 * 业务api
 */
export default {
  /**
   *
   */
  common: {
    // /openapi/comm/apiQryLoginStatus
    // 查询是否该银行的登陆 开户 等状态
    apiQryLoginStatus(params, success, error) {
      let options = {
        url: '/openapi/comm/apiQryLoginStatus',
        params,
      }
      return http.post(options, Config.config, success, error)
    },
    // 获取短信验证码  ifHave=y
    apiSendPhoneCode(params, success, error) {
      let options = {
        url: '/openapi/comm/apiSendPhoneCode',
        params,
      }
      return http.post(options, Config.config, success, error)
    },
    // 查询产品/机构支持的绑定卡 ifHave=y
    apiGetBankCardList(params, success, error) {
      let options = {
        url: '/openapi/comm/apiGetBankCardList',
        params,
      }
      return http.post(options, Config.config, success, error)
    },
    // 账户属性查询 ifHave=y
    apiUserAccountProperties(params, success, error) {
      let options = {
        url: '/openapi/zbh/biz/apiUserAccountProperties',
        params,
      }
      return http.post(options, Config.config, success, error)
    },
    // 用户注册信息回显
    apiRegisterBackShow(params, success, error) {
      let options = {
        url: '/openapi/comm/apiRegisterBackShow',
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
    // 24.	众邦充值提现处理中列表 /openapi/comm/apiQueryProcessing
    apiQueryProcessing(params, success, error) {
      let options = {
        url: '/openapi/comm/apiQueryProcessing',
        params
      }
      return http.post(options, Config.config, success, error)

    },
  },
  /**
   * 注册相关 open
   */
  open: {
    // 身份证OCR扫描
    IdCardFrontPhoneOcr(params, success, error) {
      let options = {
        url: '/openapi/zbh/biz/IdCardFrontPhoneOcr',
        params,
      }
      return http.post(options, Config.config, success, error)
    },
    /**
     * 注册分三步
     */
    // (实名认证)
    apiRegisterValiUser(params, success, error) {
      let options = {
        url: '/openapi/comm/apiRegisterValiUser',
        params,
      }
      return http.post(options, Config.config, success, error)
    },
    // (绑卡)
    apiRegisterBandCard(params, delMsg, OTHER, success, error) {
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
    /**
     * 用户注册步骤查询（通过身份证号） /openapi/comm/apiGetUserLastCompleteStep
     */
    apiGetUserLastCompleteStep(params, success, error) {
      let options = {
        url: '/openapi/comm/apiGetUserLastCompleteStep',
        params: {
          TYPE: 'API_REGISTER_BACK_SHOW',
          ...params
        }
      }
      return http.post(options, Config.config, success, error)
    },
    // 查询 /openapi/comm/apiGetBankCardList
    apiGetBankCardList(params, success, error) {
      let options = {
        url: '/openapi/comm/apiGetBankCardList',
        params
      }
      return http.post(options, Config.config, success, error)
    },

  },
  /**
   * login 登录相关
   */
  login: {
    apiLoginBank(params, success, error) {
      let options = {
        url: '/openapi/comm/apiLoginBank',
        params,
        login: true
      }
      return http.post(options, Config.config, success, error)
    },
  },
  /**
   *  buying
   */
  buy: {
    // 购买
    apiBuy(params, success, error) {
      let options = {
        url: '/openapi/biz/apiBuy',
        params
      }
      return http.post(options, Config.config, success, error)

    },
    // 查询账户余额  todo 无
    apiQueryAccRest(params, success, error) {
      let options = {
        url: '/openapi/comm/apiQueryAccRest',
        params
      }
      return http.post(options, Config.config, success, error)

    },

  },
  /**
   * 充值相关
   */
  reChange: {
    // 查询用户是否已签约充值协议  todo 无
    apiRechargeProtoQuery(params, success, error) {
      let options = {
        url: '/openapi/biz/apiRechargeProtoQuery',
        params
      }
      return http.post(options, Config.config, success, error)
    },
    // 协议页
    // finsuit/static/finsuit/js/openapi/js/xieyi/cz.html
    // 40.	获取充值协议码 todo 无
    apiRechargeProtoCode(params, success, error) {
      let options = {
        url: '/openapi/biz/apiRechargeProtoCode',
        params
      }
      return http.post(options, Config.config, success, error)
    },
    // 充值
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
    // 提现openapi/biz/apiCash
    apiCash(params, success, error) {
      let options = {
        url: '/openapi/biz/apiCash',
        params
      }
      return http.post(options, Config.config, success, error)
    },
  },
  /**
   * risk 风险评估相关
   */
  risk: {
    //  查看风险测评
    apiRiskGrade(params, success, error) {
      let options = {
        url: '/openapi/comm/apiRiskGrade',
        params
      }
      return http.post(options, Config.config, success, error)

    },
    //  获取风险评估问题和答案
    apiGetRiskEvaPaper(params, success, error) {
      let options = {
        url: '/openapi/comm/apiGetRiskEvaPaper',
        params
      }
      return http.post(options, Config.config, success, error)

    },
    //  风险测评提交 openapi/comm/apiRiskEvalution
    apiRiskEvalution(params, success, error) {
      let options = {
        url: '/openapi/comm/apiRiskEvalution',
        params
      }
      return http.post(options, Config.config, success, error)

    },

  },

  /**
   *  安全相关
   */
  safe: {
    // 重制密码 todo 无
    apiUserResetLoginPass(params, delMsg, success, error) {
      let options = {
        url: '/openapi/comm/apiUserResetLoginPass',
        params,
        delMsg
      }
      return http.post(options, Config.config, success, error)

    },
    // 查询登录用户某机构绑定卡信息 apiBandCard
    apiBandCard(params, success, error) {
      let options = {
        url: '/openapi/comm/apiBandCard',
        params
      }
      return http.post(options, Config.config, success, error)

    },
    // 更换银行卡：openapi/comm/apiChangeBingCard todo 无需求
    apiChangeBingCard(params, delMsg, success, error) {
      let options = {
        url: '/openapi/comm/apiChangeBingCard',
        params,
        delMsg
      }
      return http.post(options, Config.config, success, error)

    },
    // 更换手机号
    // openapi/comm/apiChangePhoneNum todo 无需求
    apiChangePhoneNum(params, delMsg, success, error) {
      let options = {
        url: '/openapi/comm/apiChangePhoneNum',
        params,
        delMsg
      }
      return http.post(options, Config.config, success, error)

    },
    // 更换支付密码：todo 无
    apiUserResetPayPass(params, delMsg, success, error) {
      let options = {
        url: '/openapi/comm/apiUserResetPayPass',
        params,
        delMsg
      }
      return http.post(options, Config.config, success, error)

    },
    // 协议  API_BUY  todo 整理协议接口
    apiAgreement(params, success, error) {
      let options = {
        url: '/openapi/biz/apiAgreement',
        params
      }
      return http.post(options, Config.config, success, error)

    },
  },
  /**
   * list相关
   */
  list: {
    //   查询产品/机构支持的绑卡行/
    apiGetBankCardList(params, success, error) {
      let options = {
        url: '/openapi/comm/apiGetBankCardList',
        params
      }
      return http.post(options, Config.config, success, error)

    },
  },
  /**
   * 账户相关
   */
  account: {
    // 电子列表 todo 提取
    apiBankList(params, success, error) {
      let options = {
        url: 'openapi/bank/apiBankList',
        params,
        TYPE: 'API_BANK_LIST'
      }
      return http.post(options, Config.config, success, error)
    },

    // 银行账户查询：/openapi/comm/apiQueryAccRest  todo 无
    apiQueryAccRest(params, success, error) { // 下面的代替了
      let options = {
        url: 'openapi/comm/apiQueryAccRest',
        params,
      }
      return http.post(options, Config.config, success, error)
    },
    // 我的投资情况(汇总)  ok  todo 无
    getMyInvest(params, success, error) {
      let options = {
        url: 'openapi/invest/getMyInvest',
        params,
      }
      return http.post(options, Config.config, success, error)
    },
    // 账户明细 openapi/bank/apiQryRechCashHis
    // /openapi/invest/apiQryRechCashHis
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
    // /openapi/comm/apiBandCard
    // 获取用户绑定的银行卡信息
    apiBandCard(params, success, error) {
      let options = {
        url: '/openapi/comm/apiBandCard',
        params
      }
      return http.post(options, Config.config, success, error)
    },
    // 38.	查询用户博时基金收益明细
    //
    apiQryIncomHis(params, success, error) {
      let options = {
        url: '/openapi/bank/apiQryIncomHis',
        params
      }
      return http.post(options, Config.config, success, error)
    },
    //  42.	获取我的投资持有中数据/openapi/zbh/biz/apiQryHoldInfo
    apiQryHoldInfo(params, success, error) {
      let options = {
        url: '/openapi/zbh/biz/apiQryHoldInfo',
        params
      }
      return http.post(options, Config.config, success, error)
    },
    // 33.	获取单个银行资产数据(汇总) 未到期
    // /openapi/zzh/biz/apiQryAsset
    // /openapi/zbh/biz/apiQryAsset
    apiQryAsset(params, success, error) {
      let options = {
        url: '/openapi/zbh/biz/apiQryAsset',
        params
      }
      return http.post(options, Config.config, success, error)
    },
    // /openapi/bank/apiQryEleAccount
    // 33.	获取单个银行资产数据(汇总) 未到期
    // /openapi/zbh/biz/apiQryAsset
    apiQryEleAccount(params, success, error) {
      let options = {
        url: '/openapi/bank/apiQryEleAccount',
        params
      }
      return http.post(options, Config.config, success, error)
    },
    // 14.	赎回众邦宝利息试算接口openapi/zbh/biz/apiInterestCalculation
    apiInterestCalculation(params, success, error) {
      let options = {
        url: '/openapi/zbh/biz/apiInterestCalculation',
        params
      }
      return http.post(options, Config.config, success, error)

    },
    //  33 todo未到期
    // 理财产品已到期（分页）  /openapi/zbh/biz/getMyInvestOver无
    getMyInvestOver(params, success, error) {
      let options = {
        url: '/openapi/zbh/biz/getMyInvestOver',
        params
      }
      return http.post(options, Config.config, success, error)

    },
    //36.	查询用户近期交易信息
    apiQryBuyHis(params, success, error) {
      let options = {
        url: 'openapi/bank/apiQryBuyHis',
        params
      }
      return http.post(options, Config.config, success, error)
    },
    //37.	电子账户交易明细查询
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
  financial: {

    // 交易明细 todo 无
    apiQryTradeHis(params, success, error) {
      let options = {
        url: '/openapi/bank/apiQryTradeHis',
        params
      }
      return http.post(options, Config.config, success, error)
    },
  },

  /**
   * 赎回
   */
  redeem: {
    // 赎回 openapi/biz/apiRedemption
    apiRedemption(params, success, error) {
      let options = {
        url: '/openapi/biz/apiRedemption',
        params
      }
      return http.post(options, Config.config, success, error)
    },
  },

  // doc
  doc: {
    // 24.	支取协议：定期存款收益权转让协议 /openapi/zbh/biz/fixedTimeDepositAgreement
    fixedTimeDepositAgreement(params, success, error) {
      let options = {
        url: '/openapi/zbh/biz/fixedTimeDepositAgreement',
        params
      }
      return http.post(options, Config.config, success, error)
    },
    // /openapi/zbh/biz/personalAccountServiceAgreement
    // 购买协议： 众邦宝产品服务协议（个人活期版）
    personalAccountServiceAgreement(params, success, error) {
      let options = {
        url: '/openapi/zbh/biz/personalAccountServiceAgreement',
        params
      }
      return http.post(options, Config.config, success, error)
    },
    // 23.	 开户协议：众邦银行直销银行电子账户服务协议
    // /openapi/zbh/biz/electronicAccountAgreement
    electronicAccountAgreement(params, success, error) {
      let options = {
        url: '/openapi/zbh/biz/electronicAccountAgreement',
        params
      }
      return http.post(options, Config.config, success, error)
    },
  }
}


