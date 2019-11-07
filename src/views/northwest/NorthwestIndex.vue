<template>
  <div class="northWestIndex">
    <common-header></common-header>
    <common-navbar></common-navbar>
    <common-banner></common-banner>
    <section class="wrap_bg">
      <div class="layout">
        <section class="sc01 zzzm">
          <div class="c_title clearfloat">
            <div class="pull_l">种子种苗
              <span>Company Introduction</span>
            </div>
            <div class="pull_r">更多></div>
          </div>
          <div class="tableGroup clearfloat">
            <div class="h_picture fl">
              <img src="../../../src/assets/images/home/home_left_img1.jpg" />
            </div>
            <el-table :data="tableData" class="h_table fr">
              <el-table-column
                prop="date"
                label="品种"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="规格"
                width="180">
              </el-table-column>
              <el-table-column
                prop="province"
                label="价格">
              </el-table-column>
              <el-table-column
                prop="city"
                label="价格">
              </el-table-column>
              <el-table-column
                prop="address"
                label="价格">
              </el-table-column>
              <el-table-column
                prop="zip"
                label="摘要">
              </el-table-column>
            </el-table>
          </div>
          <img class="adv_img" src="../../../src/assets/images/home/home_adv1.jpg" />
        </section>
        <section class="sc02 zzzm">
          <div class="c_title clearfloat">
            <div class="pull_l">初加工
              <span>Company Introduction</span>
            </div>
            <div class="pull_r">更多></div>
          </div>
          <div class="tableGroup clearfloat">
            <div class="h_picture fl">
              <img src="../../../src/assets/images/home/home_left_img2.jpg" />
            </div>
            <el-table :data="tableData" class="h_table fr">
              <el-table-column
                prop="date"
                label="品种"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="规格"
                width="180">
              </el-table-column>
              <el-table-column
                prop="province"
                label="价格">
              </el-table-column>
              <el-table-column
                prop="city"
                label="价格">
              </el-table-column>
              <el-table-column
                prop="address"
                label="价格">
              </el-table-column>
              <el-table-column
                prop="zip"
                label="摘要">
              </el-table-column>
            </el-table>
          </div>
          <img class="adv_img" src="../../../src/assets/images/home/home_adv2.jpg" />
        </section>
        <section class="sc03 zzzm">
          <div class="c_title clearfloat">
            <div class="pull_l">现货晒场
              <span>Company Introduction</span>
            </div>
            <div class="pull_r">更多></div>
          </div>
          <div class="tableGroup clearfloat">
            <div class="h_picture fl">
              <img src="../../../src/assets/images/home/home_left_img3.jpg" />
            </div>
            <el-table :data="tableDataYard" class="h_table fr">
              <el-table-column
                prop="tradeName"
                label="品种"
                width="180">
              </el-table-column>
              <el-table-column
                prop="sourceAreaName"
                label="产地"
                width="180">
              </el-table-column>
              <el-table-column
                prop="listingNumber"
                label="挂牌量">
              </el-table-column>
              <el-table-column
                prop="listingPrice"
                label="挂牌价">
              </el-table-column>
              <el-table-column
                prop="addTime"
                label="产新日期">
              </el-table-column>
              <el-table-column
                prop="zip"
                label="操作">
              </el-table-column>
            </el-table>
          </div>
          <img class="adv_img" src="../../../src/assets/images/home/home_adv3.jpg" />
        </section>
        <section class="sc04 zzzm">
          <div class="c_title clearfloat">
            <div class="pull_l">比价采购
              <span>Company Introduction</span>
            </div>
            <div class="pull_r">更多></div>
          </div>
          <div class="tableGroup clearfloat">
            <div class="h_picture fl">
              <img src="../../../src/assets/images/home/home_left_img4.jpg" />
            </div>
            <el-table :data="tableDataPrice" class="h_table fr">
              <el-table-column
                prop="custName"
                label="企业名称">
              </el-table-column>
              <el-table-column
                prop="tradeName"
                label="品种"
                width="140">
              </el-table-column>
              <el-table-column
                prop="number"
                label="采购量">
              </el-table-column>
              <el-table-column
                prop="address"
                label="交货地"
                width="290">
              </el-table-column>
              <el-table-column
                prop="addTime"
                label="截止日期">
              </el-table-column>
              <el-table-column
                prop="zip"
                label="操作">
              </el-table-column>
            </el-table>
          </div>
          <img class="adv_img" src="../../../src/assets/images/home/home_adv4.jpg" />
        </section>
        <section class="sc05 zyzx">
          <div class="c_title blue_bg clearfloat">
            <div class="pull_l">中药资讯</div>
            <div class="pull_r">更多></div>
          </div>
          <div class="info_group clearfloat">
            <ul class="tab fl">
              <li class="active">今日资讯</li>
              <li>市场动态</li>
              <li>中药前沿</li>
            </ul>
            <div class="info_con fr">
              <div class="pull_left fl" 
                   v-for="(item, index) in firstNews" 
                   :key="index">
                <div class="fl">
                  <!-- <img :src="item.imgPath" /> -->
                  <img src="../../../src/assets/images/home/photo.png" />
                </div>
                <div class="fr">
                  <div>{{item.title}}</div>
                  <span>{{item.addTime}}</span>
                  <p>{{item.content}}</p>
                </div>
              </div>
              <div class="pull_right fr">
                <div class="news-row fl" 
                     v-for="(item, index) in newsData" 
                     :key="index">
                  <!-- <div class="pic fl"><img :src="item.imgPath" /></div> -->
                  <div class="pic fl"><img src="../../../src/assets/images/home/photo.png" /></div>
                  <div class="desc fl">{{item.subTitle}}</div>
                  <!-- <div class="timer fr">{{item.addTime}}</div> -->
                  <div class="timer fr">2019-10-31</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="sc06 yqlj">
          <div class="c_title clearfloat">
            <div class="pull_l">友情链接</div>
          </div>
          <ul class="friendLine">
            <li>
              <img src="../../../src/assets/images/home/icon_company1.png" />
            </li>
            <li>
              <img src="../../../src/assets/images/home/icon_company2.png" />
            </li>
            <li>
              <img src="../../../src/assets/images/home/icon_company3.png" />
            </li>
            <li>
              <img src="../../../src/assets/images/home/icon_company4.png" />
            </li>
            <li>
              <img src="../../../src/assets/images/home/icon_company5.png" />
            </li>
          </ul>
        </section>
      </div>
    </section>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonHeader from "./components/Header"
