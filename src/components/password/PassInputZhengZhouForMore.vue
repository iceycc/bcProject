<template>
  <div class="dry-style-title" style="height: 100%;width: 100%">
    <div :id="BankCardPass+'_Pwd_Area'" class="pwd-area">
      <!--action:设置-->
      <div :id="BankCardPass" class="pwd-box"
           placeholder="请输入登录密码"
           tabindex="1"
           kbdtype="Number"
           action="http://192.168.100.100:11020/getPasswordKeyboard"
           modulus-hex="8e33dd35128b9ff1262e22948e7130349ab949f4e64d8476fda0ee6de00ed48536e232f39ab1b0d5118553b4d8e2b303a372e03451246155f357b846ab70e87c122a5c66fb05f92fca8c6db71c01ea2cde5de29790e035d85170b12f5df60fce19e32856d1ec9598a3f73c86d07cd7136e58529581dde7792ee47c7f00929e45"
           readonly="readonly">
        输入密码
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "PassInput",
    data() {
      return {}
    },
    props: {
      BankCardPass: {
        type: null,
        default: 'password_id'
      },
      kbdtype:{
        type:null,
        default:'Number'
      }
    },
    activated(){},
    mounted() {
      // todo 密码控件！！
      console.log('mounted pwd');
      // $('#PWDKBD').remove();
      // $(window).loadKBD();
      let _this = this
      $("#" + this.BankCardPass).on('click', function () {
        $(this).attr('title', '输入密码');
        $(this).showKBD({
          "areaId": _this.BankCardPass + '_Pwd_Area',//必须
          "pageId": _this.BankCardPass,//非必须
          "minLen": 0,
          "maxLen": 6,
          "cursor": true,
          "mask": true,
        });
      });
      // var passwd = $("#login_Reg_Pwd").getKBD(); //获取密码
      // var passwdLen = $("#login_Reg_Pwd").getLenKBD(); //获取密码长度
    }
  }
</script>

<style lang="scss" scoped>
  .dry-style-title {
    width: 100%;
    height: 100%;
  }

  .pwd-area {
    width: 100%;
    height: 100%;
  }

  .pwd-box {
    width: 100%;
    height: 100%;
  }
</style>
