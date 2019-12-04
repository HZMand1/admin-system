<template>
  <!-- 查看合同or凭证弹框 -->
  <section>
    <el-dialog title="" center :visible.sync="Visible" @open="openDialog" width="1000px" :before-close="cancel">
      <section v-if="type===1">
        <iframe :src="`${BASE_URL}/rest/seed/http/viewContractOnlines?contractNo=${contractNo}`" frameborder="0" width="100%" height="500px"></iframe>
      </section>
      <section v-if="type===2">
        <img :src="payLog" alt="">
      </section>
      <section v-if="type===3" class="contract-content">
        <div v-html="contractContent"></div>
      </section>
      <span slot="footer" class="dialog-footer btns">
        <el-button @click="download" v-if="type===3 || type===1" class="color">下 载</el-button>
        <el-button @click="cancel">返 回</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<script>
const BASE_URL = process.env.VUE_APP_BASEURL;
import Storage from "../../../../assets/utils/Storage.js";
export default {
  name: "dialogT",
  props: {
    Visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: Number
    },
    contractNo: {
      type: String
    },
    payLog: {
      type: String
    }
  },
  data() {
    return {
      url: "",
      BASE_URL: process.env.VUE_APP_BASEURL,
      contractContent: ""
    };
  },
  methods: {
    cancel() {
      this.$emit("cancelEmit", false);
    },
    // 弹框触发
    openDialog() {
      if (this.type === 3) {
        // 查看合同
        // 获取合同页面
        let params = {
          contractNo: this.contractNo,
          userId: Storage.localGet("userInfo").id
        };
        this.$api.api
          .getContractDetailByContractNo(params)
          .then(result => {
            if (result.data.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
              this.contractContent = result.data.data.contractContent;
            } else {
              this.$message.error(result.data.retmsg);
            }
            this.loading = false;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 下载合同
    download() {
      let file = `${process.env.VUE_APP_BASEURL}/rest/contract/info/downLoadAttarch?contractNo=${this.contractNo}`;
      if (file) {
        window.location.href = file;
        setTimeout(() => {
          this.$message({
            message: "正在下载",
            type: "success"
          });
        }, 1000);
      } else {
        this.$message.error("服务端出错!!");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.contract-content {
  max-height: 500px;
  overflow: auto;
}
</style>