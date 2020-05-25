<template>
  <div class="overview-warp">
    <div class="title">收付款设置</div>
    <div class="form">
      <div class="select">
        <div :class="selected===2?'item bank active':'item bank'" @click="select(2)">
          <img src="../../assets/image/bank.png" alt />银行卡
        </div>
        <div :class="selected===1?'item zhi active':'item zhi'" @click="select(1)">
          <img src="../../assets/image/zhi.png" alt />支付宝
        </div>
        <div :class="selected===0?'item wx active':'item wx'" @click="select(0)">
          <img src="../../assets/image/wx.png" alt />微信
        </div>
      </div>
      <div class="form-input">
        <div class="item" v-if="selected===2">
          <Cinput label="银行卡号" v-model="account" placeholder="请输入银行卡号" />
        </div>
        <div class="item" v-if="selected===2">
          <Cinput label="银行名称含支行" v-model="location" placeholder="请输入银行名称含支行" />
        </div>
        <div class="item" v-if="selected===1">
          <Cinput label="支付宝账号" v-model="account" placeholder="请输入支付宝账号" />
        </div>
        <!-- <div class="item" v-if="selected===0">
          <Cinput v-model="account" label="微信账号" placeholder="请输入微信账号" />
        </div>-->
        <div class="item upload" v-if="selected!==2">
          上传收款码
          <el-upload
            class="avatar-uploader"
            action="/"
            :http-request="httpRequest"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="btn"  v-if="info.length===0" @click="submit">确定</div>
      <div class="btn1" v-if="info.length>0" @click="paycancel">解绑</div>
    </div>
  </div>
</template>
<script>
import Cinput from './Input'
import {
  payBank,
  payAli,
  payWx,
  assets,
  paycancel
} from '../../services/index'

export default {
  data () {
    return {
      baseurl:
        window.location.host === 'www.colaex.pro'
          ? 'https://www.colaex.pro/img/'
          : 'http://eva7base.com:88/test/',
      imageUrl: '',
      selected: 2,
      account: '',
      location: '',
      info: {}
    }
  },
  mounted () {
    this.assets()
  },
  methods: {
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 png 格式!')
        return
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    select (e) {
      this.selected = e
      this.account = ''
      this.imageUrl = ''
      this.location = ''
      this.info = this.datas.payMethods.filter(item => {
        if (item.type === e) {
          return item
        }
      })
    },
    async paycancel () {
      if (this.info.length > 0) {
        await paycancel({ type: this.selected, id: this.info[0].id })
        await this.assets()
      } else {
        this.$message.error('请绑定信息')
      }
    },
    async assets () {
      let data = await assets()
      this.datas = data.Data
      this.info = this.datas.payMethods.filter(item => {
        if (item.type === this.selected) {
          return item
        }
      })
    },
    async submit () {
      if (this.selected === 2) {
        await payBank({ account: this.account, location: this.location })
      }
      if (this.selected === 1) {
        await payAli({ account: this.account, qr: this.imageUrl })
      }
      if (this.selected === 0) {
        await payWx({ account: this.account, qr: this.imageUrl })
      }
      await this.assets()
    },
    httpRequest (event) {
      const {type} = event.file
      let reader = new FileReader()
      let file = event.file
      reader.readAsDataURL(file)
      reader.onload = e => {
        if (type === 'image/png') {
          this.imageUrl = e.target.result
        }
      }
    }
  },
  watch: {
    info: function (e) {
      if (e.length > 0) {
        this.account = e[0].account
        this.imageUrl = this.baseurl + e[0].qr
        this.location = e[0].location
      } else {
        this.account = ''
        this.imageUrl = ''
        this.location = ''
      }
    }
  },
  components: {
    Cinput
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
  .select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 230px;
      height: 96px;
      line-height: 96px;
      margin-right: 30px;

      background: rgba(255, 255, 255, 1);
      border: 2px solid rgba(222, 230, 230, 1);
      border-radius: 10px;
      text-align: center;
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      img {
        width: 26px;
        height: 26px;
      }
    }

    .active {
      border: 2px solid #318afd;
    }
  }
  .form-input {
    margin-top: 50px;
    .item {
      margin-bottom: 30px;
    }
    .upload {
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }
    .avatar-uploader {
      margin-top: 15px;
    }
    .avatar-uploader /deep/ .el-upload {
      border: 2px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader /deep/ .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
  .btn {
    cursor: pointer;
    margin: 60px auto 20px;
    width: 750px;
    height: 56px;
    line-height: 56px;
    text-align: center;
    background: #318afd;
    border-radius: 2px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
  .btn1 {
    cursor: pointer;
    margin: 0px auto;
    width: 750px;
    height: 56px;
    line-height: 56px;
    text-align: center;
    background: rgb(252, 73, 72);
    border-radius: 2px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
