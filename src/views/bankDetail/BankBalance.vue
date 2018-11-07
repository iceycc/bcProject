<template>
    <div class="m-main">
        <app-bar title="可用余额" class="m-header"></app-bar>
        <section class="m-top">
            <p class="u-title">可用金额（元）</p>
            <p class="u-content">￥{{ACC_REST |formatNum | preLcAssetFilter}}<i>{{ACC_REST | formatNum | lastLcAssetFilter}}</i></p>
        </section>
        <section class="m-list">
            <section class="m-li" @click="goPage('Recharge')">
                <span>充值</span>
                <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
            </section>
            <section class="m-li" @click="goPage('Withdraw')">
                <span>提现</span>
                <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
            </section>
            <section class="m-li" @click="goPage('TransactionDetails')">
                <span>明细查询</span>
                <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
            </section>
        </section>
    </div>
</template>

<script>
    import IconFont from '@/components/commons/IconFont'
    import API from "@/service";
    import {LsName, PageName} from "@/Constant";
    import util from "libs/util";
    export default {
        name: "bankBalance",
        components: {
            IconFont
        },
        data(){
            return {
                ACC_REST:'0.00',
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
        created(){
            this.getBankDetail()
        },
        methods:{
            getBankDetail() {
                API.JINSHANG.account.apiQueryAccRest({}, (res) => {
                    this.ACC_REST = res.ACC_REST
                    let ReChargeData = {
                        ORG_NAME:　res.ORG_NAME,
                        LOGO_URL:res.LOGO_URL
                    }
                    util.storage.session.set(LsName.RechargeQuery,ReChargeData)
                })
            },
            getUserInfos(){

            },
            goPage(page){
                let query = {}
                util.storage.session.set(LsName.OriginPage,this.$route.fullPath)
                if(page=='Withdraw'){
                    query = {
                        ACC_REST:this.ACC_REST
                    }
                }
                console.log(page);
                this.$router.push({
                    name:page,
                    query
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
    .m-main{
        height: 100%;
        background:#f6f6f6;
    }
    .m-header{
        position: relative;
        z-index: 10;
    }
    .m-top {
        width: 100%;
        height: px2rem(120);
        background: url("~@/assets/images/OvalCopy.png") no-repeat center center;
        padding-left: px2rem(25);
        padding-top: px2rem(25);
        box-sizing: border-box;
        .u-title {
            font-size: px2rem(14);
            color: #fff;
            opacity: 0.79;
        }
        .u-content {
            font-size: px2rem(40.32);
            color: #fff;
            i{
                font-size: px2rem(28.8);
            }

        }
    }
    .m-list{
        background:#fff;
        .m-li{
            box-sizing: border-box;
            padding:0 px2rem(10);
            display: flex;
            font-size: px2rem(14);
            color:#333;
            height: px2rem(50);
            line-height:px2rem(50);
            border-bottom:1px solid #f6f6f6;
            &:last-child{
                border-bottom:none;
            }
            span{
                flex:1
            }
        }
    }

</style>