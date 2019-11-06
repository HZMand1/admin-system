<template>
  <section>
    <el-form :inline="true">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-form-item label="广告名称"
                        class="pad-r-20">
            <el-input placeholder="请输入广告名称"
                      v-model.trim="searchForm.title"
                      style="width: 150px"></el-input>
          </el-form-item>
          <el-form-item label="广告编号"
                        class="pad-r-20">
            <el-input placeholder="请输入广告编号"
                      v-model.trim="searchForm.typeCode"
                      style="width: 150px"></el-input>
          </el-form-item>
          <el-form-item label="广告时间"
                        class="pad-r-20">
            <el-date-picker v-model="searchForm.time"
                            type="daterange"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            :default-time="['00:00:00', '23:59:59']"
                            style="width: 250px">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="广告状态"
                        class="pad-r-30">
            <el-select v-model="searchForm.status"
                       style="width: 150px"
                       placeholder="请选择广告状态">
              <el-option label="开启"
                         value="0"></el-option>
              <el-option label="禁用"
                         value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="searchBtn()"
                       type="primary">查询</el-button>
            <el-button @click="resetSearchBtn()">重置</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <div class="text-right">
            <el-button type="primary"
                       round
                       @click="addHandle()">添加广告</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </section>
</template>

<script>
export default {
  props: {
    //搜索
    searchForm: {
      type: Object,
      default: Object,
      required: true
    }
  },
  methods: {
    //查询
    searchBtn () {
      this.$emit("searchBtn", this.searchForm)
    },
    //重置
    resetSearchBtn () {
      this.$emit("resetSearchBtn")
    },
    //添加
    addHandle () {
      this.$emit("addHandle")
    }
  }
}
</script>
