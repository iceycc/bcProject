<template>
  <div id="app" class="app">
    <app-bar title="风险评测"></app-bar>
    <div class="chattuimg">
      <img src="@/assets/images/account_illustrations@2x.png" style="width:70%" alt="">
    </div>
    <div class="fenxiancontent">
      <div class="fenxiantitle">
        <p class="info">您的风险测评结果为</p>
        <p class="code">{{RISK_TOLERANCE_SCORE}}分 {{RISK_LEVEL|RISK_TOLERANCE_LEVEL_Filter}} </p>
      </div>
      <p>{{RISK_LEV_EXPLAIN}}</p>
    </div>
    <div class="btn">
      <button @click="reCheck" class="begain" style="display: inline-block;">重新测评</button>
      <button @click="goNext" class="begain" style="display: inline-block;">完成</button>
    </div>

  </div>
</template>
<script>
  import {PageName} from "@/Constant";
  import Mixins from '@/mixins'

  export default {
    data() {
      return {
        RISK_TOLERANCE_DESC: '',
        RISK_LEV_EXPLAIN: '',
        RISK_TOLERANCE_SCORE: '',
        target: '',
      }
    },
    mixins: [Mixins.redirectByFromPage],
    created() {
      this.setComState({type: 'HAS_GRADE', value: '0'})
      let data = this.getComState.RiskResult
      console.log(data);
      this.RISK_LEVEL = data.RISK_LEVEL
      // 20分以下:保守型,1级; 21~44   稳健型 2级 46~70  平衡性3级 71~85   成长性 4级 86分以上进取型  5级
      this.RISK_LEV_EXPLAIN = data.DESC2 //
      this.RISK_TOLERANCE_SCORE = data.RISK_SCORE //  分数
    },
    filters: {
      RISK_TOLERANCE_LEVEL_Filter(val) {
        switch (val) {
          case '1':
            return '保守型'
            break;

          case '2':
            return '稳健型'
            break;

          case '3':
            return '平衡性'
            break;

          case '4':
            return '成长性'
            break;

          case '5':
            return '进取型'
            break;
        }
      }
    },
    methods: {
      reCheck() {
        this.$router.push({
          name: PageName.Riskproblom
        })
      },
      goNext() {
        // 跳转到购买
        try {
          this.redirectByFromPage()
        } catch (e) {
          this.$router.push({
            name: PageName.ProductList
          })
        }
      }
    }

  }
</script>

<style lang="scss" scoped>


  .app {
    width: 100%;
    margin: 0 auto;
  }

  .chattuimg {
    margin-top: px2rem(40);
    text-align: center
  }

  .fenxiancontent {
    font-size: 0.4rem;
    color: #333;
    margin-top: px2rem(40);
    padding: 0 1rem;

    .fenxiantitle {
      text-align: center;

      .info {
        font-size: px2rem(18);
      }

      .code {
        font-size: px2rem(38);
        color: #7396e4;
        margin-bottom: px2rem(30);
      }
    }
  }

  .btn {
    display: flex;
    padding: 0 px2rem(25);
    margin-top: px2rem(40);

    .begain {
      flex: 1;
      text-align: center;
      font-size: px2rem(18);
      color: #fff;
      background-color: #7396e4;
      border-radius: px2rem(6);
      width: px2rem(140);
      height: px2rem(40);
      border: none;
      outline: none;
      margin: 0 px2rem(10);
    }
  }


</style>
