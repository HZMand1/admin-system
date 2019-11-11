<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: "CommonBanner"
};
</script>

<style lang="less" scoped>
@import "../../../../src/assets/less/common.less";
.banner {
  width: 100%;
  height: 410px;
  background: url(../../../../src/assets/images/home/home_banner1.jpg) no-repeat
    center center;
  background-size: 100% 100%;
}
.icon_group {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 9px 0px rgba(0, 0, 0, 0.12);
  ul {
    li {
      display: inline-block;
      text-align: center;
      width: 8%;
      margin: 4% 6%;
      .circleIcon {
        width: 94px;
        height: 94px;
        margin-bottom: 8px;
      }
      p {
        color: #666;
        font-weight: bold;
      }
      &:nth-of-type(1) {
        .circleIcon {
          background: url(../../../../src/assets/images/home/home_icon1.png)
            no-repeat;
        }
      }
      &:nth-of-type(2) {
        .circleIcon {
          background: url(../../../../src/assets/images/home/home_icon2.png)
            no-repeat;
        }
      }
      &:nth-of-type(3) {
        .circleIcon {
          background: url(../../../../src/assets/images/home/home_icon3.png)
            no-repeat;
        }
      }
      &:nth-of-type(4),
      &:nth-of-type(5) {
        .circleIcon {
          background: url(../../../../src/assets/images/home/home_icon4.png)
            no-repeat;
        }
      }
    }
  }
}
</style>
