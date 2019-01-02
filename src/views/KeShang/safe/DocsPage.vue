<template>
  <div class="page">
    <div v-html="docs" class="docs" v-if="docs"></div>
    <div class="iframs-docs" v-if="agreeMentSrc">
      <!--<h1 v-if="title">{{title}}</h1>-->
      <iframe :src="agreeMentSrc" class="indocs"></iframe>
    </div>
    <div class="btn">
      <button @click="getCode">确认</button>
    </div>
  </div>
</template>
<script>
  import API from "@/service";
  import {HOST_API} from "@/Constant";

  export default {
    name: "DocsPage",
    data() {
      return {
        docs: '',
        agreeMentSrc: '',
        title: ''
      }
    },
    created() {
      let type = this.$route.query.type
      this.getAgreement(type)

    },

    methods: {
      getAgreement(type) {
        if (type == 'buy') {
          window.document.title = '产品服务协议'
          this.getBuyAgreementByAjax()
        }
        if (type == 'recharge') {
          this.getRechargeAgreementByAjax()

          // this.agreeMentSrc = HOST_API + '/static/finsuit/bank/zzh/cz.html'
        }
        if (type == 'open') {
          this.getOpenAgreementByAjax()
        }
        if (type == 'redeem') {
          this.getRedeemAgreementByAjax()
        }
        if (type == 'privacy') {
          this.getPrivacyAgreementByAjax()
        }
      },
      getRechargeAgreementByAjax() {
        // TYPE
        // ORG_ID
        // USER_NAME
        // USER_CARD_ID
        let rechargeData = this.getComState.rechargeData
        console.log(rechargeData);
        let data = {
          USER_NAME: rechargeData.USER_NAME,
          USER_CARD_ID: rechargeData.USER_CARD_ID,
        }
        API.doc.rechargeAgreement(data, res => {
          this.title = res.AGREEMENT
          this.agreeMentSrc = HOST_API + res.URL
        })
      },
      getRedeemAgreementByAjax() {
        // TODO
        let redeem = this.getComState.redeemData
        let data = {
          // USER_NAME	身份证姓名
          // ACCOUNT	账号众邦二类户
          // TRADE_DATE	交易日期
          // DATE_VALUE	每笔交易起息日期
          // AMOUNT_PURCHASE	每笔购买金额
          USER_NAME: this.redeem.USER_NAME,
          ACCOUNT: this.redeem.BANK_USER_CODE,
          TRADE_DATE: '',
          DATE_VALUE: '',
          AMOUNT_PURCHASE: ''
        }
        API.doc.fixedTimeDepositAgreement(data)
      },
      getBuyAgreementByAjax() {
        let data = {}
        API.doc.personalAccountServiceAgreement(data, res => {
          this.title = res.AGREEMENT
          this.agreeMentSrc = HOST_API + res.URL
        })
      },
      getOpenAgreementByAjax() {
        let data = {}
        API.doc.electronicAccountAgreement(data, res => {
          this.title = res.AGREEMENT
          this.agreeMentSrc = HOST_API + res.URL
        })
      },
      getPrivacyAgreementByAjax() {
        let data = {
          InterfaceType: "1"
        }
        API.bicai.privacyAgreement(data, res => {
          this.docs = res[0].HTML_TEXT;
        }, err => {
          console.log(err)
        })
      },
      // getReCha
      cancel() {
        this.$router.go(-1)
      },
      getCode() {
        this.$router.go(-1)
      },

    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/px2rem";

  .page {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 100;
    box-sizing: border-box;

    h1 {
      text-align: center;
    }

    .docs {
      box-sizing: border-box;
      padding: 0 px2rem(10);
      width: 100%;
      height: 90%;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }

    .iframs-docs {
      box-sizing: border-box;
      padding: 0 px2rem(10);
      width: 100%;
      height: 90%;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;

      .indocs {
        border: none;
        width: 100%;
        height: 100%;
      }
    }

    .btn {
      padding-top: .2rem;
      text-align: center;

      button {
        background: #007aff;
        width: px2rem(80);
        height: px2rem(40);
        color: #fff;
      }
    }
  }


</style>
