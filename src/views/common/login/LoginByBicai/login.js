import API from "@/service"
import {LsName, BusName, PageName, PRO_PARAMS} from "@/Constant";
import Bus from '@/plugin/bus'
import util from "@/libs/util";
import checkOpenApiAndH5 from './checkOpenApiAndH5'
import Mixins from '@/mixins'

let Base64 = require('js-base64').Base64;
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
  mixins: [checkOpenApiAndH5, Mixins.HandleMixin],
  created() {
    // this.checkProductType()
  },
  mounted() {
    setTimeout(() => {
      console.log('mounted');
      this.checkProductType()
    }, 100)
  },
  activated() {
    console.log('activated');
    this.isfinancial = this.$route.query.isfinancial
  },
  methods: {
    //  需要判断
    // `IS_SYNC_FLAG`  '是否由openAPI同步产品, 0：否, 1：是',
    // `IS_REALTIME_DATA_PRD` 'H5实时数据对接标识： 0不是  1是',
    // `IS_RZ_FLAG` '是否实名认证, 0：否, 1：是',
    checkProductType() {
      let qu = this.$route.query
      let query = util.storage.session.get('FirstLoad') || {}
      let H5URL = qu.H5URL  // 和1218活动页约定链接参数
      let storageH5URL = window.sessionStorage.getItem('H5URLS')
      this.isfinancial = this.$route.query.isfinancial
      if (H5URL) { // 取url
        query = JSON.parse(Base64.decode(H5URL))
        // 注意：外部通过url  DEVICE_ID=xxx   和  CHANNEL_ID=x
      }
      if (storageH5URL) {
        query = JSON.parse(storageH5URL)
      }
      let {
        DEVICE_ID,
        CHANNEL_ID,
        APP_FLAG
      } = query
      this.$store.commit('SET_DEVICE_ID', DEVICE_ID)
      this.$store.commit('SET_CHANNEL_ID', CHANNEL_ID)
      this.$store.commit('SET_APP_FLAG', APP_FLAG)
      // if(query.)
      if (query.IS_SYNC_FLAG && query.ORG_ID) {
        // 外链过来的
        this.setComState({
          type: 'FromH5Active', value: true
        })
        this.setComState({
          type: 'ProAndOrgType', value: query
        })
      }
      // console.log('login-query>>>', query);

      if (this.getComState.ProAndOrgType.ORG_ID) {
        this.ProAndOrgType = this.getComState.ProAndOrgType || query
      } else {
        this.ProAndOrgType = query
      }
      //  判断什么平台的 展示不同平台的登录
      let APP_FLAG_CODE = this.$store.getters.GET_ACCOUNT_STATE.APP_FLAG
      switch (APP_FLAG_CODE) {
        case 'BC':
          this.APP_FLAG_TEXT = '比财'
          break;
        case 'PC':
          this.APP_FLAG_TEXT = '拼财'
          break;
        default:
          this.APP_FLAG_TEXT = '比财'
      }
      console.log('ProAndOrgType', this.ProAndOrgType);
      this.ORG_ID = this.ProAndOrgType.ORG_ID || util.storage.session.get('ORG_ID')
      this.BANK_NAME = this.ProAndOrgType.ORG_NAME
      if (this.ORG_ID == '49') {
        this.BANK_NAME = '郑州直销银行'
      } else if (this.ORG_ID == '248') {
        this.BANK_NAME = '梅州客商银行'
      } else {
      }

      if (this.isfinancial == 1) {
        // 外链过来的
        this.BANK_NAME = ''
        this.hasBank = false
      } else {
        this.hasBank = true
      }
      // 控制底部提示
      // if(this.ProAndOrgType.IS_SYNC_FLAG == 1){
      //   this.ifOpenApi = true
      // }else {
      //   this.ifOpenApi = false
      // }
      console.log('ProAndOrgTypeId>>', this.ProAndOrgType.ID);
      if (this.ProAndOrgType.ID && this.ProAndOrgType.IS_SYNC_FLAG == 1) {
        // 说明链接有产品id是外链过来买东西的
        this.getProData(this.ProAndOrgType.ID)
      }
      this.href = this.ProAndOrgType.H5_URL_ANDRIOD || this.ProAndOrgType.H5_URL_IOS

    },
    getProData(id) {
      let data = {
        ID: id + ""
      };
      // API.commonApi.apiGetChannelPrdInfo(data, res => {
      API.bicai.getPrdInfo(data, res => {
        this.productDetail = res;
        this.setComState({type: 'PRD_TYPE', value: this.productDetail.PRD_TYPE})
        this.removeComState('ProDuctData')
        let goBuyData = {
          id: id,
          logo: this.productDetail.LOGO_URL,
          ...this.productDetail
        };
        this.setComState({type: 'loginType', value: '安全购买'})
        this.setComState({type: 'goBuy', value: goBuyData})
      });
    },
    // 判断该用户在比财的实名认证状态
    checkAuthStatus() {
      this.setComState({type: 'ISLogin', value: false})
      let {LOGO_URL, ORG_NAME} = this.ProAndOrgType
      //
      API.bicai.getAuthStatus({}, res => {
        let {AUTH_STATUS, isOldMember,idName} = res
        //  AUTH_STATUS 返回码：
        // 0:未认证，
        // 1:身份证认证，
        // 2:银行卡认证，
        // 3:密码设置，
        // 4:认证完成，
        // 5:身份证过期
        console.log(AUTH_STATUS);
        this.setComState({type:'idName',value:idName})
        let H5_URL = this.$route.query.H5_URL || window.sessionStorage.getItem('H5_URL') // FORM_1218活动页面 url参数或者本地存储获取h5活动页面跳转过来的
        let FLAG = this.$route.query.AUTH_URL_FLAG || '0' // FORM_1218活动页面
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
              //  FORM_1218活动页面
              // h5活动页直接跳转来的 判断AUTH_URL_FLAG==1  获取免登录地址
              API.bicai.getAuthUrl({}, res => {
                if (res.STATUS == 1) {
                  Bus.$emit(BusName.showBankLonding, {LOGO_URL, ORG_NAME}, 10000)
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
              if (H5_URL) {
                // h5活动页跳转进来时判断是否有链接
                Bus.$emit(BusName.showBankLonding, {LOGO_URL, ORG_NAME}, 10000)
                setTimeout(() => {
                  window.location.href = H5_URL
                }, 2000)
                return
              }
              // let href = this.ProAndOrgType.H5_URL_ANDRIOD || this.ProAndOrgType.H5_URL_IOS
              if (H5_URL_ANDRIOD || H5_URL_IOS) {
                Bus.$emit(BusName.showBankLonding, {LOGO_URL, ORG_NAME}, 10000)
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
            Bus.$emit(BusName.showBankLonding, {LOGO_URL, ORG_NAME}, 10000)
            setTimeout(() => {
              if (H5_URL) {
                window.location.href = H5_URL
                return
              }
              if (H5_URL_ANDRIOD || H5_URL_IOS) {
                window.location.href = H5_URL_ANDRIOD || H5_URL_IOS;
                return
              } else {
                //请配置银行直联跳转链接
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
        let HAS_OPEN_BANK = res.HAS_OPEN_BANK
        let HAS_LOGIN = res.HAS_LOGIN
        let HAS_GRADE = res.HAS_GRADE
        this.setComState({type: 'HAS_GRADE', value: HAS_GRADE})
        if (HAS_OPEN_BANK == 1) {
          // 开户成功
          this.loginSuccess(res)
          // this.checkBankStatus()
        } else if (HAS_OPEN_BANK == 2) {
          this.checkBankStatus()
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
    loginSuccess(res) {
      this.setComState({type: 'ISLogin', value: true})
      this.setComState({type: 'Infos', value: res})
      this.toPreProduct()
    }
  },


}
