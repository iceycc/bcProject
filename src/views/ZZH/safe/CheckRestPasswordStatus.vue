<template>
  <div>
    <app-bar title="重置密码"></app-bar>
    <section class="m-form">
      <section class="m-line" @click="goNext">
        <span class="n-left">姓名</span>
        <span class="n-right">{{OLD_PASS}}</span>
      </section>
      <section class="m-line" @click="goNext">
        <span class="n-left">身份证号</span>
        <span class="n-right">{{NEW_PASS}}</span>
      </section>
      <section class="m-line" @click="goNext">
        <span class="n-left">电子账户</span>
        <span class="n-right">{{RE_NEW_PASS}}</span>
      </section>
      <section class="m-line" @click="goNext">
        <span class="n-left">审核状态</span>
        <span class="n-right">{{RE_NEW_PASS}}</span>
      </section>
      <section class="m-line" @click="goNext">
        <span class="n-left">原因</span>
        <span class="n-right">{{RE_NEW_PASS}}</span>
      </section>
      <section class="submit-box">
        <err-msg :errMsg="errMsg" classStyle="err-msg"></err-msg>
        <button class="submit-btn" @click="goNext">下一步</button>
      </section>
    </section>

  </div>
</template>

<script>
  import ActiveInput from '@/components/form/ActiveInput'
  import ErrMsg from '@/components/commons/ErrMsg'
  import API from "@/service";
  import Bus from '@/plugin/bus'
  import {PageName, BusName, LsName} from "@/Constant";
  import Mixins from "@/mixins";

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
    mixins: [Mixins.reloadByPassWordErr],
    mounted(){

    },
    methods: {
      goNext() {
        this.ifShow = true
      },

    },

  }
</script>

<style lang="scss" scoped>


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

</style>
