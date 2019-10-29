<template>
  <div id="roleMaeage">
    <el-row>
      <el-col :span="6">
        <el-input class="mar-r-10 mar-b-20"
                  v-model="input"
                  placeholder="角色名称"></el-input>
      </el-col>
      <el-col :span="12">
        <el-button class="mar-l-10 mar-b-20">查询</el-button>
        <el-button class="mar-l-10 mar-b-20"
                   type="primary"
                   @click="addRole">新增</el-button>
        <el-button class="mar-l-10 mar-b-20"
                   type="primary"
                   @click="editRole">修改</el-button>
        <el-button class="mar-l-10 mar-b-20"
                   type="danger"
                   @click="deleteRole">删除</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-row class="pad-t-10 ">
      <el-table border
                :data="tableData"
                style="width:100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="index"
                         label=" "></el-table-column>
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="roleName"
                         label="角色名称"></el-table-column>
        <el-table-column prop="department"
                         label="所属部门"></el-table-column>
        <el-table-column prop="remark"
                         label="备注"></el-table-column>
        <el-table-column prop="createTime"
                         label="创建时间"></el-table-column>
      </el-table>
    </el-row>

    <!-- 分页 -->
    <el-row class="pad-t-20 pad-b-20 bor-1">
      <div class="text-center">
        <el-pagination background
                       @size-change="setAuctionSizeChange"
                       @current-change="setAuctionCurrentChange"
                       :current-page="currentPage"
                       :total="total"
                       :page-size="totalPage"
                       :page-sizes="[10, 20, 30, 40]"
                       layout="total,sizes,prev,pager,next,jumper"></el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage: 1, // 分页 当前页数
      totalPage: 10, // 分页 每页显示多少条
      total: 100, // 总条数
      input: "",
      tableData: [{
        roleName: "超级管理员",
        department: "市场部",
        remark: "备注1",
        createTime: Date.parse(new Date())
      }, {
        roleName: "总经理",
        department: "计划部",
        remark: "备注2",
        createTime: Date.parse(new Date())
      }, {
        roleName: "业务员",
        department: "业务部",
        remark: "备注3",
        createTime: Date.parse(new Date())
      }],
      multipleSelection: []

    }
  },
  methods: {
    // 多选
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    // 设置显示每页多少条数据
    setAuctionSizeChange (currentPage) {
      this.totalPage = currentPage;
    },
    // 设置当前页码
    setAuctionCurrentChange (val) {
      this.currentPage = val;
    },
    //跳转到新增页面
    addRole () {
      this.$router.push({ path: "/backstage/sysManage/roleManage/components/AddRole" })
    },
    //跳转到编辑页面
    editRole () {
      let num = this.multipleSelection.length;
      if (num !== 1) {
        this.$message.error("请选择一条记录");
        return;
      }
      let id = this.multipleSelection[0].id;
      this.$router.push({
        path: "/backstage/sysManage/roleManage/components/EditRole",
        query: { id: id }
      })
    },
    //删除数据
    deleteRole () {
      let num = this.multipleSelection.length;
      if (num !== 1) {
        this.$message.error("请选择一条记录");
        return;
      }
    }
  }


}
</script>
<style lang="less" scoped>
.bor-1 {
  border: 1px solid #ebeef5;
  border-top: none;
}
</style>