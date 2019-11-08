<template>
  <!-- 商家账号申请 -->
  <section class="account-reg">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px">
      <el-row>
        <el-col :span="13" :offset="4">
          <el-form-item label="账号 : " prop="account">
            <el-input v-model="ruleForm.account"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="13" :offset="4">
          <el-form-item label="密码 : " prop="password">
            <el-input v-model="ruleForm.password" type="password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="13" :offset="4">
          <el-form-item label="确认密码 : " prop="cPassword">
            <el-input v-model="ruleForm.cPassword" type="password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="13" :offset="4">
          <el-form-item label="联系人 : " prop="contact">
            <el-input v-model="ruleForm.contact"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="4">
          <el-form-item label="手机验证码 : " prop="telCode">
            <el-input v-model="ruleForm.telCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" class="pad-l-10">
          <div class="get-code">获取验证码</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="10" :span="14">
          <el-button class="enter" @click="application('ruleForm')">立即入驻</el-button>
        </el-col>
      </el-row>
    </el-form>
  </section>
</template>
<script>
export default {
  name: "AccountReg",
  data() {
    return {
      ruleForm: {},
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        cPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" }
        ],
        contact: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        telCode: [
          { required: true, message: "请输入手机验证码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 商家入驻触发下一步
    application(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("nextEmit", 2);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less" scoped>
</style>