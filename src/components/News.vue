<template>
  <div class="new-warp">
    <div class="title">
      <div class="left">
        <span></span>
        <div>币圈大事件</div>
      </div>
      <div class="right">
        <div @click="goto">
          更多
          <i class="el-icon-right"></i>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="item" v-for="(item,index) of list" :key="index" @click="link(item.link)">
        <div v-if="item.img">
          <img class="img" :src="item.img" alt />
        </div>
        <div class="text">
          <div class="titles">{{item.title}}</div>
          <div class="desc">{{item.description}}</div>
          <div class="time">{{item.date}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { coinnews } from '../services/index'
export default {
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.coinnews()
  },
  methods: {
    link (e) {
      window.open(e)
    },
    goto () {
      this.$router.push('/moreNew')
    },
    async coinnews () {
      let { Data } = await coinnews({
        page: 1,
        size: 4
      })
      this.list = Data.list
    }
  }
}
</script>
<style lang="less" scoped>
.new-warp {
  width: 1160px;
  margin: 0 auto;
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .left {
      display: flex;
      align-items: center;

      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
    }

    .left > span {
      display: inline-block;
      width: 4px;
      height: 18px;
      background: #318AFD;
      border-radius: 2px;
      margin-right: 10px;
    }
    .right {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 40px;
    }
  }
  .item {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 30px;
    .img {
      width: 120px;
      height: 85px;
      border-radius: 10px;
    }
    .text {
      flex: 1;
      margin-left: 23px;
      .titles {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
      }
      .desc {
        font-size: 12px;
        width: 100%;
        overflow: hidden;
        height: 24px;
        line-height: 24px;

        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        margin: 10px 0;
      }
      .time {
        font-size: 12px;
        font-family: DIN;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
      }
    }
  }
}
</style>
