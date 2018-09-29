<template>
        <i :class="['iconfont',iconClass,iconStyle]"></i>
    <!--
    // 收集的字体图标库
    icon-eye

    -->
</template>
<script>
    export default {
        name: "IconFont",
        props:{
            iconClass:{ // 字体图标的class名称
                type:null,
                default:''
            },
            iconStyle:null // 自定义图标样式
        }
    }
</script>

<style scoped lang="scss">
@import "../../assets/iconfont/iconfont.css";
</style>