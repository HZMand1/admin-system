<template>
  <div id="memberDetail">
    <el-form :model="ruleForm"
             ref="ruleForm"
             label-width="100px">
      <el-form-item label="用户名："
                    prop="name">
        {{ruleForm.name}}
      </el-form-item>
      <el-form-item label="手机号："
                    prop="phone">
        {{ruleForm.phone}}
      </el-form-item>
      <el-form-item label="所属系统："
                    prop="appCode">
        {{ruleForm.appCode}}
      </el-form-item>
      <el-form-item label="邮箱："
                    prop="email">
        {{ruleForm.email}}
      </el-form-item>
      <el-form-item label="开户人："
                    prop="opearUser">
        {{ruleForm.opearUser}}
      </el-form-item>
      <el-form-item label="添加时间："
                    prop="addTime">
        {{ruleForm.addTime | dateFormat('YYYY-MM-DD HH:mm:ss') }}
      </el-form-item>

      <el-form-item>
        <el-button @click="back">返回</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
export default {
  data () {
    return {
      ruleForm: {
        roleName: "",
        roleCode: "",
        appCode: "",
        remark: ""
      },
      id: "" //上个页面传过来的值
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getData()
  },
  methods: {
    getData () {
      this.$api.api.findOutletUserById(this.id)
        .then(result => {
          //返回结果处理
          let dataRow = result.data;
          if (dataRow.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
            this.ruleForm = dataRow.data
          } else {
            this.$message.error(dataRow.retmsg)
          }

          //关闭loading
          this.loading = false
        }).catch(() => {
          //关闭loading
          this.loading = false
          this.$message.error("请求失败！")
        })
    },
    back () {
      this.$fun.goBack();
    }
  }
}
</script>
<style lang="less" scoped>
.line {
  width: 100%;
  height: 1px;
  background-color: #000000;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>