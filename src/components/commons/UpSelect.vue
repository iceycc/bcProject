<template>
  <div v-if="typeShow">
    <div class="r-type-popup">
      <div class="title">
        选择绑定银行卡
        <span @click="typeShow = false">&times;</span>
      </div>
      <ul class="r-type-list">
        <li
          v-for="bank,index in newBankList" :key="index"
          :class="{gray:bank && bank.isSupport == 0,active:cur == index}"
          @click="chooseType(index)">
          <img :src="imgSrc + bank.bankLogoUrl" class="logo-img" alt="">
          <section v-if="hasQuota" class="has-quota">
            <p class="name">{{bank.openBank}}（{{bank.cardNo| noFilter}}）</p>
            <p v-if="bank.msgQuota" class="money">{{bank.msgQuota}}</p>
            <p v-else class="money">单笔充值上限{{bank.singleQuota}}，单日充值上限{{bank.dayQuota}}</p>
          </section>
          <!--不需要限额的-->
          <section v-if="!hasQuota" class="no-quota">
            <p class="name">{{bank.openBank}}（{{bank.cardNo| noFilter}}）</p>
          </section>
        </li>
      </ul>
      <div class="add_bank" @click="addBankList">
        <div class="left">
          <span class="add">+</span>
        </div>
        <span class="right">{{bottomText}}</span>
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
      show: {
        type: null,
        default: false
      },
      BankList: {
        type: null,
        default() {
          return []
        }
      },
      hasQuota: {
        type: Boolean,
        default: true
      },
      bottomText: {
        type: String,
        default: '添加其它银行卡'
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
      },

    },
    computed: {
      newBankList() {
        return this.adapterBankList(this.BankList)
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
      adapterBankList(bankList) {
        return bankList.map(bank => {
          return {
            isSupport: bank.IS_SUPPORT || bank.isSupport,
            bankLogoUrl: bank.BANK_LOGO_URL || bank.bankLogoUrl || bank.cardBankUrl,
            openBank: bank.OPEN_BANK || bank.openBank || bank.cardBankName,
            cardNo: bank.CARD_NO || bank.cardNo || bank.cardNum,
            msgQuota: bank.MSG_QUOTA || bank.msgQuota,
            dayQuota: bank.DAY_QUOTA || bank.dayQuota,
            singleQuota: bank.SINGLE_QUOTA || bank.singleQuota,
          }
        })
      },
      //
      addBankList() {
        this.typeShow = false
        this.$emit('addBank', name)
      },
      chooseType(index) {
        this.$emit('chooseBank', this.BankList[index])
        this.cur = index;
        console.log(index);
        console.log(this.cur);
        this.typeShow = false;
        // this.typeText = e.target.innerText;
      }
    }
  }
</script>

<style scoped lang="scss">


  .add_bank {
    display: flex;
    height: px2rem(40);
    line-height: px2rem(40);

    .left {
      width: px2rem(110);
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
      max-height: px2rem(320);
      overflow-y: auto;

      li {
        position: relative;
        display: flex;
        padding: px2rem(22);
        border-bottom: 1px solid #EEEEF0;

        .logo-img {
          width: px2rem(40);
          height: px2rem(40);
        }

        .name {
          text-align: left;
          color: #000;
        }

        .money {
          line-height: px2rem(40);
          font-size: px2rem(12);
          color: #858E9F;
        }

        section {
          padding-left: px2rem(30);
          text-align: left;
          font-size: px2rem(14);
          color: #666
        }

        .no-quota {
          .name {
            margin-top: px2rem(7);
          }
        }
      }

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
          color: #B3B3B3;
          font-size: px2rem(12);
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
