<template>
  <div id="adduser">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-form-item label="账号"
                    prop="account">
        <el-input v-model="ruleForm.account"
                  placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input v-model="ruleForm.password"
                  placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="用户名"
                    prop="name">
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
      <el-form-item label="固话"
                    prop="tel">
        <el-input v-model="ruleForm.tel"
                  placeholder="请输入固话"></el-input>
      </el-form-item>
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
        phone: "",
        tel: ""
      },
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ]
      },
      radio: "1",
      loading: false
    }
  },
  methods: {
    //表单提交
    submit () {
      this.$confirm("确认提交？", "提交", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //打开loading
          this.loading = true
          //调用新增接口
          this.$api.api.insertSeedUser(this.ruleForm)
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
            }).catch(() => {
              //关闭loading
              this.loading = false
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