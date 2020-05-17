<template>
  <div class="up-warp">
    <div class="paddings">
      <div class="select">
        <div :class="select===1?'active':''" @click="selectTab(1)">限价</div>
        <div :class="select===2?'active':''" @click="selectTab(2)">市价</div>
      </div>
      <div class="content">
        <div class="item">
          <div class="label">杠杆：</div>
          <div class="form">
            <el-select v-model="multiple" placeholder="请选择" style="width:100%;height:40px">
              <el-option  :key="20" label="20x" :value="20"></el-option>
              <el-option  :key="30" label="30x" :value="30"></el-option>
              <el-option  :key="50" label="50x" :value="50"></el-option>
              <el-option  :key="100" label="100x" :value="100"></el-option>

            </el-select>
          </div>
        </div>
        <div class="item">
          <div class="label">价格：</div>
          <div class="form">
            <el-input type="number" @input="inputValue" :value="open" v-if="select===1" placeholder="请输入价格..." />
            <el-input disabled placeholder="请输入价格..." :value="currentPrice" v-else />
          </div>
        </div>
        <div class="item">
          <div class="label">数量：</div>
          <div class="form">
            <el-input-number
            v-if="!perc"
              style="width:100%"
              v-model="count"
              :min="1"
              :max="10"
              :step="1"
              step-strictly
              placeholder="请输入数量"
            ></el-input-number>
            <el-input disabled placeholder="请输入数量..." :value="canBuy" v-else />

          </div>
        </div>
        <div class="item">
          <div class="label"></div>
          <div class="form tip">
            1张={{tips.combine}}
            <span>可开数量 {{Math.floor(openNum)}}张</span>
          </div>
        </div>
        <div class="item">
          <div class="label"></div>
          <div class="form">
            <SelectRate v-model="perc" />
          </div>
        </div>
        <div class="item">
          <div class="label"></div>
          <div class="form tip" v-if="Object.keys(assets).length>0">
            <div>
              可用余额：
              <span>{{assets.contract.available||'0.00'}} USDT</span>
            </div>
            <div>
              所用保证金：
              <span>{{security.toFixed(2)}} USDT</span>
            </div>
          </div>
        </div>
        <div class="btn" @click="submit">买入开多</div>
      </div>
    </div>
  </div>
</template>
<script>
// 手续费 = 开仓价 * 张数 * 每张数量 * 手续费率(0.0008) * 杠杆
// 收益 = 差价 * 张数 * 每张的数量 * 杠杆
import { order } from '../../services/index'
import SelectRate from '@/components/SelectRate.vue'

export default {
  props: ['list', 'assets', 'tips'],
  data () {
    return {
      perc: '',
      select: 1,
      open: '',
      multiple: 100,
      count: 1,
      currentPrice: 0,
      securityData: 0
    }
  },
  components: {
    SelectRate
  },
  watch: {
    list: {
      handler (r) {
        let arr = r.filter(item => {
          if (item) {
            if (item.cion === this.$route.query.icon) {
              return item
            }
          }
        })
        let bchusdtData = arr[0]
        if (bchusdtData) {
          this.currentPrice = bchusdtData.close
        }
      },
      deep: true
    }
  },
  computed: {
    // 可用余额 * 百分比 / 每张所需保证金（现价 / 倍数 * 1 * 1张多少数量） = 可开张数
    canBuy: function () {
      let currentNum = this.select === 1 ? this.open : this.currentPrice
      let num = 0
      if (Object.keys(this.assets).length > 0) {
        if (this.assets.contract.balance * (this.perc / 100) && ((currentNum / this.multiple))) {
          num = (this.assets.contract.balance * (this.perc / 100)) / ((currentNum / this.multiple) * this.count * this.tips.num)
        }
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return num.toFixed(0)
    },
    // 保证金= 现价 / 杠杆 * 张数 * 1张多少数量 ✅

    security: function () {
      let currentNum = this.select === 1 ? this.open : this.currentPrice
      return (currentNum / this.multiple) * this.count * this.tips.num
    },
    // 可开张数 = 余额 / 每张所需保证金✅
    openNum: function () {
      let num = 0
      if (Object.keys(this.assets).length > 0) {
        let currentNum = this.select === 1 ? this.open : this.currentPrice
        num = currentNum ? this.assets.contract.balance / ((currentNum / this.multiple) * this.tips.num) : 0
      }
      return num
    }
  },

  methods: {
    inputValue (e) {
      if (e > 0) {
        this.open = e
        return
      }
      this.open = ''
    },
    selectTab (e) {
      this.select = e
      this.open = ''
    },
    async submit () {
      let icon = this.$route.query.icon

      let obj = {
        btcusdt: 0,
        ethusdt: 1,
        eosusdt: 2,
        etcusdt: 3,
        ltcusdt: 4,
        // bsvusdt: 5,
        bchusdt: 5,
        xrpusdt: 6
      }
      if ((this.select === 1 && this.open && this.open > 0) || this.select === 2) {
        await order({
          coin_type: obj[icon],
          multiple: this.multiple,
          open: this.open.toString(),
          buy_type: 0,
          perc: +this.perc,
          count: this.perc > 0 ? +this.canBuy : this.count
        })
        this.$emit('reload')
        this.$parent.assets()
      } else {
        this.$message({ type: 'error', message: '请输入金额' })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.up-warp {
  width: 100%;
  box-sizing: border-box;
  height: 430px;
  background: rgba(255, 255, 255, 1);
  margin-left: 10px;

  .paddings {
    padding: 14px 13px;
  }
  /deep/.el-input__inner {
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    border: 2px solid rgba(194, 205, 211, 1);
  }
  /deep/.el-input-number__decrease,
  /deep/ .el-input-number__increase {
    height: 36px;
    line-height: 36px;
    margin-top: 1px;
    color: #757f86;
    font-size: 20px;
  }
  /deep/ .el-radio-group {
    background: rgba(30, 192, 134, 0);
    border: 2px solid rgba(194, 205, 211, 1);
    border-radius: 4px;
  }
  /deep/ .el-radio-button__inner {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    background: rgba(30, 192, 134, 0);
    border-radius: 4px;
    border: none;

    font-size: 14px;
    font-family: DIN;
    font-weight: 400;
    color: rgba(117, 127, 134, 1);
  }
  /deep/.el-radio-button__orig-radio:checked + .el-radio-button__inner {
    box-shadow: unset;
    background: rgba(30, 192, 134, 1);
    border-radius: 0;
    color: #fff;
  }
  .select {
    width: 70%;
    margin: 0 auto 10px;
    display: flex;
    justify-content: space-around;
    height: 50px;
    div {
      cursor: pointer;
      height: 24px;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 600;
      line-height: 36px;
      position: relative;
    }
    .active {
      color: #318AFD;
      &:after {
        content: "";
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: auto;
        bottom: -15px;
        right: auto;
        height: 4px;
        width: 27px;
        background-color: #318AFD;
      }
    }
  }
  .content {
    .item {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      .label {
        width: 50px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
      .form {
        flex: 1;
      }
      .tip {
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 300;
        color: rgba(153, 153, 153, 1);

        span {
          margin-left: 15px;
        }
      }
    }
    .btn {
      margin: 0 auto;
      width: 339px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      cursor: pointer;

      background: #38c764;
      border-radius: 4px;

      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
