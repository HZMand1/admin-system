<template>
  <div id="roleMaeage">
    <el-row>
      <el-col :span="6">
        <el-input class="mar-r-10 mar-b-20"
                  v-model="nameTxt"
                  placeholder="角色名称"></el-input>
      </el-col>
      <el-col :span="12">
        <el-button class="mar-l-10 mar-b-20"
                   @click="queryUser">查询</el-button>
        <el-button class="mar-l-10 mar-b-20"
                   type="primary"
                   @click="addRole">新增</el-button>
        <el-button class="mar-l-10 mar-b-20"
                   type="primary"
                   @click="editRole">修改</el-button>
        <el-button class="mar-l-10 mar-b-20"
                   type="warning"
                   @click="showPowerDialog">分配权限</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-row class="pad-t-10 ">
      <el-table border
                :data="tableDatas"
                style="width:100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="index"
                         label=" "></el-table-column>
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="roleName"
                         label="角色名称"></el-table-column>
        <el-table-column prop="appCode"
                         label="所属系统"></el-table-column>
        <el-table-column prop="remark"
                         label="备注"></el-table-column>
        <el-table-column prop="opearUser"
                         label="操作人"></el-table-column>
        <el-table-column prop="addTime"
                         label="创建时间"></el-table-column>
        <el-table-column prop="enable"
                         label="状态"
                         :formatter="stateFormat">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.enable === 1"
                       size="mini"
                       type="primary"
                       :loading="btnloading"
                       @click="handleEnabled(scope.$index, scope.row)">启用</el-button>
            <el-button v-else
                       size="mini"
                       type="danger"
                       :loading="btnloading"
                       @click="handleDisabled(scope.$index, scope.row)">禁用</el-button>
            <el-button size="mini"
                       :loading="btnloading"
                       @click="roleDetail(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>

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

    <!-- 弹框 -->
    <el-dialog title="权限分配"
               :visible.sync="allotPower"
               @close="closeDialog"
               center>
      <el-tree ref="tree"
               @check-change="checkCahnge"
               :data="dataTree"
               :show-checkbox="true"
               node-key="id"
               :default-checked-keys="treeIds"
               :default-expand-all="true"
               :props="defaultProps"
               :check-strictly="true"></el-tree>
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
      tableDatas: [], //数据源
      multipleSelection: [],
      loading: false, //加载框
      btnloading: false, //按钮内部加载
      deleteIDs: [], //删除的id集合
      nameTxt: null, //条件框的值：用户名
      allotPower: false, //弹框
      dataTree: [], //菜单树的集合
      treeIds: [], //接口返回当前角色已有权限的id集合
      defaultProps: {
        children: "children",
        label: "name"
      }

    }
  },
  mounted () {
    //获取列表数据
    this.getData()
    //获取树菜单
    this.getTree()
  },
  methods: {
    // 多选
    handleSelectionChange (val) {
      //给修改功能用
      this.multipleSelection = val;
      //给删除功能用的
      this.deleteIDs = []
      val.map((item) => {
        this.deleteIDs.push(item.id)
      })
    },
    // 设置显示每页多少条数据
    setAuctionSizeChange (currentPage) {
      this.totalPage = currentPage;
      let params = {
        roleName: this.nameTxt === "" ? null : this.nameTxt,
        start: this.currentPage,
        pageSize: this.totalPage
      }
      this.getData(params)
    },
    // 设置当前页码
    setAuctionCurrentChange (val) {
      this.currentPage = val;
      let params = {
        roleName: this.nameTxt === "" ? null : this.nameTxt,
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
          this.$api.api.updateRoleEnable(params)
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

    //弹框---开始
    /**
     * 显示弹框
     */
    showPowerDialog () {
      let num = this.multipleSelection.length;
      if (num !== 1) {
        this.$message.error("请选择一条记录");
        return;
      }
      let id = this.multipleSelection[0].id;
      this.getPowerByRole(id)

    },
    //关闭弹框
    closeDialog () {
      //清空选中项
      this.$refs.tree.setCheckedKeys([])

    },
    // tree树点击触发
    checkCahnge (data, check) {
      this.subjectCheckChange(data, check);
    },
    // 选中父级
    subjectCheckChange (data, ifCheck) {
      // 父节点操作
      if (data.parentId) {
        if (ifCheck === true) {
          // 如果选中，设置父节点为选中
          this.$refs.tree.setChecked(data.parentId, true, false);
        } else {
          // 如果取消选中，检查父节点是否该取消选中（可能仍有子节点为选中状态）
          let parentNode = this.$refs.tree.getNode(data.parentId);
          let parentHasCheckedChild = false;
          parentNode.childNodes.map((v, i) => {
            if (parentNode.childNodes[i].checked === true) {
              parentHasCheckedChild = true;
              return;
            }
          });
          if (!parentHasCheckedChild)
            this.$refs.tree.setChecked(data.parentId, false);
        }
      }
      // 子节点操作
      // 如果取消选中，取消子节点选中
      if (data.children !== null && ifCheck === false) {
        data.children.map(v => {
          let childNode = this.$refs.tree.getNode(v.id);
          if (childNode.checked === true) {
            this.$refs.tree.setChecked(childNode.data.id, false);
          }
        });
      }
    },
    //弹框的提交按钮
    dialogSubmit () {
      let test = 0
      let id = this.multipleSelection[0].id
      let menuId = this.$refs.tree.getCheckedKeys()
      // let menuId = []
      //如果子菜单选中获取父节点
      // this.dataTree.map((itemFather) => {

      //   if (null !== itemFather.children) {
      //     //如果有子菜单
      //     itemFather.children.map((item) => {
      //       //遍历二级子菜单的id
      //       if (this.$refs.tree.getCheckedKeys().indexOf(item.id) > -1) {
      //         //将父级id添加到数组
      //         menuId.push(itemFather.id)
      //         console.log(test + "item===" + itemFather.id);
      //         return
      //       }
      //     })
      //   }
      // })

      //三级菜单
      this.dataTree.map((itemFather) => {

        if (null !== itemFather.children) {
          //如果有子菜单
          itemFather.children.map((item) => {
            //遍历二级子菜单的id
            if (this.$refs.tree.getCheckedKeys().indexOf(item.id) > -1) {
              //将父级id添加到数组
              menuId.push(itemFather.id)
            }

            //如果有子菜单
            if (null !== item.children) {
              item.children.map((itemSon) => {
                if (this.$refs.tree.getCheckedKeys().indexOf(itemSon.id) > -1) {
                  menuId.push(item.id)
                }
              })
            }

          })
        }
      })
      //map循环无法退出，所以这里做个数据去重处理
      menuId = new Set(menuId)
      menuId = Array.from([...menuId])
      console.log(menuId);

      let params = {
        roleId: id,
        menuIds: menuId
      }
      this.$api.api.saveAuthToRole(params)
        .then(result => {
          let dataRow = result.data
          if (dataRow.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
            this.$message({
              message: dataRow.retmsg,
              type: "success"
            })
            this.allotPower = false
          } else {
            this.$message.error(dataRow.retmsg)
          }
        }).catch(() => {
          this.$message.error("请求失败!")
        })
    },

    //权限树是否被选中
    getPowerByRole (id) {
      let params = {
        roleId: id
      }
      this.$api.api.findAuthByRole(params)
        .then(result => {
          let dataRow = result.data
          if (dataRow.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
            this.treeIds = []
            dataRow.data.map((item) => {
              this.treeIds.push(item.menuId)
            })
          } else {
            this.$message.error(dataRow.retmsg)
          }

          this.allotPower = true
        }).catch(() => {
          this.allotPower = true
          this.$message.error("请求失败！")
        })
    },
    //获取树菜单
    getTree () {
      this.$api.api.findMenuZtree()
        .then(result => {
          let dataRow = result.data
          if (dataRow.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
            this.dataTree = dataRow.data
          } else {
            this.$message.error(dataRow.retmsg)
          }
        }).catch(() => {
          this.$message.error("请求失败！")
        })
    },
    //弹框---结束

    //列表的查询方法
    queryUser () {
      let params = {
        roleName: this.nameTxt === "" ? null : this.nameTxt,
        start: this.currentPage,
        pageSize: this.totalPage
      }
      this.getData(params)
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
    //跳转到详情页
    roleDetail (index, row) {
      this.$router.push({
        path: "/backstage/sysManage/roleManage/components/RoleDetail",
        query: { id: row.id }
      })
    },

    /**
     * 查询方法
     */
    getData (params) {
      this.loading = true
      let data = this.$api.api.findRoleAllPage(params)
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