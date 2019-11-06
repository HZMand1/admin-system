<template>
  <div id="newsList">
    <el-row>
      <el-col :span="6">
        <el-input class="mar-r-10 mar-b-20"
                  v-model="nameTxt"
                  placeholder="资讯名称"></el-input>
      </el-col>
      <el-col :span="12">
        <el-button class="mar-l-10 mar-b-20"
                   @click="queryNews"
                   icon="el-icon-search">查询</el-button>
        <el-button class="mar-l-10 mar-b-20"
                   type="primary"
                   @click="addNews"
                   icon="el-icon-plus">新增</el-button>
        <el-button class="mar-l-10 mar-b-20"
                   type="primary"
                   @click="editNews"
                   icon="el-icon-edit">修改</el-button>
        <el-button class="mar-l-10 mar-b-20"
                   type="danger"
                   @click="deleteNews"
                   icon="el-icon-delete">删除</el-button>
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
        <el-table-column prop="title"
                         label="资讯标题"></el-table-column>
        <el-table-column prop="textSource"
                         label="资讯来源"></el-table-column>
        <el-table-column prop="textType"
                         label="是否原创"
                         width="100"
                         :formatter="textTypeFormat"></el-table-column>
        <el-table-column prop="typeName"
                         label="资讯分类"></el-table-column>
        <el-table-column prop="orders"
                         label="是否置顶"
                         width="100"
                         :formatter="ordersFormat"></el-table-column>
        <el-table-column label="发布时间">
          <template slot-scope="scope">{{ scope.row.addTime | dateFormat('YYYY-MM-DD HH:mm:ss') }}</template>
        </el-table-column>
        <el-table-column prop="enable"
                         label="发布状态"
                         width="100"
                         :formatter="enableFormat"></el-table-column>

        <el-table-column label="操作"
                         width="350">
          <template slot-scope="scope">
            <el-button v-if="scope.row.enable == 1"
                       size="mini"
                       type="primary"
                       @click="handleIssue(scope.$index, scope.row)">发布</el-button>
            <el-button v-else
                       size="mini"
                       type="danger"
                       @click="handleBack(scope.$index, scope.row)">撤回</el-button>

            <el-button v-if="scope.row.orders != 0"
                       size="mini"
                       type="primary"
                       @click="handleTop(scope.$index, scope.row)">置顶</el-button>
            <el-button v-else
                       size="mini"
                       type="danger"
                       @click="handleUntop(scope.$index, scope.row)">取消置顶</el-button>
            <el-button size="mini"
                       @click="newsInfo(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
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
      loading: false,
      btnloading: false, //按钮内部加载
      nameTxt: "", //条件框的值：用户名
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    handleSelectionChange (val) {
      //给修改功能用的
      this.multipleSelection = val
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
    //发布
    handleIssue (index, row) {
      this.setIssue("确认发布？", row.id, 0)
    },
    //撤回
    handleBack (index, row) {
      this.setIssue("确认撤回？", row.id, 1)
    },
    setIssue (strInfo, id, enable) {
      this.$confirm(strInfo, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true
          let params = {
            id: id,
            enable: enable
          }
          this.$api.api.enableAdNews(params)
            .then(result => {
              let dataRow = result.data
              if (dataRow.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
                this.$message({
                  message: dataRow.retmsg,
                  type: "success"
                })
                this.getData()
              } else {
                this.$message.error(dataRow.retmsg)
              }
              this.loading = false
            }).catch(() => {
              this.loading = false
              this.$message.error("请求失败！")
            })
        }).catch(() => {
          this.loading = false
        })
    },

    //置顶
    handleTop (index, row) {
      this.setTop("确认置顶？", row.id, 0)
    },
    //取消置顶,与项目经理沟通后，决定此值设置为1
    handleUntop (index, row) {
      this.setTop("确认取消置顶？", row.id, 1)
    },
    setTop (strInfo, id, orders) {
      this.$confirm(strInfo, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.loading = true
        let params = {
          id: id,
          orders: orders
        }
        this.$api.api.setTopAdNews(params)
          .then(result => {
            let dataRow = result.data
            if (dataRow.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
              this.$message({
                message: dataRow.retmsg,
                type: "success"
              })
              this.getData()
            } else {
              this.$message.error(dataRow.retmsg)
            }
            this.loading = false
          }).catch(() => {
            this.loading = false
            this.$message.error("请求失败！")
          })
      }).catch(() => {
        this.loading = false
      })
    },

    //详情
    newsInfo (index, row) {
      this.$router.push({
        path: "/backstage/newsManage/components/DetailNews",
        query: { id: row.id }
      })
    },

    enableFormat (row, column) {
      if (row.enable === 0) {
        return "已发布"
      } else {
        return "待发布"
      }
    },
    //是否置顶
    ordersFormat (row, column) {
      if (row.orders === 0) {
        return "是"
      } else {
        return "否"
      }
    },
    //是否原创
    textTypeFormat (row, column) {
      if (row.textType === 0) {
        return "原创"
      } else {
        return "转载"
      }
    },

    //查询方法
    queryNews () {
      let params = {
        name: this.nameTxt === "" ? null : this.nameTxt,
        start: this.currentPage,
        pageSize: this.totalPage
      }
      this.getData(params)
    },
    //增加方法
    addNews () {
      this.$router.push({
        path: "/backstage/newsManage/components/AddNews"
      })
    },
    //跳转到编辑页面
    editNews () {
      let num = this.multipleSelection.length;
      if (num !== 1) {
        this.$message.error("请选择一条记录");
        return;
      }
      let id = this.multipleSelection[0].id;
      this.$router.push({
        path: "/backstage/newsManage/components/EditNews",
        query: { id: id }
      })
    },
    //删除方法
    deleteNews () {
      let num = this.multipleSelection.length;
      if (num !== 1) {
        this.$message.error("请选择一条记录");
        return;
      }
      let id = this.multipleSelection[0].id;
      let params = {
        id: id
      }
      this.$confirm("是否确定删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        this.$api.api.deleteAdNews(params)
          .then(result => {
            let dataRow = result.data
            if (dataRow.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
              this.$message({
                type: "success",
                message: dataRow.retmsg
              });
              this.getData()
            } else {
              this.$message.error(dataRow.retmsg)
            }
          }).catch(() => {
            this.$message.error("请求失败")
          })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });

      })
    },

    /**
     * 查询列表展示数据方法
     */
    getData (params) {
      this.loading = true
      this.$api.api.findAdNewsListPage(params)
        .then(result => {
          let dataRow = result.data;
          if (dataRow.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
            //数据源
            this.tableDatas = dataRow.data.list
            //当前页
            this.currentPage = dataRow.data.pageNum
            //每页条数
            this.totalPage = dataRow.data.pageSize
            //总条数
            this.total = dataRow.data.total
          } else {
            this.$message.error(dataRow.retmsg)
          }
          //关闭loading
          this.loading = false
        }).catch(() => {
          //关闭loading
          this.loading = false
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