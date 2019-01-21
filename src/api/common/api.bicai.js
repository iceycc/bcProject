import Http from "../../service/http/http.bicai";
import util from 'libs/util'

let http = new Http()
export default {
  /**
   * 比财登陆
   * @param params
   * @param success
   * @param error
   * @returns {*}
   */
  login(params, success, error) {
    let options = {
      type: 'LOGIN',
      params: {
        ...params,
        NO_TOKEN: true
      },
    }
    return http.post(options, success, error)
  },

  // 查询渠道产品列表-H5

  getProListByChannel(params, channel_id, success, error) {
    let options = {
      type: 'GENERALIZE_INFO_H5',
      params: {
        ...params,
        NO_TOKEN: true
      },
      channel_id
    }
    return http.post(options, success, error)
  },
  // GET_BANK_II_LIST_H5
  getBankListByChannelId(params, channel_id, success, error) {
    let options = {
      type: 'GET_BANK_II_LIST_H5',
      params: {
        ...params,
      },
      channel_id
    }
    return http.post(options, success, error)
  },

  /**
   * 比财登陆需要的验证吗
   * @param params
   * @param success
   * @param error
   * @returns {*}
   */
  sendSMS(params, success, error) {
    let options = {
      type: 'REQ_NO_VALIDATE',
      params: {
        ...params,
        NO_TOKEN: true
      },
    }
    return http.post(options, success, error)
  },
  /**
   * 实名认证过渡页获取信息
   * @param params
   * @param success
   * @param error
   * @returns {*}
   */
  getAuthMemberText(params, success, error) {
    let options = {
      type: 'GET_AUTH_MEMBER_TEXT',
      params: {
        ...params,
        NO_TOKEN: true
      },
    }
    return http.post(options, success, error)
  },
  /**
   *  身份证正面上传
   * @param params
   * @param success
   * @param error
   * @returns {*}
   */
  postFrontIDCard(params, success, error) {
    let options = {
      type: 'POST_IDENTITY_CARD_FACE',
      params,
    }
    return http.post(options, success, error)
  },
  /**
   * 身份证反面上传
   * @param params
   * @param success
   * @param error
   * @returns {*}
   */
  postBackIDCard(params, success, error) {
    let options = {
      type: 'POST_IDENTITY_CARD_GH',
      params,
    }
    return http.post(options, success, error)
  },
  /**
   * 身份证验证接口
   * @param params
   * @param success
   * @param error
   * @returns {*}
   */
  checkIDCard(params, success, error) {
    let options = {
      type: 'POST_IDENTITY_CARD_VALIDATE',
      params,
    }
    return http.post(options, success, error)
  },
  // 用户认证状态和回显数据
  getUserMemberInfo(params, success, error) {
    let options = {
      type: 'GET_MEMBER_AUTH_STATUS_INFO',
      params,
    }
    return http.post(options, success, error)
  },
  // 发送短信验证码 绑定银行卡
  sendSMSCodeToBindCard(params, success, error) {
    let options = {
      type: 'GET_BIND_CARD_SEND_SMS_CODE',
      params,
    }
    return http.post(options, success, error)
  },
  // MY_BINDING_CARDS_LIST 获取银行卡列表
  getBingingCardsList(params, success, error) {
    let options = {
      type: 'MY_BINDING_CARDS_LIST',
      params,
    }
    return http.post(options, success, error)
  },
  // 根据银行卡号获取银行名
  getCardBinList(params, success, error) {
    let options = {
      type: 'CARD_BIN_LIST',
      params,
    }
    return http.post(options, success, error)
  },
  // BIND_CARD_FOUR_ELEMENT 绑定银行卡
  bindCardFourELement(params, success, error) {
    let options = {
      type: 'BIND_CARD_FOUR_ELEMENT',
      params,
    }
    return http.post(options, success, error)
  },
  // 15.	设置支付密码 SET_PAYMENT_PASSWORD
  getPayPassword(params, success, error) {
    let options = {
      type: 'SET_PAYMENT_PASSWORD',
      params,
    }
    return http.post(options, success, error)
  },
  // GET_AUTH_STATUS  登录后判断是比财否实名
  getAuthStatus(params, success, error) {
    let options = {
      type: 'GET_AUTH_STATUS',
      params,
    }
    return http.post(options, success, error)
  },
  // GET_MEMBER_AUTH_STATUS_INFO 获取用户认证状态和回显数据
  getMerberAuthStatusInfo(params, success, error) {
    let options = {
      type: 'GET_MEMBER_AUTH_STATUS_INFO',
      params,
    }
    return http.post(options, success, error)
  },
  // 获取产品(货基，理财)详细信息
  getPrdInfo(params, success, error) {
    let options = {
      type: 'GET_PRD_INFO',
      params,

    }
    return http.post(options, success, error)
  },
  // 获取产品(货基，理财)详细信息
  getPrdFootInfo(params, success, error) {
    let options = {
      type: 'GET_PRD_FOOT_DATA',
      params,

    }
    return http.post(options, success, error)
  },
  // 获取产品(货基，理财)详细信息
  getAuthUrl(params, success, error) {
    let ORG_ID = util.storage.session.get('ORG_ID')

    let options = {
      type: 'GET_AUTH_URL',
      params: {
        ORG_ID,
        ...params
      },

    }
    return http.post(options, success, error)
  },
  // GET_BANK_II_LIST
  // 获取产品(货基，理财)详细信息
  getBankList(params, success, error) {
    let options = {
      type: 'GET_BANK_II_LIST',
      params,
    }
    return http.post(options, success, error)
  },
  // wpf
  privacyAgreement(params, success, error) {
    let options = {
      type: 'GET_PROTOCOL_INFO_LIST',
      params
    }
    return http.post(options, success, error)
  },
  // GET_PROTOCOL_INFO_LIST
  getDocs(params, success, error) {
    let options = {
      type: 'GET_PROTOCOL_INFO_LIST',
      params,
    }
    return http.post(options, success, error)
  },
}







