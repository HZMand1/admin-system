<template>
  <!-- 系统管理-系统参数 -->
  <section class="pad-l-20 pad-t-20 sys-parameters pad-r-20">
    <el-row>
      <el-col :span="4">
        <el-input v-model="searchValue" placeholder="参数名"></el-input>
      </el-col>
      <el-col :span="20">
        <span class="pad-l-10">
          <el-button icon="el-icon-search">搜索</el-button>
        </span>
        <span class="pad-l-10">
          <el-button type="primary" @click="addSys" icon="el-icon-plus">新增</el-button>
        </span>
        <span class="pad-l-10">
          <el-button type="warning" @click="editSys" icon="el-icon-edit">修改</el-button>
        </span>
        <span class="pad-l-10">
          <el-button type="danger" @click="deleteSys" icon="el-icon-delete">删除</el-button>
        </span>
      </el-col>
    </el-row>
    <el-row class="pad-t-10 ">
      <el-col>
        <el-table :data="tableData" :max-height="780" ref="multipleTable" @selection-change="handleSelectionChange" border style="width: 100%">
          <el-table-column type="index" width="45" label=" ">
          </el-table-column>
          <el-table-column type="selection" width="45">
          </el-table-column>
          <el-table-column prop="argName" label="参数名" min-width="20%">
          </el-table-column>
          <el-table-column prop="argValue" label="参数值" min-width="30%">
          </el-table-column>
          <el-table-column prop="remark" label="备注" min-width="30%">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="pad-t-20 pad-b-20 bor-1">
      <div class="text-center">
        <el-pagination background @size-change="setAuctionSizeChange" @current-change="setAuctionCurrentChange" :current-page="currentPage" :total="total" :page-size="totalPage" :page-sizes="[10, 20, 30, 40]" layout="total,sizes,prev,pager,next,jumper"></el-pagination>
      </div>
    </el-row>
  </section>
</template>
<script>
export default {
  name: "SysParameters",
  data() {
    return {
      searchValue: "",
      currentPage: 1, // 分页 当前页数
      totalPage: 10, // 分页 每页显示多少条
      total: 100, // 总条数
      tableData: [
        {
          argName: "appCode",
          argValue: "王小虎",
          remark: "上海市普陀区金沙江路 1518 弄"
        },
        {
          argName: "code",
          argValue: "李四",
          remark: "45455555"
        },
        {
          argName: "appCode",
          argValue: "王小虎",
          remark: "上海市普陀区金沙江路 1518 弄"
        },
        {
          argName: "code",
          argValue: "李四",
          remark: "45455555"
        },
        {
          argName: "appCode",
          argValue: "王小虎",
          remark: "上海市普陀区金沙江路 1518 弄"
        },
        {
          argName: "code",
          argValue: "李四",
          remark: "45455555"
        },
        {
          argName: "appCode",
          argValue: "王小虎",
          remark: "上海市普陀区金沙江路 1518 弄"
        },
        {
          argName: "code",
          argValue: "李四",
          remark: "45455555"
        },
        {
          argName: "appCode",
          argValue: "王小虎",
          remark: "上海市普陀区金沙江路 1518 弄"
        },
        {
          argName: "code",
          argValue: "李四",
          remark: "45455555"
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 设置显示每页多少条数据
    setAuctionSizeChange(currentPage) {
      this.totalPage = currentPage;
    },
    // 设置当前页码
    setAuctionCurrentChange(val) {
      this.currentPage = val;
    },
    // 新增
    addSys() {
      this.$router.push({ path: "/backstage/sysManage/SysParameters/AddSys" });
    },
    // 修改
    editSys() {
      let len = this.multipleSelection.length;
      if (len !== 1) {
        this.$message.error("请选择一条记录");
        return;
      }
    },
    // 删除
    deleteSys() {
      let len = this.multipleSelection.length;
      if (len !== 1) {
        this.$message.error("请选择一条记录");
        return;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.bor-1 {
  border: 1px solid #ebeef5;
  border-top: none;
}
</style>