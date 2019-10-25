<template>
  <div id="userMaeage">
    <el-row>
      <el-col :span="4">
        <el-input v-model="input"
                  placeholder="用户名"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button>查询</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary">新增</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary">修改</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="danger">删除</el-button>
      </el-col>

    </el-row>

  </div>
</template>
<script>
export default {
  data () {
    return {
      input: ""
    }
  }
}
</script>