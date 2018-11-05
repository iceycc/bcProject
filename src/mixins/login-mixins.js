import util from "libs/util";
import {LsName, PageName,BusName} from "@/Constant";
import API from "@/service";
import Bus from '@/plugin/bus'

let watchPassPluginPassTimer;// 晋商密码控件轮询计时器标志


/**
 * 用于不同银行登录
 * 包括密码控件的一些方法个例方法
 */
export default {
  data() {
    return {
      rePass: true, //密码框
    }
  },
  created() {
    clearInterval(watchPassPluginPassTimer)
  },
  mounted() {
    if (this.ORG_ID == '70') {
      // 晋商银行密码控件需要轮询获取密码长度
      this.watchPassPluginPass()
      this.watchPassPlugin()
    }
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(watchPassPluginPassTimer)
    next()
  },
  methods: {
    /**
     * 控制登录走向 ORG_ID前后端约定。银行的唯一标示
     */
    loginFactory(ORG_ID) {
      switch (ORG_ID) {
        case '70': //
          this.doLogin_JINSHANG();
          break;
        default:
          // 银行id获取异常
      }
    },
    /**
     * 晋商银行相关
     */
    doLogin_JINSHANG() {
      clearInterval(watchPassPluginPassTimer)
      if (util.Check.tel(this.tel, true)) return
      let pass = $('#login_loginPass').$getCiphertext()
      let lengths = $('#login_loginPass').$getCiphertext()
      if (util.Check.loginPassLen(lengths, true)) return
      let data = {
        PHONE_NUM: this.tel,
        BANK_LOGIN_PW: pass
      }
      let SOURCE_URL = util.storage.session.get(LsName.loginType)
      // util.storage.session.remove(LsName.token)
      this.$store.commit('SET_TOKEN','')
      API.login(data, (res) => {
        API.watchApi({
          FUNCTION_ID: 'ptb0A007', // 点位
          REMARK_DATA: '异业合作-登录', // 中文备注
          SOURCE_URL: SOURCE_URL
        })

        util.storage.session.set(LsName.reload, true)  // 每次在调用密码框时进行植入标签，下次碰到密码框页面时进行校验刷新
        util.storage.session.remove('loginInfo')
        let type = res.HAS_GRADE
        util.storage.session.set(LsName.HAS_GRADE, type)
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
        this.$store.commit('SET_TOKEN','')
        util.storage.session.set('loginInfo', {
          PHONE_NUM: this.tel,
          msg: err
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
    /**
     * 郑州银行
     */
    doLogin_ZHENGZHOU() {

    },


  }
}

