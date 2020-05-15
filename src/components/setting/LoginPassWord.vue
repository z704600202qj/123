<template>
  <div class="overview-warp">
    <div class="title">登录密码</div>
    <div class="form">
      <div class="form-input">
        <div class="item">
          <Cinput label="旧密码" type='password' v-model="pwd_old" placeholder="请输入旧密码" />
        </div>
        <div class="item">
          <Cinput label="新密码" type='password' v-model="pwd_new" placeholder="请输入新密码" />
          <div style="color:red;font-size:14px" v-if="this.pwd_new && !this.pwd_new.match(/(?=.*[0-9])[a-zA-Z0-9]{8,20}/)">请输入正确格式密码</div>
        </div>
        <div class="item">
          <Cinput label="确认密码" type='password' v-model="pwd_new_repeat" placeholder="再次确认新密码" />
          <div style="color:red;font-size:14px" v-if="this.pwd_new_repeat && this.pwd_new !== this.pwd_new_repeat">两次输入密码不一致</div>
        </div>
      </div>
      <div class="btn" @click="pwdLogin">确认</div>
    </div>
  </div>
</template>
<script>
import Cinput from './Input'
//
import {pwdLogin} from '../../services/index'

export default {
  data () {
    return {
      pwd_new: '',
      pwd_old: '',
      pwd_new_repeat: ''
    }
  },
  methods: {
    pwdLogin () {
      if (this.pwd_new && !this.pwd_new.match(/(?=.*[0-9])[a-zA-Z0-9]{8,20}/)) {
        this.$message.error('请输入正确格式密码')
        return
      }
      if (this.pwd_new && this.pwd_new !== this.pwd_new_repeat) {
        this.$message.error('两次输入密码不一致')
        return
      }
      pwdLogin(
        {
          pwd_new: this.$md5(this.pwd_new),
          pwd_old: this.$md5(this.pwd_old),
          pwd_new_repeat: this.$md5(this.pwd_new_repeat)
        }
      ).then(e => {
        this.pwd_new = ''
        this.pwd_old = ''
        this.pwd_new_repeat = ''
      })
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
    background: #318AFD;
    border-radius: 2px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
