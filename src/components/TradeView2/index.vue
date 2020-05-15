<template>
  <div class="TVChartContainer">
    <div class="TVChartContainer2" id="tv_chart_container"></div>
  </div>
</template>

<script>
const pako = require('pako')
export default {
  name: 'HelloWorld',
  props: ['selectType'],
  data () {
    return {
      language: 'zh',
      socket: null,
      currency1: 'btc',
      currency2: 'usdt',
      chart: null,
      loading: true,
      limit: 10000, // 精度
      getHistory: false,
      history: [], // 历史数据
      adapter: {},
      TradingRealUpdater: null,
      TradingItemUpdater: null,
      TradingResetUpdater: null,
      resolution: '1min', // 实现线
      resolutionButtons: {},
      config: {},
      isReady: false
    }
  },
  methods: {
    createAdapter () {
      // 创建数据适配器
      let _this = this
      return {
        onReady: function (callback) {
          console.log('onReady')
          setTimeout(function () {
            return callback(_this.config)
          }, 0)
        },
        searchSymbols: function (
          userInput,
          exchange,
          symbolType,
          onResultReadyCallback
        ) {
          onResultReadyCallback([
            {
              symbol: (_this.currency1 + '-' + _this.currency2).toUpperCase(), // <商品缩写名>
              full_name: (
                _this.currency1 +
                '-' +
                _this.currency2
              ).toUpperCase(), // <商品全称 -- 例: BTCE:BTCUSD>(这个是传入值）
              description: (
                _this.currency1 +
                '-' +
                _this.currency2
              ).toUpperCase(), //  <商品描述>
              exchange: '', // <交易所名>
              ticker: (_this.currency1 + '-' + _this.currency2).toUpperCase(), // <商品代码, 可选
              type: 'bitcoin'
            }
          ])
        },
        resolveSymbol: function (
          symbolName,
          onSymbolResolvedCallback,
          onResolveErrorCallback
        ) {
          console.log('resolveSymbol')
          let symbolInfo = {
            name: symbolName, // 商品名称。您的用户将看到它(作为一个字符串)
            ticker: symbolName, // 它是您的商品体系中此商品的唯一标识符
            description: symbolName, // 描述
            type: 'bitcoin', // 仪表的可选类型:stock, index, forex, futures, bitcoin, expression, spread, cfd
            session: '24x7', // 商品交易时间(7*24小时)
            timezone: 'Asia/Shanghai', // 时区
            exchange: '', // listed_exchange 现在，这两个字段都为某个交易所的略称
            // minmov(最小波动), pricescale(价格精度), minmove2, fractional(分数)
            minmov: 1, // 价格最小波动
            pricescale: _this.limit,
            // "intraday_multipliers": ["1", "5", "15","30", "60", "240", "1D"],//这是一个包含日内分辨率(分钟单位)的数组 "30", "60", "240", "1D", "1W", "1M"
            volume_precision: 2, // 整数显示此商品的成交量数字的小数位。0表示只显示整数。1表示保留小数位的1个数字字符
            data_status: 'streaming', // 数据状态(streaming(实时),endofday(已收盘),pulsed(脉冲),delayed_streaming(延迟流动中))
            has_intraday: true, // 布尔值显示商品是否具有日内（分钟）历史数据
            has_daily: false,
            has_empty_bars: false // 是否展示空柱
          }
          setTimeout(function () {
            onSymbolResolvedCallback(symbolInfo)
          }, 0)
        },
        getBars: function (
          symbolInfo,
          resolution,
          from,
          to,
          onHistoryCallback,
          onErrorCallback,
          firstDataRequest
        ) {
          // console.log('subscribeBars   firstDataRequest',firstDataRequest,from);
          if (!firstDataRequest) {
            _this.getHistory = true
            _this.actionSubMoreKline(from)
            return
          }
          _this.getHistory = false
          // onHistoryCallback([], {noData: true});
          _this.TradingRealUpdater = (items, option) =>
            onHistoryCallback(items, option)
          if (resolution === '1') {
            _this.resolution = '1min'
          } else if (resolution === '5') {
            _this.resolution = '5min'
          } else if (resolution === '15') {
            _this.resolution = '15min'
          } else if (resolution === '30') {
            _this.resolution = '30min'
          } else if (resolution === '60') {
            _this.resolution = '60min'
          } else if (resolution === '240') {
            _this.resolution = '4hour'
          } else if (resolution === '3600') {
            _this.resolution = '1day'
          } else if (resolution === '4600') {
            _this.resolution = '1week'
          } else if (resolution === '5600') {
            _this.resolution = '1mon'
          } else if (resolution === '6600') {
            _this.resolution = '1year'
          }
          if (_this.isReady) {
            _this.actionSend({id: 'id1', req: `market.${_this.currency1}${_this.currency2}.kline.${_this.resolution}`})
          } else {
            _this.isReady = true
          }
          // _this.subKLine();
          // _this.actionSend({
          //   id: 'id1',
          //   req: `market.${_this.currency1}${_this.currency2}.kline.${_this.resolution}`
          // })
          _this.chart.activeChart().resetData()
        },
        subscribeBars: function (
          symbolInfo,
          resolution,
          onRealtimeCallback,
          subscriberUID,
          onResetCacheNeededCallback
        ) {
          console.log('subscribeBars')
          _this.TradingItemUpdater = item => onRealtimeCallback(item)
          // _this.TradingItemUpdater = onRealtimeCallback;
          _this.TradingResetUpdater = () => onResetCacheNeededCallback()
        },
        unsubscribeBars: function (subscriberUID) {},
        calculateHistoryDepth: function (
          resolution,
          resolutionBack,
          intervalBack
        ) {},
        getMarks: function (
          symbolInfo,
          startDate,
          endDate,
          onDataCallback,
          resolution
        ) {},
        getTimescaleMarks: function (
          symbolInfo,
          startDate,
          endDate,
          onDataCallback,
          resolution
        ) {},
        getServerTime: function (callback) {
          let time = new Date().getTime()
          callback(Math.floor(time))
        }
      }
    },
    createTrading () {
      let interval = '15'
      let _this = this
      _this.adapter = _this.createAdapter()
      this.$nextTick(() => {
        let config = {
          symbol: (_this.currency1 + '-' + _this.currency2).toUpperCase(), // 商品名称
          interval: interval, // 默认显示时间分辨率15分钟
          supported_resolutions: [
            '1',
            '5',
            '15',
            '30',
            '60',
            '240',
            '1D',
            '5D',
            '1W',
            '1M'
          ],
          container_id: 'tv_chart_container',
          datafeed: _this.adapter,
          library_path: '/static/tradeview/charting_library/',
          locale: _this.language, // 语言
          autosize: true,
          fullscreen: true, // 显示图表是否占用窗口中所有可用的空间
          // toolbar_bg: "#15202C",
          // theme: 'light',
          timezone: 'Asia/Shanghai', // 时区
          // user_id: "public_user_id",
          debug: false,
          charts_storage_api_version: '1.1',
          drawings_access: {
            type: 'black',
            tools: [{ name: 'Regression Trend' }],
            tools: [
              { name: 'Trend Line', grayed: true },
              { name: 'Trend Angle', grayed: true }
            ]
          },
          disabled_features: [
            'header_screenshot',
            'header_saveload',
            // "header_chart_type",
            'header_symbol_search',
            'header_compare',
            'header_resolutions',
            'header_undo_redo',
            // "header_indicators",
            // "header_settings",
            // "header_fullscreen_button",
            // "header_interval_dialog_button",
            'board_around_chart',
            'border_around_the_chart',
            'remove_library_container_border',
            'show_interval_dialog_on_key_press',
            'symbol_search_hot_key',
            'symbol_info',

            'study_dialog_search_control',
            'study_templates',

            'display_market_status',

            'edit_buttons_in_legend',

            // "main_series_scale_menu",
            'star_some_intervals_by_default',
            'datasource_copypaste',
            'right_bar_stays_on_scroll',
            'compare_symbol',

            'context_menus',
            'timezone_menu',
            'timeframes_toolbar',
            'left_toolbar',
            'control_bar',

            'use_localstorage_for_settings',

            'volume_force_overlay',

            'show_interval_dialog_on_key_press',
            'caption_buttons_text_if_possible',
            'display_market_stauts',
            //  "go_to_date",
            'items_favoriting'
          ],
          overrides: {
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
          },
          enabled_features: [
            'dont_show_boolean_study_arguments',
            'hide_last_na_study_output',
            'move_logo_to_main_pane',
            'same_data_requery',
            'side_toolbar_in_fullscreen_mode',
            'keep_left_toolbar_visible_on_small_screens',
            'disable_resolution_rebuild',
            'use_localstorage_for_settings',
            'remove_library_container_border',
            // "save_chart_properties_to_local_storage",
            'side_toolbar_in_fullscreen_mode',
            'hide_last_na_study_output',
            'constraint_dialogs_movement',
            'edit_buttons_in_legend'
          ],
          studies_overrides: {
            'volume.volume.color.0': '#E86136',
            'volume.volume.color.1': '#00B07C',
            'volume.volume.transparency': 10

            // "legend_context_menu":false,
            // "dont_show_boolean_study_arguments":false,
          },
          // loading_screen: {backgroundColor: "#15202C", foregroundColor: '#15202C'},
          custom_css_url: 'light.css',
          load_last_chart: false
        }

        _this.chart = new TradingView.widget(config)
        _this.chart.onChartReady(() => {
          _this.chart
            .chart()
            .createStudy('Moving Average', false, false, [5], null, {
              'Plot.color': '#ffffff'
            })
          _this.chart
            .chart()
            .createStudy('Moving Average', false, false, [15], null, {
              'Plot.color': '#6495ED'
            })
          _this.chart
            .chart()
            .createStudy('Moving Average', false, false, [30], null, {
              'Plot.color': '#9932CC'
            })

          document
            .getElementById('tv_chart_container')
            .childNodes[0].setAttribute(
              'style',
              'display:block;width:100%;height:100%;'
            )

          // ============================
          let interval = '15'
          const btnList = [
            {
              class: interval == '1' ? 'selected' : '',
              label: '分时',
              resolution: '1',
              type: 1
            },
            {
              class: interval == '1' ? 'selected' : '',
              label: '1min',
              resolution: '1',
              type: 0
            },
            {
              class: interval == '5' ? 'selected' : '',
              label: '5min',
              resolution: '5',
              type: 0
            },
            {
              class: interval == '15' ? 'selected' : '',
              label: '15min',
              resolution: '15',
              type: 0
            },
            {
              class: interval == '30' ? 'selected' : '',
              label: '30min',
              resolution: '30',
              type: 0
            },
            {
              class: interval == '60' ? 'selected' : '',
              label: '60min',
              resolution: '60',
              type: 0
            },
            {
              class: interval == '240' ? 'selected' : '',
              label: '4hour',
              resolution: '240',
              type: 0
            },
            {
              class: interval == '3600' ? 'selected' : '',
              label: '1day',
              resolution: '3600',
              type: 0
            }
          ]
          let _widget = _this.chart
          let _chart = _this.chart.chart()
          _chart.onIntervalChanged().subscribe(null, function (interval, obj) {
            _widget.changingInterval = false
          })
          btnList.forEach(function (item) {
            let button = _widget.createButton({
              align: 'left'
            })
            item.resolution === _widget._options.interval &&
              updateSelectedIntervalButton(button)
            if (item.type === 0) {
              button
                .attr('class', 'button ' + item.class)
                .attr(
                  'data-chart-type',
                  item.chartType === undefined ? 8 : item.chartType
                )
                .on('click', function (e) {
                  let chartType = +button.attr('data-chart-type')
                  _chart.setResolution(item.resolution)
                  _chart.setChartType(1)
                  localStorage.setItem('interval', item.resolution)
                  updateSelectedIntervalButton(button)
                })
                .append(item.label)
            } else {
              button
                .attr('class', 'button ' + item.class)
                .attr(
                  'data-chart-type',
                  item.chartType === undefined ? 8 : item.chartType
                )
                .on('click', function (e) {
                  let chartType = +button.attr('data-chart-type')
                  _chart.setResolution(item.resolution)
                  _chart.setChartType(3)
                  localStorage.setItem('interval', item.resolution)
                  updateSelectedIntervalButton(button)
                })
                .append(item.label)
            }
            _this.resolutionButtons[item.resolution] = button
          })

          function updateSelectedIntervalButton (button) {
            _widget.selectedIntervalButton &&
              _widget.selectedIntervalButton.removeClass('selected')
            button.addClass('selected')
            _widget.selectedIntervalButton = button
          }

          // ============================
        })
      })
    },

    actionInit () {
      this.socket = new WebSocket('wss://api.huobiasia.vip/ws')
      this.socket.onopen = this.actionOnOpen
      this.socket.onclose = this.actionOnClose
      this.socket.onmessage = data => {
        if (data.data instanceof Blob) {
          let result = ''
          let reader = new FileReader()
          reader.onload = () => {
            result = JSON.parse(pako.inflate(reader.result, { to: 'string' }))
            this.actionHandleMessage(result)
          }
          reader.readAsBinaryString(data.data)
        }
      }
      this.socket.onerror = this.actionOnFailed
    },
    actionOnOpen () {
      console.log('actionOnOpen')
      // this.actionSend({id:'id1',sub:`market.btcusdt.kline.15min`})
      if (this.isReady) {
        this.actionSend({id: 'id1', req: `market.${this.currency1}${this.currency2}.kline.${this.resolution}`})
      } else {
        this.isReady = true
      }
    },
    actionOnClose () {
      console.log('actionOnClose')
    },
    // actionOnMessage(msg) {
    // console.log('actionOnMessage',msg)
    // },
    actionOnFailed () {
      console.log('actionOnFailed')
    },
    actionSend (params) {
      this.socket.send(JSON.stringify(params))
    },
    actionHandleMessage (data) {
      if (data.ping) {
        this.actionSend({ pong: data.ping })
      } else if (
        data.rep ==
          `market.${this.currency1}${this.currency2}.kline.${this.resolution}` &&
        data.status == 'ok'
      ) {
        // console.log('onmessage222', data);
        let klines = data.data
        let items = []
        for (let i = 0; i < klines.length; i++) {
          let item = klines[i]
          let newBar = {
            time: item.id * 1000,
            close: item.close,
            open: item.open,
            high: item.high,
            low: item.low,
            volume: item.vol
          }
          items.push(newBar)
        }

        if (this.getHistory) {
          let first = this.history[0]
          let current = items[items.length - 1]
          if (first.time < current.time) {
            if (this.TradingRealUpdater) {
              this.TradingRealUpdater([], { noData: true })
            }
            return
          }
          this.history.unshift(items)
          if (this.TradingRealUpdater) {
            this.TradingRealUpdater(items, { noData: false })
          }
        } else {
          this.history = items
          this.actionSend({
            id: 'id1',
            sub: `market.${this.currency1}${this.currency2}.kline.${this.resolution}`
          })
          if (this.TradingRealUpdater) {
            this.TradingRealUpdater(items, { noData: false })
          }
        }
        // this.TradingRealUpdater(this.history, {noData: klines==null||klines.length==0});
      } else if (
        data.ch ==
          `market.${this.currency1}${this.currency2}.kline.${this.resolution}` &&
        data.tick
      ) {
        if (this.TradingRealUpdater) {
          this.TradingItemUpdater({
            time: data.tick.id * 1000,
            close: data.tick.close,
            open: data.tick.open,
            high: data.tick.high,
            low: data.tick.low,
            volume: data.tick.vol
          })
        }
      }
    },
    actionSubMoreKline (to) {
      let first = this.history[0]['time'] / 1000
      this.actionSend({
        id: 'id1',
        req: `market.${this.currency1}${this.currency2}.kline.${this.resolution}`,
        to
      })
    }
  },
  // mounted () {
  //   this.actionInit()
  //   this.createTrading()
  // },
  watch: {
    'selectType': function (e) {
      this.currency1 = e.split('usdt')[0]
      this.actionInit()
      this.createTrading()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.TVChartContainer {
  /*height: 900px;*/
  height: 330px ;
  position: relative;
  background: transparent;
  overflow: hidden;
}

.TVChartContainer2 {
  height: 330px !important;
  position: relative;
}

iframe {
  width: 100% !important;
  height: 330px !important;
}
</style>
