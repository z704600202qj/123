<template>
  <div class="header">
    <div class="left">
          <router-link to="/" >
      <img class="logo" src="../assets/image/footicon.png" alt />

          </router-link>

      <div class="dropdown">
          <router-link to="/details?icon=btcusdt" class="el-dropdown-link" tag="span">合约交易</router-link>

      </div>
      <div class="dropdown">
          <span class="el-dropdown-link">
          <router-link to="/trading" class="el-dropdown-link" tag="span">法币交易</router-link>
          </span>
      </div>
      <div class="dropdown">
          <router-link to="/newhelp" class="el-dropdown-link" tag="span">新人帮助</router-link>
      </div>
      <div class="dropdown">
          <span class="el-dropdown-link" @click="goto">
            在线客服
          </span>
      </div>
    </div>
    <div class="right">
      <div class="dropdown" v-if="status==='online'">
          <router-link to="/setting" class="el-dropdown-link" tag="span">资金管理</router-link>
      </div>
      <div class="dropdown" v-if="status==='online'">
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon-s-custom"></i>
          {{datas.phone}}
        </span>
      </div>
       <div class="dropdown" v-if="status!=='online'">
        <span class="el-dropdown-link">
          <router-link to="/login" tag="div">登录</router-link>
        </span>
      </div>
       <div class="dropdown" v-if="status!=='online'">
        <span class="el-dropdown-link">
          <router-link to="/register" tag="div">注册</router-link>
        </span>
      </div>
      <div class="dropdown">
        <span class="el-dropdown-link">
          <router-link to="/downLoad" tag="div">
          APP下载
          <i class="el-icon-arrow-down el-icon-download"></i>
          </router-link>
        </span>
      </div>
       <div class="dropdown" v-if="status==='online'">
        <span class="el-dropdown-link">
          <router-link to="/login" tag="div">退出</router-link>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      status: 'offline',
      datas: {}
    }
  },
  mounted () {
    this._inits()
  },
  methods: {
    goto () {
      window.open('https://chat.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=1415271&configID=110509&jid=3002128586&s=1')
    },
    _inits () {
      let data = localStorage.getItem('info')
      data = data ? JSON.parse(data) : []
      this.status = Object.keys(data).length > 0 ? 'online' : 'offline'
      this.datas = data
    }
  },
  watch: {
    $route (to, from) {
      this._inits()
    }
  }
}
</script>
<style lang="less" scoped>
@import "../assets/theme.less";
.el-dropdown-link {
  color: #fff;
  font-size: 14px
}
.header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    .dropdown {

      margin-right: 40px;
      cursor: pointer;
    }
    .logo {
      display: inline-block;
      width: 112px;
      height: 26px;
      margin-right: 40px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .dropdown {
      margin-right: 40px;
      cursor: pointer;
    }
  }
}
</style>
