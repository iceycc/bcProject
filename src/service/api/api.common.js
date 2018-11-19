import http from '../http/http.common'
import {HOST} from "@/Constant";

/**
 * axios 配置
 */
const Config = {
  config: {
    method: 'post',
    baseURL: HOST,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    timeout: 30000,
  },
}

/**
 * 业务api
 */
export default {

  /**
   * Product 产品列表相关
   */
  // 列表
  apiGetChannelPrdList(params, success, error) {
    let options = {
      url: '/openapi/comm/apiGetChannelPrdList',
      params,
      NO_ORG_ID:true
    }
    return http.post(options, Config.config, success, error)

  },
  // 产品详情
  apiGetChannelPrdInfo(params, success, error) {
    let options = {
      url: '/openapi/comm/apiGetChannelPrdInfo',
      params
    }
    return http.post(options, Config.config, success, error)
  },
  // 预约/
  apiSaveSubscribeInfo(params, success, error) {
    let options = {
      url: '/openapi/comm/apiSaveSubscribeInfo',
      params,
    }
    return http.post(options, Config.config, success, error)

  },
  /**
   * 账户相关
   */
  // 电子列表
  apiBankList(params, success, error) {
    let options = {
      url: 'openapi/bank/apiBankList',
      params,
      TYPE: 'API_BANK_LIST',
      NO_ORG_ID:true
    }
    return http.post(options, Config.config, success, error)
  },
}


