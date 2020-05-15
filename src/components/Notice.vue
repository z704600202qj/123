<template>
  <div class="notice-warp">
    <div class="notice-warp-content">
      <div class="notice-item" v-for="(item) in list" :key="item.id" @click="link(item)">
        <div>{{item.title}}</div>
        <span>{{item.show_create_time}}</span>
      </div>
        <div class="btn" @click="goto">更多</div>

    </div>
  </div>
</template>
<script>
import {announcement} from '../services/index'
export default {
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.announcement()
  },
  methods: {
    link (e) {
      let url = e.link + e.id
      window.open(url)
    },
    goto () {
      this.$router.push('/notice')
    },
    async announcement () {
      let {Data} = await announcement({
        page: 1,
        size: 3
      })
      this.list = Data.list
    }
  }
}
</script>
<style lang="less" scoped>
.notice {
  &-warp {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0 auto;
    width: 1200px;
    height: 50px;
background:rgba(249,249,249,1);
    &-content {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 1160px;
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
    span {
      color: #8e98a6;
      margin-left: 15px;
      cursor: pointer;
    }
    .btn {
      margin-left: 70px;
    }
  }
}
</style>
