<template>
  <div v-show="typeShow">
    <div class="r-type-popup">
      <div class="title">
        {{title}}
        <span @click="typeShow = false">&times;</span>
      </div>
      <ul class="r-type-list">
        <li
          v-for="bank,index in BankList" :key="index"
          :class="{gray:bank.IS_SUPPORT == 0,active:cur==index}"
          @click="chooseType(index,bank,$event)">
          <img :src="imgSrc + bank.CARD_BANK_URL" class="logo-img" alt="">
          <section v-if="type=='recharge'">
            <p class="name">{{bank.CARD_BANK_NAME}} ({{bank.CARD_NUM| noFilter}})</p>
            <p class="money">单笔充值上限{{bank.SINGLE_QUOTA}},单日充值上限{{bank.DAY_QUOTA}}</p>
          </section>
          <section v-if="type=='withdraw'">
            <p class="name name1">{{bank.CARD_BANK_NAME}} ({{bank.CARD_NUM| noFilter}})</p>
          </section>
        </li>
      </ul>
      <div class="add_bank" @click="addBankList">
        <div class="left">
          <span class="add">+</span>
        </div>
        <span class="right">添加银行卡</span>
      </div>
    </div>
    <div class="grey-mask"></div>
  </div>
</template>

<script>
  import {imgSrc} from "@/Constant";

  export default {
    name: "UpSelect",
    props: {
      title: {
        type: null,
        default: '选择绑定银行卡'
      },
      show: {
        type: null,
        default: false
      },
      type: {
        type: null,
        default: 'recharge'
      },
      BankList: {
        type: null,
        default() {
          return [
            // {
            //   logo: '',
            //   name: '民生银行',
            //   footNum: '0014',
            //   money: '100',
            //   id: 1,
            //   bankno: '1111111'
            // }
          ]
        }
      }
    },
    filters: {
      noFilter(str) {
        if (!str) return '****'
        return str.substr(str.length - 4)
      }
    },
    watch: {
      show(n) {
        this.typeShow = true
      }
    },
    data() {
      return {
        cur: '0',
        typeShow: false,
        imgSrc: imgSrc
      }
    },
    methods: {
      addBankList() {
        this.typeShow = false
        this.$emit('addBank', name)
      },
      chooseType(index, bank, e) {
        console.log(index);
        console.log(this.cur);
        this.$emit('chooseBank', bank)
        this.cur = index;
        this.typeShow = false;
        // this.typeText = e.target.innerText;
      }
    }
  }
</script>

<style scoped lang="scss">


  .add_bank {
    display: flex;
    height: px2rem(72);
    line-height: px2rem(72);

    .left {
      width: px2rem(130);
      padding-left: px2rem(30);
      height: px2rem(30);

      .add {
        display: inline-block;
        width: px2rem(22);
        height: px2rem(22);
        border-radius: px2rem(11);
        border: 1px solid #508CEE;
        font-size: px2rem(18);
        color: #508CEE;
        text-align: center;
        line-height: px2rem(20);
      }
    }

    .right {
      flex: 1;
      font-size: px2rem(16);
    }
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

      span {
        position: absolute;
        top: 0;
        right: px2rem(25);
        font-size: px2rem(26);
        color: #858E9F;
      }
    }

    .r-type-list {
      position: relative;
      max-height: px2rem(288);
      overflow-y: auto;

      li {
        position:relative;
        display: flex;
        height: px2rem(72);
        box-sizing: border-box;
        padding: px2rem(10) px2rem(22);
        border-bottom: 1px solid #EEEEF0;

        .logo-img {
          margin-top: px2rem(10);
          width: px2rem(30);
          height: px2rem(30);
        }

        .name {
          text-align: left;
          font-size: px2rem(15);
          color: #121B32;
        }

        .name1 {
          margin-top: px2rem(10);
        }

        .money {
          line-height: px2rem(30);
          font-size: px2rem(12);
          color: #858E9F;
        }

        section {
          padding-left: px2rem(20);
          text-align: center;
          font-size: px2rem(14);
          color: #666
        }
      }

      /*!*不要对号了*!*/
      li.active:after {
        content: '';
        position: absolute;
        top: px2rem(30);
        right: px2rem(10);
        z-index: 10;
        width: px2rem(18);
        height: px2rem(18);
        background: url("~@/assets/images/check.png") center center no-repeat;
      }

      .gray {
        .money {
          color: #ccc;
        }

        .name {
          color: #ccc;
        }
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
