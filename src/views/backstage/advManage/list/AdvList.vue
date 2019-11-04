<template>
  <section>
    <section v-loading="loading"
             element-loading-text="拼命加载中……"
             class="bg-white pad-t-30 pad-r-10 pad-b-30 pad-l-10">
      <div class="table-filter-wrapper mar-l-10">
        <ph-form @searchBtn="searchBtn"
                 @resetSearchBtn="resetSearchBtn"
                 @addHandle="addHandle"
                 :searchForm="searchForm">
        </ph-form>
      </div>
      <div class="table-wrapper pad-t-5 bor-t-1">
        <ph-table :tableData="tableData"
                  @editHandle="editHandle"
                  @singleDeleteHandle="singleDeleteHandle"
                  @selectionChangeHandle="selectionChangeHandle">
        </ph-table>
        <el-row class="mar-t-10">
          <!-- <el-col :span='4'>
            <el-button @click="batchDeleteHandle()"
                       :disabled="isBatchDeleteDisabled"
                       size="small">批量删除
            </el-button>
          </el-col> -->
          <el-col :span='24'>
            <ph-pagination @sendPaginations="sendPaginationsHandle"
                           :paginations="paginationParams"
                           class="mar-r-20 text-right">
            </ph-pagination>
          </el-col>
        </el-row>
      </div>
    </section>
    <!--新增、编辑-->
    <added-editor-dialog :dialogForm="dialogForm"
                         :submitLoading="submitLoading"
                         :dialogVisible.sync="addedEditorDialog"
                         @getCancel="handleCancel"
                         @closeBindWarnStandard="handleCancel"
                         @submitHandle="submitAddedEditorForm">
    </added-editor-dialog>
  </section>
</template>

