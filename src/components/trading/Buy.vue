<template>
  <div class="buy-warp">
    <div class="title">购买 USDT</div>
    <div class="sub-title">小额快速交易</div>
    <div class="exp">
      <img class="rq" src="../../assets/image/rq.png" alt />
      USDT参考单价：{{unit.merchant_buy}} CNY/USDT
    </div>
    <div class="select">
      <div
        :class="selectBuy==='account'?'item active':'item'"
        @click="selectBuyMeth('account')"
      >按金额购买</div>
      <div :class="selectBuy==='num'?'item active':'item'" @click="selectBuyMeth('num')">按数量购买</div>
    </div>
    <div class="c-input">
      <div class="label">{{selectBuy==='account'?'输入购买金额':'输入购买数量'}}</div>
      <el-input
        :value="values"
        @input="changeValue"
        :placeholder="selectBuy==='account'?'请输入购买金额':'请输入购买数量'"
        :class="haserror?'input-error':''"
      >
        <div class="slot-text" slot="suffix">{{selectBuy==='account'?'CNY':'USDT'}}</div>
      </el-input>
      <div class="error" v-show="haserror">最大卖出数量0.000671USDT</div>
    </div>
    <div class="get-select">
      <!-- <div class="title">
        <div class="text">选择付款方式</div>
      </div>
      <div class="select-pay">
        <div :class="selectPay===1?'select-item select-item-active':'select-item'" @click="selectPayMeth(1)">支付宝 <img src="../../assets/image/right_icon.png" v-if="selectPay==='ali'" alt=""></div>
        <div :class="selectPay===2?'select-item select-item-active':'select-item'"  @click="selectPayMeth(2)">银行卡 <img src="../../assets/image/right_icon.png"  v-if="selectPay==='bank'" alt=""></div>
        <div :class="selectPay===0?'select-item select-item-active':'select-item'"  @click="selectPayMeth(0)">微信 <img src="../../assets/image/right_icon.png"  v-if="selectPay==='wx'" alt=""></div>
      </div>-->
      <div class="sell-info">
        <div class="row">
          <div class="col">成交单价：</div>
          <div class="col color">{{unit.merchant_buy}} CNY/USDT</div>
        </div>
        <div class="row">
          <div class="col">成交数量：</div>
          <div class="col black">{{selectBuy==='account'?values/unit.merchant_buy:values||0}} USDT</div>
        </div>
        <div class="row">
          <div class="col">实付金额：</div>
          <div class="col black">{{selectBuy==='account'?(values||0):values*unit.merchant_buy }} CNY</div>
        </div>
      </div>
    </div>
    <div class="btn" @click="buy">购买USDT</div>
    <div class="tip">
      <Tip />
    </div>
    <Dialog v-model="dialogShow" @pass="pass" />
  </div>
</template>
<script>
import Tip from './Tip'
import Dialog from '@/components/Dialog'

import { otcBuy, coinUnit } from '../../services/index'

export default {
  props: ['unit'],
  data () {
    return {
      haserror: false,
      dialogShow: false,
      selectBuy: 'account',
      selectPay: 1,
      values: ''
    }
  },
  mounted () {
    // this.units()
  },
  methods: {
    selectBuyMeth (e) {
      this.selectBuy = e
      this.values = ''
    },
    selectPayMeth (e) {
      this.selectPay = e
    },
    changeValue (e) {
      if (e > 0) {
        if (this.selectBuy === 'account') {
          this.values = e
        } else {
          this.values = parseInt(e)
        }
        return
      }
      this.values = ''
    },
    // async units () {
    //   let unit = await coinUnit()
    //   this.unit = unit.Data
    // },
    async pass (e) {
      if (e) {
        let obj =
          this.selectBuy === 'account'
            ? { curreny: Number(this.values) }
            : { amount: this.values+'' }
        let num = this.selectBuy === 'account' ? this.values / this.unit.merchant_buy : this.values
        if (num >= 100 && num <= 10000) {
          let data = await otcBuy({
            ...obj
          })
          if (data.Code === 0) {
            this.$router.push({
              path: '/buy',
              query: {
                tid: data.Data.tid
              }
            })
          }
          this.$emit('reload')
        } else {
          this.$message.error('单次交易最少100 USDT，最多10000 USDT')
        }
      }
    },
    buy () {
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
