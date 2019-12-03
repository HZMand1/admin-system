import axios from "../../assets/request/http"; // 导入http中创建的axios实例

// axios.defaults.baseURL = process.env.VUE_APP_BASEURL;

// axios.defaults.baseURL = "/api";
axios.defaults.baseURL = process.env.VUE_APP_BASEURL;
// 本地对接接口
let url = process.env.VUE_APP_BASEURL;

const api = {
	// 登录
	login(params) {
		return axios.post("/authority/login", params);
	},
	// 文件管理-上传附件到fasdfs
	fileUpload(params) {
		return axios.post("/rest/seed/http/fileUpload", params);
	},
	//后台用户管理---分页列表
	findSeedUserAllPage(params = {}) {
		return axios.post("/rest/seed/user/findSeedUserAllPage", params);
	},
	//后台用户管理---新增用户
	insertSeedUser(params = {}) {
		return axios.post("/rest/seed/user/insertSeedUser", params);
	},
	//后台用户管理---用户详情
	findSeedUserById(params = {}) {
		return axios.post("/rest/seed/user/findSeedUserById", params);
	},
	//后台用户管理---修改用户
	updateSeedUser(params = {}) {
		return axios.post("/rest/seed/user/updateSeedUser", params);
	},
	//后台管理-后台用户管理-用户启用、禁用
	enableSeedUser(params = {}) {
		return axios.post("/rest/seed/user/enableSeedUser", params);
	},
	//后台管理-角色管理-所有角色列表分页
	findRoleAllPage(params = {}) {
		return axios.post("/rest/seed/role/findRoleAllPage", params);
	},
	//后台管理--角色管理--给用户分配角色
	alterUserToRole(params = {}) {
		return axios.post("/rest/seed/roleuser/alterUserToRole", params);
	},
	//后台管理-用户角色-根据用户获取角色
	findRoleByUser(params = {}) {
		return axios.post("/rest/seed/roleuser/findRoleByUser", params);
	},
	//后台管理--角色管理--新增角色
	insertRole(params = {}) {
		return axios.post("/rest/seed/role/insertRole", params);
	},
	//后台管理-角色管理-根据id获取角色
	findRoleById(params = {}) {
		return axios.post("/rest/seed/role/findRoleById", params);
	},
	//后台管理-角色管理-修改角色
	updateRole(params = {}) {
		return axios.post("/rest/seed/role/updateRole", params);
	},
	//后台管理-角色管理-修改角色状态
	updateRoleEnable(params = {}) {
		return axios.post("/rest/seed/role/updateRoleEnable", params);
	},
	//后台管理-用户角色权限-获取角色所有权限
	findAuthByRole(params = {}) {
		return axios.post("/rest/seed/roleauth/findAuthByRole", params);
	},
	//后台管理 - 用户角色权限 - 获取用户所有权限
	findAuthByUser(params = {}) {
		return axios.post("/rest/seed/roleauth/findAuthByUser", params);
	},
	//后台管理-用户角色权限-给角色分配权限
	saveAuthToRole(params = {}) {
		return axios.post("/rest/seed/roleauth/saveAuthToRole", params);
	},
	// 后台菜单管理-获取菜单树结构
	findMenuZtree(params = {}) {
		return axios.post("/rest/seed/menu/findMenuZtree", params);
	},
	// 后台管理 - 菜单管理 - 新增菜单按钮
	insertMenu(params = {}) {
		return axios.post("/rest/seed/menu/insertMenu", params);
	},
	// 后台管理 - 菜单管理 - 修改菜单信息
	updateMenu(params) {
		return axios.post("/rest/seed/menu/updateMenu", params);
	},
	// 后台管理 - 菜单管理 - 修改菜单状态(删除)
	updateMenuEnable(params) {
		return axios.post("/rest/seed/menu/updateMenuEnable", params);
	},
	// 后台管理 - 菜单管理 - 根据 id 获取菜单信息
	findMenuById(params) {
		return axios.post("/rest/seed/menu/findMenuById", params);
	},
	// 后台管理 — 权限管理 — 获取指定用户权限树
	findAuthTree(params) {
		return axios.post("/rest/seed/roleauth/findAuthTree", params);
	},
	// 后台管理 — 系统参数 — 列表查询
	findSysList(params = {}) {
		return axios.post("/systemParam/findList", params);
	},
	// 后台管理 — 系统参数 — 列表查询
	findListByCondition(params = {}) {
		return axios.post("/systemParam/findListByCondition", params);
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
	/**
	 * 商品分类 - start
	 */
	// 后台管理 — 商品分类 — 列表查询
	goodsCategoryFindList(params = {}) {
		return axios.post("/goodsCategory/findList", params);
	},
	// 后台管理 — 商品分类 — 启用禁用
	goodsCategoryUpdateEnable(params = {}) {
		return axios.post("/goodsCategory/updateEnable", params);
	},
	// 后台管理 — 商品分类 — 添加
	goodsCategoryAdd(params = {}) {
		return axios.post("/goodsCategory/add", params);
	},
	// 后台管理 — 商品分类 — 修改
	goodsCategoryUpdate(params = {}) {
		return axios.post("/goodsCategory/update", params);
	},
	// 后台管理 — 商品分类 — 查询详情
	goodsCategoryFindCategoryById(params = {}) {
		return axios.post("/goodsCategory/findCategoryById", params);
	},
	// 后台管理 — 商品分类 — 获取商品分类树结构
	findCategoryTree(params = {}) {
		return axios.post("/goodsCategory/findCategoryTree", params);
	},
	// 后台管理 — 商品分类 — 获分类下所有商品
	findGoodsByCategoryId(params = {}) {
		return axios.post("/goodsInfo/findGoodsByCategoryId", params);
	},

	/**
	 * 商品分类 - end
	 */

	/**
	 * 商家管理 - start
	 */
	//后台管理-商家店铺-店铺分页
	findSupplierInfoPage(params = {}) {
		return axios.post("/rest/seed/supplier/info/findSupplierInfoPage", params);
	},
	//后台管理-商家店铺-店铺审核
	updateSupplierEnable(params = {}) {
		return axios.post("/rest/seed/supplier/info/updateSupplierEnable", params);
	},
	//后台管理-商家店铺-店铺启用、禁用
	updateSupplierState(params = {}) {
		return axios.post("/rest/seed/supplier/info/updateSupplierState", params);
	},
	//后台管理-商家店铺-店铺置顶
	setTopSupplier(params = {}) {
		return axios.post("/rest/seed/supplier/info/setTopSupplier", params);
	},
	//后台管理-商家店铺-根据id获取店铺详情
	findSupplierInfoById(params = {}) {
		return axios.post("/rest/seed/supplier/info/findSupplierInfoById", params);
	},
	//后台管理-商家店铺-修改店铺信息
	updateSupplier(params = {}) {
		return axios.post("/rest/seed/supplier/info/updateSupplier", params);
	},
	/**
	 * 商家管理 - end
	 */

	/**
	 * 商品管理 - start
	 */
	//后台管理 — 商品信息 — 商品列表查询
	goodsInfoFindList(params = {}) {
		return axios.post("/goodsInfo/findList", params);
	},
	//后台管理 — 商品信息 — 添加
	goodsInfoAdd(params = {}) {
		return axios.post("/goodsInfo/add", params);
	},
	//后台管理 — 商品信息 — 修改
	goodsInfoUpdate(params = {}) {
		return axios.post("/goodsInfo/update", params);
	},
	//后台管理 — 商品信息 —  查询详情
	goodsInfoFindGoodsById(params = {}) {
		return axios.post("/goodsInfo/findGoodsById", params);
	},
	//后台管理 — 商品信息 — 审核
	goodsInfoGoodsReview(params = {}) {
		return axios.post("/goodsInfo/goodsReview", params);
	},
	//后台管理 — 商品信息 — 上下架
	goodsInfoUpdateStatus(params = {}) {
		return axios.post("/goodsInfo/updateStatus", params);
	},
	/**
	 * 商品管理 - end
	 */

	/**
	 * 会员管理 - start
	 */
	//后台管理-会员管理-分页获取会员信息
	findUserPage(params = {}) {
		return axios.post("/rest/seed/outlet/user/findUserPage", params);
	},
	//后台管理-会员管理-启用、禁用会员信息
	enableOutletUser(params = {}) {
		return axios.post("/rest/seed/outlet/user/enableOutletUser", params);
	},
	//后台管理-会员管理-审核会员信息
	updateUserReview(params = {}) {
		return axios.post("/rest/seed/user/review/updateUserReview", params);
	},
	//后台管理-会员管理-修改会员信息
	updateOutletUser(params = {}) {
		return axios.post("/rest/seed/outlet/user/updateOutletUser", params);
	},
	//后台管理-会员管理-根据ID查询会员信息
	findOutletUserById(params = {}) {
		return axios.post("/rest/seed/outlet/user/findOutletUserById", params);
	},
	/**
	 * 会员管理 - end
	 */

	/**
	 * 资讯管理 - start
	 */
	//后台管理-广告新闻资讯管理-分页查询
	findAdNewsListPage(params = {}) {
		return axios.post("/rest/seed/adNews/findAdNewsListPage", params);
	},
	//后台管理-广告新闻资讯管理-通过ID获取详情
	findAdNewsById(params = {}) {
		return axios.post("/rest/seed/adNews/findAdNewsById", params);
	},
	//后台管理-广告新闻资讯管理-启用 禁用
	enableAdNews(params = {}) {
		return axios.post("/rest/seed/adNews/enableAdNews", params);
	},
	//后台管理-广告新闻资讯管理-删除
	deleteAdNews(params = {}) {
		return axios.post("/rest/seed/adNews/deleteAdNews", params);
	},
	//后台管理-广告新闻资讯管理-修改
	updateAdNews(params = {}) {
		return axios.post("/rest/seed/adNews/updateAdNews", params);
	},
	//后台管理-广告新闻资讯管理-新增
	insertAdNews(params = {}) {
		return axios.post("/rest/seed/adNews/insertAdNews", params);
	},
	//后台管理-广告新闻资讯管理-置顶操作
	setTopAdNews(params = {}) {
		return axios.post("/rest/seed/adNews/setTopAdNews", params);
	},
	/**
	 * 资讯管理 - end
	 */

	/**
	 * 系统参数查询 - start
	 */
	//后台管理 — 系统参数 — 查询全部参数
	systemParamFindAll(params = {}) {
		return axios.post("/systemParam/findAll", params);
	},
	//后台管理 — 系统参数 — 按类型查询
	systemParamFindListByType(params = {}) {
		return axios.post("/systemParam/findListByType", params);
	},
	/**
	 * 系统参数查询 - end
	 */
	/**
	 * 
	 * 订单管理start
	 */
	// 订单管理 - 订单列表分页
	findOrderList(params = {}) {
		return axios.post("/rest/seed/order/info/findOrderList", params);
	},
	// 订单管理 - 查看订单详情
	findOrderByDetailId(params = {}) {
		return axios.post("/rest/seed/order/info/findOrderByDetailId", params);
	},
	//【物流信息】-【通过公司编码和快递单号查询快递信息】
	findLogisticsInfo(params = {}) {
		return axios.post("/rest/seed/logistics/findLogisticsInfo", params);
	},
	// 订单管理 — 查询发货信息
	findSeedPackage(params = {}) {
		return axios.post("/rest/seed/order/info/findSeedPackage", params);
	},
	/**
	 * end
	 */

	// 西北门户-获取比价采购，现货晒场数据
	findProductService(params = {}) {
		return axios.post("rest/seed/http/findProductService", params);
	},
	// 西北门户-广告新闻资讯管理-列表查询
	findAdNewsAllList(params = {}) {
		return axios.post("rest/seed/adNews/findAdNewsAllList", params);
	},
	// 会员注册
	insertOutletUser(params) {
		return axios.post("/rest/seed/outlet/user/insertOutletUser", params);
	}
}
export default {
	api
}