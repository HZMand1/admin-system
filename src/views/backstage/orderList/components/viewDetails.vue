<template>
  <section class="view-details">
    <el-form ref="form" :model="form" label-width="100px" class="pad-t-20 pad-r-20">
      <el-row class="view-details-h">
        <el-row class="code pad-l-20">
          <el-col :span="6">
            订单号: {{form.code}}
          </el-col>
          <el-col :span="7">
            下单时间: {{form.orderDate | dateFormat}}
          </el-col>
          <el-col :span="4" :offset="7">
            <el-button class="color-9C1A1C" type="text" v-if="form.detail.state!==0&&form.detail.state!==-1" @click="viewFiles">查看附件</el-button>
            <el-button class="color-9C1A1C" type="text" v-if="form.detail.state!==0" @click="viewContract">查看合同</el-button>
            <el-button class="color-9C1A1C" type="text" @click="viewVoucher" v-if="form.detail.payLog">查看凭证</el-button>
          </el-col>
        </el-row>
        <el-row class="shop pad-l-20">
          <el-col :span="6">
            品种: {{form.detail.goodsName}}
          </el-col>
          <el-col :span="6">
            规格: {{form.detail.spec}}
          </el-col>
          <el-col :span="6">
            购买量: {{form.detail.quan}}{{form.detail.goodsCode}}
          </el-col>
          <el-col :span="6">
            单价: {{form.detail.pirce/100}}{{form.detail.goodsCode}}
          </el-col>
        </el-row>
      </el-row>
      <el-row class="view-details-l mar-t-20" v-if="form.detail.state===3||form.detail.state===4||form.detail.state===5">
        <el-row class="t pad-l-20">
          <el-col>
            物流信息
          </el-col>
        </el-row>
        <el-row class="c">
          <el-col class="l" :span="9">
            <el-col :span="10">
              <div class="imgs">
                <img :src="detailImgs[0]" alt="">
              </div>
            </el-col>
            <el-col :span="14" class="text">
              <el-col>送货方式: {{loginsForm.logisCmpName}}</el-col>
              <el-col>承运人: {{loginsForm.logisCmpName}}</el-col>
              <el-col>货运单号: {{loginsForm.logisCode}}</el-col>
              <el-col v-if="form.detail.state===3">货运状态: <span class="color-9C1A1C">已出库</span></el-col>
              <el-col v-if="form.detail.state===4">货运状态: <span class="color-9C1A1C">已签收</span></el-col>
              <el-col v-if="form.detail.state===5">货运状态: <span class="color-9C1A1C">已评价</span></el-col>
            </el-col>
          </el-col>
          <el-col :span="14" class="pad-t-10 r">
            <el-timeline>
              <el-timeline-item v-for="(item,index) in timelineList" :icon="item.icon" :type="item.type" :size="item.size" :key="index" :timestamp="item.ftime" placement="top">
                <el-card>
                  <p>{{item.context}}</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </el-col>
        </el-row>
      </el-row>
    </el-form>
    <el-row class="pad-t-20">
      <el-button @click="goBack" class="fr mar-r-20">返回</el-button>
      <el-button type="primary" class="fr mar-r-20" v-if="form.detail.state===3">确认收货</el-button>
    </el-row>
    <contract-dialog :Visible="Visible" :contractNo="contractNo" :payLog="payLog" :type="showType" @cancelEmit="cancelEmit"></contract-dialog>
  </section>
</template>
<script>
import ContractDialog from "./contractDialog";
import Storage from "../../../../assets/utils/Storage.js";
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
      detailImgs: [],
      timelineList: [],
      loginsForm: {},
      userInfo: {}
    };
  },
  mounted() {
    const { id } = this.$route.query;
    this.userInfo = Storage.localGet("userInfo");
    this.findSeedPackage({ orderDetailId: id });
    this.$api.api
      .findOrderByDetailId({ id: id })
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
    // 查询物流
    findSeedPackage(params) {
      this.$api.api
        .findSeedPackage(params)
        .then(result => {
          if (result.data.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
            if (!result.data.data.logisCode) {
              this.list = [
                {
                  ftime: "",
                  context: "暂无物流信息！！"
                }
              ];
            } else {
              let par = {
                logisCmp: result.data.data.logisCmp,
                logisCode: result.data.data.logisCode
              };
              this.loginsForm = result.data.data;
              // let par = {
              //   logisCmp: "zhongtong",
              //   logisCode: "75309338501952"
              // };
              this.findLogisticsInfo(par);
            }
          } else {
            // this.$message.error(result.data.retmsg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    findLogisticsInfo(params) {
      this.$api.api
        .findLogisticsInfo(params)
        .then(result => {
          if (result.data.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
            result.data.data.map((item, i) => {
              if (i === 0 || result.data.data.length - 1 === i) {
                this.timelineList.push({
                  ...item,
                  type: "danger",
                  size: "large",
                  icon: "el-icon-location-information"
                });
              } else {
                this.timelineList.push({
                  ...item,
                  type: "",
                  icon: "el-icon-arrow-up"
                });
              }
            });
          } else {
            this.timelineList = [
              {
                ftime: "",
                context: "暂无物流信息！！"
              }
            ];
            // this.$message.error(result.data.retmsg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查看附件
    viewFiles() {
      this.Visible = true;
      this.contractNo = this.form.detail.contractNo;
      this.showType = 1;
    },
    // 查看合同
    viewContract() {
      this.Visible = true;
      this.contractNo = this.form.detail.contractNo;
      this.showType = 3;
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
.view-details {
  .fr {
    float: right;
  }
  .color-9C1A1C {
    color: #9c1a1c;
  }
  .view-details-h {
    .color-9C1A1C {
      color: #9c1a1c;
    }
    height: 144px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(234, 234, 234, 1);
    font-size: 18px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    .code {
      height: 54px;
      line-height: 54px;
      background: rgba(246, 246, 246, 1);
      button {
        font-size: 16px;
        font-weight: 400;
      }
    }
    .shop {
      line-height: 88px;
    }
  }
  .view-details-l {
    height: 341px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(234, 234, 234, 1);
    .t {
      height: 54px;
      background: rgba(246, 246, 246, 1);
      font-size: 18px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 54px;
    }
    .c {
      height: 273px;
      padding: 6px 0;
      .l {
        padding: 74px 0 80px 23px;
        border-right: 2px solid #eaeaea;
        .imgs {
          width: 120px;
          height: 120px;
          img {
            width: 120px;
            height: 120px;
            object-fit: cover;
          }
        }
        .text {
          font-size: 14px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 30px;
        }
      }
      .r {
        height: 273px;
        overflow: auto;
      }
    }
  }
}
</style>