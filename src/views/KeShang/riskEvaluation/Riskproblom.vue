<template>
  <div id="app">
    <div class="app">
      <app-bar title="风险测评"></app-bar>
      <!--<pre>{{values}}</pre>-->
      <p class="probloms"> {{nowShow + 1}} / {{proNubmer}}</p>
      <section v-for="item,index in optionsArr" :key="index" class="select-box">
        <!--<transition name="fade">-->
        <section v-show="index === nowShow" class="select-box2">

          <section>

            <p class="que-title">{{item.questionNo +'、'+ item.subject}}</p>
            <section v-for="answer in item.riskOptionList" :key="answer.questionNo"
                     :class="{'radio-box':true,'select':answer.riskOption==values[item.questionNo]}"
            >
              <label
                :for="'qestion'+ item.questionNo +'-'+ answer.riskOption">{{answer.riskOption }}、{{ answer.subject}}</label>
              <input
                @click="selecthandle(answer.riskOption)"
                :id="'qestion'+ item.questionNo +'-'+ answer.riskOption" type="radio"
                :value="answer.riskOption" v-model="values[item.questionNo]"
              >
            </section>
          </section>

          <div style="display: flex">
            <button class="begain" v-if="index!=0" @click="goRre">上一题</button>
            <button class="begain" v-if="index==optionsArr.length-1" @click="submitHandle">提交
            </button>
          </div>
        </section>
        <!--</transition>-->
      </section>

    </div>

  </div>

</template>
<script>
  import API from "@/service";
  import Bus from '@/plugin/bus'
  import {BusName, PageName, LsName} from "@/Constant";
  import util from "libs/util";
  import Mixins from "@/mixins";


  const ProblomIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']
  const _NUM = 0

  export default {
    data() {
      return {
        nowShow: _NUM,
        proNubmer: 0,
        values: {},
        dataList: [],
        optionsArr: [],
        qusNum: '',
        flag: true,
        clickNum: 0,
        start: false,
        startNo: 0,
        PreclickBel: true,
        select: -1
      }
    },
    activated() {
      this.nowShow = _NUM
    },
    mixins:[''],
    filters: {
      optionFilter(val, index) {
        return val
        // return `${ProblomIndex[index - 1]}、${val}`
      }
    },
    created() {
      this.getProblom()

    },

    methods: {

      // debounce(fn, delay) {
      //     var last
      //     return function(){
      //         var ctx = this, args = arguments
      //         clearTimeout(last)
      //         last = setTimeout(function(){
      //             fn.apply(ctx, args)
      //         }, delay)
      //     }
      // },
      selecthandle(index) {

        this.select = index
        if (this.nowShow + 1 >= this.optionsArr.length) return
        // this.debounce(this.goNext(),800)
        this.goNext()
      },
      getProblom() {
        API.risk.apiGetRiskEvaPaper({}, (res) => {

          this.optionsArr = res
          this.proNubmer = res.length
        })
      },
      goRre() {
        this.nowShow--
        // this.values['-1'] = false
        // console.log(this.nowShow);
      },
      changeHandle(e) {
        console.log(e);
      },

      submitHandle() {
        console.log('提交')
        if (!this.values[this.optionsArr.length]) {
          Bus.$emit(BusName.showToast, "请选择")
          return
        }
        // 1_A,2_B,3_C
        console.log(this.values);
        let str = ""
        // for (var i) 
        for(var i in this.values){
          str += `${i}_${this.values[i]},`
        }
        let data = {
          ANSWER:str.substr(0,str.length-1)
        }
        console.log(data);
        API.risk.apiRiskEvalution(data, (res) => {
          this.setComState({type:'HAS_GRADE',value:2})
          this.$router.push({
            name: PageName.FengxianResult,
            query: res
          })
          // utilExpand.storage.local()
        })
        return
      },
      goNext() {
        console.log('goNext')
        this.Londing.open()
        setTimeout(() => {
          this.nowShow += 1
          this.Londing.close()
        }, 400)

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/px2rem";

  .app {
    width: 94%;
    padding: 0 px2rem(15);
    box-sizing: border-box;
  }

  .app .probloms {
    padding: px2rem(5) 0 px2rem(10);
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
    margin: px2rem(50) px2rem(20) 0;

  }

  .select-box2 {
    .que-title {
      font-size: px2rem(16);
      padding-bottom: px2rem(10);
      border-bottom: 1px solid #dedede;
    }
    .select {
      color: #4295f7;
      input[type='radio'] {
        background: #4295f7;
      }
    }
    .radio-box {
      display: flex;
      line-height: px2rem(15);
      margin: px2rem(20) 0;
      font-size: px2rem(14);
      label {
        color: #8e8e8e;
        flex: 1;
        line-height: 1.5;

      }
      input[type='radio'] {
        vertical-align: middle;
        display: inline-block;
        width: px2rem(15);
        height: px2rem(15);
        border: 1px solid #999;
        border-radius: 50%
      }

    }
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
