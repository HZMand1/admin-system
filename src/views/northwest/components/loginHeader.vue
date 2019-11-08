<template>
  <section class="login-header">
    <div class="header">
      <div class="l fr">
        <i class="logo fl"><img src="../../../assets/images/northwest/logo.png" alt=""></i>
        <div class="fl">
          <p class="title">西北地区中药材供应保障服务平台</p>
          <p class="en">Service platform for supply and guarantee of traditional Chinese medicine in Northwest China</p>
        </div>
      </div>
      <div class="r">
        <span class="tel">服务热线：020-3434343</span>
        <span class="info"><a href="/">关于我们</a></span>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "loginHeader",
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.login-header {
  width: 100%;
  background-color: white;
  min-width: 1200px;
  .header {
    width: 1200px;
    height: 90px;
    overflow: hidden;
    margin: 0 auto;
    .l {
      .logo {
        width: 49px;
        height: 69px;
        margin-right: 5px;
      }
      .title {
        font-size: 28px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(34, 34, 34, 1);
        padding-top: 17px;
        letter-spacing: 9px;
      }
      .en {
        font-size: 12px;
        font-family: Microsoft YaHei;
        color: rgba(179, 179, 179, 1);
      }
    }
    .r {
      float: right;
      span {
        display: inline-block;
        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(40, 40, 40, 1);
      }
      .tel {
        padding-top: 40px;
      }
      .info {
        padding-left: 50px;
      }
    }
  }
}
</style>