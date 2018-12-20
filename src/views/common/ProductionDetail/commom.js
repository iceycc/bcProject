import API from "@/service"
import {LsName, BusName, PageName} from "@/Constant";
import Bus from '@/plugin/bus'
import util from "../../../libs/util";

let MsgText = '应银行监管要求，需先开通银行二类户，通过二类户与银行直接进行交易，资金安全有保障'


export default {
  data() {
    return {
      ORG_ID: ''
    }
  },
  created() {
    this.ORG_ID = util.storage.session.get('ORG_ID')
  },
  methods: {
    setProType(res, data) {
      API.bicai.getPrdFootInfo(data, res => {
        // 新增 平安银行 这种登录授权的 0：使用之前的逻辑 1：实名认证后，调用免登接口
        this.AUTH_URL_FLAG = res.AUTH_URL_FLAG || '0'
        let {
          AUTH_URL_FLAG = '0',
          ID,// 产品id
          ORG_NAME,//机构名称
          PRD_NAME, // 产品名称
          ORG_ID, // 机构id
          IS_SYNC_FLAG, // '是否由openAPI同步产品, 0：否, 1：是',
          IS_REALTIME_DATA_PRD, // `IS_REALTIME_DATA_PRD` 'H5实时数据对接标识： 0不是  1是',
          IS_RZ_FLAG, // '是否实名认证, 0：否, 1：是',
          H5_URL_ANDRIOD,// 非打通openApi 跳转链接 安卓
          H5_URL_IOS, // 非打通openApi 跳转链接 ios
        } = res
        // `IS_SYNC_FLAG`  '是否由openAPI同步产品, 0：否, 1：是',
        // `IS_REALTIME_DATA_PRD` 'H5实时数据对接标识： 0不是  1是',
        // `IS_RZ_FLAG` '是否实名认证, 0：否, 1：是',
        // set
        let ProData = {
          AUTH_URL_FLAG,
          ID,// 产品id
          ORG_NAME,//机构名称
          PRD_NAME, // 产品名称
          ORG_ID, // 机构id
          IS_SYNC_FLAG, // '是否由openAPI同步产品, 0：否, 1：是',
          IS_REALTIME_DATA_PRD, // `IS_REALTIME_DATA_PRD` 'H5实时数据对接标识： 0不是  1是',
          IS_RZ_FLAG, // '是否实名认证, 0：否, 1：是',
          H5_URL_ANDRIOD,// 非打通openApi 跳转链接 安卓
          H5_URL_IOS // 非打通openApi 跳转链接 ios
        }
        console.log(ProData);
        this.setComState({
          type: 'ProAndOrgType', value: ProData
        })
      })

    },
    // 判断该用户在比财的实名认证状态
    checkAuthStatus() {
      this.setComState({type: 'ISLogin', value: false})
      API.bicai.getAuthStatus({}, res => {
        let {AUTH_STATUS, isOldMember} = res
        //  AUTH_STATUS 返回码：
        // 0:未认证，
        // 1:身份证认证，
        // 2:银行卡认证，
        // 3:密码设置，
        // 4:认证完成，
        // 5:身份证过期
        console.log(AUTH_STATUS);
        switch (Number(AUTH_STATUS)) {
          case 0:
          case 1:
            Bus.$emit(BusName.showToast, MsgText, 3000)
            this.$router.push(PageName.BcOpening1)
            break;
          case 2:
            Bus.$emit(BusName.showToast, MsgText, 3000)

            this.$router.push(PageName.BcOpening2)
            break;
          case 3:
          case 4:
            this.checkBankOpenAndLogin()
            // todo 再判断对应的直销银行有没有开户
            break;
          case 5:
            Bus.$emit(BusName.showToast, MsgText, 3000)
            this.$router.push(PageName.BcOpening1)
            break;
        }
      })
    },
    // 判断该用户在本行的状态
    checkBankOpenAndLogin() {
      let data = {
        IS_RET_GRADE: '2'
      }
      API.common.apiQryLoginStatus(data, res => {
        let HAS_OPEN_BANK = res.HAS_OPEN_BANK
        let HAS_LOGIN = res.HAS_LOGIN
        if (HAS_OPEN_BANK == 1) {
          // 开户成功
          this.loginSuccess(res)
          // this.checkBankStatus()
        } else if (HAS_OPEN_BANK == 2) {
          this.checkBankStatus()
        }
      })
    },
    // 判断该用户在本行的回显
    checkBankStatus() {
      // 登陆比财成功 且在比财实名成功 然后 检查在本行状态
      let data = {}
      API.common.apiRegisterBackShow(data, res => {
        let step = res.LAST_STEP_NUM
        this.setComState({type: 'TEL', value: this.tel})
        // （0未提交，1提交第一步，2提交第二步，3提交第三步）
        // util.storage.session.set('USERINFO', res)
        if (step == 0) {
          Bus.$emit(BusName.showToast, MsgText, 3000)
          this.setComState({type: 'openingData', value: res})
          this.$router.push({name: PageName.Opening1})
        }
        if (step == 1) {
          Bus.$emit(BusName.showToast, MsgText, 3000)
          this.setComState({type: 'openingData', value: res})
          this.$router.push({name: PageName.Opening2})
        }
        if (step == 2) {
          this.setComState({type: 'Infos', value: res})
          // 众邦银行
          if (this.ORG_ID == '227') {
            // 成功
            this.loginSuccess(res)
          }
          // 郑州银行
          if (this.ORG_ID == '49') {
            // 第三步
            this.$router.push({name: PageName.Opening3})
          }
          // 客商银行
          if (this.ORG_ID == '248') {
            this.loginSuccess(res)
          }
        }
        if (step == 3) {
          // todo登陆成功后判断拿来的去哪里
          this.setComState({type: 'ISLogin', value: true})
          this.setComState({type: 'Infos', value: res})
          if (this.ORG_ID == '49') {
            // 第三步
            this.loginSuccess(res)
          }
        }
      }, err => {
        this.codeText = '重新发送'
        this.msgDisabled = false
      })
    },
    loginSuccess() {
      this.setComState({type: 'ISLogin', value: true})
      let {IS_SYNC_FLAG, H5_URL_ANDRIOD, H5_URL_IOS, AUTH_URL_FLAG = '0'} = this.getComState.ProAndOrgType
      if (IS_SYNC_FLAG == 0) {
        if (AUTH_URL_FLAG == 1) {
          // 1：实名认证后，调用免登接口 返回H5直联的面登录路径
          API.bicai.getAuthUrl({}, res => {
            if (res.STATUS == 1) {
              Bus.$emit(BusName.showToast, res.MESSAGE)
            } else {
              window.location.href = res.AUTH_URL
            }
          })
        } else {
          // 0：使用之前的逻辑
          window.location.href = H5_URL_ANDRIOD || H5_URL_IOS
        }
      } else {
        this.$router.push({name: PageName.Buying})
      }
    },
  }
}
