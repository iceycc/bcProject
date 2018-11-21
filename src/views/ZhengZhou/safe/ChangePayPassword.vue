<template>
  <div>
    <app-bar title="重置密码"></app-bar>
    <section class="m-form">
      <section class="m-line" @click="goNext">
        <span class="n-left">原密码</span>
        <span class="n-right">{{OLD_PASS}}</span>
      </section>
      <section class="m-line" @click="goNext">
        <span class="n-left">新密码</span>
        <span class="n-right">{{NEW_PASS}}</span>
      </section>
      <section class="m-line" @click="goNext">
        <span class="n-left">重复新密码</span>
        <span class="n-right">{{RE_NEW_PASS}}</span>
      </section>
      <section class="submit-box">
        <err-msg :errMsg="errMsg" classStyle="err-msg"></err-msg>
        <button class="submit-btn" @click="goNext">下一步</button>
      </section>
    </section>
    <div v-show="ifShow" class="bgbox">
      <div class="passbox">
        <div class="top">
          <p class="title">
            <img src="@/assets/images/icon_dunpai@2x.png" alt="">
            由郑州银行提供技术保障</p>
          <div class="field_row_wrap">
            <p class="field_row_key">
              原密码
            </p>
            <div class="field_row_value">
              <pass-word-zhengzhou
                BankCardPass="payPasscc1"
              ></pass-word-zhengzhou>
            </div>
            <p class="info">密码由6位数字组成</p>
          </div>

          <div class="field_row_wrap">
            <p class="field_row_key">
              新密码
            </p>
            <div class="field_row_value">
              <pass-word-zhengzhou
                BankCardPass="payPasscc2"
              ></pass-word-zhengzhou>
            </div>

            <p class="info">密码由6位数字组成</p>
          </div>
          <div class="field_row_wrap">
            <p class="field_row_key">
              重复新密码
            </p>
            <div class="field_row_value">
              <pass-word-zhengzhou
                BankCardPass="payPasscc3"
              ></pass-word-zhengzhou>
            </div>

            <p class="info">密码由6位数字组成</p>
          </div>

        </div>
        <div class="btn">
          <button @click="cancel">取消</button>
          <button @click="submit">确定</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import ActiveInput from '@/components/commons/ActiveInput'
  import ErrMsg from '@/components/commons/ErrMsg'
  import API from "@/service";
  import Bus from '@/plugin/bus'
  import {PageName, BusName, LsName} from "@/Constant";
  import util from "libs/util";
  import Mixins from "@/mixins";
  import PassWordZhengzhou from '@/components/password/PassInputZhengZhouForMore'

  export default {
    name: "ResetPayPassword",
    components: {
      ActiveInput,
      ErrMsg,
      PassWordZhengzhou
    },
    data() {
      return {
        OLD_PASS: "请输入原密码",
        NEW_PASS: "请输入新密码",
        RE_NEW_PASS: "请重复新密码",
        ifShow: false,
        errMsg: ''
      }
    },
    mixins: [Mixins.HandleMixin],
    mounted(){
      $('#PWDKBD').remove();
      $(window).loadKBD();
    },
    methods: {
      showErrMsg(err){
        setTimeout(()=>{
          this.errMsg = err
        },1000)
      },
      goNext() {
        this.ifShow = true
      },
      cancel() {
        this.ifShow = false
      },
      showErrMsg(msg) {
        this.errMsg = msg;
        setTimeout(() => {
          this.errMsg = '';
        }, 2000)
      },
      submit() {
        let oldPass = {
          pass: $("#payPasscc1").getKBD() + '', //获取密码
          len: $("#payPasscc1").getLenKBD() + '',//获取密码长度
          passFix: $("#payPasscc1").getBDCode() + '' //
        }
        let newPass = {
          pass: $("#payPasscc2").getKBD() + '', //获取密码
          len: $("#payPasscc2").getLenKBD() + '',//获取密码长度
          passFix: $("#payPasscc2").getBDCode() + '' //
        }
        let reNewPass = {
          pass: $("#payPasscc3").getKBD() + '', //获取密码
          len: $("#payPasscc3").getLenKBD() + '',//获取密码长度
          passFix: $("#payPasscc3").getBDCode() + '' //
        }
        console.log(oldPass);
        console.log(newPass);
        console.log(reNewPass);
        // PASSWD
        // 原密码
        // NEW_PASSWD
        // 新密码
        // CONFIRM_PASSWD
        // 确认新密码
        // PREFIX
        // 密码键盘唯一主键不能为空

        let data = {
          PASSWD:oldPass.pass,
          NEW_PASSWD:newPass.pass,
          CONFIRM_PASSWD:reNewPass.pass,
          PREFIX:reNewPass.passFix
        }
        API.safe.modifyTradePassword(data,res=>{
          Bus.$emit(BusName.showToast,'更换密码成功')
        },err=>{
          this.showErrMsg(err)
          this.ifShow = false
        })
      },
    },

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/px2rem";

  .m-form {
    width: 100%;
    box-sizing: border-box;
    padding: 0 px2rem(20);
  }

  .m-line {
    display: flex;
    box-sizing: border-box;
    line-height: px2rem(42);
    background-size: 0.7rem 0.7rem;
    border-bottom: 1px #E5E5E5 solid;
    font-size: px2rem(14);
    .n-left {
      flex: 1;
    }
    .n-right {
      color: #8e8e8e
    }
  }

  .slot {
    position: absolute;
    display: inline-block;
    z-index: 3;
    right: 0;
    top: auto !important;
    bottom: px2rem(8);
    border: 1px solid #2B74FE;
    color: #2B74FE;
    width: px2rem(80);
    height: px2rem(25);
    border-radius: px2rem(6);
  }

  .submit-box {
    position: relative;
    padding-top: px2rem(60);
  }

  .submit-btn {
    display: block;
    font-size: px2rem(16);
    color: #fff;
    background-color: #508CEE;
    border-radius: px2rem(4);
    line-height: 1rem;
    width: px2rem(255);
    height: px2rem(44);
    margin: 0 auto;
    text-align: center;
    border: none;
    outline: none;
  }

  .err-msg {
    position: absolute;
    top: px2rem(0);
    left: 50%;
    transform: translateX(-50%);
  }

  .foot-text {
    color: #8e8e8e;
    padding-top: px2rem(20);
  }

  .bgbox {
    width: 100%;
    height: 100%;
    background: rgba(1, 1, 1, .7);
    position: absolute;
    padding-top: px2rem(40);
    top: 0;
    left: 0;
    z-index: 3;
    .passbox {
      background: #fff;
      width: 80%;
      margin: 0 auto;
      box-sizing: border-box;
    }
    .top {
      padding: 0.4rem;
    }
    .field_row_key {
      font-size: 0.4rem;
    }
    .title {
      margin-bottom: 0.5rem;
      text-align: center;
      font-size: 0.4rem;
      color: #666;
      height: .6rem;
      line-height: .6rem;
      img {
        vertical-align: top;
        width: .5rem;
      }
    }
    .field_row_wrap {
      margin-bottom: 0.2rem;
    }
    .field_row_value {
      border-radius: px2rem(4);
      border: 1px solid #DDD;
      height: px2rem(34);
      line-height: px2rem(34);
      padding-left: px2rem(3);
      margin: 0.2rem 0;
    }
    .info {
      font-size: 0.3rem;
      line-height: 0.6rem;
      color: #aeaeae;
    }
    .btn {
      border-top: 1px solid #efefef;
      padding: px2rem(14) 0;
      display: flex;
      button {
        color: #108EE9;
        font-size: px2rem(17);
        margin: 0 .3rem;
        text-align: center;
        flex: 1;
      }
    }
  }
</style>
