<template>
    <div class="main">
        <app-bar title="我的银行"></app-bar>
        <section class="container" style="padding-top: 7px">
            <section class="banner">
                <section>
                    <span class="bk-text1">总资产</span>
                    <span class="bk-text2">（元）</span>
                    <icon-font iconClass="icon-eye" iconStyle="eye" @doClick="pass =!pass"></icon-font>
                </section>
                <p class="money" v-if="pass">{{bankDetail.TOTAL_ASSET | formatNum}}</p>
                <p class="money" v-if="!pass">****</p>
                <section class="income">
                    <p>昨日到账收益
                        <span class="left-text">
                             <i>{{bankDetail.YSD_INCOME>=0?'+':''}}</i>
                            {{bankDetail.YSD_INCOME}}</span>
                    </p>
                    <p style="text-align: right">累计收益
                        <span class="right-text">
                             <i>{{bankDetail.TOTAL_INCOME>=0?'+':''}}</i>
                            {{bankDetail.TOTAL_INCOME}}</span>
                    </p>
                </section>
            </section>
        </section>
        <section class="container">
            <section class="info-card">
                <div class="ic-left">
                    <span class="bk-text1">可用余额</span><span class="bk-text2">（元）</span>
                    <p class="money" v-if="pass">{{bankDetail.ACC_REST | formatNum}}</p>
                    <p class="money" v-else>****</p>
                </div>
                <span class="ic-right" @click="goPage(toPageName.BankBalance)">
                    明细
                    <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
                </span>

            </section>
        </section>
        <section class="bank-card container" v-if="bankDetail.EC_ACCOUNT_NO">
            <div class="bank-logo">
                <img :src="imgSrc + bankDetail.LOGO_URL" alt="">
            </div>
            <div class="bank-test">
                <p class="">{{bankDetail.ORG_NAME}}</p>
                <p class="card-no" v-if="pass">{{bankDetail.EC_ACCOUNT_NO | BankNo_Filter}}</p>
                <p class="card-no" v-if="!pass">**** **** **** ****</p>
            </div>
        </section>
        <section class="financing-list" v-if="pass">
            <section class="top" @click="licaiShow=!licaiShow">
                    <span class="top-left">
                        理财</span>
                <span :class="{'top-right':true,select:licaiShow}">

                        ¥{{bankDetail.lcAsset.API_FINA_ASSET | formatNum | preLcAssetFilter}}<i class="small-number">{{bankDetail.lcAsset.API_FINA_ASSET | lastLcAssetFilter}}</i>
                    </span>
            </section>
            <ul v-if="licaiShow" @click="goPage(toPageName.Financialproducts)">
                <li class="financing-li" v-for="item in proList">
                    <span class="li-left">
                        {{item.PRD_NAME}}</span>
                    <span>
                        ¥{{item.INVEST_AMOUNT | formatNum | preLcAssetFilter}}<i class="small-number2">{{item.INVEST_AMOUNT | lastLcAssetFilter}}</i>
                    </span>
                </li>
            </ul>
        </section>
        <section class="more" @click="goPage(toPageName.MoreService)">
             <span class="more-left">
                        更多服务</span>
            <span class="more-right">
                <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
                    </span>
        </section>

        <p class="foot-text">
            如有疑问请拔打银行客服电话<a :href="'tel:'+bankDetail.ORG_HOTLINE">{{bankDetail.ORG_HOTLINE}}</a>
        </p>
    </div>
</template>

