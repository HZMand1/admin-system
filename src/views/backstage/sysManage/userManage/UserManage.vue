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
                   type="warning"
                   @click="showDialog">分配角色</el-button>
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
        <el-table-column prop="tel"
                         label="固话"></el-table-column>
        <el-table-column prop="enable"
                         label="状态"
                         :formatter="stateFormat">
        </el-table-column>

        <el-table-column prop="addTime"
                         label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.enable == 1"
                       size="mini"
                       type="primary"
                       :loading="btnloading"
                       @click="handleEnabled(scope.$index, scope.row)">启用</el-button>
            <el-button v-else
                       size="mini"
                       type="danger"
                       :loading="btnloading"
                       @click="handleDisabled(scope.$index, scope.row)">禁用</el-button>
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
    <el-dialog title="角色分配"
               :visible.sync="allotRole"
               @close="closeDialog"
               center>
      <el-table :data="gridData"
                ref="dialogTable"
                border
                style="width:100%"
                @selection-change="dialogHandleSelectionChange"
                center>
        <el-table-column type="selection"></el-table-column>
        <el-table-column property="roleName"
                         label="角色名称"></el-table-column>
        <el-table-column property="remark"
                         label="备注说明"></el-table-column>
        <el-table-column property="id"
                         v-if="show"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row class="pad-t-20 pad-b-20 bor-1">
        <div class="text-center">
          <el-pagination background
                         @size-change="dialogSetAuctionSizeChange"
                         @current-change="dialogSetAuctionCurrentChange"
                         :current-page="dialogTotalPage"
                         :total="dialogTotal"
                         :page-size="dialogTotalPage"
                         :page-sizes="[5,10, 20, 30, 40]"
                         layout="total,sizes,prev,pager,next,jumper"></el-pagination>
        </div>
      </el-row>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="dialogSubmit">确 定</el-button>
      </div>
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
      dialogCurrentPage: 1, // 弹框分页 当前页数
      dialogTotalPage: 10, // 弹框分页 每页显示多少条
      dialogTotal: 100, // 弹框总条数
      tableDatas: [],//接口返回的列表数据源
      gridData: [], //所有角色数据源--弹框
      multipleSelection: [], //勾选的列--修改
      dialogMultipleSelection: [], //勾选列的id--弹框分配
      dialogMultipleSelectionName: [], //勾选列的名称--弹框分配
      deleteIDs: [], //删除的id集合
      loading: false,
      btnloading: false, //按钮内部加载
      nameTxt: "", //条件框的值：用户名
      allotRole: false, //角色弹框
      show: false, //隐藏弹框的id列
      checkItemIds: [] //选中的项，已分配的角色
    }
  },
  mounted () {
    this.getData()
    this.getRole()
  },
  watch: {
    // "this.tableDatas": function () {
    //   console.log(111)
    // }
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
      this.btnloading = true
      this.setAbled("确认启用", row.id, 0)
    },
    //禁用 1
    handleDisabled (index, row) {
      this.btnloading = true
      this.setAbled("确认禁用", row.id, 1)
    },

    setAbled (strInfo, id, abled) {
      this.$confirm(strInfo, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            id: id,
            enable: abled
          }
          this.$api.api.enableSeedUser(params)
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
              this.btnloading = false
            }).catch(() => {
              this.btnloading = false
              this.$message.error("请求失败！")
            })
        }).catch(() => {
          this.btnloading = false
        })
    },
    stateFormat (row, column) {
      if (row.enable === 0) {
        return "启用"
      } else {
        return "禁用"
      }
    },

    //弹框相关方法---开始
    //点击按钮，显示弹框
    showDialog () {
      let num = this.multipleSelection.length;
      if (num !== 1) {
        this.$message.error("请选择一条记录");
        return;
      }
      this.getRoleByUser()
      this.allotRole = true
    },
    closeDialog () {
      //成功后，清空弹框的选中项
      let index = 0
      for (let item of this.gridData) {
        this.$refs.dialogTable.toggleRowSelection(this.gridData[index], false)
        index++;
      }

      //清空数组
      this.checkItemIds = []
    },
    //选中列的id
    dialogHandleSelectionChange (val) {
      this.dialogMultipleSelection = []
      this.dialogMultipleSelectionName = []
      val.map((item) => {
        this.dialogMultipleSelection.push(item.id)
        this.dialogMultipleSelectionName.push(item.roleName)
      })
    },
    /**
     * dianlog角色分配提交按钮
     */
    // 设置显示每页多少条数据
    dialogSetAuctionSizeChange (currentPage) {
      this.dialogTotalPage = currentPage
      let params = {
        start: this.dialogCurrentPage,
        pageSize: this.dialogTotalPage
      }
      this.getRole(params)
    },
    // 设置当前页码
    dialogSetAuctionCurrentChange (val) {
      this.dialogCurrentPage = val
      let params = {
        start: this.dialogCurrentPage,
        pageSize: this.dialogTotalPage
      }
      this.getRole(params)
    },
    //提交方法---角色分配
    dialogSubmit () {
      this.dialog = true
      let params = {
        id: this.multipleSelection[0].id,
        roleNames: this.dialogMultipleSelectionName,
        roleIds: this.dialogMultipleSelection
      }
      this.$api.api.alterUserToRole(params)
        .then(result => {
          //返回结果处理
          let dataRow = result.data;
          if (dataRow.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
            this.$message({
              message: dataRow.retmsg,
              type: "success"
            })
            //新增成功后关闭弹框
            this.allotRole = false

            //成功后，清空弹框的选中项
            let index = 0
            for (let item of this.gridData) {
              this.$refs.dialogTable.toggleRowSelection(this.gridData[index], false)
              index++;
            }

            //清空数组
            this.checkItemIds = []
          } else {
            this.$message.error(dataRow.retmsg)
          }
          this.dialog = false
        }).catch(() => {
          this.dialog = false
          this.$message.error("请求失败")
        })
    },
    //弹框相关方法---结束

    //查询方法
    queryUser () {
      let params = {
        name: this.nameTxt === "" ? null : this.nameTxt,
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
        path: "/backstage/sysManage/userManage/components/EditUser",
        query: { id: id }
      })
    },
    /**
     * 查询所有可分配角色
     */
    getRole () {
      this.loading = true
      let params = {
        enable: 0//0：可用  1：不可用
      }
      let data = this.$api.api.findRoleAllPage(params)
        .then(result => {
          let dataRow = result.data;
          if (dataRow.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
            //数据源
            this.gridData = dataRow.data.list
            //当前页
            this.dialogCurrentPage = dataRow.data.pageNum
            //每页条数
            this.dialogTotalPage = dataRow.data.pageSize
            //总条数
            this.dialogTotal = dataRow.data.total
          } else {
            this.$message.error(dataRow.retmsg)
          }
          //关闭loading
          this.loading = false
        }).catch(() => {
          this.$message.error("请求失败！")
        })
    },

    /**
     * 根绝用户查询角色
     */
    getRoleByUser () {
      this.dialog = true
      let params = {
        id: this.multipleSelection[0].id
      }
      this.$api.api.findRoleByUser(params)
        .then(result => {
          let dataRow = result.data

          if (dataRow.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
            //将已分配的角色id存入数组
            dataRow.data.map(item => {
              this.checkItemIds.push(item.roleId)
            })

            let index = 0
            for (let item of this.gridData) {
              for (let chk of this.checkItemIds) {
                if (item.id === chk) {
                  this.$refs.dialogTable.toggleRowSelection(this.gridData[index], true)
                }
              }
              index++;
            }

          } else {
            this.$message.error(dataRow.retmsg)
          }
          this.dialog = false
        }).catch(() => {
          this.dialog = false
          this.$message.error("请求失败！")
        })
    },

    /**
     * 查询列表展示数据方法
     */
    getData (params) {
      this.loading = true
      let data = this.$api.api.findSeedUserAllPage(params)
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