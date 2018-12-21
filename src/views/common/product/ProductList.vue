<template>
  <div class="wrap" v-if="Bshow">
    <app-bar title="产品列表"></app-bar>
    <ul class="w-tap">
      <li :class="{actvie:cur==1}" @click="tap(1)">产品列表</li>
      <li :class="{actvie:cur==2}" @click="tap(2)">我的资产</li>
    </ul>
    <div class="banner">
      <img src="@/assets/images/banner.png" alt="">
    </div>
    <div class="info">
      温馨提示：为方便资产统一管理，请您注册购买时使用同一银行卡预留手机号。
    </div>
    <!-- 九宫格 -->
    <div class="ProductList" v-if="!show">
      <ul class="ul-li">
        <li class="productdetail clearfix"
            v-for="item,index in dataList" :key="index"
            @click="goDetail(item)"
            style="padding-top: .2rem"
        >
          <p class="name2">{{item.PRD_NAME}}</p>
          <p class="p-bank"><span><img :src="imgSrc+item.LOGO_URL"></span>{{item.ORG_NAME}}</p>
          <div class="ratereturn">
            <p style="color: #FFB400;font-size: 0.8rem;">{{item.RATE | fromatMoneyFilter}}%</p>
            <p style="color: #B4BECC;font-size: 0.3rem;padding-top:0;padding-bottom:.4rem">{{item.PRD_TYPE_ID |
              typeFilter}}</p>
          </div>
        </li>
      </ul>
    </div>
    <!--列表-->
    <div class="productdetail2" v-if="show">
      <ul>
        <li class="clearfix" v-for="item,index in dataList" :key="index"
            @click="goDetail(item)"
        >
          <div class="ratereturn " style="text-align: center">
            <p style="color: #FFB400;font-size: 0.8rem;">{{item.RATE | fromatMoneyFilter}}%</p>
            <p style="color: #B4BECC;font-size: 0.3rem;padding-top:0;padding-bottom:.4rem">{{item.PRD_TYPE_ID |
              typeFilter}}</p>
          </div>
          <div class="ratereturn ratereturnright">
            <p class="p-bank"><span><img :src="imgSrc+item.LOGO_URL"></span>{{item.ORG_NAME}}</p>
            <img class="logoy" v-if="item.IS_ENABLED == 2" src="@/assets/images/yuyue.png" alt="">
            <p class="name" style="color: #333333 ;font-size: 0.5rem;margin-top:-0.1rem">
              {{item.PRD_NAME}}</p>
            <!--活期存款-->
            <p style="color: #B4BECC;font-size: 0.4rem;margin-top:0.2rem"
               v-if="item.PRD_TYPE_ID==4&&item.DEPOSIT_TYPE_ID==1">期限 随时支取</p>
            <!--智能存款-->
            <p style="color: #B4BECC;font-size: 0.4rem;margin-top:0.2rem"
               v-if="item.PRD_TYPE_ID==4&&item.DEPOSIT_TYPE_ID==2">期限 {{item.PERIOD_NAME}}</p>
            <!--长期存款-->
            <p style="color: #B4BECC;font-size: 0.4rem;margin-top:0.2rem"
               v-if="item.PRD_TYPE_ID==4&&item.DEPOSIT_TYPE_ID==3">期限 {{item.PERIOD_NAME}}</p>
            <!--长期存款-->
            <p style="color: #B4BECC;font-size: 0.4rem;margin-top:0.2rem"
               v-if="item.PRD_TYPE_ID==4&&item.DEPOSIT_TYPE_ID==4">期限 {{item.PERIOD_NAME}}</p>
            <!--纯债-->
            <p style="color: #B4BECC;font-size: 0.4rem;margin-top:0.2rem"
               v-if="item.PRD_TYPE_ID==3">理财期限 {{item.PERIOD_NAME}}</p>
            <!--理财-->
            <p style="color: #B4BECC;font-size: 0.4rem;margin-top:0.2rem"
               v-if="item.PRD_TYPE_ID==2">理财期限 {{item.PERIOD}}天</p>
            <!--货币基金-->
            <p style="color: #B4BECC;font-size: 0.4rem;margin-top:0.2rem"
               v-if="item.PRD_TYPE_ID==1">锁定期 {{item.PERIOD}}天</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import API from "@/service";
  import {LsName, PageName, imgSrc} from "@/Constant";
  import util from 'libs/util'
  import {BusName} from "@/Constant";
  import Bus from '@/plugin/bus/index'

  export default {
    data() {
      return {
        cur: '1',
        Bshow: true,
        show: false,
        dataList: [],
        imgSrc,
        testData: {
          ID: '3451',// 产品id
          ORG_NAME: '',//机构名称
          PRD_NAME: '', // 产品名称
          ORG_ID: '49', // 机构id
          IS_SYNC_FLAG: '0', // '是否由openAPI同步产品, 0：否, 1：是',
          IS_REALTIME_DATA_PRD: '0', // 'H5实时数据对接标识： 0不是  1是',
          IS_RZ_FLAG: '0', // '是否实名认证, 0：否, 1：是',
          H5_URL_ANDRIOD: '',// 非打通openApi 跳转链接 安卓
          H5_URL_IOS: '' // 非打通openApi 跳转链接 ios
        }
      }
    },
    created() {
      API.watchApi({
        REMARK_DATA: '异业合作-落地页',
        FUNCTION_ID: 'ptp0A000'
      })
      this.setComState({
        type: 'ProAndOrgType', value: {}
      })
      this.reLoadToLogin()

    },
    filters: {
      RATE_Filter(x) {
        var f_x = parseFloat(x);
        if (isNaN(f_x)) {
          // alert('function:changeTwoDecimal->parameter error');
          return x;
        }
        var f_x = Math.round(x * 100) / 100;
        var s_x = f_x.toString();
        var pos_decimal = s_x.indexOf('.');
        if (pos_decimal < 0) {
          pos_decimal = s_x.length;
          s_x += '.';
        }
        while (s_x.length <= pos_decimal + 2) {
          s_x += '0';
        }
        return s_x;
      },
      typeFilter(val) {
        if (!val) return ''
        let str;
        // PRD_TYPE_ID
        //  1.七日年化收益率 2 预期年化收益率  3.近三个月涨幅  4.支取利率
        switch (val - 0) {
          case 1:
            // 货币基金
            str = '七日年化收益率'
            break;
          case 2:
            // 理财产品
            str = '预期年化收益率'
            break;
          case 3:
            str = '近三个月涨幅'
            // 纯债
            break;
          case 4:
            str = '支取利率'
            // 存款
            // PRD_DOCKING_TYPE
            //  1：活期
            //  2：智能
            //  3：结构性
            //  4：
            break;
        }
        return str
      }
    }
    ,
    methods: {
      tap(val) {
        if (val == 1) {
        }
        if (val == 2) {
          this.$router.push({name: PageName.BankAccount})
        }
      }
      ,
      getListDataByChannel() {
        let data = {}
        API.bicai.getProListByChannel(data, '88', res => {
          let num = res.length
          if (num < 6) {
            this.show = true
          } else {
            this.show = false
          }
          if (num > 9) {
            this.dataList = res.splice(0, 9)
          } else {
            this.dataList = res
          }
        })
      }
      ,

      reLoadToLogin() {
        let reload = util.storage.session.get('reload') || null
        console.log(reload);
        if (reload && JSON.stringify(reload) != "{}") {
          this.Bshow = false
          setTimeout(() => {
            this.Bshow = true
          }, 1000)
          let id = util.storage.session.get('id')
          let ORG_ID = util.storage.session.get('ORG_ID')
          let title = util.storage.session.get('title')
          util.storage.session.remove('id')
          util.storage.session.remove('title')
          util.storage.session.set('reload', null)
          if (ORG_ID == 49) {
            this.$router.push({
              name: PageName.MoneyFundDetail,
              query: {
                PRO_ID: id, title
              }
            })
          }
          if (ORG_ID == '248') {
            this.$router.push({
              name: PageName.KeShangProDetail,
              query: {
                PRO_ID: id, title
              }
            })

          }

        } else {
          // this.getListData()
          this.getListDataByChannel()
        }
      }
      ,
      goDetail(bank) {
        API.watchApi({
          FUNCTION_ID: 'ptb0A001', // 点位
          REMARK_DATA: '异业合作-落地页产品列表', // 中文备
          FROM_ID: ID
        })
        let {
          ID,// 产品id
          PRD_NAME, // 产品名称
          ORG_ID, // 机构id
          IS_SYNC_FLAG, // '是否由openAPI同步产品, 0：否, 1：是',
          PRD_TYPE_ID,//产品类型
          DEPOSIT_TYPE_ID, //存款类型
          RATE
        } = bank
        util.storage.session.set('ORG_ID', ORG_ID)
        // `IS_SYNC_FLAG`  '是否由openAPI同步产品, 0：否, 1：是',
        // `IS_REALTIME_DATA_PRD` 'H5实时数据对接标识： 0不是  1是',
        // `IS_RZ_FLAG` '是否实名认证, 0：否, 1：是',
        // console.log('IS_SYNC_FLAG>>', IS_SYNC_FLAG);
        if (IS_SYNC_FLAG == '0') {
          //  未打通openApi
          // 判断产品类型
          //  PRD_TYPE_ID 1 货币基金 2 理财产品 3 纯债 4 存款
          //  PRD_DOCKING_TYPE  DEPOSIT_TYPE_ID // 1活期，2智能存款 3.结构性 4
          if (PRD_TYPE_ID == 1) { // 货币基金
            this.$router.push({
              name: PageName.MoneyFundDetail,
              query: {
                PRO_ID: ID, title: PRD_NAME
              }
            })
          }
          if (PRD_TYPE_ID == 2) { // 理财产品
            this.$router.push({
              name: PageName.FinancingProduct,
              query: {
                PRO_ID: ID, title: PRD_NAME
              }
            })
          }
          if (PRD_TYPE_ID == 3) { // 纯债
            this.$router.push({
              name: PageName.DepositDetail1,
              query: {
                PRO_ID: ID, title: PRD_NAME
              }
            })
          }
          if (PRD_TYPE_ID == 4) {
            if (DEPOSIT_TYPE_ID == 1) {
              this.$router.push({
                name: PageName.DepositDetail1,
                query: {
                  PRO_ID: ID, title: PRD_NAME
                }
              })
            }
            if (DEPOSIT_TYPE_ID == 2) {
              // 智能存款
              this.$router.push({
                name: PageName.DepositDetail2,
                query: {
                  PRO_ID: ID, title: PRD_NAME, RATE
                }
              })
            }
            if (DEPOSIT_TYPE_ID == 3) {
              this.$router.push({
                name: PageName.DepositDetail1,
                query: {
                  PRO_ID: ID, title: PRD_NAME
                }
              })
            }
            if (DEPOSIT_TYPE_ID == 4) {
              this.$router.push({
                name: PageName.DepositDetail1,
                query: {
                  PRO_ID: ID, title: PRD_NAME
                }
              })
            }
          }

        } else if (IS_SYNC_FLAG == '1') {
          // 打通openAPI 刷新重置 ORG_ID 跳转产品详情页
          ORG_ID = ORG_ID + ''
          util.storage.session.set('ORG_ID', ORG_ID)
          util.storage.session.set('id', ID)
          util.storage.session.set('title', PRD_NAME)
          util.storage.session.set('reload', true)
          window.location.reload()
        } else {
          // 异常情况 暂支持49 和 248 产品
          if (ORG_ID == 49 || ORG_ID == 248) {
            ORG_ID = ORG_ID + ''
            util.storage.session.set('ORG_ID', ORG_ID)
            util.storage.session.set('id', ID)
            util.storage.session.set('title', PRD_NAME)
            util.storage.session.set('reload', true)
            window.location.reload()
          } else {
            Bus.$emit(BusName.showToast, '暂不支持该产品，请下载比财APP')
          }
        }
      }
      ,
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/px2rem";

  .wrap {
    width: 100%;
  }

  .header {
    background-color: #fff;
    height: 1.3rem;
    line-height: 1.3rem;
    font-size: 0.4rem;
    border-bottom: 1px solid #e6e6e6;
  }

  .header p {
    text-align: center;
    font-size: 0.5rem;
  }

  .name2 {
    overflow: hidden;
    /*text-overflow: ellipsis;*/
    /*display: -webkit-box;*/
    /*-webkit-line-clamp: 2;*/
    /*-webkit-box-orient: vertical;*/
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: px2rem(18);
    padding: px2rem(10) px2rem(8);
  }

  .banner {
    width: 100%;
    height: 5.5rem;
    background: #dedede;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .ul-li {
    // padding-right: 11px;
    // padding-right: 11px;
    overflow: hidden;
    width: 100%;
    text-align: left;
    // background-color: red;
  }

  .ul-li li {
    // margin-left: 10px;
    width: 33%;
    text-align: center;
  }

  .productdetail {
    // float: left;
    display: inline-block;

    // width: 2.5rem;
    // height: 3rem;
    border-right: 1px solid #F6F6F9;
    border-bottom: 1px solid #F6F6F9;

    p {
      text-align: center;
    }

    .ratereturn {
      text-align: center;
    }
  }

  .wrap {
    width: 100%;
    box-sizing: border-box;
  }

  .productdetail2 {
    position: relative;
    height: 2.5rem;

    li {
      border-bottom: 0.3rem solid #F6F6F9;
      overflow: hidden;
      padding-bottom: 0.4rem;
    }

    .ratereturn {
      float: left;
      width: 35%;
      margin-top: .25rem;
      border-right: 1px solid #F6F6F9;
      position: relative;
    }

    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .logoy {
      position: absolute;
      right: px2rem(-53);
      bottom: px2rem(-53);
      width: 3rem;

    }

    // .clearfix:after{
    // content:".";
    // display:block;
    // height:0;
    // visibility:hidden;
    // }
    .ratereturnright {
      padding-left: .6rem;
      // margin-top: .7rem;
      border: none;
      width: 55%;
    }

    .yuyue {
      position: absolute;
      top: 0rem;
    }
  }

  // 加银行名称及图标
  .p-bank {
    font-size: px2rem(12);
    color: #858E9F;
    margin: px2rem(-2) 0 px2rem(8);
  }

  .p-bank span img {
    display: inline-block;
    width: px2rem(18);
    height: px2rem(18);
    position: relative;
    top: px2rem(4);
    margin-right: px2rem(5);
  }

  .w-tap {
    display: flex;

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

  .info {
    padding: px2rem(5) px2rem(10);
    font-size: px2rem(12);
    color: red;
  }
</style>
