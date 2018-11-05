import axios from '../plugin/request/_axios'
import Bus from '../plugin/bus/index'
import {BusName, PageName, LsName} from "../Constant";
import util from "libs/util";
import Router from '../router/index'
import store from '../store'

export default {
  /*
  晋商银行默认所有接口走post请求
   */
  post: function (option, config, success, error) {
    return this.request('POST', option, config, success, error).catch(err => {
      console.log(err);
      return Promise.reject(err)
    });
  },
  // REQUEST
  /**
   *
   * @param method 方法
   * @param url 请求地址
   * @param params 个例参数
   * @param TYPE 请求类型 默认
   * @param token 登录凭证，默认从store里拿，注册完成后个例接口需要外部传人
   * @param login todo 暂定
   * @param delMsg 是否显示默认的msg提示，有些错误信息不需要黑色弹层提示，要安装ui在页面展示红色信息
   * @param OTHER  开户时 银行卡已经绑定 要保存下这俩参数 用于下次绑定
   * @param config axios配置参数
   * @param success 成功的回调
   * @param error 错误的回调
   * @returns {Promise<AxiosResponse<any>>}
   */
  request: function (method, {url, params, TYPE = 'GENERALIZE_INFO', token = '', login = false, delMsg = false, OTHER = false}, config, success, error) {
    method = method || 'post'
    let ORG_ID = store.getters.GET_BANK_INFO.ORG_ID
    let token1 = store.getters.GET_ACCOUNT_STATE.TOKEN || token
    let DeviceId = util.storage.session.get(LsName.DEVICE_ID) + '' // 外部传人 ?DEVICE_ID
    let channel_id = util.storage.session.get(LsName.CHANNEL_ID) + ''
    params = Object.assign(params, {ORG_ID: ORG_ID + ''})
    let datas = {
      biz_data: {
        head: {
          CHANNEL: "Umeng",
          CHANNEL_TYPE: 'H5',
          VERSION: "",
          IMSI: "460026325010440",
          SESSION_ID: "",
          SYSTEM_TYPE: "h5",
          TYPE,
          TOKEN: token1, //15011352818 15711310733
          DEVICE_ID: DeviceId
        },
        param: params,
      },
      channel_id: channel_id
    }
    config.method = method;
    config.data = 'param_key=' + JSON.stringify(datas)
    config.url = url
    // HTTP请求
    return axios.request(config).then(result => {
      result = result.biz_data
      console.log('res >>>', result.data);
      console.log('code >>>', result.head.CODE);
      util.storage.session.remove(LsName.LAST_STEP_NUM)
      util.storage.session.remove(LsName.REQ_SERIAL)
      if (result.head.TOKEN) { // 接口有返回token就更新token
        store.commit('SET_TOKEN',result.head.TOKEN)
        // util.storage.session.set(LsName.token, result.head.TOKEN)
      }
      if (OTHER && JSON.stringify(result.data.REQ_SERIAL) != '{}' && result.data.REQ_SERIAL && result.data.LAST_STEP_NUM) {
        // 开户时 银行卡已经绑定 要保存下这俩参数 用于下次绑定
        util.storage.session.set(LsName.LAST_STEP_NUM, result.data.LAST_STEP_NUM) // 序列号
        util.storage.session.set(LsName.REQ_SERIAL, result.data.REQ_SERIAL) //
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
        // util.storage.session.remove(LsName.token)
        store.commit('SET_TOKEN','')
        Router.push({
          name: PageName.Login,
          query: {
            target: Router.currentRoute.fullPath
          }
        })
      }
      else if (result.head.CODE == 1 && result.head.ERROR_CODE == -3) {
        Bus.$emit(BusName.showToast, result.head.MSG)
        store.commit('SET_TOKEN','')
        // util.storage.session.remove(LsName.token)
        Router.push({
          name: PageName.Login,
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
        if (result.head.MSG == '未登陆银行') {
          Router.push({
            name: PageName.Login,
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
