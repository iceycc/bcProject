<template>
  <div>
    <app-bar title="赎回"></app-bar>
    <div class="r-top">
      <img :src="imgSrc+redeemData.LOGO_URL" alt="">
      <div>
        <p>{{redeemData.PRD_NAME}}</p>
        <span>货币基金</span>
      </div>
    </div>
    <div class="r-cash">
      <div class="title">赎回金额</div>
      <div class="money">
        <div class="number">
          <i v-show="isFocus">￥</i>
          <input type="number" @focus="focus" @blur="blur" :placeholder="placeholder" v-model="money">
          <img
            v-show="!ifCheckMoneyEmpty"
            src="@/assets/images/icon_clear@2x.png" alt="" class="close-icon" @click="clearNumHandle">
        </div>
        <div class="all" @click="selectAll">全部赎回</div>
      </div>
    </div>
    <div class="r-type">
      <div class="type">赎回类型</div>
      <div class="choose" @click="typeShow = true">
        <span>{{typeText}}</span>
        <i class="iconfont icon-xiangyou"></i>
      </div>
    </div>
    <div class="r-tips">
      <p>每天快速赎回额度为1万元。</p>
      <p>如果赎回金额超过实施赎回额度，请进行普通赎回操作。</p>
      <p>普通赎回T+1工作日16:30后到账。</p>
    </div>
    <button :class="['r-btn',{active:availBtn}]" :disabled="!availBtn" @click="showPass">赎回</button>
    <div class="r-agreement">
      立即赎回代表您已阅读并同意<span @click="goPage">《“日添利-博时基金 ”产品业务服务协议》</span>
    </div>
    <div class="r-caption">
      <p>温馨提示：</p>
      <p>工作日指上海证券交易所和深圳证券交易所的正常交易日，非工作日指其他日期（如国家法定节假日、周六日、调休等）。
        工作日15:00之前发起成功的存入交易申请，基金公司于第二个工作日予以确认份额，工作日15:00之后及非工作日发起成功的存入交易申请视为下一个工作日发起的交易申请，具体结果以基金公司的确认结果为准。</p>
      <p>风险提示：产品过往业绩不代表其未来表现，不构成产品未来业绩表现的保证。理财有风险，投资需谨慎。</p>
    </div>
    <div class="grey-mask" v-show="typeShow"></div>
    <div class="r-type-popup" v-show="typeShow">
      <div class="title">
        赎回类型
        <i @click="typeShow = false">&times;</i>
      </div>
      <!--// 1 普通赎回  0 快速赎回-->
      <ul class="r-type-list">
        <li :class="cur == '0' ? 'active' : ''" @click="chooseType('0',$event)">
          <span>快速赎回</span>
          <i></i>
        </li>
        <li :class="cur == '1' ? 'active' : ''" @click="chooseType('1',$event)">
          <span>普通赎回</span>
          <i></i>
        </li>
      </ul>
    </div>
    <div class="white-mask" v-show="normalShow"></div>
    <div class="r-normal-popup" v-show="normalShow">
      <div class="info">工作日15:30之前发起成功的普通赎回到账时间为下一个工作日16:30后到账，工作日15:00之后以及非工作日发起成功的普通赎回申请视为下一个工作日发起的交易申请。是否进行普通赎回？
      </div>
      <div class="cofirm-btn">
        <div @click="normalShow = false">取消</div>
        <div @click="sure">确定</div>
      </div>
    </div>
    <section v-if="show" class="bgbox">
      <section class="passbox">
        <p class="title">
          <img src="@/assets/images/icon_dunpai@2x.png" alt="">
          由郑州银行提供技术保障</p>
        <section class="field_row_wrap">
          <p class="field_row_key">
            交易密码
          </p>
          <div class="field_row_value">
            <!--<PassInputZhengzhou></PassInputZhengzhou> -->
            <pass-word-zhengzhou
              BankCardPass="payPasscAAAc"
            ></pass-word-zhengzhou>
          </div>
          <p class="info">密码由数字组成，必须为6位</p>
        </section>
        <div class="btn">
          <mt-button @click="show =!show" type="primary">取消</mt-button>
          <mt-button @click="doPay" type="primary">提交</mt-button>
        </div>
      </section>
    </section>
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
        imgSrc,
        show: false,
        isFocus: false,
        typeShow: false,
        cur: '0',
        money: '',
        normalShow: false,
        availBtn: false,
        redeemData: {
          HOLD_AMOUNT: '',
          FUND_NO: '',
          PRD_TYPE: '1',
        },

        passCode: '',
        len: '',
        pass: '',
        num: '',

      }
    },
    computed: {
      typeText() {
        // typeText: '快速赎回',
        if (this.cur == 0) {
          return '快速赎回'
        }
        if (this.cur == 1) {
          return '普通赎回'
        }
      },
      ifCheckMoneyEmpty() {
        if (this.money) {
          return false
        } else {
          return true
        }
      },
      // placeholder:'
      placeholder() {
        this.num = this.redeemData.HOLD_AMOUNT
        return `最多可赎回金额${util.formatNum(this.num)}元`
      }
    },
    mixins: [Mixins.HandleMixin, Mixins.UtilMixin],
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
      clearNumHandle() {
        this.money = ''
      },
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
        // 普通赎回需要弹出层
        this.cur = val; // 1 普通赎回  0 快速赎回
        // this.typeText = e.target.innerText;
        this.typeShow = false;
      },
      selectAll() {
        this.isFocus = true
        this.money = this.redeemData.HOLD_AMOUNT
      },
      showPass() {
        console.log(this.num);
        console.log(this.money);
        if (this.money - 0 > this.num - 0) {
          Bus.$emit(BusName.showToast, '赎回金额不足')
          return
        }
        if (this.cur == 1) { // 普通赎回

          this.normalShow = true
        } else { // 快速赎回
          if (this.money - 0 > 10000) {
            Bus.$emit(BusName.showToast, '每天快速赎回额度为1万元，请调整赎回额度')
            return
          }
          this.show = true
        }
      },
      doPay() {
        this.redeemHandle()
      },
      goPage() {
        this.$router.push({name: PageName.DocsPage, query: {type: 'buy'}})
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
          APPLY_AMOUNT: util.fromatMoney(this.money), // 赎回金额
          REDEEM_TYPE: this.redeemData.PRD_TYPE == 1 ? this.cur : "1", // TODO  赎回类型 赎回类型(1 为普通赎回，0 为 D+0 赎回)非 货币只有普通赎回
          FUND_TRANS_TYPE: '2', // 基金交易类型（1:申购，2:赎回）
          PREFIX: this.passCode, // 输入密码
          BANK_PAY_PW: this.pass, // 赎回密码
        }
        this.show = false

        API.redeem.apiRedemption(data, res => {
          console.log(res);
          // this.$router.push({name:PageName.RedeemSuccess,query:res})
          let REQ_SERIAL = res.REQ_SERIAL // 交易标示 用于轮询查询
          // if(REQ_SERIAL)
          let params = {
            BIZ_TYPE: '7', // 提现
            BESHARP_SEQ: REQ_SERIAL
          }
          // 轮询 查寻交易状态
          this.queryStatus(
            {
              text: '赎回中',
              data: params,
              fn: (result, timer, count) => {
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
                      money: this.money,
                      ...result
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
        position: relative;
        width: px2rem(250);
        font-size: px2rem(24);
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

  .r-type {
    display: flex;
    justify-content: space-between;
    padding: px2rem(15) px2rem(20);
    font-size: px2rem(14);
    border-bottom: 1px solid #EEEEF0;
    .type {
      color: #333;
    }
    .choose {
      color: #858E9F;
      i {
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

  .r-caption {
    color: #9199A1;
    padding: 0 px2rem(20) px2rem(80);
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

  .r-type-popup {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 99;
    background-color: #fff;
    .title {
      text-align: center;
      height: px2rem(45);
      line-height: px2rem(45);
      position: relative;
      font-size: px2rem(18);
      color: #444;
      border-bottom: 1px solid #EEEEF0;
      i {
        position: absolute;
        top: 0;
        right: px2rem(25);
        font-size: px2rem(26);
        color: #858E9F;
      }
    }
    .r-type-list {
      li {
        padding: px2rem(22);
        border-bottom: 1px solid #EEEEF0;
        display: flex;
        justify-content: space-between;
        span {
          font-size: px2rem(14);
          color: #444;
        }
      }
      i {
        width: px2rem(18);
        height: px2rem(18);
      }
      .active i {
        background: url("~@/assets/images/check.png") center center no-repeat;
      }

    }
  }

  .white-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: transparent;
    z-index: 9;
  }

  .r-normal-popup {
    position: fixed;
    width: px2rem(270);
    background-color: #fff;
    z-index: 99;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, .2);
    border-radius: px2rem(6);
    .info {
      padding: px2rem(20);
      font-size: px2rem(14);
      color: #333;
      border-bottom: 1px solid #EEEEF0;
      line-height: px2rem(24);
    }
    .cofirm-btn {
      display: flex;
      div {
        width: 50%;
        box-sizing: border-box;
        text-align: center;
        padding: px2rem(10) 0;
        color: #108EE9;
        font-size: px2rem(17);
        &:first-child {
          border-right: 1px solid #EEEEF0;
        }
      }

    }
  }

  .bgbox {
    z-index: 2;
    width: 100%;
    height: 100%;
    background: rgba(1, 1, 1, .7);
    position: fixed;
    padding-top: 0.7rem;
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
    .info {
      font-size: 0.3rem;
      line-height: 0.6rem;
      color: #aeaeae;
    }
    .btn {
      display: flex;
      button {
        margin: 0 .3rem;
        text-align: center;
        flex: 1;
      }
    }
  }
</style>

