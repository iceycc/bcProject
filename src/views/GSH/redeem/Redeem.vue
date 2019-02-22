<template>
  <div class="main">
    <app-bar title="提前支取"></app-bar>
    <div class="r-top">
      <img :src="imgSrc + redeemData.logoUrl" alt="">
      <div>
        <p>{{redeemData.orgName}}</p>
        <span>{{redeemData.prdName}}</span>
        <!--<span>{{redeemData.PRD_NAME}}</span>-->
        <!--<span>活期存款</span>-->
      </div>
    </div>
    <div class="r-cash">
      <div class="title">支取金额</div>
      <div class="money">
        <div class="number">
          <span class="money">¥{{redeemData.holdAmtDesc}}</span>
          <!-- <input type="tel" v-model="redeemData.holdAmt" :placeholder="placeholder"> -->
        </div>
      </div>
    </div>
    <submit-button class="submit-btn" text="提前支取" :canSubmit="true" @submit="submit"></submit-button>
  </div>
</template>
<script>
import API from "@/service";
import util from "@/libs/util";
import { PageName, BusName, LsName, imgSrc } from "@/Constant";
import Mixins from "@/mixins";
import Bus from "@/plugin/bus";
import { SubmitButton } from "@/components";
let time = 60;
let timer;
export default {
  data() {
    return {
      imgSrc,
      redeemData: {}
    };
  },
  computed: {
    // placeholder:'
    placeholder() {
      let num = this.redeemData.holdAmtDesc;
      return `最多可支取金额${num}元`;
    }
  },
  mixins: [Mixins.queryStatus],
  watch: {},
  created() {
    this.redeemData = this.getComState.redeemData; // 暂时注释掉
    // if(this.redeemData.prdType=="4"){

    // }
    //console.log(this.redeemData);
    // this.getInfo();
  },
  components: {
    SubmitButton
  },
  methods: {
    async submit() {
      let data = {
        prdIndexId: this.redeemData.prdIndexId, //	产品ID
        amount: this.redeemData.holdAmt, //	金额
        acCode: this.redeemData.orderNum, // 订单编号流水号
        ccy: this.redeemData.ccy ||'', //币种
        cashFlag: this.redeemData.cashExFlag||'', //钞汇标志,
        eithdrawAll: "1", //1全部0部分支取
        accNo:this.redeemData.accNo //账户
      };
      try {
        let res = await API.redeem.apiRedemption(data);
        // let res = null
        let params = {
          bizType: "7", // 购买
          reqSerial: res.reqSerial,
          apiPackSeq: res.apiPackSeq
        };
        try {
          // 轮询查询交易状态！！
          let qureyRes = await this.queryBizStatus(params, "正在支取中");
          console.log(qureyRes);
          if ("1" == qureyRes.resCode) {
            this.$router.push({
              // todo是否要跳转
              name: PageName.RedeemFailure,
              query: {
                err: qureyRes.resMsg
              }
            });
          } else if ("0" == qureyRes.resCode) {
            this.$router.push({
              name: PageName.RedeemSuccess,
              query: {
                amount: this.redeemData.holdAmtDesc, //	金额
                ...qureyRes
              }
            });
          } else {
          }
        } catch (e) {
          //console.log(e);
          this.$router.push({
            name: PageName.RedeemFailed,
            query: {
              err: e
            }
          });
        }
      } catch (err) {
        Bus.$emit(BusName.showToast, err);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
i {
  font-style: normal;
}

.main {
  width: 100%;
  height: 100%;
  background: #f5f5f9;
}

.r-top {
  height: px2rem(72);
  box-sizing: border-box;
  margin: px2rem(10) 0;
  display: flex;
  align-items: center;
  padding: px2rem(15) px2rem(20);
  background: #fff;

  img {
    width: px2rem(32);
    height: px2rem(32);
  }

  div {
    padding-left: px2rem(15);

    p {
      font-size: px2rem(14);
      color: #444444;
      padding-bottom: px2rem(4);
    }

    span {
      color: #666666;
    }
  }
}

.r-cash {
  height: px2rem(89);
  box-sizing: border-box;
  padding: px2rem(15) px2rem(20);
  background: #fff;

  .title {
    padding-bottom: px2rem(10);
    font-size: px2rem(14);
    color: #a4a9b0;
  }

  .money {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .number {
      position: relative;
      width: px2rem(250);
      font-size: px2rem(24);

      .money {
        color: #333;
      }

      .close-icon {
        position: absolute;
        display: inline-block;
        width: px2rem(15);
        height: px2rem(15);
        top: 50%;
        transform: translateY(-50%);
        right: px2rem(10);
      }

      input {
        width: 80%;
        font-size: px2rem(24);

        &::-webkit-input-placeholder {
          font-size: px2rem(14);
          color: #b3b3b3;
        }
      }
    }

    .all {
      color: #389cff;
      font-size: px2rem(14);
    }
  }
}

.submit-btn {
  margin-top: px2rem(60);
}
</style>

