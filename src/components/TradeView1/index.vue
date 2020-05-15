<template>
  <div id="trade-view"></div>
</template>

<script>
import { widget as TvWidget } from '../../../static/tradeview/charting_library/charting_library.min.js'
import datafeeds from './datafeeds/datafees.js'
import ReconnectingWebSocket from 'reconnecting-websocket'
import { coinhistory } from '../../services/index'
var pako = require('pako')
var ws = new ReconnectingWebSocket('wss://api.huobiasia.vip/ws', null, {debug: false, reconnectInterval: 3000})
let objs = {
  bchusdt: 'bch',
  bsvusdt: 'bsv',
  btcusdt: 'btc',
  eosusdt: 'eos',
  etcusdt: 'etc',
  ethusdt: 'eth',
  ltcusdt: 'ltc',
  xrpusdt: 'xrp'
}
export default {
  props: ['datas', 'selectType'],
  watch: {
    selectType: function (e, r) {
      this.symbol = e
      // 取消订阅
      let obj1 = JSON.stringify({
        req: `market.${e}.kline.${this.interval}`,
        id: e
      })
      ws.send(obj1)

      // this.coinhistory(e)
      let obj = JSON.stringify({
        sub: `market.${e}.kline.${this.interval}`,
        id: e
      })
      ws.send(obj)
    }

  },
  data () {
    return {
      widget: null,
      datafeeds: new datafeeds(this),
      symbol: 'btcusdt',
      interval: '1min',
      cacheData: {},
      lastTime: null,
      getBarTimer: null,
      isLoading: true
    }
  },
  mounted () {
    this.createWs()
  },
  methods: {

    async coinhistory (e) {
      // const ticker = `${this.symbol}-5`
      const ticker = `${e}-${this.interval}`
      let list = []
      let { Data } = await coinhistory({ symbol: objs[this.$route.query.icon], time: '1min' })
      if (Data) {
        Data.data.forEach(function (element) {
          list.push({
            time: element.id * 1000,
            open: element.open,
            high: element.high,
            low: element.low,
            close: element.close,
            volume: element.vol
          })
        }, this)
      }
      this.cacheData[ticker] = list
      let icon = this.$route.query.icon
      this.symbol = icon
      // 订阅
    },
    createWs () {
      // console.log(11222, this.selects)
      ws.addEventListener('open', () => {
        // let obj = JSON.stringify({
        //   sub: `market.${this.symbol}.kline.${this.interval}`,
        //   id: this.symbol
        // })
        // ws.send(obj)
      })
      ws.addEventListener('message', (event) => {
        let blob = event.data
        let reader = new FileReader()
        reader.onload = (e) => {
          let ploydata = new Uint8Array(e.target.result)
          let msg = pako.inflate(ploydata, {to: 'string'})
          this.handleData(msg)
        }
        reader.readAsArrayBuffer(blob, 'utf-8')
      })
    },
    handleData (msg) {
      let data = JSON.parse(msg)
      if (data.ping) {
        // 如果是 ping 消息
        ws.send(data.ping)
      } else if (data.status === 'ok') {
        const ticker = `${this.symbol}-${this.interval}`
        let list = []
        // console.log(data.data)
        if (data.data) {
          data.data.forEach(function (element) {
            list.push({
              time: element.id * 1000,
              open: element.open,
              high: element.high,
              low: element.low,
              close: element.close,
              volume: element.vol
            })
          }, this)
          this.$set(this.cacheData, ticker, list)
          // this.cacheData[ticker] = list
        }

        // 响应数据
        // handleReponseData(data)
      } else {
        // 数据体
        let obj = {
          [data.ch]: data
        }
        // console.log(data)
        this.onMessage(obj)
        // fn(obj, cion, time)
      }
    },
    init (interval = 1) {
      // const ticker = `${this.symbol}-${this.interval}`
      // this.cacheData[ticker] = list
      if (!this.widget) {
        this.widget = new TvWidget({
          symbol: this.symbol,
          interval: 1,
          // fullscreen: true,
          container_id: 'trade-view',
          datafeed: this.datafeeds,
          theme: 'Light', // 设置背景主题
          library_path: '/static/tradeview/charting_library/',
          disabled_features: [
            'left_toolbar',
            'header_symbol_search',
            'header_chart_type',
            'header_undo_redo',
            'header_compare',
            'header_fullscreen_button',
            'header_screenshot',
            'header_settings',
            'edit_buttons_in_legend',
            'hide_last_na_study_output',
            'pane_context_menu',
            'legend_widget',
            'timeframes_toolbar',
            'legend_context_menu'
          ],
          enabled_features: [
            'header_resolutions',
            'adaptive_logo',
            'move_logo_to_main_pane',
            'header_indicators',
            'remove_library_container_border',
            'show_logo_on_all_charts'
          ],
          timezone: 'Asia/Shanghai',
          locale: 'zh',
          debug: false,
          overrides: {
            // 蜡烛的样式
            'mainSeriesProperties.candleStyle.upColor': '#1ec086',
            'mainSeriesProperties.candleStyle.downColor': '#fc4948',
            'mainSeriesProperties.candleStyle.drawWick': true,
            'mainSeriesProperties.candleStyle.drawBorder': true,
            // "mainSeriesProperties.candleStyle.borderColor": "#589065",
            'mainSeriesProperties.candleStyle.borderUpColor': '#1ec086',
            'mainSeriesProperties.candleStyle.borderDownColor': '#fc4948',
            // "mainSeriesProperties.candleStyle.wickUpColor": '#589065',//控制影线的颜色
            // "mainSeriesProperties.candleStyle.wickDownColor": '#ae4e54',
            'mainSeriesProperties.candleStyle.barColorsOnPrevClose': false
          }
        })
      }
    },
    onMessage (data) {
      // console.log(data)
      let name = `market.${this.symbol}.kline.${this.interval}`
      this.datafeeds.barsUpdater.updateData()
      const ticker = `${this.symbol}-${this.interval}`
      let kline = data[name]
      // console.log(' >> sub:', kline)

      if (kline) {
        let barsData = {
          time: kline.tick.id * 1000,
          open: kline.tick.open.toFixed(2),
          high: kline.tick.high.toFixed(2),
          low: kline.tick.low.toFixed(2),
          close: kline.tick.close.toFixed(2),
          volume: kline.tick.vol
        }
        // console.log(2222, this.cacheData)
        if (this.cacheData[ticker] && this.cacheData[ticker].length) {
          this.cacheData[ticker] = this.cacheData[ticker].concat(
            barsData
          )
        } else {
          this.cacheData[ticker] = [barsData]
        }
      }
    },
    getBars (
      symbolInfo,
      resolution,
      rangeStartDate,
      rangeEndDate,
      onLoadedCallback
    ) {
      // console.log(' >> :', resolution)
      this.interval = resolution + 'min'

      const ticker = `${this.symbol}-${this.interval}`
      if (this.cacheData[ticker] && this.cacheData[ticker].length) {
        this.isLoading = false
        const newBars = []
        // console.log(22222, this.cacheData[ticker])
        this.cacheData[ticker].forEach(item => {
          if (
            item.time >= rangeStartDate * 1000 && item.time <= rangeEndDate * 1000
          ) {
            // console.log(' >> :', item.time, rangeStartDate, rangeEndDate)
            newBars.push(item)
          }
        })
        onLoadedCallback(newBars)
      } else {
        const self = this
        this.getBarTimer = setTimeout(function () {
          self.getBars(
            symbolInfo,
            resolution,
            rangeStartDate,
            rangeEndDate,
            onLoadedCallback
          )
        }, 10)
      }
    }
  }
}
</script>
<style>
iframe {
  width: 100% !important;
  height: 330px !important;
}
</style>
