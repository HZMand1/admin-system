<template>
  <div id="adduser">
    <el-form :model="reluForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px">
      <el-form-item label="角色名称"
                    prop="roleName"
                    required>
        <el-input v-model="ruleForm.userName"
                  placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="所属部门"
                    prop="department">
        <el-input v-model="ruleForm.department"
                  placeholder="请输入所属部门"></el-input>
      </el-form-item>
      <el-form-item label="备注"
                    prop="remake">
        <el-input v-model="ruleForm.remake"
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
      <el-form-item label="数据权限">
        <el-tree class="mar-t-auto"
                 :data="dataTree"
                 show-checkbox="true"
                 node-key="id"
                 :default-expanded-keys="[2, 3]"
                 :default-checked-keys="[5]"
                 :props="defaultProps"></el-tree>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="submit">提交</el-button>
        <el-button @click="back">返回</el-button>
        <el-button>重置</el-button>
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
        department: "",
        remake: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
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
      }
    }
  },
  methods: {
    //表单提交
    submit () {
      this.$confirm("确认提交？")
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