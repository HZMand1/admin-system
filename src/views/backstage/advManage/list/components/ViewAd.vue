<template>
  <!-- 查看广告 -->
  <section class="pad-t-20">
    <el-form ref="form" :model="form" label-width="130px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="广告名称 : ">
            {{ form.title }}
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="广告编号 : ">
            {{ form.typeCode }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="开始时间 : ">
            {{ form.addTime | dateFormat('YYYY-MM-DD') }}
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="结束时间 : ">
            {{ form.finishTime | dateFormat('YYYY-MM-DD') }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="广告位名称 : ">
            {{ form.subTitle }}
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="广告位编号 : ">
            {{ form.typeName }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="广告URL地址 : ">
            {{ form.url }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="显示顺序 : ">
            {{ form.orders }}
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="广告状态 : ">
            {{ form.enable === 0 ? '开启' : '禁用' }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" v-viewer>
          <el-form-item label="广告图 : ">
            <img :src="form.imgPath" alt="" style="cursor: pointer;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="pad-t-30">
        <el-col :span="3" :offset="10">
          <el-button @click="goBack">返回</el-button>
        </el-col>
      </el-row>
    </el-form>
  </section>
</template>
<script>
export default {
  name: "viewAd",
  data() {
    return {
      form: {}
    }
  },
  mounted() {
    const { id } = this.$route.query
    let params = { id: id }
    this.$api.api
      .findAdNewsById(params)
      .then(res => {
        if (res.data.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
          let data = res.data.data
          this.form = data
        } else {
          this.$message({
            type: "error",
            message: res.data.retmsg
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    goBack() {
      this.$router.push("/backstage/advManage/AdvList")
    }
  }
}
</script>
<style lang="less" scoped></style>
