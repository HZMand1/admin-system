<template>
  <section class="login">
    <div class="concent">
      <el-form ref="form" :model="form" label-width="70px" :rules="rules">
        <el-form-item label="账号 : " prop="account">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码 : " prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="submitForm(form)" :loading="accountLoadingBtn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>
<script>
import "../../../assets/less/login.less";
import Storage from "../../../assets/utils/Storage.js";
export default {
  name: "login",
  data() {
    return {
      form: {
        password: null,
        account: null
      },
      accountLoadingBtn: false,
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "change" }]
      }
    };
  },
  created() {
    let that = this;
    document.onkeypress = function(e) {
      let keycode = document.all ? event.keyCode : e.which;
      if (keycode === 13) {
        // 回车登录
        that.submitForm(that.form);
        return false;
      }
    };
  },
  mounted() {
    Storage.localRemove("token");
    Storage.localRemove("userInfo");
  },
  methods: {
    submitForm(form) {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.accountLoadingBtn = true;
          let params = {
            account: form.account,
            password: form.password,
            appCode: "SEED"
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
                Storage.localSet("userInfo", result.data.data.userInfo);
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