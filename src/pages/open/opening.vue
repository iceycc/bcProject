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
                <span>姓名</span>
                <input type="text" name="text1" placeholder=" 请输入您的姓名" v-model="data.USER_NAME">
            </p>
            <p>
                <span> 身份证号</span>
                <input type="number" name="text1" placeholder="请输入18位身份证号" v-model="data.USER_CARD_ID">
            </p>
            <p>
                <span>职业</span>
                <input type="text" name="text1" placeholder="请选择职业" v-model="data.USER_DUTY">
            </p>
            <p>
                <span>学历</span>
                <input type="number" name="text1" placeholder="请选择学历" v-model="data.USER_EDUCATION">
            </p>
            <div class="photo">
                <div class="cameraphoto">
                    <div style="text-align: center;">身份证人像页照</div>
                    <div class="cameraphotoimg">
                        <img :src="preSrc1" :style="imgStyle1" alt="">
                        <input type="file" class="pic1"  @change="uploadChangeZheng($event)">
                    </div>
                </div>
                <div class="cameraphoto">
                    <div style="text-align: center;">身份证国徽页照</div>
                    <div class="cameraphotoimg">
                        <img :src="preSrc2" :style="imgStyle2" alt="">
                        <input type="file" class="pic2" @change="uploadChangeFan($event)">
                    </div>
                </div>
            </div>
        </div>
        <div class="IDphoto">
            <div class="IDphotoPositive"></div>
            <div class="IDphotoback"></div>
        </div>
        <img :src="test1" alt="">
        <img :src="test2" alt="">
        <button class="tijiao" @click="doNext">下一步</button>
        <p class="bang">我已阅读并同意注册<strong style=" color:#0096FE;">《用户授权服务协议》《晋商银行直销银行电子账户服务协议》</strong></p>
    </div>
</template>
<script>
    let Base64 = require('js-base64').Base64;
    import {util} from "../../common/utils/util";
    import {PageName,BusName} from "../../Constant";
    import { API } from "../../request/api";
    import Bus from "../../common/js/bus"

    export default {
        data() {
            return {
                imgStyle1:'width:50%',
                imgStyle2:'width:50%',
                test1:'',
                test2:'',
                data: {// 姓名 身份证 职业 学历 身份证正反面
                    USER_NAME: '王冰洋',
                    USER_CARD_ID: '372330199206150014',// 身份证号码  612601198509174013
                    USER_DUTY: '0', // 职业
                    USER_EDUCATION: '0', // 学历
                    CARD_FRONT_FILE: '',
                    CARD_BACK_FILE: '',
                },
                preSrc1:require('../../images/img/cameracopy@2x.png'),
                preSrc2:require('../../images/img/cameracopy@2x.png'),
                picZheng: require('../../images/id-zheng.jpg'),
                picFan: require('../../images/id-fan.jpg'),

            }
        },
        components: {},
        created() {
            // this.getInfos()
            // this.picToBase64(this.picZheng,(data)=> {
            //     this.data.CARD_FRONT_FILE = data
            // })
            // this.picToBase64(this.picFan,(data)=> {
            //     this.data.CARD_BACK_FILE = data
            // })

        },
        methods: {
            getInfos(){
                API.open.doApiRegisterBackShow({},res=>{
                    console.log('步数 >>>',res.LAST_STEP_NUM);
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
                        // Bus.$emit(BusName.showToast,"第三步")

                        this.$router.push({
                            name:PageName.opening3
                        })
                        return
                    }
                    if(res.LAST_STEP_NUM == 3){
                        Bus.$emit(BusName.showToast,"您已经开户成功")

                        this.$router.push({
                            name:PageName.opening3
                        })
                    }
                    Bus.$emit(BusName.showToast,"状态异常")

                },err=>{
                    console.log(err);
                })
            },
            uploadChangeZheng(e) {
                var newsrc = this.getObjectURL(e.target.files[0]);
                console.log(newsrc);
                
                this.preSrc1 = newsrc
                this.imgStyle1 = 'width:100%'
                util.imgScale(newsrc,e.target.files[0],4).then((data) => {
                    this.test1 = data
                    console.log(encodeURI(this.test1))
                    this.data.CARD_FRONT_FILE = data.split(',')[1]
                    
                    // console.log(this.data.CARD_FRONT_FILE);
                    // 扫描身份证 正面
                    let params ={
                        idcardFrontPhoto:this.formatString(this.data.CARD_FRONT_FILE)
                    }
                    API.open.apiIdCardFrontPhoneOcr(params,res=>{
                    })

                })
            },
           
            uploadChangeFan(e) {
                var newsrc = this.getObjectURL(e.target.files[0]);
                this.preSrc2 = newsrc
                this.imgStyle2 = 'width:100%'

                util.imgScale(newsrc,e.target.files[0],3).then((data) => {
                    this.data.CARD_BACK_FILE = data.split(',')[1]
                })
            },
            doNext() {
                this.$router.push({
                    name: PageName.opening2,
                    params: {
                        data: this.data
                    }
                })
            },


            //建立一個可存取到該file的url
            getObjectURL(file) {
                var url = null;
                // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
                if (window.createObjectURL != undefined) { // basic
                    url = window.createObjectURL(file);
                } else if (window.URL != undefined) { // mozilla(firefox)
                    url = window.URL.createObjectURL(file);
                } else if (window.webkitURL != undefined) { // webkit or chrome
                    url = window.webkitURL.createObjectURL(file);
                }
                return url;
            }

        }

    }
