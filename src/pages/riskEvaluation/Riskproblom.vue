<template>
    <div id="app">
        <div class="app">
            <header class="header">
                <a class="return" href=""></a>
                <p>风险测评</p>
            </header>
            <p class="probloms"> {{nowShow + 1}} / {{proNubmer}}</p>
            <section v-for="item,index in optionsArr" :key="index">
                <!--<transition name="fade">-->
                    <section v-if="index === nowShow">
                        <mt-radio
                                align="right"
                                class="radio"
                                :title="item.questionNum +'、'+ item.questionContent"
                                v-model="values[item.questionNum]"
                                :options="item.options | optionsFilter">
                        </mt-radio>
                        <div style="display: flex">
                            <button class="begain" v-if="index!=0" @click="goRre">上一题</button>
                            <button class="begain" @click="goNext(item.questionNum)">提交</button>
                        </div>
                    </section>
                <!--</transition>-->
            </section>
        </div>

    </div>

</template>
<script>
    import {API} from "../../request/api";
    import Bus from '../../common/js/bus'
    import {BusName, PageName,LsName} from "../../Constant";
    import util from '../../common/utils/util'
    const ProblomIndex = ['A','B','C','D','E','F','G','H','I','J','K']


    export default {
        data() {
            return {
                nowShow: 0,
                proNubmer: 0,
                values: {},
                dataList: [],
                optionsArr: []
            }
        },
        filters: {
            optionsFilter(val) {
                return val.map(function (item, index) {
                    return {
                        label: `${ProblomIndex[index]}、${item.option}`,
                        value: item.optionNum
                    }
                })
            }
        },
        created() {
            this.getProblom()
        },
        methods: {
            getProblom() {
                API.risk.apiGetRiskTestQuest({}, (res) => {
                    this.optionsArr = res.QUEST_LIST
                    this.proNubmer = res.QUEST_LIST.length
                })
            },
            goRre(){
                this.nowShow--
            },
            goNext(num) {
                if (!this.values[num]) {
                    Bus.$emit(BusName.showToast, '其选择')
                    return
                }
                if (this.nowShow === this.proNubmer - 1) {
                    console.log('提交')
                    let ANSWER_LIST = []
                    for (var i in this.values) {
                        ANSWER_LIST.push({
                            questionNum: i,
                            optionNum: this.values[i]
                        })
                    }
                    let data = {
                        ANSWER_LIST
                    }
                    API.risk.apiRiskTestAnswer(data, (res) => {
                        util.storage.session.set(LsName.HAS_GRADE,2)
                        this.$router.push({
                            name: PageName.fengxianresult,
                            query: res
                        })
                        // util.storage.local()
                    })
                    return
                }
                    this.nowShow += 1

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/px2rem";
    .app {
        width: 94%;
        padding: 0 3%;
    }

    .app .probloms {
        text-align: center;
        color: #666666;
    }

    .app .problomtitle {
        font-size: 0.4rem;
        line-height: 1rem;
        height: 1rem;
        width: 100%;
        border-bottom: 1PX #E5E5E5 solid;
        color: #333;
    }

    .app .problomselect {
        font-size: 0.4rem;
        color: #666666;
        padding: 0.2rem 0;
    }

    .app .problomselect p {
        padding: 0.2rem 0;
    }

    .begain {
        font-size: 0.4rem;
        color: #fff;
        background-color: #0096FE;
        border-radius: 0.2rem;
        line-height: 1rem;
        width: 35%;
        text-align: center;
        flex: 1;
        margin:px2rem(50) px2rem(20) 0;

    }

    .radio {
        .mint-radio {

        }
        .mint-radio-core {
            color: red !important;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>
