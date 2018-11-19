<template>
  <div class="app">
    <app-bar title="提现"></app-bar>
    <div class="rechargetitle">提现到{{CARD_BANK_NAME}}</div>
    <div class="minshengbank">
            <span class="minshengbankLogo"><img :src="imgSrc + logo" style="width:75%"
                                                alt=""></span>
      {{CARD_BANK_NAME}}
    </div>
    <section class="inputAmount">
      <span class="Amount">金额</span>
      <input @change="checkMoney"
             v-model="APPLY_AMOUN" type="number" placeholder="请输入提现金额">
      <img
        v-show="!ifCheckMoneyEmpty"
        src="@/assets/images/icon_clear@2x.png" alt="" class="close-icon" @click="clearNumHandle">
      <span style="color:#389CFF" @click="APPLY_AMOUN = ACC_REST<=DAY_REST? ACC_REST:DAY_REST">全部提现</span>
    </section>
    <p class="info1">
      本卡当前余额{{ACC_REST | formatNum}}元，每日限额{{DAY_REST |formatNum}}元
    </p>
    <button :class="{tijiao:true,active:canClick}" @click="doNext" :disabled="!canClick">确认提现</button>
    <section v-if="show" class="bgbox">
      <section class="passbox">
        <p class="title">
          <img src="@/assets/images/icon_dunpai@2x.png" alt="">
          由晋商银行提供技术保障</p>
        <section class="field_row_wrap">
          <p class="field_row_key">
            交易密码
          </p>
          <div class="field_row_value">
            <pass-word-zhengzhou
              BankCardPass="payPassDD"
            ></pass-word-zhengzhou>
          </div>
          <p class="info">密码由数字组成，必须为6位</p>
        </section>
        <div class="btn">
          <mt-button @click="show =!show" type="primary">取消</mt-button>
          <mt-button @click="doWithdraw" type="primary">提交</mt-button>
        </div>
      </section>
    </section>

  </div>
