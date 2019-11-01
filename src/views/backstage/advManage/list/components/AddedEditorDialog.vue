<template>
  <!--新增、编辑-->
  <el-dialog title=""
             :visible.sync="dialogVisible"
             :before-close="handleCloseBindWarnStandard"
             width="500px">
    <el-form :model="dialogForm"
             ref="dialogForm"
             label-width="100px"
             :rules="formRules">
      <el-form-item prop="title"
                    label="广告标题">
        <el-input v-model.trim="dialogForm.title"
                  maxlength="30"
                  placeholder="请输入广告标题"
                  style="width: 90%;"></el-input>
      </el-form-item>
      <el-form-item prop="code"
                    label="广告URL地址">
        <el-input v-model.trim="dialogForm.code"
                  placeholder="拍品代码"
                  style="width: 90%;"></el-input>
      </el-form-item>
      <el-form-item prop="code"
                    label="广告位置">
        <el-input v-model.trim="dialogForm.code"
                  placeholder="拍品代码"
                  style="width: 90%;"></el-input>
      </el-form-item>
      <el-form-item prop="code"
                    label="显示顺序">
        <el-input v-model.trim="dialogForm.code"
                  placeholder="拍品代码"
                  style="width: 90%;"></el-input>
      </el-form-item>
      <el-form-item prop="code"
                    label="上传广告图片">
        <el-input v-model.trim="dialogForm.code"
                  placeholder="拍品代码"
                  style="width: 90%;"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary"
                 @click="submitHandle('dialogForm')"
                 :loading="submitLoading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    //弹窗是否显示
    dialogVisible: {
      type: Boolean,
      default: false,
      required: true
    },
    //弹窗表单
    dialogForm: {
      type: Object,
      default: Object,
      required: true
    },
    //提交loading
    submitLoading: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data () {
    let validateText = (rule, value, callback) => {
      let reg = /[^\u4e00-\u9fa5]/;
      if (reg.test(value) || value === "") {
        callback(new Error("请输入中文拍品名称"));
      } else {
        callback();
      }
    };
    return {
      //弹窗应用表单验证规则
      formRules: {
        name: [
          {
            required: true,
            trigger: "blur",
            validator: validateText
          }
        ],
        code: [{ required: true, message: "请输入拍品代码", trigger: "blur" }]
      }
    };
  },
  methods: {
    //提交
    submitHandle (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("submitHandle", this.dialogForm);
        }
      });
    },
    //关闭弹窗
    handleCancel () {
      this.$emit("getCancel");
    },
    //关闭弹窗，不可以删这个方法。不用这个方法点击遮罩层关闭会报错
    handleCloseBindWarnStandard () {
      this.$emit("closeBindWarnStandard");
    }
  }
};
</script>
