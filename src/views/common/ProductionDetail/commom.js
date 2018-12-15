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
    this.ORG_ID = this.ProAndOrgType.ORG_ID || util.storage.session.get('ORG_ID')
  },
  methods: {
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
    // 判断该用户在本行的开户状态
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
          // this.checkIfPinggu(res)
        }
      }, err => {
        this.codeText = '重新发送'
        this.msgDisabled = false
      })
    },
    loginSuccess(res) {
      this.setComState({type: 'ISLogin', value: true})
      let {IS_SYNC_FLAG, H5_URL_ANDRIOD, H5_URL_IOS} = this.getComState.ProAndOrgType
      let H5_URL = window.sessionStorage.getItem('H5_URL')
      // 判断openApi
      // this.checkProTo(this.toPreProduct, this.toPreProduct)
      if (IS_SYNC_FLAG == 0) {
        // 不是 openApi
        if (IS_REALTIME_DATA_PRD == 0) {
          // 不是h5直联
          // 直接跳转
          if (H5_URL) {
            window.location.href = H5_URL
            return
          }
          // let href = this.ProAndOrgType.H5_URL_ANDRIOD || this.ProAndOrgType.H5_URL_IOS
          if (this.href) {
            window.location.href = this.href;
            // let tempwindow=window.open('_blank'); // 先打开页面
            // tempwindow.location=this.href; // 后更改页面地址
          } else {
            alert('跳转第三方链接获取异常')
          }
        } else if (IS_REALTIME_DATA_PRD == 1) {
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
    },
    // 判断是否评估
    checkIfPinggu(res) {
      let type = res.HAS_GRADE
      this.setComState({type: 'HAS_GRADE', value: type})
      if (type == 1) {
        Bus.$emit(BusName.showToast, '请先进行评估')
        this.$router.push({
          name: PageName.VerificationSuccess,
        })
      } else if (type == 2) { // 评估过
        // 2的话
        this.toPreProduct() // 评估过判断是否去哪里
      } else {
        this.toPreProduct() // 评估过判断是否去哪里
      }
    },
  }
}
