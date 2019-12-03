<template>
  <section class="order" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <header>
      <el-row>
        <el-col :span="4">
          <el-input placeholder="请输入订单编号" clearable @clear="clearSearch" v-model="searchCode">
            <el-button slot="append" icon="el-icon-search" @click="searchCodeClick"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-input placeholder="请输入买家名称" clearable @clear="clearSearch" v-model="searchOutletName">
            <el-button slot="append" icon="el-icon-search" @click="searchOutletNameClick"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-input placeholder="请输入卖家名称" clearable @clear="clearSearch" v-model="searchSupperName">
            <el-button slot="append" icon="el-icon-search" @click="searchSupperNameClick"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-row class="pad-t-30">
        <el-col :span="4">
          <el-select style="width: 100%;" v-model="orderState" clearable @clear="clearSearch" placeholder="请选择订单状态" @change="orderChange">
            <el-option v-for="item in orderStateList" :key="item.state" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-date-picker v-model="startDate" @change="ChangeDate" value-format="yyyy-MM-dd" type="date" placeholder="起始日期" style="width:100%">
          </el-date-picker>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-date-picker v-model="endDate" @change="ChangeDate" value-format="yyyy-MM-dd" type="date" placeholder="结束日期" style="width:100%">
          </el-date-picker>
        </el-col>
      </el-row>
    </header>
    <main>
      <div class="list">
        <ul>
          <li v-for="(item,index) in orderList" :key="index">
            <el-row class="data" v-for="child in item.detailList" :key="child.id">
              <el-row class="list-header">
                <el-col :span="5">下单时间: {{item.orderDate | dateFormat}}</el-col>
                <el-col :span="19">订单编号: {{child.orderId}}</el-col>
              </el-row>
              <el-row>
                <el-col class="left" :span="4">
                  <!-- 商品图片是数组时做处理 -->
                  <img :src="JSON.parse(child.detailImgs)[0]" alt="">
                  <!-- 商品图片是字符串时做处理 -->
                  <!-- <img :src="child.detailImgs" alt=""> -->
                </el-col>
                <el-col class="center" :span="12">
                  <el-row class="pad-t-25">
                    <!-- 商品名称 -->
                    <el-col :span="6">名称: {{child.goodsName}}</el-col>
                    <!-- 规格 -->
                    <el-col :span="6">规格: {{child.spec}}</el-col>
                    <!-- 数量 -->
                    <el-col :span="5">数量: {{child.quan}}{{child.goodsCode}}</el-col>
                    <!-- 价格 -->
                    <el-col :span="7">价格: {{child.pirce/100}}{{child.goodsCode}}/元</el-col>
                  </el-row>
                  <el-row class="pad-t-20 text-justify title">
                    {{item.detailList[0].goodTitle}}
                  </el-row>
                  <el-row class="tip pad-b-25">
                    <el-col :span="10">买家名称: {{child.outletName}}</el-col>
                    <el-col :span="13" :offset="1">卖家名称: {{child.supperName}}</el-col>
                  </el-row>
                </el-col>
                <el-col class="price" :span="5">
                  <p class="price-a">￥{{returnFloat(child.quan*child.pirce)}}</p>
                  <p class="price-tip">(含运费: ￥0.00元)</p>
                  <el-col class="pad-t-10" style="color: #c33838;" v-if="child.state===-1">已取消</el-col>
                  <el-col class="pad-t-10" style="color: #c33838;" v-if="child.state===0">待签订</el-col>
                  <el-col class="pad-t-10" style="color: #c33838;" v-if="child.state===1">有单支付</el-col>
                  <el-col class="pad-t-10" style="color: #c33838;" v-if="child.state===2">支付成功</el-col>
                  <el-col class="pad-t-10" style="color: #c33838;" v-if="child.state===3">已出库</el-col>
                  <el-col class="pad-t-10" style="color: #c33838;" v-if="child.state===4">已签收</el-col>
                  <el-col class="pad-t-10" style="color: #c33838;" v-if="child.state===5">已评价</el-col>
                  <el-col class="pad-t-10" style="color: #c33838;" v-if="child.state===6">已退款</el-col>
                  <el-col class="pad-t-10" style="color: #c33838;" v-if="child.state===7">退款中</el-col>
                  <el-col class="pad-t-10" style="color: #c33838;" v-if="child.state===8">退款审核不通过</el-col>
                  <el-col class="pad-t-10" style="color: #c33838;" v-if="child.state===9">有方签署</el-col>
                  <el-col class="pad-t-10" style="color: #c33838;" v-if="child.state===10">全部签署</el-col>
                  <el-col class="pad-t-10" style="color: #c33838;" v-if="child.state===11">支付中</el-col>
                </el-col>
                <el-col class="right" :span="3">
                  <div>
                    <el-button class="color-777" type="text" @click="$router.push({path:'/orderList/viewDetails',query:{id:child.id}})">查看详情</el-button>
                  </div>
                </el-col>
              </el-row>
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
      detailList: [],
      // 订单编号
      searchCode: "",
      // 买家名称
      searchOutletName: "",
      // 卖家名称
      searchSupperName: "",
      // 订单状态
      orderState: "",
      // 订单状态数组
      orderStateList: [
        {
          state: -1,
          value: "已取消"
        },
        {
          state: 0,
          value: "待签订"
        },
        {
          state: 1,
          value: "有单支付"
        },
        {
          state: 2,
          value: "支付成功"
        },
        {
          state: 3,
          value: "已出库"
        },
        {
          state: 4,
          value: "已签收"
        },
        {
          state: 5,
          value: "已评价"
        },
        {
          state: 6,
          value: "已退款"
        },
        {
          state: 7,
          value: "退款中"
        },
        {
          state: 8,
          value: "退款审核不通过"
        },
        {
          state: 9,
          value: "有方签署"
        },
        {
          state: 10,
          value: "全部签署"
        },
        {
          state: 11,
          value: "支付中"
        }
      ],
      // 查询订单起始日期
      startDate: null,
      // 查询订单结束日期
      endDate: null
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
    // 清空搜索结果
    clearSearch() {
      let params = {
        start: this.currentPage,
        pageSize: this.totalPage
      };
      this.getOrderData(params);
    },
    // 搜索订单编号
    searchCodeClick() {
      let params = {
        start: this.currentPage,
        pageSize: this.totalPage,
        orderId: this.searchCode
      };
      this.getOrderData(params);
    },
    // 搜索买家名称
    searchOutletNameClick() {
      let params = {
        start: this.currentPage,
        pageSize: this.totalPage,
        outletName: this.searchOutletName
      };
      this.getOrderData(params);
    },
    // 搜索卖家名称
    searchSupperNameClick() {
      let params = {
        start: this.currentPage,
        pageSize: this.totalPage,
        supperName: this.searchSupperName
      };
      this.getOrderData(params);
    },
    // 订单状态搜索
    orderChange(c) {
      if (!c) return;
      let checkOrder = this.orderStateList.filter(v => v.value === c)[0];
      let params = {
        start: this.currentPage,
        pageSize: this.totalPage,
        state: checkOrder.state
      };
      this.getOrderData(params);
    },
    // 订单日期
    ChangeDate() {
      let params = {
        start: this.currentPage,
        pageSize: this.totalPage,
        startDate: this.startDate,
        endDate: this.endDate
      };
      this.getOrderData(params);
    },
    // 数字补0
    returnFloat(value) {
      if (value === undefined || value === null) {
        value = 0;
      }
      // 传值默认是以 分 为单位所以除以10000
      value = Math.round(parseFloat(value) * 100) / 10000;

      let xsd = value.toString().split(".");

      if (xsd.length === 1) {
        value = value.toString() + ".00";
        return value;
      }
      if (xsd.length > 1) {
        if (xsd[1].length < 2) {
          value = value.toString() + "0";
        }
        return value;
      }
    },
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
          border: 2px solid #ededed;
          font-size: 18px;
          margin-bottom: 25px;
          .list-header {
            background-color: #eaeaea;
            height: 42px;
            line-height: 42px;
            padding: 0 20px;
            border-bottom: 2px solid #ededed;
            font-size: 14px;
            color: #333333;
          }
          .data {
            &:last-child {
              border-bottom: none;
            }
            .left {
              // width: 170px;
              height: 169px;
              img {
                vertical-align: middle;
                object-fit: cover;
                height: 116px;
                width: 116px;
                margin: 25px;
              }
            }
            .center {
              position: relative;
              height: 169px;
              color: #777777;
              border-right: 2px solid #ededed;
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
                width: 100%;
                color: #c33838;
                font-family: Source Han Sans CN;
                font-weight: 500;
                color: rgba(195, 56, 56, 1);
              }
            }
            .price {
              // width: 180px;
              height: 169px;
              border-right: 2px solid #ededed;
              text-align: center;
              .price-a {
                font-weight: bold;
                font-size: 20px;
                line-height: 115px;
              }
              .price-tip {
                margin-top: -40px;
                font-size: 15px;
                color: #535250;
              }
            }
            .right {
              // width: 155px;
              height: 169px;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              button {
                display: block;
                margin: 0 auto;
                padding: 0;
                width: 98px;
                height: 40px;
                text-align: center;
                line-height: 40px;
              }
              .btn {
                width: 110px;
                height: 32px;
                line-height: 32px;
                border: 0;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                font-size: 16px;
                background: rgba(168, 27, 29, 1);
              }
              .color-777 {
                color: #777777;
              }
            }
          }
        }
      }
    }
  }
}
</style>