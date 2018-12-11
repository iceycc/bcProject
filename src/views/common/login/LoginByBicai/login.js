import API from "@/service"
import {LsName, BusName, PageName, PRO_PARAMS} from "@/Constant";
import Bus from '@/plugin/bus'
import util from "@/libs/util";
import checkOpenApiAndH5 from './checkOpenApiAndH5'

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
  mixins: [checkOpenApiAndH5],
  created() {

    // this.checkProductType()
  },
  mounted() {
    setTimeout(() => {
      console.log('mounted');
      this.checkProductType()
    }, 100)
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
      let storageH5URL = window.localStorage.getItem('H5URL')
      if (H5URL) {
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
      console.log('ProAndOrgType', this.ProAndOrgType);
      this.ORG_ID = this.ProAndOrgType.ORG_ID || util.storage.session.get('ORG_ID')
      if (this.ORG_ID == '227') {
        this.BANK_NAME = '众邦直销银行'
      } else if (this.ORG_ID == '49') {
        this.BANK_NAME = '郑州直销银行'
      } else {
        this.BANK_NAME = this.ProAndOrgType.ORG_NAME
      }
      if (query.isfinancial == 1) {
        // 外链过来的
        this.BANK_NAME = ''
        this.isfinancial = 1
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
      // let token = util.storage.session.get('BICAI_TOKEN')
      // if (token) {
      //   this.$store.commit('SET_TOKEN', token)
      //   // 判断openApi
      //   if (this.ProAndOrgType.IS_SYNC_FLAG == 0) {
      //     // 不是 openApi
      //     // 不是h5直联
      //     if (this.ProAndOrgType.IS_RZ_FLAG == 0) {
      //       // 不需要实名
      //       if (this.href) {
      //         window.location.href = this.href;
      //       } else {
      //         alert('跳转第三方链接获取异常')
      //       }
      //     } else {
      //       // 需要实名
      //       this.checkAuthStatus()
      //     }
      //   } else if (this.ProAndOrgType.IS_SYNC_FLAG == 1) {
      //     // 是 openApi
      //     this.checkAuthStatus()
      //   } else {
      //     this.checkAuthStatus()
      //   }
      //   return
      // }
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
            } else if (this.ProAndOrgType.IS_SYNC_FLAG == 0) {
              // 非打通openAPI的
              // 直接跳转 银行h5链接
              // 不是h5直联
              // 直接跳转
              // let href = this.ProAndOrgType.H5_URL_ANDRIOD || this.ProAndOrgType.H5_URL_IOS
              if (this.href) {
                window.location.href = this.href;

                // let tempwindow=window.open('_blank'); // 先打开页面
                // tempwindow.location=this.href; // 后更改页面地址
              } else {
                alert('跳转h5链接获取异常')
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
            window.location.href = this.href;

            // let tempwindow=window.open('_blank'); // 先打开页面
            // tempwindow.location=this.href; // 后更改页面地址
          } else {
            alert('跳转第三方链接获取异常')
          }
        } else if (this.ProAndOrgType.IS_REALTIME_DATA_PRD == 1) {
          // h5直联
          this.toPreProduct()
        } else {
          this.toPreProduct()

        }
      } else if (this.ProAndOrgType.IS_SYNC_FLAG == 1) {
        // 是 openApi
        this.toPreProduct()
      } else {
        this.toPreProduct()
      }
    }
  },


}
