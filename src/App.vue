<template>
  <div id="app" :style="from==='phone'?'width:100%':'min-width: 1200px'">
   <Layout v-if="from!=='phone'">
     <router-view slot='main'/>
   </Layout>
   <div v-else>
     <router-view slot='main'/>
   </div>
  </div>
</template>

<script>
import Layout from '@/components/Layout'
export default {
  name: 'App',
  data () {
    return {
      from: 'web'
    }
  },
  mounted () {
    this.from = this.$route.query.from
  },
  components: {
    Layout
  },
  watch: {}
}
</script>
<style lang="less">
#app{
  // min-width: 1200px;

}
</style>
