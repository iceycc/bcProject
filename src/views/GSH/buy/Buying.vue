<template>
  <div class="main">
    <app-bar title="存入"></app-bar>
    <div class="pro-info">
      <div class="left">
        <div class="logo">
          <img :src="imgSrc+proDetail.logoUrl" alt="">
        </div>
        <div class="info">
          <p class="info-1">{{proDetail.prdName}}</p>
          <p class="info-2">{{proDetail.depositCategory}}</p>
        </div>
      </div>
      <div class="right">
        <p>起购金额{{proDetail.minAmount }}元</p>
        <p>最小递增{{proDetail.increAmount }}元</p>
      </div>
    </div>

    <div class="money">
      <div class="left">可用金额 <strong>{{accRestDesc}}元</strong></div>
      <div class="right" @click="goReChang">充值</div>
    </div>
    <div class="input-box">
      <p class="title">存入金额</p>
      <span class="left">￥</span>
      <input type="number" :placeholder="placeholder" v-model="amount">
      <img
        v-show="!ifCheckMoneyEmpty"
        src="@/assets/images/icon_clear@2x.png" alt="" class="close-icon" @click="clearNumHandle">
    </div>
    <submit-button
      class="submit-btn"
      text="存入"
      :canSubmit="canClick"
      @submit="goBuy"
      bgColor="lightBlue"
    ></submit-button>
    <sign-areement
      v-if="ifHasArgreement"
      :agree="agree"
      @sign="agree =!agree"
      :options="[
          {name:'《节节高产品服务协议（个人活期版）》',type:'buy'}
        ]"
    ></sign-areement>
  </div>
