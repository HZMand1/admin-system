<template>
  <!-- 资质申请 -->
  <section>
    <el-row v-if="isAuth">
      <el-col>
        <p class="text-center aptitude-tip">您已成功注册，请完善<span>资质认证</span>，才能进行店铺操作</p>
        <div class="aptitude-btn">
          <el-button @click="immediately">立即认证</el-button>
          <el-button @click="goBack">返回</el-button>
        </div>
      </el-col>
    </el-row>
    <el-form v-else :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px">
      <el-row>
        <el-col :span="13" :offset="4">
          <el-form-item label="类型 : " prop="userType">
            <el-select v-model="ruleForm.userType">
              <el-option label="个人" value="personal"></el-option>
              <el-option label="企业" value="enterprise"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="ruleForm.userType==='enterprise'">
        <el-col :span="13" :offset="4">
          <el-form-item label="企业名称 : " prop="enterpriseName">
            <el-input v-model="ruleForm.enterpriseName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="ruleForm.userType==='enterprise'">
        <el-col :span="13" :offset="4">
          <el-form-item label="企业法人 : " prop="enterprisePerson">
            <el-input v-model="ruleForm.enterprisePerson"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="ruleForm.userType==='personal'">
        <el-col :span="13" :offset="4">
          <el-form-item label="持有人 : " prop="legalName">
            <el-input v-model="ruleForm.legalName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="ruleForm.userType==='personal'">
        <el-col :span="13" :offset="4">
          <el-form-item label="持有人电话 : " prop="legalMobile">
            <el-input v-model="ruleForm.legalMobile" maxlength="11"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="13" :offset="4">
          <el-form-item :label="ruleForm.userType==='personal' ?'持有人身份证号 : ':' 法人身份证号 : '" prop="possessorCard">
            <el-input v-model="ruleForm.possessorCard"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="13" :offset="4">
          <el-form-item class="mark-red" :label="ruleForm.userType==='personal' ?'身份证照片 : ':' 法人身份证照片 : '">
            <el-row>
              <el-col :span="12">
                <horizontal-upload-image tip="正面" ref="legalFontPath"></horizontal-upload-image>
              </el-col>
              <el-col :span="12" class="pad-l-10">
                <horizontal-upload-image tip="反面" ref="legalBackPath"></horizontal-upload-image>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="ruleForm.userType==='personal'">
        <el-col :span="13" :offset="4">
          <el-form-item class="mark-red" label="自产自销证明 : ">
            <horizontal-upload-image tip="" ref="sellerNo"></horizontal-upload-image>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="ruleForm.userType==='enterprise'">
        <el-col :span="13" :offset="4">
          <el-form-item class="mark-red" label="企业证件照 : ">
            <el-row>
              <el-col :span="12">
                <horizontal-upload-image tip="营业执照" ref="creditImgPath"></horizontal-upload-image>
              </el-col>
              <el-col :span="12" class="pad-l-10">
                <horizontal-upload-image tip="种子种苗经营许可证" ref="seedlings"></horizontal-upload-image>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="13" :offset="4">
          <el-form-item label="银行卡号 : " prop="bankCard">
            <el-input v-model="ruleForm.bankCard" @keyup.native="validateNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="13" :offset="4">
          <el-form-item label="开户行 : " prop="openingBank">
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
  props: {
    userId: {
      type: String,
      require: true
    },
    isAuth: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ruleForm: {
        userType: "personal",
        bankCard: null,
        openingBank: null
      },
      rules: {
        userType: [{ required: true, message: "请选择类型", trigger: "blur" }],
        enterpriseName: [
          { required: true, message: "请输入企业名称", trigger: "blur" }
        ],
        enterprisePerson: [
          { required: true, message: "请输入企业法人", trigger: "blur" }
        ],
        legalName: [
          { required: true, message: "请输入持有人名称", trigger: "blur" }
        ],
        legalMobile: [
          { required: true, message: "请输入持有人电话", trigger: "blur" }
        ],
        possessorCard: [
          { required: true, message: "请输入身份证号", trigger: "blur" }
        ],
        bankCard: [
          { required: true, message: "请输入银行卡号", trigger: "blur" }
        ],
        openingBank: [
          { required: true, message: "请输入开户行", trigger: "blur" }
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
            this.$message.error("银行卡输入错误");
          });
      }
    },
    // 立即认证
    immediately() {
      this.$emit("nextEmit", 2, false);
    },
    // 返回到种子种苗首页
    goBack() {
      this.$router.push("/");
    },
    // 提交资质审核
    application(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.userType === "personal") {
            // 个人
            let params = {
              // 类型
              userType: "0",
              // 用户ID
              userId: this.userId,
              // 持有人
              legalName: this.ruleForm.legalName,
              // 持有人手机
              legalMobile: this.ruleForm.legalMobile,
              // 身份证号码
              legalId: this.ruleForm.possessorCard,
              // 身份证正面
              legalFontPath: this.$refs.legalFontPath.imageUrl,
              // 身份证反面
              legalBackPath: this.$refs.legalBackPath.imageUrl,
              // 自产自销图
              sellerNo: this.$refs.sellerNo.imageUrl,
              // 银行卡号
              bankId: this.ruleForm.bankCard,
              // 开户行
              bankName: this.ruleForm.openingBank
            };
            this.$api.api
              .personalSubmitReview(params)
              .then(result => {
                if (
                  result.data.retcode === this.$config.RET_CODE.SUCCESS_CODE
                ) {
                  this.$message({
                    message: result.data.retmsg,
                    type: "success"
                  });
                  this.$emit("nextEmit", 3, false);
                } else {
                  this.$message.error(result.data.retmsg);
                }
              })
              .catch(err => {
                console.log(err);
                this.$message.error("服务器错误!!");
              });
          } else {
            // 企业
            let params = {
              // 类型
              userType: "1",
              // 用户ID
              userId: this.userId,
              // 企业名称
              companyName: this.ruleForm.enterpriseName,
              // 法人姓名
              legalName: this.ruleForm.enterprisePerson,
              // 法人身份证号码
              legalId: this.ruleForm.possessorCard,
              // 身份证正面
              legalFontPath: this.$refs.legalFontPath.imageUrl,
              // 身份证反面
              legalBackPath: this.$refs.legalBackPath.imageUrl,
              // 营业执照
              creditImgPath: this.$refs.creditImgPath.imageUrl,
              // 种子种苗经营许可证
              sellerNo: this.$refs.seedlings.imageUrl,
              // 银行卡号
              bankId: this.ruleForm.bankCard,
              // 开户行
              bankName: this.ruleForm.openingBank
            };
            this.$api.api
              .companySubmitReview(params)
              .then(result => {
                if (
                  result.data.retcode === this.$config.RET_CODE.SUCCESS_CODE
                ) {
                  this.$message({
                    message: result.data.retmsg,
                    type: "success"
                  });
                  this.$emit("nextEmit", 3);
                } else {
                  this.$message.error(result.data.retmsg);
                }
              })
              .catch(err => {
                console.log(err);
                this.$message.error("服务器错误!!");
              });
          }
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