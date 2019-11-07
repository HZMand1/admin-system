<template>
  <!--新增、编辑-->
  <el-dialog title="" :visible.sync="dialogVisible" :before-close="handleCancel" width="1100px">
    <el-form :model="dialogForm" ref="dialogForm" label-width="130px" :rules="formRules">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="title" label="广告标题">
            <el-input v-model.trim="dialogForm.title" maxlength="30" placeholder="请输入广告标题" style="width: 90%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="subTitle" label="广告位置">
            <el-input v-model.trim="dialogForm.subTitle" placeholder="广告位置" style="width: 90%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="typeCode" label="广告编号">
            <el-input v-model.trim="dialogForm.typeCode" placeholder="广告编号" style="width: 90%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="status" label="广告状态">
            <el-select v-model="dialogForm.status" style="width: 90%;" placeholder="请选择广告状态">
              <el-option label="开启" value="0"></el-option>
              <el-option label="禁用" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="orders" label="显示顺序">
            <el-input v-model.trim="dialogForm.orders" type="number" @mousewheel.native.prevent placeholder="数字越大越在前展示" style="width: 90%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="time" label="有效时间">
            <el-date-picker v-model="dialogForm.time" type="daterange" start-placeholder="开始时间" end-placeholder="结束时间" :default-time="['00:00:00', '23:59:59']" style="width: 360px">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="url" label="广告URL地址">
            <el-input v-model.trim="dialogForm.url" placeholder="广告URL地址" style="width: 95.5%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="imgPath" label="上传广告图片">
        <!-- <div class="info-item" style="flex:1;">
            <div style="width:120px;height:120px;border-radius:50%;overflow:hidden;margin-left:123px;border:1px solid #ddd">
              <img style="width:120px;height:120px;" :src="headImg" alt="头像">
            </div>
          </div> -->
        <div class="info-item">
          <div class="line">
            <div class="cropper-content">
              <div class="cropper" v-loading="uploadingLoading" element-loading-text="拼命加载中……">
                <vueCropper ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType" :info="true" :full="option.full" :canMove="option.canMove" :canMoveBox="option.canMoveBox" :original="option.original" :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :fixedBox="option.fixedBox" @realTime="realTime" @imgLoad="imgLoad">
                </vueCropper>
              </div>
            </div>
          </div>
          <div class="mar-t-10">
            <input type="file" id="uploads" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
            <label class="el-button el-button--default el-button--mini is-round" for="uploads">选择图片</label>
            <el-button type="default" size="mini" round @click="changeScale(1)">+</el-button>
            <el-button type="default" size="mini" round @click="changeScale(-1)">-</el-button>
            <el-button type="default" size="mini" round @click="rotateLeft">↺</el-button>
            <el-button type="default" size="mini" round @click="rotateRight">↻</el-button>
            <el-button type="default" size="mini" round @click="down('blob')">↓</el-button>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="submitHandle('dialogForm')" :loading="submitLoading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { VueCropper } from "vue-cropper";
