// 有些地方需要调用比财接口呢
// import axios from '@/plugin/request/_axios'
import axios from 'axios'
import store from '@/store/index'
import {HOST_API} from "@/Constant";
import Bus from '@/plugin/bus/index'
import {BusName, PageName, LsName} from "@/Constant";
import {Indicator} from 'mint-ui';

// let HOST = 'https://finsuitdev.udomedia.com.cn/finsuit/'
// let HOST = 'http://192.168.100.173:8080/finsuit/'
const config = {
  method: 'post',
  // baseURL: '/api/finsuit/PHONE/deal',
  baseURL: HOST_API + '/finsuitPhone/deal',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  timeout: 100000,
}
// http response 拦截器
let instance = axios.create(config)
instance.interceptors.response.use(
  response => {
    let data = response.data
    if (typeof data == 'string') {
      data = JSON.parse(data)
    }
    // console.log('response>', data);
    Indicator.close();
    // todo http code校验
    return data;
  },
  error => {
    setTimeout(() => {
      Indicator.close();
    }, 1000)
    if (error.toString().indexOf("timeout") != -1) {
      return Promise.reject('网络请求超时')
    }
    else if (error.toString().indexOf("Network Error") != -1) {
      return Promise.reject('网络错误')
    }
    else {
      return Promise.reject(error)
    }

  }
)
// http request 拦截器  第一层拦截
instance.interceptors.request.use(
  config => {
    Indicator.open({
      spinnerType: 'triple-bounce'
    });
    console.log(config.baseURL);
    return config;
  },
  error => {
    setTimeout(() => {
      Indicator.close();
    }, 1000)
    return Promise.reject(error);
  }
);
export default class Http {
  post({url = '', params, type, channel_id}, success, error) {
    return this.API({
      method: 'post',
      url,
      params,
      type,
      channel_id
    }, success, error).catch((err) => {
      console.log(err)
    })
  }

  API({
        method,
        url,
        params,
        type,
        token,
        channel_id
      }, success, error) {
    let {APP_FLAG, DEVICE_ID, CHANNEL_ID, TOKEN = token, SESSION_ID = ''} = store.getters.GET_ACCOUNT_STATE

    let data = {
      head: {
        TYPE: type,
        TOKEN: params.NO_TOKEN ? '' : TOKEN, // 登录不需要token
        SESSION_ID: SESSION_ID,
        DEVICE_ID: DEVICE_ID,
        CHANNEL: CHANNEL_ID,
        SCREEN_SIZE: '',

        SYSTEM_TYPE: "h5",
        CHANNEL_ID: CHANNEL_ID + '',
        // CHANNEL_ID: channel_id || '1',
        APP_FLAG: APP_FLAG
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
      console.log('bicai - res>>>',res);
      if (res.head.CODE == 0) {
        // let SESSION_ID = res.head.SESSION_ID
        // store.commit('SET_SESSION_ID', SESSION_ID)
        success && success(res.data)
        return Promise.resolve(res.data)
      }
      else if(res.head.CODE=='-2'){
        // store.commit('SET_SESSION_ID', '')
        store.commit('SET_TOKEN', '')
        return Promise.reject(res.head.MSG)
      }
      else if (res.head.CODE == '-3') {
        // 其他设备登录
        store.commit('SET_TOKEN', '')
        // store.commit('SET_SESSION_ID', '')
        return Promise.reject(res.head.MSG)
      }
      else {
        // store.commit('SET_SESSION_ID', '')
        return Promise.reject(res.head.MSG)
      }
    }, err => {
      console.log(err);
      return Promise.reject(err)
    }).catch(err => {
      Bus.$emit(BusName.showToast, err)
      error && error()
      console.log('err>>', err)
      return Promise.reject(err)
    })
  }
}
