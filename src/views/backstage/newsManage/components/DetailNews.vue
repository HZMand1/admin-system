<template>
  <div id="detailNews">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-form-item label="账号"
                    prop="account">
        <el-input v-model="ruleForm.account"
                  placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input v-model="ruleForm.password"
                  placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="用户名"
                    prop="name">
        <el-input v-model="ruleForm.name"
                  placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"
                    prop="email">
        <el-input v-model="ruleForm.email"
                  placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号"
                    prop="phone">
        <el-input v-model="ruleForm.phone"
                  placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="固话"
                    prop="tel">
        <el-input v-model="ruleForm.tel"
                  placeholder="请输入固话"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submit">提交</el-button>
        <el-button @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: ""
    }
  },
  methods: {

  }
}
</script>