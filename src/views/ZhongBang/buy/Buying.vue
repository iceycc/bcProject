<template>
  <div id="app" class="app">
    <app-bar title="购买"></app-bar>
    <div class="buytitle">
      <div class="buytitleleft">
        <div class="buytitleleftimg">
          <img :src="imgSrc+proDetail.logo" style="width:100%" alt="">
        </div>
        <div class="buytitleleftcontent">
          <p>{{proDetail.PRD_NAME}}</p>
          <p style="color:#666">理财产品</p>
        </div>
      </div>
      <div class="buytitleright">
        <p>起购金额{{proDetail.TXT_MIN_AMOUNT}}</p>
        <p>最小递增{{proDetail.INCRE_AMOUNT}}元</p>
      </div>
    </div>

    <div class="buysuccessdetails">
      <div class="buysuccessdetailleft">可用金额 <strong>{{payNum | formatNum}}元</strong></div>
      <div class="buysuccessdetailright" @click="goReChang">充值</div>
    </div>
    <div class="buydetails">
      <p style="margin-top: 0.3rem">购买金额</p>
      <span class="buydetailsmoney">￥</span>
      <input type="number" :placeholder="proDetail.TXT_MIN_AMOUNT" v-model="moneyNum">
    </div>
    <p style="font-size:0.3rem;padding:  0.4rem;color:#666">可投金额 {{proDetail.REMAIN_AMT | formatNum}}元</p>
    <button class="tijiao" @click="goBuy">购买</button>
    <p @click="agree =!agree"
       :class="{'bang':true,'no':agree == false}">我已阅读并同意注册
      <a style=" color:#0096FE;" href="javascript:;" @click.stop="getAgreement('S')">《投融资平台服务协议（投资人版）》</a>
      <a style=" color:#0096FE;" href="javascript:;" @click.stop="getAgreement('B')">《郑州商银行直销银行投融资协议》</a>
    </p>
  </div>
</template>
<script>
  import {PageName, BusName, imgSrc, LsName} from "@/Constant"
  import Bus from '@/plugin/bus'
  import API from "@/service"
  import Mixins from "@/mixins";

  export default {
    data() {
      return {
        proDetail: {},
        moneyNum: null,
        payNum: '1000',
        agree: true,
        imgSrc: imgSrc,
        INCRE_AMOUNT: ''
      }
    },
    mixins: [Mixins.HandleMixin,Mixins.StoreMixin],
    created() {
      this.getInfo()
      this.proDetail = this.getComState.goBuy // 数据
    },
    methods: {
      getInfo() {
        // 查询账户余额
        API.buy.apiQueryAccRest({}, res => {
          console.log(res);
          this.payNum = res.ACC_REST || 1000// 账户余额(可用余额)
          // this.payNum = 1000// 账户余额(可用余额)
        })
      },
      goReChang() {
        this.setComState({
          type:'OriginPage',
          value:this.$route.fullPath
        })

        this.$router.push({
          name: PageName.Recharge,
        })
      },
      getAgreement(type) {
        this.agree = true
        this.$router.push({
          name: PageName.DocsPage,
          query: {
            type,
            id: this.proDetail.id
          }
        })
      },
      checkMoneyNum(num) {
        let a = this.proDetail.INCRE_AMOUNT
        if (num < parseInt(this.proDetail.TXT_MIN_AMOUNT)) {
          Bus.$emit(BusName.showToast, '投资金额小于起投金额，请调整投资金额')
          return true
        } else if (num % a != 0) {
          Bus.$emit(BusName.showToast, '请输入递增金额的整数倍')
          return true
        } else {
          return false
        }
      },
      goBuy() {
        if (!this.agree) {
          Bus.$emit(BusName.showToast, '请同意相关协议')
          return
        }
        if (!this.moneyNum) {
          Bus.$emit(BusName.showToast, '请输入购买金额')
          return
        }
        if (typeof (this.moneyNum - 0) != 'number' || isNaN(this.moneyNum - 0)) {
          Bus.$emit(BusName.showToast, '请填写正确的金额')
          return
        }

        if (this.moneyNum - 0 > this.payNum) {
          Bus.$emit(BusName.showToast, '余额不足，请充值')
          return
        }
        if (this.checkMoneyNum(this.moneyNum)) {
          return
        }
        if (this.moneyNum - 0 > this.REMAIN_AMT) {
          Bus.$emit(BusName.showToast, '可投额度不足')
          return
        }

        this.Londing.open({
          spinnerType: 'triple-bounce'
        })
        setTimeout(() => {
          this.Londing.close()
        }, 500)

        this.$router.push({
          name: PageName.SureBuy,
          query: {
            money: this.moneyNum,
            PRD_NAME: this.proDetail.PRD_NAME,
            id: this.proDetail.id,
            ORG_NAME: this.proDetail.ORG_NAME,
            logo: this.proDetail.logo,
          }
        })

      }
    }
  }
