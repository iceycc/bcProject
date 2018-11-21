<template>
  <div style="background: #f6f6f9;height: 100%" v-show="Bshow">
    <app-bar :title="title"></app-bar>
    <ul class="w-tap">
      <li :class="{actvie:cur==1}" @click="tap(1)">产品列表</li>
      <li :class="{actvie:cur==2}" @click="tap(2)">我的资产</li>
    </ul>
    <!--<section class="m-bank-box">-->
    <!--<p class="m-title">测试</p>-->
    <!--<section class="m-bank-card" v-for="bank,index in textBankList" :key="index">-->
    <!--<div class="m-top">-->
    <!--<div class="m-logo">-->
    <!--<img :src="imgSrc + bank.LOGO_URL" alt="">-->
    <!--</div>-->
    <!--<div class="m-name">-->
    <!--<div>{{bank.ORG_NAME}}</div>-->
    <!--<p>{{bank.DESCRIPT}}</p>-->
    <!--</div>-->
    <!--<div class="m-btn" @click="goPage('Login',bank)">安全登录</div>-->
    <!--</div>-->
    <!--<ul class="m-bottom">-->
    <!--<li>-->
    <!--<P>总资产</P>-->
    <!--<P>- -</P>-->
    <!--</li>-->
    <!--<li>-->
    <!--<P>昨日收益</P>-->
    <!--<P>- -</P>-->
    <!--</li>-->
    <!--<li>-->
    <!--<P>累计收益</P>-->
    <!--<P>- -</P>-->
    <!--</li>-->
    <!--</ul>-->
    <!--</section>-->
    <!--</section>-->

    <section class="m-bank-box" v-if="ISLoginBankList.length >0">
      <p class="m-title">已登录</p>
      <section class="m-bank-card"
               v-for="bank,index in ISLoginBankList" :key="index"
               @click.stop="goPage('BankDetail',bank)"
      >
        <div class="m-top">
          <div class="m-logo">
            <img :src="imgSrc + bank.BANK_LOGO_URL" alt="">
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
            <img :src="imgSrc + bank.BANK_LOGO_URL" alt="">
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
    <!--<div class="footer-btn">-->
    <!--<button>产品列表</button>-->
    <!--<button>我的资产</button>-->
    <!--</div>-->
  </div>
</template>

