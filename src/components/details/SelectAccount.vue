<template>
  <div>
    <div class="account" v-if="token&&Object.keys(assets).length>0">
      <div class="select"  v-if="Object.keys(assets).length>0" >
        <div :class="select===1?'item active':'item'" @click="seletAccount(1)">
          <div class="title">法币账户(USDT)</div>
          <div class="num">{{assets.balance.balance}}</div>
          <span></span>
        </div>
        <div :class="select===2?'item active':'item'" @click="seletAccount(2)">
          <div class="title">合约账户(USDT)</div>
          <div class="num">{{assets.contract.balance}}</div>
          <span></span>
        </div>
      </div>
      <div class="content"  v-if="Object.keys(assets).length>0">
        <div class="row"  v-if="select===1">
          <div class="col">
            <span class="title">可用余额(USDT)</span>
            <span class="num">{{assets.balance.available||'0.00'}}</span>
          </div>
          <div class="col">
            <span class="title">出售冻结(USDT)</span>
            <span class="num">{{assets.balance.freezeForSell||'0.00'}}</span>
          </div>
        </div>
           <div class="row" v-if="select===1">
          <div class="col">
            <span class="title">提现冻结(USDT)</span>
            <span class="num">{{assets.balance.freezeForRefound}}</span>
          </div>
        </div>
        <div class="row" v-if="select===2">
          <div class="col">
            <span class="title">可用余额(USDT)</span>
            <span class="num">{{assets.contract.available}}</span>
          </div>
          <div class="col">
            <span class="title">委托占用(USDT)</span>
            <span class="num">{{assets.contract.entrust}}</span>
          </div>
        </div>
          <div class="row" v-if="select===2">
          <!-- <div class="col">
            <span class="title">冻结账户(USDT)</span>
            <span class="num">{{assets.contract.freeze}}</span>
          </div> -->
          <div class="col">
            <span class="title">持仓冻结(USDT)</span>
            <span class="num">{{assets.contract.hold}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="account" v-else>
      <img class="imgs" src="../../assets/image/unlist.png" alt />
      <div class="text">暂无记录</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['token', 'assets'],

  data () {
    return {
      select: 1
    }
  },
  methods: {
    seletAccount (e) {
      this.select = e
    }
  }
}
</script>
<style lang="less" scoped>
.account {
  height: 240px;
  background: #ffffff;
  overflow: auto;
  .imgs {
    display: block;
    margin: 0px auto 0;
    width: 280px;
  }
  .text {
    width: 100%;
    text-align: center;
  }
  .select {
    display: flex;
    .item {
      position: relative;

      box-sizing: border-box;
      flex: 1;
      background: rgba(255, 255, 255, 1);
      border: 2px solid rgba(234, 234, 234, 1);
      border-radius: 4px;
      padding: 20px;
      &:nth-child(2) {
        margin-left: 7px;
      }
      .title {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
      }

      .num {
        font-size: 14px;
        font-family: DIN;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        margin-top: 5px;
      }
    }
    .active {
      background: #318AFD;
      div {
        color: #fff !important;
      }
      span {
        display: block;
        width: 0;
        height: 0;
        border-width: 13px 13px 0;
        border-style: solid;
        border-color: #318AFD transparent transparent; /*黄 透明 透明 */
        position: absolute;
        bottom: -10px;
        left: 10%; /* 三角形居中显示 */
        margin-left: -10px; /* 三角形居中显示 */
      }
    }
  }
  .content {
    margin: 13px auto;
    width: 310px;
    height: 120px;
    background: rgba(247, 248, 250, 1);

    .row {
      padding: 0px 17px;
      display: flex;
      .col {
        flex: 1;
        margin-top: 10px;
        .title {
          display: block;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
        }
        .num {
          display: block;
          font-size: 14px;
          font-family: DIN;
          font-weight: 500;
          color: #999999;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>
