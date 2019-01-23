<template>
  <div>
    <app-bar title="支取"></app-bar>
    <div class="r-top">
      <img :src="imgSrc + redeemData.LOGO_URL" alt="">
      <div>
        <p>{{redeemData.ORG_NAME}}</p>
        <span>{{redeemData.PRD_NAME}}</span>
        <!--<span>{{redeemData.PRD_NAME}}</span>-->
        <!--<span>活期存款</span>-->
      </div>
    </div>
    <div class="r-cash">
      <div class="title">支取金额</div>
      <div class="money">
        <div class="number">
          <!--<i v-show="isFocus">￥</i>-->
          <span class="money">{{redeemData.INVEST_AMOUNT | formatNum}}元</span>
          <!--<input type="number" @focus="focus" @blur="blur" :placeholder="placeholder" v-model="money">-->
          <!--<img-->
          <!--v-show="!ifCheckMoneyEmpty"-->
          <!--src="@/assets/images/icon_clear@2x.png" alt="" class="close-icon" @click="clearNumHandle">-->
        </div>
        <!--<div class="all" @click="selectAll">全部支取</div>-->
      </div>
    </div>
    <p v-if="EFFCT_INTEREST_RATE>0" class="cal">收益{{EFFCT_INTEREST_RATE}}</p>
    <section class="inputAmount">
            <span class="Amount">
                验证码
            </span>
      <input type="tel" v-model="PHONE_CODE" placeholder="请输入验证码">
      <button
        :disabled="msgdisable"
        @click="getMsg"
        class="button">{{codeText}}
      </button>
    </section>
    <p class="msg-infomation">不支持部分支取,当日存入的需第二日才能支取</p>
    <!--<button :class="['r-btn',{active:availBtn}]" :disabled="!availBtn" @click="showPass">立即支取</button>-->
    <submit-button
      class="btn"
      text="立即支取"
      :canSubmit="availBtn"
      @submit="showPass"
    ></submit-button>
    <!--<p @click="agree =!agree"-->
    <!--:class="{'bang':true,'no':agree == false}">立即赎回代表您已阅读并同意-->
    <!--<a style=" color:#0096FE;" href="javascript:;" @click.stop="getAgreement()">《“周周利”产品业务服务协议》</a>-->
    <!--</p>-->
  </div>
