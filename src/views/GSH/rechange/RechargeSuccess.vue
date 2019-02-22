<template>
  <div>
    <app-bar title="充值"></app-bar>
    <com-deal-result>
      <section slot="resImg">
        <img src="@/assets/images/Verificationsuccess@2x.png" class="img" alt="">
      </section>
      <section slot="resMsg">
        <p class="msg1">充值成功</p>
        <section class="m-card">
          <p><span class="r-left">提现金额</span><span class="r-right">{{data.amount  | formatNum}}</span></p>
          <p><span class="r-left">交易流水号</span><span class="r-right">{{data.apiPackSeq}}</span></p>
        </section>
      </section>
      <section slot="resBtn">
        <button v-if="ORIGIN_PAGE=='buying'" class="begain" @click="goBuyNext">继续购买</button>
        <button v-if="!ORIGIN_PAGE  " class="begain" @click="goProList">购买产品</button>
        <button v-if="!ORIGIN_PAGE" class="begain write" @click="goBalance">查看余额</button>
      </section>
    </com-deal-result>

  </div>
</template>
<script>
  import {LsName} from "@/Constant";
  import {PageName} from "@/Constant";
  import {ComDealResult} from '@/components'

  export default {
    data() {
      return {
        data: null,
        ORIGIN_PAGE: ''
      }
    },
    components: {ComDealResult},
    created() {
      this.data = this.$route.query
      this.ORIGIN_PAGE = this.$route.query.ORIGIN_PAGE || ''
    },
    methods: {
      goBuyNext() {
        this.$router.go(-2)
      },
      goBank() {
        this.$router.go(-2)
      },
      goProList() {
        this.$router.push({name: PageName.ProductList})
      },
      goBalance() {
        this.$router.push({
          name: PageName.BankDetail
        })
      }

    }
  }
</script>

<style lang="scss" scoped>


  .msg1 {
    text-align: center;
    color: #508CEE;
    font-size: px2rem(18);
  }

  .m-card {
    font-size: px2rem(14);
    color: #9199A1;
    border-top: 1px solid #eeeef0;
    margin-top: px2rem(20);

    p {
      display: flex;
      border-bottom: 1px solid #eeeef0;
      height: px2rem(44);
      line-height: px2rem(44);
      padding: 0 px2rem(20);
    }

    .r-left {
      width: px2rem(100);
    }

    .r-right {
      text-align: right;
      flex: 1;
    }
  }

  .fenxiangcontent {
    font-size: 0.4rem;
    color: #F22C17;
    margin-top: 1.5rem;
    padding: 0 0.9rem;
  }

  .begain {
    display: block;
    font-size: px2rem(16);
    background: #518BEE;
    border-radius: px2rem(6);
    width: px2rem(255);
    height: px2rem(44);
    color: #fff;
    text-align: center;
    margin: px2rem(30) auto;

    &.write {
      border: 1px solid #518BEE;
      background: #fff;
      color: #518BEE;
    }
  }
</style>
