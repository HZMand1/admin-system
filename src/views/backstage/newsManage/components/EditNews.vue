<template>
  <div id="detailNews">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-form-item label="资讯标题："
                    prop="title">
        <el-col :span="12">
          <el-input v-model="ruleForm.title"
                    placeholder="请输入标题"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="资讯来源："
                    prop="textSource">
        <template>
          <el-radio :key="index"
                    v-for=" (item,index) in infoSource"
                    v-model="ruleForm.textSource"
                    :label="item.val">{{item.code}}</el-radio>
        </template>
      </el-form-item>
      <el-form-item label="原创或转载："
                    prop="textType">
        <template>
          <el-radio :key="index"
                    v-for=" (item,index) in originalReprint"
                    v-model="ruleForm.textType"
                    :label="item.val">{{item.code}}</el-radio>
        </template>
      </el-form-item>
      <el-form-item label="资讯分类："
                    prop="typeCode">
        <el-radio :key="index"
                  v-for=" (item,index) in infoType"
                  v-model="ruleForm.typeCode"
                  :label="item.val">{{item.code}}</el-radio>
      </el-form-item>

      <el-form-item label="资讯封面图："
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
      <el-form-item label="资讯摘要："
                    prop="subTitle">
        <el-col :span="12">
          <el-input v-model="ruleForm.subTitle"
                    type="textarea"
                    maxlength="250"
                    show-word-limit
                    placeholder="请输入摘要"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="资讯内容："
                    prop="content">
        <el-col :span="18">
          <vue-ueditor-wrap v-model="ueditorInfo"
                            :config="ueditorConfig"></vue-ueditor-wrap>
        </el-col>
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
import { VueCropper } from "vue-cropper"
import VueUeditorWrap from "vue-ueditor-wrap"
export default {
  components: {
    VueCropper,
    VueUeditorWrap
  },
  data () {
    return {
      ruleForm: {
        title: "", //标题
        textSource: "0", //文章来源(0,"文本形式",1,"链接形式")
        textType: "0", //文章类型 (0,"原创",1,"转载")
        typeCode: "0", //资讯分类 
        imgPath: "", //图片路径
        subTitle: "", //资讯摘要
        content: "", //资讯内容
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 0, max: 50, message: "长度在 0 到 50 个字符", trigger: "blur" }
        ]
      },
      loading: false, //表单加载
      radioGp: "",

      infoType: [], //资讯分类
      originalReprint: [], //原创和转载
      infoSource: [], //资讯来源
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

      //富文本相关---start
      ueditorInfo: "",
      ueditorConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: true,
        // 初始容器高度
        initialFrameHeight: 300,
        // 初始容器宽度
        initialFrameWidth: "100%",
        serverUrl: process.env.VUE_APP_BASEURL + "/ueditor/ueditorConfig",

        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: "/UE/",
      }
      //富文本相关---end
    }
  },
  mounted () {

    //根据id查询数据
    this.id = this.$route.query.id
    this.getData()

    //资讯分类
    this.getSystemParams("INFO_TYPE")

    //原创和转载
    this.getSystemParams("ORIGINAL_REPRINT")

    //资讯来源
    this.getSystemParams("INFO_SOURCE")

  },
  methods: {
    //提交按钮
    submit () {
      //富文本内容
      this.ruleForm.content = this.ueditorInfo

      if (this.ruleForm.title === "") {
        this.$message({
          message: "请输入标题",
          type: "error"
        })
        return
      }
      this.$confirm("确认提交？", "提交", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调用新增接口
          this.$api.api.updateAdNews(this.ruleForm)
            .then(result => {
              //返回结果处理
              let dataRow = result.data;
              if (dataRow.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
                this.$message({
                  message: dataRow.retmsg,
                  type: "success"
                })
                //新增成功后，返回到上一页
                this.$fun.goBack();
              } else {
                this.$message.error(dataRow.retmsg)
              }
            }).cathc(() => {
              this.$message.error("请求失败！")
            })
        }).catch(() => {
        })
    },
    //返回按钮
    back () {
      this.$fun.goBack()
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
              console.log("调用接口", data)
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

    /**
     * 查询数据
     */
    getData () {
      let params = {
        id: this.id
      }
      this.$api.api.findAdNewsById(params)
        .then(result => {
          let dataRow = result.data
          if (dataRow.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
            this.ruleForm = dataRow.data
            //radio组件的值需要时字符类型
            this.ruleForm.textType = JSON.stringify(dataRow.data.textType)
            this.ruleForm.textSource = JSON.stringify(dataRow.data.textSource)
            //给富文本赋值
            this.ueditorInfo = dataRow.data.content
          } else {
            this.$message.error(dataRow.retmsg)
          }
        }).catch(() => {
          this.$message.error("请求失败!")
        })
    },

    //根据参数，获取不同类型的系统参数
    getSystemParams (par) {
      let params = {
        type: par
      }
      let that = this
      this.$api.api.systemParamFindListByType(params)
        .then(result => {
          let dataRow = result.data
          if (dataRow.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
            if ("INFO_TYPE" === par) {
              this.infoType = dataRow.data

              //这一步多余的，只是尝试下这种写法
              // this.ruleForm.sysParams = dataRow.data.map(item => ({ code: item.code, val: item.val }))

            } else if ("ORIGINAL_REPRINT" === par) {
              this.originalReprint = dataRow.data
            } else if ("INFO_SOURCE" === par) {
              this.infoSource = dataRow.data
            }
          } else {
            this.$message.error(dataRow.retmsg)
          }
        }).catch(() => {
          this.$message.error("请求失败！")
        })
    }
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
<style lang="less">
.edui-editor-breadcrumb {
  display: none;
}
</style>