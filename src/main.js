import Vue from "vue"
import App from "./App.vue"
import ElementUI from "element-ui"
// import VueRouter from 'vue-router'
import router from "./router"
import Axios from "./assets/request/http";
import Api from "./assets/api/api";
Vue.config.productionTip = false
import "element-ui/lib/theme-chalk/index.css";
Vue.prototype.$axios = Axios;
Vue.prototype.$api = Api;
Vue.use(ElementUI)
// Vue.use(VueRouter)

new Vue({
	router,
	render: h => h(App),
}).$mount("#app")