<template>
  <div class="buy-warp">
    <div class="title">提现</div>

    <div class="select">
      <div :class="select==='erc'?'item active':'item'" @click="slect('erc')">USDT-ERC20</div>
      <div :class="select==='omni'?'item active':'item'" @click="slect('omni')">USDT-OMNI</div>
    </div>
    <div class="c-input">
      <div class="label">
        <div>* 提币地址</div>
        <!-- <span>管理地址</span> -->
      </div>
      <el-input v-model="address" placeholder="请输入地址" />
      <div v-if="!address" style="color:red">请输入地址</div>
    </div>
    <div class="c-input">
      <div class="label">
        <div>* 数量</div>
        <span>可用余额：{{balanceavailable}}</span>
      </div>
      <el-input type="number" v-model="amount" min="100" placeholder="请输入数量" />
      <div v-if="amount<100" style="color:red">数量不可小于100</div>
    </div>
    <div class="c-input">
      <div class="label">手续费</div>
      <el-input type="number" :value="sellpay" disabled placeholder="手续费自动显示" />
    </div>
    <div class="c-input">
      <div class="label">到账数量</div>
      <el-input type="number" :value="amount-sellpay" disabled placeholder="手续费自动显示" />
    </div>

    <div class="btn" @click="withdraw">确认</div>
    <div class="tip">
      <Tip />
    </div>
    <Dialog v-model="dialogShow" @pass='pass'/>

  </div>
</template>
<script>
import Tip from './Tip'
import Dialog from '@/components/Dialog'

import { coinFee, withdraw } from '@/services'
export default {
  data () {
    return {
      select: 'erc',
      address: '',
      amount: 100,
      sellpay: 1,
      dialogShow: false
    }
  },
  mounted () {
  },
  watch: {
    select: function (e) {
      this.sellpay = e === 'erc' ? 1 : 5
    }
  },
  methods: {
    slect (e) {
      this.select = e
    },
    async  pass () {
      if (this.amount >= 100 && this.address) {
        await withdraw({
          address: this.address,
          chan: this.select,
          amount: (this.amount).toString()
        })
        this.$emit('reload')
      }
    },
    withdraw () {
      if (this.amount >= 100 && this.address) {
        this.dialogShow = true
      }
    }
  },
  props: ['balanceavailable'],
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
  .c-input {
    margin-top: 14px;
    .label {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        color: #318afd;
      }
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
      width: 100%;
    }
    /deep/.el-select {
      width: 100%;
    }
    /deep/.el-input__inner {
      font-size: 14px;
      color: rgba(124, 124, 124, 1);
      height: 50px;
      line-height: 50px;
      border: 1px solid rgba(210, 210, 210, 1);
    }
  }
  .select {
    display: flex;
    margin-top: 30px;
       .item {
      cursor: pointer;
      width: 130px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      background: #eceff3;
      color: #000000;
      font-size: 14px;
      border-radius: 2px;
      margin-right: 15px;
    }
    .active {
      background: #318afd;
      color: #ffffff;
    }
  }

  .tip {
    margin-top: 15px;
  }
  .btn {
    cursor: pointer;
    margin: 25px auto;
    width: 728px;
    height: 64px;
    line-height: 64px;
    text-align: center;
    background: #318afd;
    border-radius: 2px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
