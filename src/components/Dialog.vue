<template>
  <div class="dialog">
    <el-dialog
      title="提示输入密码"
      :visible.sync="dialog"
      :close-on-click-modal="false"
      :show-close="false"
      width="400px"
    >
      <el-input v-model="input" placeholder="请输入密码" show-password></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="esc">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { payConfirm, userstate } from '../services/index'

export default {
  name: 'inputlsit',
  props: ['value'],
  data () {
    return {
      input: '',
      dialog: false
    }
  },
  watch: {
    value: function (e) {
      if (e) {
        let {data} = userstate().then(({Data}) => {
          if (!Data.pwdPay) {
            this.$confirm('检测到未设置支付密码，是否前往账户中心？', '确认信息', {
              distinguishCancelAndClose: true,
              confirmButtonText: '前往账户中心',
              cancelButtonText: '放弃'
            }).then(() => {
              this.$router.push({
                path: '/setting',
                query: {
                  type: 'PayPassWord'
                }
              })
            })
              .catch(action => {
                this.$emit('input', false)
                this.input = ''
              })
          } else {
            this.dialog = true
          }
        })
        console.log(data)
      }
    }
  },
  methods: {
    async sure () {
      let data = await payConfirm({ pwd: this.$md5(this.input) })
      if (data.Code === 0) {
        this.$emit('input', false)
        this.$emit('pass', true)
        this.dialog = false
      }
      this.input = ''
    },
    esc () {
      this.dialog = false
      this.$emit('input', false)
      this.input = ''
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .el-button--primary {
  background: #318afd;
  border-color: #318afd;
}
</style>
