<template>
  <div>
    <app-bar title="绑定银行卡"></app-bar>
    <section class="card-list">
      <section class="bank-card" v-for="card,index in CARD_LIST" :key="index" @click="managerCard(card)">
        <img :src="imgSrc + card.CARD_BANK_IMAGE_URL" alt="" class="bgimg">
        <!--<img  alt="" class="bgimg">-->
        <section class="top">
          <img :src="imgSrc + card.CARD_BANK_URL" alt="" class="logo">
          <section class="bank">
            <p class="bank-name">{{card.CARD_BANK_NAME}}</p>
            <!--<p class="bank-info">隶属于{{card.CARD_BANK_NAME}}</p>-->
          </section>
          <section v-if="card.DEFAULT_MARK=='1'">
            默认卡
          </section>
        </section>
        <section class="card-no">
          <p>{{card.CARD_NUM |formatBankNo}}</p>
        </section>
      </section>
    </section>
    <div class="add-card" @click="addBank">添加新银行卡</div>
    <section class="msg-code" v-if="BC_PHONE">
      <section class="inner-box">
        <p class="line-1">输入验证码</p>
        <p class="line-2">已发送6位数验证码至</p>
        <p class="line-3">{{BC_PHONE | BC_PHONE_Filter}}，请注意查收</p>
        <label class="input-box" for="bc-msg" @click="clickLabel">
          <span class="box box1">{{code[0]}}</span>
          <span class="box box2">{{code[1]}}</span>
          <span class="box box3">{{code[2]}}</span>
          <span class="box box4">{{code[3]}}</span>
          <span class="box box5">{{code[4]}}</span>
          <span class="box box6">{{code[5]}}</span>
        </label>
        <input id="bc-msg" type="tel" class="msg-input" v-model="msgCode" autocomplete="off" :autofocus="onfocus">

        <img src="@/assets/images/production/close@2x.png" alt="" class="close" @click="BC_PHONE='';msgCode = ''">
      </section>
    </section>
    <div class="show-toatal" v-if="showToatal">
      <div class="msg">
        <p>最少需要绑定一张一类户银行卡</p>
        <button @click="showToatal=false">确定</button>
      </div>
    </div>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>

<script>
  import Vue from 'vue'
  import API from '@/service'
  import {imgSrc} from "@/Constant";
  import {Actionsheet} from 'mint-ui';
  import {BusName, PageName} from "@/Constant";

  Vue.component(Actionsheet.name, Actionsheet);
  export default {
    name: "BindingBank",
    data() {
      return {
        showToatal: false,
        onfocus: true,
        imgSrc,
        code: {},
        sheetVisible: false,
        CARD_LIST: [],
        BANK_USER_ID: '',
        BANK_ACCT_NO: '',
        MESSAGE_TOKEN: '',
        clickBankCard: {},
        BC_PHONE: '',
        msgCode: '',
        actions: [
          {
            name: '设为默认卡',
            method: this.setDefaultCard
          },
          {
            name: '解绑银行卡',
            method: this.unBindingCard
          }
        ]
      }
    },
    created() {
      this.getBankList()
    },
    filters: {
      BC_PHONE_Filter(val) {
        if (!val) return val
        let len = val.length
        val = val.substr(len - 11, 3) + '****' + val.substr(len - 4)
        return val
      }
    },
    watch: {
      // sheetVisible(newVal){
      //   this.onfocus = newVal
      // },
      msgCode(newVal, oldVal) {
        newVal = newVal + ''
        if (newVal.length > 6) {
          this.msgCode = newVal.substr(0, 6)
          return
        }
        for (let i = 0; i <= 6; i++) {
          this.code[i] = newVal[i]
        }
        if (newVal.length == 6) {
          this.unBindingCardAPI()
        }
      }
    },
    methods: {
      clickLabel() {
        console.log(111)
      },
      addBank() {
        this.$router.push({
          name: PageName.AddNewBank, query: {
            BANK_USER_ID: this.BANK_USER_ID,// 银行用户ID
            BANK_ACCT_NO: this.BANK_ACCT_NO,// 电子账户
          }
        })
      },
      // 点击弹出银行卡管理
      managerCard(card) {

        console.log(card);
        setTimeout(() => {
          this.onfocus = true
        }, 100)
        if (card.DEFAULT_MARK == 1) {
          // 默认卡
          this.actions = [
            {
              name: '解绑银行卡',
              method: this.unBindingCard
            }
          ]
        } else {
          this.actions = [
            {
              name: '设为默认卡',
              method: this.setDefaultCard
            },
            {
              name: '解绑银行卡',
              method: this.unBindingCard
            }
          ]
        }
        this.clickBankCard = card
        this.sheetVisible = true
      },
      async getBankList() {
        this.onfocus = false
        let res = await API.safe.apiBandCard({})
        this.BANK_USER_ID = res.BANK_USER_ID
        this.BANK_ACCT_NO = res.BANK_USER_CODE
        this.CARD_LIST = res.CARD_LIST
        // 保存绑定的银行卡列表
        this.setComState({type: 'hasCardList', value: res.CARD_LIST})
      },
      async setDefaultCard() {
        console.log(1)
        this.onfocus = false
        // 设置默认卡
        let data = {
          ACCOUNT_NO: this.clickBankCard.CARD_NUM
        }
        await API.safe.apiDefaultBankCard(data)
        this.getBankList()

      },
      async unBindingCard() {
        console.log(2)
        let num = this.CARD_LIST.length
        if (num == 1) {
          setTimeout(() => {
            this.showToatal = true
          }, 400)
          // Bus.$emit(BusName.showToast, '最少需要绑定一张一类户银行卡')
          return
        }
        // 先发生短信验证码
        let data = {
          BIZ_TYPE: '9', //	类型
          BANK_USER_ID: this.BANK_USER_ID,// 银行用户ID
          BANK_ACCT_NO: this.BANK_ACCT_NO,// 电子账户
        }

        let res = await API.common.apiSendPhoneCode(data)
        this.BC_PHONE = res.BC_PHONE
        this.MESSAGE_TOKEN = res.MESSAGE_TOKEN
      },
      async unBindingCardAPI() {
        // 解绑银行卡
        let card = this.clickBankCard
        let data = {
          BANK_NAME: card.CARD_BANK_NAME,//银行名称
          BANK_ACCOUNT_NO: card.CARD_NUM,//银行账号
          BANK_INNER: '0',// 行内外标识 暂时默认全传他行
          DEFAULT_MARK: card.DEFAULT_MARK,//是否默认卡
          PHONE_NUM: card.BANK_CARD_PHONE,//银行卡开户行手机号
          BIND_FLG: '2',// 绑定标志 1-绑定，2-解绑
          MESSAGE_TOKEN: this.MESSAGE_TOKEN,
          VALIDATE_CODE: this.msgCode,// 短信验证码

          BANK_CARD_TYPE: '',//
          BANK_NO: '',  //银行行号
          CARD_BIN: '', //卡Bin
          CLEAR_BANK: '',// 清算银行
          CLEAR_BANK_NO: '',// 清算银行行号
        }
        try {
          await API.safe.apiChangeBingCard(data)
          this.BC_PHONE = ''
          this.msgCode = ''
          this.getBankList()

        } catch (e) {
          this.BC_PHONE = ''
          this.msgCode = ''
        }

      }
    }
  }
