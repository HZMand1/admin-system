<template>
  <!-- 新增系统参数 -->
  <section class="bor-1">
    <el-row class="bor-b-1">
      <el-col class="pad-l-20 font-weight-b" style="line-height: 50px;">新增</el-col>
    </el-row>
    <el-row class="pad-t-30" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-col>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm pad-r-30">
          <el-form-item label="参数名" prop="sysName">
            <el-input v-model="ruleForm.sysName" placeholder="参数名"></el-input>
          </el-form-item>
          <el-form-item label="参数值" prop="sysValue">
            <el-input v-model="ruleForm.sysValue" placeholder="参数值"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="sysType">
            <el-input v-model="ruleForm.sysType" placeholder="类型"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" :rows="3" placeholder="备注" v-model="ruleForm.sysTextarea">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button type="warning" @click="goback">返回</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </section>
</template>
<script>
export default {
  name: "AddSys",
  data() {
    return {
      ruleForm: {
        sysName: "",
        sysValue: "",
        sysType: "",
        sysTextarea: ""
      },
      rules: {
        sysName: [
          { required: true, message: "参数名不能为空", trigger: "blur" }
        ],
        sysValue: [
          { required: true, message: "参数值不能为空", trigger: "blur" }
        ],
        sysType: [{ required: true, message: "类型不能为空", trigger: "blur" }],
        menuUrl: [
          { required: true, message: "菜单 url 不能为空", trigger: "blur" }
        ]
      },
      code: this.$config.RET_CODE.SUCCESS_CODE,
      SSXT: this.$config.SSXT,
      loading: false
    };
  },
  methods: {
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 提交成功
          this.loading = true;
          let params = {
            code: this.ruleForm.sysName,
            val: this.ruleForm.sysValue,
            remark: this.ruleForm.sysTextarea,
            type: this.ruleForm.sysType,
            appCode: this.SSXT
          };
          this.$api.api
            .addSysList(params)
            .then(result => {
              this.loading = false;
              if (result.data.retcode === this.code) {
                this.$message({
                  message: result.data.retmsg,
                  type: "success"
                });
                this.goback();
              } else {
                this.$message.error(result.data.retmsg);
              }
            })
            .catch(err => {
              this.loading = false;
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 返回
    goback() {
      this.$fun.goBack();
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less" scoped>
</style>