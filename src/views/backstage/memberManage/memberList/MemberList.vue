<template>
  <div id="menberList">
    <el-row>
      <el-col :span="6">
        <el-input class="mar-r-10 mar-b-20"
                  v-model="nameTxt"
                  placeholder="商户名"></el-input>
      </el-col>
      <el-col :span="12">
        <el-button class="mar-l-10 mar-b-20"
                   @click="queryMember"
                   icon="el-icon-select">查询</el-button>
        <el-button class="mar-l-10 mar-b-20"
                   type="primary"
                   @click="editMember"
                   icon="el-icon-edit">修改</el-button>
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
                         label="姓名"></el-table-column>
        <el-table-column prop="account"
                         label="账号"></el-table-column>
        <el-table-column prop="reviewState"
                         label="审核状态"
                         :formatter="reviewFormat"></el-table-column>
        <el-table-column prop="state"
                         label="用户状态"
                         :formatter="enableFormat"></el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{ scope.row.addTime | dateFormat('YYYY-MM-DD HH:mm:ss') }}</template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.enable == 1"
                       size="mini"
                       type="primary"
                       @click="handleEnabled(scope.$index, scope.row)">启用</el-button>
            <el-button v-else
                       size="mini"
                       type="danger"
                       @click="handleDisabled(scope.$index, scope.row)">禁用</el-button>
            <el-button v-if="scope.row.reviewState != 0 && null != scope.row.reviewId"
                       size="mini"
                       type="primary"
                       @click="memberAudit(scope.$index, scope.row)">审核</el-button>
            <el-button size="mini"
                       @click="memberInfo(scope.$index, scope.row)">详情</el-button>
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

    <!-- 弹框 -->
    <el-dialog title="用户审核"
               :visible.sync="showAudit"
               @close="closeDialog"
               center>
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

      <el-button class="mar-t-20"
                 size="mini"
                 type="primary"
                 :loading="btnloading"
                 @click="submitAudit">提交</el-button>
    </el-dialog>
    <!-- 弹框结束 -->
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
      showAudit: false, //显示审核框
      radio: "0", //0:已审核，1：审核不通过，2：未审核
      auditCause: "", //审核备注
      auditId: "", //审核列的id
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
    //启用 0
    handleEnabled (index, row) {
      this.setAbled("确认启用", row.id, 0)
    },
    //禁用 1
    handleDisabled (index, row) {
      this.setAbled("确认禁用", row.id, 1)
    },
    setAbled (strInfo, id, enable) {
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
          this.$api.api.enableOutletUser(params)
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

    //显示审核弹框
    memberAudit (index, row) {
      this.showAudit = true
      this.auditId = row.id
    },
    //关闭弹框
    closeDialog () {
      //TODO
    },
    //submitAudit提交审核
    submitAudit () {
      this.btnloading = true
      let params = {
        id: this.auditId,
        enable: this.radio,
        review: this.auditCause
      }
      this.$api.api.updateOutletUser(params)
        .then(result => {
          let dataRow = result.data
          if (dataRow.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
            this.$message({
              message: dataRow.retmsg,
              type: "success"
            })
            this.getData()
            this.showAudit = false
          } else {
            this.$message.error(dataRow.retmsg)
          }
          this.btnloading = false
        }).catch(() => {
          this.btnloading = false
          this.$message.error("请求失败！")
        })
    },
    //用户详情
    memberInfo (index, row) {
      this.$router.push({
        path: "/backstage/merchantManage/shopManage/components/ShopDetail",
        query: { id: row.id }
      })
    },
    //查看店员
    // shopStaff (index, row) {
    //   //TODO
    // },

    enableFormat (row, column) {
      if (row.enable === 0) {
        return "启用"
      } else {
        return "禁用"
      }
    },
    reviewFormat (row, column) {
      if (row.reviewState === 0) {
        return "审核通过"
      } else if (row.reviewState === 1) {
        return "审核不通过"
      } else {
        return "未审核"
      }
    },

    //查询方法
    queryMember () {
      let params = {
        name: this.nameTxt === "" ? null : this.nameTxt,
        start: this.currentPage,
        pageSize: this.totalPage
      }
      this.getData(params)
    },
    //跳转到编辑页面
    editMember () {
      let num = this.multipleSelection.length;
      if (num !== 1) {
        this.$message.error("请选择一条记录");
        return;
      }
      let id = this.multipleSelection[0].id;
      this.$router.push({
        path: "/backstage/sysManage/userManage/components/EditUser",
        query: { id: id }
      })
    },

    /**
     * 查询列表展示数据方法
     */
    getData (params) {
      this.loading = true
      this.$api.api.findUserPage(params)
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