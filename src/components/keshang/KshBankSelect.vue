<template>
  <div>
    <section style="text-align:center;display: inline-block;width: 100%"
             :class="{'infoText':true,'activeTitle':titleSelect}">
      <span @click="showBankList">{{text}}</span>
      <span class="down" @click="bankShowHandle">
                <img @click.stop="showBankList" src="@/assets/images/GroupCopy14@2x.png" alt="">
        <img src="@/assets/images/problom2@2x.png" alt="">
        <span class="xiane">银行限额</span>
            </span>
    </section>
    <div class="jsSelect" v-show="show">
      <section class="select-box">
        <i class="close" @click="show=false"><img :src="closeImg" alt=""></i>
        <p class="title">{{title}}</p>
        <section class="scroll-view">
          <section :id="key" class="bank-class" v-for="bankIndex,key,index in IndexObj" :key="index">
            <p class="bank-index">{{key}}</p>
            <ul class="select">
              <li
                @click="select(item.name,item)"
                :class="{'option':true,'active':item.name==selectValue}"
                v-for="item,index in bankIndex"
                :key="index">
                <img :src="item.src" alt="" class="banklogo">
                <span class="text">{{item.name}}</span>
              </li>
            </ul>
          </section>
        </section>
        <section class="right-index">
                    <span class="letter" @click="toBank(item)" v-for="item,index in indexArr"
                          :key="index"> {{item}}</span>
        </section>
      </section>
    </div>
    <div class="bank-xiane" v-if="backShow">
      <img @click="backShow = false" class="close" src="@/assets/images/icon_ask_close.svg" alt="">
      <img src="@/assets/images/bank@2x.png" alt="">
    </div>
  </div>
</template>

<script>
  // const Letter = [A B C D E F G H I J K L M N O P Q R S T U V W X Y Z]
  import {BusName, LsName} from "@/Constant";
  import Bus from '@/plugin/bus'

  const Letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  export default {
    name: "BankSelect",
    props: {
      options: {
        type: Array,
        default: [{name: '请选择', value: '-1', src: ''}]
      },
      value: null,
      text: {
        type: null,
        default: '请选择银行'
      },
      title: null,
      canClick: {
        type: null,
        default: true
      }
    },
    watch: {
      // options(n,o){
      //     console.log('n');
      //     console.log(n);
      //     this.IndexObj = this.filterOptions(this.options)
      // }
      text(n, o) {
        this.titleSelect = true
        this.selectValue = n
      }
    },
    computed: {},
    activated() {
      // this.IndexObj = this.filterOptions(this.options)

    },
    data() {
      return {
        closeImg: require('@/assets/images/icon_ask_close.svg'),
        titleSelect: false,
        show: false,
        selectValue: 1,
        IndexObj: {},
        indexArr: Letter,
        backShow: false
      }
    },

    methods: {
      showBankList() {
        if (!this.canClick) {
          return
        }
        if (JSON.stringify(this.IndexObj) == '{}') {
          this.show = true
          this.IndexObj = this.filterOptions(this.options)
        } else {
          this.show = true
        }
      },
      filterOptions(arr) {
        let obj = {}
        arr.forEach(bank => {
          if (!obj[bank.Index]) {
            obj[bank.Index] = [bank]
          } else {
            obj[bank.Index].push(bank)
          }
        })
        return obj
      },
      select(index, name) {
        this.titleSelect = true
        this.show = false
        this.$emit('getValue', name)
        this.selectValue = index
      },
      toBank(val) {
        if (document.getElementById(val)) {
          document.getElementById(val).scrollIntoView()

        } else {
          Bus.$emit(BusName.showToast, `没有${val}开头的银行`)
        }
      },
      bankShowHandle() {
        this.backShow = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/px2rem";

  .jsSelect {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(1, 1, 1, 0.3);
    padding: 1rem 0.6rem;
    box-sizing: border-box;
    z-index: 5;
    color: #333
  }

  .infoText {
    position: relative;
    color: #dedede;
    font-size: .4rem;
    padding-right: px2rem(125);
    vertical-align: top;

    .xiane {
      display: inline-block;
      padding-top: px2rem(3);
      font-size: px2rem(13);
      vertical-align: middle;
    }

    .down {
      position: absolute;
      right: 0;
      top: 50%;
      color: #0096FE;
      transform: translateY(-50%);

      img {
        vertical-align: middle;
        width: px2rem(18);
        margin-right: px2rem(1);
      }

    }
  }

  .activeTitle {
    color: #333;
  }

  .bank-class {
    padding: 0 .5rem;

    .bank-index {
      font-size: .4rem;
      line-height: 0;
      padding: px2rem(20) 0 px2rem(10);

    }
  }

  .select-box {
    position: relative;
    border-radius: 10px;
    background: #fff;
    height: 90%;
    padding: .3rem 0 .6rem;

    .right-index {
      position: absolute;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      max-height: 91%;
      width: 1rem;
      right: .4rem;
      top: px2rem(45);
      text-align: center;

      &::-webkit-scrollbar {
        display: none;
      }

      .letter {
        color: #89afe6;
        display: block;
        font-size: px2rem(16);
        line-height: 1.4;
      }
    }

    .title {
      text-align: center;
      font-size: .5rem;
      margin: 0 px2rem(20);
      border-bottom: 1px solid #dedede;
    }

    .scroll-view {
      max-height: 90%;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .option {
      border-bottom: 1px solid #dedede;
      font-size: 0;

      .text {
        font-size: .4rem;
        vertical-align: middle;
        margin-left: .2rem;
      }

      .banklogo {
        width: .6rem;
        vertical-align: middle;
      }
    }

    .active {
      color: #5db0f9;
    }

    .close {
      font-style: normal;
      position: absolute;
      top: -0.1rem;
      right: .3rem;
      font-weight: bold;
      color: #ccc;
      font-size: .6rem;
      width: px2rem(20);
      height: px2rem(20);

      img {
        width: 100%;
        height: 100%;
      }

    }

  }

  .bank-xiane {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    width: px2rem(375);
    padding-top: px2rem(20);
    text-align: center;
    height: 100%;
    overflow-y: scroll;
    z-index: 5;

    img {
      width: px2rem(270);
    }

    .close {
      position: absolute;
      width: px2rem(25);
      height: px2rem(25);
      top: px2rem(22);
      right: px2rem(54);
    }
  }

</style>