</template>
<script>
  import API from "@/service";
  import AppBar from '@/components/header/AppBar'
  import {LsName} from '@/Constant'
  import PassWordZhengzhou from '@/components/password/PassInputZhengzhou'
  import Bus from '@/plugin/bus'
  import {PageName, imgSrc, BusName} from "@/Constant";
  import util from "libs/util";
  import Mixins from '@/mixins'

  let time = 60
  let timer;
  export default {
    data() {
      return {
        show: false,
        html: '协议',
        page: false,
        APPLY_AMOUN: '',
        toUrl: '',
        CARD_BANK_NAME: '',
        imgSrc: imgSrc,

        pass: '',
        len: null,
        passCode:'',

        canClick: false,
        logo: '',
        inputID: '',
        ifCheckMoneyEmpty: true,


        ACC_REST: '200',
        DAY_REST:'10000', // todo取每日限额
      }
    },
    watch: {
      APPLY_AMOUN(n, o) {
        if (n && n - 0 > 0) {
          this.canClick = true
          this.ifCheckMoneyEmpty = false
        } else {
          this.canClick = false
          this.ifCheckMoneyEmpty = true
        }
      },
      show(n, O) {
        this.inputID = n ? 'withdrawPayPass' : ''
      }
    },
    components: {
      AppBar,
      PassWordZhengzhou
    },
    mixins: [Mixins.HandleMixin,Mixins.UtilMixin],
    created() {
      this.getUserInfos()
      this.ACC_REST = this.$route.query.ACC_REST || '200'
    },
    methods: {
      checkMoney() {

      },
      getUserInfos() {
        API.safe.apiBandCard({}, (res) => {
          this.CARD_BANK_NAME = res.CARD_BANK_NAME
          this.logo = res.CARD_BANK_URL
        })
      },
      doWithdraw() {
        this.pass = $('#payPassDD').getKBD()
        this.len = $('#payPassDD').getLenKBD()
        this.passCode = $('#payPassDD').getBDCode()
        if (util.Check.payPassLen(this.len, true)) return
        let data = {
          PHONE_CODE: "",
          EITHDRAW_All: "1",// 0 全部提现
          APPLY_AMOUNT: this.APPLY_AMOUN, //
          BANK_PAY_PW: this.pass, //
          PREFIX:this.passCode,//  密码标识 TODO 密码标识 查询银行类型
          IS_UNIONPAY:'1', // 是否他行卡 必填 1：他行 0:本行 todo 判断银行类型
        }
        this.show = false
        API.withdraw.apiCash(data, res => {
          let params = {
            BIZ_TYPE: '4', // 提现
            BESHARP_SEQ: res.BESHARP_CASH_SEQ
          }
          // 轮询 查寻交易状态
          this.queryStatus(
            {
              text: '提现中',
              data: params,
              fn: (result, timer, count) => {
                if ('1' == result.RES_CODE) {
                  clearInterval(timer)
                  Bus.$emit(BusName.showToast, result.RES_MSG);
                  this.$router.push({ // todo是否要跳转
                    name: PageName.WithdrawFaild,
                    query: {
                      err: result.RES_MSG
                    }
                  })
                }
                else if ('0' == result.RES_CODE) {
                  clearInterval(timer)
                  Bus.$emit(BusName.showToast, result.RES_MSG);
                  this.Londing.close()
                  this.$router.push({
                    name: PageName.WithdrawSuccess,
                    query: {
                      money: this.APPLY_AMOUN,
                      ...res
                    }
                  })
                } else {
                  if (count == 5) {
                    Bus.$emit(BusName.showToast, result.RES_MSG);
                    this.$router.push({
                      name: PageName.WaitForWithdraw,
                      query: {
                        err: result.RES_MSG
                      }
                    })
                  }
                }
              }
            }
          )
        }, err => {
          Bus.$emit(BusName.showToast, err);
        })
      },
      doNext() {
        if (util.Check.trim(this.APPLY_AMOUN, '提现金额', true)) {
          return
        }
        //
        if (this.APPLY_AMOUN - 0 > this.ACC_REST - 0) {
          Bus.$emit(BusName.showToast, '提现金额大于卡内余额，请调整提现金额')
          return
        }
        this.Londing.open()
        setTimeout(() => {
          this.Londing.close()
          this.show = true
        }, 1000)
      },
      clearNumHandle() {
        //
        this.APPLY_AMOUN = ''
      }

    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/px2rem";

  .rechargetitle {
    padding-left: px2rem(20);
    height: px2rem(30);
    background: #F6F6F9;
    line-height: px2rem(30);
    color: #444444;
    font-size: px2rem(14);
  }

  .minshengbank {
    padding-left: px2rem(20);
    height: px2rem(65);
    line-height: px2rem(65);
    font-size: px2rem(16)
  }

  .inputAmount {
    position: relative;
    padding-left: px2rem(20);
    height: px2rem(50);
    line-height: px2rem(50);
    font-size: px2rem(14);
    margin-top: px2rem(20);
    border-top: px2rem(20) solid #f6f6f9;
    border-bottom: 1px solid #EEEEF0;
    .button {
      vertical-align: middle;
      width: 2.5rem;
      display: inline-block;
      padding: .1rem;
      border: 1px solid #508CEE;
      color: #508CEE
    }
    .close-icon {
      position: absolute;
      display: inline-block;
      width: px2rem(15);
      height: px2rem(15);
      top: 50%;
      right: px2rem(100);
      margin-top: px2rem(-15/2);

    }
    input {
      width: px2rem(200);
      border: none;
      box-sizing: border-box;
      font-size: 0.4rem;
      color: #333;
      outline: none;
    }
  }

  .Amount {
    display: inline-block;
    height: 100%;
    width: 1.8rem;
    font-size: px2rem(14);
  }

  .tijiao {
    font-size: px2rem(18);
    color: #fff;
    background: #518BEE;
     border-radius: px2rem(6);
    line-height: 1.2rem;
    width: px2rem(255);
    margin: px2rem(40) auto 0;
    text-align: center;
    border: 0px;
    outline: none;
    display: block;
    &.active {
      background-color: #508CEE;
    }
  }

  .minshengbankLogo {
    line-height: 100%;
    display: inline-block;
    height: 60%;
    width: 50px;
    float: left;
    padding-top: 0.4rem;
  }

  .bgbox {
    z-index: 0;
    width: 100%;
    height: 100%;
    background: rgba(1, 1, 1, .7);
    position: fixed;
    padding-top: 1.7rem;
    top: 0;
    left: 0;
    .passbox {
      background: #fff;
      width: 80%;
      margin: 0 auto;
      padding: 0.4rem;
      box-sizing: border-box;
    }
    .field_row_key {
      font-size: 0.4rem;
    }

    .title {
      margin-bottom: 0.5rem;
      text-align: center;
      font-size: 0.4rem;
      color: #666;
      height: .6rem;
      line-height: .6rem;
      img {
        vertical-align: top;
        width: .5rem;
      }
    }
    .field_row_wrap {
      margin-bottom: 0.2rem;
    }
    .field_row_value {
      border-radius: 4px;
      border: 1px solid #9e9e9e;
      height: 0.9rem;
      line-height: 0.9rem;
      margin: 0.2rem 0;
    }

    .btn {
      display: flex;
      button {
        margin: 0 .3rem;
        text-align: center;
        flex: 1;
      }
    }
    .info {
      font-size: px2rem(14);
      line-height: 0.6rem;
      padding-top: px2rem(0);
      color: #9199A1;
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
</style>
