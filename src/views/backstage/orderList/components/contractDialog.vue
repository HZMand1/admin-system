<template>
  <!-- 查看合同or凭证弹框 -->
  <section>
    <el-dialog title="" center :visible.sync="Visible" width="50%" :before-close="cancel" :destroy-on-close="true">
      <section v-if="type===1">
        <iframe :src="`${BASE_URL}/rest/seed/http/viewContractOnlines?contractNo=${contractNo}`" frameborder="0" width="100%" height="500px"></iframe>
      </section>
      <section v-else>
        <img :src="payLog" alt="">
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">返 回</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<script>
const BASE_URL = process.env.VUE_APP_BASEURL;
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
      BASE_URL: process.env.VUE_APP_BASEURL
    };
  },
  methods: {
    cancel() {
      this.$emit("cancelEmit", false);
    }
  }
};
</script>
<style lang="less" scoped>
</style>