<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
// import HelloWorld from './views/Test.vue'

export default {
  name: "app",
  components: {
    // HelloWorld
  },
  data() {
    return {
      isRouterAlive: true
    };
  }
};
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
