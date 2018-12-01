import API from "@/service"
import {LsName, BusName, PageName} from "@/Constant";
import Bus from '@/plugin/bus'
import util from "@/libs/util";

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
        IS_SYNC_FLAG: '', // '是否由openAPI同步产品, 0：否, 1：是',
        IS_REALTIME_DATA_PRD: '', // 'H5实时数据对接标识： 0不是  1是',
        IS_RZ_FLAG: '', // '是否实名认证, 0：否, 1：是',
        H5_URL_ANDRIOD: '',// 非打通openApi 跳转链接 安卓
        H5_URL_IOS: '' // 非打通openApi 跳转链接 ios
      }
    }
  },
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
      this.ORG_ID = query.ORG_ID || util.storage.session.get('ORG_ID')
      if (this.ORG_ID == '227') {
        this.BANK_NAME = '众邦直销银行'
      }
      if (this.ORG_ID == '49') {
        this.BANK_NAME = '郑州直销银行'
      }
      console.log(this.ORG_ID);

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
            // 判断产品类型 区分openAPI
            if (this.ProAndOrgType.IS_SYNC_FLAG == 1) {
              // 打通openAOPI的
              this.checkBankStatus()
            }
            else if (this.ProAndOrgType.IS_SYNC_FLAG == 0) {
              // 非打通openAPI的
              // 直接跳转 银行h5链接

            }else {
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
      // todo登陆成功后判断拿来的去哪里
      this.toPreProduct() // 评估过判断是否去哪里
    }
  }

}
