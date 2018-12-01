<template>
  <div class="app">
    <app-bar title="提现"></app-bar>
    <div class="rechargetitle">提现到{{CARD_BANK_NAME}}</div>
    <div class="minshengbank">
            <span class="minshengbankLogo"><img :src="imgSrc + logo" style="width:75%"
                                                alt=""></span>
      {{CARD_BANK_NAME}}
    </div>
    <div class="crow-line"></div>
    <section class="inputAmount">
      <span class="Amount">金额</span>
      <input @change="checkMoney"
             v-model="APPLY_AMOUNT" type="number" placeholder="请输入提现金额">
      <img
        v-show="!ifCheckMoneyEmpty"
        src="@/assets/images/icon_clear@2x.png" alt="" class="close-icon" @click="clearNumHandle">
    </section>
    <section class="inputAmount">
            <span class="Amount">
                验证码
            </span>
      <input type="text" v-model="msgCode" placeholder="请输入验证码">
      <button
        :disabled="msgdisable"
        @click="getMsg"
        class="button">{{codeText}}
      </button>
    </section>
    <p class="info1">
      本卡当前余额{{ACC_REST | formatNum}}元
      <span class="span" style="color:#389CFF" @click="APPLY_AMOUNT = ACC_REST">全部提现</span>
    </p>
    <button :class="{tijiao:true,active:canClick}" @click="doNext" :disabled="!canClick">确认提现</button>

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
        codeText: '获取验证码',
        msgdisable: false,
        msgCode: '',


        html: '协议',
        page: false,
        APPLY_AMOUNT: '',
        toUrl: '',
        CARD_BANK_NAME: '',
        imgSrc: imgSrc,

        pass: '',
        len: null,
        passCode: '',

        logo: '',
        ifCheckMoneyEmpty: true,


        ACC_REST: '200',
        DAY_REST: '10000', // todo取每日限额
      }
    },
    components: {
      AppBar,
      PassWordZhengzhou
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
        if (this.APPLY_AMOUNT && this.msgCode) {
          return true
        } else {
          return false
        }
      }
    },
    mixins: [Mixins.HandleMixin, Mixins.UtilMixin],
    created() {
      this.getUserInfos()
      this.ACC_REST = this.$route.query.ACC_REST || '200'
    },
    methods: {

      getMsg() {
        if (util.Check.trim(this.APPLY_AMOUNT, '提现金额', true)) {
          return
        }
        //
        if (this.APPLY_AMOUNT - 0 > this.ACC_REST - 0) {
          Bus.$emit(BusName.showToast, '提现金额大于卡内余额，请调整提现金额')
          return
        }
        let times = time
        this.msgdisable = true
        timer = setInterval(() => {
          if (times == 0) {
            this.codeText = '重新发送'
            this.msgdisable = false
            clearInterval(timer)
            return
          }
          times--
          this.codeText = `${times}s`
        }, 1000)
        this.getCode()
      },
      getCode() {
        let TEL = this.getComState.TEL
        let data = {
          PHONE_NUM: TEL,
          BIZ_TYPE: '1005', // 提现
          AMOUNT: this.APPLY_AMOUNT
        }
        API.common.apiSendPhoneCode(data, res => {
          Bus.$emit(BusName.showSendMsg, TEL)
        })
      },
      checkMoney() {

      },
      getUserInfos() {
        API.safe.apiBandCard({}, (res) => {
          this.CARD_BANK_NAME = res.CARD_BANK_NAME
          this.logo = res.CARD_BANK_URL
        })
      },
      doWithdraw() {
        // TYPE	请求类型
        // ORG_ID	机构ID
        // APPLY_AMOUNT	提现金额
        // VRFY_FLAG	校验标志
        // PHONE_CODE	短信验证码
        // EITH_DRAW_ALL	全部提取标志

        let data = {
          PHONE_CODE: this.msgCode,
          EITHDRAW_All: "1",// 0 全部提现
          APPLY_AMOUNT: this.APPLY_AMOUNT, //
          VRFY_FLAG: '00',
          EITH_DRAW_ALL: '0'
        }
        this.show = false
        API.withdraw.apiCash(data, res => {
          let params = {
            BIZ_TYPE: '4', // 提现
            BESHARP_SEQ: res.TXN_REF_NO
          }
          // 轮询 查寻交易状态
          this.queryStatus(
            {
              text: '提现中',
              data: params,
              fn: (result, timer, count) => {
                this.setComState({type: "reload", value: true}) // reload-001
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
                      money: this.APPLY_AMOUNT,
                      ...res
                    }
                  })
                }
                else if ('20000' == result.RES_CODE) {
                  clearInterval(timer)
                  this.Londing.close()
                  this.$router.push({
                    name: PageName.WaitForWithdraw,
                    query: {
                      err: result.RES_MSG
                    }
                  })
                }
                else {
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
        }, err => {
          Bus.$emit(BusName.showToast, err);
        })
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
      clearNumHandle() {
        //
        this.APPLY_AMOUNT = ''
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

  .crow-line {
    height: px2rem(10);
    background: #f9f9f6;
  }

  .inputAmount {
    position: relative;
    padding-left: px2rem(20);
    height: px2rem(50);
    line-height: px2rem(50);
    font-size: px2rem(14);
    border-bottom: 1px solid #EEEEF0;
    .button {
      vertical-align: middle;
      width: px2rem(80);
      display: inline-block;
      padding: px2rem(3);
      border: 1px solid #508CEE;
      color: #508CEE
    }

    .close-icon {
      position: absolute;
      display: inline-block;
      width: px2rem(15);
      height: px2rem(15);
      top: 50%;
      right: px2rem(10);
      margin-top: px2rem(-15/2);

    }
    input {
      width: px2rem(180);
      border: none;
      box-sizing: border-box;
      font-size: 0.4rem;
      color: #333;
      outline: none;
    }
    .span {
      display: inline-block;
      text-align: center;
      width: px2rem(80);
    }
    .Amount {
      width: px2rem(80);
      display: inline-block;
      height: 100%;
      font-size: px2rem(14);
    }
  }

  .tijiao {
    font-size: px2rem(18);
    color: #fff;
    background: #ccc;
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
