<template>
  <div>
    <div class="details-warp" v-if="from!=='phone'">
      <div class="content">
        <div class="left">
          <HeList @selectOptions="select" :list="list" />
          <AllAssets :token="token" :assets="assetsobj" />
          <SelectAccount :token="token" :assets="assetsobj" />
        </div>
        <div class="right">
          <!-- v-if="update" -->
          <Kline v-if="update" :list="list" :kData="kData" :selectType="selectCion" />
          <div class="buy-sell">
            <BuyUp :list="list" :assets="assetsobj" :tips="tips" @reload="reload" />
            <BuyDown :list="list" :assets="assetsobj" :tips="tips" @reload="reload" />
          </div>
        </div>
      </div>

      <Tables ref="editUser" :updateData='updateData' :token="token" :assets="assetsobj" />
    </div>
    <div v-else>
      <Kline v-if="update" :list="list" :kData="kData" :selectType="selectCion" />
    </div>
  </div>
</template>
<script>
import HeList from '@/components/details/HeList'
import AllAssets from '@/components/details/AllAssets'
import Kline from '@/components/details/Kline'
import BuyUp from '@/components/details/Up'
import BuyDown from '@/components/details/Down'
import SelectAccount from '@/components/details/SelectAccount'
import Tables from '@/components/details/Tables'

import ReconnectingWebSocket from 'reconnecting-websocket'

import { assets, coinUnit } from '@/services'
let tokenid2 = localStorage.getItem('info')
let { token } = JSON.parse(tokenid2) || { token: '' }
let heList = {
  btcusdt: {
    combine: '1BTC',
    num: 1,
    limit: '300'
  },
  ethusdt: {
    combine: '50ETH',
    num: 50,
    limit: '300'
  },
  bchusdt: {
    combine: '30BCH',
    num: 30,
    limit: '300'
  },
  eosusdt: {
    combine: '1000EOS',
    num: 1000,
    limit: '300'
  },
  etcusdt: {
    combine: '500ETC',
    num: 500,
    limit: '300'
  },
  xrpusdt: {
    combine: '10000XRP',
    num: 10000,
    limit: '300'
  },
  ltcusdt: {
    combine: '150LTC',
    num: 150,
    limit: '300'
  }
}
var ws = new ReconnectingWebSocket(
  window.location.origin === 'https://www.colaex.pro'
    ? 'wss://www.colaex.pro/coin/quotation'
    : 'ws://eva7base.com:99/coin/quotation',
  null,
  { debug: false, reconnectInterval: 3000 }
)

export default {
  data () {
    return {
      from: 'web',
      coinUnits: {},
      assetsobj: {},
      update: true,
      token: token,
      list: [],
      updateData: {},
      dataWarp: {},

      selectCion: 'btcusdt', // 当前
      time: '5min',
      cacthData: {},

      emitData: {
        bchusdtData: {}
      },
      bchusdt: {
        depth: [],
        bchusdtData: []
      },
      bsvusdt: {
        depth: [],
        bchusdtData: []
      },
      btcusdt: {
        depth: [],
        bchusdtData: []
      },
      eosusdt: {
        depth: [],
        bchusdtData: []
      },
      etcusdt: {
        depth: [],
        bchusdtData: []
      },
      ethusdt: {
        depth: [],
        bchusdtData: []
      },
      xrpusdt: {
        depth: [],
        bchusdtData: []
      },
      ltcusdt: {
        depth: [],
        bchusdtData: []
      },
      asks: [],
      bids: [],
      kData: [],
      tips: {
        combine: '1BTC',
        num: 1,
        limit: '300'
      }
    }
  },
  mounted () {
    let tokenid2 = localStorage.getItem('info')
    let { token } = JSON.parse(tokenid2) || { token: '' }
    if (token) {
      const data = {
        token: token
      }
      ws.send(JSON.stringify(data))
    }
    this.from = this.$route.query.from
    let icon = this.$route.query.icon
    if (icon) {
      this.tips = heList[icon]
      this.selectCion = icon
    }
    this.assets()
    this.createWs()
    this.coinUnit()

    this.token = token
  },
  watch: {
    selectCion: function (e) {
      this.kData = []
    }
  },

  methods: {
    createWs () {
      ws.addEventListener('open', () => {
        let token = localStorage.getItem('token')
        const data = {
          token: token
        }
        ws.send(JSON.stringify(data))
      })
      ws.addEventListener('message', event => {
        // let token = localStorage.getItem('token')
        // const obj = {
        //   token: token
        // }
        // ws.send(JSON.stringify(obj))
        const data = JSON.parse(event.data)
        this.onMessage(data)
      })
    },
    reload () {
      this.$refs.editUser.reloadList()
      this.assets()
    },
    async assets () {
      let { Data } = await assets()
      this.assetsobj = Data || {}
    },

    async coinUnit () {
      let { Data } = await coinUnit()
      this.coinUnits = Data
    },

    select (e) {
      this.tips = heList[e]
      this.selectCion = e
      this.update = false
      this.$router.push({
        query: {
          icon: e
        }
      })
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.update = true
      })
    },
    onMessage (e) {
      if (e.asset) {
        const contract = e.asset.contract ? e.asset.contract : this.assetsobj.contract
        const balance = e.asset.balance ? e.asset.balance : this.assetsobj.balance
        let num = Number(e.asset.contract.available) + Number(e.asset.contract.entrust) + Number(e.asset.contract.hold)
        this.assetsobj.contract = {
          ...this.assetsobj.contract,
          ...e.asset.contract,
          balance: num.toFixed(2)
        }

        this.assetsobj.total = (Number(contract.available) + Number(contract.entrust) + Number(contract.hold) +
        Number(balance.available) + Number(balance.freezeForSell) + Number(balance.freezeForRefound)).toFixed(2)
        //
      } else if (e.transaction) {
        this.updateData = e.transaction.transaction
      } else {
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
          dot: 2,
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
          dot: 2,

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
          dot: 4,
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
          dot: 4,
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
          dot: 2,

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
          dot: 2,
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
          dot: 5,
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

        this.list = [obj1, '', obj3, obj4, obj5, obj6, obj7, obj8]
        this.emitData = this[this.selectData]
      }
    }
  },
  components: {
    HeList,
    AllAssets,
    Kline,
    BuyUp,
    BuyDown,
    SelectAccount,
    Tables
  }
}
</script>
<style lang="less" scoped>
.details-warp {
  background: #f5f6fd;
  overflow: hidden;

  .buy-sell {
    margin: 10px auto 0;
    display: flex;
  }
  .content {
    width: 1200px;
    margin: 10px auto 0;
    display: flex;
    .left {
      width: 328px;
    }
    .right {
      flex: 1;
      .row {
        margin-top: 10px;
        margin-left: 10px;
        display: flex;
      }
    }
  }
}
</style>
