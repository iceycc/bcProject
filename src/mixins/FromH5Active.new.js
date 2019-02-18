/**
 * 此文件主要用于h5活动页在登录比财情况下直接跳转购买时需要校验是否实名过的
 */

import API from '@/service'
import {PageName, imgSrc, LsName, BusName, PRO_PARAMS} from "@/Constant";
import Bus from "@/plugin/bus";
import util from "@/libs/util";

let MsgText = '应银行监管要求，需先开通银行二类户，通过二类户与银行直接进行交易，资金安全有保障'

const Check = {
  data() {
    return {
      ProAndOrgType: ''
    }
  },
  methods: {
    // 判断该用户在比财的实名认证状态
    checkAuthStatus() {
      // 只有h5活动页过来会有这个
      let H5URLS = JSON.parse(window.sessionStorage.getItem('H5URLS'))
      console.log('H5URLS>>>>>', H5URLS);
      let {LOGO_URL, ORG_NAME} = H5URLS

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
        console.log('比财实名步数>>', AUTH_STATUS);
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
            console.log('aaa', LOGO_URL);
            console.log('aaa', ORG_NAME);
            Bus.$emit(BusName.showBankLonding, {LOGO_URL, ORG_NAME})
            setTimeout(() => {
              this.checkBankOpenAndLogin()
            }, 1500)
            break;
          case 5:
            this.$router.push(PageName.BcOpening0)
            break;
        }
      }, err => {

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
        // （0未提交，1提交第一步，2提交第二步，3提交第三步）
        console.log('本行开户步数>>', step);
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
          this.setComState({type: 'openingData', value: res})
          // 众邦银行
          if (this.ORG_ID == '227') {
            this.loginSuccess(res)
          }
          // 郑州银行
          if (this.ORG_ID == '49') {
            Bus.$emit(BusName.showToast, MsgText, 3000)
            this.$router.push({name: PageName.Opening3})
          }
          if (this.ORG_ID == '248') {
            this.loginSuccess(res)
          }

        }
        if (step == 3) {
          this.loginSuccess(res)
        }
      }, err => {

      })
    },
    loginSuccess(res) {
      this.setComState({type: 'ISLogin', value: true})
      this.setComState({type: 'Infos', value: res})
      // this.
      this.getInfo()
    }
  }
}
/**
 * 外链跳转购买
 * @type {{methods: {}}}
 */
export const ToBuyingNew = {
  mixins: [Check],
  data() {
    return {
      ProID: '',
    }
  },
  created() {
    // ProID=19758&moneyNum=100&INVEST_ID=10001&TEAM_ID=333
    let query = this.$route.query //
    let ProID = util.storage.session.get('ProID') || query.ProID //
    let moneyNum = this.$route.query.moneyNum // H5活动页外链过来的
    let ProAndOrgType = this.getComState.ProAndOrgType //

    // 后期优化改参数
    this.setComState({type: 'ProAndOrgType', value: {...ProAndOrgType, ...query}})
    // 忘记有没有用到了
    util.storage.session.set('moneyNum', moneyNum)
    if (ProID) {
      this.ProID = ProID
      // 需要对参数过滤
      this.getData(ProID) // 通过产品id获取产品详情
    } else {
      // this.getInfo() // 用于查询账户余额
      let proData = this.getComState.goBuy
      let data = {
        proId:proData.ID + '',
        logoUrl:proData.LOGO_URL,
        prdName:proData.PRD_NAME,
        depositCategory:proData.DEPOSIT_CATEGORY,
        minAmount:proData.MIN_AMOUNT,
        increAmount:proData.INCRE_AMOUNT
      }
      this.initData(data) // 初始化数据
    }
  },
  methods: {
    // 通过产品id主动请求产品数据
    getData(id) {
      let data = {
        ID: id + ""
      };
      API.bicai.getPrdInfo(data, res => {
        this.checkAuthStatus() // 用于判断是否开户成功
        let goBuyData = {
          proId: id,
          logoUrl:res.LOGO_URL,
          prdName:res.PRD_NAME,
          depositCategory:res.DEPOSIT_CATEGORY,
          minAmount:res.MIN_AMOUNT,
          increAmount:res.INCRE_AMOUNT
        };
        this.initData(goBuyData) // 同时初始化数据
        this.setComState({type: 'PRD_TYPE', value: res.PRD_TYPE})

        this.setComState({type: 'loginType', value: '安全购买'})
        this.setComState({type: 'goBuy', value: goBuyData})
      });
    },
  }
}


