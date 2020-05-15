<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="订单编号"></el-table-column>
      <el-table-column prop="name" label="类型"></el-table-column>
      <el-table-column prop="name" label="数量"></el-table-column>
      <el-table-column prop="name" label="交易员"></el-table-column>
      <el-table-column prop="name" label="支付方式"></el-table-column>
      <el-table-column prop="name" label="下单时间" width="180"></el-table-column>
      <el-table-column prop="name" label="完成时间" width="180"></el-table-column>
      <el-table-column prop="addres1s" label="状态"></el-table-column>
    </el-table>
    <div class="pagination-warp">
      <el-pagination
        background
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="80"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentPage3: 1
    }
  },
  methods: {
    handleSizeChange () {},
    handleCurrentChange () {}
  }
}
</script>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.pagination-warp {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 20px;
  /deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #00c185;
  }
}
</style>
