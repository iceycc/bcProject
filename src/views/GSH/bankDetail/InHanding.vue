<template>
  <div class="app">
    <app-bar title="提现处理中记录"></app-bar>
    <div v-if="NOData">
      暂无数据
    </div>
    <ul class="i-main">
      <li v-for="item,index in list" :key="index">
        <div class="line"></div>
        <div class="i-info title">
          <span class="left">操作类型</span>
          <span class="right">{{item.TRANS_TYPE_NAME}}</span>
        </div>
        <div class="i-info">
          <span class="left">交易流水</span>
          <span class="right">{{item.SERIAL_NUMBER}}</span>
        </div>
        <div class="i-info">
          <span class="left">操作时间</span>
          <span class="right">{{item.OPERA_TIME}}</span>
        </div>
        <div class="i-info">
          <span class="left">操作金额</span>
          <span class="right" style="color: #E62224">{{item.TRANS_AMOUNT}}</span>
        </div>
        <div class="i-info">
          <span class="left">充值帐号</span>
          <span class="right">{{item.BANK_CAR_NO}}</span>
        </div>
        <div class="i-info">
          <span class="left">操作状态</span>
          <span class="right" style="color: #FF8220">{{item.STATUS_NAME}}</span>
        </div>
      </li>
    </ul>
    <div class="i-footer">
      <p>有疑问，请拨打众邦银行热线</p>
      <a :href="'tel:'+ tel">{{tel}}</a>
      <p>工作日<span>9:00-20:00</span>节假日<span>9:00-18:00</span></p>
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
        list: []
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        // apiQueryProcessing
        let data = {}
        API.common.apiQueryProcessing(data, res => {
          if (res.RES_PROCDDING_LIST && res.RES_PROCDDING_LIST.length > 0) {
            this.NOData = false
            this.list = res.RES_PROCDDING_LIST

          } else {
            this.NOData = true
            this.list = []
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/assets/px2rem";

  .app {
    width: 100%;
    height: 100%;
    background: #f6f6f9;
  }

  .i-main {
    background: #f6f6f9;
    width: 100%;
    padding: px2rem(10) 0;
    li {
      margin-bottom: px2rem(10);
    }
    .i-info {
      background: #fff;
      width: 100%;
      display: flex;
      font-size: px2rem(16);
      height: px2rem(44);
      line-height: px2rem(44);
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

  .i-footer {
    padding: px2rem(30) 0;
    background: #f6f6f9;
    text-align: center;
    font-size: px2rem(12);
    a, span {
      color: #007aff;
    }
  }
</style>
