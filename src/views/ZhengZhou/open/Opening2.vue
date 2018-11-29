<template>
  <div class="warp">
    <app-bar title="信息填写"></app-bar>
    <section class="wrapicon">
      <section class="circle">
                <span class="line1">
                    <img :src='stepImg' alt="">
                </span>
        <p class="step-text">开户信息验证</p>
      </section>
      <section class="circle">
                 <span class="line2">
                    <img :src='stepImg' alt="">
                </span>
        <p class="step-text">绑定银行卡</p>
      </section>
      <section class="circle">
                 <span class="line3 hui">
                    <img :src='stepImg3' alt="">
                </span>
        <p class="step-text" style="color:#D3D3D3">设置密码</p>
      </section>
    </section>

    <div class="opening_box">

      <section class="bank">
        <!--<span style="padding-right: 0px" class="left-p">选择银行</span>-->
        <!--<input type="text" name="back" placeholder=" 请选择银行" v-model="data.ORG_ID">-->
        <!--<span  class="limit">银行限额</span>-->
        <!--<Bank-select class="bank-box" :text="bankText" :options="bankList" @getValue="getBank"-->
        <!--title="银行列表" xiane="false"></Bank-select>-->
      </section>
      <section class="input-box">
        <p class="left-p"> 选择银行</p>
        <!--@input="checkBankName(data.CARD_NO)"-->
        <span class="input">
          {{bankText}}
        </span>
        <img @click="showBindBankList" src="@/assets/images/GroupCopy14@2x.png" alt="" class="img">
        <!--<input type="number"-->
        <!--name="backname"  v-model="bankText">-->
      </section>
      <section class="input-box">
        <p class="left-p"> 绑定卡卡号</p>
        <!--@input="checkBankName(data.CARD_NO)"-->
        <input type="number"
               @blur="checkBankName(data.CARD_NO)"
               name="backname" placeholder="请输入储蓄卡卡号" v-model="data.CARD_NO">
      </section>
      <section class="input-box">
        <p class="left-p">手机号码</p>
        <input
          :disabled="telDisabled"
          type="text" name="tel" placeholder="银行预留手机号" v-model="tel">
      </section>
      <section class="input-box">
        <p class="left-p">验证码</p>
        <input
          type="text" placeholder="验证码" v-model="data.PHONE_CODE">
        <button class="msg-code" @click="clickMsgCodeHandle" :disabled="disable">{{codeText}}</button>
      </section>
    </div>
    <!--errMsg-->
    <div class="msg-err" v-if="errMsg">
      <span>{{errMsg}}</span>
    </div>
    <!-- <div class="tijiao Tips">请使用该预留手机号进行开户</div> -->
    <button class="tijiao" @click="goNext">下一步</button>
    <up-select
      @clickBankList="addBankHandle"
      :show="upseletShow"
      :BankList="mainBankList"
      @chooseBank="chooseBankHandle"
    ></up-select>
    <div v-if="ZhengZhouPass" class="bgbox">
      <!--郑州-->
      <div class="passbox">
        <div class="top">
          <div class="field_row_wrap">
            <p class="field_row_key">
              请输入郑州银行（{{data.CARD_NO | CARD_NO_Fliter}}）的密码
            </p>
            <div class="field_row_value">
              <pass-word-zhengzhou
                BankCardPass="bank-passCCCC"
              ></pass-word-zhengzhou>
            </div>
            <p class="info">密码为6位数字</p>
          </div>

        </div>
        <div class="btn">
          <button @click="cancel">取消</button>
          <button @click="subumit">提交</button>
        </div>
      </div>
    </div>
    <div class="jsSelect" v-show="show">
      <section class="select-box">
        <i class="close" @click="show=false"><img :src="closeImg" alt=""></i>
        <p class="title">{{title}}</p>
        <section class="scroll-view">
          <section :id="key" class="bank-class" v-for="bankIndex,key,index in IndexObj" :key="index">
            <p class="bank-index">{{key}}</p>
            <ul class="select">
              <li
                @click="select(item.name,item)"
                :class="{'option':true,'active':item.name==selectValue}"
                v-for="item,index in bankIndex"
                :key="index">
                <img :src="item.src" alt="" class="banklogo">
                <span class="text">{{item.name}}</span>
              </li>
            </ul>
          </section>
        </section>
        <section class="right-index">
                    <span class="letter" @click="toBank(item)" v-for="item,index in indexArr"
                          :key="index"> {{item}}</span>
        </section>
      </section>
    </div>
  </div>
