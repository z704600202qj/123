<template>
  <div class="setting-warp">
    <div class="setting">
      <div class="nav">
        <div class="title">账户</div>
        <el-tabs v-model="select" tab-position="left" @tab-click="tabClick">
          <el-tab-pane label="资金总览" name="Overview" />
          <el-tab-pane label="实名认证" name="IdCard" />
          <el-tab-pane label="收付款设置" name="Pay" />
        </el-tabs>
        <div class="title">密码设置</div>
        <el-tabs v-model="select" tab-position="left" @tab-click="tabClick">
          <el-tab-pane label="登录密码" name="LoginPassWord" />
          <el-tab-pane label="支付密码" name="PayPassWord" />
        </el-tabs>
        <!-- <div class="title">交易记录</div>
        <el-tabs v-model="select" tab-position="left" @tab-click="tabClick">
          <el-tab-pane label="合约交易记录" name="Contract" />
          <el-tab-pane label="法币交易记录" name="Fiat" />
        </el-tabs> -->
      </div>
      <div class="right">
          <component v-bind:is="select"></component>
      </div>
    </div>
  </div>
</template>
<script>
import Overview from '@/components/setting/Overview'
import IdCard from '@/components/setting/IdCard'
import Pay from '@/components/setting/Pay'
import PayPassWord from '@/components/setting/PayPassWord'
import LoginPassWord from '@/components/setting/LoginPassWord'
import Fiat from '@/components/setting/Fiat'
import Contract from '@/components/setting/Contract'

export default {
  components: {
    Overview,
    IdCard,
    Pay,
    PayPassWord,
    LoginPassWord,
    Fiat,
    Contract
  },
  data () {
    return {
      select: 'Overview'
    }
  },
  mounted () {
    this.select = this.$route.query.type || 'Overview'
  },
  methods: {
    tabClick (e) {
      this.select = e.name
    }
  },
  watch: {
    $route (to, from) {
      this.select = to.query.type
    }
  }
}
</script>
<style lang="less" scoped>
.setting-warp {
  width: 100%;
  height: 100%;
  background: rgba(243, 245, 249, 1);
}
.setting {
  display: flex;
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  .nav {
    box-sizing: border-box;
    width: 260px;
    height: 900px;
    background: rgba(255, 255, 255, 1);
    margin-top: 10px;
    margin-bottom: 40px;
   .title {
      margin-left: 27px;
      height: 60px;
      line-height: 60px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
    }
   /deep/.el-tabs--left .el-tabs__header.is-left {
      width: 260px;
      .el-tabs__active-bar {
        height: 50px;
        background-color: #318AFD;
        width: 5px;
      }
      .el-tabs__item.is-active {
        color: #318AFD;
        background: rgba(243, 245, 249, 1);
      }
      .el-tabs__nav-wrap::after {
        background-color: unset;
      }
      .el-tabs__item {
        padding-left: 47px;

        height: 50px;
        line-height: 50px;
        text-align: left;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
    }
  }
  .right {
    margin-left: 10px;
    margin-top: 10px;
    width: 930px;
    height: 900px;
    background: rgba(255, 255, 255, 1);
  }
}
</style>
