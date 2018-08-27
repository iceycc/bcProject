<template>
    <div class="warp">
        <app-bar title="信息填写"></app-bar>
        <section class="wrapicon">
            <section class="circle">
                <span class="line1">
                    <img :src='stepImg' alt="">
                </span>
                <span>开户信息验证</span>
            </section>
            <section class="circle">
                 <span class="line2 hui">
                    <img :src='stepImg2' alt="">
                </span>
                <span>绑定银行卡</span>
            </section>

            <section class="circle">
                 <span class="line3 hui">
                    <img :src='stepImg3' alt="">
                </span>
                <span>设置密码</span>
            </section>
        </section>


        <div class="opening_box">
            <section>
                <span>姓名</span>
                <input type="text" name="text1" placeholder=" 请输入您的姓名" v-model="data.USER_NAME">
            </section>
            <section>
                <span> 身份证号</span>
                <input type="text" name="text1" placeholder="请输入15-18位身份证号" v-model="data.USER_CARD_ID">
            </section>
            <section>
                <span>职业</span>
                <js-select class="selectStyle" :text="work" :options="job" @getValue="getWork"></js-select>
            </section>
            <section>
                <span>学历</span>
                <js-select class="selectStyle" :text="educationText" :options="education"
                           @getValue="getEduction"></js-select>
                <!--<select name="" id="" v-model="data.USER_EDUCATION">-->
                <!--<option :value="item.value" v-for="item,index in education" :key="index">{{item.name}}</option>-->

                <!--</select>-->
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
    import {util} from "../../common/utils/util";
    import {PageName, BusName} from "../../Constant";
    import {API} from "../../request/api";
    import Bus from "../../common/js/bus"
    import JsSelect from '../../components/commons/JsSelect'

    export default {
        data() {
            return {
                imgStyle1: 'width:50%',
                imgStyle2: 'width:50%',
                stepImg: require('../../images/img/account_icon_green2@2x.png'),
                stepImg2: require('../../images/img/step2@2x.png'),
                stepImg3: require('../../images/img/step3.png'),
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
                    {name: '科、教、工、贸等专业技术人员', value: '1'},
                    {name: '批发、零售业服务人员', value: '2'},
                    {name: '交通运输、仓储、邮政业服务人员', value: '3'},
                    {name: '信息传输、软件和信息技术服务人员', value: '4'},
                    {name: '水利、环境和公共设施管理服务人员', value: '5'},
                    {name: '电力、燃气及水供应服务人员', value: '6'},
                    {name: '文化、体育和娱乐服务人员', value: '7'},
                    {name: '旅游、餐饮、住宿服务人员', value: '8'},
                    {name: '金融服务人员', value: '9'},
                    {name: '房地产、物业、建筑、装修服务人员', value: '10'},
                    {name: '居民生活服务人员', value: '11'},
                    {name: '军人、警察、安全、消防人员', value: '12'},
                    {name: '农林牧渔业生产及辅助人员', value: '13'},
                    {name: '学生', value: '14'},
                    {name: '退休人员', value: '15'},
                    {name: '不便分类劳动者', value: '16'},
                ],
                education: [
                    {name: '研究生', value: '0'},
                    {name: '大学本科究生', value: '20'},
                    {name: '大学专科或专科学校', value: '30'},
                    {name: '中等专业学校或中等技术学校', value: '40'},
                    {name: '技术学校', value: '50'},
                    {name: '高中', value: '60'},
                    {name: '初中', value: '70'},
                    {name: '小学', value: '80'},
                    {name: '文盲或半文盲', value: '90'},
                    {name: '未知', value: '99'},
                ],
                educationText: '请选择学历',
                work: '请选择职业'
            }
        },
        components: {
            JsSelect
        },
        created() {

            // this.picToBase64(this.picZheng,(data)=> {
            //     this.data.CARD_FRONT_FILE = data
            // })
            // this.picToBase64(this.picFan,(data)=> {
            //     this.data.CARD_BACK_FILE = data
            // })

        },
        methods: {
            getEduction(val) {
                this.educationText = val.name
                this.data.USER_EDUCATION = val.value
            },
            getWork(val) {
                this.work = val.name
                this.data.USER_DUTY = val.value

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
                API.watch.watchApi({
                    FUNCTION_ID: 'ptb0A003', // 点位
                    REMARK_DATA: '异业合作-开户-开户信息验证', // 中文备注
                })
                let data = this.data
                let msg
                // 校验

                if(msg = util.Check.name(data.USER_NAME)) return Bus.$emit(BusName.showToast, msg)
                if(msg = util.Check.idNumber(data.USER_CARD_ID)) return Bus.$emit(BusName.showToast, msg)

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
                        name: PageName.opening2,
                        params:{
                            data:this.data
                        }
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
                    let REQ_SERIAL = res.REQ_SERIAL
                    console.log('步数 >>>', step);
                    if (step == 0) {
                        // Bus.$emit(BusName.showToast,"欢迎注册")
                        fn && fn()
                    }
                    if (step == 1) {
                        // Bus.$emit(BusName.showToast,"第二步")
                        fn && fn()
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
                            name: PageName.login,
                            query:{
                                REQ_SERIAL:REQ_SERIAL
                            }
                        })
                    }

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

    .wrapicon {
        text-align: center;
        display: flex;
        position: relative;
        margin-bottom: .3rem;
        .circle {
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        .line1,.line2,.line3 {
            position: relative;
            img {
                width: .5rem;
            }
            &:after {
                display: block;
                position: absolute;
                top: 50%;
                right: 0;
                transform: translateY(-100%);
                content: '';
                width: 45%;
                background: #92d048;
                height: .1rem;
                overflow: hidden;

            }
        }
        .hui{
            &:after,&.line2:before{
                background: #dee1e3 !important;
            }

        }
        .line2 {
            &:after {
                left: 0;
                right: auto;
            }
            &:before {
                display: block;
                position: absolute;
                top: 50%;
                right: 0;
                transform: translateY(-100%);
                content: '';
                width: 45%;
                background: #92d048;
                height: .1rem;
                overflow: hidden;
            }
        }
        .line3 {
            &:after {
                left: 0;
                right: auto;
            }
        }

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

    .selectStyle {
        font-size: .4rem;
    }
</style>