</script>

<style lang="scss" scoped>
    body {
        font-size: .3rem;
    }

    .warp {
        width: 100%;
        position: relative;
    }

    .opening_box p {
        margin-left: 0.6rem;
        background-repeat: no-repeat;
        background-color: #fff;
        line-height: 1rem;
        width: 90%;
        background-size: 0.7rem 0.7rem;
        background-position: .2rem .2rem;
        border-bottom: 1px #E5E5E5 solid;
    }

    .opening_box p span {
        font-family: PingFangSC-Regular;
        color: #444444;
        font-size: .4rem;
        display: inline-block;
        width: 2rem;
    }

    .opening_box p .limit {
        color: #0096FE;
        font-family: PingFangSC-Regular;
    }

    .opening_box p .getpassword {
        display: inline-block;
        text-align: center;
        line-height: 1.5rem;
        font-size: 0.2rem;
        width: 2rem;
        height: 1rem;
        border: 1px solid #2B74FE;
        color: #2B74FE;
        /* border-radius:6px; */
    }

    .opening_box .photo {
        margin-left: 0.6rem;
        background-repeat: no-repeat;
        background-color: #fff;
        line-height: 1rem;
        width: 90%;
        background-size: 0.7rem 0.7rem;
        background-position: .2rem .2rem;
        border-bottom: 1px #E5E5E5 solid;
    }

    .cameraphoto {
        display: inline-block;
        padding-left: 6%;
    }

    .cameraphotoimg {
        text-align: center;
        line-height: 130px;
        margin-bottom: 10px;
        width: 130px;
        height: 100px;
        border: 1px dotted #eaeaea;
    }

    .opening_box input {
        width: 50%;
        border: none;
        box-sizing: border-box;
        font-size: 14px; /*px*/
        color: #333;
        line-height: 40px;
        outline: none;
    }

    .tijiao {
        font-size: 16px;
        color: #fff;
        background-color: #508CEE;
        border-radius: 0.1rem;
        line-height: 1rem;
        width: 70%;
        margin: 0 auto;
        text-align: center;
        margin-top: 2rem;
        border: 0rem;
        outline: none;
        display: block;
    }

    .Tips {
        margin-top: 0.8rem;
        background-color: #FF5B05;
        width: 60%;
    }

    .bang {
        margin-top: 0.5rem;
        padding-right: 0.3rem;
        background-image: url(../../images/img/agree@3x.png);
        font-size: 0.35rem;
        color: #808080;
        background-repeat: no-repeat;
        background-size: 0.4rem 0.4rem;
        padding: 0 0.8rem;
        background-position: 0.2rem 0.05rem;
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
