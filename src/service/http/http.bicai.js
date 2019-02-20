// 有些地方需要调用比财接口呢
import axios from 'axios'
import store from '@/store/index'
import {HOST_API} from "@/Constant";
import Bus from '@/plugin/bus/index'
import {BusName, PageName, LsName} from "@/Constant";
import {Indicator} from 'mint-ui';
import {throwErr} from "@/libs/throwErr";

const config = {
  method: 'post',
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
    if (error && error.response) {
      let msg = throwErr(error.response.status, error.response) //throwErr 捕捉服务端的http状态码 定义在utils工具类的方法
      return Promise.reject(error.response.status + msg)
    }
    if (error.toString().indexOf("timeout") !== -1) {
      return Promise.reject('网络请求超时')
    } else if (error.toString().indexOf("Network Error") !== -1) {
      return Promise.reject('网络错误')
    } else {
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
  async post({
        method,
        url,
        params,
        type,
        token,
        channel_id
      }, success, error) {
    let {
      APP_FLAG,
      DEVICE_ID,
      CHANNEL_ID,
      TOKEN = token,
      SESSION_ID = '',
      OPEN_API_CHANNEL_ID = '1'
    } = store.getters.GET_ACCOUNT_STATE

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
        APP_FLAG: APP_FLAG,
        USER_CHANNEL: OPEN_API_CHANNEL_ID + '', // 新增 USER_CHANNEL
      },
      param: {
        ...params
      },
    }
    data = 'param_key=' + JSON.stringify(data)
    try {
      let res = await instance.request({data, url, method:'post'})
      console.log('bicai - res>>>', res);
      if (res.head.CODE == 0) {

        success && success(res.data)
        return Promise.resolve(res.data)
      } else if (res.head.CODE == '-2') {
        store.commit('SET_TOKEN', '')
        return Promise.reject(res.head.MSG)
      } else if (res.head.CODE == '-3') {
        // 其他设备登录
        store.commit('SET_TOKEN', '')
        return Promise.reject(res.head.MSG)
      } else {
        return Promise.reject(res.head.MSG)
      }
    }catch (e) {
      Bus.$emit(BusName.showToast, e)
      error && error()
      console.log('err>>', e)
      return Promise.reject(e)
    }
  }
}



