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
        <el-input v-model="ruleForm.title"
                  placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="资讯来源："
                    prop="textSource">
        <template>
          <el-radio v-model="ruleForm.textSource"
                    label="0">文本形式</el-radio>
          <el-radio v-model="ruleForm.textSource"
                    label="1">链接形式</el-radio>
        </template>
      </el-form-item>
      <el-form-item label="原创或转载："
                    prop="textType">
        <template>
          <el-radio v-model="ruleForm.textType"
                    label="0">原创</el-radio>
          <el-radio v-model="ruleForm.textType"
                    label="1">转载</el-radio>
        </template>
      </el-form-item>
      <el-form-item label="资讯分类："
                    prop="sysParams">
        <el-radio-group v-model="radioGp">
          <el-radio-button :key="index"
                           v-for="(item,index) in ruleForm.sysParams"
                           v-model="item.code"
                           :label="item.val"></el-radio-button>
        </el-radio-group>
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
            <el-button type="default"
                       size="mini"
                       round
                       @click="down('blob')">↓</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="资讯摘要："
                    prop="imgPath">
        <el-input v-model="ruleForm.imgPath"
                  placeholder="请输入摘要"></el-input>
      </el-form-item>
      <el-form-item label="资讯内容："
                    prop="content">
        <el-input v-model="ruleForm.content"
                  placeholder="请输入内容"></el-input>
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
export default {
  components: {
    VueCropper
  },
  data () {
    return {
      ruleForm: {
        title: "", //标题
        textSource: 0, //文章来源(0,"文本形式",1,"链接形式")
        textType: 0, //文章类型 (0,"原创",1,"转载")
        sysParams: {}, //系统参数
        content: "", //资讯
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 0, max: 50, message: "长度在 0 到 50 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ]
      },
      loading: false,
      radioGp: "",

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
    }
  },
  mounted () {
    //先设置下资讯分类的值
    let paramsObj = [{ "val": "华夏时讯", "code": "hxsb" }, { "val": "今日资讯", "code": "jrzx" }, { "val": "纽约日报", "code": "nyrb" }]
    this.ruleForm.sysParams = paramsObj
  },
  methods: {
    submit () { },
    back () { },
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
    // 实时预览函数
    realTime (data) {
      console.log("realTime")
      this.previews = data
    },
    //下载图片
    down (type) {

    },
    //选择本地图片
    uploadImg (e, num) {

    },
    imgLoad (msg) {
      console.log("imgLoad")
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