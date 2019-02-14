import axiosNew from '../request/_axios.new'
import Bus from '@/plugin/bus/index'
import {BusName, PageName, LsName} from "@/Constant";
import util from "@/libs/util";
import store from '@/store/index'

export default {
  /**
   *
   * @param url 请求地址
   * @param params 个例参数
   * @param TYPE 请求类型 默认
   * @param token 登录凭证，默认从store里拿，注册完成后个例接口需要外部传人
   * @param login 暂定
   * @param delMsg 是否显示默认的msg提示，有些错误信息不需要黑色弹层提示，要安装ui在页面展示红色信息
   * @param config axios配置参数
   * @param success 成功的回调
   * @param error 错误的回调
   * @returns {Promise<AxiosResponse<any>>}
   */
  async post({url, params, TYPE = '', token = '', login = false, delMsg = false}, config, success, error) {
    let ORG_ID = util.storage.session.get('ORG_ID') || ''
    if (JSON.stringify(ORG_ID) == '{}') {
      ORG_ID = ''
    }
    ORG_ID = params.orgId || ORG_ID
    let {
      DEVICE_ID,
      APP_FLAG,
      CHANNEL_ID,
      TOKEN = token,
      USER_CHANNEL = ''
    } = store.getters.GET_ACCOUNT_STATE
    let newData = {
      head: {
        userChannel: USER_CHANNEL = '',
        appFlag: APP_FLAG || 'BC',
        channel: "",
        channelId: CHANNEL_ID || '',
        clientId: "30",
        deviceId: DEVICE_ID + '',
        deviceName: "",
        orgId: ORG_ID + '', // 70
        systemType: "h5",
        token: TOKEN,
        version: ""
      },
      param: {
        ...params
      }
    }
    config.method = 'POST';
    config.data = newData
    config.url = url
    // HTTP请求
    try {
      let result = await axiosNew.request(config)
      console.log(' - res>>>', result);
      if (!TOKEN && result.head.token) { //
        store.commit('SET_TOKEN', result.head.token)
      }
      return new Promise((resolve, reject) => {
        // 根据状态码 做业务状态校验 分流
        if (result.code == 0) {
          let msg = result.head.MSG || '成功'
          success && success(result.data);
          console.log('成功msg >>>', msg);
          resolve(result.data)
        } else if (result.code == 1) {
          Bus.$emit(BusName.showToast, result.msg)
          reject(result.msg)
        } else {
          if (!delMsg) {
            Bus.$emit(BusName.showToast, result.msg)
          }
          reject(result.msg)
        }
      })
    } catch (err) {
      error && error(errors.toString());
      console.log('错误msg>>', err);
      Bus.$emit(BusName.showToast, err)
      return Promise.reject(err.toString())
    }
  }

}

function goLogin() {
  // Router.push({
  //   name: PageName.Login,
  //   query: {
  //     target: Router.currentRoute.fullPath
  //   }
  // })
}
