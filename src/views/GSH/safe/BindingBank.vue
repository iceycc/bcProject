<template>
  <div>
    <app-bar title="绑定银行卡"></app-bar>
    <section class="card-list">
      <section class="bank-card" v-for="card,index in cardList" :key="index" @click="managerCard(card)">
        <img :src="imgSrc + card.cardBankImageUrl" alt="" class="bgimg">
        <!--<img  alt="" class="bgimg">-->
        <section class="top">
          <!--logo-->
          <img :src="imgSrc + card.cardBankUrl" alt="" class="logo">
          <section class="bank">
            <p class="bank-name">{{card.cardBankName}}</p>
            <!--<p class="bank-info">隶属于{{card.CARD_BANK_NAME}}</p>-->
          </section>
          <section v-if="card.defaultMark=='1'">
            默认卡
          </section>
        </section>
        <section class="card-no">
          <p>{{card.cardNum |formatBankNo}}</p>
        </section>
      </section>
    </section>
    <div class="add-card" @click="addBank">添加新银行卡</div>

    <div class="show-toatal" v-if="showToatal">
      <div class="msg">
        <p>最少需要绑定一张一类户银行卡</p>
        <button @click="showToatal=false">确定</button>
      </div>
    </div>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>

<script>
  import API from '@/service'
  import {imgSrc} from "@/Constant";
  import {Actionsheet} from 'mint-ui';
  import {BusName, PageName} from "@/Constant";
  export default {
    name: "BindingBank",
    data() {
      return {
        showToatal: false,
        onfocus: true,
        imgSrc,
        code: {},
        sheetVisible: false,
        cardList: [],
        BANK_USER_ID: '',
        BANK_ACCT_NO: '',
        MESSAGE_TOKEN: '',
        clickBankCard: {},
        BC_PHONE: '',
        msgCode: '',
        actions: [
          {
            name: '设为默认卡',
            method: this.setDefaultCard
          },
          {
            name: '解绑银行卡',
            method: this.unBindingCard
          }
        ]
      }
    },
    components:{
      [Actionsheet.name]:Actionsheet
    },
    created() {
      this.getBankList()
    },
    filters: {
      BC_PHONE_Filter(val) {
        if (!val) return val
        let len = val.length
        val = val.substr(len - 11, 3) + '****' + val.substr(len - 4)
        return val
      }
    },
    watch: {
      // sheetVisible(newVal){
      //   this.onfocus = newVal
      // },
      msgCode(newVal, oldVal) {
        newVal = newVal + ''
        if (newVal.length > 6) {
          this.msgCode = newVal.substr(0, 6)
          return
        }
        for (let i = 0; i <= 6; i++) {
          this.code[i] = newVal[i]
        }
        if (newVal.length == 6) {
          this.unBindingCard()
        }
      }
    },
    methods: {
      clickLabel() {
        console.log(111)
      },
      addBank() {
        this.$router.push({
          name: PageName.AddNewBank, query: {
            BANK_USER_ID: this.BANK_USER_ID,// 银行用户ID
            BANK_ACCT_NO: this.BANK_ACCT_NO,// 电子账户
          }
        })
      },
      // 点击弹出银行卡管理
      managerCard(card) {

        console.log(card);
        setTimeout(() => {
          this.onfocus = true
        }, 100)
        if (card.DEFAULT_MARK == 1) {
          // 默认卡
          this.actions = [
            {
              name: '解绑银行卡',
              method: this.unBindingCard
            }
          ]
        } else {
          this.actions = [
            {
              name: '设为默认卡',
              method: this.setDefaultCard
            },
            {
              name: '解绑银行卡',
              method: this.unBindingCard
            }
          ]
        }
        this.clickBankCard = card
        this.sheetVisible = true
      },
      async getBankList() {
        this.onfocus = false
        let res = await API.safe.apiBandCard({})
        this.BANK_USER_ID = res.BANK_USER_ID
        this.BANK_ACCT_NO = res.BANK_USER_CODE
        this.cardList = res.cardList
        // 保存绑定的银行卡列表
        this.setComState({type: 'hasCardList', value: res.cardList})
      },
      async setDefaultCard() {
        console.log(1)
        this.onfocus = false
        // 设置默认卡
        let data = {
          accountNo: this.clickBankCard.cardNum
        }
        await API.safe.apiDefaultBankCard(data)
        this.getBankList()

      },
      async unBindingCard() {
        console.log(2)
        let num = this.cardList.length
        if (num == 1) {
          setTimeout(() => {
            this.showToatal = true
          }, 400)
          // Bus.$emit(BusName.showToast, '最少需要绑定一张一类户银行卡')
          return
        }
        // 解绑 银行卡
        let card = this.clickBankCard
        console.log(card);
        let data = {
          bankName: card.cardBankName,//银行名称
          accountNo: card.cardNum,//银行账号
          bindFlg:'2', //
          bankCardPhone: card.bankCardPhone,//银行卡开户行手机号
        }
        try {
          await API.account.apiChangeBingCard(data)
          this.getBankList()
        } catch (e) {
        }
      },

    }
  }
</script>

<style scoped lang="scss">


  .card-list {
    padding-top: px2rem(30);
  }

  .bank-card {
    position: relative;
    margin: 0 auto px2rem(20);
    width: px2rem(342);
    height: px2rem(135);
    border-radius: px2rem(6);
    overflow: hidden;
    background: rgba(0, 0, 0, 0);
    /*background: linear-gradient(#FF8572, #FD5861); !* 标准的语法（必须放在最后） *!*/
    box-sizing: border-box;
    padding: px2rem(20);

    .bgimg {
      position: absolute;
      /*background: linear-gradient(#FF8572, #FD5861); !* 标准的语法（必须放在最后） *!*/
      background: #a3dbff;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }

    .top {
      position: relative;
      width: 100%;
      height: px2rem(50);
      display: flex;
      color: #fff;

      .logo {
        border-radius: 50%;
        border: px2rem(3) solid #fff;
        display: inline-block;
        margin-top: px2rem(4);
        width: px2rem(34);
        height: px2rem(34);
      }

      .bank {
        width: px2rem(190);
        padding-left: px2rem(10);
      }

      .bank-name {
        padding-top: px2rem(8);
        font-size: px2rem(18);
      }

      .bank-info {
        font-size: px2rem(12);
      }
    }

    .card-no {
      position: relative;
      width: 100%;
      box-sizing: border-box;
      padding-top: px2rem(20);

      p {
        font-size: px2rem(18);
        color: #fff;
        padding-left: px2rem(50);
      }
    }
  }

  .add-card {
    width: px2rem(255);
    height: px2rem(44);
    line-height: px2rem(44);
    text-align: center;
    background-color: #518BEE;
    color: #fff;
    font-size: px2rem(18);
    border-radius: px2rem(6);
    margin: px2rem(60) auto 0;
  }
  .show-toatal {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);

    .msg {
      position: absolute;
      box-sizing: border-box;
      padding: px2rem(20);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      width: px2rem(304);
      height: px2rem(106);
      background: rgba(255, 255, 255, 1);
      border-radius: px2rem(6);

      p {
        color: #333333;
        font-size: px2rem(16);
        margin-bottom: px2rem(20);
      }

      button {
        /*width: ;*/
        color: #508CEE;
        font-size: px2rem(17);
      }
    }
  }
</style>
