<template>
  <div>
    <el-upload class="avatar-uploader" action="/" :show-file-list="false" :on-progress="handleProgess" :on-error="handleError" :http-request="uploadSectionFileImg" :before-upload="beforeAvatarUpload">
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
    <p class="tip">{{tip}}</p>
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
    uploadTip: String,
    tip: String
  },
  methods: {
    // 自定义上传文件方法
    uploadSectionFileImg(param) {
      this.files = param.file;
      let formData = new FormData();
      formData.append("file", this.files);
      this.$api.api
        .fileUpload(formData)
        .then(result => {
          if (result.data.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
            this.$message({
              message: result.data.retmsg,
              type: "success"
            });
            this.imageUrl = result.data.data.fileUrl;
          } else {
            this.$message.error(result.data.retmsg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("服务器错误!!");
        });
      // this.imageUrl = URL.createObjectURL(this.files);
    },
    beforeAvatarUpload(file) {
      let filetypes = ["jpg", "png", "jpeg"];
      let filename = file.name;
      let fileted = filename.replace(/.+\./, "");
      const isLt2M = file.size / 1024 / 1024 < 2;
      let isTYPE = filetypes.includes(fileted);
      if (!isTYPE) {
        this.$message.error("上传文件类型只能是jpg,png,jpeg格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 2MB!");
      }
      return isTYPE && isLt2M;
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
.tip {
  width: 214px;
  text-align: center;
}
.avatar-uploader {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  font-size: 0;
  position: relative;
  width: 214px;
  height: 129px;
  line-height: 1;
  overflow: hidden;
  border: 1px dashed #ccc;
  border-radius: 4px;
  transition: all ease 0.3s;
  &:hover {
    border: 1px solid #ab5d01;
  }
  .upload-content {
    padding: 37px 77px;
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
