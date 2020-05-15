<template>
  <div>
    <el-container>
      <el-header class="header-warp">
          <Header/>
      </el-header>
      <el-main class="main-warp">
        <slot name="main">Header content</slot>
      </el-main>
      <el-footer class="footer-warp">
          <Footer/>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'

export default {
  name: 'Layout',
  components: {
    Header,
    Footer
  }
}
</script>
<style lang="less" scoped>
@import "../assets/theme.less";

.header-warp {
  background: @baise;
  height: 60px !important;
}
.main-warp{
  padding: 0;
  margin: 0;
}
.footer-warp {
  height: 229.5px !important;
  background: @baise;
}
</style>
