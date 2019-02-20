import axios from '../request/_axios'
import Bus from '@/plugin/bus/index'
import {BusName, PageName, LsName} from "@/Constant";
import util from "@/libs/util";
// import Router from '@/router/index'
import store from '@/store/index'

export default {
  /*
  银行默认所有接口走post请求
   */
  /**
   *
   * @param url 请求地址
   * @param params 个例参数
   * @param TYPE 请求类型 默认
   * @param token 登录凭证，默认从store里拿，注册完成后个例接口需要外部传人
   * @param login 暂定
   * @param delMsg 是否显示默认的msg提示，有些错误信息不需要黑色弹层提示，要安装ui在页面展示红色信息
   * @param OTHER  开户时 银行卡已经绑定 要保存下这俩参数 用于下次绑定
   * @param config axios配置参数
   * @param success 成功的回调
   * @param error 错误的回调
   * @returns {Promise<AxiosResponse<any>>}
   */

  async post( {url, params, TYPE = 'OLD_INFO', token = '', login = false, delMsg = false, OTHER = false}, config, success, error) {
    let ORG_ID = util.storage.session.get('ORG_ID') || ''
    if (JSON.stringify(ORG_ID) == '{}') {
      ORG_ID = ''
    }
    ORG_ID = params.ORG_ID || ORG_ID
    let {
      DEVICE_ID,
      APP_FLAG,
      CHANNEL_ID,
      TOKEN = token,
      SESSION_ID = '',
      OPEN_API_CHANNEL_ID = ''
    } = store.getters.GET_ACCOUNT_STATE
    let datas = {
      biz_data: {
        head: {
          CHANNEL: "Umeng",
          CHANNEL_TYPE: 'H5',
          VERSION: "",
          IMSI: "",
          SESSION_ID: SESSION_ID,
          TYPE,
          TOKEN: TOKEN,
          DEVICE_ID: DEVICE_ID + '',
          SYSTEM_TYPE: "h5",
          CHANNEL_ID: CHANNEL_ID || '',
          USER_CHANNEL: OPEN_API_CHANNEL_ID + '', // 新增 USER_CHANNEL

          APP_FLAG: APP_FLAG || 'BC',
          CLIENT_ID: "30"
        },
        param: {
          ORG_ID: ORG_ID + '', // 70
          ...params
        },
      },
      channel_id: CHANNEL_ID + '',
    }
    config.method = 'POST';
    config.data = 'param_key=' + JSON.stringify(datas)
    config.url = url
    // HTTP请求
    try {
      let result =await axios.request(config)
      result = result.biz_data
      console.log('OldBank - res>>>', result);
      if (!TOKEN && result.head.TOKEN) { //
        store.commit('SET_TOKEN', result.head.TOKEN)
      }

      // 根据状态码 做业务状态校验 分流
      if (result.head.CODE == 0) {
        let msg = result.head.MSG || '成功'
        success && success(result.data);
        console.log('成功msg >>>', msg);
        return Promise.resolve(result.data)
      } else if (result.head.CODE == 1 && result.head.ERROR_CODE == -2) {
        // 登录超时
        Bus.$emit(BusName.showToast, result.head.MSG)
        store.commit('SET_TOKEN', '')
      } else if (result.head.CODE == 1 && result.head.ERROR_CODE == -3) {
        // 其他登录
        Bus.$emit(BusName.showToast, result.head.MSG)
        store.commit('SET_TOKEN', '')
      } else {
        if (!delMsg) {
          Bus.$emit(BusName.showToast, result.head.MSG)
        }
        if (result.head.MSG == '未登陆银行') {
        }
        return Promise.reject(result.head.MSG)
      }
    }catch (e) {
      error && error(e.toString());
      console.log('错误msg>>', e);
      return Promise.reject(e.toString())
    }
  }

}


