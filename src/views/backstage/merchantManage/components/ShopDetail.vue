<template>
  <div id="shopDetail">
    <el-button @click="back">返回</el-button>
  </div>
</template>
<script>
export default {
  data () { },
  methods: {
    back () {
      this.$fun.goBack();
    },
  }
}
</script>