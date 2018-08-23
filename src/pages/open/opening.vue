<template>
    <div class="warp">
        <app-bar title="信息填写"></app-bar>
        <div class="wrapicon">
            <div class="circle red"><span>开户信息验证</span></div>
            <div class="circle"><span>绑定银行卡</span></div>
            <div class="circle"><span>设置密码</span></div>
        </div>
        <div class="opening_box">
            <section>
                <span>姓名</span>
                <input type="text" name="text1" placeholder=" 请输入您的姓名" v-model="data.USER_NAME">
            </section>
            <section>
                <span> 身份证号</span>
                <input type="number" name="text1" placeholder="请输入18位身份证号" v-model="data.USER_CARD_ID">
            </section>
            <section>
                <span>职业</span>
                <select name="" v-model="data.USER_DUTY">
                    <option :value="item.value" v-for="item,index in job" :key="index">{{item.name}}</option>
                </select>
            </section>
            <section>
                <span>学历</span>
                <select name="" id="" v-model="data.USER_EDUCATION">
                    <option :value="item.value" v-for="item,index in education" :key="index">{{item.name}}</option>

                </select>
                <!--<input type="number" name="text1" placeholder="请选择学历" v-model="data.USER_EDUCATION">-->
            </section>
            <div class="photo">
                <div class="cameraphoto">
                    <div style="text-align: center;">身份证人像页照</div>
                    <div class="cameraphotoimg">
                        <img :src="preSrc1" :style="imgStyle1" alt="" class="vatal">
                        <input type="file" class="inputBox" @change="uploadChangeZheng($event)">
                    </div>
                </div>
                <div class="cameraphoto">
                    <div style="text-align: center;">身份证国徽页照</div>
                    <div class="cameraphotoimg">
                        <img :src="preSrc2" :style="imgStyle2" alt="" class="vatal">
                        <input type="file" class="inputBox" @change="uploadChangeFan($event)">
                    </div>
                </div>
            </div>
        </div>
        <div class="IDphoto">
            <div class="IDphotoPositive"></div>
            <div class="IDphotoback"></div>
        </div>
        <button class="tijiao" @click="doNext">下一步</button>
        <p class="bang">我已阅读并同意注册<strong style=" color:#0096FE;">《用户授权服务协议》《晋商银行直销银行电子账户服务协议》</strong></p>
    </div>
