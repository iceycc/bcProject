<template>
  <div class="main">
    <app-bar title="提现"></app-bar>
    <div class="s-title">提现到{{CARD_BANK_NAME}}</div>
    <div class="bank-card" @click="clickBank">
      <span class="logo">
        <img :src="imgSrc + logo" style="width:75%" alt="">
      </span>
      <div class="card-info">
        <p>{{CARD_BANK_NAME}}</p>
        <p>**** **** **** {{CARD_NUM.substr(CARD_NUM.length - 4)}}</p>
      </div>
      <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
    </div>
    <div class="crow-line"></div>
    <section class="money-box">
      <span class="left">金额</span>
      <input @change="checkMoney"
             v-model="APPLY_AMOUNT" type="number" placeholder="请输入提现金额">
      <img
        v-show="!ifCheckMoneyEmpty"
        src="@/assets/images/icon_clear@2x.png" alt="" class="close-icon" @click="clearNumHandle">
      <span class="all"
            @click="APPLY_AMOUNT = (WITH_DRAWABLE_CASH<ACC_REST?WITH_DRAWABLE_CASH:ACC_REST)">全部提现</span>
    </section>
    <p class="info1">
      本卡当前余额{{ACC_REST | formatNum}}元
      <!-- 全部提现UI图变位置了 -->
    </p>
    <p class="info1">
      当前可提现金额{{WITH_DRAWABLE_CASH | formatNum}}元
    </p>
    <submit-button
      class="submit-btn"
      text="确认提现"
      :canSubmit="canClick"
      @submit="doNext"
      bgColor="lightBlue"
    ></submit-button>
    <banding-bank-select
      title="选择银行卡"
      :show="upseletShow"
      :BankList="mainBankList"
      @chooseBank="chooseBank"
      type="withdraw"
    ></banding-bank-select>
  </div>
</template>
<script>
  import API from "@/service";
  import Bus from '@/plugin/bus'
  import {PageName, imgSrc, BusName,LsName} from "@/Constant";
  import util from "@/libs/util";
  import Mixins from '@/mixins'
  import {
    UpSelect as BandingBankSelect,
    SubmitButton,
    IconFont,
    AppBar
  } from '@/components'

  export default {
    data() {
      return {
        msgdisable: false,
        // 银行选择卡
        upseletShow: false,
        mainBankList: [],
        html: '协议',
        page: false,
        APPLY_AMOUNT: '',
        toUrl: '',
        CARD_BANK_NAME: '某某银行',
        imgSrc: imgSrc,
        logo: '',
        ifCheckMoneyEmpty: true,
        ACC_REST: '0',
        WITH_DRAWABLE_CASH: '0',
        DAY_REST: '0', // todo取每日限额
        CARD_NUM: '', //一类户卡号
        BANK_USER_CODE: '', //二类户卡号
        BANK_USER_ID: '', //银行用户ID
      }
    },
    components: {
      AppBar,
      IconFont,
      SubmitButton,
      BandingBankSelect
    },
    watch: {
      APPLY_AMOUNT(n) {
        if (n > 0) {
          this.ifCheckMoneyEmpty = false
        } else {
          this.ifCheckMoneyEmpty = true
        }
      }
    },
    computed: {
      canClick() {
        if (Number(this.APPLY_AMOUNT) > 0 && Number(this.APPLY_AMOUNT) <= Number(this.WITH_DRAWABLE_CASH) && Number(this.APPLY_AMOUNT) <= Number(this.ACC_REST)) {
          return true
        } else {
          return false
        }
      }
    },
    mixins: [Mixins.queryStatus],
    created() {
      this.getUserInfos()
      this.ACC_REST = this.$route.query.ACC_REST || '0'
      this.WITH_DRAWABLE_CASH = this.$route.query.WITH_DRAWABLE_CASH || '0'
      // this.WITH_DRAWABLE_CASH = '111'
    },
    methods: {
      checkMoney() {

      },
      chooseBank(bank) {
        this.CARD_BANK_NAME = bank.cardBankName
        this.CARD_NUM = bank.cardNum
        this.logo = bank.cardBankUrl
      },
      async getUserInfos() {
        let res = await API.safe.apiBandCard({})
        console.log(res)
        this.CARD_BANK_NAME = res.cardList[0].cardBankName
        this.CARD_NUM = res.cardList[0].cardNum
        this.logo = res.cardList[0].cardBankUrl
        this.BANK_USER_ID = res.userCardId
        this.BANK_USER_CODE = res.bankUserCode
        this.mainBankList = res.cardList
      },
      async doWithdraw() {
        // TYPE	请求类型
        // ORG_ID	机构ID
        // APPLY_AMOUNT	提现金额
        // VRFY_FLAG	校验标志
        // PHONE_CODE	短信验证码
        // EITH_DRAW_ALL	全部提取标志

        let data = {
          APPLY_AMOUNT: this.APPLY_AMOUNT, //
          EITH_DRAW_ALL: '0',
          MESAGE_TOKEN: this.MESAGE_TOKEN,
          BANK_ACCOUNT_NO: this.CARD_NUM,
          BANK_NAME: this.CARD_BANK_NAME
        }
        this.show = false
        try {
          let res = await API.withdraw.apiCash(data)
          let params = {
            BIZ_TYPE: '4', // 提现
            BESHARP_SEQ: res.BESHARP_CASH_SEQ
          }
          // 轮询 查寻交易状态
          this.queryStatus({
              text: '提现中',
              data: params,
              fn: (result, timer, count) => {
                this.setComState({type: "reload", value: true}) // reload-001
                if ('1' == result.RES_CODE) {
                  // 提现失败
                  clearInterval(timer)
                  Bus.$emit(BusName.showToast, result.RES_MSG);
                  this.$router.push({ // todo是否要跳转
                    name: PageName.WithdrawFaild,
                    query: {
                      err: result.RES_MSG
                    }
                  })
                } else if ('0' == result.RES_CODE) {
                  // 提现成功
                  clearInterval(timer)
                  Bus.$emit(BusName.showToast, result.RES_MSG);
                  this.Londing.close()
                  this.$router.push({
                    name: PageName.WithdrawSuccess,
                    query: {
                      money: this.APPLY_AMOUNT,
                      RES_MSG2: result.RES_MSG2,
                      ...res
                    }
                  })
                } else if ('20000' == result.RES_CODE) {
                  // 等待中
                  clearInterval(timer)
                  this.Londing.close()
                  this.$router.push({
                    name: PageName.WaitForWithdraw,
                    query: {
                      err1: result.RES_MSG,
                      err2: result.RES_MSG2
                    }
                  })
                } else {
                  if (count == 5) {
                    let msg = result.RES_CODE + ':' + result.RES_MSG
                    Bus.$emit(BusName.showToast, msg);
                    this.$router.push({ // todo是否要跳转
                      name: PageName.WithdrawFaild,
                      query: {
                        err: msg
                      }
                    })
                  }
                }
              }
            }
          )
        } catch (err) {
          Bus.$emit(BusName.showToast, err);
        }

      },
      doNext() {
        if (util.Check.trim(this.APPLY_AMOUNT, '提现金额', true)) {
          return
        }
        //
        if (this.APPLY_AMOUNT - 0 > this.ACC_REST - 0) {
          Bus.$emit(BusName.showToast, '提现金额大于卡内余额，请调整提现金额')
          return
        }
        this.doWithdraw()

      },
      clickBank() {
        this.upseletShow = !this.upseletShow
      },
      clearNumHandle() {
        //
        this.APPLY_AMOUNT = ''
      }

    }
  }