</template>
<script>
  import {PageName, BusName, LsName} from "@/Constant";
  import Bus from '@/plugin/bus'
  import BankSelect from '@/components/commons/BankSelect'
  import Opening2Mixins from './Opening2'
  import util from "../../../libs/util";
  import UpSelect from '@/components/commons/UpSelect'
  import PassWordZhengzhou from '@/components/password/PassInputZhengzhou'

  const Letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  export default {
    data() {
      return {
        show: false,
        upseletShow: false,
        title: '选择银行卡',
        mainBankList: [
          {
            logo: '',
            name: '民生银行',
            dayNum: '100',
            oneNum: '100',
            id: 1,
            bankNo: "6217710708484514"
          }
        ],
        data: {
          CARD_NO: '', // 银行卡号 6214830182284272  6217730711297810
          HAS_BAND: '0', // 是否绑定过
          PHONE_NUM: '', // 15711310733   15011352818
          PRE_PHONE_NUM: '', // 预留 这个是页面取的
          PHONE_CODE: '', // 手机验证码
          LAST_STEP_NUM: '', // 步数
          MESSAGE_TOKEN: '',
          REQ_SERIAL: ''
        },
        tel: '',
        canClick: true,
        codeText: "获取验证码",
        disable: false,
        bankList: [],
        bank: '-1',
        bankText: '请选择开户银行',
        stepImg: require('@/assets/images/account_icon_green2@2x.png'),
        stepImg2: require('@/assets/images/step2@2x.png'),
        stepImg3: require('@/assets/images/step3.png'),
        AllBankListObj: {},
        errMsg: '',
        checkBankName1: false,
        callbackInfos: {},

        closeImg: require('@/assets/images/icon_ask_close.svg'),
        titleSelect: false,
        selectValue: 1,
        IndexObj: {},
        indexArr: Letter,
        backShow: false
      }
    },
    mixins: [Opening2Mixins],
    components: {
      BankSelect,
      UpSelect,
      PassWordZhengzhou
    },
    watch: {
      tel(n, o) {
        if (n.length > 11) { // >11截取
          console.log(n);
          this.tel = n.toString().substr(0, 11)
        }
      },
    },
    filters: {
      telFlter(n) {
        if (n.length > 11) { // >11截取
          return n.toString().substr(0, 11)
        }
      }
    },
    created() {
      this.checkBankStatus(() => {

      })
      this.callbackInfos = this.getComState.openingData
      console.log('callbackInfos>>>', this.callbackInfos);
      if (this.callbackInfos.hasCardList.length > 0) {
        this.data.CARD_NO = this.callbackInfos.hasCardList[0].USER_CARD_ID
        this.bankText = this.callbackInfos.hasCardList[0].OPEN_BANK
        this.mainBankList = this.callbackInfos.hasCardList
      }
      this.tel = this.callbackInfos.PHONE_NUM || ''
      this.getBankList()
    },
    methods: {
      chooseBankHandle(bank) {
        this.bankText = bank.OPEN_BANK
        this.data.CARD_NO = bank.CARD_NO
      },
      showBindBankList() {
        this.upseletShow = !this.upseletShow
        Bus.$emit('showBankList', true)
      },
      addBankHandle() {
        // this.showBindBankList()
        this.showBankList()
      },
      checkBankName(val) {
        this.checkBankName1 = false
        this.checkBankType()
        val = val.replace(/\s+/g, "")
        let bankName
        for (var i = 3; i < 8; i++) {
          if (bankName = this.machBankName((val + '').slice(0, i))) {
            this.bankText = bankName
            console.log('bankName', bankName);
            break
          }
        }
      },
      checkBankNo(val) {
        // 查询银行账户类型
        // this.checkBankType && this.checkBankType()
        val = val.toString()
        // let reg = /\d{15}|\d{19}/
        // console.log(!reg.test(val));
        if (val == '') {
          Bus.$emit(BusName.showToast, '银行卡号不能为空')
          return true
        }
        else if (val.length < 15 || val.length > 19) {
          Bus.$emit(BusName.showToast, '银行卡号格式不正确')
          return true
        } else {
          return false
        }

      },
      toBank(val) {
        if (document.getElementById(val)) {
          document.getElementById(val).scrollIntoView()

        } else {
          Bus.$emit(BusName.showToast, `没有${val}开头的银行`)
        }
      },
      machBankName(pin) {
        return this.AllBankListObj[pin]
      },
      getBank(val) {
        console.log(val);
        this.bankText = val.name
      },

      // 下一步
      goNext() {
        this.doOpengingSecond()
      },


      showBankList() {
        console.log(this.bankList);
        if (!this.canClick) {
          return
        }
        if (JSON.stringify(this.IndexObj) == '{}') {
          this.show = true
          this.IndexObj = this.filterOptions(this.bankList)
        } else {
          this.show = true
        }
      },
      filterOptions(arr) {
        let obj = {}
        arr.forEach(bank => {
          if (!obj[bank.Index]) {
            obj[bank.Index] = [bank]
          } else {
            obj[bank.Index].push(bank)
          }
        })
        return obj
      },
      select(index, name) {
        this.titleSelect = true
        this.show = false
        this.bankText = name.name
        // this.$emit('getValue', name)
        this.selectValue = index
      },
      toBank(val) {
        if (document.getElementById(val)) {
          document.getElementById(val).scrollIntoView()

        } else {
          Bus.$emit(BusName.showToast, `没有${val}开头的银行`)
        }
      },
      bankShowHandle() {
        this.backShow = true
      }
    }

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/px2rem";

  .warp {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .opening_box {
    .bank {
      margin-left: 0.6rem;
      line-height: 1.3rem;
      width: 90%;
      background-size: 0.7rem 0.7rem;
      border-bottom: 1px #E5E5E5 solid;
      display: flex;
      font-size: px2rem(14);
    }
    .input-box {
      margin: 0 auto;
      width: px2rem(330);
      border-bottom: 1px #E5E5E5 solid;
      display: flex;
      .left-p {
        width: px2rem(80) !important;
        box-sizing: border-box;
        font-size: px2rem(14);
        font-family: PingFangSC-Regular;
        color: #444;
        padding: px2rem(15) 0;
      }
      .img {
        padding-top: px2rem(15);
        width: px2rem(20);
        height: px2rem(15);
      }
      input, .input {
        text-align: left;
        font-size: px2rem(14);
        flex: 1;
        color: #333
      }
      .img {
        padding-top: px2rem(15);
        width: px2rem(20);
        height: px2rem(15);
      }
      .input {
        padding-top: px2rem(15);
      }
      button {
        margin-top: px2rem(12);
      }
    }
  }

  .tijiao {
    display: block;
    font-size: px2rem(16);
    color: #fff;
    background-color: #508CEE;
    border-radius: px2rem(4);
    line-height: 1rem;
    width: px2rem(255);
    height: px2rem(44);
    margin: px2rem(55) auto px2rem(20);
    text-align: center;
    border: none;
    outline: none;
  }

  .bank-box {
    display: inline-block;
    width: px2rem(150);
    vertical-align: middle;
  }

  .msg-code {
    vertical-align: middle;
    font-size: px2rem(13);
    width: px2rem(100);
    height: px2rem(26);
    line-height: px2rem(26);
    border: 1px solid #2B74FE;
    border-radius: px2rem(4);
    color: #2B74FE;
    margin-bottom: px2rem(10);
  }

  .wrapicon {
    text-align: center;
    display: flex;
    position: relative;
    margin-bottom: .3rem;
    margin-top: px2rem(4);
    .circle {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .step-text {
      padding-top: px2rem(7);
    }

    .line1, .line2, .line3 {
      position: relative;
      img {
        width: .5rem;
      }
      &:after {
        display: block;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-100%);
        content: '';
        width: 45%;
        background: #92d048;
        height: .1rem;
        overflow: hidden;

      }
    }
    .hui {
      &:after, &.line2:before {
        background: #dee1e3 !important;
      }

    }
    .line2 {
      &:after {
        left: 0;
        right: auto;
      }
      &:before {
        display: block;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-100%);
        content: '';
        width: 45%;
        background: #92d048;
        height: .1rem;
        overflow: hidden;
      }
    }
    .line3 {
      &:after {
        left: 0;
        right: auto;
      }
    }

  }

  .msg-err {
    text-align: center;
    margin: px2rem(20) auto 0;
    span {
      display: inline-block;
      min-width: px2rem(200);
      font-size: px2rem(12);
      color: #fff;
      background-color: #FF5B05;
      border-radius: px2rem(5);
      height: px2rem(29);
      line-height: px2rem(29);
      padding: 0 px2rem(10);
    }
  }

  .bgbox {
    width: 100%;
    height: 100%;
    background: rgba(1, 1, 1, .7);
    position: absolute;
    padding-top: px2rem(100);
    top: 0;
    left: 0;
    .passbox {
      background: #fff;
      width: 80%;
      margin: 0 auto;
      box-sizing: border-box;
    }
    .top {
      padding: 0.4rem;
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
      border-radius: px2rem(4);
      border: 1px solid #DDD;
      height: px2rem(34);
      line-height: px2rem(34);
      padding-left: px2rem(3);
      margin: 0.2rem 0;
    }
    .info {
      font-size: 0.3rem;
      line-height: 0.6rem;
      color: #aeaeae;
    }
    .btn {
      border-top: 1px solid #efefef;
      padding: px2rem(14) 0;
      display: flex;
      button {
        color: #108EE9;
        font-size: px2rem(17);
        margin: 0 .3rem;
        text-align: center;
        flex: 1;
      }
    }
  }

  .add-back {
    /*z-index: 10;*/
    /*top: 0;*/
    /*left: 0;*/
    /*position: fixed;*/
    /*width: px2rem(300);*/
    /*height: px2rem(300);*/
    /*background: #fff;*/
    /*.box {*/

    /*}*/
  }

  .jsSelect {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(1, 1, 1, 0.3);
    padding: 1rem 0.6rem;
    box-sizing: border-box;
    z-index: 3;
    color: #333
  }

  .select-box {
    position: relative;
    border-radius: 10px;
    background: #fff;
    height: 90%;
    padding: .3rem 0 .6rem;
    .right-index {
      position: absolute;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      max-height: 91%;
      width: 1rem;
      right: .4rem;
      top: px2rem(45);
      text-align: center;
      &::-webkit-scrollbar {
        display: none;
      }
      .letter {
        color: #89afe6;
        display: block;
        font-size: px2rem(16);
        line-height: 1.4;
      }
    }
    .title {
      text-align: center;
      font-size: .5rem;
      margin: 0 px2rem(20);
      border-bottom: 1px solid #dedede;
    }
    .scroll-view {
      max-height: 90%;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .option {
      border-bottom: 1px solid #dedede;
      font-size: 0;
      line-height: px2rem(30);
      height: px2rem(30);
      .text {
        font-size: .4rem;
        vertical-align: middle;
        margin-left: .2rem;
      }
      .banklogo {
        width: .6rem;
        vertical-align: middle;
      }
    }
    .active {
      color: #5db0f9;
    }
    .close {
      font-style: normal;
      position: absolute;
      top: -0.1rem;
      right: .3rem;
      font-weight: bold;
      color: #ccc;
      font-size: .6rem;
      width: px2rem(20);
      height: px2rem(20);
      img {
        width: 100%;
        height: 100%;
      }

    }

  }

  .activeTitle {
    color: #333;
  }

  .bank-class {
    padding: 0 px2rem(20);
    .bank-index {
      font-size: .4rem;
      line-height: 0;
      padding: px2rem(20) 0 px2rem(10);

    }
  }
</style>
