<template>
    <div style="background: #f6f6f9;height: 100%">
        <app-bar title="电子账户"></app-bar>
        <section class="m-bank-box" v-if="ISLoginBankList.length >0">
            <p class="m-title">已登陆</p>
            <section class="m-bank-card"
                     v-for="bank,index in ISLoginBankList" :key="index"
                     @click.stop="goPage('BankDetail',bank.ORG_ID)"
            >
                <div class="m-top">
                    <div class="m-logo">
                        <img :src="imgSrc + bank.LOGO_URL" alt="">
                    </div>
                    <div class="m-name">
                        <h3>{{bank.ORG_NAME}}</h3>
                        <p>隶属于{{bank.DESCRIPT}}</p>
                    </div>
                    <div class="m-btn">
                        <!--<span class="u-btn" @click="goLogin">安全登陆</span>-->
                    </div>

                </div>
                <ul class="m-bottom">
                    <li>
                        <P>总资产</P>
                        <P>{{bank.TOTAL_ASSET}}</P>
                    </li>
                    <li>
                        <P>昨日收益</P>
                        <P><i v-if="bank.YSD_INCOME>=0">+</i>{{bank.YSD_INCOME}}</P>
                    </li>
                    <li>
                        <P>累计收益</P>
                        <P><i v-if="bank.TOTAL_INCOME>=0">+</i>{{bank.TOTAL_INCOME}}</P>
                    </li>
                </ul>
            </section>
        </section>
        <section class="m-bank-box" v-if="NOLoginBankList.length >0">
            <p class="m-title">未登陆</p>
            <section class="m-bank-card" v-for="bank,index in NOLoginBankList" :key="index">
                <div class="m-top">
                    <div class="m-logo">
                        <img :src="imgSrc + bank.LOGO_URL" alt="">
                    </div>
                    <div class="m-name">
                        <h3>{{bank.ORG_NAME}}</h3>
                        <p>隶属于{{bank.DESCRIPT}}</p>
                    </div>
                    <div class="m-btn">
                        <span class="u-btn" @click="goPage('login',bank.ORG_ID)">安全登陆</span>
                    </div>

                </div>
                <ul class="m-bottom">
                    <li>
                        <P>总资产</P>
                        <P class="left13"> - -</P>
                    </li>
                    <li>
                        <P>昨日收益</P>
                        <P class="left17"> - - </P>
                    </li>
                    <li>
                        <P>累计收益</P>
                        <P class="left17"> - - </P>
                    </li>
                </ul>
            </section>
        </section>
    </div>
</template>

<script>
    import {API} from "../../service/api";
    import Bus from '../../plugin/bus'
    import {PageName, BusName, LsName,imgSrc} from "../../Constant";
    import util from "../../common/utils/util";

    export default {
        name: "SafeLogin",
        data(){
          return{
              imgSrc,
              BankList:[
                  // {
                  //     ORG_NAME:'廊坊直销银行',
                  //     DESCRIPT:'廊坊银行',
                  //     TotalNum:'500',
                  //     PreMoney:'0.30',
                  //     GetMoney:'100.30',
                  //     HAS_LOGIN:false
                  // },
                  // {
                  //     ORG_NAME:'廊坊直销银行',
                  //     DESCRIPT:'廊坊银行',
                  //     TotalNum:'500',
                  //     PreMoney:'0.30',
                  //     GetMoney:'100.30',
                  //     HAS_LOGIN:true
                  // },
              ],
              ISLoginBankList:[],
              NOLoginBankList:[]
          }
        },
        created(){
            util.storage.session.remove(LsName.ORG_ID)
            this.getBankList()
        },
        methods:{
            goPage(page,ORG_ID){
                util.storage.session.set(LsName.ORG_ID,ORG_ID)
                if(page=='login'){
                    util.storage.session.set(LsName.loginType,PageName.BankAccount)
                    this.$router.push({
                        name:PageName.login,
                    })
                }
                if(page=='BankDetail'){
                    this.$router.push({
                        name:PageName.BankDetail,
                    })
                }

            },
            // get
            getBankList(){
                let data = {}
                API.account.apiBankList(data,(res)=>{
                    this.BankList = res.BANK_LIST
                    this.ISLoginBankList = this.BankList.filter((item,index)=>{
                        return item.HAS_LOGIN == 1
                    })
                    this.NOLoginBankList = this.BankList.filter((item,index)=>{
                        return item.HAS_LOGIN == 2
                    })
                },(err)=>{
                    console.log(err);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/px2rem";
    i{
        font-style: normal;
    }
    .m-bank-box {
        width: 100%;
        .m-title{
            padding-left: px2rem(20);
            font-size: px2rem(12);
            height: px2rem(30);
            line-height: px2rem(30);
            color: #999;
        }
        .m-top {
            background: #fff;
            display: flex;
            border-bottom: 1px solid #f6f6f9;
            box-sizing: border-box;
            padding-left: px2rem(20);
            padding-top: px2rem(20);
            padding-bottom: px2rem(18);
            .m-logo{
                box-sizing: border-box;
                width: px2rem(52);
                img{
                    width: px2rem(34);
                    height: px2rem(34);
                }
            }
            .m-name{
                width: px2rem(200);
                p{
                    color:#A8B4C4;
                }
            }
            .m-btn{

            }


        }
        .left13{
            box-sizing: border-box;
            padding-left: px2rem(13);
        }
        .left17{
            box-sizing: border-box;
            padding-left: px2rem(19);
        }
        .m-bottom{
            background: #fff;
            padding-left: px2rem(20);
            padding-bottom: px2rem(13);
            font-size: px2rem(14);
            li{
                display: inline-block;
                width: px2rem(130);
                box-sizing: border-box;
                padding-top: px2rem(15);
                &:last-child{
                    width: auto;
                }
                p:first-child{
                    color: #666;
                    line-height: 1.5;
                }
                p:last-child{
                    color: #333;
                }
            }
        }
    }
    .u-btn{
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