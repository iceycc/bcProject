<template>
    <div class="wrap pro">
        <app-bar title="理财产品"></app-bar>
        <div class="f-box">
            <ul>
                <li>
                    <p>124.00</p>
                    <p>总资产</p>
                </li>
                <li>
                    <p>12.88</p>
                    <p>累计收益</p>
                </li>
            </ul>
        </div>
        <div class="tab-box">
            <ul class="tabs">
                <li class="li-tab" v-for="(item,index) in tabsParam" 
                @click="toggleTabs(index)"
                :class="{active:index==nowIndex}">{{item}}</li>
            </ul>
            <div class="divTab" v-show="nowIndex===0">
               <div class="divTab-1">
                   <h4><strong>智雁存</strong> <router-link to="/">明细</router-link></h4>
                   <p>隶属于小雁银行</p>
                   <p>当前价值（元）<span>892.26</span></p>
                   <p>预期年化收益率<span>10,892.26</span></p>
                   <p>预期参考收益（元）<span>2018-08-30</span></p>
                   <p>到期日期<span>2018-08-18</span></p>
               </div>
                <div class="divTab-1">
                   <h4><strong>智雁存</strong> <router-link to="/">明细</router-link></h4>
                   <p>隶属于小雁银行</p>
                   <p>当前价值（元）<span>892.26</span></p>
                   <p>预期年化收益率<span>10,892.26</span></p>
                   <p>预期参考收益（元）<span>2018-08-30</span></p>
                   <p>到期日期<span>2018-08-18</span></p>
               </div>
            </div>
            <div class="divTab" v-show="nowIndex===1">
                <div class="divTab-1">
                   <h4><strong>百合宝</strong> <router-link to="/">明细</router-link></h4>
                   <p>百合银行</p>
                   <p>投资金额（元）<span>10,000.00</span></p>
                   <p>投资收益（元）<span>505.94</span></p>
                   <p>到期日期<span>2018-08-30</span></p>
               </div>
               <div class="divTab-1">
                   <h4><strong>百合宝</strong> <router-link to="/">明细</router-link></h4>
                   <p>百合银行</p>
                   <p>投资金额（元）<span>10,000.00</span></p>
                   <p>投资收益（元）<span>505.94</span></p>
                   <p>到期日期<span>2018-08-30</span></p>
               </div>
            </div>
        </div>
        
    </div>
</template>
<script>
    import {API} from "../../request/api";
    import {LsName, PageName} from "../../Constant";
    import util from "../../common/utils/util";


    export default {
        data() {
            return {
                tabsParam:['持有中','已到期'],//（这个也可以用对象key，value来实现）
                nowIndex:0,//默认第一个tab为激活状态
                
            }
        },
        beforeCreate () {
            document.getElementsByTagName("body")[0].className="bg_white";
          },
          beforeDestroy () {
            document.getElementsByTagName("body")[0].className="";
          },
        created() {

            
        },
        methods: {
            toggleTabs(index){
                this.nowIndex=index;
            }
            
        }
    }
</script>

<style lang="scss">
// .pro .header img{ display:none;}
 // .pro .header{ border-bottom:1px solid #518BEE;}
 .bg_white{background:#f4f4f8; height: 100%;}
</style>

<style lang="scss" scoped>
    @import "../../assets/px2rem";
    .wrap {
        width: 100%;
        box-sizing: border-box;
    }
     .header {
        background-color: #518BEE;
        color:#fff;
        border-bottom: 1px solid #518BEE;
    }
    .f-box{ 
        height:px2rem(158); background:#518BEE;
        ul{
            display: flex;
            li{ 
                flex:1;
                p{ text-align:center; color:#fff;}
                p:first-child{font-size:px2rem(22); line-height: px2rem(30); padding-top: px2rem(52); padding-bottom: px2rem(7);}
                p:last-child{
                    font-size:px2rem(12);line-height: px2rem(17);
                }
            }
            li:first-child{
                position: relative;
            }
            li:first-child:after{
                position:absolute;content: ""; width:px2rem(1); height:px2rem(20);right:0;background:#fff; top: px2rem(67);
            }
            li.active{background: #eee; }
        }
    }

    .tab-box{
        // background:#f4f4f8; height: 100%; position:fixed; width:100%; 
        ul{ 
            background:#fff; display: flex; margin-bottom: px2rem(20);
            li{ 
                flex:1; height:px2rem(50); font-size:px2rem(18); line-height: px2rem(50); text-align: center;
            }
            li.active{ color:#508CEE; position:relative;}
             li.active:after{ position:absolute; width:px2rem(20); height: px2rem(3); content:""; background:#508CEE; border-radius: px2rem(2); bottom:0;left: 0;right: 0; margin: 0 auto;}
        }
        .divTab{
            background:#f4f4f8;
            padding-bottom: px2rem(10);
            .divTab-1{
                 background:#fff; font-size: px2rem(12); margin:px2rem(10)  px2rem(15) 0; border-radius: px2rem(12); box-sizing: border-box;padding: px2rem(20) px2rem(15) px2rem(10);
                 h4 { overflow:hidden;}
                 h4 strong{ color:#333333; font-size:px2rem(16); line-height: px2rem(12);}
                 h4 a{ font-size: px2rem(12); color:#508CEE; line-height: px2rem(17); float:right; font-weight: normal;}
                 p{ color:#666; font-size:px2rem(12); line-height: px2rem(17); padding-bottom: px2rem(8);
                     overflow: hidden;
                    span{ float: right; color:#999999;}
                 }
                 p:first-of-type{padding:px2rem(4) 0 px2rem(10); border-bottom: px2rem(1) solid #F5F5F5; margin-bottom: px2rem(16);}
                 // p:last-of-type{ padding-bottom: 0;}
            }
        }


    }




</style>
