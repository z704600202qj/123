<template>
  <div class="login-warp" :style="{height:type==='login'?'787px':'1000px'}">
    <div class="content">
      <img class="bg" src="../assets/image/login-bg.png" alt />
      <div class="box">
        <div class="form">
          <div class="title" >找回密码</div>
          <div class="item">
            <div class="label">账号</div>
            <el-input
              v-model="phone"
              auto-complete="off"
              type="text"
              name="phone"
              placeholder="请输入手机号"
              prefix-icon="el-icon-user"
            ></el-input>
          </div>
          <div class="item">
            <div class="label">新密码</div>
            <el-input
              v-model="pwd"
              name="password"
              type="password"
              placeholder="请输入8-20位的密码"
              prefix-icon="el-icon-unlock"
              auto-complete="off"
            ></el-input>
            <div
              style="color:red"
              v-if="this.pwd&&!this.pwd.match(/(?=.*[0-9])[a-zA-Z0-9]{8,20}/)"
            >请输入正确密码格式</div>
          </div>
          <div class="item">
            <div class="label">确认新密码</div>
            <el-input
              v-model="pwd_new_repeat"
              type="password"
              name="pwd_new_repeat"
              auto-complete="off"
              placeholder="请确认新密码"
              prefix-icon="el-icon-unlock"
            ></el-input>
            <div
              v-if="this.pwd_new_repeat&&this.pwd_new_repeat!==this.pwd"
              style="color:red"
            >两次输入密码不匹配</div>
          </div>
          <div class="item" >
            <div class="label">验证码</div>
            <div class="code">
              <el-input v-model="code" placeholder="请输入验证码" prefix-icon="el-icon-chat-dot-round"></el-input>
              <div class="send-code" @click="sendMsg">{{content}}</div>
            </div>
          </div>

          <div class="for_reg" >
            <span class="forget"></span>
            <router-link class="reg" tag="a" to="/login">现有账号登录</router-link>
          </div>
          <div class="btn" @click="refound">找回密码</div>
        </div>
        <div class="tip">
          <img class="qr" src="../assets/image/iosqr.png" alt />

          <div class="text">
            <div class="h1">Colaex合约交易所</div>
            <div>稳定、高效、安全，最好的操作体验。</div>
            <div>扫描下载Colaex APP</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { register, login, msg, refound } from '../services/index'
