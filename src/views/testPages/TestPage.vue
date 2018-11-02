<template>
  <div>
    测试页面
    <button @click="print">++</button>
    <button @click="getMsg1">++</button>
  </div>
</template>

<script>
  export default {
    name: "testPage",
    created(){
      this.$store.dispatch('addBankInfo',{
        bankName:'晋商xxx',
        bankLogo:'001',
        ifNeedPass:true,
        msgTime:60
      })
    },
    methods:{
      print(){
        this.$store.commit('setMsgTime')

      },
      getMsg1(){
        console.log(this.$store);
        let a= this.$store.getters.getMsg
        console.log(a);
      }
    }
  }
</script>

<style scoped>

</style>