<script>
  import API from "@/service";
  import {PageName, LsName, imgSrc} from "@/Constant";
  import util from "libs/util";
  import {mapActions} from 'vuex'
  import {BusName, CheckBank} from "../../Constant";
  import Bus from '@/plugin/bus/index'

  export default {
    name: "SafeLogin",
    data() {
      return {
        title: '我的资产',
        cur: '2',
        Bshow: true,
        imgSrc,
        BankList: [],
        ISLoginBankList: [],
        ISLoginBankList2: [],
        NOLoginBankList: [],
        textBankList: [
          {
            ORG_ID: '49',
            ORG_NAME: '郑州银行',
            LOGO_URL: '',
            DESCRIPT: '隶属于郑州银行',
            BANK_NAME: '郑州银行'
          },
          {
            ORG_ID: '70',
            ORG_NAME: '晋商银行',
            LOGO_URL: '',
            DESCRIPT: '隶属于晋商银行',
            BANK_NAME: '晋商银行'
          },
          {
            ORG_ID: '227',
            ORG_NAME: '众邦银行',
            LOGO_URL: '',
            DESCRIPT: '隶属于郑州银行',
            BANK_NAME: '众邦银行'
          },
        ]
      }
    },
    created() {
      this.reLoadToLogin()

    },
    methods: {
      ...mapActions(['SET_BANK_INFO']),
      tap(val) {
        if (val == 1) {
          this.$router.push({name: PageName.ProductList})
        }
        if (val == 2) {

        }
      },
      reLoadToLogin() {
        let reload = util.storage.session.get('reload') || false
        let flag = util.storage.session.get('flag') || null
        console.log('reload', reload);

        if (reload && JSON.stringify(reload) != '{}') {
          console.log('reload fn');
          this.Bshow = false
          setTimeout(() => {
            this.Bshow = true
          }, 1000)
          let NAME = this.$route.query.NAME
          util.storage.session.set('reload', false)
          util.storage.session.remove('flag')
          this.$router.push({
            name: flag,
            query: {
              NAME
            }
          })
        } else {
          this.getOpenBankList()
        }
      },
      goPage(page, bank) {
        let ORG_ID = bank.ORG_ID
        if (!CheckBank(ORG_ID)) {
          Bus.$emit(BusName.showToast, '暂不支持该银行，请下载比财App')
          return
        }
        // util.storage.session.set(LsName.ORG_ID, bank.ORG_ID)
        // this.$store.dispatch('SET_BANK_INFO',...)
        this.SET_BANK_INFO({
          ...bank
        })
        if (page == 'Login') {
          this.setComState(
            {
              type: 'loginType',
              value: PageName.BankAccount
            }
          )
          util.storage.session.set('ORG_ID', bank.ORG_ID)
          util.storage.session.set('flag', PageName.Login)
          util.storage.session.set('reload', true)
          window.location.reload()
          // util.storage.session.set(LsName.loginType, PageName.BankAccount)
          // this.$router.push({
          //   name: PageName.TestPage,
          // })
        }
        if (page == 'BankDetail') {
          util.storage.session.set('ORG_ID', bank.ORG_ID)
          util.storage.session.set('flag', PageName.BankDetail)
          util.storage.session.set('reload', true)
          window.location.reload()

          // this.$router.push({
          //   name: PageName.TestPage,
          //   query: {
          //     NAME: bank.ORG_NAME
          //   }
          // })
        }
      },
      //
      // get
      getOpenBankList() {
        //  已开户
        API.bicai.getBankList({OPEN_TYPE: '1'}, (res) => {
          let list = res.BANK_LIST
          if(res.OPEN_STATUS==0){
            list=[]
          }
          this.ISLoginBankList = list
          for (let i = 0; i < this.ISLoginBankList.length; i++) {
            this.getOneBankInfo(this.ISLoginBankList[i].ORG_ID, i)
          }
          // this.BankList = this.BankList.concat(list)

        }, (err) => {
          console.log(err);
        })
        // 未开户
        API.bicai.getBankList({OPEN_TYPE: '0'}, (res) => {
          let list = res.BANK_LIST
          this.NOLoginBankList = list
          // this.BankList = this.BankList.concat(list)
          // this.filterBankList(this.BankList)
        }, (err) => {
          console.log(err);
        })
      },
      filterBankList(list) {
        this.ISLoginBankList = list.filter((item, index) => {
          return item.LOGIN_STATUS == 1
        })
        for (let i = 0; i < this.ISLoginBankList.length; i++) {
          this.getOneBankInfo(this.ISLoginBankList[i].ORG_ID, i)
        }
        this.NOLoginBankList = list.filter((item, index) => {
          return item.LOGIN_STATUS == 0
        })
      },
      // 对已经登陆的银行获取资产
      getOneBankInfo(ORG_ID, i) {
        let data = {
          ORG_ID
        }
        let info = {};
        if(ORG_ID=='49'){
          API.commonApi.getBankBalance.ZZH(data, res => {
            // API.bank.apiQryAsset(data, res => {
            info = res
            // ACC_REST: "400.00"
            // CUST_SERVICE_HOTLINE: "95097"
            // TOTAL_ASSET: "600.06"
            // TOTAL_INCOME: "0.06"
            // YSD_INCOME: "0.06"
            let arr = this.ISLoginBankList[i]
            this.$set(this.ISLoginBankList, i, {
              ...arr,
              ...res
            })
          })
        }
        if(ORG_ID=='227'){
          API.commonApi.getBankBalance.ZBH(data, res => {
            // API.bank.apiQryAsset(data, res => {
            info = res
            // ACC_REST: "400.00"
            // CUST_SERVICE_HOTLINE: "95097"
            // TOTAL_ASSET: "600.06"
            // TOTAL_INCOME: "0.06"
            // YSD_INCOME: "0.06"
            let arr = this.ISLoginBankList[i]
            this.$set(this.ISLoginBankList, i, {
              ...arr,
              ...res
            })
          })
        }
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

  .footer-btn {
    position: fixed;
    width: 100%;
    bottom: px2rem(20);
    text-align: center;
    button {
      margin: 0 px2rem(30);
      width: px2rem(100);
      height: px2rem(40);
      background: #2f74ff;
      color: #fff;
      border-radius: px2rem(6);
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

  .w-tap {
    display: flex;
    margin-top: px2rem(3);
    li {
      flex: 1;
      height: px2rem(40);
      line-height: px2rem(40);
      font-size: px2rem(18);
      text-align: center;
      background: #fff;
      &.actvie {
        color: #007aff;
      }
    }
  }
</style>
