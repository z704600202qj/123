<template>
  <div class="recommend-item">
    <div class="recommend-title">
      <div>
        {{data.cion.toUpperCase()}}
      </div>
      <div class="up-or-down">
          <img v-if="data.rate>=0" src="../assets/image/up.png" alt />
          <img v-else src="../assets/image/down.png" alt />
         <div  :style="{'color':data.rate>0?'#00C185':'#FF436B'}">{{data.rate>0?`+${data.rate}`:`${data.rate}`}}%</div>

        </div>
    </div>
    <div class="price">{{data.close}}</div>
    <div class="price-to-CNY">≈{{data.cny}} CNY</div>
    <div class="bi-num">24h量 {{data.volume}}</div>
  </div>
</template>
<script>
export default {
  name: 'recommend',
  props: ['data', 'index'],
  data () {
    return {
      title: {
        'BCH': 'BCH',
        'BSV': 'BSV',
        'BTC': 'BTC',
        'EOS': 'EOS',
        4: 'ETC',
        5: 'ETH',
        6: 'LTC',
        7: 'XRP'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.recommend {
  &-item {
    box-sizing: border-box;
    width: 300px;

    background: rgba(255, 255, 255, 1);
    padding: 20px;
    .price {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 600;
      color: rgba(0, 0, 0, 1);
      margin-top: 4px;
    }
    .price-to-CNY {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 600;
      color: rgba(0, 0, 0, 1);
      margin-top: 4px;
    }
    .bi-num {
      margin-top: 4px;

      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 600;
      color: rgba(149, 159, 171, 1);
    }
  }
  &-title {
    display: flex;
    justify-content: space-between;
    font-size: 19px;
    font-family: PingFang SC;
    font-weight: 600;
    color: rgba(0, 0, 0, 1);
    span {
      color: #909ba8;
    }
    .up-or-down {
          display: flex;
    justify-content: space-between;
      font-size: 19px;
      font-family: DIN;
      font-weight: bold;
      color: rgba(0, 193, 133, 1);
      img{
          width: 24px;
          height: 24px;
      }
    }
  }
}
</style>
