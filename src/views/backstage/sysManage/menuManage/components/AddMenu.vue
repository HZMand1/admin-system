<template>
  <!-- 新增菜单结构 -->
  <section class="bor-1">
    <el-row class="bor-b-1">
      <el-col class="pad-l-20 font-weight-b" style="line-height: 50px;">新增</el-col>
    </el-row>
    <el-row v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-col>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm pad-r-30">
          <el-form-item label="类型" class="pad-t-20">
            <el-radio-group v-model="ruleForm.type">
              <el-radio :label="0">菜单</el-radio>
              <el-radio :label="1">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="菜单名称" prop="menuName">
            <el-input v-model="ruleForm.menuName"></el-input>
          </el-form-item>
          <el-form-item label="上级菜单" :prop="ruleForm.type==='button'?'supeName':''">
            <el-input v-model="ruleForm.supeName" :readonly="true" placeholder="点击右边按钮选取菜单">
              <i class="iconyanjing iconfont" slot="suffix" @click="showTree" style="cursor: pointer;"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="菜单URL" prop="menuUrl" v-if="ruleForm.type===0">
            <el-input v-model="ruleForm.menuUrl"></el-input>
          </el-form-item>
          <el-form-item label="授权标识" v-if="ruleForm.type!=='directory'">
            <el-input v-model="ruleForm.auth" placeholder="多个逗号分隔，如：user:list,user:creact"></el-input>
          </el-form-item>
          <!-- <el-form-item label="排序号" v-if="ruleForm.type!=='button'">
            <el-input-number v-model="ruleForm.num" controls-position="right" :min="0"></el-input-number>
          </el-form-item> -->
          <!-- <el-form-item label="图标" v-if="ruleForm.type!=='button'">
            <el-input v-model="ruleForm.icon" placeholder="图标,点击右边按钮选取图标">
              <i class="iconyanjing iconfont" slot="suffix" @click="showIcon" style="cursor: pointer;"></i>
            </el-input>
          </el-form-item> -->
          <el-form-item label="状态">
            <el-radio-group v-model="ruleForm.status">
              <el-radio :label="0">有效</el-radio>
              <el-radio :label="1">无效</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button type="warning" @click="goback">返回</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <tree-dialog @cancelEmit="cancelEmit" @confirmEmit="confirmEmit" :isDialog="isDialogTree"></tree-dialog>
    <icon-dialog :isDialog="isDialogIcon" @cancelIconEmit="cancelIconEmit"></icon-dialog>
  </section>
</template>
<script>
import TreeDialog from "./TreeDialog";
import IconDialog from "./IconDialog";
export default {
  name: "AddMenu",
  components: {
    TreeDialog,
    IconDialog
  },
  data() {
    return {
      isDialogTree: false,
      isDialogIcon: false,
      ruleForm: {
        type: 0,
        menuName: null,
        supeName: "一级菜单",
        supeId: null,
        menuUrl: null,
        auth: null,
        num: 0,
        icon: null,
        status: 0
      },
      rules: {
        menuName: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" }
        ],
        supeName: [
          { required: true, message: "上次菜单名称不能为空", trigger: "blur" }
        ],
        menuUrl: [
          { required: true, message: "菜单 url 不能为空", trigger: "blur" }
        ]
      },
      code: this.$config.RET_CODE.SUCCESS_CODE,
      loading: false
    };
  },
  methods: {
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 提交成功
          let params = {
            type: this.ruleForm.type,
            parentId: this.ruleForm.supeId,
            path: this.ruleForm.menuUrl,
            name: this.ruleForm.menuName,
            auth: this.ruleForm.auth,
            enable: this.ruleForm.status
          };
          this.loading = true;
          this.$api.api
            .insertMenu(params)
            .then(result => {
              if (result.data.retcode === this.code) {
                this.$message({
                  message: result.data.retmsg,
                  type: "success"
                });
                this.goback();
              } else {
                this.$message.error(result.data.retmsg);
              }
              this.loading = false;
            })
            .catch(err => {
              this.loading = false;
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 返回
    goback() {
      this.$fun.goBack();
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 显示组织架构树
    showTree() {
      this.isDialogTree = true;
    },
    // 显示icon弹框
    showIcon() {
      this.isDialogIcon = true;
    },
    // 取消tree弹框
    cancelEmit(b) {
      this.isDialogTree = b;
    },
    // 关闭icon弹框
    cancelIconEmit(b) {
      this.isDialogIcon = b;
    },
    // 确认tree弹框
    confirmEmit(b, o) {
      this.isDialogTree = b;
      this.ruleForm.supeName = o.name;
      this.ruleForm.supeId = o.id;
    }
  }
};
</script>
<style lang="less" scoped>
</style>