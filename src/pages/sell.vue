<template>
  <div class="pay-warp">
    <div class="content">
      <div class="left">
        <div class="tip">
          <div class="text">出售 USDT</div>
          <div class="info">订单编号：{{details.tid}}</div>
        </div>
        <div class="count">
          <div class="item">
            <div class="label">总价</div>
            <div class="num" style="color:#318AFD">{{details.total}} CNY</div>
          </div>
          <div class="item">
            <div class="label">数量</div>
            <div class="num">{{details.amount}} USDT</div>
          </div>
          <div class="item">
            <div class="label">单价</div>
            <div class="num">{{details.unit}} CNY</div>
          </div>
        </div>
        <div class="title">买家个人信息</div>
        <div class="user-name">{{details.merchant_name||'邓雨'}}</div>
        <div class="clear"></div>
        <div class="order-info">
          <div class="right-infos">
            <div class="tips">请收到款项之后，及时确认订单</div>
            <div class="order-num">
              <div class="num">{{details.total}}</div>
              <span class="unit">CNY</span>
              <!-- <span class="text-num">壹仟元整</span> -->
            </div>
          </div>
          <div class="right-btns">
            <div class="unbtns" v-if="details.state===0">等待商家付款</div>
            <div class="btns" v-if="details.state===4" @click="otcConfirm">确认收到货款，并放币</div>

            <!-- <div class="line-btn">联系客服</div> -->
          </div>
        </div>
        <PayTip />
      </div>
      <div class="right">
        <img src="../assets/image/avatar.png" alt />
        <div class="nick-name">用户10393</div>
        <div class="name">邓雨</div>
      </div>
    </div>
  </div>
</template>
<script>
import PayTip from '@/components/PayTip'
import { otcConfirm, otccancel, otcDetail } from '../services/index'

export default {
  data () {
    return {
      type: ['微信', '支付宝', '银行卡'],
      details: {},
      text: '我已确认收到款项'
    }
  },
  components: {
    PayTip
  },
  created () {
    this.otcDetail()
  },
  methods: {
    async otcDetail () {
      const tid = this.$route.query.tid
      let data = await otcDetail({ tid: tid })
      const { Data } = data
      this.text = data.Msg
      this.details = Data
    },
    async otcConfirm () {
      const tid = this.$route.query.tid
      await otcConfirm({ tid: tid })
      await this.otcDetail()

      this.$router.push('/trading')
    }
  }
}
</script>
<style lang="less" scoped>
.pay-warp {
  background: rgba(243, 245, 249, 1);
  overflow: hidden;
  .content {
    margin: 10px auto 40px;
    width: 1200px;
    height: 671px;
    display: flex;
    .left {
      width: 930px;
      margin-right: 10px;
      background: #fff;
      .tip {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 18px 0 70px;
        width: 928px;
        height: 48px;
        background: #318afd;
        .text {
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #fff;
        }
        .info {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #fff;
        }
      }
      .count {
        margin-left: 77px;
        display: flex;
        margin-top: 19px;

        .item {
          margin-right: 40px;
          .label {
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #999999;
          }
          .num {
            margin-top: 12px;

            font-size: 16px;
            font-family: DIN;
            font-weight: bold;
            color: rgba(0, 0, 0, 1);
          }
        }
      }
      .title {
        margin-left: 77px;
        margin-top: 18px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
      .pay-info {
        display: flex;
        align-items: baseline;
      }
      .user-name {
        float: left;
        position: relative;
        margin-left: 77px;
        margin-right: 27px;
        margin-top: 20px;
        padding: 0 30px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: rgba(255, 255, 255, 1);
        border: 1px solid #318afd;
        border-radius: 4px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        img {
          position: absolute;
          width: 18px;
          height: 17px;
          right: -1px;
          bottom: 0;
        }
      }
      .er {
        margin-left: 65px;
        align-self: flex-end;
        width: 77px;
        height: 77px;
        background: red;
      }
      .clear {
        clear: both;
      }
      .order-info {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        margin-left: 77px;
        margin-top: 30px;
        width: 750px;
        height: 90px;
        background: #e8f0f9;
        padding: 12px 20px;
        .right-infos {
          .tips {
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
          }
          .order-num {
            display: flex;
            align-items: baseline;
            .num {
              font-size: 26px;
              font-family: DIN;
              font-weight: bold;
              color: #318afd;
            }
            .unit {
              font-size: 14px;
              font-family: DIN;
              font-weight: 500;
              color: #318afd;
              margin: 0 8px;
            }
            .text-num {
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 400;
              color: rgba(182, 185, 184, 1);
            }
          }
        }

        .right-btns {
          .btns {
            width: 240px;
            height: 48px;
            line-height: 48px;
            text-align: center;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);

            background: #318afd;
            border-radius: 2px;
            margin-bottom: 5px;
          }
          .unbtns {
            width: 240px;
            height: 48px;
            line-height: 48px;
            text-align: center;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            background: #ccc;

            border-radius: 2px;
            margin-bottom: 5px;
          }
          .line-btn {
            cursor: pointer;
            float: right;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #318afd;
            margin-right: 10px;
          }
        }
      }
    }
    .right {
      flex: 1;
      width: 260px;
      height: 234px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(222, 230, 230, 0.5);
      img {
        display: block;
        width: 70px;
        height: 70px;
        margin: 45px auto 15px;
      }
      .nick-name {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        text-align: center;
        margin-bottom: 14px;
      }
      .name {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(109, 106, 106, 1);
        text-align: center;
      }
    }
  }
}
</style>