</script>

<style lang="scss" scoped>
  body {
    margin: 0;
    padding: 0;
  }

  .buytitle {
    width: 92%;
    padding: 0.4rem 0.4rem;
    border-top: 10px solid #F6F6F9;
    border-bottom: 0.5rem solid #F6F6F9;
    display: flex;
    .buytitleleft {
      display: inline-block;
      flex: 1;
      .buytitleleftimg {
        vertical-align: middle;
        padding-top: 0.2rem;
        width: 1rem;
        display: inline-block;

      }
      .buytitleleftcontent {
        vertical-align: middle;
        padding-top: -0.5rem;
        display: inline-block;
        padding-left: 0.4rem;
        font-size: 0.35rem;
      }
    }

    .buytitleright {
      float: right;
      text-align: right;
      font-size: 0.35rem;
      color: #666;
    }
  }

  .buysuccessdetails {
    padding: 0 0.4rem;
    line-height: 1.5rem;
    height: 1.5rem;
    font-size: 0.4rem;
    border-bottom: 1px solid #EEEEF0;
  }

  .buydetails {
    padding: 0 0.4rem;
    height: 2.2rem;
    font-size: 0.4rem;
    border-bottom: 1px solid #EEEEF0;
  }

  .buydetailsmoney {
    width: 1rem;
    margin-top: 0.5rem;
    font-size: 0.6rem;
  }

  .buysuccessdetailleft {
    float: left;
  }

  .buysuccessdetailright {
    color: #468EE5;
    float: right;
  }

  input {
    width: 50%;
    border: none;
    box-sizing: border-box;
    font-size: 14px; /*px*/
    color: #333;
    line-height: 40px;
    outline: none;
  }

  ::-webkit-input-placeholder {
    font-size: 0.6rem
  }

  /* 使用webkit内核的浏览器 */
  :-moz-placeholder {
    font-size: 0.6rem
  }

  /* Firefox版本4-18 */
  ::-moz-placeholder {
    font-size: 0.6rem
  }

  /* Firefox版本19+ */
  :-ms-input-placeholder {
    font-size: 0.6rem
  }

  .tijiao {
    font-size: 0.5rem;
    color: #fff;
    background-color: #518BEE;
    border-radius: 0.2rem;
    line-height: 1.2rem;
    width: 63%;
    margin: 0.5rem auto 0.8rem;
    text-align: center;
    outline: none;
    display: block;
  }

  .bang {
    margin-left: 0.5rem;
    background: url(~@/assets/images/agree@3x.png) no-repeat 0 0.05rem;
    background-size: 0.3rem 0.3rem;
    font-size: 0.35rem;
    color: #808080;
    padding: 0 0.5rem;

  }

  .no {
    background: url(~@/assets/images/onagree@3x.png) no-repeat 0 0.05rem;
    background-size: 0.3rem 0.3rem;
  }
</style>
