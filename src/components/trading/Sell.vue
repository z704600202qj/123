<template>
  <div class="buy-warp">
    <div class="title">出售 USDT</div>
    <div class="sub-title">小额快速交易</div>
    <div class="exp">
      <img class="rq" src="../../assets/image/rq.png" alt /> USDT参考单价：{{unit.merchant_sell}} CNY/USDT
    </div>
    <div class="select">
      <div
        :class="selectSell==='account'?'item active':'item'"
        @click="selectSellMeth('account')"
      >按金额出售</div>
      <div :class="selectSell==='num'?'item active':'item'" @click="selectSellMeth('num')">按数量出售</div>
    </div>

     <div class="c-input">
      <div class="label">{{selectSell==='account'?'输入卖出金额':'输入卖出数量'}}</div>
      <el-input :value="values" @input="changeValue" :placeholder="selectSell==='account'?'请输入卖出金额':'请输入卖出数量'" :class="haserror?'input-error':''">
        <div class="slot-text" slot="suffix">{{selectSell==='account'?'CNY':'USDT'}}</div>
      </el-input>
      <div class="error" v-show="haserror">最大卖出数量0.000671USDT</div>
    </div>
    <div class="get-select">
      <!-- <div class="title">
        <div class="text">选择收款方式</div>
      </div> -->
      <!-- <div class="select-pay">
        <div class="select-item" v-for="(item) in payMethods" :key="item.type" @click="selectPay(item.type)">
          <div class="select-item-desc">
            <img class="logo" v-if='item.type===0' src="../../assets/image/wx.png" alt />
            <img class="logo" v-if='item.type===2' src="../../assets/image/bank.png" alt />
            <img class="logo" v-if='item.type===1' src="../../assets/image/zhi.png" alt />

            <div class="name">{{type[item.type]}}</div>
            <div class="account">{{item.account}}</div>
          </div>
          <img class="select-icon" :src="payMeth===item.type?selectimg:unselectimg"  alt />
        </div>
      </div> -->
      <div class="sell-info">
        <div class="row">
          <div class="col">成交单价：</div>
          <div class="col color">{{unit.merchant_sell}} CNY/USDT</div>
        </div>
        <div class="row">
          <div class="col">成交数量：</div>
          <div class="col black">{{selectSell==='num'?values||0:(values/unit.merchant_sell).toFixed(2)||0}} USDT</div>
        </div>
        <div class="row">
          <div class="col">实付金额：</div>
          <div class="col black">{{selectSell==='num'?(unit.usdtcny*values).toFixed(2)||0:values||0}} CNY</div>
        </div>
      </div>
    </div>
    <div class="btn" @click="sell">出售USDT</div>
    <div class="tip">
      <Tip />
    </div>
    <Dialog v-model="dialogShow" @pass='pass'/>
  </div>
</template>
<script>
import Tip from './Tip'
import Dialog from '@/components/Dialog'

import {otcSell, coinUnit} from '../../services/index'
const select = require('../../assets/image/select.png')
const unselect = require('../../assets/image/un_select.png')
let info = localStorage.getItem('info')
export default {
  props: ['payMethods', 'unit'],

  data () {
    return {
      type: ['微信', '支付宝', '银行卡'],
      info: JSON.parse(info),
      selectimg: select,
      unselectimg: unselect,
      haserror: false,
      dialogShow: false,
      selectSell: 'account',
      payMeth: 0,
      values: ''
    }
  },
  mounted () {
    let infos = localStorage.getItem('info')
    this.info = JSON.parse(infos)
    // this.units()
  },
  methods: {
    selectSellMeth (e) {
      this.selectSell = e
      this.values = ''
    },
    selectPay (e) {
      this.payMeth = e
    },
    changeValue (e) {
      if (e > 0) {
        this.values = e
        return
      }
      this.values = ''
    },
    async units () {
      let unit = await coinUnit()
      this.unit = unit.Data
    },
    async pass () {
      let obj = this.selectSell === 'account'
        ? { curreny: Number(this.values) }
        : { amount: this.values + '' }
      let num = this.selectBuy === 'account' ? this.values / this.unit.merchant_buy : this.values
      if (num >= 100 && num <= 10000) {
        let data = await otcSell({
          payMethod: this.payMethod,
          ...obj
        })
        if (data.Code === 0) {
          this.$router.push({path: '/sell',
            query: {
              tid: data.Data.tid
            }})
        }
      } else {
        this.$message.error('单次交易最少100 USDT，最多10000 USDT')
      }
    },
    sell () {
      if (this.values > 0) {
        this.dialogShow = true
      } else {
        this.$message.error('请输入正确数字')
      }
    }
  },
  components: {
    Tip,
    Dialog
  }
}
</script>
<style lang="less" scoped>
.buy-warp {
  padding: 20px 60px;
  .title {
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
  }
  .sub-title {
    margin-top: 15px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(173, 177, 186, 1);
  }
  .exp {
    display: flex;
    align-items: center;
    margin-top: 10px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(173, 177, 186, 1);
    .rq {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }
  .select {
    display: flex;
    margin-top: 20px;
    .item {
      cursor: pointer;
      width: 130px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      background: rgba(236, 239, 243, 1);
      color: rgba(0, 0, 0, 1);
      font-size: 14px;
      border-radius: 2px;
      margin-right: 7px;
    }
    .active {
      background: #318afd;
      color: #ffffff;
    }
  }
  .c-input {
    margin-top: 30px;
    .label {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      margin-bottom: 15px;
    }
    .slot-text {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-right: 15px;
      span {
        color: rgba(102, 102, 102, 1);
      }
    }
    .error {
      margin-top: 10px;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(255, 67, 107, 1);
    }
    .input-error {
      /deep/.el-input__inner {
        font-size: 14px;
        color: rgba(124, 124, 124, 1);
        height: 50px;
        line-height: 80px;
        border: 1.5px solid rgba(255, 67, 107, 1);
      }
    }
    /deep/ .el-input {
      height: 50px;
      line-height: 50px;
    }
    /deep/.el-input__inner {
      font-size: 14px;
      color: rgba(124, 124, 124, 1);
      height: 50px;
      line-height: 50px;
      border: 1px solid rgba(210, 210, 210, 1);
    }
  }
  .sell-info {
    margin-top: 27px;

    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .col {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #abb2b6;
    }
    .black {
      color: rgba(0, 0, 0, 1);
    }
    .color {
      color: #318afd;
    }
  }
  .get-select {
    .title {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      .btns {
        cursor: pointer;
        color: #318afd;
      }
    }
    .select-pay {
      box-sizing: border-box;
      margin-top: 15px;
      display: flex;
      align-items: center;

      .select-item {
        cursor: pointer;
        position: relative;
        width: 230px;
        height: 96px;
        margin-right: 25px;
        line-height: 96px;
        text-align: center;
        background: rgba(255, 255, 255, 1);
        border: 2px solid rgba(222, 230, 230, 1);
        border-radius: 10px;
        font-size: 22px;
        color: rgba(0, 0, 0, 1);
        img {
          position: absolute;
          right: -2px;
          bottom: 0;
        }
      }
      .select-item-active {
        border: 2px solid #318afd;
      }
    }
  }
  .tip {
    margin-top: 15px;
  }
  .btn {
    width: 100%;
    height: 56px;
    line-height: 56px;
    background: #318afd;
    border-radius: 2px;
    text-align: center;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    margin: 0 auto;
    cursor: pointer;
  }
}
</style>
