<template>
  <section class="northwest-registered">
    <headers></headers>
    <main>
      <div class="text">
        <p class="a">供应保障</p>
        <p class="b">服务西北</p>
      </div>
      <div class="registered-w">
        <p class="title">注册</p>
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
          <el-row>
            <el-col :span="22" :offset="1">
              <el-form-item label="" prop="conPassword">
                <el-input v-model="ruleForm.conPassword" type="password" placeholder="再次输入您的密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="22" :offset="1">
              <el-form-item label="" prop="phone">
                <el-input v-model="ruleForm.phone" placeholder="请输入您的手机号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="15" :offset="1">
              <el-form-item label="" prop="code">
                <el-input v-model="ruleForm.code" placeholder="输入验证码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" class="pad-l-10">
              <el-form-item label="">
                <div class="code">获取验证码</div>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="22" :offset="1">
              <el-button class="submit" @click="submitForm('ruleForm')">立即注册</el-button>
            </el-col>
          </el-row>
          <el-row class="pad-t-18">
            <el-col :span="22" :offset="1">
              <p class="registered">
                <router-link to="/northwest/login">已有账号？去登陆</router-link>
              </p>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </main>
    <footers></footers>
  </section>
</template>
<script>
import "../../../assets/less/northwest/registered/registered.less";
import Headers from "../components/loginHeader";
import Footers from "../components/loginFooter";
export default {
  name: "Registered",
  components: { Headers, Footers },
  data() {
    return {
      ruleForm: {
        account: null,
        password: null,
        conPassword: null,
        phone: null,
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
        conPassword: [
          { required: true, message: "请再次输入您的密码", trigger: "change" }
        ],
        phone: [
          { required: true, message: "请输入您的手机号", trigger: "change" }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log("ok");
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