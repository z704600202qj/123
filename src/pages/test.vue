<template>
    <div>12</div>
</template>
<script>
import ss from '../utils/newWs'
export default {
  mounted () {
    ss('bchusdt', '1min', (e) => {
      console.log(e)
    })
  }
}

</script>
