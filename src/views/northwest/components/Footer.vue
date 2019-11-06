<template>
  <footer class="footer">
      <div class="pull_t">
        <div class="layout">
          <p class="contact-us">对我们有任何疑问，请联系我们<span>（工作时间周一至周五8:30../../../../17:30）</span></p>
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
              <img src="../../../../src/assets/images/home/qrcode.png" />
              <p>扫码关注</p>
            </div>
            <img class="filing-pic" src="../../../../src/assets/images/home/footPic.png" />
          </div>
        </div>
      </div>
      <div class="pull_b">
        <div class="layout">
          技术支持：广东跑合中药材电子商务有限公司
        </div>
      </div>
    </footer>
</template>

<script>
export default {
  name: "CommonFooter"
}
</script>

<style lang="less" scoped>
.footer {
  .pull_t {
    background: #3B4655;
    color: #748090;
    font-size: 12px;
    .layout {
      text-align: center;
      .contact-us {
        padding: 20px 0 10px 0;
        color: #fff;
        span {
          color: #748090;
        }
      }
      .contact-row {
        p {
          padding: 16px 65px;
          font-size: 20px;
          display: inline-block;
          color: #fff;
          &:first-child {
            background: url(../../../../src/assets/images/home/icon_tel.jpg) left center no-repeat;
          }
          &:last-child {
            background: url(../../../../src/assets/images/home/icon_email.jpg) left center no-repeat;
          }
        }
      }
      ul {
        padding: 10px 0;
        li {
          display: inline-block;
          color: #fff;
          span {
            color: #748090;
            padding: 0 5px;
          }
        }
      }
      .filing-info {
        .p-text {
          display: inline-block;
          margin-right: 10px;
          p {
            line-height: 25px;
            &:nth-of-type(3) {
              background: url(../../../../src/assets/images/home/icon_police.png) 240px center no-repeat;
            }
          }
          img {
            margin-bottom: 20px;
          }
        }
        .qCorde {
          display: inline-block;
          img {
            width: 96px;
            height: 96px;
          }
          p {
            color: #fff;
          }
        }
        .filing-pic {
          margin: 10px 0 20px 0;
        }
      }
    }
  }
  .pull_b {
    background: #485463;
    color: #A2AAB4;
    text-align: center;
    padding: 8px 0;
  }
}
</style>
