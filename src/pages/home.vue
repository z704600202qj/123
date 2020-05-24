<template>
  <div>
    <el-carousel height="350px">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div>
         <div class="banner" :style="{'background-image': `url(${item.img_pc})`}"> </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <Notice />

    <div class="recommend-warp">
      <div class="recommend-warp-content">
        <div v-for="(item,index) in list" :key="index" @click="goto(item.cion)" class="recommend-warp-content-item">
        <Recommend :data="item" :index="index" v-if="index<4" />
        </div>
      </div>
    </div>
    <NewMarket :list='list'/>
    <News/>
    <Platform />
    <PlatformData />
    <DownLoad />
  </div>
</template>

<script>
import Notice from '@/components/Notice'
import Recommend from '@/components/Recommend'
import NewMarket from '@/components/NewMarket'
import News from '@/components/News'
import Platform from '@/components/Platform'
import PlatformData from '@/components/Data'
import DownLoad from '@/components/DownLoad'
import ReconnectingWebSocket from 'reconnecting-websocket'

import { coinUnit, banner, coins } from '@/services'
import newWs from '../utils/newWs'
var ws = new ReconnectingWebSocket(
  window.location.origin === 'https://www.colaex.pro'
    ? 'wss://www.colaex.pro/coin/quotation'
    : 'ws://eva7base.com:99/coin/quotation',
  null, {debug: false, reconnectInterval: 3000})

