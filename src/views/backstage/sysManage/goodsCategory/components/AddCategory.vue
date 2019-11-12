<template>
  <div id="addCategory">
    <el-form ref="form"
             :model="ruleForm">
      <el-form-item label="父级分类："
                    prop="parentName">
        <el-col :span="12">
          <el-input v-model="ruleForm.parentName"
                    :readonly="true"
                    placeholder="点击右边按钮选取菜单">
            <i class="iconyanjing iconfont"
               slot="suffix"
               @click="showTree"
               style="cursor: pointer;"></i>
          </el-input>
        </el-col>
        <el-input style="display:none"
                  type="hidden"
                  v-model="ruleForm.parentId"></el-input>
      </el-form-item>
      <el-form-item label="分类名称："
                    prop="name">

        <el-col :span="12">
          <el-input v-model="ruleForm.name"
                    placeholder="请输入分类名称"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="排序："
                    prop="orders">
        <el-col :span="12">
          <el-input v-model="ruleForm.orders"
                    placeholder="请输入排序号"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   :loading="btnloading"
                   @click="submit">提交</el-button>
        <el-button @click="back">返回</el-button>
      </el-form-item>
    </el-form>

    <tree-dialog @cancelEmit="cancelEmit"
                 @confirmEmit="confirmEmit"
                 :isDialog="isDialog"></tree-dialog>
  </div>
</template>
<script>
import TreeDialog from "./TreeDialog";
export default {
  components: {
    TreeDialog
  },
  data () {
    return {
      ruleForm: {
        parentId: "",
        parentName: "",
        name: "",
        orders: ""
      },
      treeData: {},
      btnloading: false, //按钮的加载状态
      id: "", //上个页面传过来的值
      isDialog: false, //是否显示弹框
    }
  },
  mounted () {

  },
  filters: {
    enableFormat (value) {
      if (value === 0) {
        return "启用"
      } else {
        return "禁用"
      }
    },
  },
  methods: {
    // 显示组织架构树
    showTree () {
      this.isDialog = true;
    },
    // 取消弹框
    cancelEmit (b) {
      this.isDialog = b;
    },
    // 确认弹框
    confirmEmit (b, o) {
      this.isDialog = b;
      this.ruleForm.parentName = o.name;
      this.ruleForm.parentId = o.id;
    },
    /**
     * 提交方法
     */
    submit () {
      this.loading = true
      this.$confirm("确认提交？", "提交", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调用新增接口
          this.$api.api.goodsCategoryAdd(this.ruleForm)
            .then(result => {
              //返回结果处理
              let dataRow = result.data;
              if (dataRow.retcode === 1) {
                this.$message({
                  message: dataRow.retmsg,
                  type: "success"
                })
                //新增成功后，返回到上一页
                this.$fun.goBack();
              } else {
                this.$message.error(dataRow.retmsg)
              }
              //关闭loading
              this.loading = false
            }).cathc(() => {
              //关闭loading
              this.loading = false
              this.$message.error("请求失败！")
            })
        }).catch(() => {
          this.loading = false
        })
    },
    back () {
      this.$fun.goBack();
    }
  }
}
</script>