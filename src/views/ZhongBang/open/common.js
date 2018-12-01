import API from "@/service";
import Bus from "@/plugin/bus"
import {PageName, BusName} from "@/Constant";
import util from "libs/util";

export default {
  data() {
    return {}
  },
  created() {
  },
  methods: {
    transformDATA(data = "2016.10.14-2026.10.14") {
      data = '2016.10.14-2026.10.14'
      if (!data) return ''
      return {
        STA: data.split('-')[0],
        END: data.split('-')[1]
      }
    },
    // 通过token + orgID 检查在本行开户状态
    checkBankStatus(fn) {
      let data = {}
      API.common.apiRegisterBackShow(data, res => {
        let step = res.LAST_STEP_NUM
        console.log('step', step);
        // （0未提交，1提交第一步，2提交第二步，3提交第三步）
        this.setComState({type: 'openingData', value: res})
        if (step == 0) {
          // this.$store.commit('SET_OPENING_DATA', res)
          // util.storage.session.set('USERINFO', res)
          this.$router.push({name: PageName.Opening1})
        }
        else if (step == 1) {
          // this.$store.commit('SET_OPENING_DATA', res)
          // util.storage.session.set('USERINFO', res)
          this.$router.push({name: PageName.Opening2})
        }
        else {
          Bus.$emit(BusName.showToast,'你已经开户成功')
          setTimeout(()=>{
            this.$router.push({name:PageName.Login})
          },400)
        }
      })
    },
    /**
     * 通过身份证  注册回显是否成功
     */
    checkID(fn) {

    },
  }
}




