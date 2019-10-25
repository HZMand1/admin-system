<template>
  <!-- 新增系统参数 -->
  <section class="bor-1 mar-l-20 mar-r-20">
    <el-row class="bor-b-1">
      <el-col class="pad-l-20 font-weight-b" style="line-height: 50px;">新增</el-col>
    </el-row>
    <el-row class="pad-t-30">
      <el-col>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm pad-r-30">
          <el-form-item label="参数名" prop="sysName">
            <el-input v-model="ruleForm.sysName"></el-input>
          </el-form-item>
          <el-form-item label="参数值" prop="sysValue">
            <el-input v-model="ruleForm.sysValue"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" :rows="3" placeholder="备注" v-model="ruleForm.sysTextarea">
            </el-input>
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
  }
};
</script>
<style lang="less" scoped>
</style>