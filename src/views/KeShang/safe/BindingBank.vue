<template>
  <div>
    <app-bar title="绑定银行卡"></app-bar>
    <section class="card-list">
      <section class="bank-card" v-for="card,index in CARD_LIST" :key="index" @click="managerCard(card)">
        <section class="top">
          <img :src="imgSrc + card.CARD_BANK_URL" alt="" class="logo">
          <section class="bank">
            <p class="bank-name">{{card.CARD_BANK_NAME}}</p>
            <p class="bank-info">隶属于{{card.CARD_BANK_NAME}}</p>
          </section>
          <section v-if="index==0">
            默认卡
          </section>
        </section>
        <section class="card-no">
          <p>{{card.CARD_NUM |formatBankNo}}</p>
        </section>
        <!--<img :src="imgSrc + card.CARD_BANK_URL" alt="" class="bgimg" :style="'background:url ">-->
      </section>
    </section>
    <div class="add-card" @click="addBank">添加银行卡</div>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>

<script>
  import Vue from 'vue'
  import API from '@/service'
  import {imgSrc} from "@/Constant";
  import {Actionsheet} from 'mint-ui';
  import {BusName, PageName} from "../../../Constant";

  Vue.component(Actionsheet.name, Actionsheet);
  export default {
    name: "BindingBank",
    data() {
      return {
        imgSrc,
        sheetVisible: false,
        CARD_LIST: [],
        clickBankCard: {},
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
    methods: {
      addBank() {
        this.$router.push({name: PageName.AddNewBank})
      },
      // 点击弹出银行卡管理
      managerCard(card) {
        console.log(card);
        // Bus.$emit(BusName.showToast,'')
        this.clickBankCard = card
        this.sheetVisible = true
      },
      getBankList() {
        let data = {}
        API.bank.apiBandCard(data, res => {
          this.CARD_LIST = res.CARD_LIST
          // 保存绑定的银行卡列表
          this.setComState({type: 'hasCardList', value: res.CARD_LIST})
        })
      },
      setDefaultCard() {
        console.log(1)
        // 设置默认卡
        let data = {
          ACCOUNT_NO: this.clickBankCard.CARD_NUM
        }
        API.safe.apiDefaultBankCard(data)
      },
      unBindingCard() {
        console.log(2)
        // 先发生短信验证码
        let data = {}
        API.common.apiSendPhoneCode(data)

      },
      unBindingCardAPI(){
        // 解绑银行卡
        let card = this.clickBankCard
        let data = {
          BANK_NAME: card.CARD_BANK_NAME,//银行名称
          BANK_ACCOUNT_NO: card.CARD_NUM,//银行账号
          BANK_INNER: '0',// 行内外标识 暂时默认全传他行
          DEFAULT_MARK: card.DEFAULT_MARK == 'true' ? '1' : '0',//是否默认卡
          PHONE_NUM: card.BANK_CARD_PHONE,//银行卡开户行手机号
          BIND_FLG: '2',// 绑定标志 1-绑定，2-解绑
          MESSAGE_TOKEN: '',
          VALIDATE_CODE: '',// 短信验证码

          BANK_CARD_TYPE: '',//
          BANK_NO: '',  //银行行号
          CARD_BIN: '', //卡Bin
          CLEAR_BANK: '',// 清算银行
          CLEAR_BANK_NO: '',// 清算银行行号
        }
        API.safe.apiChangeBingCard(data)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/assets/px2rem";

  .card-list {
    padding-top: px2rem(30);
  }

  .bank-card {
    position: relative;
    margin: 0 auto;
    width: px2rem(342);
    height: px2rem(135);
    border-radius: px2rem(6);
    background: linear-gradient(#FF8572, #FD5861); /* 标准的语法（必须放在最后） */
    box-sizing: border-box;
    padding: px2rem(20);

    .bgimg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .top {
      width: 100%;
      height: px2rem(50);
      display: flex;
      color: #fff;

      .logo {
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
        font-size: px2rem(18);
      }

      .bank-info {
        font-size: px2rem(12);
      }
    }

    .card-no {
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
</style>
