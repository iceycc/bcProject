<template>
  <div class="page">
    <div v-html="docs" class="docs" v-if="docs"></div>
    <div class="iframs-docs" v-if="agreeMentSrc">
      <!--<h1 v-if="title">{{title}}</h1>-->
      <iframe :src="agreeMentSrc" class="indocs"></iframe>
    </div>
    <!--<div class="btn">-->
    <!--<button @click="getCode">确认</button>-->
    <!--</div>-->
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
      async getRechargeAgreementByAjax() {
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
        let res = await API.doc.rechargeAgreement(data)
        this.title = res.AGREEMENT
        this.agreeMentSrc = HOST_API + res.URL
      },
      getRedeemAgreementByAjax() {

      },
      async getBuyAgreementByAjax() {
        let data = {
          USER_NAME: this.getComState.idName
        }
        let res = await API.doc.personalAccountServiceAgreement(data)
        this.title = res.AGREEMENT
        this.agreeMentSrc = HOST_API + res.URL
      },
      async getOpenAgreementByAjax() {
        let data = {}
        let res = await API.doc.electronicAccountAgreement(data)
        this.title = res.AGREEMENT
        this.agreeMentSrc = HOST_API + res.URL
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
      height: 100%;
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
