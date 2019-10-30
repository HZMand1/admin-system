<template>
  <!-- 系统管理-系统参数 -->
  <section class="sys-parameters">
    <el-row>
      <el-col :span="4">
        <el-input v-model="searchValue" placeholder="类型"></el-input>
      </el-col>
      <el-col :span="20">
        <span class="pad-l-10">
          <el-button icon="el-icon-search" @click="searchSys">搜索</el-button>
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
    <el-row v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-row class="pad-t-10 ">
        <el-col>
          <el-table :data="tableData" :max-height="780" ref="multipleTable" @selection-change="handleSelectionChange" border style="width: 100%">
            <el-table-column type="index" width="45" label=" ">
            </el-table-column>
            <el-table-column type="selection" width="45">
            </el-table-column>
            <el-table-column prop="code" label="参数名" min-width="20%">
            </el-table-column>
            <el-table-column prop="val" label="参数值" min-width="20%">
            </el-table-column>
            <el-table-column prop="type" label="类型" min-width="20%">
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
      tableData: [],
      multipleSelection: [],
      multipleSelectionId: [],
      code: this.$config.RET_CODE.SUCCESS_CODE,
      SSXT: this.$config.SSXT,
      loading: false
    };
  },
  mounted() {
    let params = {
      appCode: this.SSXT,
      start: this.currentPage,
      pageSize: this.totalPage
    };
    this.findSysList(params);
  },
  methods: {
    // 获取列表
    findSysList(params) {
      this.loading = true;
      this.$api.api
        .findSysList(params)
        .then(result => {
          let datas = result.data.data;
          if (result.data.retcode === this.code) {
            this.total = datas.total;
            this.tableData = datas.list;
          } else {
            this.$message.error(result.data.retmsg);
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$message.error("服务器出错!");
        });
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection.length = 0;
      this.multipleSelectionId.length = 0;
      this.multipleSelection = val;
      val.map(v => {
        this.multipleSelectionId.push(v.id);
      });
      console.log(this.multipleSelection);
    },
    // 设置显示每页多少条数据
    setAuctionSizeChange(currentPage) {
      this.totalPage = currentPage;
      let params = {
        appCode: this.SSXT,
        start: this.currentPage,
        pageSize: this.totalPage
      };
      this.findSysList(params);
    },
    // 设置当前页码
    setAuctionCurrentChange(val) {
      this.currentPage = val;
      let params = {
        appCode: this.SSXT,
        start: this.currentPage,
        pageSize: this.totalPage
      };
      this.findSysList(params);
    },
    // 搜索
    searchSys() {
      let params = {
        appCode: this.SSXT,
        start: this.currentPage,
        pageSize: this.totalPage,
        type: this.searchValue === "" ? null : this.searchValue
      };
      this.findSysList(params);
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
      let type = this.multipleSelection[0].type;
      let id = this.multipleSelection[0].id;
      this.$router.push({
        path: "/backstage/sysManage/SysParameters/EditSys",
        query: { type: type, id: id }
      });
    },
    // 删除
    deleteSys() {
      let len = this.multipleSelectionId.length;
      if (len < 1) {
        this.$message.error("请选择一条记录");
        return;
      }
      this.$confirm("确定要删除选中的记录？", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          this.$api.api
            .delSysList(this.multipleSelectionId)
            .then(result => {
              this.loading = false;
              if (result.data.retcode === this.code) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                let params = {
                  appCode: this.SSXT,
                  start: this.currentPage,
                  pageSize: this.totalPage
                };
                this.findSysList(params);
              } else {
                this.$message.error(result.data.retmsg);
              }
            })
            .catch(err => {
              this.loading = false;
              this.$message.error("服务器出错!");
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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