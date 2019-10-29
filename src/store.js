import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
// 定义属性（数据）
let state = {
	id: "123456",
	openedTab: [],
	activeTab: ""
};

// 定义 getters
let getters = {};

// 定义 actions ，要执行的动作，如流程的判断、异步请求
const actions = {};

// 定义 mutations ，处理状态（数据） 的改变
const mutations = {
	addTab(state, component) {
		state.openedTab.push({
			name: component.name,
			path: component.path
		})
	},
	changeTab(state, component) {
		state.activeTab = component.name
	},
	deductTab(state, component) {
		let index = state.openedTab.indexOf(component.name)
		state.openedTab.splice(index, 1)
	}
};
// 创建 store 对象
const store = new Vuex.Store({
	state,
	getters,
	actions,
	mutations
});

// 导出 store 对象
export default store;