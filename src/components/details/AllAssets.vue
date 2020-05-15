<template>
  <div>
    <div class="assets-box" v-if="token&&Object.keys(assets).length>0">
      <div class="title">总资产（USDT)</div>
      <div class="num">{{assets.total}}</div>
      <div class="btns">
        <router-link tag="div" to="/handle?type=Change">资金划转</router-link>
        <router-link tag="div" to="/handle?type=TopUp">充币</router-link>
        <router-link tag="div" to="/handle?type=Withdrawal">提币</router-link>
      </div>
    </div>
    <div class="assets-box" v-else>
      <div class="title1">欢迎来到合约交易所</div>
      <div class="btns1">
        <div @click="goto('/login')">登录</div>
        <div @click="goto('/register')">注册</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['token', 'assets'],
  methods: {
    goto (e) {
      this.$router.push(e)
    }
  }
}
</script>
<style lang="less" scoped>
.assets-box {
  box-sizing: border-box;
  margin-bottom: 10px;
  padding: 20px 20px;
  height: 178px;
  background: #fff;
  .title {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #000000;
  }
  .title1 {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-align: center;
  }
  .num {
   font-size:30px;
    font-family: DIN;
    font-weight: bold;
   color:rgba(0,0,0,1);

    margin: 12px 0;
  }
  .btns1 {
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    div {
      cursor: pointer;
      width: 127px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #318AFD;
      border-radius: 2px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #fff;
    }
  }
  .btns {
    display: flex;
    div {
      cursor: pointer;
      width: 103px;
      margin-right: 20px;
      height: 37px;
      line-height: 37px;
      text-align: center;
      background: #318AFD;
      border: 1px solid rgba(255, 255, 255, 0.7);
      border-radius: 4px;

      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
