import API from "@/service"
import {LsName, BusName, PageName} from "@/Constant";
import Bus from '@/plugin/bus'
import util from "@/libs/util";
import checkOpenApiAndH5 from './checkOpenApiAndH5'

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
      href: ''
    }
  },
  mixins: [checkOpenApiAndH5],
  created() {
    this.checkProductType()
  },
  methods: {
    //  需要判断
    // `IS_SYNC_FLAG`  '是否由openAPI同步产品, 0：否, 1：是',
    // `IS_REALTIME_DATA_PRD` 'H5实时数据对接标识： 0不是  1是',
    // `IS_RZ_FLAG` '是否实名认证, 0：否, 1：是',
    checkProductType() {
      let query = this.$route.query
      console.log('logon-query>>>', query);
      if (query.IS_REALTIME_DATA_PRD) {
        this.setComState({
          type: 'ProAndOrgType', value: query
        })
      }
      this.ProAndOrgType = this.getComState.ProAndOrgType
      console.log('ProAndOrgType', this.ProAndOrgType);
      this.ORG_ID = query.ORG_ID || util.storage.session.get('ORG_ID')
      if (this.ORG_ID == '227') {
        this.BANK_NAME = '众邦直销银行'
      }
      if (this.ORG_ID == '49') {
        this.BANK_NAME = '郑州直销银行'
      }
      console.log(this.ORG_ID);
      if (this.ProAndOrgType.ID && this.ProAndOrgType.IS_SYNC_FLAG == 1) {
        // 说明链接有产品id是外链过来买东西的
        this.getProData()
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
        this.setComState({type: 'goBuy', value: goBuyData})
        this.setComState({type: 'loginType', value: '安全购买'})
      });
    },
    // 登录
    loginFactory() {
      if (util.Check.tel(this.tel, true)) return
      let data = {
        PHONE_NUM: this.tel + '',
        PHONE_CODE: this.cms,
        SAFT_CODE: this.safeCode
      }
      let SOURCE_URL = this.$store.getters.GET_COMMON_STATE.loginType
      this.$store.commit('SET_TOKEN', null)
      API.bicai.login(data, (res) => {
        API.watchApi({
          FUNCTION_ID: 'ptb0A007', // 点位
          REMARK_DATA: '异业合作-登录', // 中文备注
          SOURCE_URL: SOURCE_URL
        })
        this.$store.commit('SET_BICAI_USER', res)
        this.$store.commit('SET_TOKEN', res.PHONE_TOKEN)
        // 判断openApi
        if (this.ProAndOrgType.IS_SYNC_FLAG == 0) {
          // 不是 openApi
          if (this.ProAndOrgType.IS_REALTIME_DATA_PRD == 0) {
            // 不是h5直联
            // 直接跳转
            if (this.ProAndOrgType.IS_RZ_FLAG == 0) {

              // let href = this.ProAndOrgType.H5_URL_ANDRIOD || this.ProAndOrgType.H5_URL_IOS
              if (this.href) {
                window.open(this.href)
              } else {
                alert('跳转第三方链接获取异常')
              }
            } else {
              this.checkAuthStatus()
            }
          }
          else if (this.ProAndOrgType.IS_REALTIME_DATA_PRD == 1) {
            // h5直联
            this.checkAuthStatus()
          } else {
            this.checkAuthStatus()
          }
        }
        else if (this.ProAndOrgType.IS_SYNC_FLAG == 1) {
          // 是 openApi
          this.checkAuthStatus()
        }
        else {
          this.checkAuthStatus()
        }
      }, err => {
        API.watchApi({
          FUNCTION_ID: 'ptb0A007', // 点位
          REMARK_DATA: '异业合作-登录', // 中文备注
        })
        this.getMsgCodeSuccess = false
        this.codeText = '重新发送'
        this.msgDisabled = false
        clearInterval(timer)
        this.$store.commit('SET_SESSION_ID', '')
        // util.storage.session.remove(LsName.token)
        this.$store.commit('SET_TOKEN', '')
      })
    },
    // 判断该用户在比财的实名认证状态
    checkAuthStatus() {
      this.setComState({type: 'ISLogin', value: false})
      //
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
            Bus.$emit(BusName.showToast, MsgText, 3000)
            this.$router.push(PageName.BcOpening3)
            break;
          case 4:
            // this.checkProTo(this.checkBankStatus, this.checkBankStatus)

            // 判断产品类型 区分openAPI
            if (this.ProAndOrgType.IS_SYNC_FLAG == 1) {
              // 打通openAOPI的
              this.checkBankStatus()
            }
            else if (this.ProAndOrgType.IS_SYNC_FLAG == 0) {
              // 非打通openAPI的
              // 直接跳转 银行h5链接
              // 不是h5直联
              // 直接跳转
              // let href = this.ProAndOrgType.H5_URL_ANDRIOD || this.ProAndOrgType.H5_URL_IOS
              if (this.href) {
                window.open(this.href)
              } else {
                alert('跳转第三方链接获取异常')
              }
            } else {
              this.checkBankStatus()
            }
            break;
          case 5:
            //
            this.$router.push(PageName.BcOpening1)
            break;
        }
      }, err => {
        this.codeText = '重新发送'
        this.msgDisabled = false
        clearInterval(timer)
      })
    },

    // 判断该用户在本行的开户状态
    checkBankStatus() {
      // 登陆比财成功 且在比财实名成功 然后 检查在本行状态
      let data = {}
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
          // 郑州银行
          if (this.ORG_ID == '227') {
            this.loginSuccess(res)
          }
          // 众邦银行
          if (this.ORG_ID == '49') {
            this.$router.push({name: PageName.Opening3})
          }
        }
        if (step == 3) {
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
      // 判断openApi
      // this.checkProTo(this.toPreProduct, this.toPreProduct)
      if (this.ProAndOrgType.IS_SYNC_FLAG == 0) {
        // 不是 openApi
        if (this.ProAndOrgType.IS_REALTIME_DATA_PRD == 0) {
          // 不是h5直联
          // 直接跳转
          // let href = this.ProAndOrgType.H5_URL_ANDRIOD || this.ProAndOrgType.H5_URL_IOS
          if (this.href) {
            window.open(this.href)
          } else {
            alert('跳转第三方链接获取异常')
          }
        }
        else if (this.ProAndOrgType.IS_REALTIME_DATA_PRD == 1) {
          // h5直联
          this.toPreProduct()
        } else {
          this.toPreProduct()

        }
      }
      else if (this.ProAndOrgType.IS_SYNC_FLAG == 1) {
        // 是 openApi
        this.toPreProduct()
      }
      else {
        this.toPreProduct()
      }
    }
  },


}