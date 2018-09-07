<template>
    <div id="app">
        <div class="wrap">
            <app-bar :title="productDetail.PRD_NAME"></app-bar>
            <div class="banner">
                <div class="bannercontent">
                    <div class="bannertop">
                        <div class="bannertopleft">
                            <p style="font-size: 0.4rem">预期年化收益率</p>
                            <p><strong style="font-size: 1rem">{{productDetail.RATE}} </strong><span
                                    style="font-size: .5rem;">%</span>
                            </p>
                        </div>
                        <div class="bannertopright">
                            <p style="font-size: 0.4rem">理财期限</p>
                            <p><strong style="font-size: 1rem">{{productDetail.PERIOD}} </strong><span
                                    style="font-size: .5rem;">天</span></p>
                        </div>
                    </div>
                    <div class="bannerbottom">
                        <ul>

                            <li class="bannerbottomfirst clearfix"
                                v-if="productDetail.RISK_LEVEL == 1 || productDetail.RISK_LEVEL == '-1'">低风险
                            </li>
                            <li class="bannerbottomfirst clearfix" v-if="productDetail.RISK_LEVEL == 2">中低风险</li>
                            <li class="bannerbottomfirst clearfix" v-if="productDetail.RISK_LEVEL == 3">中风险</li>
                            <li class="bannerbottomfirst clearfix" v-if="productDetail.RISK_LEVEL == 4">中高风险</li>
                            <li class="bannerbottomfirst clearfix" v-if="productDetail.RISK_LEVEL == 5">高风险</li>
                            <li class="bannerbottomtwo clearfix">{{productDetail.TXT_MIN_AMOUNT}}</li>
                            <li class="bannerbottomthree clearfix">累计购买笔数{{productDetail.BUY_COUNT}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="contenttop">
                <p>交易规则</p>
                <div class="bannercontent">
                    <span class="bannercontenttitle">审核方式</span>
                    <span class="bannercontenttitlecontent">{{productDetail.IS_INTERVIEW | IS_INTERVIEW_filter}}</span>
                </div>
                <div class="bannercontent">
                    <span class="bannercontenttitle">起购金额</span>
                    <span class="bannercontenttitlecontent">{{productDetail.TXT_MIN_AMOUNT}}</span>
                </div>
                <div class="bannercontent">
                    <span class="bannercontenttitle">递增金额</span>
                    <span class="bannercontenttitlecontent">{{productDetail.INCRE_AMOUNT}} 元</span>
                </div>
                <div class="bannercontent">
                    <span class="bannercontenttitle">剩余额度</span>
                    <span class="bannercontenttitlecontent">{{productDetail.REMAIN_AMT}} 元</span>
                </div>
            </div>
            <div class="wrapicon">
                <div class="circle left"><span>{{productDetail.COLLECT_START_DATE}}</span><strong>募集开始</strong></div>
                <div class="circle"><span>{{productDetail.COLLECT_END_DATE}}</span><strong>募集结束</strong></div>
                <div class="circle"><span>{{productDetail.VALUE_DATE}}</span><strong>起息日</strong></div>
                <div class="circle right"><span>{{productDetail.FIN_END_DATE}}</span><strong>到期</strong></div>
            </div>
            <div class="contentmain contenttop">
                <div class="contentmaintop">
                    直销银行说明
                </div>
                <div class="contentmainbank" style="margin-top:0.5rem;">
                    <div style="display: inline-block;width:25%">
                        <img :src="imgurl + productDetail.LOGO_URL" style="width:90%" alt="">
                    </div>
                    <div style="float:right;width:65%">
                        <p style="font-size:0.5rem;">{{productDetail.ORG_NAME}}</p>
                        <p style="font-size:0.4rem; color:#999999 ">隶属于 {{productDetail.ORG_NAME}} </p>
                        <p style="font-size:0.4rem;color:#999999">比财评级依据产品属性和银行运营情况综合评定</p>
                    </div>
                </div>
            </div>
            <div class="contentbottom contenttop">
                <div>
                    <p style="width: 100%;height: 1rem; padding-bottom: 0.6rem;border-bottom: 1px solid #DCDCDC;">
                        产品描述</p>
                    <div style="font-size: 0.4rem;padding-top:1rem;color:#666" v-html="productDetail.DEPICT">
                        本协议是广发基金与广发银行股份有限公司实名认证的用户就您于本公司电子交易直销前置式自助前台系统进行先关操作的有关事项所订立的有效合同。投资者通过点击确认或其他方式接收本协议，即表示投资者与广发基金已达成协议并同意接受本协议的全部约定内容以及与本协议项下的各项规则等等。
                    </div>
                </div>
            </div>
            <div class="contentbottom2 contenttop">
                <ul style="position: relative;">
                    <li class="contentbottom2left"></li>
                    <li class="contentbottom2main">比财数据科技</li>
                    <li class="contentbottom2right"></li>
                </ul>
                <ul class="contentbottom2content contenttop" style="height:.5rem;">
                    <li class="contentbottom2contentleft">
                        <div>
                            <img src="../../images/img/platform@2x.png" alt="">
                        </div>
                        <p>专业平台</p>
                    </li>
                    <li class="contentbottom2contentleft">
                        <div>
                            <img src="../../images/img/account_bottom_label2@2x.png" alt="">
                        </div>
                        <p>银行直签</p>
                    </li>
                    <li class="contentbottom2contentleft">
                        <div>
                            <img src="../../images/img/account_bottom_label3@2x.png" alt="">
                        </div>
                        <p>安全保障</p>
                    </li>
                </ul>
            </div>
            <div class="baozhang">
                <p>账户资金安全由存管银行保障</p>
            </div>
        </div>
        <div class="buttonbottom"
             @click="goNext(type)"
        >
            {{btnType}}
        </div>
    </div>
</template>
<script>
    import {API} from "../../request/api";
    import Bus from '../../common/js/bus'
    import {PageName, imgSrc, LsName, BusName} from "../../Constant";
    import util from '../../common/utils/util'

    export default {
        data() {
            return {
                productDetail: {},
                btnType: '安全购买',
                proID: '',
                type: '1',
                imgurl: imgSrc,
                preTitle: ''
            }
        },
        beforeRouteEnter(to, from, next) {
            // 在渲染该组件的对应路由被 confirm 前调用
            // 不！能！获取组件实例 `this`
            // 因为当守卫执行前，组件实例还没被创建
            next()
        },
        watch: {
            preTitle(n, o) {
                document.title = n
            }
        },
        created() {

            this.proID = this.$route.query.id
            this.getData(this.proID)
        },
        filters: {
            IS_INTERVIEW_filter(val) {
                let msg = ''
                if (val == 0) {
                    return msg = '首次购买无需面签'
                }

                if (val == 1) {
                    return msg = '首次购买无需面签'
                }

                if (val == 2) {
                    return msg = '首次购买无需面签'
                }
                return msg = '首次购买无需面签'

            }
        },
        activated() {

        },
        mounted() {
        },
        methods: {
            getData(id) {
                let data = {
                    ID: id + ''
                }
                API.product.apiGetChannelPrdInfo(data, (res) => {
                    this.productDetail = res;
                    this.type = res.IS_ENABLED
                    this.btnType = this.type == 1 ? '安全购买' : '预约下期'
                    this.preTitle = res.PRD_NAME
                })
            },
            goNext(type) {
                util.storage.session.remove(LsName.ProDuctData)
                console.log(type);
                // todo 判断登陆
                //
                let data = { // 跳转购买需要的参数
                    PRD_NAME: this.productDetail.PRD_NAME,
                    TXT_MIN_AMOUNT: this.productDetail.TXT_MIN_AMOUNT,
                    REMAIN_AMT: this.productDetail.REMAIN_AMT,
                    INCRE_AMOUNT: this.productDetail.INCRE_AMOUNT,
                    ORG_NAME: this.productDetail.ORG_NAME,
                }
                if (type == 1) {
                    // 去安全购买
                    API.watch.watchApi({
                        FUNCTION_ID: 'ptb0A002',
                        REMARK_DATA: '异业合作-产品详情页-购买', // 中文备注
                        FROM_ID: this.proID, // 产品ID、机构ID
                    })
                    let HAS_GRADE = util.storage.session.get(LsName.HAS_GRADE) ||0
                    if (HAS_GRADE == 1) { // 未评估
                        let target = this.$route.fullPath
                        util.storage.session.set(LsName.LoginTarget, target) // 因为需要评估，跳转评估页再返回,页面跳转太多，url不是很合适了吧
                        Bus.$emit(BusName.showToast, '请先进行评估')
                        this.$router.push({
                            name: PageName.Verificationsuccess,
                        })
                    }
                    else {
                        // 其他的话
                        this.$router.push({
                            name: PageName.Buying,
                            query: {
                                id: this.proID,
                                logo: this.productDetail.LOGO_URL,
                                ...data
                            }
                        })
                    }

                } else {
                    // 预约得先登陆
                    let data = {
                        PRD_TYPE: '2',
                        PRD_NUMBER: this.productDetail.ID + ''
                    }
                    let sign = util.storage.session.get(LsName.token)
                    if (sign) {
                        console.log(sign);

                        API.product.apiSaveSubscribeInfo(data, res => {
                            console.log(res);
                            this.$router.push({
                                name: PageName.OrderNextSuccess,
                                query: {
                                    PRD_NAME: this.productDetail.PRD_NAME,
                                }
                            })
                        },err=>{
                            console.log(err);
                        })
                    } else { // 未登陆
                        Bus.$emit(BusName.showToast, '您还未登陆，请先登陆')
                        util.storage.session.set(LsName.ProDuctData,Object.assign(data,{PRD_NAME: this.productDetail.PRD_NAME}))
                        let target = this.$route.fullPath
                        setTimeout(() => {
                            this.$router.push({
                                name: PageName.login,
                                query: {
                                    target
                                }
                            })
                        })
                    }

                }

            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../assets/px2rem";

    html, body {
        width: 100%;
    }

    .header {
        background-color: #fff;
        height: 1.3rem;
        line-height: 1.3rem;
        font-size: 0.4rem;
    }

    .header p {
        text-align: center;
        font-size: 0.5rem;
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

    .banner {
        width: 100%;
        box-sizing: border-box;
        height: 5rem;
        background: #508CEE;
    }

    .banner .bannercontent {
        width: 90%;
        height: 85%;
        margin-left: 5%;
        padding-top: 5%;

    }

    .banner .bannercontent .bannertop {
        box-sizing: border-box;
        padding-top: 0.6rem;
        width: 100%;
        height: 75%;
        border-bottom: 1px solid #FFFFFF;
    }

    .banner .bannercontent .bannertop .bannertopleft {
        display: inline-block;
        width: 50%;
        color: #fff;
    }

    .banner .bannercontent .bannertop .bannertopright {
        display: inline-block;
        width: 48%;
        color: #fff;
        text-align: center;
    }

    .banner .bannercontent .bannerbottom {
        margin-top: 0.2rem;
        width: 97%;
        height: 20%;
    }

    .banner .bannercontent .bannerbottom ul {
        width: 100%;
        height: 100%;
        color: #fff;
    }

    .banner .bannercontent .bannerbottom ul li {
        text-align: center;
        line-height: 1rem;
        font-size: 0.3rem;
        float: left;
        height: 100%;
    }

    .banner .bannercontent .bannerbottom .bannerbottomfirst {
        background-image: url(../../images/img/icon@2x.png);
        background-repeat: no-repeat;
        background-position: 0.1rem;
        background-size: 0.5rem;
        width: 30%;
        border-right: 1px solid #FFFFFF;
    }

    .banner .bannercontent .bannerbottom .bannerbottomtwo {
        width: 30%;
        border-right: 1px solid #FFFFFF;
    }

    .banner .bannercontent .bannerbottom .bannerbottomthree {
        width: 39%;
    }

    .contenttop {
        padding: 0.5rem 0.5rem;
        color: black;
    }

    .contenttop p {
        font-size: 0.6rem;

    }

    .contenttop .bannercontent {
        width: 100%;
        height: 2rem;
        border-bottom: 1px solid #DCDCDC;
        color: #666;

    }

    .contenttop .bannercontent .bannercontenttitle {
        height: 100%;
        width: 30%;
        font-size: 0.4rem;
        line-height: 2rem;

    }

    .contenttop .bannercontent .bannercontenttitlecontent {
        height: 100%;
        width: 50%;
        font-size: 0.4rem;
        line-height: 2rem;
    }

    .contentmain {
        border-top: 0.3rem solid #efefef;
    }

    .contentmain .contentmaintop {
        font-size: 0.6rem;
        width: 100%;
        height: 1rem;
        border-bottom: 1px solid #efefef
    }

    .contentmain .contentmaintop .contentmainbank {
        margin-top: 0.5rem;
    }

    .contentbottom2 {
        height: 3rem;
        margin: 0.6rem 0;
    }

    .contentbottom2 .contentbottom2left {
        float: left;
        height: 1px;
        width: 33%;
        background: #efefef;
    }

    .contentbottom2 .contentbottom2main {
        margin-top: -0.3rem;
        background-image: url(../../images/img/logo@2x.png);
        background-repeat: no-repeat;
        background-position: 0.3rem 0.05rem;
        background-size: 0.5rem 0.5rem;
        height: 1rem;
        width: 30%;
        float: left;
        padding-left: 1rem;
        padding-top: 0.1rem;
        font-size: 0.3rem;
    }

    .contentbottom2 .contentbottom2right {
        position: absolute;
        right: 0;
        height: 1px;
        width: 33%;
        background: #DCDCDC;
    }

    .clearfix:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }

    .contentbottom2content .contentbottom2contentleft {
        text-align: center;
        float: left;
        display: inline-block;
        width: 33%;
        height: 3rem;
    }

    .contentbottom2content .contentbottom2contentleft img {
        width: 60%;
    }

    .contentbottom2content .contentbottom2contentleft p {
        font-size: 0.4rem;
    }

    .baozhang {
        text-align: center;
        font-size: 0.4rem;
        background-image: url(../../images/img/icon_dunpai@2x.png);
        background-repeat: no-repeat;
        background-size: 0.5rem 0.5rem;
        background-position: 20%;
    }

    .buttonbottom {
        margin-top: 1rem;
        width: 100%;
        height: 1.5rem;
        text-align: center;
        line-height: 1.5rem;
        background: #508CEE;
        color: #fff;
        font-size: 0.4rem;

    }

    .circle {
        position: relative;
        z-index: 2;
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 50%;
        border: 0.07rem solid #2B74FE;;
        box-sizing: border-box;
        background: radial-gradient(#fff 50%, #fff 50%);
        white-space: nowrap;
        &.left {
            margin-left: px2rem(5);

        }
        &.right {
            margin-right: px2rem(5);

        }
    }

    .wrapicon {
        position: relative;
        margin: 0.8rem auto 1rem;
        display: flex;
        width: px2rem(335);
        justify-content: space-between;
        color: #666;

    }

    .wrapicon:before {
        position: absolute;
        top: 50%;
        left: 0;
        content: '';
        display: block;
        width: 100%;
        height: px2rem(2);
        background: #2B74FE;;
    }

    .circle span {
        position: absolute;
        left: px2rem(-30);
        top: 0.5rem;
        font-size: px2rem(13);
    }

    .left span {
        left: px2rem(-15);

    }

    .right span {
        left: px2rem(-45);

    }

    .circle strong {
        position: absolute;
        left: -0.3rem;
        top: -0.8rem;
        font-size: 0.4rem;

    }
</style>