export default {
  components: {
    VueCropper
  },
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
  data() {
    let validateTypeCode = (rule, value, callback) => {
      let reg = /\w+|\d+/;
      if (reg.test(value) || value === "") {
        callback(new Error("只能输入英文和数字"));
      } else {
        callback();
      }
    };
    let validateUrl = (rule, value, callback) => {
      let reg = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
      if (reg.test(value) || value === "") {
        callback(new Error("请输入正确的url地址"));
      } else {
        callback();
      }
    };

    return {
      //剪切图片上传
      uploadingLoading: false,
      crap: false,
      previews: {},
      thumbImageUrl: "", //展示的图片地址（缩略图）
      fileUrl: "", //传给后台的原图
      option: {
        img: "",
        outputSize: 1, //剪切后的图片质量（0.1-1）
        full: false, //输出原图比例截图 props名full
        outputType: "png",
        canMove: true,
        original: false,
        canMoveBox: true,
        autoCrop: false,
        autoCropWidth: 330,
        autoCropHeight: 220,
        fixedBox: true
      },
      fileName: "", //本机文件地址
      downImg: "#",
      imgFile: "",
      uploadImgRelaPath: "", //上传后的图片的地址（不带服务器域名）
      //弹窗应用表单验证规则
      formRules: {
        // title: [{ required: true, trigger: "blur", validator: validateText }],
        title: [{ required: true, message: "请输入广告标题", trigger: "blur" }],
        url: [{ required: true, validator: validateUrl, trigger: "blur" }],
        subTitle: [
          { required: true, message: "请输入广告位置", trigger: "blur" }
        ],
        typeCode: [
          { required: true, validator: validateTypeCode, trigger: "blur" }
        ],
        status: [
          { required: true, message: "请选择广告状态", trigger: "blur" }
        ],
        orders: [
          { required: true, message: "请输入显示顺序", trigger: "blur" }
        ],
        time: [
          { required: true, message: "请选择开始和结束时间", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //提交
    submitHandle(formName) {
      console.log(this.dialogForm.imgPath);
      if (!this.dialogForm.imgPath || this.dialogForm.imgPath === "") {
        return this.$message({
          type: "error",
          message: "请先上传图片"
        });
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("submitHandle", this.dialogForm);
        }
      });
    },
    //关闭弹窗
    handleCancel() {
      this.$emit("getCancel");
    },
    //打开上传图片弹窗
    uploadFileHandle() {
      this.dialogVisible = true;
    },
    //放大/缩小
    changeScale(num) {
      console.log("changeScale");
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    //坐旋转
    rotateLeft() {
      console.log("rotateLeft");
      this.$refs.cropper.rotateLeft();
    },
    //右旋转
    rotateRight() {
      console.log("rotateRight");
      this.$refs.cropper.rotateRight();
    },
    //上传图片（点击上传按钮）
    finish(type) {
      let formData = new FormData();
      // 输出
      if (type === "blob") {
        this.$refs.cropper.getCropBlob(data => {
          let img = window.URL.createObjectURL(data);
          this.model = true;
          this.modelSrc = img;
          formData.append("file", data, this.fileName);
          formData.append("thumbImageFlag", true);
          this.uploadingLoading = true;
          this.$api.api
            .fileUpload(formData, {
              contentType: false,
              processData: false,
              headers: { "Content-Type": "application/x-www-form-urlencoded" }
            })
            .then(res => {
              if (res.data.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
                let data = res.data.data;
                console.log("调用接口", data);
                this.imgFile = "";
                this.fileUrl = data.fileUrl; //完整路径
                this.dialogForm.imgPath = data.fileUrl; //完整路径
                this.thumbImageUrl = data.thumbImageUrl; //非完整路径
                this.$message({
                  type: "success",
                  message: res.data.retmsg
                });
                this.uploadingLoading = false;
              } else {
                this.$message({
                  type: "error",
                  message: res.data.retmsg
                });
                this.uploadingLoading = false;
              }
            })
            .catch(err => {
              console.log(err);
              this.uploadingLoading = false;
            });
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          this.model = true;
          this.modelSrc = data;
        });
      }
    },
    // 实时预览函数
    realTime(data) {
      console.log("realTime");
      this.previews = data;
    },
    //下载图片
    down(type) {
      console.log("down");
      let aLink = document.createElement("a");
      aLink.download = "author-img";
      if (type === "blob") {
        this.$refs.cropper.getCropBlob(data => {
          this.downImg = window.URL.createObjectURL(data);
          aLink.href = window.URL.createObjectURL(data);
          aLink.click();
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          this.downImg = data;
          aLink.href = data;
          aLink.click();
        });
      }
    },
    //选择本地图片
    uploadImg(e, num) {
      this.uploadingLoading = true;
      console.log("uploadImg");
      //上传图片
      let file = e.target.files[0];
      this.fileName = file.name;
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        this.$message({
          type: "error",
          message: "图片类型必须是.gif,jpeg,jpg,png,bmp中的一种"
        });
        return false;
      }
      //限制图片大小
      const picSize = file.size / 1024 / 1024 < 5;
      if (!picSize) {
        return this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      let reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          this.option.img = data;
          this.uploadingLoading = false;
          console.log("上传成功");
        } else if (num === 2) {
          this.example2.img = data;
        }
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    imgLoad(msg) {
      console.log("imgLoad");
      console.log(msg);

      this.finish("blob");
    }
  }
};
</script>
<style lang="less" scoped>
.avatar-uploader-icon {
  width: 330px;
  height: 220px;
  line-height: 220px;
  text-align: center;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
}
.avatar-uploader-icon i {
  font-size: 50px;
  color: #dcdfe6;
}
.cropper-content {
  overflow: hidden;
}
.cropper-content .cropper {
  width: 697px;
  height: 256px;
}
.show-preview {
  flex: 1;
  -webkit-flex: 1;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  -webkit-justify-content: center;
  width: 330px;
  height: 220px;
  overflow: hidden;
  border: 1px solid #cccccc;
  margin: 0 auto;
}
.cropper-content .show-preview .preview {
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid #cccccc;
  background: #cccccc;
  margin-left: 40px;
}
.cropper-content .show-preview .preview {
  margin-left: 0;
}
</style>
