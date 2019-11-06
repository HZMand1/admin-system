<template>
  <div id="userMaeage">
    <el-row>
      <el-col :span="6">
        <el-input class="mar-r-10 mar-b-20"
                  v-model="nameTxt"
                  placeholder="用户名"></el-input>
      </el-col>
      <el-col :span="12">
        <el-button class="mar-l-10 mar-b-20"
                   @click="queryUser">查询</el-button>
        <el-button class="mar-l-10 mar-b-20"
                   type="primary"
                   @click="addUser">新增</el-button>
        <el-button class="mar-l-10 mar-b-20"
                   type="primary"
                   @click="editUser">修改</el-button>
        <el-button class="mar-l-10 mar-b-20"
                   type="danger"
                   @click="deleteUser">删除</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <template>
      <el-table v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                border
                :data="tableDatas"
                style="width:100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="index"
                         label=" "></el-table-column>
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="name"
                         label="用户名"></el-table-column>
        <el-table-column prop="email"
                         label="邮箱"></el-table-column>
        <el-table-column prop="phone"
                         label="手机号"></el-table-column>
        <el-table-column prop="status"
                         label="状态"></el-table-column>
        <el-table-column prop="addTime"
                         label="创建时间"></el-table-column>
      </el-table>
    </template>

    <!-- 分页 -->
    <el-row class="pad-t-20 pad-b-20 bor-1">
      <div class="text-center">
        <el-pagination background
                       @size-change="setAuctionSizeChange"
                       @current-change="setAuctionCurrentChange"
                       :current-page="currentPage"
                       :total="total"
                       :page-size="totalPage"
                       :page-sizes="[5,10, 20, 30, 40]"
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
      tableDatas: [],//接口返回的列表数据源
      multipleSelection: [], //勾选的列--修改
      deleteIDs: [], //删除的id集合
      loading: false,
      nameTxt: "" //条件框的值：用户名
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    handleSelectionChange (val) {
      //给修改功能用的
      this.multipleSelection = val
      //给删除功能用的
      this.deleteIDs = []
      val.map((item) => {
        this.deleteIDs.push(item.id)
      })
      console.log(this.deleteIDs);

    },
    // 设置显示每页多少条数据
    setAuctionSizeChange (currentPage) {
      this.totalPage = currentPage
      let params = {
        start: this.currentPage,
        pageSize: this.totalPage
      }
      this.getData(params)
    },
    // 设置当前页码
    setAuctionCurrentChange (val) {
      this.currentPage = val
      let params = {
        start: this.currentPage,
        pageSize: this.totalPage
      }
      this.getData(params)
    },
    //查询方法
    queryUser () {
      let params = {
        name: this.nameTxt,
        start: this.currentPage,
        pageSize: this.totalPage
      }
      this.getData(params)
    },
    //跳转到新增页面
    addUser () {
      this.$router.push({ path: "/backstage/sysManage/userManage/components/AddUser" })
    },
    //跳转到编辑页面
    editUser () {
      let num = this.multipleSelection.length;
      if (num !== 1) {
        this.$message.error("请选择一条记录");
        return;
      }
      let id = this.multipleSelection[0].id;
      this.$router.push({
        path: "/backstage/sysManage/roleManage/components/EditUser",
        query: { id: id }
      })
    },
    //删除数据
    deleteUser () {
      let num = this.multipleSelection.length();
      if (num !== 1) {
        this.$message.error("请选择一条记录");
        return;
      }
    },
    getData (params) {
      this.loading = true
      let data = this.$api.api.findSeedUserAllPage(params)
        .then(result => {
          let dataRow = result.data;
          if (dataRow.retcode === 1) {
            //数据源
            this.tableDatas = dataRow.data.list
            //当前页
            this.currentPage = dataRow.data.pageNum
            //每页条数
            this.totalPage = dataRow.data.pageSize
            //总条数
            this.total = dataRow.data.total
            //关闭loading
            this.loading = false
          } else {
            this.$message.error(dataRow.retmsg)
          }
        }).catch(() => {
          this.$message.error("请求失败！")
        })
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