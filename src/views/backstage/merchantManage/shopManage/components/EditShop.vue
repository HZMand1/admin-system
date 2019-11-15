<template>
  <div id="detailNews">
    <el-form :model="ruleForm"
             ref="ruleForm"
             label-width="100px"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-form-item label="店铺名称："
                    prop="name">
        <el-col :span="12">
          <el-input v-model="ruleForm.name"
                    placeholder="请输入名称"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="店铺简介："
                    prop="introduce">

        <el-input v-model="ruleForm.introduce"
                  placeholder="请输入简介"></el-input>
      </el-form-item>
      <el-form-item label="分类："
                    prop="reviewUser">

        <el-input v-model="ruleForm.reviewUser"
                  placeholder="请输入分类"></el-input>
      </el-form-item>
      <el-form-item label="专属域名："
                    prop="url">
        <el-input v-model="ruleForm.url"
                  placeholder="请输入域名"></el-input>
      </el-form-item>

      <el-form-item label="店铺logo："
                    prop="imgPath">
        <div class="info-item">
          <div class="line">
            <div class="cropper-content">
              <div class="cropper"
                   v-loading="uploadingLoading"
                   element-loading-text="拼命加载中……">
                <vueCropper ref="cropper"
                            :img="option.img"
                            :outputSize="option.size"
                            :outputType="option.outputType"
                            :info="true"
                            :full="option.full"
                            :canMove="option.canMove"
                            :canMoveBox="option.canMoveBox"
                            :original="option.original"
                            :autoCrop="option.autoCrop"
                            :autoCropWidth="option.autoCropWidth"
                            :autoCropHeight="option.autoCropHeight"
                            :fixedBox="option.fixedBox"
                            @realTime="realTime"
                            @imgLoad="imgLoad">
                </vueCropper>
              </div>
            </div>
          </div>
          <div class="mar-t-10">
            <input type="file"
                   id="uploads"
                   :value="imgFile"
                   style="position:absolute; clip:rect(0 0 0 0);"
                   accept="image/png, image/jpeg, image/gif, image/jpg"
                   @change="uploadImg($event, 1)">
            <label class="el-button el-button--default el-button--mini is-round"
                   for="uploads">选择图片</label>
            <el-button type="default"
                       size="mini"
                       round
                       @click="changeScale(1)">+</el-button>
            <el-button type="default"
                       size="mini"
                       round
                       @click="changeScale(-1)">-</el-button>
            <el-button type="default"
                       size="mini"
                       round
                       @click="rotateLeft">↺</el-button>
            <el-button type="default"
                       size="mini"
                       round
                       @click="rotateRight">↻</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submit">提交</el-button>
        <el-button center
                   @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { VueCropper } from "vue-cropper"
import E from "wangeditor"
export default {
  components: {
    VueCropper
  },
  data () {
    return {
      ruleForm: {
        name: "", //店铺名称
        introduce: "", //店铺简介
        reviewUser: "", //分类
        url: "", //专属域名
        logo: "", //logo
        imgPath: "",//banner图片路径
      },
      loading: false, //表单加载
      id: "", //传过来的id值
      //上传图片相关--start
      uploadingLoading: false,
      previews: {},
      thumbImageUrl: "",//展示的图片地址（缩略图）
      fileUrl: "",//传给后台的原图
      option: {
        img: "",
        outputSize: 1, //剪切后的图片质量（0.1-1）
        full: false,//输出原图比例截图 props名full
        outputType: "png", //裁剪生成图片的格式
        canMove: true, //上传图片是否可以移动
        original: false, //上传图片按照原始比例渲染
        canMoveBox: true, //截图框能否拖动
        autoCrop: false, //是否默认生成截图框
        autoCropWidth: 330, //默认生成截图框宽度
        autoCropHeight: 220, //默认生成截图框高度
        fixedBox: true //固定截图框大小 不允许改变
      },
      fileName: "",  //本机文件地址
      downImg: "#",
      imgFile: "",
      uploadImgRelaPath: "", //上传后的图片的地址（不带服务器域名）
      //上传图片相关--end

    }
  },
  mounted () {
    this.loading = true
    //根据id查询数据
    this.id = this.$route.query.id
    this.getData()
  },
  methods: {
    /**
     * 查询数据
     */
    getData () {
      let params = {
        id: this.id
      }
      this.$api.api.findSupplierInfoById(params)
        .then(result => {
          let dataRow = result.data
          if (dataRow.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
            this.ruleForm = dataRow.data
          } else {
            this.$message.error(dataRow.retmsg)
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
          this.$message.error("请求失败!")
        })
    },
    //放大/缩小
    changeScale (num) {
      console.log("changeScale")
      num = num || 1;
      this.$refs.cropper.changeScale(num)
    },
    //左旋转
    rotateLeft () {
      console.log("rotateLeft")
      this.$refs.cropper.rotateLeft()
    },
    //右旋转
    rotateRight () {
      console.log("rotateRight")
      this.$refs.cropper.rotateRight();
    },
    //上传图片
    finish (type) {
      let formData = new FormData();
      if (type === "blob") {
        this.$refs.cropper.getCropBlob((data) => {
          let img = window.URL.createObjectURL(data)
          formData.append("file", data, this.fileName)
          formData.append("thumbImageFlag", true)
          this.uploadingLoading = true
          this.$api.api.fileUpload(formData, {
            contentType: false,
            processData: false,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
          }).then(res => {
            if (res.data.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
              let data = res.data.data
              this.imgFile = ""
              this.fileUrl = data.fileUrl  //完整路径
              this.ruleForm.imgPath = data.fileUrl //将参数给表单，提交方法时要用到这个参数
              this.thumbImageUrl = data.thumbImageUrl  //非完整路径
              this.$message({
                type: "success",
                message: res.data.retmsg
              })
              this.uploadingLoading = false
            } else {
              this.$message({
                type: "error",
                message: res.data.retmsg
              })
              this.uploadingLoading = false
            }
          }).catch(() => {
            this.uploadingLoading = false
          })
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
        })
      }
    },
    // 实时预览函数
    realTime (data) {
      this.previews = data
    },
    //选择本地图片
    uploadImg (e, num) {
      this.uploadingLoading = true
      //上传图片
      let file = e.target.files[0]
      this.fileName = file.name
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        this.$message({
          type: "error",
          message: "图片类型必须是.gif,jpeg,jpg,png,bmp中的一种"
        })
        return false
      }
      //限制图片大小
      const picSize = file.size / 1024 / 1024 < 5
      if (!picSize) {
        return this.$message.error("上传图片大小不能超过 5MB!")
      }
      let reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        if (num === 1) {
          this.option.img = data
          this.uploadingLoading = false
        }
      }

      // 转化为base64 
      // reader.readAsDataURL(file) 
      // 转化为blob 
      reader.readAsArrayBuffer(file);
    },
    imgLoad (msg) {
      this.finish("blob")
    },
    //提交按钮
    submit () {
      this.$api.api.updateSupplier(this.ruleForm)
        .then(result => {
          let dataRow = result.data
          if (dataRow.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
            this.$message({
              message: dataRow.retmsg,
              type: "success"
            })
            this.$fun.goBack()
          } else {
            this.$message.error(dataRow.retmsg)
          }
        }).catch(() => {
          this.$message.error("请求失败!")
        })
    },
    //返回按钮
    back () {
      this.$fun.goBack()
    },


  }
}
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