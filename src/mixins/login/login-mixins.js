import util from "libs/util";
import {LsName, PageName, BusName} from "@/Constant";
import API from "@/service";
import Bus from '@/plugin/bus'

let watchPassPluginPassTimer;// 晋商密码控件轮询计时器标志

import store from '@/store'
import {ORG_ID_NUM} from '@/Constant'

let ORG_ID = store.getters.GET_ORG_ID

/**
 * 开户公共方法，根据ORG_ID区分不同的业务逻辑
 */
let commons = {
  data() {
    return {
      ORG_ID_NUM,
      ORG_ID,
      rePass: true, //密码框
    }
  },
  created() {
    console.log('commons');
  },
  methods: {}
}


/**
 * 晋商银行开户相关
 */
let JinShang = {
  mixins: [commons],
  data() {
    return {}
  },
  created() {
    console.log('JinShang');
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(watchPassPluginPassTimer)
    next()
  },
  mounted() {
    console.log('mounted');
    // 晋商银行密码控件需要轮询获取密码长度
    this.watchPassPluginPass()
    this.watchPassPlugin()
  },
  methods: {
    /**
     * 晋商银行相关
     */
    loginFactory() {
      clearInterval(watchPassPluginPassTimer)
      if (util.Check.tel(this.tel, true)) return
      let pass = $('#login_loginPass').$getCiphertext()
      let lengths = $('#login_loginPass').$getCiphertext()
      if (util.Check.loginPassLen(lengths, true)) return
      let data = {
        PHONE_NUM: this.tel,
        BANK_LOGIN_PW: pass
      }
      // let SOURCE_URL = util.storage.session.get(LsName.loginType)
      let SOURCE_URL = store.getters.GET_COMMON_STATE.loginType
      // util.storage.session.remove(LsName.token)
      this.$store.commit('SET_TOKEN', null)

      API.login(data, (res) => {
        API.watchApi({
          FUNCTION_ID: 'ptb0A007', // 点位
          REMARK_DATA: '异业合作-登录', // 中文备注
          SOURCE_URL: SOURCE_URL
        })

        this.setComState({type: "reload", value: true})// reload-001  // 每次在调用密码框时进行植入标签，下次碰到密码框页面时进行校验刷新
        this.removeComState('loginInfo')
        let type = res.HAS_GRADE
        this.setComState({type: 'HAS_GRADE', value: type})
        // util.storage.session.set(LsName.HAS_GRADE, type)
        if (type == 1) {
          Bus.$emit(BusName.showToast, '请先进行评估')
          this.$router.push({
            name: PageName.VerificationSuccess,
          })
        }
        else if (type == 2) { // 评估过
          // 2的话
          this.toPreProduct() // 评估过判断是否去哪里

        } else {

        }

      }, err => {
        API.watchApi({
          FUNCTION_ID: 'ptb0A007', // 点位
          REMARK_DATA: '异业合作-登录', // 中文备注
        })
        // util.storage.session.remove(LsName.token)
        this.$store.commit('SET_TOKEN', null)
        this.setComState({
          type: 'loginInfo',
          value: {
            PHONE_NUM: this.tel,
            msg: err
          }
        })
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      })
    },
    watchPassPluginPass() {
      /**
       * 轮询晋商密码框是否有输入 控制密码框样式
       */
      let num = 1
      watchPassPluginPassTimer = setInterval(() => {
        let flag = this.checkPassWordTextIsEmpty()
        if (flag > 0) {
          this.passShow = true
          if (this.tel.length > 0 && flag == 2) {
            this.disabled = false

          } else {
            this.disabled = true
          }
        } else {
          this.passShow = false
          this.disabled = true
        }

        num++
      }, 500)
    },
    watchPassPlugin() {
      // 通过轮询获取密码控件是否加载成功
      let num = 1
      let timer = setInterval(() => {
        let passKey = $('#LowercaseDiv') // 插件基于jq
        if (passKey[0]) {
          this.rePass = false
          clearInterval(timer)
          return
        } else {
          if (num == 100) {
            this.rePass = false
            clearInterval(timer)
          }
        }
        num++
      }, 300)
    },
    checkPassWordTextIsEmpty() {
      // 判断密码框加载状态
      this.passPluginText = $('#login_loginPass').text() //
      let reg1 = /密码/
      let reg2 = /加载/
      if (this.passPluginText.match(reg1)) {
        // 说明没有输入密码
        return 0
      }
      if (this.passPluginText.match(reg2)) {
        // 正在加载密码
        return 0
      }
      else if (this.passPluginText.length >= 8) {
        // 密码大于位数8
        return 2;
      } else {
        // 密码位数不对
        return 1
      }
    },
  }
}
/**
 * 郑州银行相关
 */
let ZhengZhou = {
  mixins: [commons],
  data() {
    return {}
  },
  created() {
    console.log('ZhengZhou');
    clearInterval(watchPassPluginPassTimer)
  },
  methods: {}
}
/**
 * 众邦银行开户相关
 */
let ZhongBang = {
  mixins: [commons],
  data() {
    return {}
  },
  created() {
    console.log('ZhengZhou');
  },
  methods: {}
}


let MIX = {};
switch (ORG_ID) {
  case ORG_ID_NUM.JinShang:
    MIX = JinShang;
    break;
  case ORG_ID_NUM.ZhengZhou:
    MIX = ZhengZhou;
    break;
  case ORG_ID_NUM.ZhongBang:
    MIX = ZhongBang;
    break;
}
export default MIX
