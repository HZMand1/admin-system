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
          <img class="adv_img" src="../../../src/assets/images/home/home_adv4.jpg" />
        </section>
        <section class="sc05 zyzx">
          <div class="c_title blue_bg clearfloat">
            <div class="pull_l">中药资讯</div>
            <div class="pull_r">更多></div>
          </div>
          <div class="info_group clearfloat">
            <ul class="fl">
              <li class="active">今日资讯</li>
              <li>市场动态</li>
              <li>中药前沿</li>
            </ul>
            <div class="fl">
              <div class="fl">
                <img src="../../../src/assets/images/home/photo.png" />
              </div>
              <div class="fr">
                <div>中国汉广中药材集团领导一行到访跑合网</div>
                <span>2019-06-05</span>
                <p>2019年6月5日，中国汉广中药材集团执行董事长刘守杰、副总经理黄维等领导一行到访跑合网，中国汉广中药材集团成立于2011年，旗下拥有38家产地初加工子公司，致力于在中药材行业领域打造全产业链运营模式和业务体系。跑合网总经理武文韬对汉广集团刘董事长一行的来访表示热烈的欢迎，并介绍了跑合网成立两年多所取得的一些成果，详细介绍了平台所提供上一个台阶了和你...</p>
              </div>
            </div>
            <div class="fl">
              <div class="fl"><img src="../../../src/assets/images/home/photo.png" /></div>
              <div class="fl">不甘心！日本拿着中国的药材...</div>
              <div class="fl">2019-10-31</div>
            </div>
          </div>
        </section>
      </div>
    </section>
    <footer class="footer">
      <div class="pull_t">
        <div class="layout">
          <p>对我们有任何疑问，请联系我们<span>（工作时间周一至周五8:30~17:30）</span></p>
          <div class="clearfloat">
            <div class="fl">010-88462303</div>
            <div class="fl">fadf232@suyuan.com</div>
          </div>
          <ul>
            <li>关于我们</li>
            <li>免责声明</li>
            <li>隐私条款</li>
            <li>用户协议</li>
            <li>知识产权</li>
          </ul>
          <p>互联网药品信息服务资格证： (粤)-经营性-2017-0043 | 信息系统安全等级保护备案证明： 4401181334900001 | B2B-A证软件评估报告</p>
          <p>增值电信业务经营许可证： 粤B2-20170438 | 食品经营许可证：JY14401030195308| 拍卖经营批准证书：4407001100002019</p>
          <p>粤公网安备 44010302000320号</p>
          <p>地址：广东省广州市荔湾区东沙大道16号 粤ICP备17022914号</p>
          <p>Copyright©2008-2018 中药材供应平台</p>
          <img src="../../../src/assets/images/home/footPic.png" />
        </div>
      </div>
      <div class="pull_b">
        <div class="layout">
          技术支持：广东跑合中药材电子商务有限公司
        </div>
      </div>
      
    </footer>
  </div>
</template>

<script>
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
      // tableData: [{
      //   date: "2016-05-02",
      //   name: "王小虎",
      //   address: "上海市普陀区金沙江路 1518 弄"
      // }, {
      //   date: "2016-05-04",
      //   name: "王小虎",
      //   address: "上海市普陀区金沙江路 1517 弄"
      // }, {
      //   date: "2016-05-01",
      //   name: "王小虎",
      //   address: "上海市普陀区金沙江路 1519 弄"
      // }, {
      //   date: "2016-05-03",
      //   name: "王小虎",
      //   address: "上海市普陀区金沙江路 1516 弄"
      // }]
      tableData: Array(8).fill(item)
    }
  },
  components: {
    
  },
  mounted () {

  },
  methods: {
  }
}
</script>
<style scoped lang="less">
  // @import "~src/assets/less/northWestIndex.less";
  @import "../../../src/assets/less/northWestIndex.less";
</style>
