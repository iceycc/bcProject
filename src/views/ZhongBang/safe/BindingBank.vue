<template>
  <div>
    <app-bar title="绑定银行卡"></app-bar>

  </div>
</template>

<script>
  export default {
    name: "BindingBank",
    created() {
      let hasCardList = this.getComState.Infos.hasCardList
      console.log(hasCardList);
    }
  }
</script>

<style scoped>

</style>
