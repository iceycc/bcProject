<template>
  <div>
    <app-bar title="重置支付密码申请"></app-bar>
    <section class="chattuimg">
      <img v-if="showState==2" src="@/assets/images/Verificationsuccess@2x.png" class="img" alt="">
      <img v-if="showState!=2" src="@/assets/images/applying@2x.png" class="img" alt="">
      <h2>{{STATUS | statusFilter}}</h2>
    </section>
    <section class="m-form">
      <section class="m-line" @click="goNext">
        <span class="n-left">姓名</span>
        <span class="n-right">{{USER_NAME}}</span>
      </section>
      <section class="m-line" @click="goNext">
        <span class="n-left">身份证号</span>
        <span class="n-right">{{ID_CARD_NO}}</span>
      </section>
      <section class="m-line" @click="goNext">
        <span class="n-left">电子账户</span>
        <span class="n-right">{{ELECTRONIC_ACCOUNT}}</span>
      </section>
      <section class="m-line" @click="goNext">
        <span class="n-left">审核状态</span>
        <span class="n-right red">{{STATUS | statusFilter}}</span>
      </section>
      <section class="m-line" @click="goNext">
        <span class="n-left">原因</span>
        <span class="n-right red">{{STATUS | statusFilter}}</span>
      </section>
      <section class="submit-box" v-if="canClick">
        <err-msg :errMsg="errMsg" classStyle="err-msg"></err-msg>
        <button v-if="showState == 2" :disabled="!canClick" :class="{active:canClick}" class="submit-btn"
                @click="goNext">重置密码
        </button>
        <button v-if="showState == 3" :disabled="!canClick" :class="{active:canClick}" class="submit-btn"
                @click="goReApply">重新申请
        </button>
      </section>

      <section>

      </section>
    </section>

  </div>
</template>

<script>
  import ActiveInput from '@/components/commons/ActiveInput'
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
    },
    data() {
      return {
        showState: '1',
        USER_NAME: "",
        STATUS: "0",
        ID_CARD_NO: "",
        ELECTRONIC_ACCOUNT: '',
        REFUSE_REASON: '',
        ifShow: false,
        errMsg: ''
      }
    },
    filters: {
      statusFilter(val) {
        // // 1 审批中，2 审批通过，3 审核拒绝，4 验证码超时拒绝,5 其它待重新申请
        let str = '审核中'
        switch (val - 0) {
          case 1:
            str = '审批中'
            break;
          case 2:
            str = '审批通过'
            break;
          case 3:
            str = '审核拒绝'
            break;
          case 4:
            str = '验证码超时拒绝'
            break;
          case 5:
            str = '其它待重新申请'
            break;
        }
        return str
      }
    },
    computed: {
      // 审核状态
      //   1审批中，2审批通过，3审核拒绝，4验证码超时拒绝,5其它待重新申请

      canClick() {
        if (this.STATUS == 1) {
          // 1审批中
          this.showState = 1
          return false
        }
        else if (this.STATUS == 2) {
          // 2审批通过
          this.showState = 2
          return true
        }
        else if (this.STATUS == 3) {
          // 3审核拒绝
          this.showState = 3
          return true
        }
        else if (this.STATUS == 4) {
          // 4验证码超时拒绝
          this.showState = 3
          return true
        }
        else if (this.STATUS == 5) {
          // 5其它待重新申请
          this.showState = 3
          return true
        }
        else {
          return false
        }
      }
    },
    created() {
      let preData = this.getComState.resetPasswordStatus
      this.USER_NAME = preData.USER_NAME
      this.STATUS = preData.STATUS
      // this.STATUS = 5
      console.log(this.STATUS);
      this.ID_CARD_NO = preData.ID_CARD_NO
      this.ELECTRONIC_ACCOUNT = preData.ELECTRONIC_ACCOUNT
      this.REFUSE_REASON = preData.REFUSE_REASON
      this.setComState({type: 'FromStatus', value: true})
    },
    mixins: [Mixins.HandleMixin],
    methods: {
      goNext() {
        this.$router.push({name: PageName.ResetPayPassword})
      },
      goReApply() {
        this.$router.push({name: PageName.ResetPayPasswordApply})
      }
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
    background-color: #ccc;
    border-radius: px2rem(4);
    line-height: 1rem;
    width: px2rem(255);
    height: px2rem(44);
    margin: 0 auto;
    text-align: center;
    border: none;
    outline: none;
    &.active {
      background-color: #508CEE;
    }
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

  .red {
    color: #d20 !important;
  }

  .chattuimg {
    .img {
      width: px2rem(70);
    }
    margin-top: px2rem(50);
    text-align: center;
    h2 {
      font-size: px2rem(18);
      margin: px2rem(20) 0;
    }
  }

</style>
