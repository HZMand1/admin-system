<template>
  <!-- 新增菜单结构 -->
  <section class="bor-1 ">
    <el-row class="bor-b-1">
      <el-col class="pad-l-20 font-weight-b" style="line-height: 50px;">修改</el-col>
    </el-row>
    <el-row>
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
          <el-form-item label="上级菜单" :prop="ruleForm.type===1?'supeName':''">
            <el-input v-model="ruleForm.supeName" :readonly="true" placeholder="点击右边按钮选取菜单">
              <i class="iconyanjing iconfont" slot="suffix" @click="showTree" style="cursor: pointer;"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="菜单URL" prop="menuUrl" v-if="ruleForm.type===0">
            <el-input v-model="ruleForm.menuUrl"></el-input>
          </el-form-item>
          <el-form-item label="授权标识">
            <el-input v-model="ruleForm.auth" placeholder="多个逗号分隔，如：user:list,user:creact"></el-input>
          </el-form-item>
          <!-- <el-form-item label="排序号" v-if="ruleForm.type!=='button'">
            <el-input-number v-model="ruleForm.num" controls-position="right" :min="0"></el-input-number>
          </el-form-item> -->
          <!-- <el-form-item label="图标" v-if="ruleForm.type!=='button'">
            <el-input v-model="ruleForm.icon" placeholder="图标"></el-input>
          </el-form-item> -->
          <el-form-item label="状态">
            <el-radio-group v-model="ruleForm.enable">
              <el-radio :label="0">有效</el-radio>
              <el-radio :label="1">无效</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button type="primary" @click="goback">返回</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <tree-dialog @cancelEmit="cancelEmit" @confirmEmit="confirmEmit" :isDialog="isDialog"></tree-dialog>
  </section>
</template>
<script>
import TreeDialog from "./TreeDialog";
export default {
  name: "EditMenu",
  components: {
    TreeDialog
  },
  data() {
    return {
      isDialog: false,
      ruleForm: {
        type: 0,
        menuName: null,
        supeName: null,
        supeId: null,
        menuUrl: null,
        auth: null,
        num: 0,
        icon: null,
        enable: 1
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
      menuId: null
    };
  },
  mounted() {
    const { id } = this.$route.query;
    this.menuId = id;
    let params = {
      id: id
    };
    this.$api.api
      .findMenuById(params)
      .then(result => {
        if (result.data.retcode === this.code) {
          this.ruleForm.type = result.data.data.type;
          this.ruleForm.menuName = result.data.data.name;
          this.ruleForm.menuUrl = result.data.data.path;
          this.ruleForm.auth = result.data.data.auth;
          this.ruleForm.enable = result.data.data.enable;
        } else {
          this.$message.error(result.data.retmsg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 提交成功
          let params = {
            id: this.menuId,
            type: this.ruleForm.type,
            parentId: this.ruleForm.supeId,
            path: this.ruleForm.menuUrl,
            name: this.ruleForm.menuName,
            auth: this.ruleForm.auth,
            enable: this.ruleForm.enable
          };
          this.$api.api
            .updateMenu(params)
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
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 显示组织架构树
    showTree() {
      this.isDialog = true;
    },
    // 返回
    goback() {
      this.$fun.goBack();
    },
    // 重置
    resetForm(formName) {
      this.ruleForm.type = "menu";
      this.$refs[formName].resetFields();
    },
    // 取消弹框
    cancelEmit(b) {
      this.isDialog = b;
    },
    // 确认弹框
    confirmEmit(b, o) {
      this.isDialog = b;
      this.ruleForm.supeName = o.name;
      this.ruleForm.supeId = o.id;
    }
  }
};
</script>
<style lang="less" scoped>
</style>