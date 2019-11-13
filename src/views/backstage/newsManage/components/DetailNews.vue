<template>
  <div id="detailNews">
    <el-form :model="ruleForm"
             ref="ruleForm"
             label-width="100px"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-form-item label="资讯标题："
                    prop="title">{{ruleForm.title}}</el-form-item>
      <el-form-item label="资讯来源："
                    prop="textSourceName">{{textSourceName}}</el-form-item>
      <el-form-item label="原创或转载："
                    prop="textTypeName">{{textTypeName}}</el-form-item>
      <el-form-item label="资讯分类："
                    prop="typeName">{{ruleForm.typeName}}</el-form-item>

      <el-form-item label="资讯封面图："
                    prop="imgPath">
        <el-image style="width: 100px; height: 100px"
                  :src="ruleForm.imgPath"
                  :fit="fit"></el-image>

      </el-form-item>
      <el-form-item label="资讯摘要："
                    prop="subTitle">
        <el-col :span="20">{{ruleForm.subTitle}}</el-col>
      </el-form-item>
      <el-form-item label="资讯内容："
                    prop="content">
        <el-col :span="20">
          <div v-html="ruleForm.content"></div>
        </el-col>
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
        title: "", //标题
        textSource: "0", //文章来源(0,"文本形式",1,"链接形式")
        textType: "0", //文章类型 (0,"原创",1,"转载")
        typeCode: "0", //资讯分类 
        imgPath: "", //图片路径
        subTitle: "", //资讯摘要
        content: "", //资讯内容
      },
      textSourceName: "", //"文本形式","链接形式"
      textTypeName: "", //"原创","转载"
      loading: false, //表单加载
      id: "", //传过来的id值
      infoType: [], //资讯分类
      originalReprint: [], //原创和转载
      infoSource: [], //资讯来源
      fit: "fill",//确定图片如何适应容器框

    }
  },
  mounted () {
    this.loading = true

    //资讯分类
    this.getSystemParams("INFO_TYPE")

    //原创和转载
    this.getSystemParams("ORIGINAL_REPRINT")

    //资讯来源
    this.getSystemParams("INFO_SOURCE")

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
      this.$api.api.findAdNewsById(params)
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
    },//根据参数，获取不同类型的系统参数
    getSystemParams (par) {
      let params = {
        type: par
      }
      let that = this
      this.$api.api.systemParamFindListByType(params)
        .then(result => {
          let dataRow = result.data
          if (dataRow.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
            if ("INFO_TYPE" === par) {
              this.infoType = dataRow.data
            } else if ("ORIGINAL_REPRINT" === par) {
              this.originalReprint = dataRow.data

              dataRow.data.map(item => {
                if (item.val === this.ruleForm.textType) {
                  this.textTypeName = item.code
                }
              })

            } else if ("INFO_SOURCE" === par) {
              this.infoSource = dataRow.data

              dataRow.data.map(item => {
                if (item.val === this.ruleForm.textSource) {
                  this.textSourceName = item.code
                }
              })
            }
          } else {
            this.$message.error(dataRow.retmsg)
          }
        }).catch(() => {
          this.$message.error("请求失败！")
        })
    },
    //返回按钮
    back () {
      this.$fun.goBack()
    },


  }
}
</script>