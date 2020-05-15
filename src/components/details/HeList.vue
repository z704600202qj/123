<template>
  <div class="list">
    <div class="title">合约列表</div>
    <div class="table" v-if="list.length>0">
      <div class="table-title">
        <div class="table-title-item">币种</div>
        <div class="table-title-item1">价格</div>
        <div class="table-title-item2">涨幅</div>
      </div>
      <div class="table-content" @click="slect('btcusdt')">
        <div class="table-content-item">BTC/USDT 永续</div>
        <div
          class="table-content-item1"
          :style="{'color':list[2].rate>=0?'#1EC086':'#ff2d2d'}"
        >{{list[2].close}}</div>
        <div class="table-content-item2">
          <div
            class="block"
            :style="{'background':list[2].rate>=0?'#1EC086':'#ff2d2d'}"
          >{{list[2].rate>0?'+':''}}{{list[2].rate}}%</div>
        </div>
      </div>
      <div class="table-content" @click="slect('ethusdt')">
        <div class="table-content-item">ETH/USDT 永续</div>
        <div
          class="table-content-item1"
          :style="{'color':list[5].rate>=0?'#1EC086':'#ff2d2d'}"
        >{{list[5].close}}</div>
        <div class="table-content-item2">
          <div
            class="block"
            :style="{'background':list[5].rate>=0?'#1EC086':'#ff2d2d'}"
          >{{list[5].rate>0?'+':''}}{{list[5].rate}}%</div>
        </div>
      </div>
      <div class="table-content" @click="slect('eosusdt')">
        <div class="table-content-item">EOS/USDT 永续</div>
        <div
          class="table-content-item1"
          :style="{'color':list[3].rate>=0?'#1EC086':'#ff2d2d'}"
        >{{list[3].close}}</div>
        <div class="table-content-item2">
          <div
            class="block"
            :style="{'background':list[3].rate>=0?'#1EC086':'#ff2d2d'}"
          >{{list[3].rate>0?'+':''}}{{list[3].rate}}%</div>
        </div>
      </div>
      <div class="table-content" @click="slect('etcusdt')">
        <div class="table-content-item">ETC/USDT 永续</div>
        <div
          class="table-content-item1"
          :style="{'color':list[4].rate>=0?'#1EC086':'#ff2d2d'}"
        >{{list[4].close}}</div>
        <div class="table-content-item2">
          <div
            class="block"
            :style="{'background':list[4].rate>=0?'#1EC086':'#ff2d2d'}"
          >{{list[4].rate>0?'+':''}}{{list[4].rate}}%</div>
        </div>
      </div>

      <div class="table-content" @click="slect('ltcusdt')">
        <div class="table-content-item">LTC/USDT 永续</div>
        <div
          class="table-content-item1"
          :style="{'color':list[6].rate>=0?'#1EC086':'#ff2d2d'}"
        >{{list[6].close}}</div>
        <div class="table-content-item2">
          <div
            class="block"
            :style="{'background':list[6].rate>=0?'#1EC086':'#ff2d2d'}"
          >{{list[6].rate>0?'+':''}}{{list[6].rate}}%</div>
        </div>
      </div>
      <div class="table-content" @click="slect('bchusdt')">
        <div class="table-content-item">BCH/USDT 永续</div>
        <div
          class="table-content-item1"
          :style="{'color':list[0].rate>=0?'#1EC086':'#ff2d2d'}"
        >{{list[0].close}}</div>
        <div class="table-content-item2">
          <div
            class="block"
            :style="{'background':list[0].rate>=0?'#1EC086':'#ff2d2d'}"
          >{{list[0].rate>0?'+':''}}{{list[0].rate}}%</div>
        </div>
      </div>
      <div class="table-content" @click="slect('xrpusdt')">
        <div class="table-content-item">XRP/USDT 永续</div>
        <div
          class="table-content-item1"
          :style="{'color':list[7].rate>=0?'#1EC086':'#ff2d2d'}"
        >{{list[7].close}}</div>
        <div class="table-content-item2">
          <div
            class="block"
            :style="{'background':list[7].rate>=0?'#1EC086':'#ff2d2d'}"
          >{{list[7].rate>0?'+':''}}{{list[7].rate}}%</div>
        </div>
      </div>
      <div class="table-content" @click="slect('BSV')" v-if="false">
        <div class="table-content-item">BSV/USDT 永续</div>
        <div
          class="table-content-item1"
          :style="{'color':list[1].rate>=0?'#1EC086':'#ff2d2d'}"
        >{{list[1].close}}</div>
        <div class="table-content-item2">
          <div
            class="block"
            :style="{'background':list[1].rate>=0?'#1EC086':'#ff2d2d'}"
          >{{list[1].rate>0?'+':''}}{{list[1].rate}}%</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['list'],
  data () {
    return {}
  },
  methods: {
    slect (e) {
      this.$emit('selectOptions', e)
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
.list {
  box-sizing: border-box;
  padding: 0px 18px;
  background: rgba(255, 255, 255, 1);
  height: 428px;
  margin-bottom: 10px;
  width: 328px;
  .title {
    padding: 0;
    height: 40px;
    line-height: 40px;

    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 600;
    color: rgba(0, 0, 0, 1);
    border-bottom: 1px solid #ebebeb;
  }
  .table-title {
    display: flex;
    margin: 17px 0;
    div {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .table-title-item {
      flex: 1;
    }
    .table-title-item1 {
      width: 110px;
      text-align: center;
    }
    .table-title-item2 {
      width: 80px;
      text-align: center;
    }
  }
  .table-content {
    display: flex;
    margin: 15px 0;
    div {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .table-content-item {
      flex: 1;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 600;
      color: rgba(0, 0, 0, 1);
    }
    .table-content-item1 {
      width: 110px;
      text-align: center;
      font-size: 14px;
      font-family: DIN;
      font-weight: 500;
      color: #38c764;
    }
    .table-content-item2 {
      width: 80px;
      text-align: center;
      .block {
        width: 60px;
        margin: 0 auto;
        font-size: 12px;

        height: 28px;
        line-height: 28px;
        text-align: center;
        color: #fff;
        background: #38c764;
        border-radius: 4px;
      }
    }
  }
}
</style>
