<template>
  <div class="new-warp">
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
      <div class="pagination-warp">
        <el-pagination
          background
          :page-size="size"

          :total="total"
             layout="prev, pager, next, jumper"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { coinnews } from '../services/index'
export default {
  data () {
    return {
      list: [],
      size: 10,
      total: 0,
      page: 1
    }
  },
  mounted () {
    this.coinnews()
  },
  methods: {
    link (e) {
      window.open(e)
    },
    handleCurrentChange (e) {
      this.page = e
      this.coinnews()
    },
    async coinnews () {
      let { Data } = await coinnews({
        page: this.page,
        size: this.size
      })
      this.list = Data.list
      this.total = Data.total
    }
  }
}
</script>
<style lang="less" scoped>
.pagination-warp {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 20px;
  /deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #318afd;
  }
}
.new-warp {
  width: 1160px;
  margin: 0 auto;
  .content {
    margin: 20px 0;
  }
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .left {
      display: flex;
      align-items: center;

      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
    }

    .left > span {
      display: inline-block;
      width: 4px;
      height: 24px;
      background: rgba(0, 193, 133, 1);
      border-radius: 2px;
      margin-right: 10px;
    }
    .right {
      font-size: 20px;
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
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
      }
      .desc {
        font-size: 14px;
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
        font-size: 14px;
        font-family: DIN;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
      }
    }
  }
}
</style>