<script>
import Form from "./components/Form"
import Table from "./components/Table"
import Pagination from "@/components/Pagination"
import AddedEditorDialog from "./components/AddedEditorDialog"
export default {
  name: "advList",
  components: {
    "ph-pagination": Pagination,
    "added-editor-dialog": AddedEditorDialog,
    "ph-form": Form,
    "ph-table": Table
  },
  data () {
    return {
      ERROR_CODE: this.$config.RET_CODE.ERROR_CODE,//请求失败的值
      loading: false,//loading
      submitLoading: false,//loading
      paginationParams: this.$config.paginationParams,//列表分页
      handleType: "",//判断弹窗提交是新增还是编辑
      checkedIds: [],//checkbox被选中的子项
      isBatchDeleteDisabled: false,//是否可以批量删除
      //table数据
      tableData: [{
        name: "www",
        code: "code"
      }],
      //弹窗
      addedEditorDialog: false,
      dialogForm: {
        name: "",
        code: ""
      },
      //搜索
      searchForm: {
        title: "",
        typeCode: "",
        time: "",
        status: ""
      }
    }
  },
  created () {
    //请求列表
    this.getList()
  },
  methods: {
    /*
      *functionName: successList
      * params: params Object
      * params: id String
      * desc:封装初始化获取列表和搜索  共用
    */
    successList (params) {
      this.loading = true
      this.$api.api.findAdNewsListPage(params)
        .then(res => {
          let data = res.data.data
          console.log(data)
          if (res.data.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
            this.loading = false
            if (data.list.length > 0) {
              this.tableData = data.list//存储到tableData
              this.paginationParams.pageSize = data.pageSize//每页的数量
              this.paginationParams.size = data.size//当前页的数量
              this.paginationParams.total = data.total//总条数
              this.paginationParams.pages = data.pages//总页码数
            } else {
              this.tableData = []
              this.paginationParams.total = 0
            }
          } else {
            this.$message({
              type: "error",
              message: res.data.retmsg
            })
          }
        }).catch(err => {
          console.log(err)
        })
    },
    //获取表格数据
    getList () {
      let params = {
        type: 0,
        pageNo: this.paginationParams.pageNo,//页码
        pageSize: this.paginationParams.pageSize//每页条数
      }
      //请求列表
      this.successList(params)
    },
    //搜索查询
    searchBtn (searchData) {
      console.log(searchData)
      let addTime = searchData && searchData.time[0] ? new Date(searchData.time[0]).getTime() : null
      let finishTime = searchData && searchData.time[1] ? new Date(searchData.time[1]).getTime() : null
      let params = {
        pageNo: this.paginationParams.pageNo,//页码
        pageSize: this.paginationParams.pageSize,//每页条数
        type: 0,
        title: searchData && searchData.title ? searchData.title : null,
        typeCode: searchData && searchData.typeCode ? searchData.typeCode : null,
        enable: searchData && searchData.status ? Number(searchData.status) : null,
        addTime: addTime,
        finishTime: finishTime
      }
      //用封装好的函数请求
      this.successList(params)
    },
    //接收分页参数
    sendPaginationsHandle () {
      if (this.searchForm.title !== "" || this.searchForm.typeCode !== "" || this.searchForm.status !== "" || this.searchForm.time !== "") {
        let params = {
          pageNo: this.paginationParams.pageNo,//页码
          pageSize: this.paginationParams.pageSize,//每页条数
          type: 0,
          title: this.searchForm && this.searchForm.title ? this.searchForm.title : null,
          typeCode: this.searchForm && this.searchForm.typeCode ? this.searchForm.typeCode : null,
          enable: this.searchForm && this.searchForm.status ? Number(this.searchForm.status) : null,
          addTime: this.searchForm && this.searchForm.time[0] ? new Date(this.searchForm.time[0]).getTime() : null,
          finishTime: this.searchForm && this.searchForm.time[1] ? new Date(this.searchForm.time[1]).getTime() : null
        }
        //发送请求
        this.successList(params)
      } else {
        this.getList()
      }
    },
    //重置搜索查询
    resetSearchBtn () {
      this.searchForm = {
        title: "",
        typeCode: "",
        time: "",
        status: ""
      }
      this.paginationParams.pageNo = 1
      this.getList()
    },
    //弹出新增
    addHandle () {
      this.handleType = "add"//判断为新增
      this.addedEditorDialog = true//显示弹窗
      //设置传给后台的数据
      this.dialogForm = {
        name: "",
        code: ""
      }
    },
    //表格全选
    selectionChangeHandle (checkedData) {
      //checkedData是选中的数组，遍历后的数据为数组，如[1,2,3]，追加到checkedIds作为传给后台的参数
      checkedData.forEach(item => {
        this.checkedIds.push(item.id)
      })
    },
    //弹出修改
    editHandle (index, row) {
      this.handleType = "edit"//判断为编辑
      this.addedEditorDialog = true//显示弹窗
      //请求接口
      let params = row.id
      this.$api.qualityControl.goodsManage.getDataById(params)
        .then(res => {
          if (res.data.retcode === this.SUCCESS_CODE) {
            let data = res.data.data
            //设置传给后台的数据
            this.dialogForm = {
              name: data.name,
              code: data.code,
              id: data.id
            }
          } else {
            this.$message({
              type: "error",
              message: res.data.retmsg
            })
          }
        }).catch(err => {
          console.log(err)
        })
    },
    //删除共用方法
    deleteHandle (tipsText, params, cancelTips) {
      //提示框
      this.$confirm(tipsText, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        //请求删除账号接口
        this.$api.qualityControl.goodsManage.batchEdit(params)
          .then(res => {
            if (res.data.retcode === this.SUCCESS_CODE) {
              this.$message({
                type: "success",
                message: res.data.retmsg
              })
              this.getList()
            } else if (res.data.retcode === this.ERROR_CODE) {
              this.$message({
                type: "error",
                message: res.data.retmsg
              })
            }
          }).catch(err => {
            console.log(err)
          })
      }).catch(() => {
        this.$message({
          type: "info",
          message: cancelTips
        })
      })
    },
    //单个删除
    singleDeleteHandle (index, row) {
      let arr = []
      arr.push(row.id)
      let params = {
        ids: [row.id]//数组
      }
      this.deleteHandle("确定删除当前拍品信息?", params, "取消删除")
    },
    //批量删除
    batchDeleteHandle () {
      if (this.checkedIds.length > 0) {
        let params = {
          ids: this.checkedIds//数组
        }
        this.deleteHandle("确定批量删除当前拍品信息?", params, "取消删除")
      } else {
        this.$message({
          type: "error",
          message: "请选择拍品"
        })
      }
    },
    //点击弹框下的取消
    handleCancel () {
      this.addedEditorDialog = false
    },
    //新增、修改弹窗提交
    submitAddedEditorForm () {
      this.submitLoading = true
      let params = this.dialogForm
      if (this.handleType === "add") {
        //添加
        this.$api.qualityControl.goodsManage.add(params)
          .then(res => {
            if (res.data.retcode === this.SUCCESS_CODE) {
              this.submitLoading = false
              this.$message({
                message: res.data.retmsg,
                type: "success"
              })
              this.getList()
              this.addedEditorDialog = false//隐藏弹窗
            } else {
              //账号已存在或者其他异常
              this.$message({
                message: res.data.retmsg,
                type: "error"
              })
              this.submitLoading = false
            }
          }).catch(err => {
            console.log(err)
            this.addedEditorDialog = false//隐藏弹窗
            this.submitLoading = false
          })
      } else if (this.handleType === "edit") {
        //编辑
        this.$api.qualityControl.goodsManage.edit(params)
          .then(res => {
            if (res.data.retcode === this.SUCCESS_CODE) {
              this.submitLoading = false
              this.$message({
                type: "success",
                message: res.data.retmsg
              })
              this.getList()//再次请求列表
              this.addedEditorDialog = false//隐藏弹窗
            } else {
              //其他异常
              this.$message({
                type: "error",
                message: res.data.retmsg
              })
              this.submitLoading = false
            }
          }).catch(err => {
            //隐藏弹窗
            console.log(err)
            this.addedEditorDialog = false
            this.submitLoading = false
          })
      }
    }
  }
}
</script>