</template>
<script>
    let Base64 = require('js-base64').Base64;
    import {util} from "../../common/utils/util";
    import {PageName, BusName} from "../../Constant";
    import {API} from "../../request/api";
    import Bus from "../../common/js/bus"

    export default {
        data() {
            return {
                imgStyle1: 'width:50%',
                imgStyle2: 'width:50%',
                test1: '',
                test2: '',
                data: {// 姓名 身份证 职业 学历 身份证正反面
                    USER_NAME: '',
                    USER_CARD_ID: '',// 身份证号码  612601198509174013
                    USER_DUTY: '0', // 职业
                    USER_EDUCATION: '0', // 学历
                    CARD_FRONT_FILE: '',
                    CARD_BACK_FILE: '',
                    memberId: null,
                    phoneNum: null
                },
                preSrc1: require('../../images/img/cameracopy@2x.png'),
                preSrc2: require('../../images/img/cameracopy@2x.png'),
                picZheng: require('../../images/id-zheng.jpg'),
                picFan: require('../../images/id-fan.jpg'),
                job: [
                    {name: '国家机关、社会组织、企事业单位负责人', value: '0'},
                    {name: '科、教、工、贸等专业技术人员', value: '0'},
                    {name: '批发、零售业服务人员', value: '0'},
                    {name: '交通运输、仓储、邮政业服务人员', value: '0'},
                    {name: '信息传输、软件和信息技术服务人员', value: '0'},
                    {name: '电力、燃气及水供应服务人员', value: '0'},
                    {name: '文化、体育和娱乐服务人员', value: '0'},
                    {name: '旅游、餐饮、住宿服务人员', value: '0'},
                    {name: '金融服务人员', value: '0'},
                    {name: '房地产、物业、建筑、装修服务人员', value: '0'},
                    {name: '居民生活服务人员', value: '0'},
                    {name: '农林牧渔业生产及辅助人员', value: '0'},
                    {name: '学生', value: '0'},
                    {name: '退休人员', value: '0'},
                    {name: '不便分类劳动者', value: '0'},
                ],
                education: [
                    {name: '研究生', value: '0'},
                    {name: '大学本科究生', value: '0'},
                    {name: '大学专科或专科学校', value: '0'},
                    {name: '中等专业学校或中等技术学校', value: '0'},
                    {name: '技术学校', value: '0'},
                    {name: '高中', value: '0'},
                    {name: '初中', value: '0'},
                    {name: '小学', value: '0'},
                    {name: '文盲或半文盲', value: '0'},
                    {name: '未知', value: '0'},
                ]
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
            getInfos() {
                API.open.doApiRegisterBackShow({}, res => {
                    console.log('步数 >>>', res.LAST_STEP_NUM);
                    if (res.LAST_STEP_NUM == 0) {
                        // Bus.$emit(BusName.showToast,"欢迎注册")
                        return
                    }
                    if (res.LAST_STEP_NUM == 1) {
                        // Bus.$emit(BusName.showToast,"第二步")
                        this.$router.push({
                            name: PageName.opening2
                        })
                        return
                    }
                    if (res.LAST_STEP_NUM == 2) {
                        // Bus.$emit(BusName.showToast,"第三步")

                        this.$router.push({
                            name: PageName.opening3
                        })
                        return
                    }
                    if (res.LAST_STEP_NUM == 3) {
                        Bus.$emit(BusName.showToast, "您已经开户成功")

                        this.$router.push({
                            name: PageName.opening3
                        })
                    }
                    Bus.$emit(BusName.showToast, "状态异常")

                }, err => {
                    console.log(err);
                })
            },
            uploadChangeZheng(e) {
                var newsrc = this.getObjectURL(e.target.files[0]);
                console.log(newsrc);

                this.preSrc1 = newsrc
                this.imgStyle1 = 'width:100%'
                util.imgScale(newsrc, e.target.files[0], 4).then((data) => {
                    this.test1 = data
                    console.log(encodeURI(this.test1))
                    this.data.CARD_FRONT_FILE = data.split(',')[1].replace(/\+/g, '%2B')

                    // console.log(this.data.CARD_FRONT_FILE);
                    // 扫描身份证 正面
                    let params = {
                        idcardFrontPhoto: this.data.CARD_FRONT_FILE,
                        memberId: this.data.memberId,
                        phoneNum: this.data.phoneNum
                    }
                    API.open.apiIdCardFrontPhoneOcr(params, res => {
                        this.data.memberId = res.memberId
                        this.data.phoneNum = res.phoneNum

                        this.data.USER_NAME = res.idName
                        this.data.USER_CARD_ID = res.idNumber

                        this.checkID()
                    })

                })
            },
            uploadChangeFan(e) { //反
                var newsrc = this.getObjectURL(e.target.files[0]);
                this.preSrc2 = newsrc
                this.imgStyle2 = 'width:100%'

                util.imgScale(newsrc, e.target.files[0], 3).then((data) => {
                    this.data.CARD_BACK_FILE = data.split(',')[1].replace(/\+/g, '%2B')

                    let params = {
                        idcardBackPhoto: this.data.CARD_BACK_FILE,
                        memberId: this.data.memberId,
                        phoneNum: this.data.phoneNum
                    }
                    API.open.apiIdCardBackPhoneOcr(params, res => {
                        this.data.memberId = res.memberId
                        this.data.phoneNum = res.phoneNum
                    })
                })
            },
            doNext() {
                let data = this.data
                // 校验
                if (data.USER_NAME == '') {
                    Bus.$emit(BusName.showToast, '姓名不能为空')
                    return
                }
                if (data.USER_CARD_ID == '') {
                    Bus.$emit(BusName.showToast, '身份证号码不能为空')
                    return
                }
                if (data.USER_DUTY == '') {
                    Bus.$emit(BusName.showToast, '请选择职业')
                    return
                }
                if (data.USER_EDUCATION == '') {
                    Bus.$emit(BusName.showToast, '请选择职业')
                    return
                }
                if (data.CARD_FRONT_FILE == '') {
                    Bus.$emit(BusName.showToast, '身份证正面未成功上传')
                    return
                }
                if (data.CARD_BACK_FILE == '') {
                    Bus.$emit(BusName.showToast, '身份证反面未成功上传')
                    return
                }

                this.checkID(() => {
                    this.$router.push({
                        name: PageName.opening2
                    })
                })
            },

            checkID(fn) {
                // 回显
                let getStepDatas = {
                    ID_NUMBER: this.data.USER_CARD_ID
                }

                API.open.apiGetUserLastCompleteStep(getStepDatas, res => {
                    let step = res.LAST_STEP_NUM
                    console.log('步数 >>>', step);
                    if (step == 0) {
                        // Bus.$emit(BusName.showToast,"欢迎注册")

                    }
                    if (step == 1) {
                        // Bus.$emit(BusName.showToast,"第二步")

                    }
                    if (step == 2) {
                        Bus.$emit(BusName.showToast, "您已经实名成功")
                        setTimeout(() => {
                            this.$router.push({
                                name: PageName.opening3,
                                params: {step}
                            })
                        }, 600)
                    }
                    if (step == 3) {
                        Bus.$emit(BusName.showToast, "您已经开户成功")

                        this.$router.push({
                            name: PageName.login
                        })
                    }
                    fn && fn()
                }, err => {
                    console.log(err);
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

    .opening_box section {
        display: flex;
        margin-left: 0.6rem;
        background-repeat: no-repeat;
        background-color: #fff;
        line-height: 1rem;
        width: 90%;
        background-size: 0.7rem 0.7rem;
        background-position: .2rem .2rem;
        border-bottom: 1px #E5E5E5 solid;
    }

    .opening_box section {
        input, select {
            border: none;
            box-sizing: border-box;
            font-size: 14px; /*px*/
            color: #333;
            outline: none;
            background: #fff;
            height: 1rem;
        }

    }

    .opening_box section span {
        font-family: PingFangSC-Regular;
        color: #444444;
        font-size: .4rem;
        display: inline-block;
        width: 2rem;
    }

    .opening_box section .limit {
        color: #0096FE;
        font-family: PingFangSC-Regular;
    }

    .opening_box section .getpassword {
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
        display: flex;
    }

    .cameraphoto {
        flex: 1;
        padding-left: 6%;
    }

    .cameraphotoimg {
        position: relative;
        text-align: center;
        line-height: 130px;
        margin-bottom: 10px;
        width: 130px;
        height: 100px;
        border: 1px dotted #eaeaea;
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
        .red {
            border: 1px solid red;
            background: radial-gradient(red 50%, red 50%);
        }
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

    .inputBox {
        position: absolute;
        left: 0;
        top: 0;
        display: inline-block;
        width: 100%;
        height: 100%;
        opacity: 0;
        vertical-align: middle;

    }

    .xueli {

    }
</style>
