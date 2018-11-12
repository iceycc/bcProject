import util from "libs/util";
import {LsName, PageName, BusName} from "@/Constant";
import API from "@/service";
import Bus from '@/plugin/bus'
import store from '@/store'
import {ORG_ID_NUM} from '@/Constant'
let ORG_ID = store.getters.GET_ORG_ID
/**
 */
// todo 还没写
export default {
  data() {
    return {
      ORG_ID_NUM,
      ORG_ID,
      rePass: true, //密码框
    }
  },
  created() {
    console.log('郑州');
  },
  beforeRouteLeave(to, from, next) {
    next()
  },
  mounted() {
    console.log('mounted');
    // 晋商银行密码控件需要轮询获取密码长度

  },
  methods: {
    /**
     * 晋商银行相关
     */
    loginFactory() {
      if (util.Check.tel(this.tel, true)) return
      let pass = $('#login-page-password').getKBD()
      let lengths = $('#login-page-password').getLenKBD()
      if (util.Check.loginPassLen(lengths, true)) return
      let data = {
        PHONE_NUM: this.tel,
        BANK_LOGIN_PW: pass
      }
      // let SOURCE_URL = util.storage.session.get(LsName.loginType)
      let SOURCE_URL = store.getters.GET_COMMON_STATE.loginType
      // util.storage.session.remove(LsName.token)
      this.$store.commit('SET_TOKEN', null)
      API.login.apiLoginBank(data, (res) => {
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
  }
}

