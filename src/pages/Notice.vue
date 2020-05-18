<template>
  <div class="notice-warp">
    <div class="notice-warp-content">
      <div class="notice-item" v-for="(item) in list" :key="item.id" @click="link(item)">
        <div>{{item.title}}</div>
        <span>{{item.create_time}}</span>
      </div>
    </div>
    <div class="pagination-warp">
      <el-pagination
        background
        :page-size="size"
        layout="prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { announcement } from '../services/index'
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
    this.announcement()
  },
  methods: {
    link (e) {
      let url = 'http://eva7base.com:99/coin/announcement/detail?id=' + e.id
      window.open(url)
    },
    handleCurrentChange (e) {
      this.page = e
      this.announcement()
    },
    async announcement () {
      let { Data } = await announcement({
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

.notice {
  &-warp {
    box-sizing: border-box;
    width: 1200px;
    min-height: 500px;
    background: rgba(249, 249, 249, 1);
    padding: 20px;
    margin: 20px auto 0;

    &-content {
      width: 1200px;
    }
  }
  &-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    height: 30px;
    line-height: 30px;

    cursor: pointer;
    span {
      color: #8e98a6;
      margin-left: 15px;
    }
    .btn {
      margin-left: 70px;
    }
  }
}
</style>
