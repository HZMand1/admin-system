<template>
  <section class="order" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <main>
      <div class="list">
        <ul>
          <li v-for="(item,index) in orderList" :key="index">
            <el-row class="data" v-for="child in item.detailList" :key="child.id">
              <div class="code">订单编号: {{child.orderId}}</div>
              <el-col class="left" :span="5">
                <!-- 商品图片是数组时做处理 -->
                <img :src="JSON.parse(child.detailImgs)[0]" alt="">
                <!-- 商品图片是字符串时做处理 -->
                <!-- <img :src="child.detailImgs" alt=""> -->
              </el-col>
              <el-col class="center pad-r-30" :span="16">
                <el-row>
                  <!-- 商品名称 -->
                  <el-col :span="6">{{child.goodsName}}</el-col>
                  <!-- 规格 -->
                  <el-col :span="6">{{child.spec}}</el-col>
                  <!-- 数量 -->
                  <el-col :span="6">{{child.quan}}</el-col>
                  <!-- 价格 -->
                  <el-col :span="6">{{child.pirce/100}}元</el-col>
                </el-row>
                <el-row class="pad-t-30 text-justify title">
                  <el-col>
                    <!-- 标题 -->
                    {{item.detailList[0].goodTitle}}
                  </el-col>
                </el-row>
                <el-row class="tip">
                  <el-col v-if="child.state===-1">已取消</el-col>
                  <el-col v-if="child.state===0">待签订</el-col>
                  <el-col v-if="child.state===1">有单支付</el-col>
                  <el-col v-if="child.state===2">支付成功</el-col>
                  <el-col v-if="child.state===3">已出库</el-col>
                  <el-col v-if="child.state===4">已签收</el-col>
                  <el-col v-if="child.state===5">已评价</el-col>
                  <el-col v-if="child.state===6">已退款</el-col>
                  <el-col v-if="child.state===7">退款中</el-col>
                  <el-col v-if="child.state===8">退款审核不通过</el-col>
                  <el-col v-if="child.state===9">有方签署</el-col>
                  <el-col v-if="child.state===10">
                    <p v-if="!userInfo.supplierId">待支付</p>
                    <p v-else>全部签署</p>
                  </el-col>
                  <el-col v-if="child.state===11">
                    <p v-if="userInfo.supplierId">待收款</p>
                    <p v-else>支付中</p>
                  </el-col>
                </el-row>
              </el-col>
              <el-col class="right" :span="2">
                <div class="pad-t-10">
                  <el-button @click="$router.push({path: '/orderList/viewDetails', query: { id: child.id } })">查看详情</el-button>
                </div>
              </el-col>
            </el-row>
          </li>
        </ul>
      </div>
      <el-row class="pad-t-20 pad-b-20">
        <div class="text-right">
          <el-pagination background @size-change="setAuctionSizeChange" @current-change="setAuctionCurrentChange" :current-page="currentPage" :total="total" :page-size="totalPage" :page-sizes="[5,10, 20, 30, 40]" layout="total,sizes,prev,pager,next,jumper"></el-pagination>
        </div>
      </el-row>
    </main>
  </section>
</template>
<script>
import Storage from "../../../assets/utils/Storage.js";
export default {
  name: "order",
  data() {
    return {
      // 卖家id
      supplierId: null,
      currentPage: 1, // 分页 当前页数
      totalPage: 5, // 分页 每页显示多少条
      total: 0, // 总条数
      taps: [],
      orderList: [],
      userInfo: {},
      loading: false,
      dialogLogistics: false,
      logisticsId: null,
      detailList: []
    };
  },
  mounted() {
    this.userInfo = Storage.localGet("userInfo");
    this.supplierId = this.userInfo.supplierId;
    let params = {
      start: this.currentPage,
      pageSize: this.totalPage
    };
    this.getOrderData(params);
  },
  methods: {
    // 设置显示每页多少条数据
    setAuctionSizeChange(currentPage) {
      this.totalPage = currentPage;
      let params = {
        start: this.currentPage,
        pageSize: this.totalPage
      };
      this.getOrderData(params);
    },
    // 设置当前页码
    setAuctionCurrentChange(val) {
      this.currentPage = val;
      let params = {
        start: this.currentPage,
        pageSize: this.totalPage
      };
      this.getOrderData(params);
    },
    // 获取订单数据
    getOrderData(params) {
      this.loading = true;
      this.$api.api
        .findOrderList(params)
        .then(result => {
          if (result.data.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
            this.total = result.data.data.total;
            this.orderList = result.data.data.list;
          } else {
            this.$message.error(result.data.retmsg);
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.order {
  header {
    .el-row {
      background-color: #ffffff;
      ul {
        overflow: hidden;
        width: 100%;
        padding: 0;
        li {
          position: relative;
          float: left;
          padding: 0 10px 10px;
          font-size: 18px;
          cursor: pointer;
        }
        .active {
          color: #3a64c6;
          &::after {
            position: absolute;
            left: 6px;
            bottom: 0;
            clear: both;
            width: 89%;
            height: 2px;
            background-color: #3a64c6;
            content: "";
          }
        }
      }
    }
  }
  main {
    .el-row {
      background-color: #ffffff;
    }
    font-size: 17px;
    .list {
      width: 100%;
      padding-top: 20px;
      ul {
        width: 100%;
        padding: 0;
        li {
          height: auto;
          padding: 10px 0;
          border-bottom: 1px solid #666;
          font-size: 18px;
          &:first-child {
            border-top: 1px solid #666;
          }
          .code {
            font-weight: 400;
            color: rgba(85, 85, 85, 1);
            padding: 6px 0;
          }
          .data {
            border-bottom: 1px dashed #cccccc;
            padding-bottom: 10px;
            &:last-child {
              border-bottom: none;
            }
            .left {
              // width: 300px;
              height: 200px;
              img {
                vertical-align: middle;
                object-fit: cover;
                height: 200px;
                width: 300px;
              }
            }
            .center {
              position: relative;
              margin-left: 40px;
              height: 200px;
              color: rgba(85, 85, 85, 1);
              .title {
                font-size: 16px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: rgba(119, 119, 119, 1);
              }
              .tip {
                position: absolute;
                left: 0;
                bottom: 0;
                color: #c33838;
                font-family: Source Han Sans CN;
                font-weight: 500;
                color: rgba(195, 56, 56, 1);
              }
            }
            .right {
              height: 200px;

              button {
                display: block;
                margin: 0 auto;
                padding: 0;
                width: 98px;
                height: 40px;
                text-align: center;
                line-height: 40px;
              }
            }
          }
        }
      }
    }
  }
}
</style>