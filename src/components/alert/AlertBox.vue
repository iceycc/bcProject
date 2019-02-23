<template>
  <section class="alert-box">
    <p>{{message}}</p>
    <div class="btn">
      <div @click="cancelHandle" class="cancel">{{left}}</div>
      <div @click="submitHandle" class="sure">{{right}}</div>
    </div>
  </section>
</template>
<script>
  export default {
    name: "AlertBox",
    props:{
      left:{
        type:String,
        default:'取消'
      },
      right:{
        type:String,
        default:'确定'
      },
      message:{
        type:String,
        default:'是否继续'
      },
    },
    methods:{
      submitHandle(){
        this.$emit('submit')
      },
      cancelHandle(){
        this.$emit('cancel')
      }
    }
  }
</script>

<style scoped lang="scss">
  .alert-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    background: #fff;
    width: px2rem(270);
    z-index: 100;
    border: 1px solid #e5e5e5;
    border-radius: px2rem(12);
    box-shadow: px2rem(3) px2rem(3) px2rem(3) #e5e5e5;

    p {
      text-align: center;
      padding-top: px2rem(20);
      font-size: px2rem(16);
      color: #333;
    }

    .btn {
      margin-top: px2rem(10);
      border-top: 1px solid #fafafa;
      display: flex;
    }

    .cancel, .sure {
      text-align: center;
      flex: 1;
      padding: px2rem(10) 0 px2rem(10);
      font-size: px2rem(17);
    }

    .cancel {
      color: #508CEE;
    }

    .sure {
      color: #000;
    }
  }

</style>
