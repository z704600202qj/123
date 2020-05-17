<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="coin_type" label="币种" width="60">
      <template slot-scope="scope">{{type[scope.row.coin_type]}}</template>
    </el-table-column>
    <el-table-column prop="buy_type" label="类型" width="70">
      <template slot-scope="scope">{{scope.row.buy_type===1?'买跌':"买涨"}}</template>
    </el-table-column>
    <el-table-column prop="multiple" label="杠杆倍数"></el-table-column>
    <el-table-column prop="count" label="数量" width="60"></el-table-column>
    <el-table-column prop="open" label="开仓价格"></el-table-column>
    <el-table-column prop="promise" label="占用保证金"  width="120"></el-table-column>
    <el-table-column prop="income" label="盈亏(USDT)" width="120"></el-table-column>
    <el-table-column prop="show_open_date" label="下单时间" width="180"></el-table-column>
    <el-table-column prop="Low_price" label="手动止损价" width="120">
      <template slot-scope="scope">
        <el-input v-if="scope.row.edit" placeholder="止损价" v-model="Low_price">
          <i slot="suffix">
            <i class="el-input__icon el-icon-check" @click="priceMeth(scope.row,scope.$index)"></i>
          </i>
        </el-input>
        <span v-else>
          {{scope.row.low||'请设置'}}
          <i class="el-icon-edit" @click="edit(scope.$index)"></i>
        </span>
      </template>
    </el-table-column>

    <el-table-column prop="High_price" label="手动止盈价" width="120">
      <template slot-scope="scope">
        <el-input v-if="scope.row.editHeigh" placeholder="止盈价" v-model="High_price">
          <i slot="suffix">
            <i class="el-input__icon el-icon-check" @click="priceMeth(scope.row,scope.$index)"></i>
          </i>
        </el-input>
        <span v-else>
          {{scope.row.high||'请设置'}}
          <i class="el-icon-edit" @click="editHeigh(scope.$index)"></i>
        </span>
      </template>
    </el-table-column>
    <el-table-column prop="state" label="状态">
      <template slot-scope="scope">{{state[scope.row.state]}}</template>
    </el-table-column>
    <el-table-column prop="State" label="操作">
      <template slot-scope="scope">
        <el-button type="text" @click="orderSell(scope.row,scope.tid)">平仓</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { limitLow, orderList, orderSell } from '../../../services/index'
const state = {
  0: '委托单',
  1: '持仓单',
  2: '已平仓',
  3: '强制平仓'
}
let obj = {
  0: 'btc',
  1: 'eth',
  2: 'eos',
  3: 'etc',
  4: 'ltc',
  5: 'bch',
  6: 'xrp'
}
export default {
  props: ['list', 'updateData'],
  data () {
    return {
      state: state,
      type: obj,
      tableData: [],
      Low_price: '',
      High_price: '',
      objs: {}
    }
  },
  mounted () {
    this.orderList()
  },
  methods: {
    async orderSell ({ tid }) {
      await orderSell({ id: tid.toString() })
      await this.orderList()
      await this.$parent.reloadassets()
    },
    async orderList () {
      let { Data } = await orderList({
        page: this.page,
        size: 100,
        type: 0
      })
      let arr = Data.list.map(item => {
        item.edit = false
        item.editHeigh = false
        return item
      })
      this.$nextTick(() => {
        this.tableData = arr
      })
    },
    async priceMeth (e, index) {
      this.tableData[index].edit = !this.tableData[index].edit
      await limitLow({
        tid: e.tid,
        low: this.Low_price || this.tableData[index].low,
        high: this.High_price || this.tableData[index].high
      })
      await this.orderList()
    },
    edit (e) {
      let arr = this.tableData
      this.Low_price = ''
      this.High_price = ''
      arr[e].edit = !arr[e].edit
      this.$nextTick(() => {
        this.tableData = arr
      })
    },
    editHeigh (e) {
      this.Low_price = ''
      this.High_price = ''
      this.tableData[e].editHeigh = !this.tableData[e].editHeigh
    }
  },
  watch: {
    updateData: function (e) {
      let income = 0
      let nowpromises = 0
      let guPromise = 0
      let arr = this.tableData.map(item => {
        if (item.tid === e.tid) {
          item.now_promise = e.now_promise
          item.income = e.signed ? '+' + e.income : '-' + e.income
        }
        income += Number(item.income)
        nowpromises += Number(item.now_promise)
        guPromise += Number(item.promise)
        return item
      })
      this.objs = {
        income,
        nowpromises,
        guPromise
      }
      this.tableData = arr
    }
  }
}
</script>
