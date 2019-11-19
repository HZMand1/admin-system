<template>
  <div id="goodsDetail">
    <el-form :model="ruleForm"
             ref="ruleForm"
             label-width="100px"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-form-item label="分类："
                    prop="categoryName">{{ruleForm.categoryName}}</el-form-item>
      <el-form-item label="标题："
                    prop="title">{{ruleForm.title}}</el-form-item>
      <el-form-item label="商品名称："
                    prop="name">{{ruleForm.name}}</el-form-item>
      <el-col :span="12">
        <el-form-item label="规格："
                      prop="sku">{{ruleForm.sku}}</el-form-item>
      </el-col>
      <el-form-item label="库存量："
                    prop="oldQuan">{{ruleForm.oldQuan}}</el-form-item>
      <el-col :span="12">
        <el-form-item label="原价："
                      prop="oldPrice">{{ruleForm.oldPrice/100 + "    元/" + ruleForm.unit}}
        </el-form-item>
      </el-col>
      <el-form-item label="优惠价："
                    prop="price">{{ruleForm.price/100 + "    元/" + ruleForm.unit}}</el-form-item>
      <el-form-item label="发货地："
                    prop="region">{{ruleForm.region}}</el-form-item>

      <el-form-item label="商品图：">
        <el-col :span="12"
                v-viewer>
          <img class="mar-l-20"
               :key="index"
               v-for="(data,index) in strSplit(ruleForm.detailImgs)"
               :src="data"
               alt="图片"
               width="250"
               style="cursor: pointer;" />
        </el-col>
      </el-form-item>

      <el-form-item label="质检报告：">
        <el-col :span="18"
                v-viewer>
          <img :src="ruleForm.attach"
               alt="图片"
               style="cursor: pointer;" />
        </el-col>
      </el-form-item>

      <el-form-item label="商品描述："
                    prop="remark">
        <el-col :span="20">
          <div v-html="ruleForm.remark"></div>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-radio v-model="radio"
                    label="0">通过</el-radio>
          <el-radio v-model="radio"
                    label="1">不通过</el-radio>
        </el-row>
        <el-input class="mar-t-20"
                  type="textarea"
                  :rows="5"
                  placeholder="请输入原因"
                  v-model="auditCause">
        </el-input>
      </el-form-item>
      <el-form-item center>
        <el-button type="primary"
                   @click="audit">审核</el-button>
        <el-button @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ruleForm: {},
      loading: false, //表单加载
      id: "", //传过来的id值
      radio: "0", //0:已审核，1：审核不通过，2：未审核
      auditCause: "", //审核备注

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
      this.$api.api.goodsInfoFindGoodsById(params)
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

    //根据逗号截取字符串
    strSplit (data) {
      return (data || "").split(",")
    },

    //审核按钮
    audit () {
      let params = {
        id: this.id,
        reviewStatus: this.radio,
        review: this.auditCause
      }
      this.$api.api.goodsInfoGoodsReview(params)
        .then(result => {
          let dataRow = result.data
          if (dataRow.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
            this.$message({
              message: dataRow.retmsg,
              type: "success"
            })
            this.$fun.goBack()
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