import Vue from "vue"
import App from "./App.vue"
import ElementUI from "element-ui"
import router from "./router"
import Axios from "./assets/request/http";
import Api from "./assets/api/api";
Vue.config.productionTip = false
import "element-ui/lib/theme-chalk/index.css";
import "./assets/less/base.less";
Vue.prototype.$axios = Axios;
Vue.prototype.$api = Api;
Vue.use(ElementUI)
router.beforeEach((to, from, next) => {
	// 路由发生变化修改页面title
	if (to.meta.title) {
		document.title = to.meta.title;
	}
	next();
});
new Vue({
	router,
	render: h => h(App),
}).$mount("#app")