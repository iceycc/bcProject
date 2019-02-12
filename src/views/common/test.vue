<template>
  <div>
    <input disabled type="text" v-model="text" class="input">
  </div>
</template>
<script>
  import API from "@/service"
  export default {
    name: "testPage",
    data(){
      return{
        text:'15621185521'
      }
    },
    created() {
      this.initData()
    },
    methods:{
      async initData(){
        let res = await API.test({})
      }
    }

  }
</script>
<style lang="scss" scoped>

  .msg{
    width: 100%;
    margin-top: px2rem(40);
    font-size: px2rem(18);
    text-align: center;
  }
  .input{
    width: 100%;
    height: 40px;
  }
  /*input[disabled], input:disabled, input.disabled {*/
    /*color: red;*/
    /*-webkit-text-fill-color: red;*/
    /*-webkit-opacity: 1;*/
    /*opacity: 1;*/
    /*background: rgba(0,0,0,0);*/
  /*}*/
</style>
