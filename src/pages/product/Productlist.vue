<template>
    <div class="wrap">
        <header class="header">
            <a class="return" href=""></a>
            <p>优选计划360号</p>
        </header>
        <div class="banner"></div>
        <div class="productlist" v-if="show">
            <ul>
                <li class="productdetail clearfix"
                    v-for="item,index in dataList" :key="index"
                    @click="goDetail(item.ID)"
                >
                    <p>{{item.PRD_NAME}}</p>
                    <div class="ratereturn">
                        <p style="color: #FFB400;font-size: 0.8rem;">{{item.RATE}}%</p>
                        <p style="color: #B4BECC;font-size: 0.3rem;">预期年化收益率</p>
                    </div>
                </li>
            </ul>
        </div>
        <ul class="productlist2" v-if="!show">
            <li class="productdetail">
                <div class="rateleft">
                    <p style="color: #FFB400;font-size: 0.8rem;">5.80%</p>
                    <p style="color: #B4BECC;font-size: 0.4rem;">预期年化收益率</p>
                </div>
                <div class="rateright">
                    <p style="color: #333333 ;font-size: 0.5rem;">稳增计划A66号</p>
                    <p style="color: #B4BECC;font-size: 0.4rem;">理财期限125天</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import {API} from "../../request/api";
    import {PageName} from "../../Constant";


    export default {
        data() {
            return {
                show: true,
                dataList:[]
            }
        },
        created() {
            this.getListData()
        },
        methods: {
            getListData(){
               API.product.apiGetChannelPrdList({},(res)=>{
                   console.log(res);
                   let num = res.length
                   this.dataList = res

                   //
               })
            },
            goDetail(id){
                this.$router.push({
                    name:PageName.Productreservation,
                    query:{
                        id
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
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

    .return {
        display: block;
        position: absolute;
        left: 0.4rem;
        top: 0.2rem;
        background-image: url(../../images/img/back@2x.png);
        background-size: cover;
        width: 0.3rem;
        height: 0.9rem;
    }

    .banner {
        width: 100%;
        height: 5.5rem;
        background: #eaeaea;
    }

    .productdetail {
        float: left;
        display: inline-block;
        width: 33%;
        height: 3rem;
        border-right: 1px solid #F6F6F9;
        border-bottom: 1px solid #F6F6F9;
        p {
            text-align: center;
            padding-top: .2rem;
            font-size: 0.5rem;
        }
        .ratereturn {
            text-align: center;
        }
    }

    .productlist2 {

        width: 100%;
        ul{
            width: 100%;
            display: flex;
        }
        .rateleft {
           flex: 1;
        }
        .rateright {
            flex: 1;
        }
    }

    .clearfix:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
</style>