const type = { '/login': 'login', '/forget': 'forget', '/register': 'reg' }
export default {
  data () {
    return {
      type: 'login',
      phone: '',
      pwd: '',
      pwd_new_repeat: '',
      inviteCode: '',
      code: '',
      canClick: true,
      content: '发送验证码', // 按钮里显示的内容
      totalTime: 60 // 记录具体倒计时时间
    }
  },
  mounted () {
    this.type = type[this.$route.path]
  },
  methods: {
    login () {
      if (this.pwd && !this.pwd.match(/(?=.*[0-9])[a-zA-Z0-9]{8,20}/)) {
        this.$message.error('请输入正确格式密码')
        return
      }
      login({
        account: this.phone,
        pwd: this.$md5(this.pwd)
      }).then(e => {
        if (e.Code === 0) {
          localStorage.setItem('info', JSON.stringify(e.Data))
          this.$router.push('/')
        }
      })
    },
    sendMsg () {
      if (this.phone) {
        msg({ phone: this.phone, type: this.type === 'reg' ? '1' : '2' }).then(
          e => {
            if (e.Code === 0) {
              if (!this.canClick) return // 改动的是这两行代码
              this.canClick = false
              this.content = this.totalTime + 's后重新发送'
              let clock = window.setInterval(() => {
                this.totalTime--
                this.content = this.totalTime + 's后重新发送'
                if (this.totalTime < 0) {
                  window.clearInterval(clock)
                  this.content = '重新发送验证码'
                  this.totalTime = 10
                  this.canClick = true // 这里重新开启
                }
              }, 1000)
              this.$message.success('发送成功')
            }
          }
        )
      } else {
        this.$message.error('请输入手机号')
      }
    },
    register () {
      if (!this.phone) {
        this.$message.error('请填写手机号')
        return
      }
      if (!this.pwd) {
        this.$message.error('请填写密码')
        return
      }
      if (!this.code) {
        this.$message.error('请填写验证码')
        return
      }
      if (!this.inviteCode) {
        this.$message.error('请填写邀请码')
        return
      }
      if (this.pwd && !this.pwd.match(/(?=.*[0-9])[a-zA-Z0-9]{8,20}/)) {
        this.$message.error('请输入正确格式密码')
        return
      }
      register({
        account: this.phone,
        pwd: this.$md5(this.pwd),
        inviteCode: this.inviteCode,
        code: this.code
      }).then(e => {
        if (e.Code === 0) {
          this.$router.push('/login')
        }
      })
    },
    refound () {
      if (this.pwd_new_repeat !== this.pwd && this.pwd) {
        this.$message.error('两次输入密码不正确')
        return
      }
      refound({
        account: this.phone,
        pwd_new: this.$md5(this.pwd),
        pwd_new_repeat: this.$md5(this.pwd_new_repeat),
        code: this.code
      }).then(e => {
        if (e.Code === 0) {
          // this.$message.success('操作成功')
          this.$router.push('/login')
        }
      })
    }
  },
  watch: {
    $route: function (e) {
      this.canClick = true
      this.type = type[e.path]
    }
  }
}
</script>
<style lang="less" scoped>
.login-warp {
  width: 100%;
  height: 787px;
  background: rgba(23, 38, 67, 1);
  overflow: hidden;
  .content {
    position: relative;
    margin: 0 auto;
    width: 1200px;
    display: flex;
    align-items: center;

    .bg {
      position: absolute;
      top: -50%;
      transform: translateY(50%);
      width: 540px;
      height: 449.2px;
    }
    .box {
      position: absolute;
      right: 0px;
      top: 50px;
      width: 560px;
      .form {
        box-sizing: border-box;
        padding: 30px 30px;
        // padding: 66px 60px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 1);
        .title {
          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(58, 58, 58, 1);
        }
        .item {
          /deep/.el-input__inner {
            font-size: 14px;

            color: rgba(124, 124, 124, 1);
            height: 60px;
            background: rgba(249, 249, 249, 1);
            border: 1px solid rgba(210, 210, 210, 1);
          }
          /deep/.el-input__prefix {
            font-size: 14px;

            margin-right: 10px;
          }
          & > .label {
            font-size: 16px;

            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(58, 58, 58, 1);

            line-height: 34px;
            margin-top: 15px;
            margin-bottom: 10px;
          }
          .code {
            display: flex;
            align-items: center;
            .send-code {
              color: rgba(49, 138, 253, 1);
              font-size: 16px;

              cursor: pointer;
              margin-left: 10px;
              width: 150px;
            }
          }
        }
        .for_reg {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 20px;
          font-size: 16px;

          .forget {
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(128, 129, 130, 1);
          }
          .reg {
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(49, 138, 253, 1);
          }
        }
        .btn {
          cursor: pointer;
          margin: 0 auto;
          margin-top: 20px;
          width: 468px;
          height: 62px;
          line-height: 62px;
          text-align: center;
          background: rgba(49, 138, 253, 1);

          border-radius: 2px;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
      }
      .tip {
        width: 100%;
        height: 140px;
        margin-top: 13px;
        background: rgba(248, 250, 252, 1);
        background-image: url("../assets/image/login-tip.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        .qr {
          width: 84px;
          height: 84px;
          margin-left: 32px;
          margin-right: 22px;
        }
        .text {
          .h1 {
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: 600;
            color: rgba(0, 0, 0, 1);
            line-height: 34px;
          }
          div {
            font-size: 13px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
            line-height: 20px;
          }
        }
      }
    }
  }
}
</style>
