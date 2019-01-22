<template>
  <div class="app">
    <app-bar title="明细"></app-bar>
    <div v-if="NOData">
      暂无数据
    </div>
    <div class="i-main">
      <div class="detail">
        <div class="i-info">
          <span class="left">{{detailData.TYPE_NAME}}金额</span>
          <span class="right">{{detailData.TRANS_AMT | formatNum}}</span>
        </div>
        <div class="i-info">
          <span class="left">交易日期</span>
          <span class="right">{{detailData.OPERA_DATE}}</span>
        </div>
        <div class="i-info">
          <span class="left">交易流水号</span>
          <span class="right">{{detailData.ORDER_NUM}}</span>
        </div>
        <div class="i-info" v-if="detailData.BANLANCE">
          <span class="left">余额</span>
          <span class="right">{{detailData.BANLANCE}}</span>
        </div>
        <div class="i-info" v-if="detailData.COMM_TRANS_STATUS_DESC">
          <span class="left">摘要信息</span>
          <span class="right">{{detailData.COMM_TRANS_STATUS_DESC}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import API from "@/service";

  export default {
    name: "InHanding",
    data() {
      return {
        tel: '400-688-6868',
        NOData: false,
        list: [],
        detailData:{

        }
      }
    },
    created() {
      this.detailData = this.$route.query
      console.log(this.detailData);
    },
    methods: {
    }
  }
</script>

<style scoped lang="scss">


  .app {
    width: 100%;
    height: 100%;
  }

  .i-main {
    background: #f6f6f9;
    width: 100%;
    margin-top: px2rem(5);
    font-size: px2rem(14);
    /*border-bottom: 1px solid #aeaeae;*/
    .detail {
      margin-bottom: px2rem(10);
    }
    .i-info {
      background: #fff;
      width: 100%;
      display: flex;
      height: px2rem(40);
      line-height: px2rem(40);
      padding: 0 px2rem(20);
      box-sizing: border-box;
      .left {
        width: px2rem(100);
        color: #666;
      }
      .right {
        color: #333;
        text-align: right;
        flex: 1
      }
      &.title {
        height: px2rem(50);
        line-height: px2rem(50);
        border-bottom: 1px solid #ccc;
      }
    }
  }

</style>
