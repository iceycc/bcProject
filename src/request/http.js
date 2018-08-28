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
            console.error(err);
            if(err.match(/[500]/g)){
                console.log(500);
                Bus.$emit(BusName.showToast,'服务器异常')
                error && error('服务器异常')
            }

        });
    },
    // REQUEST
    request: function (method, {url, params,token='',login=false}, config, success, error) {
        method = method || 'post';
        params = Object.assign(params,{ORG_ID:'70'})
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
            if(result.head.TOKEN){ // 接口有返回token就更新token
                util.storage.session.set(LsName.token,result.head.TOKEN)
            }

            // 根据状态码 做业务状态校验 分流
            if(result.head.CODE == 0){
                success && success(result.data);
                console.log('成功msg >>>', result.head.MSG);
                return Promise.resolve(result.data)
            }
            else if(result.head.CODE == -2){
                Bus.$emit(BusName.showToast,'登陆已过期，请重新登陆')
                Router.push({
                    name:PageName.login,
                    query:{
                        target:Router.currentRoute.fullPath
                    }
                })
            }
            else if(result.head.CODE == -3){
                Bus.$emit(BusName.showToast,'在其它地方登陆，强制退出')
                Router.push({
                    name:PageName.login,
                    query:{
                        target:Router.currentRoute.fullPath
                    }
                })
            }
            else {
                console.log('错误msg >>>', result.head.MSG);
                if(result.head.MSG == '未登陆银行'){
                    Router.push({
                        name:PageName.login,
                        query:{
                            target:Router.currentRoute.fullPath
                        }
                    })
                }
                Bus.$emit(BusName.showToast,result.head.MSG)
                return Promise.reject(result.head.MSG)
            }
        }).catch(errors => {
            error && error(errors.toString());
            return Promise.reject(errors.toString())
        })

    }

}
