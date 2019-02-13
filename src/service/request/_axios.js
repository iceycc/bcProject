import axios from 'axios'
var axiosOld = axios.create(null);
import {Indicator} from 'mint-ui';
import {throwErr} from "@/libs/throwErr";
// http request 拦截器  第一层拦截
axiosOld.interceptors.request.use(
  config => {
    Indicator.open({
      spinnerType: 'triple-bounce'
    });
    config.timeout = 30 * 1000 //请求响应时间
    return config;
  },
  error => {
    setTimeout(() => {
      Indicator.close();
    }, 1000)
    return Promise.reject(error);
  }
);

// http response 拦截器
axiosOld.interceptors.response.use(
  response => {
    let data = response.data
    if (typeof data == 'string') {
      data = JSON.parse(data)
    }

    Indicator.close();
    return Promise.resolve(data);
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
export default axiosOld;