</script>

<style scoped lang="scss">


  .card-list {
    padding-top: px2rem(30);
  }

  .bank-card {
    position: relative;
    margin: 0 auto px2rem(20);
    width: px2rem(342);
    height: px2rem(135);
    border-radius: px2rem(6);
    overflow: hidden;
    background: rgba(0, 0, 0, 0);
    /*background: linear-gradient(#FF8572, #FD5861); !* 标准的语法（必须放在最后） *!*/
    box-sizing: border-box;
    padding: px2rem(20);

    .bgimg {
      position: absolute;
      /*background: linear-gradient(#FF8572, #FD5861); !* 标准的语法（必须放在最后） *!*/
      background: #a3dbff;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }

    .top {
      position: relative;
      width: 100%;
      height: px2rem(50);
      display: flex;
      color: #fff;

      .logo {
        border-radius: 50%;
        border: px2rem(3) solid #fff;
        display: inline-block;
        margin-top: px2rem(4);
        width: px2rem(34);
        height: px2rem(34);
      }

      .bank {
        width: px2rem(190);
        padding-left: px2rem(10);
      }

      .bank-name {
        padding-top: px2rem(8);
        font-size: px2rem(18);
      }

      .bank-info {
        font-size: px2rem(12);
      }
    }

    .card-no {
      position: relative;
      width: 100%;
      box-sizing: border-box;
      padding-top: px2rem(20);

      p {
        font-size: px2rem(18);
        color: #fff;
        padding-left: px2rem(50);
      }
    }
  }

  .add-card {
    width: px2rem(255);
    height: px2rem(44);
    line-height: px2rem(44);
    text-align: center;
    background-color: #518BEE;
    color: #fff;
    font-size: px2rem(18);
    border-radius: px2rem(6);
    margin: px2rem(60) auto 0;
  }

  .msg-code {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);

    .inner-box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: px2rem(304);
      height: px2rem(176);
      border-radius: px2rem(6);
      background: #fff;
      text-align: center;

      .close {
        position: absolute;
        top: px2rem(10);
        right: px2rem(10);
        width: px2rem(14);
        height: px2rem(14);
      }

      .line-1 {
        line-height: 3;
        color: #444;
        font-size: px2rem(16);
      }

      .line-2, .line-3 {
        line-height: 1.6;
        font-size: px2rem(14);
        color: #858E9F
      }
    }

    .msg-input {
      position: fixed;
      top: px2rem(-2000);
      left: px2rem(-1000);
      width: 100%;
      height: 0;
      z-index: 0;
      opacity: 0;
      font-size: px2rem(1);
    }

    .input-box {
      position: relative;
      font-size: 0;
      display: block;
      padding-top: px2rem(20);

      .box {
        margin-right: px2rem(5);
        vertical-align: top;
        width: px2rem(36);
        height: px2rem(36);
        border: 1px solid rgba(221, 221, 221, 1);
        font-size: px2rem(13);
        text-align: center;
        line-height: px2rem(36);
      }


    }
  }

  .show-toatal {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);

    .msg {
      position: absolute;
      box-sizing: border-box;
      padding: px2rem(20);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      width: px2rem(304);
      height: px2rem(106);
      background: rgba(255, 255, 255, 1);
      border-radius: px2rem(6);

      p {
        color: #333333;
        font-size: px2rem(16);
        margin-bottom: px2rem(20);
      }

      button {
        /*width: ;*/
        color: #508CEE;
        font-size: px2rem(17);
      }
    }
  }
</style>
