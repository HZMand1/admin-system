<template>
  <div id="editMember">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)">
      <span style="font-size:26px">账号信息</span>
      <div class="line"></div>
      <el-form-item label="账号："
                    prop="account">
        <el-col :span="4">
          {{ruleForm.account}}
        </el-col>
      </el-form-item>
      <el-form-item label="联系人："
                    prop="name">
        <el-col :span="4">
          {{ruleForm.name}}
        </el-col>
      </el-form-item>
      <el-form-item label="联系电话："
                    prop="phone">
        <el-col :span="4">
          {{ruleForm.phone}}
        </el-col>
      </el-form-item>
      <span style="font-size:26px">账号信息</span>
      <div class="line"></div>

      <el-form-item label="企业名称："
                    prop="companyName">
        <el-col :span="4">
          <el-input v-model="ruleForm.companyName"
                    placeholder="请输入名称"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="企业logo："
                    prop="companyLogo">
        <el-col :span="4">
          <el-image style="width: 100px; height: 100px"
                    :src="ruleForm.companyLogo"
                    :fit="fit"></el-image>
        </el-col>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  mounted () { },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.line {
  width: 100%;
  height: 1px;
  background-color: #000000;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>