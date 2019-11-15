<template>
  <div id="roleDetail">
    <el-form :model="ruleForm"
             ref="ruleForm"
             label-width="100px">
      <el-form-item label="角色名称"
                    prop="roleName">
        {{ruleForm.roleName}}
      </el-form-item>
      <el-form-item label="角色编号"
                    prop="roleCode">
        {{ruleForm.roleCode}}
      </el-form-item>
      <el-form-item label="所属系统"
                    prop="appCode">
        {{ruleForm.appCode}}
      </el-form-item>
      <el-form-item label="备注"
                    prop="remark">
        {{ruleForm.remark}}
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
      loading: false,
      id: "" //上个页面传过来的值
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getData()
  },
  methods: {

    /**
     * 获取角色详情
     */
    getData () {
      let params = {
        id: this.id
      }
      this.$api.api.findRoleById(params)
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