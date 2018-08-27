<template>
    <div class="wrap">
        <app-bar title="产品列表"></app-bar>
        <div class="banner">
            <img src="../../images/img/banner.png" alt="">
        </div>
        <div class="productlist" v-if="!show">
            <ul class="ul-li">
                <li class="productdetail clearfix"
                    v-for="item,index in dataList" :key="index"
                    @click="goDetail(item.ID)"
                >
                    <p class="name2">{{item.PRD_NAME}}</p>
                    <div class="ratereturn">
                        <p style="color: #FFB400;font-size: 0.8rem;" >{{item.RATE}}%</p>
                        <p style="color: #B4BECC;font-size: 0.3rem;">预期年化收益率</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="productdetail2"  v-if="show">
            <ul>
                <li class="clearfix"  v-for="item,index in dataList" :key="index"
                    @click="goDetail(item.ID)">
                    <div class="ratereturn " style="text-align: center">
                            <p style="color: #FFB400;font-size: 0.8rem;">{{item.RATE}}%</p>
                            <p style="color: #B4BECC;font-size: 0.4rem;">预期年化收益率</p>
                    </div>
                    <div class="ratereturn ratereturnright">
                            <img class="logoy" v-if="item.IS_ENABLED == 2" src="../../images/img/yuyue.png" alt="">
                            <p class="name" style="color: #333333 ;font-size: 0.5rem;margin-top:-0.2rem">{{item.PRD_NAME}}</p>
                            <p style="color: #B4BECC;font-size: 0.4rem;margin-top:0.2rem">理财期限{{item.PERIOD}}天</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import {API} from "../../request/api";
    import {PageName} from "../../Constant";


    export default {
        data() {
            return {
                show: false,
                dataList:[]
            }
        },
        created() {
            this.getListData()
        },
        methods: {
            getListData(){
               API.product.apiGetChannelPrdList({},(res)=>{
                   let num = res.length
                   if(num < 9){
                       this.show = true
                   }else{
                       this.show = false
                   }
                   this.dataList = res.splice(0,9)
               })
            },
            goDetail(id){
                console.log(id)
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
    .name2{
         overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        height: 1.5rem;
        padding-left: 0.2rem;
        padding-right: 0.2rem;
    }


    .banner {
        width: 100%;
        height: 5.5rem;
        background: #dedede;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .ul-li{
        // padding-right: 11px;
        // padding-right: 11px;
        overflow: hidden;
        width: 100%;
        text-align:left;
        // background-color: red;
    }
    .ul-li li{
        // margin-left: 10px;
        width: 33%;
        text-align: center;
    }
    .productdetail {
        // float: left;
        display: inline-block;

        // width: 2.5rem;
        // height: 3rem;
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

 .wrap{
    width:100%;
    box-sizing: border-box;
}

.productdetail2{
    position: relative;
    height:2.5rem;

    li{
         border-bottom: 0.3rem solid #F6F6F9;
         overflow: hidden;
         padding-bottom: 0.4rem;
    }
    .ratereturn{
    float: left;
    width:35%;
    margin-top: .25rem;    
    border-right: 1px solid #F6F6F9;
    position: relative;
    }
    .name{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    
    .logoy{
        position:absolute;
        right: -1rem;
        bottom: -1.1rem;
        width: 3rem;
    
    }
    // .clearfix:after{
    // content:".";
    // display:block;
    // height:0;
    // visibility:hidden;
    // }
    .ratereturnright{
    padding-left: .6rem;
    margin-top: .7rem;
    border:none;
    width:55%;
    }  
    .yuyue{
    position: absolute;
    top:0rem;
    } 
}
</style>
