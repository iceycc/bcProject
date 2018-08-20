import axios from './axios'
import Bus from '../common/js/bus'
import {BusName} from "../Constant";
import {util} from "../common/utils/util";
import {LsName} from '../Constant'

export default {
    // POST
    post: function (option, config, success, error) {
        return this.request('POST', option, config, success, error).catch(err => {
            console.error(err);
        });
    },
    // REQUEST
    request: function (method, {url, params,token=''}, config, success, error) {
        method = method || 'post';
        params = Object.assign(params,{ORG_ID:'70'})
        let token1 = util.storage.local.get(LsName.token) || token
        let datas = {
            biz_data: {
                head: {
                    CHANNEL: "Umeng",
                    VERSION: "2.2.9",
                    IMSI: "460026325010440",
                    SESSION_ID: "cde294d8973f4852815ba24f294e273d",
                    SYSTEM_TYPE: "h5",
                    TYPE: "GENERALIZE_INFO",
                    TOKEN: token1, //15011352818 15711310733
                    DEVICE_ID: "866637030888319"
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
            // console.log('拦截 result >>>', result);
            result = result.biz_data
            // todo 做业务状态校验
            if(result.head.CODE == 0){
                success && success(result.data);
                return Promise.resolve(result.data)
            }else {
                console.log('错误msg >>>', result.head.MSG);
                Bus.$emit(BusName.showToast,result.head.MSG)
                return Promise.reject(result.data)
            }
        }).catch(errors => {
            /*Indicator.close();*/
            error && error(errors.toString());
            return Promise.reject(errors.toString())
        })

    }

}
