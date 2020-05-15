<template>
  <div class="tables-list">
    <div class="btns">
      <div class="btns-left">
        <div class="div" :class="selectTab===0?'active':''" @click="select(0)">当前持仓</div>
        <div class="div" :class="selectTab===1?'active':''" @click="select(1)">委托中</div>
        <div class="div" :class="selectTab===2?'active':''" @click="select(2)">平仓记录</div>
      </div>

      <div class="btns-right" v-if="selectTab===0">
        <!-- <div class="account-status" v-if="token&&Object.keys(assets).length>0">
          <span>持仓总盈亏：-1002 usdt</span>
          <span>占用保障金：-1002 usdt</span>
          <span>风险率：-1002 usdt</span>
        </div>-->
        <div class="active div" v-if="showBtn" @click="orderSell({tid:-1})">一键平仓</div>
      </div>
      <div v-if="selectTab===1">
        <div class="active div" v-if="showBtn" @click="orderCancel({tid:-1})">一键撤销</div>
      </div>
    </div>
    <div v-if="token&&Object.keys(assets).length>0">
      <Current :updateData="updateData" v-if="selectTab===0" ref="currentDom" />
      <Ing v-if="selectTab===1" ref="ingDom" />
      <Record v-if="selectTab===2" />
    </div>
    <div class="un-login" v-else>
      <img src="../../assets/image/unlist.png" alt />
    </div>
  </div>
</template>
<script>
import Tables from '../Tables'
import Current from './table/current'
import Record from './table/record'
import Ing from './table/ing'

import { orderList } from '../../services/index'
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
const state = {
  0: '持仓中',
  1: '委托中',
  2: '已平仓',
  3: '强制平仓'
}
export default {
  props: ['assets', 'updateData'],
  data () {
    return {
      Low_price: null,
      High_price: null,
      type: obj,
      state: state,
      selectTab: 0,
      page: 1,
      size: 20,
      tableData: [],
      token: '',
      showBtn: true
    }
  },

  components: {
    Tables,
    Current,
    Record,
    Ing
  },
  mounted () {
    let tokenid2 = localStorage.getItem('info')
    let { token } = JSON.parse(tokenid2) || { token: '' }
    if (token) {
      this.token = token
      this.orderList()
    }
  },
  methods: {
    reloadassets () {
      this.$parent.assets()
    },
    reloadList () {
      this.$refs.currentDom.orderList()
    },
    orderSell (e) {
      this.$refs.currentDom.orderSell(e)
    },
    orderCancel (e) {
      this.$refs.ingDom.orderCancel(e)
    },
    select (e) {
      this.selectTab = e
      this.page = 1
      this.orderList()
    },
    async orderList () {
      if (this.selectTab !== 2) {
        let { Data } = await orderList({
          page: this.page,
          size: 100,
          type: this.selectTab
        })
        this.showBtn = Data.list.length > 0
        console.log(Data.list.length)
      }
    }
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

.tables-list {
  box-sizing: border-box;
  margin: 10px auto;
  padding: 17px 10px;
  width: 1200px;
  background: rgba(255, 255, 255, 1);
  .btns {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .btns-left {
      display: flex;
      background: unset;
      align-items: center;
    }
    .btns-right {
      display: flex;
      align-items: center;
    }
    .account-status {
      margin-right: 10px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .div {
      cursor: pointer;
      margin-right: 10px;
      width: 120px;
      text-align: center;
      height: 40px;
      line-height: 40px;
      background: rgba(236, 239, 243, 1);
      border-radius: 2px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }
    .active {
      color: rgba(255, 255, 255, 1);
      background: #318afd;
    }
  }
  .un-login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 356px;
    img {
      width: 280px;
      height: 178px;
    }
  }
}
</style>
