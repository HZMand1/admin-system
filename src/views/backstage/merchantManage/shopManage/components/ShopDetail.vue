<template>
  <div id="detailNews">
    <el-form :model="ruleForm"
             ref="ruleForm"
             label-width="100px"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-form-item label="店铺名称："
                    prop="name">{{ruleForm.name}}</el-form-item>
      <el-form-item label="店铺简介："
                    prop="introduce">{{ruleForm.introduce}}</el-form-item>
      <el-form-item label="分类："
                    prop="reviewUser">{{ruleForm.reviewUser}}</el-form-item>
      <el-form-item label="专属域名："
                    prop="url">{{ruleForm.url}}</el-form-item>

      <el-form-item label="店铺logo："
                    prop="logo">
        <el-image style="width: 100px; height: 100px"
                  :src="ruleForm.logo"
                  :fit="fit"></el-image>

      </el-form-item>
      <el-form-item>
        <el-button center
                   @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ruleForm: {
        name: "", //店铺名称
        introduce: "", //店铺简介
        reviewUser: "", //分类
        url: "", //专属域名
        logo: "", //logo
      },
      loading: false, //表单加载
      id: "", //传过来的id值
      fit: "fill",//确定图片如何适应容器框

    }
  },
  mounted () {
    this.loading = true
    //根据id查询数据
    this.id = this.$route.query.id
    this.getData()
  },
  methods: {
    /**
     * 查询数据
     */
    getData () {
      let params = {
        id: this.id
      }
      this.$api.api.findSupplierInfoById(params)
        .then(result => {
          let dataRow = result.data
          if (dataRow.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
            this.ruleForm = dataRow.data
          } else {
            this.$message.error(dataRow.retmsg)
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
          this.$message.error("请求失败!")
        })
    },

    //返回按钮
    back () {
      this.$fun.goBack()
    },


  }
}
</script>