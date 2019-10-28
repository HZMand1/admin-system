<template>
  <div id="adduser">
    <el-form :model="reluForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px">
      <el-form-item label="用户名"
                    prop="userName"
                    required>
        <el-input v-model="ruleForm.userName"
                  placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="所属部门"
                    prop="department">
        <el-input v-model="ruleForm.department"
                  placeholder="请输入部门"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"
                    prop="email"
                    required>
        <el-input v-model="ruleForm.email"
                  placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号"
                    prop="phone"
                    required>
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
        userName: "",
        department: "",
        email: "",
        phone: ""
      },
      rules: {
        userName: [
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
      this.$confirm("确认提交？")
    },
    back () {
      this.$fun.goBack();
    }
  }
}
</script>