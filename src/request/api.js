import config from './config'
import http from './http'


export const API = {
    test(param, success, error) {
        let option = {
            url: 'http://test.api.com',
            param
        }
        return http.post(option, config, success, error)
    },
    /**
     * 注册相关 open
     */
    open:{
        // 用户注册信息回显接口 ?? todo
        doApiRegisterBackShow(params,token, success, error){
            let options = {
                url: '/openapi/comm/apiRegisterBackShow',
                params,
                token

            }
            return http.post(options, config, success, error)
        },
        // 注册
        doRegeist(params, success, error) {
            let options = {
                url: '/openapi/comm/apiValiUserAndBandCard',
                params,

            }
            return http.post(options, config, success, error)
        },
        // 获取手机验证码
        getMsgCode(params, success, error) {
            let options = {
                url: '/openapi/comm/apiSendPhoneCode',
                // 'param_key='JSON.stringify(params)
                params
            }
            return http.post(options, config, success, error)
        },
        // 设置密码
        setPassWord(params,success,error){
            let options = {
                url:'/openapi/comm/apiRegisterSetPsw',
                params
            }
            return http.post(options, config, success, error)
        }

    },


    //
}
