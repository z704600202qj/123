<template>
  <div class="setting-warp">
    <div class="setting">
      <div class="nav">
        <div class="title">充值提现</div>
        <el-tabs v-model="select" tab-position="left" @tab-click="tabClick">
          <el-tab-pane name="TopUp">
            <span slot="label">
              <i class="el-icon-s-marketing"></i> 我要充币
            </span>
          </el-tab-pane>
          <el-tab-pane name="Withdrawal">
            <span slot="label">
              <i class="el-icon-s-finance"></i> 我要提币
            </span>
          </el-tab-pane>
          <el-tab-pane name="Change">
            <span slot="label">
              <i class="el-icon-guide"></i> 资金划转
            </span>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="right">
        <component
          v-bind:is="select"
          :balanceavailable="balanceavailable"
          :contractavailable="contractavailable"
          @reload="reload"
        ></component>
      </div>
    </div>
    <div class="tables">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="tid" label="订单编号"></el-table-column>
        <el-table-column prop="type" label="账单类型">
          <template slot-scope="scope">{{type[scope.row.type]}}</template>
        </el-table-column>
        <el-table-column prop="withdraw_addr" label="提现地址"></el-table-column>
        <el-table-column prop="amount" label="操作的币数量"></el-table-column>
        <el-table-column prop="fee" label="手续费"></el-table-column>
        <el-table-column prop="show_operate_date" label="操作时间" width="180"></el-table-column>
        <el-table-column prop="state" label="状态" width="100">
          <template slot-scope="scope">{{state[scope.row.state]}}</template>
        </el-table-column>
      </el-table>
      <div class="pagination-warp">
        <el-pagination
          background
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import TopUp from '@/components/handle/TopUp'
import Withdrawal from '@/components/handle/Withdrawal'
import Change from '@/components/handle/Change'
//
import { assets, bill } from '../services/index'
export default {
  data () {
    return {
      type: ['充值', '提币', '资金账户->合约账户', '合约账户->资金账户'],
      state: {0: '待审核', 1: '进行中', 2: '已完成', 3: '已取消', 4: '提现拒绝'},
      select: this.$route.query.type || 'TopUp',
      balanceavailable: 0,
      contractavailable: 0,
      tableData: [],
      total: 0,
      currentPage: 1
    }
  },
  created () {
    this.bill()
    this.assets()
  },
  methods: {
    reload () {
      this.currentPage = 1
      this.bill()
      this.assets()
    },
    handleCurrentChange (e) {
      this.currentPage = e
      this.bill()
    },
    async bill () {
      let { Data } = await bill({
        page: this.currentPage,
        size: 10
      })
      this.total = Data.total
      this.tableData = Data.list
    },
    async assets () {
      let { Data } = await assets()
      this.balanceavailable = Data.balance.available
      this.contractavailable = Data.contract.available
    },

    tabClick (e) {
      this.select = e.name
    }
  },
  components: {
    TopUp,
    Withdrawal,
    Change
  }
}
</script>
<style lang="less" scoped>
.setting-warp {
  width: 100%;
  height: 100%;
  background: rgba(243, 245, 249, 1);
  overflow: hidden;
}
.tables {
  width: 1200px;
  margin: 0 auto 10px;
  .pagination-warp {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: 20px;
    /deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #318afd;
    }
  }
}

.setting {
  display: flex;
  width: 1200px;
  margin: 0 auto 10px;
  overflow: hidden;
  .nav {
    box-sizing: border-box;
    width: 260px;
    height: 780px;
    background: rgba(255, 255, 255, 1);
    margin-top: 10px;
    .title {
      margin-left: 27px;
      height: 60px;
      line-height: 60px;
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
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    margin-bottom: 20px;
    span {
      display: block;
      margin-right: 10px;
      width: 4px;
      height: 24px;
      background: rgba(0, 193, 133, 1);
      border-radius: 2px;
    }
  }
}
</style>
