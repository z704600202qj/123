<template>
  <div class="platform">
    <div class="platform-content">
      <div class="title">
        平台优势
        <div>Platform advantage</div>
      </div>
      <div class="content">
        <div class="item">
          <img src="../assets/image/p1.png" alt />
          <div>杠杆灵活</div>
          <p>1-100倍自由调整</p>
        </div>
        <div class="item">
          <img src="../assets/image/p2.png" alt />
          <div>低手续费</div>
          <p>万分之8，超低费率</p>
        </div>
        <div class="item">
          <img src="../assets/image/p3.png" alt />
          <div>安全保障</div>
          <p>全面防护，保障用户资金安全</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
.platform {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 520px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  &-content {
    width: 1160px;
    margin: 0 auto;
    overflow: hidden;
    text-align: center;
    .title {
      position: relative;
      margin-top: 90px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #000000;
      line-height: 37px;
      div {
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #000000;
        line-height: 37px;
        &:after {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: auto;
          bottom: -5px;
          right: auto;
          height: 3px;
          width: 44px;
          background-color: #318AFD;
        }
      }
    }
    .content {
      width: 1050px;
      margin: 0 auto;
      margin-top: 60px;
      display: flex;
      justify-content: space-between;
      text-align: center;
      .item {
        flex: 1;
        img {
          width: 70px;
          height: 70px;
          margin-bottom: 45px;
        }
        div {
          height: 24px;
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #000000;
          line-height: 47px;
        }
        p {
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #000000;
          line-height: 47px;
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
