/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from "axios";
import router from "../../router";
//判断是电脑还是手机
function isPc() {
	let userAgentInfo = navigator.userAgent;
	let Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
	let flag = "pc";
	for (let v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = "mobile";
			break;
		}
	}
	return "pc";
}
let sysType = isPc();
// 创建axios实例
let instance = axios.create({
	timeout: 1000 * 6 // 超时
});
// 设置post请求头
instance.defaults.headers.post["Content-Type"] =
	"application/x-www-form-urlencoded";

// 设置get请求头
instance.defaults.headers.get["Content-Type"] = "application/json";
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
	config => {
		//用户信息
		let userInfo = "";
		if (localStorage.getItem("userInfo")) {
			userInfo = localStorage.userInfo
		} else {
			userInfo = "";
		}
		//token
		let phSessionToken = "";
		if (localStorage.getItem("token")) {
			phSessionToken = localStorage.token
		} else {
			phSessionToken = "";
		}
		config.headers = {
			"sys-type": sysType, //访问来源
			"phSessionToken": phSessionToken
		}
		return config;

	},
	error => Promise.error(error)
);

// 响应拦截器
instance.interceptors.response.use(
	// 请求成功
	//res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
	res => {
		if (res.status === 200) {
			return Promise.resolve(res);
		} else {
			return Promise.reject(res);
		}
	},
	// 请求失败
	error => {
		const {
			response
		} = error;
		if (response) {
			// token过期 || 没有token || 服务端错误
			if (response.data.errorcode === "500" || response.data.errorcode === "401") {
				localStorage.removeItem("token");
				Message({
					message: "登录过期，即将前往登录页",
					type: "error"
				})
				router.push({
					path: "/login"
				})

			}

			return Promise.reject(response);
		} else {
			// 处理断网的情况
			// eg:请求超时或断网时，更新state的network状态
			// network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
			// 关于断网组件中的刷新重新获取数据，会在断网组件中说明
		}
	}
);

export default instance;