<template>
  <div class="overview-warp">
    <div class="title">实名认证</div>
    <div class="form">
      <div class="form-upload">
        <!-- v-if="Object.keys(veriInfo).length<=0" -->
        <div>
          <div class="form-item">
            <el-upload
              :disabled="disabled"
              class="avatar-uploader"
              action="/"
              :http-request="httpRequestFont"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="font" :src="font" class="avatar" />
              <img v-else src="../../assets/image/idfont.png" alt />
            </el-upload>
          </div>

          <div class="form-item" style="marginTop:8px ">
            <el-upload
              :disabled="disabled"
              class="avatar-uploader"
              action="/"
              :http-request="httpRequestBack"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="back" :src="back" class="avatar" />
              <img v-else src="../../assets/image/idback.png" alt />
            </el-upload>上传身份证正反面
          </div>
        </div>
        <div class="form-item idandcard">
          <el-upload
            class="avatar-uploader"
            action="/"
            :disabled="disabled"
            :http-request="httpRequestPortrait"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="portrait" :src="portrait" class="avatar" />
            <img v-else src="../../assets/image/idandphone.png" alt />
          </el-upload>上传手持身份证照
        </div>
      </div>
      <div class="form-input">
        <div class="item">
          <Cinput :disabled="disabled" label="姓名" v-model="name" placeholder="请输入姓名" />
        </div>
        <!-- <div class="item">
          <Cinput
            label="住址"

            v-model="location"
            placeholder="请输入住址"
          />
        </div>-->
        <div class="item">
          <Cinput :disabled="disabled" label="身份证号" v-model="id" placeholder="请输入身份证号" />
        </div>
      </div>
      <div v-if="veriInfo.state===0" class="disbtn">待审核</div>
      <div v-if="veriInfo.state!==0&&veriInfo.state!==1" class="btn" @click="veri">实名认证</div>
    </div>
  </div>
</template>
<script>
import Cinput from './Input'

import { veri, infoveri } from '../../services/index'

export default {
  data () {
    return {
      baseurl:
        window.location.host === 'https://colaex.pro'
          ? 'https://colaex.pro/img/'
          : 'http://eva7base.com:88/test/',
      name: '',
      font: '',
      back: '',
      id: '',
      location: '',
      portrait: '',
      veriInfo: {},
      disabled: false
    }
  },
  mounted () {
    this.infoveri()
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
    async infoveri () {
      let { Data } = await infoveri({})
      const { location, id, name, a, b, portrait } = Data
      this.veriInfo = Data
      this.disabled = Object.keys(Data).length > 0
      this.location = location
      this.id = id
      this.name = name
      this.font = this.baseurl + a
      this.back = this.baseurl + b
      this.portrait = this.baseurl + portrait
    },
    async veri () {
      await veri({
        a: this.font,
        b: this.back,
        name: this.name,
        location: this.location,
        id: this.id,
        portrait: this.portrait
      })
      await this.infoveri()
    },
    httpRequestFont (event) {
      const {type} = event.file
      let reader = new FileReader()
      let file = event.file
      reader.readAsDataURL(file)
      reader.onload = e => {
        if (type === 'image/png') {
          this.font = e.target.result
        }
      }
    },
    httpRequestBack (event) {
      const {type} = event.file
      let reader = new FileReader()
      let file = event.file
      reader.readAsDataURL(file)
      reader.onload = e => {
        if (type === 'image/png') {
          this.back = e.target.result
        }
      }
    },
    httpRequestPortrait (event) {
      const {type} = event.file
      let reader = new FileReader()
      let file = event.file
      reader.readAsDataURL(file)
      reader.onload = e => {
        if (type === 'image/png') {
          this.portrait = e.target.result
        }
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
  .form {
    .form-upload {
      display: flex;
      align-items: center;
      margin-top: 15px;
      margin-bottom: 40px;
    }
    .form-item {
      text-align: center;
      margin-right: 66px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 37px;
    }
    .idandcard {
      img {
        width: 251.4px;
        height: 301.3px;
      }
    }
    img {
      display: block;
      width: 238px;
      height: 142.7px;
    }
    .form-input {
      .item {
        margin-bottom: 15px;
      }
      .label {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        margin-bottom: 9px;
      }
      /deep/.el-input__inner {
        font-size: 14px;
        color: rgba(124, 124, 124, 1);
        height: 60px;
        border: 1px solid rgba(210, 210, 210, 1);
      }
    }
    .btn {
      cursor: pointer;
      margin: 60px auto;
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
    .disbtn{
       cursor: pointer;
      margin: 60px auto;
      width: 750px;
      height: 56px;
      line-height: 56px;
      text-align: center;
      background: #ccc;
      border-radius: 2px;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
