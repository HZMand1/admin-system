<template>
  <div id="userMaeage">
    <el-row>
      <el-col :span="6">
        <el-input class="mar-r-10 mar-b-20"
                  v-model="input"
                  placeholder="用户名"></el-input>
      </el-col>
      <el-col :span="12">
        <el-button class="mar-l-10 mar-b-20">查询</el-button>
        <el-button class="mar-l-10 mar-b-20"
                   type="primary"
                   @click="addUser">新增</el-button>
        <el-button class="mar-l-10 mar-b-20"
                   type="primary">修改</el-button>
        <el-button class="mar-l-10 mar-b-20"
                   type="danger">删除</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <template>
      <el-table border
                :data="tableData"
                style="width:100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="userName"
                         label="用户名"></el-table-column>
        <el-table-column prop="department"
                         label="所属部门"></el-table-column>
        <el-table-column prop="email"
                         label="邮箱"></el-table-column>
        <el-table-column prop="phone"
                         label="手机号"></el-table-column>
        <el-table-column prop="status"
                         label="状态"></el-table-column>
        <el-table-column prop="createTime"
                         label="创建时间"></el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
export default {
  data () {
    return {
      input: "",
      tableData: [{
        userName: "小明",
        department: "市场部",
        email: "123@qq.con",
        phone: "123",
        status: "正常",
        createTime: Date.parse(new Date())
      }, {
        userName: "小萌",
        department: "计划部",
        email: "456@qq.com",
        phone: "456",
        status: "正常",
        createTime: Date.parse(new Date())
      }, {
        userName: "小曌",
        department: "业务部",
        email: "789@qq.com",
        phone: "789",
        status: "正常",
        createTime: Date.parse(new Date())
      }]

    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },

    //跳转到新增页面
    addUser () {
      this.$router.push({ path: "/backstage/sysManage/userManage/components/AddUser" })
    }
  }


}
</script>