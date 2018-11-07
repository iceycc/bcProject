<template>
  <div id="login_Pwd_Area" class="pwd-area">
    <!--action:设置-->
    <div id="login_Reg_Pwd" class="pwd-box"
         placeholder="请输入登录密码"
         tabindex="1"
         kbdtype="Alnum"
         action="http://192.168.100.100:11020/getPasswordKeyboard"
         modulus-hex="8e33dd35128b9ff1262e22948e7130349ab949f4e64d8476fda0ee6de00ed48536e232f39ab1b0d5118553b4d8e2b303a372e03451246155f357b846ab70e87c122a5c66fb05f92fca8c6db71c01ea2cde5de29790e035d85170b12f5df60fce19e32856d1ec9598a3f73c86d07cd7136e58529581dde7792ee47c7f00929e45"
         readonly="readonly">
    </div>
  </div>
</template>
<script>
  import Bus from '@/plugin/bus/index'
  import {HOST, LsName} from "@/Constant";
  let base_url = HOST + '/openapi/jsBankPsw/getJpPsw'
  export default {
    name: "PassInput",
    props: ['inputID', 'doGetData', 'pass', 'refur'],
    props: {
      inputID:null,
      doGetData:null,
      pass:null,
      refur:null,
      text:{
        type:null,
        default:'请输入密码'
      }
    },
    data() {
      return {
        toUrl: "",
        passValue: '',
        show: true,
        DeviceId:'',
        iptId:''
      }
    },
    beforeDestroy(){
      this.iptId = ''
    },
    created() {
      this.iptId = this.inputID
      console.log(this.inputID + '>> 创建了')
      this.DeviceId = this.$store.getters.GET_ACCOUNT_STATE.DEVICE_ID
    },
    activated(){
      this.iptId = this.inputID
    },
    watch: {
      doGetData(newVal, oldVal) {
        if (newVal != oldVal) {
          this.postPass()
        }
      },
      refur(newVal, oldVal) {
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    },
    mounted() {
      this.toUrl = base_url + '?orgId=' + 70 + "&isPasswd=" + true + "&deviceId=" + this.DeviceId + "&width="
      this.getPass()
    },
    destroy(){
      this.toUrl = ''
      this.passValue = ''
      this.DeviceId = ''

    },
    methods: {
      getKey(id) {
        $(`#${id}`).attr('v-password-widget', this.toUrl)
        $(`#${id}`).PasswordWidget()
      },
      getPass() {
        this.getKey(this.inputID)
      },
      postPass() {
        let pass = $(`#${this.inputID}`).$getCiphertext() || ''
        let len = $(`#${this.inputID}`).$getPasswordLength() || 0
        let data = {
          pass, len
        }
        Bus.$emit(this.inputID, data)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>