import CommonNavbar from "./components/Navbar"
import CommonBanner from "./components/Banner"
import CommonFooter from "./components/Footer"
export default {
  name: "NorthwestIndex",
  data () {
    const item = {
      date: "天山雪莲",
      name: "统货",
      province: 2000.00,
      city: "1000/千克",
      address: "100/千克",
      zip: "可洽谈"
    }
    return {
      tableData: Array(8).fill(item),
      tableDataPrice: [], // 比价采购
      tableDataYard: [], // 现货晒场
      newsData: [], // 新闻
      firstNews: [] // 第一条新闻
    }
  },
  components: {
    CommonHeader,
    CommonNavbar,
    CommonBanner,
    CommonFooter
  },
  mounted () {
    this.getTableList()
    this.getNewsList()
  },
  methods: {
    getTableList (params) {
      this.$api.api.findProductService(params)
        .then(res => {
          if (res.data.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
            this.tableDataPrice = res.data.data.price.slice(0, 6)
            this.tableDataYard = res.data.data.yard
          } else {
            this.$message.error(res.data.retmsg)
          }
        }).catch(() => {
          this.$message.error("请求失败！")
        })
    },
    getNewsList (params) {
      params = {
        type: 1
      }
      this.$api.api.findAdNewsAllList(params)
        .then(res => {
          if (res.data.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
            this.newsData = res.data.data
            this.firstNews = res.data.data.slice(0,1)
          } else {
            this.$message.error(res.data.retmsg)
          }
        }).catch(() => {
          this.$message.error("请求失败！")
        })
    }
  }
}
</script>
<style scoped lang="less">
  @import "../../../src/assets/less/common.less";
  @import "../../../src/assets/less/northWestIndex.less";
</style>
