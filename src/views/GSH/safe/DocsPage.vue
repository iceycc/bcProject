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
  // import {HOST_API} from "@/Constant";
  let HOST_API = ' http://47.94.110.156:9000/'
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
        // 
        if (type == 'recharge') {
          this.getRechargeAgreementByAjax()
        }
        // 银行的开户协议
        if (type == 'open') {
          this.openAnAccountAgreement()
        }
        // 开户的隐私协议 通用比财的
        if (type == 'privacy') {
          this.getPrivacyAgreementByAjax()
        }
      },
      async getRechargeAgreementByAjax() {
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

      async getBuyAgreementByAjax() {
        let data = {
          USER_NAME: this.getComState.idName
        }
        let res = await API.doc.personalAccountServiceAgreement(data)
        this.title = res.agreement
        this.agreeMentSrc = HOST_API + res.url
      },
      async openAnAccountAgreement() {
        let data = {}
        let res = await API.doc.openAnAccountAgreement(data)
        this.title = res.agreement
        this.agreeMentSrc = HOST_API + res.url
      },
      async getPrivacyAgreementByAjax() {
        let data = {
          InterfaceType: "1"
        }
        let res = await API.bicai.privacyAgreement(data)
        this.docs = res[0].HTML_TEXT;
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
