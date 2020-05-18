<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="coin_type" label="币种">
        <template slot-scope="scope">{{type[scope.row.coin_type]}}</template>
      </el-table-column>

         <el-table-column prop="buy_type" label="类型">
      <template slot-scope="scope">{{scope.row.buy_type===1?'买跌':"买涨"}}</template>
    </el-table-column>
      <el-table-column prop="multiple" label="杠杆倍数"></el-table-column>
      <el-table-column prop="count" label="数量"></el-table-column>
      <el-table-column prop="open" label="开仓价格"></el-table-column>
      <el-table-column prop="income" label="盈亏"></el-table-column>
      <el-table-column prop="fee" label="手续费"></el-table-column>
    <el-table-column prop="promise" label="占用保证金"  width="120"></el-table-column>
      <el-table-column prop="show_open_date" label="开仓时间">
       <template slot-scope="scope">
        {{scope.row.state!==4&&scope.row.state!==5?scope.row.show_open_date:''}}
       </template>
      </el-table-column>
      <el-table-column prop="show_delivery_date" label="平仓时间">
         <template slot-scope="scope">
        {{scope.row.state!==4&&scope.row.state!==5?scope.row.show_delivery_date:''}}
         </template>
      </el-table-column>
      <el-table-column prop="low" label="止损价格"></el-table-column>
      <el-table-column prop="high" label="止盈价格"></el-table-column>
      <el-table-column prop="state" label="状态" width="120">
        <template slot-scope="scope">{{state[scope.row.state]}}</template>
      </el-table-column>
    </el-table>
    <div class="pagination-warp">
      <el-pagination background :page-size="10"    layout="prev, pager, next, jumper"
          @current-change="handleCurrentChange" :total="total"></el-pagination>
    </div>
  </div>
</template>
<script>
import { orderList } from '../../../services/index'
const state = {
  0: '委托单',
  1: '持仓单',
  2: '手动平仓',
  3: '系统强制平仓',
  4: '手动撤销',
  5: '系统撤销'
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
  data () {
    return {
      page: 1,
      total: 0,
      state: state,
      type: obj,
      tableData: []
    }
  },
  mounted () {
    this.orderList()
  },
  methods: {
    handleCurrentChange (e) {
      this.page = e
      this.orderList()
    },
    async orderList () {
      if (this.selectTab !== 2) {
        let { Data } = await orderList({
          page: this.page,
          size: 10,
          type: 2
        })
        this.total = Data.total
        let arr = Data.list.map(item => {
          if (item.income > 0) {
            item.income = item.signed ? '+' + item.income : '-' + item.income
          }
          return item
        })
        this.tableData = arr
      }
    }
  }
}
</script>
<style lang="less" >
.pagination-warp {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 20px;
  /deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #318afd;
  }
}

</style>
