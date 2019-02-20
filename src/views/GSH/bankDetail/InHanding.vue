<template>
  <div class="wrap">
    <div class="wrap-top">
      <app-bar title="处理中"></app-bar>
      <ul class="w-tap">
        <li :class="{actvie:cur==1}" @click="tap(1)">交易明细</li>
        <li :class="{actvie:cur==2}" @click="tap(2)">处理中</li>
      </ul>
    </div>
    <div class="t-tab">
      <div class="divTab">
        <div class="t-content main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
          <div class="no-data" v-if="pageList.length == 0">
            <img src="~@/assets/images/icon_open_zhengzhou_no_data.png" alt="">
            <p class="infos">对不起，目前没有数据</p>
          </div>
          <div>
              <ul>
                <li v-for="(item,index) in pageList" :key="index">
                    <h5 style="display: flex">
                      <span style="flex: 1;">
                        {{item.transTypeName}}
                      </span>
                      <em>{{item.statusName}}</em>
                    </h5>
                    <p>
                      <!--时间-->
                      <span>{{item.operaTime}}</span>
                      <!--金额-->
                      <em v-if="item.transType=='1'" style="color:#29AB91;">+{{item.transAmtDesc}}</em>
                      <em v-if="item.transType=='2'" style="color:#F4333C;">-{{item.transAmtDesc}}</em>
                    </p>
                </li>

              </ul>
            </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import API from "@/service";
  import {BusName,PageName} from "@/Constant";
  import Bus from "@/plugin/bus";
  import {Loadmore} from "mint-ui"
  import util from "@/libs/util";
  export default {
    mixins: [''],
    data() {
      return {
        cur: '2',
        pageList: [],
        scrollMode: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        nowIndex: 0, //默认第一个tab为激活状态
      };
    },
    created() {},
    mounted() {
      //交易数据
      this.apiQryInHanding(); //交易数据
      this.setEleSize()

    },
    methods: {
      tap(index) {
        if (index == 1) {
          this.$router.push({name: PageName.DealDetails})
        }
      },
      setEleSize() {
       // console.log(this.nowIndex);
        let winheight = util.getWinSize().winHeight
        let topheight = util.getDivSize('.wrap-top').height
        // let toptabsheight = 0
        let toptabsheight = util.getDivSize('.w-tap').height
        let tDateheight = this.nowIndex == 3 ? toptabsheight : 0
        let maiheight = winheight - topheight - tDateheight
       // console.log(topheight, maiheight, tDateheight)
        document.querySelector('.t-tab').style.top = topheight + 'px'
        document.querySelector('.main-body').style.height = maiheight + 'px'
      },
      // 处理中数据
      async apiQryInHanding() {
        let data = {};
        let res = await API.bank.apiQryEleProcessDetail(data)
        this.pageList = res;
       // console.log(this.pageList);
        if (this.pageList.length <= 0) {
          Bus.$emit(BusName.showToast, "暂无数据");
        }
      },

    }
  };
</script>

<style lang="scss">
  // .pro .header img{ display:none;}
  // .pro .header{ border-bottom:1px solid #518BEE;}
  .m-picker .m-picker-header span:last-of-type {
    color: #508cee;
  }
</style>

<style lang="scss" scoped>


  .icon {
    position: absolute;
  }

  .icon:after {
    display: block;
    content: "";
    width: px2rem(22);
    height: px2rem(22);
    display: block;
    margin-top: px2rem(10);
    z-index: 2;
    background: url("~@/assets/images/icon_shaixuan@2x.png") no-repeat;
    background-size: 100%;
  }

  .wrap {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: #f4f4f8;
    overflow: hidden;
  }

  .wrap-top {
    position: absolute;
    width: 100%;
    top: 0;

    .tabs {
      position: relative;
      display: flex;
      height: px2rem(44);
      line-height: px2rem(44);
      background: #fff;

      li {
        flex: 1;
        text-align: center;
        font-size: px2rem(15);
        color: #b3b3b3;
      }

      li.active {
        color: #508cee;
      }
    }
  }

  .t-tab {
    position: absolute;
    width: 100%;

    .no-data {
      width: 100%;

      img {
        width: 100%;
      }

      .infos {
        text-align: center;
        font-size: px2rem(16);
        color: #1badff;
      }
    }

    .divTab {
      .t-content {
        h4 {
          color: #b3b3b3;
          font-size: px2rem(14);
          line-height: px2rem(20);
          padding: px2rem(16) px2rem(15) px2rem(4);
          font-weight: normal;
        }

        div {
          margin-top: px2rem(12);
          overflow: hidden;

          ul {
            background: #fff;

            li {
              display: block;
              border-bottom: px2rem(1) solid #DDDDDD;
              padding: px2rem(12) px2rem(15);

              h5 {
                font-size: px2rem(16);
                line-height: px2rem(22);
                color: #333333;
                font-weight: normal;
                padding-bottom: px2rem(8);
              }

              p {
                span {
                 font-size: px2rem(14);
                  line-height: px2rem(19);
                  display: inline-block;
                  padding-right: px2rem(20);
                  color: #999;
                  font-size: px2rem(14);
                }

                em {
                  font-size: px2rem(16);
                  float: right;
                  line-height: px2rem(26);
                  color: #333333;
                  position: relative;
                  top:px2rem(-3);
                }
              }
            }

            li:last-child {
              border-bottom: none;
            }
          }

          ul:last-child {
            border-bottom: none;
          }
        }
      }

      // padding-bottom: px2rem(16);
    }

    .t-date {
      height: px2rem(44);
      background: #efefef;
      line-height: px2rem(44);
      position: relative;

      ul {
        display: flex;

        li {
          flex: 1;
          display: inline-block;
          font-size: px2rem(15);
          color: #666666;
          text-align: center;
          /*padding-left: px2rem(35);*/

          span {
            display: inline-block;
            height: 0;
            width: 0;
            border-right: px2rem(5) solid transparent;
            border-top: px2rem(6) solid #666666;
            border-left: px2rem(5) solid transparent;
            margin-left: px2rem(10);
          }
        }
      }

      .t-query {
        width: px2rem(60);
        height: px2rem(44);
        color: #508cee;
        font-size: px2rem(15);
        position: absolute;
        right: 0;
        top: 0;
        text-align: center;
      }
    }

    .t-text {
      padding: 0 px2rem(15);
      font-size: px2rem(12);
      color: #858e9f;
      padding-top: px2rem(10);
      line-height: px2rem(17);
    }
  }

  .main-body {
    overflow: auto;
    box-sizing: border-box;
    padding-bottom: px2rem(50);
  }

  .w-tap {
    display: flex;
    margin-top: px2rem(1);

    li {
      flex: 1;
      height: px2rem(40);
      line-height: px2rem(40);
      font-size: px2rem(18);
      text-align: center;
      background: #fff;

      &.actvie {
        color: #508CEE;
        position: relative;
      }
      &.actvie:after {
        position: absolute;
        content:"";
        height: px2rem(2);
        width: px2rem(20);
        bottom:0;
        background:#508CEE;
        left: 0;
        right: 0;
        margin:0 auto;
      }
    }
  }
</style>
