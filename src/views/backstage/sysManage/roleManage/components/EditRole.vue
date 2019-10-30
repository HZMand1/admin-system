<template>
  <div id="editRole">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px">
      <el-form-item label="角色名称"
                    prop="roleName">
        <el-input v-model="ruleForm.roleName"
                  placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色编号"
                    prop="roleCode">
        <el-input v-model="ruleForm.roleCode"
                  placeholder="请输入角色编号"></el-input>
      </el-form-item>
      <el-form-item label="所属系统"
                    prop="appCode">
        <el-input v-model="ruleForm.appCode"
                  placeholder="请输入所属系统"></el-input>
      </el-form-item>
      <el-form-item label="备注"
                    prop="remark">
        <el-input v-model="ruleForm.remark"
                  placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item label="功能权限">
        <el-tree class="mar-t-auto"
                 :data="dataTree"
                 show-checkbox="true"
                 node-key="id"
                 :default-expanded-keys="false"
                 :default-checked-keys="false"
                 :props="defaultProps"></el-tree>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="submit">提交</el-button>
        <el-button @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ruleForm: {
        roleName: "",
        roleCode: "",
        appCode: "",
        remark: ""
      },
      rules: {
        roleName: [
          { required: true, message: "请输入角色", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ]
      },
      radio: "1",
      dataTree: [{
        id: 1,
        label: "一级 1",
        children: [{
          id: 4,
          label: "二级 1-1",
          children: [{
            id: 9,
            label: "三级 1-1-1"
          }, {
            id: 10,
            label: "三级 1-1-2"
          }]
        }]
      }, {
        id: 2,
        label: "一级 2",
        children: [{
          id: 5,
          label: "二级 2-1"
        }, {
          id: 6,
          label: "二级 2-2"
        }]
      }, {
        id: 3,
        label: "一级 3",
        children: [{
          id: 7,
          label: "二级 3-1"
        }, {
          id: 8,
          label: "二级 3-2"
        }]
      }],
      defaultProps: {
        children: "children",
        label: "label"
      },
      loading: false
    }
  },
  methods: {
    //表单提交
    submit () {
      this.$confirm("确认提交？", "提交", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //打开loading
          this.loading = true
          //调用新增接口
          this.$api.api.insertRole(this.ruleForm)
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
        })
    },
    back () {
      this.$fun.goBack();
    }
  }
}
</script>
<style scoped lang="less">
.mar-t-auto {
  margin-top: 8px;
}
</style>