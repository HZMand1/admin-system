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
          <el-form-item label="确认密码 : " prop="checkPass">
            <el-input v-model="ruleForm.checkPass" type="password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="13" :offset="4">
          <el-form-item label="手机号码 : " prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
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
      </el-row> -->
      <el-row>
        <el-col :offset="10" :span="14">
          <el-button class="enter" @click="application('ruleForm')" :loading="accountLoadingBtn">立即入驻</el-button>
        </el-col>
      </el-row>
    </el-form>
  </section>
</template>
<script>
export default {
  name: "AccountReg",
  data() {
    let checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        account: null,
        password: null,
        checkPass: null
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPass: [{ required: true, validator: checkPass, trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        telCode: [
          { required: true, message: "请输入手机验证码", trigger: "blur" }
        ]
      },
      accountLoadingBtn: false
    };
  },
  methods: {
    // 商家入驻触发下一步
    application(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            account: this.ruleForm.account,
            password: this.ruleForm.password,
            // 注册来源，0 - 买家，1 - 卖家
            resource: 1,
            enable: 0
          };
          this.accountLoadingBtn = true;
          this.$api.api
            .insertOutletUser(params)
            .then(result => {
              if (result.data.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
                this.$message({
                  message: result.data.retmsg,
                  type: "success"
                });
                this.accountLoadingBtn = false;
                this.$emit("nextEmit", 2);
              } else {
                this.accountLoadingBtn = false;
                this.$message.error(result.data.retmsg);
              }
            })
            .catch(err => {
              this.accountLoadingBtn = false;
              console.log(err);
              this.$message.error("服务器出错");
            });
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