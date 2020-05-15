<template>
         <iframe
        class="charts"
        id="show-iframe"
        ref="iframe"
        height="100%"
        width="100%"
        frameborder="0"
        name="showHere"
        scrolling="auto"
        src="https://www.aicoin.cn/chart/huobipro_ethusdt"
      ></iframe>
</template>
<script>
export default {
  created () {
    let win = this.$refs.iframe.contentWindow.document
    let a = win.getElementById('feature')
    // console.log(a)
    alert(JSON.stringify(win.documentElement))
  }
}
</script>
