<template>
  <div style="background: #f6f6f9;height: 100%">
    <app-bar title="电子账户"></app-bar>
    <section class="m-bank-box" v-if="ISLoginBankList.length >0">
      <p class="m-title">已登录</p>
      <section class="m-bank-card"
               v-for="bank,index in ISLoginBankList" :key="index"
               @click.stop="goPage('BankDetail',bank)"
      >
        <div class="m-top">
          <div class="m-logo">
            <img :src="imgSrc + bank.LOGO_URL" alt="">
          </div>
          <div class="m-name">
            <div>{{bank.ORG_NAME}}</div>
            <p>{{bank.DESCRIPT}}</p>
          </div>
        </div>
        <ul class="m-bottom">
          <li>
            <P>总资产</P>
            <P>{{bank.TOTAL_ASSET | formatNum}}</P>
          </li>
          <li>
            <P>昨日收益</P>
            <P>
              <!--<i v-if="bank.YSD_INCOME>=0">+</i>-->
              {{bank.YSD_INCOME | formatNum}}</P>
          </li>
          <li>
            <P>累计收益</P>
            <P><i v-if="bank.TOTAL_INCOME>=0">+</i>{{bank.TOTAL_INCOME | formatNum}}</P>
          </li>
        </ul>
      </section>
    </section>
    <section class="m-bank-box" v-if="NOLoginBankList.length >0">
      <p class="m-title">未登录</p>
      <section class="m-bank-card" v-for="bank,index in NOLoginBankList" :key="index">
        <div class="m-top">
          <div class="m-logo">
            <img :src="imgSrc + bank.LOGO_URL" alt="">
          </div>
          <div class="m-name">
            <div>{{bank.ORG_NAME}}</div>
            <p>{{bank.DESCRIPT}}</p>
          </div>
          <div class="m-btn" @click="goPage('Login',bank)">安全登录</div>
        </div>
        <ul class="m-bottom">
          <li>
            <P>总资产</P>
            <P>- -</P>
          </li>
          <li>
            <P>昨日收益</P>
            <P>- -</P>
          </li>
          <li>
            <P>累计收益</P>
            <P>- -</P>
          </li>
        </ul>
      </section>
    </section>
  </div>
</template>

<script>
  import API from "@/service";
  import {PageName, LsName, imgSrc} from "@/Constant";
  import util from "libs/util";
  import {mapActions} from 'vuex'

  export default {
    name: "SafeLogin",
    data() {
      return {
        imgSrc,
        BankList: [],
        ISLoginBankList: [],
        NOLoginBankList: []
      }
    },
    created() {
      this.getBankList()
    },
    methods: {
      ...mapActions(['SET_BANK_INFO']),
      goPage(page, bank) {
        // util.storage.session.set(LsName.ORG_ID, bank.ORG_ID)
        // this.$store.dispatch('SET_BANK_INFO',...)
        this.SET_BANK_INFO({
            ...bank
        })
        if (page == 'Login') {
          this.setComState(
            {
              type:'loginType',
              value:PageName.BankAccount
            }
          )
          // util.storage.session.set(LsName.loginType, PageName.BankAccount)
          this.$router.push({
            name: PageName.Login,
          })
        }
        if (page == 'BankDetail') {
          this.$router.push({
            name: PageName.BankDetail,
            query: {
              NAME: bank.ORG_NAME
            }
          })
        }
      },
      // get
      getBankList() {
        let data = {}
        API.account.apiBankList(data, (res) => {
          this.BankList = res.BANK_LIST
          this.ISLoginBankList = this.BankList.filter((item, index) => {
            return item.HAS_LOGIN == 1
          })
          this.NOLoginBankList = this.BankList.filter((item, index) => {
            return item.HAS_LOGIN == 2
          })
        }, (err) => {
          console.log(err);
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/px2rem";

  i {
    font-style: normal;
  }

  .m-bank-box {
    width: 100%;
    .m-title {
      padding-left: px2rem(20);
      font-size: px2rem(12);
      height: px2rem(30);
      line-height: px2rem(30);
      color: #999;
    }
    .m-top {
      background: #fff;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f6f6f9;
      box-sizing: border-box;
      padding: px2rem(15) px2rem(20);
      position: relative;
      .m-logo {
        box-sizing: border-box;
        width: px2rem(52);
        img {
          width: px2rem(36);
          height: px2rem(36);
        }
      }
      .m-name {
        width: px2rem(200);
        div {
          font-size: px2rem(18);
          color: #333;
          padding-bottom: px2rem(4);
        }
        p {
          color: #A8B4C4;
          font-size: px2rem(14);
        }
      }
      .m-btn {
        position: absolute;
        right: px2rem(20);
        top: 50%;
        transform: translateY(px2rem(-12));
        width: px2rem(80);
        height: px2rem(24);
        background: #FFB403;
        border-radius: px2rem(10);
        color: #fff;
        text-align: center;
        line-height: px2rem(24);
      }

    }
    .m-bottom {
      background: #fff;
      padding: px2rem(15) px2rem(20);
      font-size: px2rem(14);
      display: flex;
      justify-content: space-between;
      li {
        box-sizing: border-box;
        text-align: center;
        p:first-child {
          color: #666;
          line-height: 1.5;
        }
        p:last-child {
          color: #333;
        }
      }
    }
  }

  .u-btn {
    display: inline-block;
    width: px2rem(80);
    height: px2rem(24);
    background: #FFB403;
    border-radius: px2rem(10);
    color: #fff;
    text-align: center;
    line-height: px2rem(24);
  }

</style>