</template>
<script>
  import API from '@/service'
  import util from "libs/util";
  import {PageName, BusName, LsName, imgSrc} from "@/Constant";
  import PassWordZhengzhou from '@/components/password/PassInputZhengzhou'
  import SubmitButton from '@/components/form/SubmitButton' // 常规的input组件

  import Mixins from '@/mixins'
  import Bus from '@/plugin/bus'

  let time = 60
  let timer;
  export default {
    data() {
      return {
        agree: true,
        msgdisable: false,
        PHONE_CODE: '',
        codeText: '获取验证码',
        imgSrc,
        show: false,
        isFocus: false,
        typeShow: false,
        cur: '0',
        money: '',
        typeText: '快速支取',
        normalShow: false,
        redeemData: {
          INVEST_AMOUNT: '',
          FUND_NO: '',
          PRD_TYPE: '4',
        },
        EFFCT_INTEREST_RATE: '',
        passCode: '',
        len: '',
        pass: '',
        MESSAGE_TOKEN: '',
        BANK_ACCT_NO: '', //电子账户
        BANK_USER_ID: '' //银行用户ID
      }
    },
    computed: {
      ifCheckMoneyEmpty() {
        if (this.money) {
          return false
        } else {
          return true
        }
      },
      availBtn() {
        if (this.agree && this.redeemData.INVEST_AMOUNT && this.PHONE_CODE) {
          return true
        } else {
          return false
        }
      },
      // placeholder:'
      placeholder() {
        let num = this.redeemData.INVEST_AMOUNT
        return `最多可支取金额${util.formatNum(num)}元`
      }
    },
    mixins: [ Mixins.queryStatus],
    watch: {},
    created() {
      this.redeemData = this.getComState.redeemData
      this.getInfo();
    },
    components: {
      PassWordZhengzhou,
      SubmitButton
    },
    methods: {
      getInfo() {
        API.safe.apiBandCard({}, res => {
          this.BANK_ACCT_NO = res.CARD_LIST[0].CARD_NUM
          this.BANK_USER_ID = res.BANK_USER_ID
        })
      },
      clearNumHandle() {
        this.money = ''
      },
      debounce(fn, wait = 300) {
        let timer, timeStamp = 0;
        let context, args;

        let run = () => {
          timer = setTimeout(() => {
            fn.apply(context, args);
          }, wait);
        }
        let clean = () => {
          clearTimeout(timer);
        }

        return function () {
          context = this;
          args = arguments;
          let now = (new Date()).getTime();

          if (now - timeStamp < wait) {
            console.log('reset', now);
            clean();  // clear running timer
            run();    // reset new timer from current time
          } else {
            console.log('set', now);
            run();    // last timer alreay executed, set a new timer
          }
          timeStamp = now;

        }
      },
      getMsg() {
        // if (!this.money) {
        //   Bus.$emit(BusName.showToast, '支取金额不能为空')
        //   return
        // }
        // let num = this.redeemData.INVEST_AMOUNT || 0
        // if (this.money - 0 > num - 0) {
        //   Bus.$emit(BusName.showToast, '支取金额大于可支取金额，请调整支取金额')
        //   return
        // }
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
      getCode() { // 短信
        let data = {
          BIZ_TYPE: '6', // 需要
          BANK_ACCT_NO: this.BANK_ACCT_NO,
          BANK_USER_ID: this.BANK_USER_ID
        }
        API.common.apiSendPhoneCode(data, res => {
          this.MESSAGE_TOKEN = res.MESSAGE_TOKEN
          Bus.$emit(BusName.showSendMsg, res.BC_PHONE)
        })
      },
      focus() {
        this.isFocus = true;
      },
      blur() {

      },
      sure() {
        this.typeShow = false;
        this.normalShow = false
        this.show = true
      },
      chooseType(val, e) {
        // 普通支取需要弹出层
        this.cur = val; // 1 普通支取  0 快速支取
        this.typeText = e.target.innerText;
        this.typeShow = false;
      },
      selectAll() {
        this.isFocus = true
        this.money = this.redeemData.INVEST_AMOUNT
      },
      getAgreement() {
        // this.$router.push({name:PageName.DocsPage,query:{type:'redeem'}})
        this.$router.push({name: PageName.DocsPage, query: {type: 'buy'}})

      },
      showPass() {
        // if (!this.money) {
        //   Bus.$emit(BusName.showToast, '支取金额不能为空')
        //   return
        // }
        // let num = this.redeemData.INVEST_AMOUNT || 0
        // if (this.money - 0 > num - 0) {
        //   Bus.$emit(BusName.showToast, '支取金额大于可支取金额，请调整支取金额')
        //   return
        // }
        let data = {
          TYPE: 'API_REDEMPTION',
          // PHONE_CODE	短信验证码
          PHONE_CODE: this.PHONE_CODE,
          PRD_ID: this.redeemData.PRD_INDEX_ID,//	产品ID
          APPLY_AMOUNT: this.redeemData.INVEST_AMOUNT, //	金额
          // PRD_TYPE: this.redeemData.PRD_TYPE,//产品类型
          PRD_TYPE: '4',//产品类型 （4存款）
          ORDER_NUM: this.redeemData.ORDER_NUM, // 订单编号
          MESSAGE_TOKEN: this.MESSAGE_TOKEN
        }
        API.redeem.apiRedemption(data, res => {
          let params = {
            BIZ_TYPE: '7',
            BESHARP_SEQ: res.REQ_SERIAL
          }
          this.queryStatus({
            text: '正在支取中',
            data: params,
            fn: (result, timer, count) => {
              this.setComState({type: "reload", value: true}) // reload-001
              if ('1' == result.RES_CODE) {
                clearInterval(timer)
                Bus.$emit(BusName.showToast, result.RES_MSG);
                this.$router.push({ // todo是否要跳转
                  name: PageName.RedeemFailure,
                  query: {
                    err: result.RES_MSG
                  }
                })
              } else if ('0' == result.RES_CODE) {
                clearInterval(timer)
                Bus.$emit(BusName.showToast, result.RES_MSG);
                this.Londing.close()
                this.setComState({
                  type: 'pollResult', value: {
                    ...result,
                    money: this.redeemData.INVEST_AMOUNT
                  }
                })
                this.$router.push({
                  name: PageName.RedeemSuccess,
                })
              } else {
                if (count == 5) {
                  clearInterval(timer)
                  Bus.$emit(BusName.showToast, result.RES_MSG);
                  this.$router.push({ // todo是否要跳转
                    name: PageName.RedeemFailure,
                    query: {
                      err: result.RES_MSG
                    }
                  })
                }
              }
            }
          })
        }, err => {
          Bus.$emit(BusName.showToast, err)
          // this.$router.push({name: PageName.RedeemFailure, query: {err: err}})
        })
      },

    }
  }
</script>
<style lang="scss" scoped>

  /*@import "~@/assets/iconfont/iconfont.css";*/

  i {
    font-style: normal;
  }

  .r-top {
    border-top: px2rem(10) solid #F6F6F9;
    border-bottom: px2rem(10) solid #F6F6F9;
    display: flex;
    align-items: center;
    padding: px2rem(15) px2rem(20);

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
    padding: px2rem(15) px2rem(20);
    border-bottom: 1px solid #EEEEF0;

    .title {
      padding-bottom: px2rem(10);
      font-size: px2rem(14);
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
          color: #121B32;
          font-size: px2rem(15);
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
            color: #B3B3B3;
          }
        }
      }

      .all {
        color: #389CFF;
        font-size: px2rem(14);
      }
    }
  }

  .r-tips {
    color: #B3B3B3;
    padding: px2rem(10) px2rem(20) px2rem(30);
  }

  .r-btn {
    width: px2rem(255);
    height: px2rem(44);
    line-height: px2rem(44);
    display: block;
    margin: px2rem(50) auto px2rem(20);
    text-align: center;
    background-color: #e4e4e4;
    color: #fff;
    font-size: px2rem(18);
    border-radius: px2rem(6);

    &.active {
      background-color: #518BEE;
    }
  }

  .r-agreement {
    padding: px2rem(20) px2rem(20) px2rem(65);
    color: #9199A1;

    span {
      color: #518BEE;
      display: inline;
    }
  }

  .grey-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(123, 125, 123, .7);
    z-index: 9;
  }

  .inputAmount {
    padding-left: px2rem(20);
    height: px2rem(44);
    line-height: px2rem(44);
    font-size: 0.4rem;
    border-bottom: 1px solid #EEEEF0;

    .button {
      vertical-align: middle;
      width: px2rem(84);
      height: px2rem(28);
      display: inline-block;
      border: 1px solid #508CEE;
      color: #508CEE
    }

    input {
      width: px2rem(200);
      border: none;
      box-sizing: border-box;
      font-size: 0.4rem;
      color: #333;
      /* line-height: 0.5rem; */
      outline: none;
    }
  }

  .bang {
    margin-left: 0.5rem;
    background: url(~@/assets/images/agree@3x.png) no-repeat 0 0.05rem;
    background-size: 0.3rem 0.3rem;
    font-size: px2rem(12);
    color: #808080;
    padding: 0 0.5rem;

  }

  .cal {
    margin-top: px2rem(5);
    font-size: px2rem(15);
    padding-left: px2rem(20);
    color: #FF801A
  }

  .no {
    background: url(~@/assets/images/onagree@3x.png) no-repeat 0 0.05rem;
    background-size: 0.3rem 0.3rem;
  }

  .msg-infomation {
    padding-top: px2rem(10);
    padding-left: px2rem(20);
    color: #B3B3B3;
    font-size: px2rem(12)
  }
</style>

