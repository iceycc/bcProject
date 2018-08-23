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
    open: {
        // 用户注册信息回显接口 ?? todo
        doApiRegisterBackShow(params, token, success, error) {
            let options = {
                url: '/openapi/comm/apiRegisterBackShow',
                params,
                token

            }
            return http.post(options, config, success, error)
        },
        //   回显2
        apiGetUserLastCompleteStep(params, success, error) {
            let options = {
                url: '/openapi/comm/apiGetUserLastCompleteStep',
                params,
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
        setPassWord(params, success, error) {
            let options = {
                url: '/openapi/comm/apiRegisterSetPsw',
                params
            }
            return http.post(options, config, success, error)
        },
        // 扫描身份证
        // 正
        apiIdCardFrontPhoneOcr(params, success, error) {
            let options = {
                url: '/openapi/comm/apiIdCardFrontPhoneOcr',
                params
            }
            // Object.assign(config,{
            //     headers: {'Content-Type': 'multipart/form-data'},
            // })
            return http.post(options, config, success, error)
        },
        // 反
        apiIdCardBackPhoneOcr(params, success, error) {
            let options = {
                url: '/openapi/comm/apiIdCardBackPhoneOcr',
                params
            }

            return http.post(options, config, success, error)
        },

    },
    /**
     * login 登陆相关
     */
    login(params, success, error) {
        let options = {
            url: '/openapi/comm/apiLoginBank',
            params,
            login:true
        }
        return http.post(options, config, success, error)
    },
    /**
     *  buying
     */
    buy: {
        // 购买
        apiBuy(params, success, error) {
            let options = {
                url: '/openapi/biz/apiBuy',
                params
            }
            return http.post(options, config, success, error)

        },
        // /openapi/comm/apiQueryAccRest
        apiQueryAccRest(params, success, error) {
            let options = {
                url: '/openapi/comm/apiQueryAccRest',
                params
            }
            return http.post(options, config, success, error)

        },

    },
    /**
     * 充值相关
     */
    reChange: {
        // 39查询用户是否已签约充值协议
        apiRechargeProtoQuery(params, success, error) {
            let options = {
                url: '/openapi/biz/apiRechargeProtoQuery',
                params
            }
            return http.post(options, config, success, error)
        },
        // 协议页 todo 1
        // finsuit/static/finsuit/js/openapi/js/xieyi/cz.html
        // 40.	获取充值协议码
        apiRechargeProtoCode(params, success, error) {
            let options = {
                url: '/openapi/biz/apiRechargeProtoCode',
                params
            }
            return http.post(options, config, success, error)
        },
        // 充值 /openapi/biz/apiRecharge
        apiRecharge(params, success, error) {
            let options = {
                url: '/openapi/biz/apiRecharge',
                params
            }
            return http.post(options, config, success, error)
        },

    },
    /**
     * risk 风险评估相关
     */
    risk: {
        apiGetRiskTestQuest(params, success, error) {
            let options = {
                url: '/openapi/comm/apiGetRiskTestQuest',
                params
            }
            return http.post(options, config, success, error)

        },
        apiRiskTestAnswer(params, success, error) {
            let options = {
                url: '/openapi/comm/apiRiskTestAnswer',
                params
            }
            return http.post(options, config, success, error)

        },

    },
    /**
     * Product 产品列表相关
     */
    product: {
        // 列表
        apiGetChannelPrdList(params, success, error) {
            let options = {
                url: '/openapi/comm/apiGetChannelPrdList',
                params
            }
            return http.post(options, config, success, error)

        },
        //
        apiGetChannelPrdInfo(params, success, error) {
            let options = {
                url: '/openapi/comm/apiGetChannelPrdInfo',
                params
            }
            return http.post(options, config, success, error)

        },

    },
    /**
     *  安全相关
     */
    safe:{
        // 重制密码
        apiUserResetLoginPass(params, success, error) {
            let options = {
                url: '/openapi/comm/apiUserResetLoginPass',
                params
            }
            return http.post(options, config, success, error)

        },
        // 获取充值协议
        // /finsuit/static/finsuit/js/openapi/js/xieyi/cz.html

    }
}
