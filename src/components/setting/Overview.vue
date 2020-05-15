<template>
  <div class="overview-warp">
    <div class="title">资金总览</div>
    <div class="all-assets">
      <div class="title">账户总资金 （USDT）</div>
      <div class="num">{{datas.total||0}}</div>
    </div>
    <div class="assets-solt">
      <div class="item">
        <div class="top"></div>
        <div class="row">
          <div class="col">
            <div class="title">
              法币账户
              <span>（USDT）</span>
            </div>
            <div class="value">{{datas.balance.balance||0}}</div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="title" style="margin-top: 10px">
              可用余额
              <span>（USDT）</span>
            </div>
            <div class="value">{{datas.balance.available||0}}</div>
          </div>
          <div class="col">
            <div class="title" style="margin-top: 10px">
              提现冻结
              <span>（USDT）</span>
            </div>
            <div class="value">{{datas.balance.freezeForRefound||0}}</div>
          </div>
        </div>
        <div class="row" style="margin-top: 10px">
          <div class="col">
            <div class="title">
              出售冻结金额
              <span>（USDT）</span>
            </div>
            <div class="value">{{datas.balance.freezeForSell||0}}</div>
          </div>
        </div>
      </div>
      <div class="item item2">
        <div class="top"></div>
        <div class="row">
          <div class="col">
            <div class="title">
              合约账户
              <span>（USDT）</span>
            </div>
            <div class="value">{{datas.contract.balance||0}}</div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="title" style="margin-top: 10px">
              可用余额
              <span>（USDT）</span>
            </div>
            <div class="value">{{datas.contract.available||0}}</div>
          </div>
          <div class="col">
            <div class="title" style="margin-top:10px">
              持仓冻结
              <span>（USDT）</span>
            </div>
            <div class="value">{{datas.contract.hold||0}}</div>
          </div>
        </div>
        <div class="row" style="margin-top: 10px">
          <div class="col">
            <div class="title">
              委托占用保证金
              <span>（USDT）</span>
            </div>
            <div class="value">{{datas.contract.entrust||0}}</div>
          </div>
        </div>
        <!-- <div class="row" style="margin-top: 10px">
          <div class="col">
            <div class="title">
              委托冻结
              <span>（USDT）</span>
            </div>
            <div class="value">{{datas.contract.entrust||0}}</div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { assets } from '../../services/index'

export default {
  data () {
    return {
      datas: {
        balance: {},
        contract: {}
      }
    }
  },
  mounted () {
    this.assets()
  },
  methods: {
    async assets () {
      let data = await assets()
      this.datas = data.Data
    }
  }
}
</script>
<style lang="less" scoped>
.overview-warp {
  padding: 20px 40px;
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgb(39, 34, 34);
  .all-assets {
    margin-top: 20px;
    box-sizing: border-box;
    width: 415px;
    height: 151px;
    background: linear-gradient(
      90deg,
      rgba(51, 125, 253, 1),
      rgba(57, 177, 255, 1)
    );
    border-radius: 4px;
    padding: 27px 22px;
    .title {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 37px;
    }
    .num {
      font-size: 22px;
      font-family: DIN;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 37px;
    }
  }
  .assets-solt {
    display: flex;
    .item {
      margin-top: 30px;
      flex: 1;
      height: 350px;
      background: rgba(255, 255, 255, 1);
      border: 3px solid rgba(122, 188, 246, 1);
      border-radius: 15px;
      .row {
        display: flex;
        padding: 0 22px;
        .col {
          flex: 1;
          overflow: hidden;
          .title {
            display: flex;
            align-items: center;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(0, 0, 0, 1);
            line-height: 37px;
            span {
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(51, 51, 51, 1);
              line-height: 37px;
            }
          }
          .value {
            width: 100%;
            font-size: 22px;
            font-family: DIN;
            font-weight: bold;
            color: rgba(0, 0, 0, 1);
          }
        }
      }
      .top {
        width: 100%;
        height: 9px;
        background: linear-gradient(
          90deg,
          rgba(148, 209, 251, 1),
          rgba(98, 169, 243, 1)
        );
        border-radius: 15px;
        margin-bottom: 25px;
      }
    }
    .item2 {
      margin-left: 20px;
      border: 3px solid rgba(200, 219, 235, 1);

      .top {
        width: 100%;
        height: 9px;
        background: linear-gradient(
          90deg,
          rgba(199, 215, 227, 1),
          rgba(202, 223, 240, 1)
        );
        border-radius: 15px;
        margin-bottom: 25px;
      }
    }
  }
}
</style>
