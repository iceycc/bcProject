<template>
  <div>
    <app-bar title="购买"></app-bar>
    <div class="buysuccessimg">
      <img src="@/assets/images/Verificationsuccess@2x.png" alt="">
      <p class="p-first">购买成功</p>
      <!--todo-->
      <p v-if="false" class="p-second">拼团成功，持有30天，享受额外+2%收益</p>
    </div>
    <div class="buysuccessdetail">
      <div class="buysuccessdetails">
        <div class="buysuccessdetailleft">理财产品名称</div>
        <div class="buysuccessdetailright">{{datas.PRD_NAME}}</div>
      </div>
      <div class="buysuccessdetails">
        <div class="buysuccessdetailleft">交易银行</div>
        <div class="buysuccessdetailright">{{datas.ORG_NAME}}</div>
      </div>
      <div class="buysuccessdetails">
        <div class="buysuccessdetailleft">购买金额</div>
        <div class="buysuccessdetailright">{{datas.PAY_AMOUT}}元</div>
      </div>
      <div class="buysuccessdetails">
        <div class="buysuccessdetailleft">交易申请日期</div>
        <div class="buysuccessdetailright">{{datas.PAY_DATE}}</div>
      </div>
      <div class="buysuccessdetails">
        <div class="buysuccessdetailleft">预期开始收益日期</div>
        <div class="buysuccessdetailright">{{datas.INC_DATE}}</div>
      </div>
      <div class="buysuccessdetails">
        <div class="buysuccessdetailleft">交易流水号</div>
        <div class="buysuccessdetailright">{{datas.BESHARP_SEQ}}</div>
      </div>

    </div>
    <div class="btn">
      <span @click="goMyAssets" class="begain">查看我的资产</span>
      <span @click="goBuyOther" class="begain">购买其它产品</span>
    </div>
    <div v-if="FromH5Active" class="share" @click="share">获得不错，分享好友吧</div>
  </div>
</template>
<script>
  import {WatchApi} from "@/service";
  import {BusName, PageName} from "@/Constant";
  import Mixins from "@/mixins";

  export default {
    mixins: [Mixins.StoreMixin],
    data() {
      return {
        datas: {},
        downUrl: 'http://www.baidu.com',
        FromH5Active:false
      }
    },
    created() {
      this.datas = this.getComState.buyData || {}
      this.FromH5Active= this.getComState.FromH5Active || true

      console.log(this.datas);
    },
    methods: {
      share() {

      },
      goMyAssets() {
        this.$router.push({name: PageName.BankDetail})
      },
      goBuyOther() {
        this.$router.push({name: PageName.ProductList})
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/px2rem";

  .buytitle {
    width: 92%;
    height: 1.7rem;
    border-top: 10px solid #F6F6F9;
    border-bottom: 0.5rem solid #F6F6F9;
  }

  .buytitleleft {
    display: inline-block;
    width: 50%;
    height: 100%;
  }

  .buytitleright {
    float: right;
    width: 50%;
    height: 100%;
  }

  .header {

    height: 1.3rem;
    line-height: 1.3rem;
    font-size: 0.4rem;
  }

  .header p {
    text-align: center;
    font-size: 0.5rem;
  }

  .buysuccessimg {
    text-align: center;
    margin-top: .6rem;
    img {
      width: 2.5rem;
      height: 2.5rem;
    }
    p.p-first {
      margin: px2rem(18) 0;
      font-size: px2rem(18);
      color: #2B74FE;
    }
    p.p-second {
      margin: 0.5rem 0;
      padding-bottom: 0.5rem;
      font-size: px2rem(13);
      color: #9199A1;
      border-bottom: 1px solid #EEEEF0;
    }
  }

  .buysuccessdetail {
    margin-top: -0.5rem;
    padding: 0 0.3rem;
  }

  .buysuccessdetails {
    line-height: px2rem(44);
    height: px2rem(44);
    font-size: px2rem(14);
    border-bottom: 1px solid #EEEEF0;
  }

  .buysuccessdetailleft {
    float: left;
    color: #9199A1
  }

  .buysuccessdetailright {
    float: right;
  }

  .xiazai {
    font-size: 0.4rem;
    color: #fff;
    background-color: #518BEE;
    border-radius: 0.2rem;
    line-height: 1.2rem;
    width: 80%;
    margin: 0 auto;
    text-align: center;
    margin-top: 1rem;
    border: 0px;
    outline: none;
  }

  .btn {
    margin-top: px2rem(20);
    text-align: center;
    .begain {
      margin: 0 px2rem(5);
      display: inline-block;
      color: #fff;
      background: #508CEE;
      border-radius: px2rem(6);
      font-size: px2rem(18);
      width: px2rem(160);
      height: px2rem(44);
      line-height: px2rem(44);
      text-align: center;
      border: 0px;
      outline: none;
    }
  }

  .share {
    padding-top: px2rem(20);
    text-align: center;
    font-size: px2rem(13);
    color: #508CEE;
  }
</style>
