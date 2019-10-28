<template>
  <!-- 修改系统参数 -->
  <section class="bor-1">
    <el-row class="bor-b-1">
      <el-col class="pad-l-20 font-weight-b" style="line-height: 50px;">修改</el-col>
    </el-row>
    <el-row class="pad-t-30">
      <el-col>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm pad-r-30">
          <el-form-item label="参数名" prop="sysName">
            <el-input v-model="ruleForm.sysName" placeholder="参数名"></el-input>
          </el-form-item>
          <el-form-item label="参数值" prop="sysValue">
            <el-input v-model="ruleForm.sysValue" placeholder="参数值"></el-input>
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
  name: "EditSys",
  data() {
    return {
      ruleForm: {
        sysName: "",
        sysValue: "",
        sysTextarea: ""
      },
      rules: {
        sysName: [
          { required: true, message: "参数名不能为空", trigger: "blur" }
        ],
        sysValue: [
          { required: true, message: "参数值不能为空", trigger: "blur" }
        ],
        menuUrl: [
          { required: true, message: "菜单 url 不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 提交成功
          this.$message({
            message: "恭喜你，这是一条成功消息",
            type: "success"
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