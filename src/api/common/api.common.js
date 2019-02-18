import httpZZH from '@/service/http/http.bank'
import httpNew from '@/service/http/http.bank.new'
import {HOST_API} from "@/Constant";
import axios from 'axios'
import store from "@/store";

// 单独用于图形验证码 无参数 格式api的格式请求的
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
  configNew: {
    method: 'post',
    baseURL: 'http://47.94.110.156:9000', // todo
    headers: {'Content-Type': 'application/json'},
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
   * 公共的获取单个银行的收益  电子账户需要单独请求单独的银行api获取相应的资产
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
    GSH(params, success, error) {
      let options = {
        url: '/openapi/bank/apiQryAsset',
        params,
        NO_ORG_ID: true
      }
      return httpNew.post(options, Config.configNew, success, error)
    },


  },
}


