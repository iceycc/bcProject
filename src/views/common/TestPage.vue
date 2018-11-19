<template>
  <div>
  </div>
</template>
<script>
  import util from '../../libs/util'
  import {PageName} from "../../Constant";
  export default {
    name: "testPage",
    created() {
      let reload = util.storage.session.get('reload') || null
      let flag = util.storage.session.get('flag') || null
      console.log(reload);
      if (reload) {
        util.storage.session.remove('reload')
        window.location.reload()
      } else {
        let data = this.$route.query
        util.storage.session.remove('flag')
        this.$router.push({
          name: flag,
          query: data
        })
      }
    },

  }
</script>