</script>

<style lang="scss" scoped>
  .main{
    width: 100%;
    height: 100%;
    background: #f6f6f9;
  }

  .s-title {
    padding-left: px2rem(20);
    height: px2rem(30);
    line-height: px2rem(30);
    color: #444444;
    font-size: px2rem(14);
  }
  .bank-card {
    position: relative;
    padding-left: px2rem(20);
    height: px2rem(72);
    font-size: px2rem(20);
    display: flex;
    align-items: center;
    background: #fff;
    .logo {
      width: px2rem(50);
    }
    .card-info {
      font-size: px2rem(16);

      p:last-child {
        color: #9199A1;
      }
    }

    .detail {
      right: px2rem(20);
      top: px2rem(15);
      color: #999999;
      position: absolute;
    }
  }

  .crow-line {
    height: px2rem(10);
    background: #f9f9f6;
  }

  .money-box {
    position: relative;
    padding-left: px2rem(12);
    height: px2rem(44);
    line-height: px2rem(44);
    font-size: px2rem(14);
    border-bottom: 1px solid #EEEEF0;
    margin-bottom: px2rem(10);
    background: #fff;
    display: flex;
    .left {
      width: px2rem(60);
      display: inline-block;
      height: 100%;
      font-size: px2rem(14);
    }
    .close-icon {
      position: absolute;
      display: inline-block;
      width: px2rem(15);
      height: px2rem(15);
      top: 50%;
      right: px2rem(80);
      margin-top: px2rem(-15/2);

    }
    .all {
      display: inline-block;
      text-align: center;
      width: px2rem(80);
      color: #389CFF;
    }
    input {
      flex: 1;
      border: none;
      box-sizing: border-box;
      font-size: px2rem(16);
      padding-right: px2rem(30);
      color: #333;
      outline: none;
    }


  }




  .info1 {
    padding-left: px2rem(20);
    font-size: px2rem(14);
    line-height: 0.6rem;
    color: #9199A1;

    span {
      color: #389CFF
    }
  }

  .submit-btn {
    margin-top: px2rem(60);
  }
</style>
