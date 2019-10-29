<!-- 本页为 tab 标签 -->
<template>
  <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="handleClickTab($event)">
    <el-tab-pane :key="item.name" v-for="item in editableTabs" :label="item.name" :name="item.name"></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "navMain",
  data() {
    return {
      editableTabsValue: "index",
      editableTabs: [],
      tabIndex: 1,
      openedTab: []
    };
  },
  created() {
    // 刷新页面时（F11)
    // 因为 <router-view> 的 < keep-alive>，会保留刷新时所在的 router
    // 但是 tab 标签页因为刷新而被重构了，tab 没有了
    // 因此需要将 router 回到 index
    // this.$router.push("/backstage/home");
  },
  computed: {
    getOpenedTab() {
      return this.$store.state.openedTab;
    },
    changeTab() {
      return this.$store.state.activeTab;
    }
  },
  watch: {
    getOpenedTab(val) {
      if (val.length > this.openedTab.length) {
        // 添加了新的 tab 页
        // 导致 $store.state 中的 openedTab 长度
        // 大于
        // 标签页中的 openedTab 长度
        // 因此需要新增标签页
        let newTab = val[val.length - 1]; // 新增的肯定在数组最后一个
        ++this.tabIndex;
        this.editableTabs.push({
          path: newTab.path,
          name: newTab.name
        });
        this.editableTabsValue = newTab.name;
        this.openedTab.push(newTab);
      }
    },
    changeTab(val) {
      // 监听 activetab 以实现点击左侧栏时激活已存在的标签
      if (val !== this.editableTabsValue) {
        this.editableTabsValue = val;
      }
    }
  },
  methods: {
    handleClickTab(route) {
      let path = this.editableTabs.filter(v => v.name === route.name)[0].path;
      this.$store.commit("changeTab", route);
      this.$router.push(path);
    },
    removeTab(targetName) {
      // 首页不允许被关闭（为了防止 el-tabs 栏中一个 tab 都没有）
      // if (targetName === 'index') {
      //   return false
      // }
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      console.log(targetName);
      // this.$store.commit("deductTab", targetName);
      // let deductIndex = this.openedTab.indexOf(targetName);
      // this.openedTab.splice(deductIndex, 1);
      // this.$router.push(activeName);
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      // if (this.openedTab.length === 0) {
      //   this.$store.commit("addTab", "index");
      //   // this.$router.push("index");
      // }
    }
  }
};
</script>

<style lang="less" scoped>
</style>