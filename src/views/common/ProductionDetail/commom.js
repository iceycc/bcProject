import API from "@/service"
import {LsName, BusName, PageName} from "@/Constant";
import Bus from '@/plugin/bus'
import util from "@/libs/util";
import Mixins from '@/mixins'

let MsgText = '应银行监管要求，需先开通银行二类户，通过二类户与银行直接进行交易，资金安全有保障'

export default {
  data() {
    return {
      ORG_ID: '',
      HAS_GRADE: '',// 是否风险测评
      DEPICT: ''
    }
  },
  created() {
    this.ORG_ID = util.storage.session.get('ORG_ID')
  },
  mixins: [Mixins.HandleMixin],
  methods: {
    goNext() {
      console.log(this.proID);
      // this.removeComState('ProDuctData')
      let goBuyData = {
        id: this.proID,
        logo: this.productDetail.LOGO_URL,
        ...this.productDetail
      };
      if (this.type == 1) {
        API.watchApi({
          FUNCTION_ID: 'ptb0A002',
          REMARK_DATA: '异业合作-产品详情页-购买-安全购买', // 中文备注
          FROM_ID: this.proID + '', // 产品ID、机构ID
        })
      } else {
        // 此处一下的逻辑没有判断预约的逻辑。如有添加以后再添加
        API.watchApi({
          FUNCTION_ID: 'ptb0A002',
          REMARK_DATA: '异业合作-产品详情页-购买-预约下期', // 中文备注
          FROM_ID: this.proID + '', // 产品ID、机构ID
        })
      }
      this.setComState({type: 'goBuy', value: goBuyData})
      this.setComState({type: 'loginType', value: '安全购买'})
      // let {LOGO_URL, ORG_NAME} = this.productDetail
      let {TOKEN} = this.$store.getters.GET_ACCOUNT_STATE
      let {IS_SYNC_FLAG, IS_RZ_FLAG, H5_URL_ANDRIOD, H5_URL_IOS, AUTH_URL_FLAG} = this.getComState.ProAndOrgType
      let {LOGO_URL, ORG_NAME} = this.productDetail
      if (TOKEN) {
        if (IS_SYNC_FLAG == 1 || (IS_SYNC_FLAG == 0 && IS_RZ_FLAG == 1) || AUTH_URL_FLAG == 1) {
          // 打通open API 获取没打通openApi但是要实名
          this.checkAuthStatus()
        } else {
          if (H5_URL_ANDRIOD || H5_URL_IOS) {
            Bus.$emit(BusName.showBankLonding, {LOGO_URL, ORG_NAME}, 10000)
            setTimeout(() => {
              window.location.href = H5_URL_ANDRIOD || H5_URL_IOS
            }, 2000)
          } else {
            alert('请配置银行直联跳转链接')
          }
        }

      } else {

        // Bus.$emit(BusName.showBankLonding, {LOGO_URL, ORG_NAME})
        this.$router.push({name: PageName.Login})
      }
    },


    setProType(data) {
      API.bicai.getPrdFootInfo(data, res => {
        // 新增 平安银行 这种登录授权的 0：使用之前的逻辑 1：实名认证后，调用免登接口
        this.DEPICT = res.DEPICT
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
          LOGO_URL
        } = res
        // `IS_SYNC_FLAG`  '是否由openAPI同步产品, 0：否, 1：是',
        // `IS_REALTIME_DATA_PRD` 'H5实时数据对接标识： 0不是  1是',
        // `IS_RZ_FLAG` '是否实名认证, 0：否, 1：是',
        // set
        let ProData = {
          LOGO_URL,
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
      // this.setComState({type: 'ISLogin', value: false})
      let {LOGO_URL, ORG_NAME} = this.productDetail
      API.bicai.getAuthStatus({}, res => {
        let {AUTH_STATUS, isOldMember, idName} = res
        this.setComState({type: 'idName', value: idName})

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
            this.$router.push(PageName.BcOpening0)
            break;
          case 2:
            Bus.$emit(BusName.showToast, MsgText, 3000)
            this.$router.push(PageName.BcOpening2)
            break;
          case 3:
          case 4:
            // 已经完成实名的了
            let {IS_SYNC_FLAG, H5_URL_ANDRIOD, H5_URL_IOS, AUTH_URL_FLAG} = this.getComState.ProAndOrgType
            // console.log('this.getComState.ProAndOrgType', this.getComState.ProAndOrgType);
            if (IS_SYNC_FLAG == 0) {
              // 非打通openApi
              if (AUTH_URL_FLAG == 1) {
                // 1：是否需要调取免登录：实名认证后，调用免登接口 返回H5直联的面登录路径
                API.bicai.getAuthUrl({}, res => {
                  if (res.STATUS == 1) {
                    console.log(res.AUTH_URL);
                    Bus.$emit(BusName.showBankLonding, {LOGO_URL, ORG_NAME}, 10000)
                    if (res.AUTH_URL) {
                      setTimeout(() => {
                        window.location.href = res.AUTH_URL
                      }, 2000)
                    } else {
                      alert('请配置银行直联跳转链接')
                    }
                  } else {
                    Bus.$emit(BusName.showToast, res.MESSAGE)
                  }
                })
              } else {
                // 0：使用之前的逻辑
                if (H5_URL_ANDRIOD || H5_URL_IOS) {
                  Bus.$emit(BusName.showBankLonding, {LOGO_URL, ORG_NAME}, 10000)
                  setTimeout(() => {
                    window.location.href = H5_URL_ANDRIOD || H5_URL_IOS
                  }, 2000)
                } else {
                  alert('请配置银行直联跳转链接')
                }
              }
            } else {
              // 打通openApi 校验在本行的的校验
              this.checkBankOpenAndLogin()
            }
            break;
          case 5:
            Bus.$emit(BusName.showToast, MsgText, 3000)
            this.$router.push(PageName.BcOpening0)
            break;
        }
      })
    },
    // 判断该用户在本行的状态
    checkBankOpenAndLogin() {
      let {LOGO_URL, ORG_NAME} = this.productDetail
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
      this.$router.push({name: PageName.Buying})
    },
  }
}
