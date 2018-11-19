<template>
  <div>
    <app-bar title="支取"></app-bar>
    <div class="r-top">
      <img :src="imgSrc+redeemData.LOGO_URL" alt="">
      <div>
        <p>{{redeemData.PRD_NAME}}</p>
        <span>货币基金</span>
      </div>
    </div>
    <div class="r-cash">
      <div class="title">支取金额</div>
      <div class="money">
        <div class="number">
          <i v-show="isFocus">￥</i>
          <input type="number" @focus="focus" @blur="blur" :placeholder="placeholder" v-model="money">
        </div>
        <div class="all" @click="selectAll">全部支取</div>
      </div>
    </div>
    <section class="inputAmount">
            <span class="Amount">
                验证码
            </span>
      <input type="text" v-model="msgCode" placeholder="请填写短信验证码">
      <button
        :disabled="msgdisable"
        @click="getMsg"
        class="button">{{codeText}}
      </button>
    </section>
    <button :class="['r-btn',{active:availBtn}]" :disabled="!availBtn" @click="showPass">支取</button>
    <div class="r-agreement">
      立即支取代表您已阅读并同意<span>《定期存款收益权转让合同》</span>
    </div>






  </div>
</template>
<script>
  import API from '@/service'
  import util from "libs/util";
  import {PageName, BusName, LsName, imgSrc} from "@/Constant";
  import PassWordZhengzhou from '@/components/password/PassInputZhengzhou'
  import Mixins from '@/mixins'
  import Bus from '@/plugin/bus'

  export default {
    data() {
      return {
        msgCode:'',
        codeText:'获取验证码',
        imgSrc,
        show: false,
        isFocus: false,
        typeShow: false,
        cur: '0',
        money: '',
        typeText: '快速支取',
        normalShow: false,
        availBtn: false,
        redeemData: {
          HOLD_AMOUNT: '',
          FUND_NO: '',
          PRD_TYPE: '1',
        },

        passCode: '',
        len: '',
        pass: ''
      }
    },
    computed: {
      // placeholder:'
      placeholder() {
        let num = this.redeemData.HOLD_AMOUNT
        return `最多可支取金额${util.formatNum(num)}元`
      }
    },
    mixins: [Mixins.HandleMixin,Mixins.UtilMixin],
    watch: {
      money(n, o) {
        if (n && n - 0 > 0) {
          this.availBtn = true
        } else {
          this.availBtn = false
        }
      }
    },
    created() {
      this.redeemData = this.getComState.redeemData
    },
    components: {
      PassWordZhengzhou
    },
    methods: {

      focus() {
        this.isFocus = true;
      },
      blur() {
        this.money.length > 0 ? this.isFocus = true : this.isFocus = false;
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
        this.money = this.totalNum
      },
      showPass() {
        if (this.cur == 1) {
          this.normalShow = true
        } else {
          this.show = true
        }
      },
      doPay() {
        this.redeemHandle()
      },
      redeemHandle() {
        this.pass = $("#payPasscAAAc").getKBD(); //获取密码
        this.len = $("#payPasscAAAc").getLenKBD(); //获取密码长度
        this.passCode = $("#payPasscAAAc").getBDCode(); //获取密码长度
        let data = {
          TYPE: 'API_REDEMPTION',
          PRD_ID: this.redeemData.PRD_INDEX_ID, //  产品索引
          // PRD_TYPE: this.redeemData.PRD_TYPE,//  产品类型 1货币基金，2理财产品，3纯债基金
          PRD_TYPE: this.redeemData.PRD_TYPE,//  产品类型 1货币基金，2理财产品，3纯债基金
          // FUND_TYPE: this.redeemData.PRD_TYPE, // 基金种类:1-货币基金;2-非货币基金
          FUND_TYPE: this.redeemData.PRD_TYPE, // 基金种类:1-货币基金;2-非货币基金
          APPLY_AMOUNT: this.money, // 支取金额
          REDEEM_TYPE: this.redeemData.PRD_TYPE == 1 ? this.cur : "1", // TODO  支取类型 支取类型(1 为普通支取，0 为 D+0 支取)非 货币只有普通支取
          FUND_TRANS_TYPE: '2', // 基金交易类型（1:申购，2:支取）
          PREFIX: this.passCode, // 输入密码
          BANK_PAY_PW: this.pass, // 支取密码
        }
        API.redeem.apiRedemption(data, res => {
          console.log(res);
          // this.$router.push({name:PageName.RedeemSuccess,query:res})
          let REQ_SERIAL = res.REQ_SERIAL // 交易标示 用于轮询查询
          let params = {
            BIZ_TYPE: '7', // 提现
            BESHARP_SEQ: REQ_SERIAL
          }
          // 轮询 查寻交易状态
          this.queryStatus(
            {
              text: '支取中',
              data: params,
              fn: (result, timer, count) => {
                this.setComState({type:"reload",value:true}) // reload-001
                if ('1' == result.RES_CODE) {
                  clearInterval(timer)
                  Bus.$emit(BusName.showToast, result.RES_MSG);
                  this.$router.push({ // todo是否要跳转
                    name: PageName.RedeemFailure,
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
                    name: PageName.RedeemSuccess,
                    query: {
                      money: this.APPLY_AMOUN,
                      ...res
                    }
                  })
                } else {
                  clearInterval(timer)
                  // if (count == 5) {
                    Bus.$emit(BusName.showToast, result.RES_MSG);
                    this.$router.push({
                      name: PageName.RedeemFailure,
                      query: {
                        err: result.RES_MSG
                      }
                    })
                  // }
                }
              }
            }
          )
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~@/assets/px2rem";
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
        width: px2rem(250);
        font-size: px2rem(24);
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
    margin: 0 auto;
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
    padding-left: 0.5rem;
    height: 1.2rem;
    line-height: 1rem;
    font-size: 0.4rem;
    border-bottom: 1px solid #EEEEF0;
    .button {
      vertical-align: middle;
      width: 2.5rem;
      display: inline-block;
      padding: .1rem;
      border: 1px solid #508CEE;
      color: #508CEE
    }
    input {
      width: 50%;
      border: none;
      box-sizing: border-box;
      font-size: 0.4rem;
      color: #333;
      /* line-height: 0.5rem; */
      outline: none;

    }
  }





</style>

