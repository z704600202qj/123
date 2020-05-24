<template>
  <div class="k-line" :style="from==='phone'?'height:auto':'margin-left: 10px'">
    <div class="header" v-if="from!=='phone'">
      <div class="header-left">
        <div class="left left1">
          <div class="left1-title">{{selectType.toUpperCase()}}永续</div>
          <div class="left1-subtitle">USDT结算</div>
          <div class="left1-subtitle">24h {{bchusdtData.volume}}</div>
        </div>
        <div class="left left2">
          <div
            class="left2-title"
            :style="{'color':bchusdtData.rate>0?'rgba(30, 192, 134, 1)':'rgba(252, 73, 72, 1)'}"
          >{{bchusdtData.close||0}}</div>
          <div class="left1-subtitle">≈{{bchusdtData.cny}} CNY</div>
        </div>
        <div class="left left3">
          <div
            class="left3-title"
            :style="{'color':bchusdtData.rate>0?'rgba(30, 192, 134, 1)':'rgba(252, 73, 72, 1)'}"
          >{{bchusdtData.rate>0?`+${bchusdtData.rate||0}`:`${bchusdtData.rate||0}`}}%</div>
          <img v-if="bchusdtData.rate>=0" src="../../assets/image/up.png" alt />
          <img v-else src="../../assets/image/down.png" alt />
        </div>
      </div>
      <div class="header-right">
        <div>
          24h最高：
          <span style="color:#1EC086">{{bchusdtData.high}}</span>
        </div>
        <div>
          24h最低：
          <span style="color:#FC4948">{{bchusdtData.low}}</span>
        </div>
      </div>
    </div>
    <div class="content">

      <div class="charts">
        <!-- <IFrame/> -->
        <Kchart ref="trade" :datas="kData" :selectType="selectType" />
      </div>

      <div class="list" v-if="from!=='phone'">
        <div class="title">
          <div>价格(USDT)</div>
          <div>数量(张)</div>
        </div>
        <div class="price-num" v-for="(item,index) in asks" :key="item+index">
          <div class="price" style="color:rgba(252, 73, 72, 1)">{{item[0]}}</div>
          <div class="num">{{item[1]}}</div>
        </div>
        <div
          v-if="bids.length>0"
          class="current-price"
          :style="{'color':color?'rgba(30, 192, 134, 1)':'red'}"
        >
          {{bchusdtData.close}}
          <img v-if="color" src="../../assets/image/up.png" alt />
          <img v-else src="../../assets/image/down.png" alt />
        </div>
        <div class="price-num" v-for="(item,index) in bids" :key="item+index">
          <div class="price">{{item[0]}}</div>
          <div class="num">{{item[1]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Kchart from '../TradeView2'
import IFrame from './IFrame'

export default {
  props: ['kData', 'list'],
  data () {
    return {
      from: 'web',
      bchusdtData: {},
      selectType: '',
      asks: [],
      bids: [],
      color: true
    }
  },
  watch: {
    list: {
      handler (r) {
        let arr = r.filter(item => {
          if (item) {
            if (item.cion === this.$route.query.icon) {
              return item
            }
          }
        })
        let e = arr[0]
        this.color = e.close > this.bchusdtData.close
        this.bchusdtData = e
        let arr2 = JSON.parse(JSON.stringify(e.depth.tick.bids))
        let arr3 = JSON.parse(JSON.stringify(e.depth.tick.asks))
        arr2 = arr2.sort(function (a, b) {
          return b[0] * 100 - a[0] * 100
        })
        arr3 = arr3.sort(function (a, b) {
          return b[0] * 100 - a[0] * 100
        })
        let a3 = arr3.filter((item) => {
          if (item[0] >= Number(this.bchusdtData.close)) {
            return item
          }
        })
        let a2 = arr2.filter((item) => {
          if (item[0] <= Number(this.bchusdtData.close)) {
            return item
          }
        })
        a2.length = 5
        a3.length = 5

        let obj = {
          EOS: 4,
          ETC: 4,
          BSV: 4,
          XRP: 5
        }
        this.bids = a2.map(item => {
          return [
            item[0].toFixed(e.dot || 2),
            item[1].toFixed(obj[this.selectType] || 2)
          ]
        })
        this.asks = a3.map(item => {
          return [
            item[0].toFixed(e.dot || 2),
            item[1].toFixed(obj[this.selectType] || 2)
          ]
        })
        // this.bids = e.depth.tick.bids
        // this.asks = e.depth.tick.asks
        // this.bchusdtData = e.bchusdtData[e.bchusdtData.length - 1]
        // if (bchusdtData) {
        //   let c = (bchusdtData.open - bchusdtData.close) / bchusdtData.open * 100
        //   e.bchusdtData.rate = c.toFixed(2)
        // }
      },
      deep: true
    }
  },

  components: {
    Kchart,
    IFrame
  },
  created () {
  },
  mounted () {
    this.from = this.$route.query.from
    let icon = this.$route.query.icon
    this.selectType = icon
    this.$refs.trade.actionInit()
    this.$refs.trade.createTrading()
  }
}
</script>

<style lang="less" scoped>
.show-iframe {
  width: 100%;
}
.k-line {
  // margin-left: 10px;
  flex: 1;
  height: 428px;
  background: rgba(255, 255, 255, 1);
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 86px;
    width: 100%;
    border-bottom: 1px solid #ebebeb;
    &-left {
      .left {
        float: left;
        margin: 0 10px;
      }
      .left1-title {
        line-height: 32px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(0, 0, 0, 1);
        font-size: 18px;
      }
      .left1-subtitle {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
      .left2-title {
        font-size: 23px;
        font-family: DIN;
        font-weight: bold;
        line-height: 32px;

        color: rgba(30, 192, 134, 1);
      }
      .left3 {
        img {
          width: 24px;
          height: 24px;
        }
      }
      .left3-title {
        font-size: 17px;
        line-height: 32px;

        font-family: DIN;
        font-weight: bold;
        color: rgba(30, 192, 134, 1);
      }
    }
    &-right {
      box-sizing: border-box;
      background: rgba(247, 248, 250, 1);
      margin-right: 10px;
      text-align: center;
      padding: 10px 10px;
      div {
        font-size: 14;
        font-family: DIN;
        font-weight: 400;
        color: rgba(152, 152, 152, 1);
        span {
          font-size: 16px;
          font-family: DIN;
          font-weight: bold;
          color: rgba(252, 73, 72, 1);
        }
      }
    }
  }
  .content {
    display: flex;
    height: 330px;
    .charts {
      flex: 1;
      height: 330px;
    }
    .list {
      background: #fff;
      width: 180px;
      border-left: 1px solid #ebebeb;
      .title {
        display: flex;
        margin-top: 15px;
        div {
          width: 50%;
          text-align: center;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #666666;
        }
      }
      .price-num {
        display: flex;
        margin-top: 6px;
        div {
          width: 50%;
          text-align: center;
          font-size: 14px;
          font-family: DIN;

          font-weight: 400;
        }
        .price {
          color: #1ec086;
        }
        .num {
          color: #000000;
        }
      }
      .current-price {
        width: 100%;
        text-align: center;
        font-size: 26px;
        font-family: DIN;
        font-weight: bold;
        color: #1ec086;
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
</style>
