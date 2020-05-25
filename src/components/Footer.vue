<template>
  <div class="footer">
    <div class="item">
      <div class="title">
        <img class="logo" src="../assets/image/footicon.png" alt />
      </div>
      <div class="item-line">Colaex成立于2019年5月、注册地为新加坡，</div>
      <div class="item-line">已经在新加坡、韩国、日本、马来西亚、</div>
      <div class="item-line">泰国、塞尔维亚等国家及地区设立运营中心。</div>
    </div>
    <div class="item">
      <div class="title">关于</div>
      <router-link class="item-line" to="/about" tag="div">关于我们</router-link>
      <div class="item-line" @click="goto">联系我们</div>
      <router-link class="item-line" to="/law" tag="div">法律声明</router-link>
      <router-link class="item-line" to="/money" tag="div">关于反洗钱</router-link>
    </div>
    <div class="item">
      <div class="title">帮助</div>
        <router-link class="item-line" to="/newhelp" tag="div">新手帮助</router-link>
      <router-link class="item-line" to="/rules" tag="div">交易规则</router-link>

    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goto () {
      window.open('https://chat.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=1415271&configID=110509&jid=3002128586&s=1')
    }
  }
}
</script>
<style lang="less" scoped>
@import "../assets/theme.less";

.footer {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  background-image: url("../assets/image/footbg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .item {
    overflow: hidden;
    .title {
      display: flex;
      align-content: center;
      margin-top: 22px;
    font-size:14px;
color:rgba(102,109,124,1);

      font-family: PingFang SC;
      font-weight: 500;
      line-height: 33px;
      margin-bottom: 18px;
      .logo {
        width: 112px;
        height: 26px;
      }
    }
    .item-line {
      margin-top: 5px;
     font-size:14px;

      font-family: PingFang SC;
      font-weight: 400;
   color:rgba(175,183,199,1);

    }
  }
}
</style>
