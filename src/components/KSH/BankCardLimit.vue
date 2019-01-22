<template>
  <div class="main">
    <div class="inner">
      <p class="title">银行限额</p>
      <div class="limit-box">
        <ul class="inner-ul">
          <li class="top">
            <span class="line1" style="color:#858E9F;">银行名称</span>
            <span class="line2">每笔限额(元)</span>
            <span class="line3">每日限额(元)</span>
            <!--<span class="line4">支持直销<br>银行充值</span>-->
          </li>
          <li v-for="bank in bankList">
            <span class="line1">{{bank.BANK_NAME}}</span>
            <span class="line2">{{bank.DAY_QUOTA | QUOTA_Filter}}</span>
            <span class="line3">{{bank.SINGLE_QUOTA | QUOTA_Filter}}</span>
            <!--<span class="line4">{{bank.CAN_RECHARGE==1?'是':'否'}}</span>-->
          </li>
        </ul>
        <p class="foot-dec">
          *实际转账限额如遇到临时调整，以发卡行最总设定为准
          *农业银行，民生银行，华夏银行，招商银行不支持直接通过直销银行发起转入，如果转账需要通过网上银行、手机银行等渠道向直销银行电子账户汇款，汇款时汇款银行卡户名与卡号，必须与直销银行绑定银行卡信息一致
        </p>
      </div>
      <img src="~@/assets/images/production/close@2x.png" alt="" class="close-icon" @click="clickHideHandle">
    </div>
  </div>
</template>

<script>
  import API from "@/service";

  export default {
    name: "BankCardLimit",
    data() {
      return {
        bankList: []
      }
    },
    filters: {
      QUOTA_Filter(val) {
        if (val == '-1') {
          return '无限额'
        } else {
          return val
        }
      }
    },
    created() {
      this.getBankLimitList()
    },
    methods: {
      clickHideHandle() {
        this.$emit('hideHandle')
      },
      getBankLimitList() {
        let data = {}
        API.common.apiGetBankCardLimit(data, res => {
          this.bankList = res.BANK_CARD_LIMIT_NO
        })

      }
    }
  }
</script>

<style scoped lang="scss">


  .main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: rgba(1, 1, 1, 0.4);
    padding-top: px2rem(50);
    z-index: 10;


    .foot-dec {
      color: #FF5B05;
      font-size: px2rem(12);
      padding: px2rem(10) px2rem(10) px2rem(30);
    }

    .inner {
      position: relative;
      margin: 0 auto;
      width: px2rem(335);
      background: #fff;
      border-radius: px2rem(10);

      .close-icon {
        position: absolute;
        top: px2rem(10);
        right: px2rem(10);
        width: px2rem(20);
        height: px2rem(20);
        z-index: 10;
      }

      .limit-box {
        width: 100%;
        height: px2rem(547);
        overflow-y: scroll;
      }
    }

    .title {
      text-align: center;
      font-size: px2rem(18);
      color: #444;
      line-height: 3;
    }

    .inner-ul {
      text-align: center;

      .top {
        font-size: px2rem(12);
        color: #858E9F;
      }

      li {
        display: flex;
        border-bottom: 1px solid #E5E5E5;
        padding: px2rem(10) 0;

        span {
          flex: 1;
        }
      }

      .line1, .line4 {
        color: #444444;
        line-height: 1.2;
      }

      .line1 {
        padding: 0 px2rem(4);
      }

      .line2, .line3 {
        line-height: 1.2;
        color: #858E9F;
      }
    }
  }
</style>
