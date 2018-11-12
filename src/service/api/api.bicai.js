// 有些地方需要调用比财接口呢
import axios from 'axios'
import store from '@/store/index'
import {HOST} from "@/Constant";
// let HOST = 'https://finsuitdev.udomedia.com.cn/finsuit/'
// let HOST = 'http://192.168.100.173:8080/finsuit/'
const config = {
  method: 'post',
  // baseURL: '/api/finsuit/PHONE/deal',
  baseURL: HOST + '/finsuitPhone/deal',

  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  timeout: 30000,
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
        DEVICE_ID: '111121212121112331111',
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
      } else {
        return Promise.reject(res.head.MSG)
      }
    }, err => {
      store.commit('SET_SESSION_ID', '')
      console.log(err);
      error && error()
    }).catch(err => {
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
  sendSMSCode(params, success, error) {
    let options = {
      type: 'GET_BIND_CARD_SEND_SMS_CODE',
      params,
    }
    return http.post(options, success, error)
  },
  // MY_BINDING_CARDS_LIST 获取银行卡列表
  getBingingCardsList(params, success, error){
    let options = {
      type: 'MY_BINDING_CARDS_LIST',
      params,
    }
    return http.post(options, success, error)
  },
  // 根据银行卡号获取银行名
  getCardBinList(params, success, error){
    let options = {
      type: 'MY_BINDING_CARDS_LIST',
      params,
    }
    return http.post(options, success, error)
  },
  // BIND_CARD_FOUR_ELEMENT 绑定银行卡
  bindCardFourELement(params, success, error){
    let options = {
      type: 'MY_BINDING_CARDS_LIST',
      params,
    }
    return http.post(options, success, error)
  }
}





