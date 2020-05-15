<template>
  <div class="overview-warp">
    <div class="title">支付密码</div>
    <div class="form">
      <div class="form-input">
        <div class="item">
          <Cinput label="旧密码" type="password" v-model="pwd_old" placeholder="首次修改无需输入旧密码" />
        </div>
        <div class="item">
          <Cinput label="新密码" type="password" v-model="pwd_new" placeholder="请输入新密码" />
          <div v-if="!/^\d{6}$/.test(pwd_new)&&pwd_new" class="tips">请输入6位数字新密码</div>
        </div>
        <div class="item">
          <Cinput label="确认密码" type="password" v-model="pwd_new_repeat" placeholder="再次确认新密码" />
          <div v-if="pwd_new!==pwd_new_repeat&&pwd_new_repeat" class="tips">两次输入不一致请重新输入</div>
        </div>
      </div>
      <div class="btn" @click="pwdPay">确认</div>
    </div>
  </div>
</template>
<script>
import Cinput from './Input'
import { pwdPay } from '../../services/index'

export default {
  data () {
    return {
      pwd_old: '',
      pwd_new: '',
      pwd_new_repeat: ''
    }
  },
  methods: {
    async pwdPay () {
      if (this.pwd_new && this.pwd_new_repeat && (/^\d{6}$/.test(this.pwd_new))) {
        await pwdPay({
          pwd_old: this.pwd_old ? this.$md5(this.pwd_old) : '',
          pwd_new: this.$md5(this.pwd_new),
          pwd_new_repeat: this.$md5(this.pwd_new_repeat)
        })
        this.pwd_old = ''
        this.pwd_new = ''
        this.pwd_new_repeat = ''
      } else {
        this.$message.error('请输入新密码')
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
  .form-input {
    margin-top: 15px;
    .item {
      margin-bottom: 20px;
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
.tips{
  font-size: 14px;
  color: red
}
}
</style>
