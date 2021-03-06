import http from '../http/http.common'
import httpZZH from '../http/http.ZHENGZHOU'
import {HOST_API} from "@/Constant";
import axios from 'axios'
import store from "@/store";

let Ajax = axios.create({
  baseURL: HOST_API,
})
/**
 * axios 配置
 */
const Config = {
  config: {
    method: 'post',
    baseURL: HOST_API,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    timeout: 30000,
  },
}

/**
 * 业务api
 */
export default {
  // 公共的获取图形验证码
  getImgCode(data, success, error) {
    return Ajax.request({
      method: 'post',
      data,
      url: '/finsuitSafeCode/outer'
    }).then(res => {
      store.commit('SET_SESSION_ID', res.data.SESSION_ID)
      success && success(res.data.IMG)
    }, err => {
      error && error(err)
    })
  },

  /**
   * 公共的获取单个银行的收益
   */
  getBankBalance: {
    ZZH(params, success, error) {
      let options = {
        url: '/openapi/zzh/biz/apiQryAsset',
        params: {
          ...params,
          channel_id: '1'
        },
        NO_ORG_ID: true
      }
      return httpZZH.post(options, Config.config, success, error)

    },
    ZBH(params, success, error) {
      let options = {
        url: '/openapi/zbh/biz/apiQryAsset',
        params,
        NO_ORG_ID: true
      }
      return httpZZH.post(options, Config.config, success, error)
    },
    KSH(params, success, error) {
      let options = {
        url: '/openapi/bank/apiMyAssetByOrg',
        params,
        NO_ORG_ID: true
      }
      return httpZZH.post(options, Config.config, success, error)
    },


  },

  /**
   * Product 产品列表相关
   */
  // 列表
  apiGetChannelPrdList(params, success, error) {
    let options = {
      url: '/openapi/comm/apiGetChannelPrdList',
      params,
      NO_ORG_ID: true
    }
    return http.post(options, Config.config, success, error)

  },
  // 产品详情
  apiGetChannelPrdInfo(params, success, error) {
    let options = {
      url: '/openapi/comm/apiGetChannelPrdInfo',
      params,
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
      NO_ORG_ID: true
    }
    return http.post(options, Config.config, success, error)
  },
}


