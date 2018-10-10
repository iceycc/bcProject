<template>
    <div class="wrap">
        <app-bar title="交易明细"></app-bar>
        <div class="t-tab">
            <ul class="tabs">
                <li class="li-tab" v-for="(item,index) in tabsParam"
                    @click="toggleTabs(index)"
                    :class="{active:index==nowIndex}">{{item}}
                </li>
            </ul>
            <div class="divTab">
                <div class="t-date" v-show="3==nowIndex">
                    <ul>
                        <li @click="setDate2">
                            {{startDate}}
                            <span></span>
                        </li>
                        <li @click="setDate">
                            {{endDate}}
                            <span></span>
                        </li>
                    </ul>
                    <div class="t-query" @click="query">查询</div>
                </div>
                <p class="t-text" v-show="3==nowIndex">根据银行要求，只能查询最近两年记录，每次查询最大范围三个月</p>

                <div class="t-content main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
                    <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
                                :auto-fill="false" ref="loadmore">
                        <div>
                            <ul>
                                <li v-for="item,index in listdata" :key="index">
                                    <h5><span>{{item.TYPE ==11?'充值':'提现'}}</span></h5>
                                    <p class="p-bottom">
                                        <span>{{item.OPERA_TIME}}</span>
                                        <em>¥{{item.TRANS_AMT}}</em>
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
    import {API} from "../../plugin/request/api";
    import { BusName} from "../../Constant";
    import Bus from '../../common/bus';
    import {Loadmore} from "mint-ui";

    export default {
        data() {
            return {
                tabsParam: ['1个月', '2个月', '3个月', " "],//（这个也可以用对象key，value来实现）
                nowIndex: 3,//默认第一个tab为激活状态
                startDate: '',
                endDate: '',
                listdata: [],
                allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
                scrollMode: 'auto',
                currentPage: 1
            }
        },
        components: {
            "v-loadmore": Loadmore // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
            // 推荐应用组件时用a-b形式起名
        },
        created() {
            this.endDate = this.getLastMonthYestdy(0);
            this.startDate = this.getLastMonthYestdy(1);
        },
        mounted() {
            this.getDataList()
        },
        methods: {
            initHandle() {
                this.allLoaded = false;
                this.listdata = []
                this.currentPage = 1
                this.getDataList()
            },
            loadTop() {
                console.log('下拉加载');
                //组件提供的下拉触发方法
                //下拉加载
                this.getDataList();
                this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
            },
            loadBottom() {
                // 上拉加载
                // 上拉触发的分页查询
                console.log('上拉触发的分页查询');
                this.more();// 上拉触发的分页查询
                this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
            },
            more() {
                console.log(1);
                if (this.allLoaded) {
                    return
                }
                this.currentPage++
                this.getDataList(this.currentPage)
            },
            getDataList(page = 1) {
                let params = {
                    currentPage: page + '',
                    QRY_TYPE: '0',
                    START_DATE: this.startDate,
                    END_DATE: this.endDate
                }
                API.account.apiQryRechCashHis(params, res => {
                    if (res.PAGE.retList.length == 0) {
                        this.allLoaded = true
                        return
                    }
                    else if (page > 1) {
                        this.listdata = this.listdata.concat(res.PAGE.retList)
                    }
                    else {
                        this.listdata = res.PAGE.retList
                    }
                    // this.allLoaded = false;
                })
            },
            toggleTabs(index) {
                this.nowIndex = index
                if (index == 3) return
                this.endDate = this.getLastMonthYestdy(0);
                this.startDate = this.getLastMonthYestdy(index + 1);
                this.initHandle()

            },
            setDate() {
                this.$picker.show({
                    type: 'datePicker',
                    endTime: this.getLastYearYestdy(0),  //截至时间
                    startTime: this.getLastYearYestdy(2),  //开始时间
                    onOk: (data) => {
                        this.endDate = this.fomateDate(data);
                    }
                });

            },
            setDate2() {
                this.$picker.show({
                    type: 'datePicker',
                    date: this.startDate,  //初始化时间
                    endTime: this.getLastYearYestdy(0),  //截至时间
                    startTime: this.getLastYearYestdy(2),  //开始时间
                    onOk: (e) => {
                        this.startDate = this.fomateDate(e);
                    },
                })

            },

            fomateDate(d) {
                let strDate = d;
                let strDate1 = strDate.split("-");

                let strDate2 = strDate1.map(function (item) {
                    return item.length > 1 ? item : 0 + item;
                })
                return strDate2.join("-");
            },
            // 获取前几个月份
            getLastMonthYestdy(n) {
                var date = new Date(); //        1    2    3    4    5    6    7    8    9   10    11   12月
                var daysInMonth = new Array([0], [31], [28], [31], [30], [31], [30], [31], [31], [30], [31], [30], [31]);
                var strYear = date.getFullYear();
                var strDay = date.getDate();
                var strMonth = date.getMonth() + 1;
                if (strYear % 4 == 0 && strYear % 100 != 0) {//一、解决闰年平年的二月份天数   //平年28天、闰年29天//能被4整除且不能被100整除的为闰年
                    daysInMonth[2] = 29;
                }
                if (strMonth - n == 0) //二、解决跨年问题
                {
                    strYear -= 1;
                    strMonth = 12;
                }
                else {
                    strMonth -= n;
                }
                // strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth];
                strDay = Math.min(strDay, daysInMonth[strMonth]);//三、前一个月日期不一定和今天同一号，例如3.31的前一个月日期是2.28；9.30前一个月日期是8.30

                if (strMonth < 10)//给个位数的月、日补零
                {
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
                if (!this.checkTime(this.startDate, this.endDate)) return
                this.getDataList()
            }
        }
    }
</script>

<style lang="scss">
    // .pro .header img{ display:none;}
    // .pro .header{ border-bottom:1px solid #518BEE;}
    .m-picker .m-picker-header span:last-of-type {
        color: #508CEE;
    }

</style>

<style lang="scss" scoped>
    @import "../../assets/px2rem";

    .icon {
        position: absolute;
    }

    .icon:after {
        content: "";
        width: px2rem(22);
        height: px2rem(22);
        display: block;
        margin-top: px2rem(10);
        z-index: 2;
        background: url("../../images/img/icon_shaixuan@2x.png") no-repeat;
        background-size: 100%;
    }

    .wrap {
        width: 100%;
        box-sizing: border-box;
        height: 100%;
        background: #f4f4f8;
    }

    .t-tab {
        position: relative;
        ul.tabs {
            position: relative;
            // margin-right: px2rem(60);
            display: flex;
            height: px2rem(44);
            line-height: px2rem(44);
            background: #fff;
            li {
                flex: 1;
                text-align: center;
                font-size: px2rem(15);
                color: #B3B3B3;
            }
            li:last-child {
                position: relative;
                width: px2rem(60);
                height: px2rem(44);
                flex: none;
                border-left: px2rem(1) solid #F6F6F9;
            }
            li:last-child:after {
                position: absolute;
                content: "";
                width: px2rem(22);
                height: px2rem(22);
                display: block;
                z-index: 2;
                background: url("../../images/img/icon_shaixuan@2x.png") no-repeat;
                background-size: 100%;
                top: 0;
                left: 0;
                right: 0;
                margin: px2rem(12) auto 0;
            }
            li.active:last-child:after {
                position: absolute;
                content: "";
                width: px2rem(22);
                height: px2rem(22);
                display: block;
                z-index: 2;
                background: url("../../images/img/icon_shaixuan-1@2x.png") no-repeat;
                background-size: 100%;
                top: 0;
                left: 0;
                right: 0;
                margin: px2rem(12) auto 0;
            }

            li.active {
                color: #508CEE;
            }

        }

        .divTab {
            .t-content {
                h4 {
                    color: #B3B3B3;
                    font-size: px2rem(14);
                    line-height: px2rem(20);
                    padding: px2rem(16) px2rem(15) px2rem(4);
                    font-weight: normal;
                }
                div {

                    background: #fff;
                    overflow: hidden;
                    ul {

                        li {
                            display: block;
                            border-bottom: px2rem(1) solid #E7E7E7;
                            padding: px2rem(10) 0;
                            margin: 0 px2rem(15);

                            h5 {
                                display: flex;
                                font-size: px2rem(14);
                                line-height: px2rem(20);
                                color: #121B32;
                                font-weight: normal;
                                padding-bottom: px2rem(4);
                                span:first-child {
                                    flex: 1;
                                }

                            }
                            p {
                                padding-top: px2rem(3);
                                span {
                                    font-size: px2rem(12);
                                    line-height: px2rem(17);
                                    display: inline-block;
                                    padding-right: px2rem(20);
                                    color: #858E9F;
                                }
                                em {
                                    font-size: px2rem(18);
                                    float: right;
                                    position: relative;
                                    margin-top: px2rem(-18);
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
            padding-bottom: px2rem(16);

        }

        .t-date {
            height: px2rem(44);
            background: #EFEFEF;
            line-height: px2rem(44);
            position: relative;
            ul {

                margin-right: px2rem(60);
                display: flex;
                li {
                    flex: 1;
                    display: inline-block;
                    font-size: px2rem(15);
                    color: #666666;
                    padding-left: px2rem(20);
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
                color: #508CEE;
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
            color: #858E9F;
            padding-top: px2rem(10);
            line-height: px2rem(17);
        }
    }

    .main-body {
        overflow: auto;
    }

</style>
