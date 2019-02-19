<template>
  <div class="m-main">
    <app-bar title="可用余额" class="m-header"></app-bar>
    <section class="m-top">
      <p class="u-title">可用余额（元）</p>
      <p class="u-content">￥{{ACC_REST  | preLcAssetFilter}}<i>{{ACC_REST | formatNum |
        lastLcAssetFilter}}</i></p>
    </section>
    <section class="m-list">
      <section class="m-li" @click="goPage('Recharge')">
        <span>充值</span>
        <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
      </section>
      <section class="m-li" @click="goPage('Withdraw')">
        <span>提现</span>
        <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
      </section>
      <section class="m-li" @click="goPage('DealDetails')">
        <span>明细查询</span>
        <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
      </section>
    </section>
  </div>
</template>

<script>
  import {LsName, PageName} from "@/Constant";
  import BankBalanceMixins from "./BankBalance";
  import {IconFont} from '@/components'
  export default {
    name: "bankBalance",
    components: {
      IconFont
    },
    data() {
      return {
        ACC_REST: '0.00',
        WITH_DRAWABLE_CASH:''
      }
    },
    mixins: [BankBalanceMixins],
    filters: {
      preLcAssetFilter(val) {
        if (!val) return ''
        return val.slice(0, val.length - 2)
      },
      lastLcAssetFilter(val) {
        if (!val) return ''
        return val.slice(val.length - 2, val.length)
      }
    },
    created() {
      this.getBankDetail()
    },
    methods: {
      goPage(page) {
        let query = {}
        this.setComState({type: 'OriginPage', value: this.$route.fullPath})
        if (page == 'Withdraw') {
          query = {
            ACC_REST: this.ACC_REST,// 可用余额
          }
        }
        console.log(page);
        this.$router.push({
          name: page,
          query
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  i {
    font-style: normal;
  }

  .m-main {
    height: 100%;
    background: #f6f6f6;
  }

  .m-header {
    position: relative;
    z-index: 10;
  }

  .m-top {
    width: 100%;
    height: px2rem(120);
    background: url("~@/assets/images/OvalCopy.png") no-repeat center center;
    padding-left: px2rem(25);
    padding-top: px2rem(25);
    box-sizing: border-box;
    .u-title {
      font-size: px2rem(14);
      color: #fff;
      opacity: 0.79;
    }
    .u-content {
      font-size: px2rem(40.32);
      color: #fff;
      i {
        font-size: px2rem(28.8);
      }

    }
  }

  .m-list {
    background: #fff;
    .m-li {
      box-sizing: border-box;
      padding: 0 px2rem(10);
      display: flex;
      font-size: px2rem(14);
      color: #333;
      height: px2rem(50);
      line-height: px2rem(50);
      border-bottom: 1px solid #f6f6f6;
      &:last-child {
        border-bottom: none;
      }
      span {
        flex: 1
      }
    }
  }

</style>
