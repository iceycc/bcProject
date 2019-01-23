<template>
  <p @click="signHandle"
     :class="{'bang':true,'no':agree == false}">我已阅读并同意
    <a
      v-for="item,index in options"
      :key="index"
      href="javascript:;"
      @click.stop="getAgreement(item.type)">
      {{item.name}}
    </a>
  </p>
</template>

<script>
  import {PageName} from "@/Constant"

  export default {
    name: "SignAreement",
    props: {
      agree: {
        type: Boolean,
        default: true
      },
      options: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {}
    },
    methods: {
      signHandle() {
        this.$emit('sign')
      },
      getAgreement(type) {
        this.agree = true
        this.$router.push({
          name: PageName.DocsPage,
          query: {
            type,
          }
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .bang {
    padding: 0 px2rem(20);
    margin-left: px2rem(20);
    background: url(~@/assets/images/agree@3x.png) no-repeat 0 px2rem(2);
    background-size: px2rem(12) px2rem(12);
    font-size: px2rem(12);
    color: #808080;

    a {
      color: #0096FE;
    }
  }

  .no {
    background: url(~@/assets/images/onagree@3x.png) no-repeat 0 px2rem(2);
    background-size: px2rem(12) px2rem(12);
  }

</style>
