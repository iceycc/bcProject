import axios from 'axios'
// http request 拦截器

axios.interceptors.request.use(
        config => {

            return config;
        },
        error => {
            return Promise.reject(error);
        }
);

// http response 拦截器
axios.interceptors.response.use(
        response => {
            // todo http code校验
            return response.data;
        },
        error => {
            return Promise.reject(error)
        }
)

export default axios;