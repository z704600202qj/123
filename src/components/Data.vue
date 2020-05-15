<template>
  <div class="data-warp">
    <div class="content">
      <div class="title1-warp">
        <div class="title1">
          500,116,161
          <span>用户在使用colaex进行合约交易</span>
        </div>
      </div>
      <p>colaex已完成高达</p>
      <div class="title2">
        500,116,161
        <span>美元的交易</span>
      </div>
      <div class="btn" @click="goto">
        开始交易
        <i class="el-icon-right"></i>
      </div>
    </div>
    <img src="../assets/image/bg1.png" alt />
  </div>
</template>
<script>
export default {
  methods: {
    goto () {
      this.$router.push('/details?icon=btcusdt')
    }
  }
}
</script>
<style lang="less" scoped>
.data-warp {
  display: flex;
    box-sizing: border-box;
  width: 1200px;
  margin: 0 auto;
   padding-left: 114px;
    padding-right: 100px;
  height: 327px;
  background: #fbfbfb;
  img{
    width: 351px;
    height: 242px;
  }
  .content {
    width: 100%;

    overflow: hidden;
    p {
      font-size: 18px;
      font-family: PingFang SC;
      color: #000000;
      margin-top: 40px;
    }
    .title1-warp {
      position: relative;
    }
    .title1 {
      display: flex;
      align-items: center;
      margin-top: 35px;
      font-size: 38px;
      font-family: DIN;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
      line-height: 33px;
      &:after {
        content: "";
        position: absolute;
        left: 0px;
        top: auto;
        bottom: -20px;
        right: auto;
        height: 8px;
        width: 73px;
        background-color: #318afd;
        border-radius: 4px;
      }
      span {
        font-size: 18px;
        margin-left: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
    }
    .title2 {
      display: flex;
      align-items: center;
      height: 54px;
      font-size: 38px;
      font-family: DIN;
      font-weight: bold;
      color: #318afd;
      span {
        margin-left: 22px;

        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
    }
    .btn {
      cursor: pointer;
      width: 200px;
      height: 60px;
      line-height: 60px;
      font-size: 18px;

      background: rgba(49, 138, 253, 0.96);
      border-radius: 2px;
      font-size: 23px;
      margin-top: 24px;
      font-family: PingFang SC;
      font-weight: 500;
      text-align: center;
      color: #fff;
     background:rgba(49,138,253,0.96);

    }
  }
}
</style>
