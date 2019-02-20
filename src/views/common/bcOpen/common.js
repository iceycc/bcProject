import API from "@/service"
import {LsName, BusName, PageName, PRO_PARAMS} from "@/Constant";
import Mixins from '@/mixins'
import Bus from '@/plugin/bus'

let timer;
let MsgText = '应银行监管要求，需先开通银行二类户，通过二类户与银行直接进行交易，资金安全有保障'
export default {
  data() {
    return {
      ProAndOrgType: {
        ID: '',// 产品id
        ORG_NAME: '',//机构名称
        PRD_NAME: '', // 产品名称
        ORG_ID: '', // 机构id
        IS_SYNC_FLAG: '1', // '是否由openAPI同步产品, 0：否, 1：是',
        IS_REALTIME_DATA_PRD: '1', // 'H5实时数据对接标识： 0不是  1是',
        IS_RZ_FLAG: '1', // '是否实名认证, 0：否, 1：是',
        H5_URL_ANDRIOD: '',// 非打通openApi 跳转链接 安卓
        H5_URL_IOS: '' // 非打通openApi 跳转链接 ios
      },
      href: '',
      isfinancial: '0' // h5活动页外链过来的 登录一下携带 members_id 跳走
    }
  },
  mixins: [ Mixins.redirectByFromPage],
  created() {
    this.checkProductType()
  },
  methods: {
    //  需要判断
    // `IS_SYNC_FLAG`  '是否由openAPI同步产品, 0：否, 1：是',
    // `IS_REALTIME_DATA_PRD` 'H5实时数据对接标识： 0不是  1是',
    // `IS_RZ_FLAG` '是否实名认证, 0：否, 1：是',
    checkProductType() {
      let query
      let storageH5URL = window.sessionStorage.getItem('H5URLS')
      // if (H5URL) { // 取url
      //   // query = JSON.parse(Base64.decode(H5URL))
      //   // 注意：外部通过url  DEVICE_ID=xxx   和  CHANNEL_ID=x
      // }

      // console.log(H5URL);
      if (storageH5URL) { // h5外链
        query = JSON.parse(storageH5URL)
        console.log(query);
        let {
          DEVICE_ID,
          CHANNEL_ID,
          APP_FLAG,
          LOGO_URL
        } = query

        // Bus.$emit(BusName.showBankLonding, {LOGO_URL, ORG_NAME})
        this.$store.commit('SET_DEVICE_ID', DEVICE_ID)
        this.$store.commit('SET_CHANNEL_ID', CHANNEL_ID)
        this.$store.commit('SET_APP_FLAG', APP_FLAG)
        // 外链过来的
        this.setComState({
          type: 'FromH5Active', value: true
        })
        this.setComState({
          type: 'ProAndOrgType', value: query
        })
        // console.log('login-query>>>', query);
        // if (this.getComState.ProAndOrgType.ORG_ID) {
        //   this.ProAndOrgType = this.getComState.ProAndOrgType || query
        // } else {
        this.ProAndOrgType = query
        // }
        console.log('ProAndOrgType', this.ProAndOrgType);
        // H5链接过来的
        this.checkAuthStatus()
      }
      // let MsgText = '应银行监管要求，需先开通银行二类户，通过二类户与银行直接进行交易，资金安全有保障'
      // Bus.$emit(BusName.showToast,MsgText)
    },
    // 判断该用户在比财的实名认证状态
    checkAuthStatus() {
      this.setComState({type: 'ISLogin', value: false})
      //
      let {LOGO_URL, ORG_NAME} = this.ProAndOrgType

      API.bicai.getAuthStatus({}, res => {
        let {AUTH_STATUS, isOldMember,idName} = res
        this.setComState({type:'idName',value:idName})

        //  AUTH_STATUS 返回码：
        // 0:未认证，
        // 1:身份证认证，
        // 2:银行卡认证，
        // 3:密码设置，
        // 4:认证完成，
        // 5:身份证过期
        console.log(AUTH_STATUS);
        let H5_URL = this.$route.query.H5_URL || window.sessionStorage.getItem('H5_URL')
        let FLAG = this.$route.query.AUTH_URL_FLAG || '0'
        let {IS_SYNC_FLAG, H5_URL_ANDRIOD, H5_URL_IOS, AUTH_URL_FLAG = FLAG} = this.ProAndOrgType
        switch (Number(AUTH_STATUS)) {
          case 0:
          case 1:
            Bus.$emit(BusName.showToast, MsgText, 3000)
            this.$router.push(PageName.BcOpening0)
            break;
          case 2:
            Bus.$emit(BusName.showToast, MsgText, 3000)
            this.$router.push(PageName.BcOpening2)
            break;
          case 3:
            Bus.$emit(BusName.showToast, MsgText, 3000)
            this.$router.push(PageName.BcOpening3)
            break;
          case 4:

            if (AUTH_URL_FLAG == 1) {
              // h5活动页直接跳转来的 判断AUTH_URL_FLAG唯一 获取免登录地址
              API.bicai.getAuthUrl({}, res => {
                if (res.STATUS == 1) {
                  Bus.$emit(BusName.showBankLonding, {LOGO_URL, ORG_NAME},10000)
                  setTimeout(() => {
                    window.location.href = res.AUTH_URL
                  }, 2000)
                } else {
                  Bus.$emit(BusName.showToast, res.MESSAGE)
                }
              })
              return
            }
            if (IS_SYNC_FLAG == 1) {
              // 判断产品类型 区分openAPI
              // this.checkBankStatus()
              this.checkBankOpenAndLogin()
            } else if (IS_SYNC_FLAG == 0) {
              // 非打通openAPI的
              // 直接跳转 银行h5链接
              // 不是h5直联
              // 直接跳转
              if (H5_URL) {
                // h5活动页跳转进来时判断是否有链接
                Bus.$emit(BusName.showBankLonding, {LOGO_URL, ORG_NAME},10000)
                // h5活动页跳转进来时判断是否有链接
                setTimeout(() => {
                  window.location.href = H5_URL
                }, 2000)
                return
              }
              // let href = this.ProAndOrgType.H5_URL_ANDRIOD || this.ProAndOrgType.H5_URL_IOS
              if (H5_URL_ANDRIOD || H5_URL_IOS) {
                Bus.$emit(BusName.showBankLonding, {LOGO_URL, ORG_NAME},10000)
                setTimeout(() => {
                  window.location.href = H5_URL_ANDRIOD || H5_URL_IOS;
                }, 2000)
              } else {
                alert('请配置银行直联跳转链接')
              }
            } else {
              this.checkBankOpenAndLogin()
            }
            break;
          case 5:
            //
            Bus.$emit(BusName.showBankLonding, {LOGO_URL, ORG_NAME},10000)
            setTimeout(() => {
              if (H5_URL) {
                window.location.href = H5_URL
                return
              }
              if (H5_URL_ANDRIOD || H5_URL_IOS) {
                window.location.href = H5_URL_ANDRIOD || H5_URL_IOS;
                return
              } else {
                alert('请配置银行直联跳转链接')
                return
              }
              this.$router.push(PageName.BcOpening0)
            }, 2000)
            break;
        }
      }, err => {
        this.codeText = '重新发送'
        this.msgDisabled = false
        clearInterval(timer)
      })
    },
    // 判断该用户在本行的状态
    checkBankOpenAndLogin() {
      let {LOGO_URL, ORG_NAME} = this.ProAndOrgType
      Bus.$emit(BusName.showBankLonding, {LOGO_URL, ORG_NAME})
      let data = {
        IS_RET_GRADE: '1'
      }
      API.common.apiQryLoginStatus(data, res => {
        let HAS_OPEN_BANK = res.HAS_OPEN_BANK || res.hasOpenBank
        let HAS_LOGIN = res.HAS_LOGIN || res.hasLogin
        let HAS_GRADE = res.HAS_GRADE || res.hasGrade
        let HAS_OPEN_ACCOUNT_TEXT = res.HAS_OPEN_ACCOUNT_TEXT || res.hasOpenAccountText

        this.setComState({type: 'HAS_GRADE', value: HAS_GRADE})
        if (HAS_OPEN_BANK == 1) {
          // 开户成功
          this.loginSuccess(res)
          // this.checkBankStatus()
        } else if (HAS_OPEN_BANK == 2) {
          this.checkBankStatus()
        } else if(HAS_OPEN_BANK == 3){
          Bus.$emit(BusName.showToast, HAS_OPEN_ACCOUNT_TEXT, 3000)

        } else if(HAS_OPEN_BANK==4){
          Bus.$emit(BusName.showToast, HAS_OPEN_ACCOUNT_TEXT, 3000)

        }
      })
    },
    // 判断该用户在本行的回显状态
    checkBankStatus() {
      // 登陆比财成功 且在比财实名成功 然后 检查在本行状态
      let data = {
        PHONE_NUM: this.tel
      }
      API.common.apiRegisterBackShow(data, res => {
        let step = res.LAST_STEP_NUM
        // （0未提交，1提交第一步，2提交第二步，3提交第三步）
        this.setComState({type: 'TEL', value: this.tel})
        if (step == 0) {
          // 未提交
          Bus.$emit(BusName.showToast, MsgText, 3000)
          this.setComState({type: 'openingData', value: res})
          this.$router.push({name: PageName.Opening1})
        }
        if (step == 1) {
          // 提交第一步
          Bus.$emit(BusName.showToast, MsgText, 3000)
          this.setComState({type: 'openingData', value: res})
          this.$router.push({name: PageName.Opening2})
        }
        if (step == 2) {
          // 提交第二步
          Bus.$emit(BusName.showToast, MsgText, 3000)
          this.setComState({type: 'openingData', value: res})
          // 众邦银行
          // if (this.ORG_ID == '227') {
          //   // 成功
          //   this.loginSuccess(res)
          // }
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
          // 成功
          this.loginSuccess(res)
        }
      }, err => {
        this.codeText = '重新发送'
        this.msgDisabled = false
        clearInterval(timer)
      })
    },
    loginSuccess() {
      this.setComState({type: 'ISLogin', value: true})
      this.redirectByFromPage()
    }
  },
}
