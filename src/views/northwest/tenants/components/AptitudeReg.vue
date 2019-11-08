<template>
  <!-- 资质申请 -->
  <section>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px">
      <el-row>
        <el-col :span="13" :offset="4">
          <el-form-item label="类型 : " prop="type">
            <el-select v-model="ruleForm.type">
              <el-option label="个人" value="personal"></el-option>
              <el-option label="企业" value="enterprise"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="ruleForm.type==='enterprise'">
        <el-col :span="13" :offset="4">
          <el-form-item label="企业名称 : " prop="account">
            <el-input v-model="ruleForm.account"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="ruleForm.type==='enterprise'">
        <el-col :span="13" :offset="4">
          <el-form-item label="企业法人 : " prop="account">
            <el-input v-model="ruleForm.account"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="ruleForm.type==='personal'">
        <el-col :span="13" :offset="4">
          <el-form-item label="持有人 : " prop="account">
            <el-input v-model="ruleForm.account"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="ruleForm.type==='personal'">
        <el-col :span="13" :offset="4">
          <el-form-item label="持有人电话 : " prop="account">
            <el-input v-model="ruleForm.account"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="13" :offset="4">
          <el-form-item :label="ruleForm.type==='personal' ?'持有人身份证 : ':' 法人身份证号 : '" prop="account">
            <el-input v-model="ruleForm.account"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="13" :offset="4">
          <el-form-item :label="ruleForm.type==='personal' ?'身份证照片 : ':' 法人身份证照片 : '" prop="account">
            <horizontal-upload-image></horizontal-upload-image>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="ruleForm.type==='personal'">
        <el-col :span="13" :offset="4">
          <el-form-item label="自产自销证明 : " prop="account">
            <el-input v-model="ruleForm.account"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="ruleForm.type==='enterprise'">
        <el-col :span="13" :offset="4">
          <el-form-item label="企业证件照 : " prop="account">
            <el-input v-model="ruleForm.account"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="13" :offset="4">
          <el-form-item label="银行卡号 : " prop="account">
            <el-input v-model="ruleForm.account"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="13" :offset="4">
          <el-form-item label="开户行 : " prop="account">
            <el-input v-model="ruleForm.account"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="10" :span="5">
          <el-button class="enter" @click="application('ruleForm')">下一步</el-button>
        </el-col>
      </el-row>
    </el-form>
  </section>
</template>
<script>
import HorizontalUploadImage from "@/components/HorizontalUploadImage";
export default {
  name: "AptitudeReg",
  components: { HorizontalUploadImage },
  data() {
    return {
      ruleForm: {
        type: "personal"
      },
      rules: {}
    };
  }
};
</script>
<style lang="less" scoped>
</style>