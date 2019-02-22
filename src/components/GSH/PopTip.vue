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
               <slot></slot>
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
    position:fixed;left:0;right: 0; min-height: px2rem(409); bottom:0;border-radius: 0;-webkit-transition: all 0.35s;-moz-transition: all 0.35s;-o-transition: all 0.35s;transition: all 0.35s; z-index:99999;
    .pop-title{
      position: relative; line-height:px2rem(48);text-align: center;  border-bottom: 1px solid #C5C5C5; background: #F6F6F6;
      .pop-close{ display:block; position:absolute; top:px2rem(20); right:px2rem(13); width:px2rem(13); height:px2rem(13);background: url(~@/assets/images/control_close@2x.png) 0 0 ; background-size:px2rem(13);}
      ins{font-size:px2rem(18); color:#333333; text-decoration: none;}
    }
    .pop-box{
      padding:px2rem(5) px2rem(5); overflow: hidden;height:px2rem(350); background: #fff; font-size: px2rem(14);
      }
  }
}
</style>
