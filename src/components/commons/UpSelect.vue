<template>
  <div v-if="typeShow">
    <div class="r-type-popup">
      <div class="title">
        选择付款方式
        <i @click="typeShow = false">&times;</i>
      </div>
      <ul class="r-type-list" v-for="bank in BankList" :key="bank.id">
        <li :class="cur === bank.id ? 'active' : ''" @click="chooseType(bank.id,$event)">
          <img :src="imgSrc + bank.logo" class="logo-img" alt="">
          <section>
            <p class="name">{{bank.name}}</p>
            <p>尾号{{bank.footNum}}</p>
          </section>
          <section class="money">
            余额：1.000.00
          </section>
        </li>
      </ul>
    </div>
    <div class="grey-mask"></div>
  </div>
</template>

<script>
  import {imgSrc} from "@/Constant";
  export default {
    name: "UpSelect",
    props: {
      show: {
        type: null,
        default: false
      },
      BankList:{
        type:null,
        default(){
          return[
            {
              logo:'',
              name:'民生银行',
              footNum:'0014',
              money:'100',
              id:1
            }
          ]
        }
      }
    },
    watch: {
      show(n) {
        this.typeShow = true
      }
    },
    data() {
      return {
        cur: 1,
        typeShow: false,
        imgSrc:imgSrc
      }
    },
    methods: {
      chooseType(val, e) {
        this.cur = val;
        this.typeShow = false;
        this.typeText = e.target.innerText;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/assets/px2rem";

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
      position: relative;
      li {
        display: flex;
        padding: px2rem(22);
        border-bottom: 1px solid #EEEEF0;
        .logo-img{
          width: px2rem(40);
          height: px2rem(40);
        }
        .name{
          color: #000;
        }
        .money{
          padding-left: px2rem(50);
          line-height: px2rem(40);
          font-size: px2rem(14);
          color: #000;
        }
        section{
          padding-left: px2rem(30);
          text-align: center;
          font-size: px2rem(14);
          color:#666
        }
      }
      li.active:after{
        content: '';
        position: absolute;
        top: px2rem(30);
        right: px2rem(10);
        z-index: 10;
        width: px2rem(18);
        height: px2rem(18);
        background: url("../../assets/images/check.png") center center no-repeat;
      }
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
</style>
