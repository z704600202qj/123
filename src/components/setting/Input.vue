<template>
  <div class="c-input">
    <div class="label">{{label}}</div>
    <el-input :disabled='disabled' :placeholder="placeholder" :type='type' :value="value" @input="input"></el-input>
  </div>
</template>
<script>
export default {
  props: ['value', 'label', 'placeholder', 'type', 'disabled'],
  methods: {
    input (value) {
      this.$emit('input', value)
    }
  }
}
</script>
<style lang="less" scoped>
.c-input {
  .label {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    margin-bottom: 9px;
  }
  /deep/.el-input__inner {
    font-size: 14px;
    color: rgba(124, 124, 124, 1);
    height: 60px;
    border: 1px solid rgba(210, 210, 210, 1);
  }
}
</style>
