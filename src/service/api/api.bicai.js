// 有些地方需要调用比财接口呢
import axios from '@/plugin/request/_axios'
import store from '@/store/index'
import {HOST} from "@/Constant";
import Bus from '@/plugin/bus/index'
import {BusName, PageName, LsName} from "@/Constant";
// let HOST = 'https://finsuitdev.udomedia.com.cn/finsuit/'
// let HOST = 'http://192.168.100.173:8080/finsuit/'
const config = {
  method: 'post',
  // baseURL: '/api/finsuit/PHONE/deal',
  baseURL: HOST + '/finsuitPhone/deal',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  timeout: 100000,
}
var instance = axios.create(config)

class Http {
  post({url = '', params, type}, success, error) {
    return this.API({
      method: 'post',
      url,
      params,
      type
    }, success, error).catch((err) => {
      console.log(err)
    })
  }

  API({
        method,
        url,
        params,
        type,
        token
      }, success, error) {
    let {DEVICE_ID, CHANNEL_ID, TOKEN = token, SESSION_ID = ''} = store.getters.GET_ACCOUNT_STATE

    let data = {
      head: {
        TYPE: type,
        TOKEN,
        SESSION_ID: SESSION_ID,
        DEVICE_ID: '111121211112121112331111',
        CHANNEL: CHANNEL_ID,
        SYSTEM_TYPE: 'H5',
        SCREEN_SIZE: ''
      },
      param: {
        ...params
      },
    }
    data = 'param_key=' + JSON.stringify(data)
    return instance.request({
      data,
      url,
      method
    }).then(res => {
      res = res.data
      if (res.head.CODE == 0) {
        let SESSION_ID = res.head.SESSION_ID
        console.log('success>>', res.data);
        store.commit('SET_SESSION_ID', SESSION_ID)
        success && success(res.data, SESSION_ID)
        return Promise.resolve(res.data)
      }
      else if (res.head.CODE == '-3') {
        store.commit('SET_SESSION_ID', null)
        return Promise.reject(res.head.MSG)
      }
      else {
        return Promise.reject(res.head.MSG)
      }
    }, err => {
      store.commit('SET_SESSION_ID', '')
      console.log(err);
      error && error()
    }).catch(err => {
      Bus.$emit(BusName.showToast, err)
      store.commit('SET_SESSION_ID', '')
      console.log('err>>', err)
    })
  }
}

let http = new Http()
export default {
  /**
   * 比财登陆
   * @param params
   * @param success
   * @param error
   * @returns {*}
   */
  login(params, success, error) {
    let options = {
      type: 'LOGIN',
      params,
    }
    return http.post(options, success, error)
  },
  /**
   * 比财登陆需要的验证吗
   * @param params
   * @param success
   * @param error
   * @returns {*}
   */
  sendSMS(params, success, error) {
    let options = {
      type: 'REQ_NO_VALIDATE',
      params,
    }
    return http.post(options, success, error)
  },
  /**
   *  身份证正面上传
   * @param params
   * @param success
   * @param error
   * @returns {*}
   */
  postFrontIDCard(params, success, error) {
    let options = {
      type: 'POST_IDENTITY_CARD_FACE',
      params,
    }
    return http.post(options, success, error)
  },
  /**
   * 身份证反面上传
   * @param params
   * @param success
   * @param error
   * @returns {*}
   */
  postBackIDCard(params, success, error) {
    let options = {
      type: 'POST_IDENTITY_CARD_GH',
      params,
    }
    return http.post(options, success, error)
  },
  /**
   * 身份证验证接口
   * @param params
   * @param success
   * @param error
   * @returns {*}
   */
  checkIDCard(params, success, error) {
    let options = {
      type: 'POST_IDENTITY_CARD_VALIDATE',
      params,
    }
    return http.post(options, success, error)
  },
  // 用户认证状态和回显数据
  getUserMemberInfo(params, success, error) {
    let options = {
      type: 'GET_MEMBER_AUTH_STATUS_INFO',
      params,
    }
    return http.post(options, success, error)
  },
  // 发送短信验证码 绑定银行卡
  sendSMSCodeToBindCard(params, success, error) {
    let options = {
      type: 'GET_BIND_CARD_SEND_SMS_CODE',
      params,
    }
    return http.post(options, success, error)
  },
  // MY_BINDING_CARDS_LIST 获取银行卡列表
  getBingingCardsList(params, success, error) {
    let options = {
      type: 'MY_BINDING_CARDS_LIST',
      params,
    }
    return http.post(options, success, error)
  },
  // 根据银行卡号获取银行名
  getCardBinList(params, success, error) {
    let options = {
      type: 'CARD_BIN_LIST',
      params,
    }
    return http.post(options, success, error)
  },
  // BIND_CARD_FOUR_ELEMENT 绑定银行卡
  bindCardFourELement(params, success, error) {
    let options = {
      type: 'BIND_CARD_FOUR_ELEMENT',
      params,
    }
    return http.post(options, success, error)
  },
  // GET_AUTH_STATUS 登录后判断是否实名
  getAuthStatus(params, success, error) {
    let options = {
      type: 'GET_AUTH_STATUS',
      params,
    }
    return http.post(options, success, error)
  },
  // GET_MEMBER_AUTH_STATUS_INFO 获取用户认证状态和回显数据
  getMerberAuthStatusInfo(params, success, error) {
    let options = {
      type: 'GET_MEMBER_AUTH_STATUS_INFO',
      params,
    }
    return http.post(options, success, error)
  },
  // 获取产品(货基，理财)详细信息
  getPrdInfo(params, success, error) {
    let options = {
      type: 'GET_PRD_INFO',
      params,
    }
    return http.post(options, success, error)
  },
  // GET_BANK_II_LIST
  // 获取产品(货基，理财)详细信息
  getBankList(params, success, error) {
    let options = {
      type: 'GET_BANK_II_LIST',
      params,
    }
    return http.post(options, success, error)
  },
}





