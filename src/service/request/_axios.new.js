import axios from 'axios'
var axiosNew = axios.create(null);
import {Indicator} from 'mint-ui';
import {throwErr} from "@/libs/throwErr";
// http request 拦截器  第一层拦截
axiosNew.interceptors.request.use(
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
axiosNew.interceptors.response.use(
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
      let res = {}
      res.code = error.response.status
      res.msg = throwErr(error.response.status, error.response) //throwErr 捕捉服务端的http状态码 定义在utils工具类的方法
      return Promise.reject(res)
    }
    return Promise.reject(error)

  }
)
export default axiosNew;
