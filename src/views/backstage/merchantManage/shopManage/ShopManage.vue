<template>
  <div id="supplierUser">
    <el-row>
      <el-col :span="6">
        <el-input class="mar-r-10 mar-b-20"
                  v-model="nameTxt"
                  placeholder="店铺名"></el-input>
      </el-col>
      <el-col :span="12">
        <el-button class="mar-l-10 mar-b-20"
                   @click="queryShop"
                   icon="el-icon-select">查询</el-button>
        <el-button class="mar-l-10 mar-b-20"
                   type="primary"
                   @click="editShop"
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
                         label="店铺名称"></el-table-column>
        <el-table-column prop="account"
                         label="商户账号"></el-table-column>
        <el-table-column prop="userName"
                         label="商户名称"></el-table-column>
        <el-table-column prop="orders"
                         label="是否置顶"
                         :formatter="ordersFormat"></el-table-column>
        <el-table-column prop="enable"
                         label="审核状态"
                         :formatter="auditFormat"></el-table-column>
        <el-table-column prop="state"
                         label="店铺状态"
                         :formatter="stateFormat"></el-table-column>
        <el-table-column label="入驻时间">
          <template slot-scope="scope">{{ scope.row.addTime | dateFormat('YYYY-MM-DD HH:mm:ss') }}</template>
        </el-table-column>

        <el-table-column label="操作"
                         width="300">
          <template slot-scope="scope">

            <el-button v-if="scope.row.state == 1"
                       size="mini"
                       type="primary"
                       @click="handleEnabled(scope.$index, scope.row)">启用</el-button>

            <el-button v-else
                       size="mini"
                       type="danger"
                       @click="handleDisabled(scope.$index, scope.row)">禁用</el-button>

            <el-button v-if="scope.row.orders != 0"
                       size="mini"
                       type="primary"
                       @click="handleTop(scope.$index, scope.row)">置顶</el-button>

            <el-button v-else
                       size="mini"
                       type="danger"
                       @click="handleUntop(scope.$index, scope.row)">取消置顶</el-button>

            <el-button v-if="scope.row.enable != 0"
                       size="mini"
                       type="primary"
                       @click="shopAudit(scope.$index, scope.row)">审核</el-button>
            <el-button size="mini"
                       @click="shopInfo(scope.$index, scope.row)">详情</el-button>
            <!-- <el-button size="mini"
                       type="primary"
                       :loading="btnloading"
                       @click="shopStaff(scope.$index, scope.row)">店员</el-button> -->
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
    <el-dialog title="店铺审核"
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
        name: this.nameTxt === "" ? null : this.nameTxt,
        start: this.currentPage,
        pageSize: this.totalPage
      }
      this.getData(params)
    },
    // 设置当前页码
    setAuctionCurrentChange (val) {
      this.currentPage = val
      let params = {
        name: this.nameTxt === "" ? null : this.nameTxt,
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
    setAbled (strInfo, id, state) {
      this.$confirm(strInfo, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true
          let params = {
            id: id,
            state: state
          }
          this.$api.api.updateSupplierState(params)
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

    //显示店铺审核弹框
    shopAudit (index, row) {
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
      this.$api.api.updateSupplierEnable(params)
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

    //置顶
    handleTop (index, row) {
      this.setTop("确认置顶？", row.id, 0);
    },
    //取消置顶,与项目经理沟通后，决定此值设置为1
    handleUntop (index, row) {
      this.setTop("确认取消置顶？", row.id, 1);
    },
    setTop (strInfo, id, orders) {
      this.$confirm(strInfo, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          let params = {
            id: id,
            orders: orders
          };
          this.$api.api
            .setTopSupplier(params)
            .then(result => {
              let dataRow = result.data;
              if (dataRow.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
                this.$message({
                  message: dataRow.retmsg,
                  type: "success"
                });
                this.getData();
              } else {
                this.$message.error(dataRow.retmsg);
              }
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
              this.$message.error("请求失败！");
            });
        })
        .catch(() => {
          this.loading = false;
        });
    },

    stateFormat (row, column) {
      if (row.state === 0) {
        return "启用"
      } else {
        return "禁用"
      }
    },
    auditFormat (row, column) {
      if (row.enable === 0) {
        return "审核通过"
      } else if (row.enable === 1) {
        return "审核不通过"
      } else {
        return "未审核"
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

    //查询方法
    queryShop () {
      let params = {
        name: this.nameTxt === "" ? null : this.nameTxt,
        start: this.currentPage,
        pageSize: this.totalPage
      }
      this.getData(params)
    },

    //店铺详情
    shopInfo (index, row) {
      this.$router.push({
        path: "/backstage/merchantManage/ShopDetail",
        query: { id: row.id }
      })
    },
    //跳转到编辑页面
    editShop () {
      let num = this.multipleSelection.length;
      if (num !== 1) {
        this.$message.error("请选择一条记录");
        return;
      }
      let id = this.multipleSelection[0].id;
      this.$router.push({
        path: "/backstage/merchantManage/EditShop",
        query: { id: id }
      })
    },

    /**
     * 查询列表展示数据方法
     */
    getData (params) {
      this.loading = true
      this.$api.api.findSupplierInfoPage(params)
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