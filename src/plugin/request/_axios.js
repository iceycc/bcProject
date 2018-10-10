import axios from 'axios'
import {Indicator} from 'mint-ui';
// http request 拦截器  第一层拦截
axios.interceptors.request.use(
        config => {
            Indicator.open({
                spinnerType: 'triple-bounce'
            });
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
axios.interceptors.response.use(
        response => {
            Indicator.close();
            // todo http code校验
            return response.data;
        },
        error => {
            setTimeout(() => {
                Indicator.close();
            }, 1000)
            console.log('interceptors response errors>>',error);
            if(error.toString().indexOf("timeout") != -1) {
                return Promise.reject('网络请求超时')
            }
            else if(error.toString().indexOf("Network Error") != -1){
                return Promise.reject('网络错误')
            }
            else {
                return Promise.reject(error)
            }

        }
)

export default axios;