import axios from "../../assets/request/http"; // 导入http中创建的axios实例

// axios.defaults.baseURL = process.env.VUE_APP_BASEURL;

axios.defaults.baseURL = "/api";
// axios.defaults.baseURL = process.env.VUE_APP_BASEURL;
// 本地对接接口
let url = process.env.VUE_APP_BASEURL;

const api = {
	// 登录
	login(params) {
		return axios.post("login", params);
	},
	//后台用户管理---分页列表
	findSeedUserAllPage(params) {
		return axios.post("/rest/seed/user/findSeedUserAllPage", params);
	},
	//后台用户管理---新增用户
	insertSeedUser(params) {
		return axios.post("/rest/seed/user/insertSeedUser", params);
	},
	//后台用户管理---修改用户
	updateSeedUser(params = {}) {
		return axios.post("/rest/seed/user/updateSeedUser", params);
	},
	// 后台菜单管理-获取菜单树结构
	findMenuZtree(params = {}) {
		return axios.post("/rest/seed/menu/findMenuZtree", params);
	},
	// 后台管理 - 菜单管理 - 新增菜单按钮
	insertMenu(params = {}) {
		return axios.post("/rest/seed/menu/insertMenu", params);
	},
	// 后台管理 - 菜单管理 - 根据 id 获取菜单信息
	findMenuById(params) {
		return axios.post("/rest/seed/menu/findMenuById", params);
	},
	// 后台管理 - 菜单管理 - 修改菜单信息
	updateMenu(params) {
		return axios.post("/rest/seed/menu/updateMenu", params);
	},
	// 后台管理 - 菜单管理 - 修改菜单状态(删除)
	updateMenuEnable(params) {
		return axios.post("/rest/seed/menu/updateMenuEnable", params);
	},
	// 后台管理 — 系统参数 — 列表查询
	findSysList(params = {}) {
		return axios.post("/systemParam/findList", params);
	},
	// 后台管理 — 系统参数 — 添加
	addSysList(params = {}) {
		return axios.post("/systemParam/add", params);
	},
	// 后台管理 — 系统参数 — 删除
	delSysList(params = {}) {
		return axios.post("/systemParam/del", params);
	},
	// 后台管理 — 系统参数 — 修改
	updateSysList(params = {}) {
		return axios.post("/systemParam/update", params);
	},
}

export default {
	api
}