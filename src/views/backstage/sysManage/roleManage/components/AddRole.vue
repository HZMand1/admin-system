<template>
  <div id="addRole">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px">
      <el-form-item label="角色名称"
                    prop="roleName">
        <el-input v-model="ruleForm.roleName"
                  placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色编号"
                    prop="roleCode">
        <el-input v-model="ruleForm.roleCode"
                  placeholder="请输入角色编号"></el-input>
      </el-form-item>
      <el-form-item label="备注"
                    prop="remark">
        <el-input v-model="ruleForm.remark"
                  placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   :loading="loading"
                   @click="submit">提交</el-button>
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
        remark: ""
      },
      rules: {
        roleName: [
          { required: true, message: "请输入角色", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ]
      },
      loading: false
    }
  },
  methods: {
    //表单提交
    submit () {
      this.loading = true
      this.$confirm("确认提交？", "提交", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调用新增接口
          this.$api.api.insertRole(this.ruleForm)
            .then(result => {
              //返回结果处理
              let dataRow = result.data;
              if (dataRow.retcode === 1) {
                this.$message({
                  message: dataRow.retmsg,
                  type: "success"
                })
                //新增成功后，返回到上一页
                this.$fun.goBack();
              } else {
                this.$message.error(dataRow.retmsg)
              }
              //关闭loading
              this.loading = false
            }).cathc(() => {
              //关闭loading
              this.loading = false
              this.$message.error("请求失败！")
            })
        }).catch(() => {
          this.loading = false
        })
    },
    back () {
      this.$fun.goBack();
    }
  }
}
</script>
