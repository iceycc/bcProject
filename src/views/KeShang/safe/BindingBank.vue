<template>
  <div>
    <app-bar title="绑定银行卡"></app-bar>
    <section class="card-list">
      <section class="bank-card">
        <!--<img :src="imgSrc + bg_IMG" alt="" class="bgimg">-->
        <section class="top">
          <img :src="imgSrc + logo" alt="" class="logo">
          <section class="bank">
            <p class="bank-name">中信直销银行</p>
            <p class="bank-info">隶属于廊坊直销银行</p>
          </section>
          <section>
            默认卡
          </section>
        </section>
        <section class="card-no">
            <p>**** **** **** **** ****</p>
        </section>
      </section>
    </section>
  </div>
</template>

<script>
  import API from '@/service'
  import {imgSrc} from "@/Constant";

  export default {
    name: "BindingBank",
    data() {
      return {
        bg_IMG: '',
        imgSrc,
        logo: ''
      }
    },
    created() {
      this.getBankList()
    },
    methods: {
      getBankList() {
        let data = {}
        API.bank.apiBandCard(data, res => {
          this.bg_IMG = res.LOGO_BACKGROUND_URL
          this.logo = res.CARD_BANK_URL
        })
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
    margin: 0 auto;
    width: px2rem(342);
    height: px2rem(135);
    border-radius: px2rem(6);
    background: linear-gradient(#FF8572, #FD5861); /* 标准的语法（必须放在最后） */
    box-sizing: border-box;
    padding: px2rem(20);
    .bgimg {
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
</style>
