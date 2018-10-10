import axios from 'axios'
import {util} from "../common/utils/util";
import {LsName} from '../Constant'

var instance = axios.create(null);
export default {
    // POST
    post: function (option, config, success, error) {
        return this.request('POST', option, config, success, error).catch(err => {
            console.error(err);
            // Bus.$emit(BusName.showToast,'网络异常')
        });
    },
    // REQUEST
    request: function (method, {url, params},config, success, error) {
        method = method || 'post';
        let token = util.storage.session.get(LsName.token) || ''
        let DeviceId = util.storage.session.get(LsName.DEVICE_ID) + ''
        let CHANNEL_ID = util.storage.session.get(LsName.CHANNEL_ID) + ''
        let datas = {
            head: {
                TYPE: "BATCH_RECORD_FUNCTION_LOG_INFO",
                TOKEN: token,
                SESSION_ID: "",
                DEVICE_ID: DeviceId,
                CHANNEL_TYPE: 'H5'
            },
            param: {
                CHANNEL_ID: CHANNEL_ID,
                FUNCTION_LOG_LIST:
                        [{
                            FUNCTION_ID: '', // 点位
                            REMARK_DATA: '', // 中文备注
                            CORP_CHANNEL_ID: CHANNEL_ID, // 渠道id
                            APP_PLACE: "99", // 日志位置
                            FROM_TYPE: '', // 日志分类
                            FROM_ID: '', // 产品ID、机构ID
                            FROM_PR1: '', //
                            FROM_PR2: '',
                            // MEMBER_ID: '',
                            // CREATE_TIME: '',
                            NETWORK_TYPE: '1', // 网络类型
                            SOURCE_ID: '', //
                            SOURCE_URL: '',
                            ITEM_VALUE: '',
                            FUNCTION_STATUS: '',
                            // FUNCTION_DATE: '',
                            ITEM_VALUE1: '',
                            ITEM_VALUE2: '',
                            ...params
                        }]
            }
        }


        config.method = method;
        config.data = 'param_key=' + JSON.stringify(datas)
        config.url = url
        // HTTP请求
        return instance.request(config).then(result => {

            return Promise.resolve(result)
            // 根据状态码 做业务状态校验 分流

        }).catch(errors => {
            error && error(errors.toString());
            return Promise.reject(errors.toString())
        })

    }

}
