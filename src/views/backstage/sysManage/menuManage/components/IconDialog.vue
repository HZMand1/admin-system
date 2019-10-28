<template>
  <!-- icon图标弹框组件 -->
  <section class="icon">
    <el-dialog title="选取图标" :visible.sync="isDialog" width="50%" :before-close="cancel">
      <section>
        <el-row class="pad-b-30">
          <el-col :span="4">
            <i class="iconyanjing iconfont fz"></i>
            <p>iconyanjing</p>
          </el-col>
          <el-col :span="4" :offset="1">
            <i class="el-icon-s-tools fz"></i>
            <p>el-icon-s-tools</p>
          </el-col>
          <el-col :span="4" :offset="1">
            <i class="el-icon-phone fz"></i>
            <p>el-icon-phone</p>
          </el-col>
          <el-col :span="4" :offset="1">
            <i class="el-icon-close fz"></i>
            <p>el-icon-close</p>
          </el-col>
          <el-col :span="4" :offset="1">
            <i class="el-icon-upload fz"></i>
            <p>el-icon-upload</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <i class="el-icon-s-home fz"></i>
            <p>el-icon-s-home</p>
          </el-col>
          <el-col :span="4" :offset="1">
            <i class="el-icon-share fz"></i>
            <p>el-icon-share</p>
          </el-col>
          <el-col :span="4" :offset="1">
            <i class="el-icon-present fz"></i>
            <p>el-icon-present</p>
          </el-col>
          <el-col :span="4" :offset="1">
            <i class="el-icon-document fz"></i>
            <p>el-icon-document</p>
          </el-col>
          <el-col :span="4" :offset="1">
            <i class="el-icon-attract fz"></i>
            <p>el-icon-attract</p>
          </el-col>
        </el-row>
      </section>
    </el-dialog>
  </section>
</template>
<script>
export default {
  name: "IconDialog",
  props: {
    isDialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    // 取消弹框
    cancel() {
      this.$emit("cancelIconEmit", false);
    }
  }
};
</script>
<style lang="less" scoped>
.fz {
  font-size: 40px;
  &:hover {
    color: #66b1ff;
    cursor: pointer;
  }
}
</style>