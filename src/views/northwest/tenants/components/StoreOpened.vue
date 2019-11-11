<template>
  <!-- 店铺开通 -->
  <section class="store-opened">
    <el-row v-if="storeStatus===0">
      <el-col>
        <p class="text-center"><img src="../../../../assets/images/northwest/success.png" alt=""></p>
        <p class="text-center store-opened-tip">恭喜您店铺申请审核通过，前往操作吧！</p>
        <el-button class="store-set">店铺设置</el-button>
      </el-col>
    </el-row>
    <el-row v-if="storeStatus===1">
      <el-col>
        <p class="text-center"><img src="../../../../assets/images/northwest/error.png" alt=""></p>
        <p class="text-center store-opened-tip">您提交的资料不符合要求，请您核对后重新申请。</p>
        <el-button class="store-set" @click="continueApply">继续申请</el-button>
      </el-col>
    </el-row>
    <el-row v-if="storeStatus===2">
      <el-col>
        <p class="text-center"><img src="../../../../assets/images/northwest/loading.png" alt=""></p>
        <p class="text-center store-opened-tip">您提交的资料正在审核，请耐心等待</p>
        <el-button class="store-set exit" @click="exitApply">退出</el-button>
      </el-col>
    </el-row>
  </section>
</template>
<script>
export default {
  name: "StoreOpened",
  data() {
    return {
      storeStatus: 2
    };
  },
  mounted() {
    // let params = {
    //   userId: "569247853338"
    // };
    // this.$api.api
    //   .queryReviewDetailByUserId(params)
    //   .then(result => {
    //     if (result.data.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
    //       this.storeStatus = result.data.data.reviewState;
    //     } else {
    //       this.$message.error(result.data.retmsg);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  },
  methods: {
    // 继续申请
    continueApply() {
      this.$emit("nextEmit", 2, false);
    },
    // 退出
    exitApply() {
      this.$router.push("/northwest/NorthwestIndex");
    }
  }
};
</script>
<style lang="less" scoped>
</style>