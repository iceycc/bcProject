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
          util.storage.session.set('USERINFO', res)
          this.$router.push({name: PageName.Opening1})
        }
        if (step == 1) {
          // this.$store.commit('SET_OPENING_DATA', res)
          util.storage.session.set('USERINFO', res)
          this.$router.push({name: PageName.Opening2})
        }
        if (step == 2) {
          // this.$store.commit('SET_OPENING_DATA', res)
          util.storage.session.set('USERINFO', res)
          this.$router.push({name: PageName.Opening3})
        }
        if (step == 3) {
          // todo登陆成功后判断拿来的去哪里
          // this.$router.push({name:PageName.Opening3})
        }

      })
    },
    /**
     * 通过身份证  注册回显是否成功
     */
    checkID(fn) {
      // let data = {
      //   ORG_ID:'49',
      //   ID_NUMBER:this.data.USER_CARD_ID,
      // }
      // API.open.apiGetUserLastCompleteStep(data,res=>{
      //   let step = res.LAST_STEP_NUM
      //   let REQ_SERIAL = res.REQ_SERIAL|| ''
      //   let PHONE_NUM = res.PHONE_NUM || '' // 改身份证是否有手机号回显
      //   console.log('步数 >>>', step);
      //   if (step == 0) {
      //     // Bus.$emit(BusName.showToast,"欢迎注册")
      //     fn && fn(REQ_SERIAL, step)
      //   }
      //   if (step == 1) { //
      //     // fn && fn(REQ_SERIAL, step, PHONE_NUM)
      //     this.$router.push({
      //       name: PageName.Opening2,
      //       query: {
      //         REQ_SERIAL: REQ_SERIAL,
      //         LAST_STEP_NUM: step,
      //         PHONE_NUM: PHONE_NUM
      //       },
      //       params: {
      //         data: this.data,
      //       }
      //     })
      //   }
      //   if (step == 2) { // 跳转设置密码页
      //     Bus.$emit(BusName.showToast, "您已经实名成功")
      //     setTimeout(() => {
      //       this.$router.push({
      //         name: PageName.Opening3,
      //         params: {
      //           step
      //         },
      //         query: {
      //           REQ_SERIAL: REQ_SERIAL
      //         }
      //       })
      //     }, 600)
      //   }
      //   if (step == 3) {
      //     Bus.$emit(BusName.showToast, "您已经开户成功")
      //     setTimeout(() => {
      //       this.$router.push({
      //         name: PageName.Login,
      //       })
      //     }, 1000)
      //   }
      // })
    },
  }
}




