<template>
  <div class="market-warp">
    <div class="title">
      <div class="left">
        <span></span>
        <div>最新行情</div>
      </div>
    </div>
    <div class="content">
      <div class="content-title">
        <div>币种</div>
        <div>当前价格</div>
        <div>24h 交易量</div>
        <div>涨跌幅度</div>
      </div>
      <div class="content-item" v-for="(item,key,index) in list" :key="index" @click="goto(key)">
        <div>
          {{item.cion.toUpperCase()}}
          <span>永续</span>
        </div>
        <div>{{item.close}}</div>
        <div>{{item.volume}}</div>
        <div>
          <div
            class="left3-title"
            :style="{'color':item.rate>0?'rgba(30, 192, 134, 1)':'rgba(252, 73, 72, 1)'}"
          >{{item.rate>0?`+${item.rate}`:`${item.rate}`}}%</div>
          <img v-if="item.rate>=0" src="../assets/image/up.png" alt />
          <img v-else src="../assets/image/down.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'market',
  props: ['list'],
  data () {
    return {}
  },
  methods: {
    goto (type) {
      this.$router.push({
        path: '/details',
        query: {
          icon: type
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.market-warp {
  width: 1160px;
  margin: 0 auto;
  .title {
    .left {
      display: flex;
      align-items: center;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
    }

    .left > span {
      display: inline-block;
      width: 4px;
      height: 18px;
      background: #318afd;
      border-radius: 2px;
      margin-right: 10px;
    }
  }
  .content {
    &-title {
      box-sizing: border-box;
      display: flex;
      padding: 0 20px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(158, 158, 158, 1);
      height: 40px;
      line-height: 40px;
      background: rgba(249, 249, 249, 1);
      margin-bottom: 14px;
      & > :nth-child(3) {
        width: 280px;
      }
      & > :nth-child(2) {
        flex: 1;
      }
      & > :nth-child(1) {
        width: 400px;
      }
      & > :nth-child(4) {
        width: 100px;
      }
    }
    &-item {
      padding: 0 20px;
      box-sizing: border-box;

      display: flex;
      font-size: 16px;
      font-weight: bold;
      color: #0c0c33;
      margin-bottom: 20px;
      & > :nth-child(3) {
        width: 280px;
      }
      & > :nth-child(2) {
        flex: 1;
      }
      & > :nth-child(1) {
        width: 400px;
        span {
          font-size: 16px;
          color: rgba(132, 132, 132, 1);
        }
      }
      & > :nth-child(4) {
        display: flex;
        width: 100px;
        font-size: 16px;
        font-family: DIN;
        font-weight: bold;
        color: rgba(0, 193, 133, 1);
        img {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
}
</style>