<script>
    import IconFont from '../../components/commons/IconFont'
    import {API} from "../../service/api";
    import { PageName, imgSrc} from "../../Constant";

    export default {
        name: "bankDetail",
        components: {
            IconFont
        },
        data() {
            return {
                imgSrc,
                proList:[],
                pass: true,
                licaiShow: false,
                toPageName: {
                    BankBalance: PageName.BankBalance,
                    MoreService: PageName.MoreService,
                    Financialproducts: PageName.Financialproducts,
                },
                bankDetail: {
                    TOTAL_ASSET: '0.00', // 总资产(投资金额+可用余额)
                    TOTAL_AMOUNT: '0.00', // 投资总金额(不包括可用余额)
                    ACC_REST: '0.00', // 可用余额
                    TOTAL_INCOME: '0.00',//	累计收益
                    YSD_INCOME: '0.00', // 昨日收益
                    EC_ACCOUNT_NO: '',
                    lcAsset: '',
                    ORG_HOTLINE:''
                }
            }
        },
        filters: {
            preLcAssetFilter(val) {
                if (!val) return ''
                return val.slice(0, val.length - 2)
            },
            lastLcAssetFilter(val) {
                if (!val) return ''
                return val.slice(val.length - 2, val.length)
            }
        },
        created() {
            this.getBankDetail()
            this.scroll()
            this.getProList()
        },
        methods: {
            goPage(pageName) {
                let query
                if(pageName==this.toPageName.Financialproducts){
                    query = {
                        total:this.bankDetail.lcAsset.API_FINA_ASSET
                    }
                }
                this.$router.push({
                    name: pageName,
                    query
                })
            },
            show() {
                console.log('show');
            },
            getBankDetail() {
                API.account.getMyInvest({}, (res) => {
                    this.bankDetail = res
                })
                API.account.apiQueryAccRest({}, (res) => {
                })
            },
            // getMyInvesthandle(){
            //     API.account.getMyInvest({})
            // }
            getProList(){ // 获取产品列表
                let data = {
                    currentPage:'1',
                    PRD_TYPE:'2'
                }
                API.account.getMyInvestHold(data,(res)=>{
                    this.proList = res.PAGE.retList
                })
            },
            scroll() {
                let _this = this
                //--------------上拉加载更多---------------
                //获取滚动条当前的位置
                function getScrollTop() {
                    var scrollTop = 0;
                    if (document.documentElement && document.documentElement.scrollTop) {
                        scrollTop = document.documentElement.scrollTop;
                    } else if (document.body) {
                        scrollTop = document.body.scrollTop;
                    }
                    return scrollTop;
                }

                //获取当前可视范围的高度
                function getClientHeight() {
                    var clientHeight = 0;
                    if (document.body.clientHeight && document.documentElement.clientHeight) {
                        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
                    } else {
                        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
                    }
                    return clientHeight;
                }

                //获取文档完整的高度
                function getScrollHeight() {
                    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
                }

                //滚动事件触发
                window.onscroll = function () {
                    if (getScrollTop() + getClientHeight() == getScrollHeight()) {

                    }
                }
                //-----------------结束--------------------
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/px2rem";

    i {
        font-style: normal;
    }

    .main {
        height: 100%;
        background: #f6f6f6;
    }

    .container {
        padding: 0 px2rem(15);
        background: #fff;
        box-sizing: border-box;
    }

    .banner {
        height: px2rem(120);
        background: url("../../assets/images/background@2x.png") no-repeat;
        background-size: contain;
        box-sizing: border-box;
        padding: px2rem(0) px2rem(10);
        color: #fff;
        font-size: 0;
        .bk-text1 {
            font-size: px2rem(18);
            opacity: .7;
        }
        .bk-text2 {
            font-size: px2rem(10);
            opacity: .7;

        }
        .eye {
            margin-left: px2rem(19);
            font-size: px2rem(24);

        }
        .money {
            font-size: px2rem(23);
        }
        .income {
            margin-top: px2rem(8);
            display: flex;
            font-size: px2rem(12);
            color: rgba(255, 255, 255, .7);
            p {
                flex: 1;
            }
        }
        .left-text {
            color: #FFA054;

        }
        .right-text {
            color: #fff;
        }

    }

    .info-card {
        display: flex;
        font-size: 0;
        padding: px2rem(30) 0 px2rem(11) px2rem(10);
        .ic-left {
            flex: 1;
        }
        .ic-right {
            font-size: px2rem(12);
            color: #666;
            display: inline-block;
            height: px2rem(56);
            line-height: px2rem(56);
        }
        .bk-text1 {
            font-size: px2rem(14);
            opacity: .7;
        }
        .bk-text2 {
            font-size: px2rem(10);
            opacity: .7;
            margin-left: px2rem(-3);

        }
        .money {
            font-size: px2rem(24);
        }
        .detail {
            font-size: px2rem(12);
        }
        margin-bottom: px2rem(10);
    }

    .bank-card {
        display: flex;
        box-sizing: border-box;
        padding: px2rem(10);
        .bank-logo {
            width: px2rem(48);
            height: px2rem(48);
            img {
                width: 100%;
                height: 100%;
            }
        }
        .card-no {
            color: #999
        }
        .bank-test {
            padding-left: px2rem(10);
            font-size: px2rem(16);
        }
        margin-bottom: px2rem(10);
    }

    .financing-list {
        box-sizing: border-box;
        padding: px2rem(10) px2rem(10) px2rem(0) px2rem(20);
        background: #fff;
        .top {
            display: flex;
            font-size: px2rem(14);
            height: px2rem(28);
            line-height: px2rem(28);
            color: #000;
            .top-left {
                position: relative;
                flex: 1;
                padding-left: px2rem(20);
                box-sizing: border-box;
                &:before {
                    position: absolute;
                    left: px2rem(0);
                    top: 50%;
                    transform: translateY(-50%);
                    content: '';
                    width: px2rem(15);
                    height: px2rem(15);
                    background: url("../../assets/images/property_icon_financing.png") no-repeat center;
                    background-size: contain;
                }
            }
            .top-right {
                font-size: px2rem(18);
                color: #333;
                &.select {
                    color: #999;
                }
            }
            .small-number {
                font-size: px2rem(14);
            }

            margin-bottom: px2rem(10);

        }
        .financing-li {
            display: flex;
            font-size: px2rem(14);
            padding: px2rem(15) 0;
            border-bottom: 1px solid #ccc;
            height: px2rem(28);
            line-height: px2rem(28);
            color: #333;
            .li-left {
                position: relative;
                flex: 1;
                padding-left: px2rem(10);
                box-sizing: border-box;
                &:before {
                    position: absolute;
                    left: px2rem(0);
                    top: 50%;
                    transform: translateY(-50%);
                    content: '';
                    width: px2rem(4);
                    height: px2rem(4);
                    border-radius: px2rem(2);
                    background: #4F96FF;
                }
            }
            &:last-child {
                border-bottom: none;
            }

        }
        .small-number2 {
            font-size: px2rem(10);
        }
        margin-bottom: px2rem(10);

    }

    .more {
        background: #fff;
        font-size: px2rem(14);
        padding: px2rem(10) px2rem(10) px2rem(10) px2rem(20);
        box-sizing: border-box;
        display: flex;
        .more-left {
            flex: 1;
        }
        margin-bottom: px2rem(10);

    }

    .foot-text {
        background: #f6f6f6;
        text-align: center;
        padding: px2rem(30) 0;
        color: #2B74FE;
        a{
            color: #2B74FE;

        }
    }

</style>