export default {
  name: 'Home',
  data () {
    return {
      list: [],
      list1: [],
      cacthData: {},
      coinUnits: {},
      banners: []
    }
  },
  created () {
    this.banner()
    this.coinUnit()
    // this.coins()
    this.createWs()
  },
  methods: {
    async coinUnit () {
      let { Data } = await coinUnit()
      this.coinUnits = Data
    },
    createWs () {
      ws.addEventListener('open', () => {

      })
      ws.addEventListener('message', (event) => {
        const data = JSON.parse(event.data)
        this.onMessage(data)
      })
    },
    async coins () {
      let { Data } = await coins()
      let arr = Data.map(item => {
        item = item + 'usdt'
        return item
      })
      arr.forEach(element => {
        newWs(element, '1day', this.dayOnMessage)
      })
      this.coinsData = arr
    },
    goto (type) {
      this.$router.push({
        path: '/details',
        query: {
          icon: type
        }
      })
    },

    async banner () {
      let { Data } = await banner()
      this.banners = Data
    },
    onMessage (e) {
      let bchusdtwarp = e['market.bchusdt.kline.1day']
      // let bsvusdtwarp = e['market.bsvusdt.kline.1day']
      let btcusdtwarp = e['market.btcusdt.kline.1day']
      let eosusdtwarp = e['market.eosusdt.kline.1day']
      let etcusdtwarp = e['market.etcusdt.kline.1day']
      let ethusdtwarp = e['market.ethusdt.kline.1day']
      let xrpusdtwarp = e['market.xrpusdt.kline.1day']
      let ltcusdtwarp = e['market.ltcusdt.kline.1day']
      let obj1 = {
        cion: 'bchusdt',
        time: bchusdtwarp.ts,
        open: bchusdtwarp.tick.open.toFixed(2),
        high: bchusdtwarp.tick.high.toFixed(2),
        low: bchusdtwarp.tick.low.toFixed(2),
        close: bchusdtwarp.tick.close.toFixed(2),
        volume: bchusdtwarp.tick.vol,
        cny: (bchusdtwarp.tick.close * this.coinUnits.usdtcny).toFixed(2),
        rate: -(
          ((bchusdtwarp.tick.open - bchusdtwarp.tick.close) /
            bchusdtwarp.tick.open) *
          100
        ).toFixed(2),
        depth: e['market.bchusdt.depth.step1']

      }

      let obj3 = {
        cion: 'btcusdt',
        time: btcusdtwarp.ts,
        open: btcusdtwarp.tick.open.toFixed(2),
        high: btcusdtwarp.tick.high.toFixed(2),
        low: btcusdtwarp.tick.low.toFixed(2),
        close: btcusdtwarp.tick.close.toFixed(2),
        volume: btcusdtwarp.tick.vol,
        cny: (btcusdtwarp.tick.close * this.coinUnits.usdtcny).toFixed(2),
        rate: -(
          ((btcusdtwarp.tick.open - btcusdtwarp.tick.close) /
            btcusdtwarp.tick.open) *
          100
        ).toFixed(2),
        depth: e['market.btcusdt.depth.step1']

      }

      let obj4 = {
        cion: 'eosusdt',
        time: eosusdtwarp.ts,
        open: eosusdtwarp.tick.open.toFixed(2),
        high: eosusdtwarp.tick.high.toFixed(2),
        low: eosusdtwarp.tick.low.toFixed(2),
        close: eosusdtwarp.tick.close.toFixed(4),
        volume: eosusdtwarp.tick.vol,
        cny: (eosusdtwarp.tick.close * this.coinUnits.usdtcny).toFixed(2),
        rate: -(
          ((eosusdtwarp.tick.open - eosusdtwarp.tick.close) /
            eosusdtwarp.tick.open) *
          100
        ).toFixed(2),
        depth: e['market.eosusdt.depth.step1']

      }

      let obj5 = {
        cion: 'etcusdt',
        time: etcusdtwarp.ts,
        open: etcusdtwarp.tick.open.toFixed(2),
        high: etcusdtwarp.tick.high.toFixed(2),
        low: etcusdtwarp.tick.low.toFixed(2),
        close: etcusdtwarp.tick.close.toFixed(4),
        volume: etcusdtwarp.tick.vol,
        cny: (etcusdtwarp.tick.close * this.coinUnits.usdtcny).toFixed(2),
        rate: -(
          ((etcusdtwarp.tick.open - etcusdtwarp.tick.close) /
            etcusdtwarp.tick.open) *
          100
        ).toFixed(2),
        depth: e['market.etcusdt.depth.step1']

      }

      let obj6 = {
        cion: 'ethusdt',
        time: ethusdtwarp.ts,
        open: ethusdtwarp.tick.open.toFixed(2),
        high: ethusdtwarp.tick.high.toFixed(2),
        low: ethusdtwarp.tick.low.toFixed(2),
        close: ethusdtwarp.tick.close.toFixed(2),
        volume: ethusdtwarp.tick.vol,
        cny: (ethusdtwarp.tick.close * this.coinUnits.usdtcny).toFixed(2),
        rate: -(
          ((ethusdtwarp.tick.open - ethusdtwarp.tick.close) /
            ethusdtwarp.tick.open) *
          100
        ).toFixed(2),
        depth: e['market.ethusdt.depth.step1']

      }

      let obj7 = {
        cion: 'ltcusdt',
        time: ltcusdtwarp.ts,
        open: ltcusdtwarp.tick.open.toFixed(2),
        high: ltcusdtwarp.tick.high.toFixed(2),
        low: ltcusdtwarp.tick.low.toFixed(2),
        close: ltcusdtwarp.tick.close.toFixed(2),
        volume: ltcusdtwarp.tick.vol,
        cny: (ltcusdtwarp.tick.close * this.coinUnits.usdtcny).toFixed(2),
        rate: -(
          ((ltcusdtwarp.tick.open - ltcusdtwarp.tick.close) /
            ltcusdtwarp.tick.open) *
          100
        ).toFixed(2),
        depth: e['market.ltcusdt.depth.step1']

      }

      let obj8 = {
        cion: 'xrpusdt',
        time: xrpusdtwarp.ts,
        open: xrpusdtwarp.tick.open.toFixed(2),
        high: xrpusdtwarp.tick.high.toFixed(2),
        low: xrpusdtwarp.tick.low.toFixed(2),
        close: xrpusdtwarp.tick.close.toFixed(5),
        volume: xrpusdtwarp.tick.vol,
        cny: (xrpusdtwarp.tick.close * this.coinUnits.usdtcny).toFixed(2),
        rate: -(
          ((xrpusdtwarp.tick.open - xrpusdtwarp.tick.close) /
            xrpusdtwarp.tick.open) *
          100
        ).toFixed(2),
        depth: e['market.xrpusdt.depth.step1']

      }

      this.list = [obj1, obj3, obj4, obj5, obj6, obj7, obj8]
    },
    dayOnMessage (e, cion, time) {
      let kline = e[`market.${cion}.kline.${time}`]
      if (kline) {
        let obj = {
          cion: cion,
          time: kline.ts,
          open: kline.tick.open.toFixed(2),
          high: kline.tick.high.toFixed(2),
          low: kline.tick.low.toFixed(2),
          close: kline.tick.close.toFixed(2),
          volume: kline.tick.vol,
          cny: (kline.tick.close * this.coinUnits.usdtcny).toFixed(2),
          rate: -(
            ((kline.tick.open - kline.tick.close) /
            kline.tick.open) *
          100
          ).toFixed(2)
        }
        this.$set(this.cacthData, cion, obj)
      }
    }
  },
  components: {
    Notice,
    Recommend,
    NewMarket,
    News,
    Platform,
    PlatformData,
    DownLoad
  }
}
</script>
<style lang="less" scoped>
@import "../assets/theme.less";

  .banner{
     position:fixed;
  top: 0;
  left: 0;
  width:100%;
  height:100%;
  min-width: 1000px;
  z-index:-10;
  zoom: 1;
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  }
.banner {
  width: 100%;
  background: @baise;
}
.recommend-warp {
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-around;
  width: 1200px;
  margin: 10px auto;
  &-content {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: space-between;
    width: 1200px;
  }
}
</style>