</template>
<script>
  import {PageName, BusName, imgSrc, LsName} from "@/Constant"
  import Bus from '@/plugin/bus'
  import API from "@/service"
  import Mixins from "@/mixins";
  import util from "@/libs/util";
  import {
    SubmitButton,
    SignAreement
  } from '@/components'

  export default {
    data() {
      return {
        proDetail: {
          PRD_NAME: '产品名称',
          DEPOSIT_CATEGORY: '隶属于某某银行'
        },
        amount: null,
        accRest: '0',
        agree: true,
        imgSrc: imgSrc,
        INCRE_AMOUNT: '',
        BANK_ACCT_NO: '', //电子账户
        BANK_USER_ID: '', //银行用户ID
        INVEST_ID: '',
        TEAM_ID: '',
        accRestDesc: '',
        ifHasArgreement: false
      }
    },
    components: {
      SubmitButton,
      SignAreement
    },
    computed: {
      placeholder() {
        let num = this.proDetail.minAmount || '0'
        return num + '元起购'
      },
      ifCheckMoneyEmpty() {
        if (this.amount) {
          return false
        } else {
          return true
        }
      },
      canClick() {
        if (Number(this.amount) <= Number(this.accRest) && Number(this.amount) >= this.proDetail.minAmount && this.agree) {
          return true
        } else {
          return false
        }
      }
    },
    mixins: [Mixins.storeMixin, Mixins.ToBuyingNew, Mixins.queryStatus],
    created() {
      this.getBuyAgreementByAjax() // 判断
    },
    methods: {
      initData(proData) {
        this.getInfo() // 用于查询账户余额 19801
        console.log(proData);
        // if(!proData.prdName) return // 未正常获取数据
        this.proDetail = proData
        // 可能是从活动页来，发现没有登录/注册，然后登录/注册，来购买
        let AMOUNT = this.getComState.ProAndOrgType.AMOUNT
        // 判断是否有外链钱的数据 登录流程来的
        if (AMOUNT) {
          this.amount = AMOUNT
        }
        // 可能是从活动页来，登录/注册了，直接来购买。。
        let moneyNum = this.$route.query.moneyNum || util.storage.session.get('moneyNum')
        if (moneyNum) {
          this.amount = moneyNum
        }

      },
      // 查询账户余额
      async getInfo() {
        // 查询账户余额
        let res1 = await API.bank.apiQryEleAccount({})
        this.accRest = res1.accRest // 账户余额(可用余额)
        this.accRestDesc = res1.accRestDesc // 账户余额(可用余额)
        // this.accRest = 1000// 账户余额(可用余额)
        // 获取银行卡信息
      },

      clearNumHandle() {
        this.amount = ''
      },
      goReChang() {
        API.watchApi({
          FUNCTION_ID: 'ptb0A015', // 点位
          REMARK_DATA: '异业合作-购买页面-充值按钮', // 中文备注
          FROM_ID: util.storage.session.get('ORG_ID') || ''
        })
        this.setComState({
          type: 'OriginPage',
          value: this.$route.fullPath
        })

        this.$router.push({
          name: PageName.Recharge,
          query: {
            ORIGIN_PAGE: 'buying' // 用于成功后 按钮的展示判断 .购买流程充值页面完成后只有继续购买按钮；
          }
        })
      },
      // 获取购买协议 现阶段是为了判断是否有协议返回，动态配置是否有协议
      async getBuyAgreementByAjax() {
        let data = {}
        try {
          let res = await API.doc.personalAccountServiceAgreement(data)
          if (res && res.url) {
            this.ifHasArgreement = true
          }else {
            this.ifHasArgreement = false
          }
        }catch (e) {
          this.ifHasArgreement = false
        }
      },
      checkamount(num) {
        let a = this.proDetail.increAmount
        if (num < parseInt(this.proDetail.minAmount)) {
          Bus.$emit(BusName.showToast, '投资金额小于起投金额，请调整投资金额')
          return true
        } else {
          return false
        }
      },
      goBuy() {
        API.watchApi({
          FUNCTION_ID: 'ptb0A017', // 点位
          REMARK_DATA: '异业合作-购买页面-存入', // 中文备注
          FROM_ID: this.proDetail.proId + '',
        })
        if (!this.agree) {
          Bus.$emit(BusName.showToast, '请同意相关协议')
          return
        }
        if (!this.amount) {
          Bus.$emit(BusName.showToast, '请输入存入金额')
          return
        }
        if (typeof (this.amount - 0) != 'number' || isNaN(this.amount - 0)) {
          Bus.$emit(BusName.showToast, '请填写正确的金额')
          return
        }

        if (this.amount - 0 > this.accRest) {
          Bus.$emit(BusName.showToast, '余额不足，请充值')
          return
        }
        if (this.checkamount(this.amount)) {
          return
        }
        if (this.amount - 0 > this.REMAIN_AMT) {
          Bus.$emit(BusName.showToast, '可投额度不足')
          return
        }
        this.doPay()
      },

      async doPay() {
        let {
          COUPON_ID = '',
          COUPON_DETAIL_ID = '',
          TEAM_ID = '',
          INVEST_ID = ''
        } = this.getComState.ProAndOrgType // 获取外部链接
        this.TEAM_ID = TEAM_ID
        this.INVEST_ID = INVEST_ID
        let data = {
          prdIndexId: this.proDetail.proId + '',
          amount: this.amount + '',
          cashFlag: '0', // 钞汇标志
          ccy: '001', // 币种 默认人民币
          term: this.proDetail.term, // 产品存期 todo 暂时写死

          couponId: COUPON_ID + '', // 优惠券ID	非必填  字符型
          couponDetailId: COUPON_DETAIL_ID + '', // 会员领券记录ID
          teamId: TEAM_ID + '', //活动ID
          investId: INVEST_ID + '' // 	投资ID
        }
        let res = await API.buy.apiBuy(data)
        // let res = null
        let params = {
          bizType: '6', // 购买
          reqSerial: res.reqSerial,
          apiPackSeq: res.apiPackSeq,
          besharpOrderNo: res.besharpOrderNo
        }
        try {
          // 轮询查询交易状态！！
          let qureyRes = await this.queryBizStatus(params, '正在购买中')
          console.log(qureyRes);
          this.$router.push({
            name: PageName.BuySuccess,
            query: {
              TEAM_ID: this.TEAM_ID,
              INVEST_ID: this.INVEST_ID,
              proId: this.proDetail.proId,
              orgName: this.proDetail.orgName,
              prdName: this.proDetail.prdName,
              ...qureyRes
            }
          })
        } catch (e) {
          console.log(e);
          this.$router.push({
            name: PageName.BuyFailed,
            query: {
              err: e,
              proId: this.proDetail.proId,
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main {
    width: 100%;
    height: 100%;
    background: #f6f6f9;
  }

  .pro-info {
    margin: px2rem(10) 0;
    height: px2rem(72);
    display: flex;
    background: #fff;

    .left {
      display: inline-block;
      flex: 1;
      box-sizing: border-box;
      padding-left: px2rem(20);
      padding-top: px2rem(12);

      .logo {
        width: px2rem(40);
        height: px2rem(40);
        display: inline-block;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .info {
        display: inline-block;
        padding-left: px2rem(12);

        .info-1 {
          width: px2rem(170);
          font-size: px2rem(15);
          color: #333;
        }

        .info-2 {
          font-size: px2rem(12);
          color: #999;
        }
      }
    }

    .right {
      float: right;
      text-align: right;
      display: flex;
      padding-right: px2rem(20);
      flex-direction: column;
      justify-content: center;
      font-size: px2rem(12);
      color: #666;
    }
  }


  .money {
    padding: 0 px2rem(20);
    line-height: 1.5rem;
    height: 1.5rem;
    font-size: 0.4rem;
    margin-bottom: px2rem(1);
    background: #fff;

    .left {
      float: left;
    }

    .right {
      color: #468EE5;
      float: right;
    }
  }

  .input-box {
    position: relative;
    padding: px2rem(12) px2rem(20);
    background: #fff;

    .title {
      color: #A4A9B0;
      font-size: px2rem(14);
      margin-bottom: px2rem(9);
    }

    .close-icon {
      position: absolute;
      display: inline-block;
      width: px2rem(15);
      height: px2rem(15);
      top: 50%;
      right: px2rem(30);
    }

    .left {
      width: px2rem(30);
      font-size: px2rem(24);
    }

    input {
      width: 50%;
      border: none;
      box-sizing: border-box;
      font-size: px2rem(24);
      color: #333;
      outline: none;
    }

    ::-webkit-input-placeholder {
      font-size: px2rem(24)
    }

    /* 使用webkit内核的浏览器 */
    :-moz-placeholder {
      font-size: px2rem(24)

    }

    /* Firefox版本4-18 */
    ::-moz-placeholder {
      font-size: px2rem(24)

    }

    /* Firefox版本19+ */
    :-ms-input-placeholder {
      font-size: px2rem(24)

    }
  }


  .submit-btn {
    margin-top: px2rem(60);
    margin-bottom: px2rem(20);
  }

</style>
