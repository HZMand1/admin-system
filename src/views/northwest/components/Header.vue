<template>
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
              <img src="../../../../src/assets/images/home/home_logo.png" />
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
</template>

<script>
export default {
  name: "CommonHeader"
}
</script>

<style lang="less" scoped>
@import "../../../../src/assets/less/common.less";
.header {
  .pull_t {
    background: #F2F2F2;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #a1a1a1;
    .h_login {
      a {
        &:first-child {
          color: #ED702C;
          margin-right: 10px;
        }
        &:last-child {
          color: #a1a1a1;
          margin-left: 10px;
        }
      }
    }
  }
  .pull_b {
    height: 80px;
    .h_logo {
      padding: 17px 0;
    }
    .h_name {
      margin-left: 15px;
      padding: 19px 0;
      h3 {
        font-size: 20px;
        margin: 0;
      }
      span {
        color: #B3B3B3;
        font-size: 12px;
      }
    }
    .h_phone {
      padding: 20px 0;
      h3 {
        margin: 0;
        font-size: 20px;
      }
      span {
        color: #6E7F9C;
        font-size: 12px;
      }
    }
  }
}
</style>
