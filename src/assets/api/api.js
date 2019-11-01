import axios from "../../assets/request/http"; // 导入http中创建的axios实例

// axios.defaults.baseURL = process.env.VUE_APP_BASEURL;

axios.defaults.baseURL = "/api";
// 本地对接接口
let url = process.env.VUE_APP_BASEURL;

const api = {
    // 登录
    login (params) {
        return axios.post("login", params);
    },
    //后台用户管理---分页列表
    findSeedUserAllPage (params = {}) {
        return axios.post("/rest/seed/user/findSeedUserAllPage", params);
    },
    //后台用户管理---新增用户
    insertSeedUser (params = {}) {
        return axios.post("/rest/seed/user/insertSeedUser", params);
    },
    //后台用户管理---用户详情
    findSeedUserById (params = {}) {
        return axios.post("/rest/seed/user/findSeedUserById", params);
    },
    //后台用户管理---修改用户
    updateSeedUser (params = {}) {
        return axios.post("/rest/seed/user/updateSeedUser", params);
    },
    //后台管理-角色管理-所有角色列表分页
    findRoleAllPage (params = {}) {
        return axios.post("/rest/seed/role/findRoleAllPage", params);
    },
    //后台管理--角色管理--给用户分配角色
    alterUserToRole (params = {}) {
        return axios.post("/rest/seed/roleuser/alterUserToRole", params);
    },
    //后台管理-用户角色-根据用户获取角色
    findRoleByUser (params = {}) {
        return axios.post("/rest/seed/roleuser/findRoleByUser", params);
    },
    //后台管理--角色管理--新增角色
    insertRole (params = {}) {
        return axios.post("/rest/seed/role/insertRole", params);
    },
    // 后台菜单管理-获取菜单树结构
    findMenuZtree (params = {}) {
        return axios.post("/rest/seed/menu/findMenuZtree", params);
    },
    // 后台管理 - 菜单管理 - 新增菜单按钮
    insertMenu (params = {}) {
        return axios.post("/rest/seed/menu/insertMenu", params);
    },
    // 后台管理 — 系统参数 — 列表查询
    findSysList (params = {}) {
        return axios.post("/systemParam/findList", params);
    },
    // 后台管理 — 系统参数 — 添加
    addSysList (params = {}) {
        return axios.post("/systemParam/add", params);
    },
    // 后台管理 — 系统参数 — 删除
    delSysList (params = {}) {
        return axios.post("/systemParam/del", params);
    },
    // 后台管理 — 系统参数 — 修改
    updateSysList (params = {}) {
        return axios.post("/systemParam/update", params);
    },
    // 后台管理 — 广告新闻资讯管理 — 列表
    findAdNewsListPage (params = {}) {
        return axios.post("rest/seed/adNews/findAdNewsListPage", params);
    },
}

export default {
    api
}