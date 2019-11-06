<template>
  <div class="northWestIndex">
    <header class="header">
      <div class="pull_t">
        <div class="layout">
          <div class="h_wellcome fl">欢迎来到西北地区中药材保障公共平台</div>
          <div class="h_login fr">
            <a class="register" href="javascript:;">注册</a>
            <span>|</span>
            <a class="loginIn" href="javascript:;">登录</a>
          </div>
        </div>
      </div>
      <div class="pull_b">
        <div class="layout clearfloat">
          <div class="fl">
            <div class="h_logo fl">
              <img src="../../../src/assets/images/home/home_logo.png" />
            </div>
            <div class="h_name fl">
              <h3>中药材供应平台</h3>
              <span>Platform for the Supply of Chinese Medicinal Materials</span>
            </div>
          </div>
          <div class="h_phone fr">
            <h3>010-88462302</h3>
            <span>客服热线（服务时间：8:30~15:30）</span>
          </div>
        </div>
      </div>
    </header>
    <nav class="navbar">
      <div class="layout clearfloat">
        <ul class="fl">
          <li class="active"><a>首页</a></li>
          <li><a>种子种苗</a></li>
          <li><a>初加工</a></li>
          <li><a>交易服务</a></li>
          <li><a>质检服务</a></li>
        </ul>
        <div class="fr my_accont">我的账户</div>
      </div>
    </nav>
    <section class="banner"></section>
    <section class="icon_group">
      <ul class="layout">
        <li>
          <div class="circleIcon"></div>
          <p>物流服务</p>
        </li>
        <li>
          <div class="circleIcon"></div>
          <p>仓储服务</p>
        </li>
        <li>
          <div class="circleIcon"></div>
          <p>供求信息</p>
        </li>
        <li>
          <div class="circleIcon"></div>
          <p>新闻资讯</p>
        </li>
        <li>
          <div class="circleIcon"></div>
          <p>跑合商城</p>
        </li>
      </ul>
    </section>
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
    <!-- <footer class="footer">
      <div class="pull_t">
        <div class="layout">
          <p class="contact-us">对我们有任何疑问，请联系我们<span>（工作时间周一至周五8:30~17:30）</span></p>
          <div class="contact-row">
            <p>010-88462303</p>
            <p>fadf232@suyuan.com</p>
          </div>
          <ul>
            <li>关于我们<span>|</span></li>
            <li>免责声明<span>|</span></li>
            <li>隐私条款<span>|</span></li>
            <li>用户协议<span>|</span></li>
            <li>知识产权</li>
          </ul>
          <div class="filing-info">
            <div class="p-text">
              <p>互联网药品信息服务资格证： (粤)-经营性-2017-0043 | 信息系统安全等级保护备案证明： 4401181334900001 | B2B-A证软件评估报告</p>
              <p>增值电信业务经营许可证： 粤B2-20170438 | 食品经营许可证：JY14401030195308| 拍卖经营批准证书：4407001100002019</p>
              <p>粤公网安备 44010302000320号</p>
              <p>地址：广东省广州市荔湾区东沙大道16号 粤ICP备17022914号</p>
              <p>Copyright©2008-2018 中药材供应平台</p>
            </div>
            <div class="qCorde">
              <img src="../../../src/assets/images/home/qrcode.png" />
              <p>扫码关注</p>
            </div>
            <img class="filing-pic" src="../../../src/assets/images/home/footPic.png" />
          </div>
        </div>
      </div>
      <div class="pull_b">
        <div class="layout">
          技术支持：广东跑合中药材电子商务有限公司
        </div>
      </div>
    </footer> -->
  </div>
</template>

<script>
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
            // this.firstNews = res.data.data[0]
            console.log(this.firstNews)
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
  // @import "~src/assets/less/northWestIndex.less";
  @import "../../../src/assets/less/northWestIndex.less";
</style>
