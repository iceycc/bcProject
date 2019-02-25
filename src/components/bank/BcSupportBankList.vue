<template>
  <div class="jsSelect">
    <section class="select-box">
      <i class="close" @click="close"><img :src="closeImg" alt=""></i>
      <p class="title">{{title}}</p>
      <section class="scroll-view">
        <section :id="key" class="bank-class" v-for="bankIndex,key,index in IndexObj" :key="index">
          <!--<p class="bank-index">{{key}}</p>-->
          <ul class="select">
            <li
              @click="select(item.name,item)"
              :class="{'option':true,'active':item.name==selectValue}"
              v-for="item,index in bankIndex"
              :key="index">
              <!--<img :src="item.src" alt="" class="banklogo">-->
              <span class="text">{{item.name}}</span>
            </li>
          </ul>
        </section>
      </section>
      <!--<section class="right-index">-->
      <!--<span class="letter" @click="toBank(item)" v-for="item,index in indexArr"-->
      <!--:key="index"> {{item}}</span>-->
      <!--</section>-->
    </section>
  </div>
</template>

<script>
  import {imgSrc} from "@/Constant";

  const Letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  export default {
    name: "BcSupportBankList",
    data() {
      return {
        indexArr: Letter,
        closeImg: require('@/assets/images/icon_ask_close.svg'),
      }
    },
    props: {
      selectValue: null,
      title: {
        type: null,
        default: '选择银行卡'
      },
      supportBankList: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    created() {

    },
    computed: {
      IndexObj() {
        let bankList = this.supportBankList.map((item) => {
          // 新接口参数采用了驼峰命名
          return {
            name: item.BANK_NAME || item.bankName,
            value: 0,
            src: imgSrc + (item.BANK_LOGO_URL || item.bankLogoUrl),
            Index: item.INITIAL || item.initial
          }
        })
        return this.filterOptions(bankList)
      }
    },
    methods: {
      toBank(val) {
        if (document.getElementById(val)) {
          document.getElementById(val).scrollIntoView()

        } else {
          Bus.$emit(BusName.showToast, `没有${val}开头的银行`)
        }
      },
      close() {
        this.$emit('close')
      },
      select(index, name) {
        this.bankText = name.name
        this.$emit('getValue', name)
      },
      /**
       * 将支持的银行列表转换成 按序号为键的对象
       * @param arr
       */
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
    }
  }
</script>

<style scoped lang="scss">
  .jsSelect {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(1, 1, 1, 0.3);
    box-sizing: border-box;
    z-index: 3;
    color: #333;
    padding: px2rem(104) px2rem(20) 0;

    .select-box {
      position: relative;
      border-radius: 10px;
      background: #fff;
      padding-top: px2rem(16);

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
        /*border-bottom: 1px solid #dedede;*/
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
        position: relative;
        border-bottom: 1px solid #dedede;
        font-size: 0;
        line-height: px2rem(44);
        height: px2rem(44);

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

      .active:after {
        content: '';
        position: absolute;
        top: px2rem(10);
        right: px2rem(10);
        z-index: 10;
        width: px2rem(18);
        height: px2rem(18);
        background: url("~@/assets/images/check.png") center center no-repeat;
      }

      .close {
        font-style: normal;
        position: absolute;
        top: px2rem(10);
        right: px2rem(20);
        /*font-weight: bold;*/
        color: #ccc;
        font-size: .6rem;
        width: px2rem(15);
        height: px2rem(15);

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .bank-class {
      padding: 0 px2rem(20);

      .bank-index {
        font-size: .4rem;
        line-height: 0;
        padding: px2rem(20) 0 px2rem(10);

      }
    }

  }

</style>
