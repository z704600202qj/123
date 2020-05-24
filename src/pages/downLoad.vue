<template>
  <div class="download-warp">
    <div class="content">
      <div class="item">
        <div class="title">
          <img src="../assets/image/ios.png" alt /> iphone版
        </div>
        <div class="qr-border">
          <img class="qr" src="../assets/image/iosqr.png" alt />
        </div>
        <div class="btns">扫码下载</div>
      </div>
      <div class="item">
        <div class="title">
          <img src="../assets/image/a.png" alt /> Android版
        </div>
        <div class="qr-border">
          <img class="qr" src="../assets/image/aqr.png" style="height:110px; width:110px;margin:0" alt />
        </div>
        <div class="btns">扫码下载</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
.download-warp {
  position: relative;
  width: 100%;
  height: 580px;
  background: rgba(248, 250, 252, 1);
  background-image: url("../assets/image/appbg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .content {
    display: flex;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20%;
    .item {
      width: 110px;
      font-size: 14px;
      font-family: Heiti SC;
      font-weight: 300;
      color: rgba(255, 255, 255, 1);
      text-align: center;
      margin-right: 50px;
      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-bottom: 1px solid #fff;
        img {
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }
      }
      .qr-border {
        width: 110px;
        height: 110px;
        background: #fff;
        margin-top: 10px;
      }
      .qr {
        margin: 5px auto;
        width: 100px;
        height: 100px;
      }
      .btns {
        width: 100%;
        height: 30px;
        line-height: 30px;

        color: #fff;
        font-size: 10px;

        opacity: 0.6;
      }
    }
  }
}
</style>
