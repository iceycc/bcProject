<template>
    <div id="app" class="app">
        <header class="header">
            <a class="return" href=""></a>
            <p>风险评测</p>
        </header>
        <div class="chattuimg">
            <img src="../../images/img/account_illustrations@2x.png" style="width:70%" alt="">
        </div>
        <div class="fenxiancontent">
            <div class="fenxiantitle">
                <p class="info">您的风险测评结果为</p>
                <p class="code">{{RISK_TOLERANCE_SCORE}}分 {{RISK_TOLERANCE_DESC}} </p>
            </div>
            <p>{{RISK_LEV_EXPLAIN}}</p>
        </div>
        <div class="btn">
            <button @click="reCheck" class="begain" style="display: inline-block;">重新测评</button>
            <button @click="goNext" class="begain" style="display: inline-block;">完成</button>
        </div>

    </div>
</template>
<script>
    import {BusName, LsName, PageName} from "../../Constant";
    import util from "../../common/utils/util";
    import Bus from '../../common/js/bus'
    import {API} from "../../request/api";
    import {UtilMixin} from '../../common/utils/mixin'

    export default {
        data() {
            return {
                RISK_TOLERANCE_LEVEL: '',
                RISK_TOLERANCE_DESC: '',
                RISK_LEV_EXPLAIN: '',
                RISK_TOLERANCE_SCORE: '',
                target: ''
            }
        },
        mixins: [UtilMixin],
        created() {
            let data = this.$route.query
            // let tarArr = ["/Riskproblom", "/fengxianresult", '/Verificationsuccess']
            // if (tarArr.includes(this.target)) {
            //     this.target = '/Productlist'
            // }

            this.RISK_TOLERANCE_LEVEL = data.RISK_TOLERANCE_LEVEL
            this.RISK_TOLERANCE_DESC = data.RISK_TOLERANCE_DESC
            this.RISK_LEV_EXPLAIN = data.RISK_LEV_EXPLAIN
            this.RISK_TOLERANCE_SCORE = data.RISK_TOLERANCE_SCORE
        },
        methods: {
            reCheck() {
                this.$router.push({
                    name: PageName.Riskproblom
                })
            },
            goNext() {
                // todo 跳转到购买
                try {
                    this.toPreProduct()
                }catch (e) {
                    this.$router.push({
                        path: '/Productlist'
                    })
                }
            }
        }

    }
</script>

<style lang="scss" scoped>
    @import "../../assets/px2rem";

    .app {
        width: 100%;
        margin: 0 auto;
    }

    .chattuimg {
        margin-top: px2rem(40);
        text-align: center
    }

    .fenxiancontent {
        font-size: 0.4rem;
        color: #333;
        margin-top: px2rem(40);
        padding: 0 1rem;
        .fenxiantitle {
            text-align: center;
            .info {
                font-size: px2rem(18);
            }
            .code {
                font-size: px2rem(38);
                color: #7396e4;
                margin-bottom: px2rem(30);
            }
        }
    }

    .btn {
        display: flex;
        padding: 0 px2rem(25);
        margin-top: px2rem(40);
        .begain {
            flex: 1;
            text-align: center;
            font-size: px2rem(18);
            color: #fff;
            background-color: #7396e4;
            border-radius: px2rem(6);
            width: px2rem(140);
            height: px2rem(40);
            border: none;
            outline: none;
            margin: 0 px2rem(10);
        }
    }


</style>
