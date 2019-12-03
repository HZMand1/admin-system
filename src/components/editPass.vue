<template>
  <!-- 修改密码 -->
  <section class="edit-pass pad-t-20">
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="500px" @open="openDialog" :before-close="cancel">
      <section>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-row>
            <el-col>
              <el-form-item label="新密码 : " prop="password">
                <el-input v-model="ruleForm.password" type="password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="确认新密码 : " prop="checkPass">
                <el-input v-model="ruleForm.checkPass" type="password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<script>
import Storage from "../assets/utils/Storage.js";
export default {
  name: "editPass",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let password = (rule, value, callback) => {
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
      if (!value) {
        callback(new Error("请输入新密码"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入数字和字母组合的密码,限制6-20位"));
      } else {
        callback();
      }
    };
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
        password: "",
        checkPass: ""
      },
      rules: {
        password: [{ validator: password, trigger: "change" }],
        checkPass: [{ validator: checkPass, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 取消
    cancel() {
      this.$emit("cancelEmit", false);
    },
    // 确认提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            id: Storage.localGet("userInfo").id,
            password: this.ruleForm.password
          };
          this.$api.api
            .updateSeedUser(params)
            .then(result => {
              if (result.data.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
                this.$message({
                  message: "密码修改成功，下次登录生效!",
                  type: "success"
                });
              } else {
                this.$message.error(result.data.retmsg);
              }
            })
            .catch(err => {
              console.log(err);
            });
          this.cancel();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 打开弹框调用
    openDialog() {
      this.ruleForm.password = "";
      this.ruleForm.checkPass = "";
    }
  }
};
</script>
<style lang="less" scoped>
</style>