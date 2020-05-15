<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="coin_type" label="币种">
      <template slot-scope="scope">{{type[scope.row.coin_type]}}</template>
    </el-table-column>
    <el-table-column prop="buy_type" label="类型">
      <template slot-scope="scope">{{scope.row.buy_type===1?'买跌':"买涨"}}</template>
    </el-table-column>
    <el-table-column prop="multiple" label="杠杆倍数"></el-table-column>
    <el-table-column prop="count" label="数量"></el-table-column>
    <el-table-column prop="open" label="委托价格"></el-table-column>
    <el-table-column prop="show_open_date" label="委托时间" width="180"></el-table-column>

    <el-table-column prop="state" label="状态">
      <template slot-scope="scope">{{state[scope.row.state]}}</template>
    </el-table-column>
    <el-table-column prop="State" label="操作">
      <template slot-scope="scope">
        <el-button type="text" @click="orderCancel(scope.row,scope.tid)">撤销</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { orderCancel, orderList } from '../../../services/index'

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
  5: 'bsv',
  6: 'bch',
  7: 'xrp'
}
export default {
  data () {
    return {
      state: state,
      type: obj,
      tableData: []
    }
  },
  mounted () {
    this.orderList()
  },
  methods: {

    async orderCancel ({ tid }) {
      await orderCancel({ id: tid.toString() })
      await this.orderList()
      await this.$parent.reloadassets()
    },
    async orderList () {
      let { Data } = await orderList({
        page: 1,
        size: 100,
        type: 1
      })
      console.log(Data.list)
      this.tableData = Data.list
    }
  }
}
</script>
