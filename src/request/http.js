import axios from './_axios'
import Bus from '../common/js/bus'
import {BusName, PageName} from "../Constant";
import {util} from "../common/utils/util";
import {LsName} from '../Constant'
import Router from '../router/index'

export default {
    // POST
    post: function (option, config, success, error) {
        return this.request('POST', option, config, success, error).catch(err => {
            console.log(err);
            return Promise.reject(err)
        });
    },
    // REQUEST
    request: function (method, {url, params, token = '', login = false, delMsg = false, OTHER = false}, config, success, error) {
        method = method || 'post'
        params = Object.assign(params, {ORG_ID: '70'})
        let token1 = util.storage.session.get(LsName.token) || token
        let DeviceId = util.storage.session.get(LsName.DEVICE_ID) + ''
        let datas = {
            biz_data: {
                head: {
                    CHANNEL: "Umeng",
                    VERSION: "",
                    IMSI: "460026325010440",
                    SESSION_ID: "",
                    SYSTEM_TYPE: "h5",
                    TYPE: "GENERALIZE_INFO",
                    TOKEN: token1, //15011352818 15711310733
                    DEVICE_ID: DeviceId
                },
                param: params,
            },
            channel_id: "3"
        }


        config.method = method;
        config.data = 'param_key=' + JSON.stringify(datas)
        config.url = url
        // HTTP请求
        return axios.request(config).then(result => {
            result = result.biz_data
            console.log('res >>>', result.data);
            console.log('code >>>', result.head.CODE);
            console.log(OTHER)
            util.storage.session.remove(LsName.LAST_STEP_NUM)
            util.storage.session.remove(LsName.REQ_SERIAL)
            if (result.head.TOKEN) { // 接口有返回token就更新token
                util.storage.session.set(LsName.token, result.head.TOKEN)
            }
            if(OTHER && JSON.stringify(result.data.REQ_SERIAL) != '{}' && result.data.REQ_SERIAL && result.data.LAST_STEP_NUM){
                // 开户时 银行卡已经绑定 要保存下这俩参数 用于下次绑定
                //
                util.storage.session.set(LsName.LAST_STEP_NUM,result.data.LAST_STEP_NUM) // 序列号
                util.storage.session.set(LsName.REQ_SERIAL,result.data.REQ_SERIAL) //
            }
            // 根据状态码 做业务状态校验 分流
            if (result.head.CODE == 0) {
                let msg = result.head.MSG || '成功'
                success && success(result.data);
                console.log('成功msg >>>', msg);
                return Promise.resolve(result.data)
            }
            else if (result.head.CODE == 1 && result.head.ERROR_CODE == -2) {
                Bus.$emit(BusName.showToast, result.head.MSG)
                util.storage.session.remove(LsName.token)
                Router.push({
                    name: PageName.login,
                    query: {
                        target: Router.currentRoute.fullPath
                    }
                })
            }
            else if (result.head.CODE == 1 && result.head.ERROR_CODE == -3) {
                Bus.$emit(BusName.showToast, result.head.MSG)
                util.storage.session.remove(LsName.token)
                Router.push({
                    name: PageName.login,
                    query: {
                        target: Router.currentRoute.fullPath
                    }
                })
            }
            else {
                console.log('错误msg >>>', result.head.MSG);
                if (!delMsg) {
                    Bus.$emit(BusName.showToast, result.head.MSG)
                }
                if(result.head.MSG=='未登陆银行'){
                    Router.push({
                        name: PageName.login,
                        query: {
                            target: Router.currentRoute.fullPath
                        }
                    })
                }
                return Promise.reject(result.head.MSG)
            }
        }).catch(errors => {
            error && error(errors.toString());
            console.log('http errors>>', errors);
            return Promise.reject(errors.toString())
        })

    }

}
