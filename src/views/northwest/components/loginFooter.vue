<template>
  <section class="login-footer">
    <div class="footer">
      <p>Copyight@ 2012-2020 广东跑合中药材电子商务有限公司 All Rights Reserved</p>
    </div>
  </section>
</template>
<script>
export default {
  name: "loginFooter",
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.login-footer {
  width: 100%;
  background-color: white;
  min-width: 1200px;
  .footer {
    width: 1200px;
    height: 123px;
    margin: 0 auto;
    p {
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(27, 27, 27, 1);
      text-align: center;
      line-height: 123px;
    }
  }
}
</style>