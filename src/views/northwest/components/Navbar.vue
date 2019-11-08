<template>
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
</template>

<script>
export default {
  name: "CommonNavbar"
}
</script>

<style lang="less" scoped>
@import "../../../../src/assets/less/common.less";
.navbar {
  width: 100%;
  height: 64px;
  background: #3A65C6;
  .layout {
    ul {
      li {
        float: left;
        padding: 22px 24px;
        a {
          color: #fff;
        }
        &.active{
          background: #193C8A;
        }
      }
    }
    .my_accont {
      width: 122px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      border: 1px solid #fff;
      color: #fff;
      margin: 14px 0;
      background: url(../../../../src/assets/images/home/icon_person.png) 15px center no-repeat;
      padding-left: 28px;
    }
  }
}
</style>
