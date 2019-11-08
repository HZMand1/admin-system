<template>
  <div>
    <el-upload class="avatar-uploader" action="/" :show-file-list="false" :on-progress="handleProgess" :on-success="handleAvatarSuccess" :on-error="handleError" :http-request="uploadSectionFileImg" :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="img-cover">
      <el-progress v-if="!isImg && !imageUrl" :status="isError?'exception':null" :width="114" type="circle" :percentage="percentage"></el-progress>
      <div v-if="isImg" class="upload-content">
        <div class="icon-box">
          <i class="el-icon-plus"></i>
          <div class="upload-text">上传</div>
        </div>
        <div class="upload-tip" slot="tip">{{uploadTip}}</div>
      </div>
    </el-upload>
    <!--<div class="el-form-item__error">上传图片只能是 JPG 格式!</div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      percentage: 0,
      isImg: true,
      isError: false
    };
  },
  props: {
    actionUrl: String,
    uploadTip: String
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 自定义上传文件方法
    uploadSectionFileImg(param) {
      this.form.fileListImg.length = 0;
      this.form.fileListImg.push({
        name: param.file.name,
        url: URL.createObjectURL(param.file)
      });
      this.files = param.file;
      let formData = new FormData();
      formData.append("file", this.files);
    },
    beforeAvatarUpload(file) {
      this.imageUrl = "";
      this.percentage = 0;
      this.isError = false;
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
        this.isImg = true;
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
        this.isImg = true;
      }
      return isJPG && isLt2M;
    },
    handleError(err) {
      this.isError = true;
    },
    handleProgess(event) {
      this.isImg = false;
      this.percentage = Math.floor(event.percent);
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  width: 100%;
  height: 100% !important;
}
</style>
<style scoped lang="less">
.avatar-uploader {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  font-size: 0;
  position: relative;
  width: 185px;
  height: 116px;
  line-height: 1;
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: all ease 0.3s;
  &:hover {
    border: 1px solid #ab5d01;
  }
  .upload-content {
    padding: 30px;
    display: flex;
    align-content: center;
    align-items: center;
    .icon-box {
      width: 53px;
      height: 53px;
      text-align: center;
      background: #ccc;
      border-radius: 53px;
      color: #fff;
      i {
        line-height: 34px;
        font-size: 23px;
      }
    }
    .upload-text {
      font-size: 14px;
      color: #fff;
      line-height: 10px;
    }
    .upload-tip {
      margin-left: 5px;
      font-size: 13px;
      color: #999;
    }
  }
}
</style>
