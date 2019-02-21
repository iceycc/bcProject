<template>
  <ul class="pro-detail">
    <!-- 货币基金-->
    <template v-if="proType.PRD_TYPE_ID=='1'">
      <li class="pro-li"><span class="left">审核方式</span><span>{{productDetail.IS_INTERVIEW | IS_INTERVIEW_filter}}</span>
      </li>
      <li class="pro-li"><span class="left">锁定期</span><span>{{productDetail.INCRE_AMOUNT}}元</span></li>
    </template>
    <!--理财产品-->
    <template v-if="proType.PRD_TYPE_ID=='2'">
      <li class="pro-li"><span class="left">审核方式</span><span>{{productDetail.IS_INTERVIEW | IS_INTERVIEW_filter}}</span>
      </li>
      <li class="pro-li"><span class="left">起购金额</span><span>{{productDetail.TXT_MIN_AMOUNT}}</span></li>
      <li class="pro-li"><span class="left">递增金额</span><span>{{productDetail.INCRE_AMOUNT}}元</span></li>
      <li class="pro-li"><span class="left">产品类型</span><span>{{productDetail.DEPOSIT_CATEGORY}}</span></li>
      <li class="pro-li"><span class="left">剩余额度</span><span>{{productDetail.REMAIN_AMT}}</span></li>
    </template>
    <!--纯债-->
    <template v-if="proType.PRD_TYPE_ID=='3'">
      <li class="pro-li"><span class="left">起存金额</span><span>{{productDetail.MIN_AMOUNT}}元</span></li>
      <li class="pro-li"><span class="left">递增金额</span><span>{{productDetail.INCRE_AMOUNT}}元</span></li>
      <li class="pro-li"><span class="left">支取时间</span><span>随时支取</span></li>
      <li class="pro-li"><span class="left">产品类型</span><span>{{productDetail.PRD_TYPE_ID | PRD_TYPE_ID_FILTER(productDetail.DEPOSIT_TYPE_ID)}}</span>
      </li>
    </template>
    <!--活期-->
    <template v-if="proType.PRD_TYPE_ID=='4'&&proType.DEPOSIT_TYPE_ID=='1'">
      <li class="pro-li"><span class="left">起存金额</span><span>{{productDetail.MIN_AMOUNT}}元</span></li>
      <li class="pro-li"><span class="left">递增金额</span><span>{{productDetail.INCRE_AMOUNT}}元</span></li>
      <li class="pro-li"><span class="left">支取时间</span><span>随时支取</span></li>
      <li class="pro-li"><span class="left">产品类型</span><span>{{productDetail.PRD_TYPE_ID |PRD_TYPE_ID_FILTER(productDetail.DEPOSIT_TYPE_ID)}}</span>
      </li>
    </template>
    <!--智能-->
    <template v-if="proType.PRD_TYPE_ID=='4'&&proType.DEPOSIT_TYPE_ID=='2'">
      <li class="pro-li"><span class="left">起存金额</span><span>{{productDetail.MIN_AMOUNT}}元</span></li>
      <li class="pro-li"><span class="left">递增金额</span><span>{{productDetail.INCRE_AMOUNT}}元</span></li>
      <li class="pro-li"><span class="left">支取时间</span><span>随时支取</span></li>
      <li class="pro-li"><span class="left">产品类型</span><span>智能存款</span></li>
    </template>
    <!--结构性-->
    <template v-if="proType.PRD_TYPE_ID=='4'&&proType.DEPOSIT_TYPE_ID=='3'">
      <li class="pro-li"><span class="left">起存金额</span><span>{{productDetail.MIN_AMOUNT}}元</span></li>
      <li class="pro-li"><span class="left">递增金额</span><span>{{productDetail.INCRE_AMOUNT}}元</span></li>
      <li class="pro-li"><span class="left">支取时间</span><span>{{productDetail.DRAW_TIME_TEXT}}</span></li>
      <li class="pro-li"><span class="left">产品类型</span><span>{{productDetail.DEPOSIT_CATEGORY}}</span></li>
      <li class="pro-li" v-if="productDetail.LOCKUP_PERIOD"><span class="left">锁定期</span><span>{{productDetail.LOCKUP_PERIOD}}</span>
      </li>
    </template>
    <!--定期-->
    <template v-if="proType.PRD_TYPE_ID=='4'&&proType.DEPOSIT_TYPE_ID=='4'">
      <li class="pro-li"><span class="left">起存金额</span><span>{{productDetail.MIN_AMOUNT}}元</span></li>
      <li class="pro-li"><span class="left">递增金额</span><span>{{productDetail.INCRE_AMOUNT}}元</span></li>
      <li class="pro-li"><span class="left">支取时间</span><span>{{productDetail.DRAW_TIME_TEXT}}</span></li>
      <li class="pro-li"><span class="left">产品类型</span><span>{{productDetail.DEPOSIT_CATEGORY}}</span></li>
      <li class="pro-li" v-if="productDetail.LOCKUP_PERIOD"><span class="left">锁定期</span><span>{{productDetail.LOCKUP_PERIOD}}</span>
      </li>
    </template>
  </ul>
</template>

<script>
  export default {
    name: "ProDetail",
    props: {
      productDetail: null,
      proType: {
        type: Object,
        default() {
          return {
            // 产品类型
            PRD_TYPE_ID: '4',
            DEPOSIT_TYPE_ID: '4'
          }
        }
      }
    },
    filters: {
      IS_INTERVIEW_filter(val) {
        // if(!val) return val
        let msg = "";
        if (val == 0) {
          return (msg = "首次购买无需面签");
        }

        if (val == 1) {
          return (msg = "首次购买无需面签");
        }

        if (val == 2) {
          return (msg = "首次购买无需面签");
        }
        return (msg = "首次购买无需面签");
      },

      PRD_TYPE_ID_FILTER(val, type) {
        let str = '产品类型';
        switch (val - 0) {
          case 1:
            str = '货币基金'
            break;
          case 2:
            str = '理财'
            break;
          case 3:
            str = '纯债'
            break;
          case 4:
            //  1：活期
            //  2：智能
            //  3：结构性
            //  4：
            if (type == 1) {
              str = '活期存款'
            }
            if (type == 2) {
              str = '智能存款'
            }
            if (type == 3) {
              str = '结构性存款'
            }
            if (type == 4) {
              str = '存款'
            }
            break;
        }
        return str
      },
    },
    data() {
      return {
        PRD_TYPE_ID: '',
        DEPOSIT_TYPE_ID: ''
      }
    },
    created() {
      console.log(this.proType);
    }
  }
</script>

<style scoped lang="scss">
  /*产品详情*/
  .pro-detail {
    padding: 0 px2rem(20);
    color: #666;

    .pro-li {
      height: px2rem(49);
      line-height: px2rem(49);
      box-shadow: 0 1px 0 0 rgba(220, 220, 220, 0.5);

      .left {
        display: inline-block;
        width: px2rem(100);
      }

      &:last-child {
        box-shadow: none
      }
    }
  }
</style>
