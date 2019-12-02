<template>
  <section>
    <el-form ref="form" :model="form" label-width="100px" class="pad-t-20 pad-r-20">
      <el-row>
        <el-col>
          <el-form-item label="订单编号 : ">
            {{form.code}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="商品图片 : ">
            <!-- <img :src="form.detail.detailImgs" alt="加载失败"> -->
            <el-image class="mar-t-15" v-viewer style="width: 200px; height:200px;cursor: pointer;" :src="detailImgs[0]" fit="cover"></el-image>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="品种 : ">
            {{form.detail.goodsName}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="规格 : ">
            {{form.detail.spec}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="购买量 : ">
            {{form.detail.quan}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单价 : ">
            {{form.detail.pirce/100}}元
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="收货地址 : ">
            {{form.address}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="收货人 : ">
            {{form.buyerName}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-col :span="8" :offset="2">
            <el-button type="primary" @click="viewContract">查看合同</el-button>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="viewVoucher" v-if="form.detail.payLog">查看凭证</el-button>
          </el-col>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="pad-t-30 mar-t-30">
      <el-col :span="3" :offset="11">
        <el-button @click="goBack">返回</el-button>
      </el-col>
    </el-row>
    <contract-dialog :Visible="Visible" :contractNo="contractNo" :payLog="payLog" :type="showType" @cancelEmit="cancelEmit"></contract-dialog>
  </section>
</template>
<script>
import ContractDialog from "./contractDialog.vue";
export default {
  name: "viewDetails",
  components: {
    ContractDialog
  },
  data() {
    return {
      Visible: false,
      // 合同号
      contractNo: "",
      // 支付凭证
      payLog: "",
      // 弹框显示类型 合同or凭证
      showType: 1,
      form: {
        detail: {}
      },
      detailImgs: []
    };
  },
  mounted() {
    const { id } = this.$route.query;
    let params = {
      id: id
    };
    this.$api.api
      .findOrderByDetailId(params)
      .then(result => {
        if (result.data.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
          this.form = result.data.data;
          this.detailImgs = JSON.parse(result.data.data.detail.detailImgs);
        } else {
          this.$message.error(result.data.retmsg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    goBack() {
      this.$fun.goBack();
    },
    cancelEmit(b) {
      this.Visible = b;
    },
    // 查看合同
    viewContract() {
      this.Visible = true;
      this.contractNo = this.form.detail.contractNo;
      this.showType = 1;
    },
    // 查看凭证
    viewVoucher() {
      this.Visible = true;
      this.showType = 2;
      this.payLog = this.form.detail.payLog;
    }
  }
};
</script>
<style lang="less" scoped>
</style>