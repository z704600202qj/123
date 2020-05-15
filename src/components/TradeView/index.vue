<template>
  <div id="trade-view"></div>
</template>

<script>
import { widget as TvWidget } from '../../../static/tradeview/charting_library/charting_library.min.js'
import datafeeds from './datafeeds/datafees.js'

export default {
  props: ['datas', 'selectType'],
  watch: {
    selectType: function (e) {
      this.cacheData = {}
    },
    datas: function (e) {
      this.onMessage(e)
    }
  },
  data () {
    return {
      widget: null,
      datafeeds: new datafeeds(this),
      symbol: 'BTCUSDT',
      interval: 1,
      cacheData: {},
      lastTime: null,
      getBarTimer: null,
      isLoading: true
    }
  },

  methods: {
    init (interval = 1, e, list) {
      const ticker = `${this.symbol}-${interval}`
      this.interval = interval
      this.cacheData[ticker] = list
      if (!this.widget) {
        this.widget = new TvWidget({
          symbol: this.selectType || this.symbol,
          interval: interval,
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
        console.log(this.widget)
      }
    },

    onMessage (data) {
      // console.log(' >> sub:', data)
      this.datafeeds.barsUpdater.updateData()
      const ticker = `${this.symbol}-${this.interval}`
      const barsData = data
      if (this.cacheData[ticker] && this.cacheData[ticker].length) {
        this.cacheData[ticker] = this.cacheData[ticker].concat(
          barsData[barsData.length - 1]
        )
      } else {
        this.cacheData[ticker] = barsData
      }
    },
    getBars (
      symbolInfo,
      resolution,
      rangeStartDate,
      rangeEndDate,
      onLoadedCallback
    ) {
      console.log(' >> :', resolution)
      this.interval = resolution

      const ticker = `${this.symbol}-${this.interval}`
      if (this.cacheData[ticker] && this.cacheData[ticker].length) {
        this.isLoading = false
        const newBars = []
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
