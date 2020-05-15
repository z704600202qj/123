<template>
  <div class="buy-warp">
    <div class="title">充值 USDT</div>

    <div class="select">
      <div :class="select==='ercAddr'?'item active':'item'" @click="slect('ercAddr')">USDT-ERC20</div>
      <div :class="select==='omniAddr'?'item active':'item'" @click="slect('omniAddr')">USDT-OMNI</div>
    </div>
    <div class="sub-title">USDT充值地址如下</div>
    <div class="line">
      <div class="text" id="inviteCode">{{wallet[select]}}</div>
      <div class="btns" @click="CopyUrl">复制地址</div>
    </div>
    <div id="qrcode1" v-show="select==='ercAddr'" class="er" ref="qrCodeDiv"></div>
    <div id="qrcode2" v-show="select==='omniAddr'" class="er" ref="qrCodeDiv"></div>

    <div class="tip-text">扫描二维码获取充值地址</div>
    <div class="tip">
      <Tip />
    </div>
  </div>
</template>
<script>
import Tip from './Tip'
import { Message } from 'element-ui'

import QRCode from 'qrcodejs2'

let data = localStorage.getItem('info')
data = data ? JSON.parse(data) : {}
export default {
  data () {
    return {
      wallet: data.wallet,
      select: 'ercAddr'
    }
  },
  created () {
    this.$nextTick(() => {
      this.qrcode()
      this.qrcode2()
    })
  },
  methods: {
    slect (e) {
      this.select = e
    },
    qrcode () {
      let _this = this
      let qrcode = new QRCode('qrcode1', {
        width: 119,
        height: 119,
        text: _this.wallet['ercAddr'], // 二维码地址
        colorDark: '#000',
        colorLight: '#fff'
      })
    },
    qrcode2 () {
      let _this = this
      let qrcode = new QRCode('qrcode2', {
        width: 119,
        height: 119,
        text: _this.wallet['omniAddr'], // 二维码地址
        colorDark: '#000',
        colorLight: '#fff'
      })
    },
    CopyUrl (data) {
      var Url2 = document.getElementById('inviteCode').innerText
      var oInput = document.createElement('input')
      oInput.value = Url2
      document.body.appendChild(oInput)
      oInput.select() // 选择对象
      document.execCommand('Copy') // 执行浏览器复制命令
      oInput.className = 'oInput'
      oInput.style.display = 'none'
      Message.success('复制成功')
    }
  },
  components: {
    Tip
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
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(173, 177, 186, 1);
    margin-top: 30px;
  }
  .er {
    width: 119px;
    height: 119px;
  }
  .tip-text {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    margin-top: 17px;
    margin-bottom: 20px;
  }
  .line {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .text {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #318afd;
    }
    .btns {
      cursor: pointer;
      margin-left: 10px;
      height: 31px;
      line-height: 31px;
      padding: 1px 5px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #318afd;
      border: 1px solid #318afd;
      border-radius: 4px;
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
}
</style>
