<template>
  <!-- 资质申请 -->
  <section>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px">
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
          <el-form-item label="企业名称 : " prop="enterpriseName">
            <el-input v-model="ruleForm.enterpriseName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="ruleForm.type==='enterprise'">
        <el-col :span="13" :offset="4">
          <el-form-item label="企业法人 : " prop="enterprisePerson">
            <el-input v-model="ruleForm.enterprisePerson"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="ruleForm.type==='personal'">
        <el-col :span="13" :offset="4">
          <el-form-item label="持有人 : " prop="possessor">
            <el-input v-model="ruleForm.possessor"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="ruleForm.type==='personal'">
        <el-col :span="13" :offset="4">
          <el-form-item label="持有人电话 : " prop="possessorPhone">
            <el-input v-model="ruleForm.possessorPhone" maxlength="11"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="13" :offset="4">
          <el-form-item :label="ruleForm.type==='personal' ?'持有人身份证号 : ':' 法人身份证号 : '" prop="possessorCard">
            <el-input v-model="ruleForm.possessorCard"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="13" :offset="4">
          <el-form-item :label="ruleForm.type==='personal' ?'身份证照片 : ':' 法人身份证照片 : '" prop="account">
            <el-row>
              <el-col :span="12">
                <horizontal-upload-image tip="正面"></horizontal-upload-image>
              </el-col>
              <el-col :span="12" class="pad-l-10">
                <horizontal-upload-image tip="反面"></horizontal-upload-image>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="ruleForm.type==='personal'">
        <el-col :span="13" :offset="4">
          <el-form-item label="自产自销证明 : " prop="account">
            <horizontal-upload-image tip=""></horizontal-upload-image>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="ruleForm.type==='enterprise'">
        <el-col :span="13" :offset="4">
          <el-form-item label="企业证件照 : " prop="account">
            <el-row>
              <el-col :span="12">
                <horizontal-upload-image tip="营业执照"></horizontal-upload-image>
              </el-col>
              <el-col :span="12" class="pad-l-10">
                <horizontal-upload-image tip="种子种苗经营许可证"></horizontal-upload-image>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="13" :offset="4">
          <el-form-item label="银行卡号 : " prop="account">
            <el-input v-model="ruleForm.bankCard" @keyup.native="validateNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="13" :offset="4">
          <el-form-item label="开户行 : " prop="account">
            <el-input v-model="ruleForm.openingBank"></el-input>
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
let BIN = require("bankcardinfo");
export default {
  name: "AptitudeReg",
  components: { HorizontalUploadImage },
  data() {
    return {
      ruleForm: {
        type: "personal",
        bankCard: null,
        openingBank: null
      },
      rules: {
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
        enterpriseName: [
          { required: true, message: "请输入企业名称", trigger: "blur" }
        ],
        enterprisePerson: [
          { required: true, message: "请输入企业法人", trigger: "blur" }
        ],
        possessor: [
          { required: true, message: "请输入持有人名称", trigger: "blur" }
        ],
        possessorPhone: [
          { required: true, message: "请输入持有人电话", trigger: "blur" }
        ],
        possessorCard: [
          { required: true, message: "请输入身份证号", trigger: "blur" }
        ],
        account: [
          { required: true, message: "请输入身份证号", trigger: "blur" }
        ]
      }
    };
  },
  computed: {},
  methods: {
    // 输入银行卡号
    validateNum() {
      // this.ruleForm.bankCard = this.ruleForm.bankCard
      //   .replace(/[^\d]/g, "")
      //   .replace(/(\d{4})(?=\d)/g, "$1 ");
      if (this.ruleForm.bankCard.length >= 15) {
        BIN.getBankBin(this.ruleForm.bankCard)
          .then(data => {
            this.ruleForm.openingBank = data.bankName;
          })
          .catch(err => {
            this.$message.error(err);
          });
      }
    },
    application(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("nextEmit", 3);
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