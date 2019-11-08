<template>
  <!-- 商家入驻申请 -->
  <section class="tenants">
    <main>
      <el-row>
        <el-col :span="24">
          <el-steps :active="active" align-center>
            <el-step title="商家账号申请"></el-step>
            <el-step title="资质申请"></el-step>
            <el-step title="店铺开通"></el-step>
          </el-steps>
        </el-col>
      </el-row>
      <el-row class="pad-t-80">
        <el-col v-show="active===1">
          <account-reg @nextEmit="nextEmit"></account-reg>
        </el-col>
        <el-col v-show="active===2">
          <aptitude-reg></aptitude-reg>
        </el-col>
      </el-row>
    </main>
  </section>
</template>
<script>
import "../../../assets/less/northwest/tenants/tenants.less";
import AccountReg from "./components/AccountReg";
import AptitudeReg from "./components/AptitudeReg";
export default {
  name: "Tsenants",
  components: { AccountReg, AptitudeReg },
  data() {
    return {
      active: 2
    };
  },
  methods: {
    nextEmit(n) {
      this.active = n;
    }
  }
};
</script>
<style lang="less" scoped>
</style>