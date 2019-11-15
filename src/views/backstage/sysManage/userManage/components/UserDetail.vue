<template>
  <div id="userDetail">
    <el-form :model="ruleForm"
             ref="ruleForm"
             label-width="100px"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-form-item label="账号"
                    prop="account">
        {{ruleForm.account}}
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        {{ruleForm.password}}
      </el-form-item>
      <el-form-item label="用户名"
                    prop="name">
        {{ruleForm.name}}
      </el-form-item>
      <el-form-item label="邮箱"
                    prop="email">
        {{ruleForm.email}}
      </el-form-item>
      <el-form-item label="手机号"
                    prop="phone">
        {{ruleForm.phone}}
      </el-form-item>
      <el-form-item label="固话"
                    prop="tel">
        {{ruleForm.tel}}
      </el-form-item>
      <el-form-item>
        <el-button @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ruleForm: {
        account: "",
        password: "",
        name: "",
        email: "",
        phone: "",
        tel: ""
      },
      loading: false,
      id: "" //上个页面传过来的值
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getData()
  },
  methods: {

    back () {
      this.$fun.goBack();
    },
    /**
     * 获取用户详情
     */
    getData () {
      this.loading = true
      let params = {
        id: this.id
      }
      this.$api.api.findSeedUserById(params)
        .then(result => {
          //返回结果处理
          let dataRow = result.data;
          if (dataRow.retcode === 1) {
            this.ruleForm = dataRow.data
          } else {
            this.$message.error(dataRow.retmsg)
          }

          //关闭loading
          this.loading = false
        }).catch(() => {
          //关闭loading
          this.loading = false
          this.$message.error("请求失败！")
        })
    }
  }
}
</script>