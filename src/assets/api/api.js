import axios from "../../assets/request/http"; // 导入http中创建的axios实例

// axios.defaults.baseURL = process.env.VUE_APP_BASEURL;

axios.defaults.baseURL = "/api";
// 本地对接接口
let url = process.env.VUE_APP_BASEURL;

const api = {
  login (params) {
    return axios.post("login", params);
  },
  //后台用户管理---分页列表
  findSeedUserAllPage (params) {
    return axios.post("/rest/seed/user/findSeedUserAllPage", params);
  },
  //后台用户管理---新增用户
  insertSeedUser (params) {
    return axios.post("/rest/seed/user/insertSeedUser", params);
  }
}

export default {
  api
}