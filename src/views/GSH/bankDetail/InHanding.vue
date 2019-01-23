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
        <!-- <p class="t-text" v-show="nowIndex===3">根据银行要求，只能查询最近两年记录，每次查询最大范围三个月</p> -->
        <div class="t-content main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
          <!--{{aaa|formatNum}}-->
          <div class="no-data" v-if="pageList.length == 0">
            <img src="~@/assets/images/icon_open_zhengzhou_no_data.png" alt="">
            <p class="infos">对不起，目前没有数据</p>
          </div>
          <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
                      :auto-fill="false" ref="loadmore">
            <div>
              <ul>
                <!--TYPE  交易类型  字符-->
                <!--D借、C贷、P付、R收-->
                <!--TYPE_NAME  交易类型名称  D/P：支出；C/R：收入-->
                <!--TRANS_AMT  交易金额  Decimal(15,2)-->
                <!--字符-->
                <!--TRANS_DATE  发生日期  字符 yyyy-MM-dd-->
                <!--ABS_INFO  摘要信息  字符-->
                <!--BANK_ID  交易流水号  字符-->
                <!--BANLANCE  余额  Decimal(15,2)-->
                <!--字符-->
                <li v-for="(item,index) in pageList" :key="index" @click="goDetail(item)">
                  <h5 style="display: flex">
                    <span style="flex: 1;color:#E62224;">{{item.TYPE_NAME}}{{item.COMM_TRANS_STATUS_DESC}}</span>
                  </h5>
                  <p>
                    <span>{{item.OPERA_DATE}}</span>
                    <em>{{item.TRANS_AMT_DESC}}</em>
                  </p>
                </li>

              </ul>
            </div>
          </v-loadmore>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import API from "@/service";
  import {BusName} from "@/Constant";
  import Bus from "@/plugin/bus";
  import {Loadmore} from "mint-ui"
  import util from "libs/util";
  import {PageName} from "../../../Constant";


  export default {
    mixins: [''],
    data() {
      return {
        cur: '2',
        aaa: '1,100.00',
        // 1月分页
        searchCondition: {
          //分页属性
          pageNo: "1",
          pageSize: "10"
        },
        pageList: [],
        allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        scrollMode: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        pageList3: [],
        tabsParam: ["交易明细", "处理中"], //（这个也可以用对象key，value来实现）
        nowIndex: 0, //默认第一个tab为激活状态
        startDate: "",
        endDate: "",
        divSizeObj: {
          small: {},
          large: {}
        }
      };
    },
    created() {
    },
    components: {
      "v-loadmore": Loadmore // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
      // 推荐应用组件时用a-b形式起名
    },
    mounted() {
      //交易数据
      this.loadPageList(); //初次访问查询列表
      this.setEleSize()

    },
    methods: {
      tap(index){
        if(index==1){
          this.$router.push({name:PageName.DealDetails})
        }
      },
      goDetail(item) {
        this.$router.push({name: PageName.PayOneDetail, query: {...item}})
      },
      setEleSize() {
        console.log(this.nowIndex);
        let winheight = util.getWinSize().winHeight
        let topheight = util.getDivSize('.wrap-top').height
        // let toptabsheight = 0
        let toptabsheight = util.getDivSize('.w-tap').height
        let tDateheight = this.nowIndex == 3 ? toptabsheight : 0
        let maiheight = winheight - topheight - tDateheight
        console.log(topheight, maiheight, tDateheight)
        document.querySelector('.t-tab').style.top = topheight + 'px'
        document.querySelector('.main-body').style.height = maiheight + 'px'
      },
      loadTop: function () {
        //组件提供的下拉触发方法
        //下拉加载
        this.loadPageList();
        this.$refs.loadmore.onTopLoaded(); // 固定方法，查询完要调用一次，用于重新定位

      },
      loadBottom: function () {
        // 上拉加载
        this.more(); // 上拉触发的分页查询
        this.$refs.loadmore.onBottomLoaded(); // 固定方法，查询完要调用一次，用于重新定位

      },
      loadPageList: function () {
        this.searchCondition.pageNo = "1";
        this.allLoaded = false;
        let index = this.nowIndex
        this.setEleSize()
        if (this.nowIndex == 3) {
          index = 0
        }
        this.endDate = this.getLastMonthYestdy(0);
        this.startDate = this.getLastMonthYestdy(index + 1);
        this.apiQryTradeHis(); //交易数据

      },
      more () {
        // 分页查询
        this.searchCondition.pageNo =
          "" + (parseInt(this.searchCondition.pageNo) + 1);
        let data = {

          // PRD_INDEX_ID:'',
          currentPage: this.searchCondition.pageNo,
          // currentPage: "0",
          // START_DATE: '2020-08-26',
          // END_DATE: '2020-08-27',
          // START_DATE: this.startDate,
          // END_DATE: this.endDate,
          TYPE: 'API_QRY_ELE_TRANS_DETAIL',
          // pagenum: '10',
          // pageflag: '4'

        };
        API.bank.apiQryEleTransDetail(data, res => {
          this.pageList = this.pageList.concat(res.PAGE.retList);
          if (res.PAGE.retList.length < this.searchCondition.pageSize) {
            this.allLoaded = true;
            Bus.$emit(BusName.showToast, "数据全部加载完成");
          }
        });

      },

      apiQryTradeHis() {
        // TYPE	请求类型
        // currentPage	当前页
        // QRY_TYPE	查询类型
        // PRD_TYPE	产品类型
        // PRD_INDEX_ID	产品ID
        // FUND_NO	基金代码
        // ORG_ID	机构ID
        // START_DATE	开始日期
        // END_DATE	结束日期
        let data = {
          currentPage: "1",
          TYPE: 'API_QRY_ELE_TRANS_DETAIL',
          // START_DATE: '2020-08-26',
          // END_DATE: '2020-08-27',
          // START_DATE: start,
          // END_DATE: end,
          // pagenum: '10',
          // pageflag: '4'
        };
        API.bank.apiQryEleTransDetail(data, res => {
          this.pageList = res.PAGE.retList;
          if (this.pageList.length < this.searchCondition.pageSize) {
            this.allLoaded = true;
          }
          if (this.pageList.length <= 0) {
            this.allLoaded = true;
            Bus.$emit(BusName.showToast, "暂无数据");
          }
          this.$nextTick(function () {
            // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，
            // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，
            // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
            this.scrollMode = "touch";
          });

        });
      },
      setDate() {
        this.$picker.show({
          type: "datePicker",
          endTime: this.getLastYearYestdy(0), //截至时间
          startTime: this.getLastYearYestdy(2), //开始时间
          onOk: data => {
            this.endDate = this.fomateDate(data);
            this.query()
          }
        });
      },
      setDate2() {
        this.$picker.show({
          type: "datePicker",
          date: this.startDate, //初始化时间
          endTime: this.getLastYearYestdy(0), //截至时间
          startTime: this.getLastYearYestdy(2), //开始时间
          onOk: e => {
            this.startDate = this.fomateDate(e);
            this.query()
          }
        });
      },
      fomateDate(d) {
        let strDate = d;
        let strDate1 = strDate.split("-");

        let strDate2 = strDate1.map(function (item) {
          return item.length > 1 ? item : 0 + item;
        });
        return strDate2.join("-");
      },
      // 获取前几个月份
      getLastMonthYestdy(n) {
        var date = new Date(); //        1    2    3    4    5    6    7    8    9   10    11   12月
        var daysInMonth = new Array(
          [0],
          [31],
          [28],
          [31],
          [30],
          [31],
          [30],
          [31],
          [31],
          [30],
          [31],
          [30],
          [31]
        );
        var strYear = date.getFullYear();
        var strDay = date.getDate();
        var strMonth = date.getMonth() + 1;
        if (strYear % 4 == 0 && strYear % 100 != 0) {
          //一、解决闰年平年的二月份天数   //平年28天、闰年29天//能被4整除且不能被100整除的为闰年
          daysInMonth[2] = 29;
        }
        if (strMonth - n <= 0) {
          //二、解决跨年问题
          strYear -= 1;
          strMonth = 12;
        } else {
          strMonth -= n;
        }
        //        strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth];
        strDay = Math.min(strDay, daysInMonth[strMonth]); //三、前一个月日期不一定和今天同一号，例如3.31的前一个月日期是2.28；9.30前一个月日期是8.30

        if (strMonth < 10) {
          //给个位数的月、日补零
          strMonth = "0" + strMonth;
        }
        if (strDay < 10) {
          strDay = "0" + strDay;
        }
        let datastr = strYear + "-" + strMonth + "-" + strDay;
        return datastr;
      },
      checkTime(star, end) {
        var begintime = star;
        var endtime = end;
        if (!endtime) {
          return true;
        }

        var time1 = new Date(begintime).getTime();
        var time2 = new Date(endtime).getTime();
        if (begintime == "") {
          Bus.$emit(BusName.showToast, "开始日期不能为空");
          return false;
        }
        if (endtime == "") {
          Bus.$emit(BusName.showToast, "结束日期不能为空");
          return false;
        }
        if (time1 > time2) {
          Bus.$emit(BusName.showToast, "开始日期不能大于结束日期");
          return false;
        }

        //判断时间跨度是否大于3个月
        var arr1 = begintime.split("-");
        var arr2 = endtime.split("-");
        arr1[1] = parseInt(arr1[1]);
        arr1[2] = parseInt(arr1[2]);
        arr2[1] = parseInt(arr2[1]);
        arr2[2] = parseInt(arr2[2]);
        var flag = true;
        if (arr1[0] == arr2[0]) {
          //同年
          if (arr2[1] - arr1[1] > 3) {
            //月间隔超过3个月
            flag = false;
          } else if (arr2[1] - arr1[1] == 3) {
            //月相隔3个月，比较日
            if (arr2[2] > arr1[2]) {
              //结束日期的日大于开始日期的日
              flag = false;
            }
          }
        } else {
          //不同年
          if (arr2[0] - arr1[0] > 1) {
            flag = false;
          } else if (arr2[0] - arr1[0] == 1) {
            if (arr1[1] < 10) {
              //开始年的月份小于10时，不需要跨年
              flag = false;
            } else if (arr1[1] + 3 - arr2[1] < 12) {
              //月相隔大于3个月
              flag = false;
            } else if (arr1[1] + 3 - arr2[1] == 12) {
              //月相隔3个月，比较日
              if (arr2[2] > arr1[2]) {
                //结束日期的日大于开始日期的日
                flag = false;
              }
            }
          }
        }
        if (!flag) {
          // alert("时间跨度不得超过3个月！");
          Bus.$emit(BusName.showToast, "查询日期范围太大，最大可查三个月的记录");
          return false;
        }
        return true;
      },
      // 获取前n年的日期
      getLastYearYestdy(n) {
        var date = new Date();
        var strYear = date.getFullYear() - n;
        var strDay = date.getDate();
        var strMonth = date.getMonth() + 1;

        if (strMonth < 10) {
          strMonth = "0" + strMonth;
        }
        if (strDay < 10) {
          strDay = "0" + strDay;
        }
        let datastr = strYear + "-" + strMonth + "-" + strDay;
        return datastr;
      },
      query() {
        this.checkTime(this.startDate, this.endDate);
        this.apiQryTradeHis(this.startDate, this.endDate); //交易数据
      }
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
          margin-top: px2rem(5);
          overflow: hidden;

          ul {
            background: #fff;

            li {
              display: block;
              border-bottom: px2rem(1) solid #e7e7e7;
              padding: px2rem(10) 0;
              margin: 0 px2rem(15);

              h5 {
                font-size: px2rem(14);
                line-height: px2rem(20);
                color: #121b32;
                font-weight: normal;
                padding-bottom: px2rem(4);
              }

              p {
                span {
                  font-size: px2rem(12);
                  line-height: px2rem(17);
                  display: inline-block;
                  padding-right: px2rem(20);
                  color: #858e9f;
                }

                em {
                  font-size: px2rem(14);
                  float: right;
                  line-height: px2rem(25);
                  color: #333333;
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
