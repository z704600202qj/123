<template>
  <div class="setting-warp">
    <div class="setting">
      <div class="nav">
        <div class="title">法币交易</div>
        <el-tabs v-model="select" tab-position="left" @tab-click="tabClick">
          <el-tab-pane name="Buy">
            <span slot="label">
              <i class="el-icon-sold-out"></i> 购买USDT
            </span>
          </el-tab-pane>
          <el-tab-pane name="sell">
            <span slot="label">
              <i class="el-icon-sell"></i> 出售USDT
            </span>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="right">
        <component v-bind:is="select" :payMethods="payMethods" :unit="unit" @reload="reload"></component>
      </div>
    </div>
    <div class="tables">
      <div class="title">
        <span></span> 交易记录
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="tid" label="订单编号"></el-table-column>
          <el-table-column prop="merchant_name" label="商户名称"></el-table-column>
          <!-- <el-table-column prop="payMethod" label="付款方式">
             <template slot-scope="scope">
              {{payMethod[scope.row.payMethod]}}
            </template>
          </el-table-column>-->
          <el-table-column prop="state" label="订单状态">
            <template slot-scope="t">
              <div
                v-bind:style="{ color: (t.row.type !== 0 && t.row.state ==4)||( t.row.state ==0)?'#1ec086':'' }"
                @click="configs(t,t.row)"
              >{{((t.row.type == 0 && t.row.state ==4) || (t.row.type == 1 && t.row.state == 3))?'完结':state[t.row.state]}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型">
            <template slot-scope="scope">{{scope.row.type===0?'买单':'卖单'}}</template>
          </el-table-column>

          <el-table-column prop="amount" label="USDT数量"></el-table-column>
          <el-table-column prop="curreny" label="人民币价格"></el-table-column>
          <el-table-column prop="show_created_on" label="创建时间" width="180"></el-table-column>
          <el-table-column prop="show_update_on" label="更新时间" width="180"></el-table-column>

          <!-- <el-table-column prop="type" label="操作">
            <template slot-scope="scope">
              {{scope.row.type===0?'买单':'卖单'}}
            </template>
          </el-table-column>-->
        </el-table>
        <div class="pagination-warp">
          <el-pagination
            background
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="total"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Buy from '@/components/trading/Buy';
import Sell from '@/components/trading/Sell';
import Tables from '@/components/Tables';
// user/otc/transactions
import { assets, transactions, coinUnit, otcConfirm } from '@/services';

export default {
  data () {
    return {
      payMethod: { 0: '微信', 1: '支付宝', 2: '银行' },
      state: {
        0: '交易中',
        1: '用户取消',
        2: '系统取消',
        3: '支付成功',
        4: '商家确认'
      },
      tableData: [],
      select: 'Buy',
      total: 0,
      page: 1,
      pageSize: 10,
      payMethods: {},
      unit: {}
    }
  },
  created () {
    this.getList()
    this.assets()
    this.units()
  },
  methods: {
    reload () {},
    async configs (t, data) {
      if (t.row.type !== 0 && t.row.state === 4) {
        await otcConfirm({ tid: data.tid })
        await this.getList()
      } else if (
        (t.row.type === 0 && t.row.state === 4) ||
        (t.row.type === 1 && t.row.state === 3)
      ) {
      } else if (t.row.state === 0) {
        this.$router.push({
          path: '/buy',
          query: {
            tid: data.tid
          }
        })
      }
    },
    async units () {
      let unit = await coinUnit()
      unit.Data.merchant_buy = (+unit.Data.merchant_buy).toFixed(2)
      unit.Data.merchant_sell = (+unit.Data.merchant_sell).toFixed(2)
      unit.Data.usdtcny = (+unit.Data.usdtcny).toFixed(2)
      this.unit = unit.Data
    },
    async assets () {
      let { Data } = await assets()
      this.payMethods = Data.payMethods
    },
    handleCurrentChange (e) {
      this.page = e
      this.getList()
    },
    tabClick (e) {
      this.select = e.name
    },
    async getList () {
      let { Data } = await transactions({
        page: this.page,
        size: this.pageSize
      })
      this.tableData = Data.list
      this.total = Data.total
    }
  },
  components: {
    Buy,
    Sell,
    Tables
  }
}
</script>
<style lang="less" scoped>
.pagination-warp {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 20px;
  /deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #318afd;
  }
}
.setting-warp {
  width: 100%;
  height: 100%;
  background: rgba(243, 245, 249, 1);
  overflow: hidden;
}
.setting {
  display: flex;
  width: 1200px;
  margin: 0 auto 10px;
  overflow: hidden;
  .nav {
    box-sizing: border-box;
    width: 260px;
    height: 594px;
    background: rgba(255, 255, 255, 1);
    margin-top: 10px;
    .title {
      margin-left: 27px;
      height: 79px;
      line-height: 79px;
      width: 260px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
    }
    /deep/.el-tabs--left .el-tabs__header.is-left {
      width: 260px;
      .el-tabs__active-bar {
        height: 50px;
        background-color: #318afd;
        width: 5px;
      }
      .el-tabs__item.is-active {
        color: #318afd;
        background: rgba(243, 245, 249, 1);
      }
      .el-tabs__nav-wrap::after {
        background-color: unset;
      }
      .el-tabs__item {
        padding-left: 47px;

        height: 50px;
        line-height: 50px;
        text-align: left;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
    }
  }
  .right {
    margin-left: 10px;
    margin-top: 10px;
    width: 930px;
    height: 594px;
    background: rgba(255, 255, 255, 1);
  }
}
.tables {
  box-sizing: border-box;
  margin: 0 auto 10px;
  padding: 20px 25px;
  width: 1200px;
  background: rgba(255, 255, 255, 1);
  .title {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    margin-bottom: 20px;
    span {
      display: block;
      margin-right: 10px;
      width: 4px;
      height: 14px;
      background: #318afd;
      border-radius: 2px;
    }
  }
}
</style>
