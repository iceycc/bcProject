<template>
  <section class="pop"> 
		 	<div class="pop-mask"></div> 
		     <div class="pop-main" > 
         <div class="pop-title"> 
		       <ins>
		        利息计算方式
		       </ins> 
		       <a href="javascript:void(0)" class="pop-close"  @click="cancelHandle"></a> 
		      </div> 
		       <div class="pop-box">
             <p>提前支取利息方式：支持全额和部分提前支取</p>
             <ul>
               <li>1.存期小于3个月，按存入我行活期存款挂牌利率利息：</li>
               <li>2.存期大于等于3个月，小于6个月，按存入日央行3个月整存整取存款利率上浮30%计息；</li>
               <li>3.存期大于等于6个月，小于1年，按存入日央行6个月整存整取存款利率上浮30%利息；</li>
               <li>4.存期大于等于1年，小于2年，按存入日央行1年整存整取存款利率上浮30%计息； </li>
               <li>5.存期等于2年，按存入日央行2年期整存整取存款利率上浮30%计息。</li>
             </ul>
             <p class="yel">其他要素：到期后自动转回活期基本账户；支持质押贷款。 </p>
             <p class="yel">注：具体档次金额及计息标准以分行为准。</p>
		       </div> 
		     </div> 
  </section>

</template>

<script>
  export default {
    name: "PopTip",
    data (){
    return {
      // 可以根据实际情况写更复杂的弹层，根据情况扩充tips即可
    }
  },
  created () {
  },
  methods:{
      cancelHandle(){
         this.$emit('closePop')
      }
    }
  }
</script>

<style scoped lang="scss">
.pop{
  .pop-mask{position: fixed; background-color: rgba(0,0,0,.4); left: 0; right: 0; top: 0; bottom: 0; z-index: 99;}
  .pop-main{
    position:fixed;left:0;right: 0; min-height: px2rem(409); bottom:0;border-radius: 0;-webkit-transition: all 0.35s;-moz-transition: all 0.35s;-o-transition: all 0.35s;transition: all 0.35s; z-index:999;
    .pop-title{
      position: relative; line-height:px2rem(48);text-align: center;  border-bottom: 1px solid #C5C5C5; background: #F6F6F6;
      .pop-close{ display:block; position:absolute; top:px2rem(20); right:px2rem(13); width:px2rem(13); height:px2rem(13);background: url(~@/assets/images/control_close@2x.png) 0 0 ; background-size:px2rem(13);}
      ins{font-size:px2rem(18); color:#333333; text-decoration: none;}
    }
    .pop-box{
      padding:px2rem(11) px2rem(15); overflow: hidden;height:px2rem(338); background: #fff; font-size: px2rem(14);overflow-y:auto;
      p{
        color:#333333; line-height: px2rem(24);
      }
      ul li{color: #666666; line-height: px2rem(24);}
      p.yel{ color:#FF5B05;}
    }
  
  }
}
</style>
