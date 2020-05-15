<template>
  <div>
    <div class="line">
      <div :class="active===25?'avtive':''" @click="select(25)">25%</div>
      <div :class="active===50?'avtive':''" @click="select(50)">50%</div>
      <div :class="active===75?'avtive':''" @click="select(75)">75%</div>
      <div :class="active===100?'avtive':''" @click="select(100)">100%</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: ''
    }
  },
  methods: {
    select (e) {
      this.active = e === this.active ? '' : e
      this.$emit('input', this.active)
    }
  }
}
</script>
<style lang="less" scoped>
.line {
  display: flex;
  border: 2px solid rgba(194, 205, 211, 1);
  height: 40px;
  line-height: 40px;

  border-radius: 4px;
  background: rgba(30, 192, 134, 0);
  font-size: 14px;
  color: rgba(117, 127, 134, 1);

  div {
    cursor: pointer;
    flex: 1;
    text-align: center;
  }
  .avtive {
    background: rgba(49, 138, 253, 1);
    color: rgba(255, 255, 255, 1);
  }
}
</style>
