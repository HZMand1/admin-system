<template>
  <div id="categoryDetail">
    <el-form ref="form"
             :model="dataForm">
      <el-form-item label="父级分类：">{{parentId}}</el-form-item>
      <el-form-item label="分类名称：">{{name}}</el-form-item>
      <el-form-item label="排序：">{{appCode}}</el-form-item>
      <el-form-item label="是否显示">{{enable}}</el-form-item>
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

      dataForm: {
        roleName: "",
        roleCode: "",
        appCode: "",
        remark: ""
      },
      id: "" //上个页面传过来的值
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getData()
  },
  methods: {
    /**
     * 查询详情
     */
    getData () {
      let params = {
        id: this.id
      }
      this.$api.api.goodsCategoryFindCategoryById(params)
        .then(result => {
          //返回结果处理
          let dataRow = result.data;
          if (dataRow.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
            this.dataForm = dataRow.data
          } else {
            this.$message.error(dataRow.retmsg)
          }
        }).catch(() => {
          this.$message.error("请求失败！")
        })
    },
    back () {
      this.$fun.goBack();
    }
  }
}
</script>