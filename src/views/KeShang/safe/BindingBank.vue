<template>
  <div>
    <app-bar title="绑定银行卡"></app-bar>
    <section class="card-list">
      <section class="bank-card" v-for="card,index in CARD_LIST" :key="index">
        <section class="top">
          <img :src="imgSrc + card.CARD_BANK_URL" alt="" class="logo">
          <section class="bank">
            <p class="bank-name">{{card.CARD_BANK_NAME}}</p>
            <p class="bank-info">隶属于{{card.CARD_BANK_NAME}}</p>
          </section>
          <section>
            默认卡
          </section>
        </section>
        <section class="card-no">
            <p>**** **** **** **** ****</p>
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
  import { Actionsheet } from 'mint-ui';
  import {BusName} from "../../../Constant";
  Vue.component(Actionsheet.name, Actionsheet);
  export default {
    name: "BindingBank",
    data() {
      return {
        bg_IMG: '',
        imgSrc,
        logo: '',
        sheetVisible: false,
        CARD_LIST:[],
        actions:[
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
      addBank(){
        // Bus.$emit(BusName.showToast,'')
        this.sheetVisible = true
      },
      getBankList() {
        let data = {}
        API.bank.apiBandCard(data, res => {
          this.CARD_LIST = res.CARD_LIST
          this.bg_IMG = res.LOGO_BACKGROUND_URL
          this.logo = res.CARD_BANK_URL
        })
      },
      setDefaultCard(){
        console.log(1)
      },
      unBindingCard(){
        console.log(2)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/assets/px2rem";

  .card-list{
    padding-top:px2rem(30);
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
      top:0;
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
      .bank{
        width: px2rem(190);
        padding-left: px2rem(10);
      }
      .bank-name {
        font-size: px2rem(18);
      }
      .bank-info{
        font-size: px2rem(12);
      }
    }

    .card-no {
      width: 100%;
      box-sizing: border-box;
      padding-top: px2rem(20);
      p{
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
