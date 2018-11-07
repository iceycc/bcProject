<template>
    <div>
        <app-bar title="赎回"></app-bar>
        <div class="r-top">
            <img src="../../assets/images/licaiicon@2x.png" alt="">
            <div>
                <p>博时日添利</p>
                <span>货币基金</span>
            </div>
        </div>
        <div class="r-cash">
            <div class="title">赎回金额</div>
            <div class="money">
                <div class="number">
                    <i v-show="isFocus">￥</i>
                    <input type="number" @focus="focus" @blur="blur" placeholder="最多可赎回金额 1,000,000.00元" v-model="money">
                </div>
                <div class="all">全部赎回</div>
            </div>
        </div>
        <div class="r-type">
            <div class="type">赎回类型</div>
            <div class="choose" @click="typeShow = true">
                <span>{{typeText}}</span>
                <i class="iconfont icon-xiangyou"></i>
            </div>
        </div>
        <div class="r-tips">
            <p>每天快速赎回额度为1万元。</p>
            <p>如果赎回金额超过实施赎回额度，请进行普通赎回操作。</p>
            <p>普通赎回T+1工作日16:30后到账。</p>
        </div>
        <div class="r-btn">赎回</div>
        <div class="r-agreement">
           立即赎回代表您已阅读并同意<span>《“日添利-博时基金 ”产品业务服务协议》</span>
        </div>
        <div class="r-caption">
            <p>温馨提示：</p>
            <p>工作日指上海证券交易所和深圳证券交易所的正常交易日，非工作日指其他日期（如国家法定节假日、周六日、调休等）。
            工作日15:00之前发起成功的存入交易申请，基金公司于第二个工作日予以确认份额，工作日15:00之后及非工作日发起成功的存入交易申请视为下一个工作日发起的交易申请，具体结果以基金公司的确认结果为准。</p>
            <p>风险提示：产品过往业绩不代表其未来表现，不构成产品未来业绩表现的保证。理财有风险，投资需谨慎。</p>
        </div>
        <div class="grey-mask" v-show="typeShow"></div>
        <div class="r-type-popup" v-show="typeShow">
            <div class="title">
                赎回类型
                <i @click="typeShow = false">&times;</i>
            </div>
            <ul class="r-type-list">
                <li :class="cur === 1 ? 'active' : ''" @click="chooseType(1,$event)">
                    <span>快速赎回</span>
                    <i></i>
                </li>
                <li :class="cur === 2 ? 'active' : ''" @click="chooseType(2,$event)">
                    <span>普通赎回</span>
                    <i></i>
                </li>
            </ul>
        </div>
        <div class="white-mask" v-show="normalShow"></div>
        <div class="r-normal-popup" v-show="normalShow">
            <div class="info">工作日15:30之前发起成功的普通赎回到账时间为下一个工作日16:30后到账，工作日15:00之后以及非工作日发起成功的普通赎回申请视为下一个工作日发起的交易申请。是否进行普通赎回？</div>
            <div class="cofirm-btn">
                <div>取消</div>
                <div>确定</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                money:'',
                isFocus: false,
                typeShow: false,
                cur: 0,
                typeText: '请选择',
                normalShow: false
            }
        },
        components:{
            
        },
        methods: {
            focus(){
                this.isFocus = true;
            },
            blur(){
                this.money.length > 0 ? this.isFocus = true : this.isFocus = false;
            },
            chooseType(val,e){
                this.cur = val;
                this.typeShow = false;
                this.typeText = e.target.innerText;
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "~@/assets/px2rem";
    @import "../../assets/iconfont/iconfont.css";
    i {
        font-style: normal;
    }
    .r-top {
        border-top: px2rem(10) solid #F6F6F9;
        border-bottom: px2rem(10) solid #F6F6F9;
        display: flex;
        align-items: center;
        padding: px2rem(15) px2rem(20);
        img {
            width: px2rem(32);
            height: px2rem(32);
        }
        div {
            padding-left: px2rem(15);
            p {
                font-size: px2rem(14);
                color: #444444;
                padding-bottom: px2rem(4);
            }
            span {
                color: #666666;
            }
        }
    }
    .r-cash {
        padding: px2rem(15) px2rem(20);
        border-bottom: 1px solid #EEEEF0;
        .title {
            padding-bottom: px2rem(10);
            font-size: px2rem(14);
        }
        .money {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .number {
                width: px2rem(250);
                font-size: px2rem(24);
                input {
                    width: 80%;
                    font-size: px2rem(24);
                    &::-webkit-input-placeholder {
                        font-size: px2rem(14);
                        color: #B3B3B3;
                    }
                }
            }
            .all {
                color: #389CFF;
                font-size: px2rem(14);
            }
        }
    }
    .r-type {
        display: flex;
        justify-content: space-between;
        padding: px2rem(15) px2rem(20);
        font-size: px2rem(14);
        border-bottom: 1px solid #EEEEF0;
        .type {
            color: #333;
        }
        .choose {
            color: #858E9F;
            i {
                font-size: px2rem(14);
            }
        }
    }
    .r-tips {
        color: #B3B3B3;
        padding: px2rem(10) px2rem(20) px2rem(30);
    }
    .r-btn {
        width: px2rem(255);
        height: px2rem(44);
        line-height: px2rem(44);
        margin: 0 auto;
        text-align: center;
        background-color: #518BEE;
        color: #fff;
        font-size: px2rem(18);
        border-radius: px2rem(6);
    }
    .r-agreement {
        padding: px2rem(20) px2rem(20) px2rem(65);
        color: #9199A1;
        span {
            color: #518BEE;
            display: inline;
        }
    }
    .r-caption {
        color: #9199A1;
        padding: 0 px2rem(20) px2rem(80);
    }
    .grey-mask{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(123,125,123,.7);
        z-index: 9;
    }
    .r-type-popup {
        width: 100%;
        position: fixed;
        bottom: 0;
        z-index: 99;
        background-color: #fff;
        .title {
            text-align: center;
            height: px2rem(45);
            line-height: px2rem(45);
            position: relative;
            font-size: px2rem(18);
            color: #444;
            border-bottom: 1px solid #EEEEF0;
            i {
                position: absolute;
                top: 0;
                right: px2rem(25);
                font-size: px2rem(26);
                color: #858E9F;
            }
        }
        .r-type-list {
            li {
                padding: px2rem(22);
                border-bottom: 1px solid #EEEEF0;
                display: flex;
                justify-content: space-between;
                span {
                    font-size: px2rem(14);
                    color: #444;
                }
            }
            i {
                width: px2rem(18);
                height: px2rem(18);
            }
            .active i {
                background: url("../../assets/images/check.png") center center no-repeat;
            }
            
        }    
    }
    .white-mask{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: transparent;
        z-index: 9;
    }
    .r-normal-popup {
        position: fixed;
        width: px2rem(270);
        background-color: #fff;
        z-index: 99;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        box-shadow: 0 2px 3px 0 rgba(0,0,0,.2);
        border-radius: px2rem(6);
        .info {
            padding: px2rem(20);
            font-size: px2rem(14);
            color: #333;
            border-bottom: 1px solid #EEEEF0;
            line-height: px2rem(24);
        }
        .cofirm-btn {
            display: flex;          
            div {
                width: 50%;
                box-sizing: border-box;
                text-align: center;
                padding: px2rem(10) 0;
                color: #108EE9;
                font-size: px2rem(17);
                &:first-child {
                    border-right: 1px solid #EEEEF0;
                }
            }
            
        }
    }
</style>

