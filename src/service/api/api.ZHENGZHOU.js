import http from '../http/http.ZHENGZHOU'
import {HOST} from "@/Constant";

/**
 * axios 配置
 */
const Config = {
    config: {
        baseURL: 'https://finsuitdev.udomedia.com.cn/finsuit/',
        // baseURL:'http://192.168.100.141:8080/',
        method: 'post',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        timeout: 30000,
    },
}

/**
 * 业务api
 */
export default {
    /**
     *
     */
    common: {
        // 获取短信验证码
        apiSendPhoneCode(params, success, error) {
            let options = {
                url: '/openapi/comm/apiSendPhoneCode',
                params,
            }
            return http.post(options, Config.config, success, error)
        },
        // 查询产品/机构支持的绑定卡
        apiGetBankCardList(params, success, error) {
            let options = {
                url: '/openapi/comm/apiGetBankCardList',
                params,
            }
            return http.post(options, Config.config, success, error)
        },
        // 账户属性查询
        apiUserAccountProperties(params, success, error) {
            let options = {
                url: '/openapi/zzh/biz/apiUserAccountProperties',
                params,
            }
            return http.post(options, Config.config, success, error)
        },
    },
    /**
     * 注册相关 open
     */
    open: {
        // 身份证OCR扫描
        IdCardFrontPhoneOcr(params, success, error) {
            let options = {
                url: '/openapi/zzh/biz/IdCardFrontPhoneOcr',
                params,
            }
            return http.post(options, Config.config, success, error)
        },
        /**
         * 注册分三步
         */
        // (实名认证)
        apiRegisterValiUser(params, success, error) {
            let options = {
                url: '/openapi/comm/apiRegisterValiUser',
                params,
            }
            return http.post(options, Config.config, success, error)
        },
        // (绑卡)
        apiRegisterBandCard(params, delMsg, OTHER, success, error) {
            let options = {
                url: '/openapi/comm/apiRegisterBandCard',
                params,
                delMsg
            }
            return http.post(options, Config.config, success, error)
        },
        // （设置密码）
        apiRegisterSetPsw(params, success, error) {
            let options = {
                url: '/openapi/comm/apiRegisterSetPsw',
                params,
            }
            return http.post(options, Config.config, success, error)
        },
        /**
         * 用户注册步骤查询（通过身份证号）
         */
        apiGetUserLastCompleteStep(params, success, error) {
            let options = {
                url: '/openapi/comm/apiGetUserLastCompleteStep',
                params: {
                    TYPE: 'API_REGISTER_BACK_SHOW',
                    ...params
                }
            }
            return http.post(options, Config.config, success, error)
        },
        // 设置密码
        setPassWord(params, success, error) {
            let options = {
                url: '/openapi/comm/apiRegisterSetPsw',
                params
            }
            return http.post(options, Config.config, success, error)
        },
        // 扫描身份证
        // 正
        apiIdCardFrontPhoneOcr(params, success, error) {
            let options = {
                url: '/openapi/comm/apiIdCardFrontPhoneOcr',
                params
            }
            return http.post(options, Config.config, success, error)
        },
        // 反
        apiIdCardBackPhoneOcr(params, success, error) {
            let options = {
                url: '/openapi/comm/apiIdCardBackPhoneOcr',
                params
            }

            return http.post(options, Config.config, success, error)
        },
        // 查询 /openapi/comm/apiGetBankCardList
        apiGetBankCardList(params, success, error) {
            let options = {
                url: '/openapi/comm/apiGetBankCardList',
                params
            }

            return http.post(options, Config.config, success, error)
        },

    },
    /**
     * login 登录相关
     */
    login(params, success, error) {
        let options = {
            url: '/openapi/comm/apiLoginBank',
            params,
            login: true
        }
        return http.post(options, Config.config, success, error)
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
            return http.post(options, Config.config, success, error)

        },
        // /openapi/comm/apiQueryAccRest 复用
        apiQueryAccRest(params, success, error) {
            let options = {
                url: '/openapi/comm/apiQueryAccRest',
                params
            }
            return http.post(options, Config.config, success, error)

        },

    },
    /**
     * 充值相关
     */
    reChange: {
        // 查询用户是否已签约充值协议
        apiRechargeProtoQuery(params, success, error) {
            let options = {
                url: '/openapi/biz/apiRechargeProtoQuery',
                params
            }
            return http.post(options, Config.config, success, error)
        },
        // 协议页
        // finsuit/static/finsuit/js/openapi/js/xieyi/cz.html
        // 40.	获取充值协议码
        apiRechargeProtoCode(params, success, error) {
            let options = {
                url: '/openapi/biz/apiRechargeProtoCode',
                params
            }
            return http.post(options, Config.config, success, error)
        },
        // 充值 /openapi/biz/apiRecharge
        apiRecharge(params, success, error) {
            let options = {
                url: '/openapi/biz/apiRecharge',
                params
            }
            return http.post(options, Config.config, success, error)
        },

    },
    /**
     * 提现相关
     */
    withdraw: {
        // 提现openapi/biz/apiCash
        apiCash(params, success, error) {
            let options = {
                url: '/openapi/biz/apiCash',
                params
            }
            return http.post(options, Config.config, success, error)
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
            return http.post(options, Config.config, success, error)

        },
        apiRiskTestAnswer(params, success, error) {
            let options = {
                url: '/openapi/comm/apiRiskTestAnswer',
                params
            }
            return http.post(options, Config.config, success, error)

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
            return http.post(options, Config.config, success, error)

        },
        //
        apiGetChannelPrdInfo(params, success, error) {
            let options = {
                url: '/openapi/comm/apiGetChannelPrdInfo',
                params
            }
            return http.post(options, Config.config, success, error)

        },
        // 预约/
        apiSaveSubscribeInfo(params, success, error) {
            let options = {
                url: '/openapi/comm/apiSaveSubscribeInfo',
                params,
            }
            return http.post(options, Config.config, success, error)

        },

    },
    /**
     *  安全相关
     */
    safe: {
        // 重制密码
        apiUserResetLoginPass(params, delMsg, success, error) {
            let options = {
                url: '/openapi/comm/apiUserResetLoginPass',
                params,
                delMsg
            }
            return http.post(options, Config.config, success, error)

        },
        // 获取充值协议
        // /finsuit/static/finsuit/js/openapi/js/xieyi/cz.html
        // 查询登录用户某机构绑定卡信息 apiBandCard
        apiBandCard(params, success, error) {
            let options = {
                url: '/openapi/comm/apiBandCard',
                params
            }
            return http.post(options, Config.config, success, error)

        },
        // 更换银行卡：openapi/comm/apiChangeBingCard
        apiChangeBingCard(params, delMsg, success, error) {
            let options = {
                url: '/openapi/comm/apiChangeBingCard',
                params,
                delMsg
            }
            return http.post(options, Config.config, success, error)

        },
        // 更换手机号
        // openapi/comm/apiChangePhoneNum
        apiChangePhoneNum(params, delMsg, success, error) {
            let options = {
                url: '/openapi/comm/apiChangePhoneNum',
                params,
                delMsg
            }
            return http.post(options, Config.config, success, error)

        },
        // 更换支付密码：openapi/comm/apiUserResetPayPass
        apiUserResetPayPass(params, delMsg, success, error) {
            let options = {
                url: '/openapi/comm/apiUserResetPayPass',
                params,
                delMsg
            }
            return http.post(options, Config.config, success, error)

        },
        // 协议
        apiAgreement(params, success, error) {
            let options = {
                url: '/openapi/biz/apiAgreement',
                params
            }
            return http.post(options, Config.config, success, error)

        },
    },
    /**
     * list相关
     */
    list: {
        // /openapi/comm/apiGetBankCardList
        apiGetBankCardList(params, success, error) {
            let options = {
                url: '/openapi/comm/apiGetBankCardList',
                params
            }
            return http.post(options, Config.config, success, error)

        },
    },
    /**
     * 查询类
     */
    query: {
        // openapi/comm/apiQueryBizStatus 轮询查询状态
        apiQueryBizStatus(params, success, error) {
            let options = {
                url: '/openapi/comm/apiQueryBizStatus',
                params
            }
            return http.post(options, Config.config, success, error)

        },
    },
    /**
     * 账户相关
     */
    account: {
        // 电子列表
        apiBankList(params, success, error) {
            let options = {
                url: 'openapi/bank/apiBankList',
                params,
                TYPE: 'API_BANK_LIST'
            }
            return http.post(options, Config.config, success, error)
        },

        // 银行账户查询：/openapi/comm/apiQueryAccRest
        apiQueryAccRest(params, success, error) { // 下面的代替了
            let options = {
                url: 'openapi/comm/apiQueryAccRest',
                params,
            }
            return http.post(options, Config.config, success, error)
        },
        // 我的投资情况(汇总)  ok
        getMyInvest(params, success, error) {
            let options = {
                url: 'openapi/invest/getMyInvest',
                params,
            }
            return http.post(options, Config.config, success, error)
        },
        // 获取我的投资持有中数据(分页)
        // openapi/invest/getMyInvestHold
        getMyInvestHold(params, success, error) {
            let options = {
                url: 'openapi/invest/getMyInvestHold',
                params,
            }
            return http.post(options, Config.config, success, error)
        },
        // 账户明细 openapi/bank/apiQryRechCashHis
        // /openapi/invest/apiQryRechCashHis
        apiQryRechCashHis(params, success, error) {
            let options = {
                url: 'openapi/bank/apiQryRechCashHis',
                params,
            }
            return http.post(options, Config.config, success, error)
        },

    },
    /**
     * 理财产品
     */
    financial: {
        // 理财产品列表  总资产数据获取接口
        apiMyAssetByType(params, success, error) {
            let options = {
                url: '/openapi/bank/apiMyAssetByType',
                params
            }
            return http.post(options, Config.config, success, error)

        },
        // 理财产品持有中数据（分页）
        getMyInvestHold(params, success, error) {
            let options = {
                url: '/openapi/invest/getMyInvestHold',
                params
            }
            return http.post(options, Config.config, success, error)

        },
        // 理财产品已到期（分页）
        getMyInvestOver(params, success, error) {
            let options = {
                url: '/openapi/invest/getMyInvestOver',
                params
            }
            return http.post(options, Config.config, success, error)

        },
        // 交易明细
        apiQryTradeHis(params, success, error) {
            let options = {
                url: '/openapi/bank/apiQryTradeHis',
                params
            }
            return http.post(options, Config.config, success, error)
        },
    }
}


