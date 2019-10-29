<template>
  <div id="adduser">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px">
      <el-form-item label="账号"
                    prop="account"
                    required>
        <el-input v-model="ruleForm.account"
                  placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="password"
                    required>
        <el-input v-model="ruleForm.password"
                  placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="用户名"
                    prop="name"
                    required>
        <el-input v-model="ruleForm.name"
                  placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"
                    prop="email">
        <el-input v-model="ruleForm.email"
                  placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号"
                    prop="phone">
        <el-input v-model="ruleForm.phone"
                  placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="角色"></el-form-item>
      <el-form-item label="状态">
        <el-radio v-model="radio"
                  label="1">禁用</el-radio>
        <el-radio v-model="radio"
                  label="2">正常</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submit">提交</el-button>
        <el-button @click="back">返回</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ruleForm: {
        account: "",
        password: "",
        name: "",
        email: "",
        phone: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ]
      },
      radio: "1"
    }
  },
  methods: {
    //表单提交
    submit () {
      this.$confirm("确认提交？", "提交", {        confirmButtonText: "确定", cancelButtonText: "取消", type: "warning"
      })
        .then(() => {
          //调用新增接口
          let dataRow = this.$api.api.insertSeedUser({
            //参数
          }).then(result => {
            //返回结果处理
            let dataRow = result.data;
            if (dataRow.retcode === 1) {
              this.$message({
                message: dataRow.retmsg,
                type: success
              })
            } else {
              this.$message.error(dataRow.retmsg)
            }
          }).catch(() => {
            this.$message.error("请求失败！")
          })
        })
    },
    back () {
      this.$fun.goBack();
    }
  }
}
</script>