<template>
  <div class="buy-warp">
    <div class="title">资金划转</div>
    <div class="c-input">
      <div class="label">币种：USDT</div>
      <div class="change">
        <div class="left">
          <img src="../../assets/image/line.png" alt />
          <div class="left2">
            <div class="left2-item">
              <span class="text">从</span>
              <div class="line line1">
                <div class="label">{{step1}}</div>
                <div class="unit">USDT</div>
              </div>
            </div>
            <div class="left2-item">
              <span class="text">到</span>
              <div class="line ">
                <div class="label">{{step2}}</div>
                <div class="unit">USDT</div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <img src="../../assets/image/changebtn.png" @click="changes" alt />
        </div>
      </div>
    </div>
    <div class="c-input">
      <div class="label">可划转数量：{{step1==='资金账户'?balanceavailable:contractavailable}} USDT</div>
      <el-input type="number" v-model="amount" placeholder="请输入划转数量" />
    </div>

    <div class="btn" @click="pass">确认</div>
    <div class="tip">
      <Tip />
    </div>
  </div>
</template>
<script>
// changebtn.png
import { balancedivert } from '../../services/index'
import Dialog from '@/components/Dialog'

import Tip from './Tip'
export default {
  props: ['contractavailable', 'balanceavailable'],
  data () {
    return {
      dialogShow: false,
      step1: '资金账户',
      step2: '合约账户',
      amount: ''
    }
  },
  components: {
    Tip,
    Dialog
  },
  methods: {
    changes () {
      let step0 = this.step1
      this.step1 = this.step2
      this.step2 = step0
    },
    async pass () {
      await balancedivert({
        from: this.step1 === '资金账户' ? 0 : 1,
        to: this.step2 === '合约账户' ? 1 : 0,
        amount: this.amount
      })
      this.$emit('reload')
      this.amount = ''
    },
    balancedivert () {
      this.dialogShow = true
    }
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
    margin-top: 30px;
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
    .change {
      box-sizing: border-box;
      display: flex;
      width: 100%;
      height: 150px;
      background: rgba(0, 193, 133, 0);
      border: 1px solid rgba(222, 230, 230, 1);
      border-radius: 5px;
      .right {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 144px;
        height: 150px;
        background: rgba(247, 247, 251, 1);
        border-radius: 4px;
        img {
          width: 58px;
          height: 58px;
        }
      }
      .left {
        flex: 1;
        display: flex;
        align-items: center;
        img {
          margin: 0 16px;
          width: 7px;
          height: 75px;
        }
        .line {
          height: 75px;
          padding-left: 20px;
          display: flex;
          // align-items: center;
          justify-content: center;
            flex: 1;

          flex-direction: column;
        }
        .line1 {
          border-bottom: 1px solid rgba(194, 205, 211, 1);
        }
        .left2{
          display: flex;
flex-direction:column;
          flex: 1;
          margin-right: 20px;
        }
        .left2-item {
          flex: 1;
          height: 75px;
          display: flex;
          justify-content: center;
          align-items: center;
          .text {
            margin-right: 14px;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgb(147, 158, 167);
          }
          .label {
            height: 19px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
            margin-bottom: 10px;
          }
          .unit {
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(117, 127, 134, 1);
          }
        }
      }
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

    /deep/.el-input__inner {
      font-size: 14px;
      color: rgba(124, 124, 124, 1);
      height: 50px;
      line-height: 50px;
      border: 1px solid rgba(210, 210, 210, 1);
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
