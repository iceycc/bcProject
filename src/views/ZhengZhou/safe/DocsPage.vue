<template>
  <div class="page">
    <div v-html="docs" class="docs" v-if="docs"></div>
    <div class="iframs-docs" v-if="agreeMentSrc">
      <iframe :src="agreeMentSrc" class="indocs"></iframe>
    </div>
    <div class="btn">
      <mt-button type="primary" @click="getCode">确认</mt-button>
    </div>
  </div>
</template>
<script>
  import API from "@/service";
  import {HOST} from "@/Constant";

  export default {
    name: "DocsPage",
    data() {
      return {
        docs: '',
        agreeMentSrc: ''
      }
    },
    created() {
      let type = this.$route.query.type
      this.getAgreement(type)

    },
    methods: {
      getAgreement(type) {
        if (type == 'buy') {
          this.agreeMentSrc = HOST + '/static/finsuit/bank/zzh/kh1.html'
        }
        if (type == 'recharge') {
          this.agreeMentSrc = HOST + '/static/finsuit/bank/zzh/cz.html'
        }
        if (type == 'open') {
          this.agreeMentSrc = HOST + '/static/finsuit/bank/zzh/kh2.html'

        }
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
    position: relative;
    width: 100%;
    height: 100%;
    background: #fff;
    padding-top: .7rem;
    box-sizing: border-box;
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
      position: absolute;
      bottom: px2rem(10);
      left: px2rem(0);
      width: 100%;
      text-align: center;
      button {
        width: 3.5rem;
        margin-right: .4rem;
      }
    }
  }


</style>
