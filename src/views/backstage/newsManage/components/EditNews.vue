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
        <el-input v-model="ruleForm.imgPath"
                  placeholder="请输入图片"></el-input>
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
export default {
  data () {
    return {
      ruleForm: {
        title: "", //标题
        textSource: 0, //文章来源(0,"文本形式",1,"链接形式")
        textType: 0, //文章类型 (0,"原创",1,"转载")
        sysParams: {}, //系统参数
        imgPath: "", //资讯封面图
        content: "" //资讯
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
    }
  },
  mounted () {
    //先设置下资讯分类的值
    let paramsObj = [{ "val": "华夏时讯", "code": "hxsb" }, { "val": "今日资讯", "code": "jrzx" }, { "val": "纽约日报", "code": "nyrb" }]
    this.ruleForm.sysParams = paramsObj
  },
  methods: {
    submit () { },
    back () { }
  }
}
</script>