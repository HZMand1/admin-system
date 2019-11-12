<template>
  <div id="categoryDetail">
    <el-form ref="form"
             :model="dataForm">
      <el-form-item label="父级分类：">{{dataForm.parentName}}</el-form-item>
      <el-form-item label="分类名称：">{{dataForm.name}}</el-form-item>
      <el-form-item label="排序：">{{dataForm.orders}}</el-form-item>
      <el-form-item label="是否显示：">{{dataForm.enable | enableFormat}}</el-form-item>
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
      dataForm: {},
      id: "" //上个页面传过来的值
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getData()
  },
  filters: {
    enableFormat (value) {
      if (value === 0) {
        return "启用"
      } else {
        return "禁用"
      }
    },
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