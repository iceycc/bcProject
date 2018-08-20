<template>
    <div class="warp">
        <app-bar title="信息填写"></app-bar>
        <div class="wrapicon">
            <div class="circle"><span>开户信息验证</span></div>
            <div class="circle"><span>绑定银行卡</span></div>
            <div class="circle"><span>设置密码</span></div>
        </div>
        <div class="opening_box">
            <p>
                <span>选择银行</span>
                <input type="text" name="back" placeholder=" 请选择银行" v-model="data.ORG_ID">
                <!-- <span  class="limit">银行限额</span>  -->
            </p>
            <p>
                <span> 绑定卡卡号</span>
                <input type="number" name="backname" placeholder="请输入绑定的银行卡号" v-model="data.CARD_NO">
            </p>
            <p>
                <span>手机号码</span>
                <input type="text" name="tel" @blur="checkTel" placeholder="请输入您的银行预留手机号" v-model="data.PRE_PHONE_NUM">
            </p>
            <p>
                <span>验证码</span>
                <input type="password" name="msgcode" placeholder="请输入您的短信验证码" v-model="data.PHONE_CODE">
                <span class="getpassword" @click="getMsgCodeHandle">获取验证码</span>
            </p>
        </div>
        <!-- <div class="tijiao Tips">请使用该预留手机号进行开户</div> -->
        <button class="tijiao" @click="goNext">下一步</button>
    </div>
</template>
<script>
    import { API } from "../../request/api";
    import {PageName,BusName,LsName} from "../../Constant";
    import {util} from "../../common/utils/util";
    import Bus from '../../common/js/bus'

    export default {
        data() {
            return {
                data: {
                    ORG_ID: '70',
                    CARD_NO: '6214830182284272', // 银行卡号 6214830182284272  6217730711297810
                    HAS_BAND: '0', // 是否绑定过
                    PHONE_NUM: '15621185521', // 15711310733
                    PRE_PHONE_NUM: '15621185521', //
                    PHONE_CODE: '', // 手机验证码
                    LAST_STEP_NUM: '0', // 步数
                    MESSAGE_TOKEN:''
                },
            }
        },
        created(){

        },
        methods: {
            checkTel(){
                let num = this.data.PHONE_NUM
                util.storage.local.set(LsName.token,this.data.PHONE_NUM)
                API.open.doApiRegisterBackShow({},num,res=>{
                    console.log('步数 >>>',res.LAST_STEP_NUM);
                    let seq = res.BESHARP_REGISTER_VALI_USER_SEQ
                    console.log(seq);
                    // return
                    if(res.LAST_STEP_NUM == 0){
                        // Bus.$emit(BusName.showToast,"欢迎注册")
                        return
                    }
                    if(res.LAST_STEP_NUM == 1){
                        // Bus.$emit(BusName.showToast,"第二步")
                        this.$router.push({
                            name:PageName.opening2
                        })
                        return
                    }
                    if(res.LAST_STEP_NUM == 2){
                        Bus.$emit(BusName.showToast,"您已经实名成功")

                        setTimeout( ()=> {
                            this.$router.push({
                                name:PageName.opening3,
                                params:{seq}
                            })
                        },600)
                        return
                    }
                    if(res.LAST_STEP_NUM == 3){
                        Bus.$emit(BusName.showToast,"您已经开户成功")

                        this.$router.push({
                            name:PageName.opening3
                        })
                        return
                    }
                    Bus.$emit(BusName.showToast,"状态异常")

                },err=>{
                    console.log(err);
                })
            },
            getMsgCodeHandle() {

                let data = {
                    PHONE_NUM: this.data.PRE_PHONE_NUM,
                    BIZ_TYPE: '1',
                }
                API.open.getMsgCode(data, res => {
                    console.log('注册手机验证码res >>>', res);
                    console.log(res);
                    this.data.MESSAGE_TOKEN = res.MESSAGE_TOKEN
                }, err => {
                    console.log(err);
                })
            },

            goNext() {
                util.storage.local.set(LsName.token,this.data.PHONE_NUM)
                let preData = this.$route.params.data
                this.data = Object.assign(this.data, preData)
                console.log('data >>>',this.data);
                API.open.doRegeist(this.data,
                        res => {
                            console.log('注册res >>>',res);
                            // todo 判断
                            // return
                            this.$router.push({
                                name: PageName.opening3,
                                params:{
                                    REQ_SERIAL:res.REQ_SERIAL
                                }
                            })
                        },
                        err => {
                            console.log(err);
                        })
            }
        }

    }
</script>

<style lang="scss" scoped>
    .warp {
        width: 100%;
        position: relative;
    }
    .opening_box p {
        margin-left: 0.6rem;
        background-repeat: no-repeat;
        background-color: #fff;
        line-height: 1.3rem;
        width: 90%;
        background-size: 0.7rem 0.7rem;
        background-position: .2rem .2rem;
        border-bottom: 1px #E5E5E5 solid;
    }

    .opening_box p span {
        font-family: PingFangSC-Regular;
        color: #444444;
        font-size: 0.4rem;
        display: inline-block;
        width: 2rem;
    }

    .opening_box p .limit {
        background-image: url(../../images/img/problom2@2x.png);
        background-size: 12px 12px;
        background-position: 0 2.5px;
        background-repeat: no-repeat;
        padding-left: 20px;
        color: #0096FE;
        font-family: PingFangSC-Regular;
    }

    .opening_box p .getpassword {
        margin-top: 0.3rem;
        float: right;
        display: inline-block;
        text-align: center;
        line-height: 0.7rem;
        font-size: 0.3rem;
        width: 2rem;
        height: 0.7rem;
        border: 1px solid #2B74FE;
        color: #2B74FE;
        border-radius: 0.2rem;
    }

    .opening_box input {
        width: 48%;
        border: none;
        box-sizing: border-box;
        font-size: 0.4rem;
        color: #333;
        line-height: 1.3rem;
        outline: none;
    }

    .tijiao {
        font-size: 0.5rem;
        color: #fff;
        background-color: #0096FE;
        border-radius: 0.2rem;
        line-height: 1rem;
        width: 70%;
        margin: 0 auto;
        text-align: center;
        margin-top: 1.5rem;
        /* border: 0px; */
        outline: none;
        display: block;
    }

    .circle {
        position: relative;
        z-index: 2;
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 50%;
        border: 1px solid #7ED321;
        box-sizing: border-box;
        background: radial-gradient(#7ED321 50%, #7ED321 50%);
        white-space: nowrap;
    }

    .wrapicon {
        position: relative;
        margin: 1rem auto 0.8rem;
        display: flex;
        width: 80%;
        justify-content: space-between;
    }

    .wrapicon:before {
        position: absolute;
        top: 50%;
        left: 0;
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #7ED321;
    }

    .circle span {
        position: absolute;
        left: -0.5rem;
        top: 0.5rem;
        font-size: .4rem;
    }
</style>
