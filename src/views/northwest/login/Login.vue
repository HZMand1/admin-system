<template>
  <section class="northwest-login">
    <headers></headers>
    <main>
      <div class="text">
        <p class="a">供应保障</p>
        <p class="b">服务西北</p>
      </div>
      <div class="login-w">
        <p class="title">西北地区中药材供应保障服务平台</p>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0">
          <el-row>
            <el-col :span="22" :offset="1">
              <el-form-item label="" prop="account">
                <el-input v-model="ruleForm.account" placeholder="输入您的账号或者手机号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22" :offset="1">
              <el-form-item label="" prop="password">
                <el-input v-model="ruleForm.password" type="password" placeholder="输入您的密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="15" :offset="1">
              <el-form-item label="" prop="code">
                <el-input v-model="ruleForm.code" placeholder="输入验证码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" class="pad-l-10">
              <el-form-item label="">
                <div class="code"></div>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="22" :offset="1">
              <el-checkbox v-model="ruleForm.checked">
                <p class="clause">同意并遵守<a href="/">《个人条款》</a></p>
              </el-checkbox>
            </el-col>
          </el-row>
          <el-row class="pad-t-20">
            <el-col :span="22" :offset="1">
              <el-button class="submit" @click="submitForm('ruleForm')" :loading="accountLoadingBtn">登录</el-button>
            </el-col>
          </el-row>
          <el-row class="pad-t-18">
            <el-col :span="22" :offset="1">
              <p class="forgot-password">忘记密码?</p>
              <p class="registered">
                <router-link to="/northwest/registered">没有账号？去注册</router-link>
              </p>
            </el-col>
          </el-row>
          <!-- <el-row class="pad-t-30">
            <el-col :span="16" :offset="4">
              <hr />
              <span class="other-text">其它登录方式</span>
            </el-col>
          </el-row>
          <el-row class="pad-t-30 auth">
            <el-col :span="22" :offset="1">
              <p>一键授权种子种苗交易平台</p>
            </el-col>
          </el-row> -->
        </el-form>
      </div>
    </main>
    <footers></footers>
  </section>
</template>
<script>
import "../../../assets/less/northwest/login/login.less";
import Headers from "../components/loginHeader";
import Footers from "../components/loginFooter";
import Storage from "../../../assets/utils/Storage.js";
export default {
  name: "Login",
  components: { Headers, Footers },
  data() {
    return {
      ruleForm: {
        account: null,
        password: null,
        code: null,
        checked: false
      },
      rules: {
        account: [
          {
            required: true,
            message: "请输入您的账号或者手机号",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入您的密码", trigger: "change" }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "change" }]
      },
      accountLoadingBtn: false
    };
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (!this.ruleForm.checked) {
            this.$message({
              message: "请勾选同意并遵守《个人条款》",
              type: "warning"
            });
            return;
          }
          this.accountLoadingBtn = true;
          let params = {
            account: this.ruleForm.account,
            password: this.ruleForm.password,
            appCode: "outlet"
          };
          this.$api.api
            .login(params)
            .then(result => {
              if (result.data.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
                this.$message({
                  message: "登录成功",
                  type: "success"
                });
                Storage.localSet("token", result.data.data.token);
                Storage.localSet("userInfo", result.data.data.userEntity);
                this.$router.push("/backstage/home");
                setTimeout(() => {
                  this.accountLoadingBtn = false;
                }, 600);
              } else {
                Storage.localRemove("token");
                Storage.localRemove("userInfo");
                this.$message.error(result.data.retmsg);
                this.accountLoadingBtn = false;
              }
            })
            .catch(err => {
              console.log(err);
              this.$message.error("服务器出错");
              this.accountLoadingBtn = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>