<template>
    <div>
        <PopTip  @closePop='popClose'></PopTip>
     </div>
</template>

<script>
  import {PopTip} from '@/components'//工商行弹窗提示组件
  import Bus from '@/plugin/bus'
  import {PageName, BusName, LsName} from "@/Constant";
  export default {
    data() {
      return {}
    },
    components: {
        PopTip
    },
    name: "PopTip",
    created() {
    },
    mounted() {
    },
    computed: {
    },
    methods: {
      popClose(){
        // 
        
      }
    },
  }
</script>

<style scoped lang="scss">
</style>
