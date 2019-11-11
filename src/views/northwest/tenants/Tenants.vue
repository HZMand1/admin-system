<template>
  <!-- 商家入驻申请 -->
  <section class="tenants">
    <headers></headers>
    <navbars></navbars>
    <banners></banners>
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
          <account-reg @nextEmit="nextEmit" ref="AccountReg"></account-reg>
        </el-col>
        <el-col v-show="active===2">
          <aptitude-reg @nextEmit="nextEmit" :userId="userId"></aptitude-reg>
        </el-col>
        <el-col v-show="active===3">
          <store-opened @nextEmit="nextEmit"></store-opened>
        </el-col>
      </el-row>
    </main>
    <footers></footers>
  </section>
</template>
<script>
import "../../../assets/less/northwest/tenants/tenants.less";
import Headers from "../components/Header";
import Footers from "../components/Footer";
import Navbars from "../components/Navbar";
import Banners from "../components/Banner";
import AccountReg from "./components/AccountReg";
import AptitudeReg from "./components/AptitudeReg";
import StoreOpened from "./components/StoreOpened";
export default {
  name: "Tsenants",
  components: {
    AccountReg,
    AptitudeReg,
    StoreOpened,
    Headers,
    Footers,
    Navbars,
    Banners
  },
  data() {
    return {
      active: 1,
      userId: ""
    };
  },
  methods: {
    nextEmit(n) {
      this.userId = this.$refs.AccountReg.userId;
      this.active = n;
    }
  }
};
</script>
<style lang="less" scoped>
</style>