import Vue from "vue"
import Router from "vue-router"

const router = new Router({
	mode: "history", //页面路径去掉#符号
	routes: [{
			path: "/",
			redirect: "/backstage/home",
			hidden: true
		},
		{
			path: "/backstage/login",
			name: "登录",
			hidden: true,
			component: () => import("./views/backstage/login/login.vue"), // vue路由懒加载  异步加载
			meta: {
				requireAuth: false // 只要此字段为true，必须做鉴权处理
			},
		},
		{
			path: "/backstage/home",
			name: "系统管理",
			hidden: false,
			component: () => import("./views/backstage/Home.vue"), // vue路由懒加载  异步加载
			meta: {
				requireAuth: false // 只要此字段为true，必须做鉴权处理

			},
			children: [{
					path: "/backstage/sysManage/userManage",
					name: "后台用户管理",
					hidden: false,
					component: () => import("./views/backstage/sysManage/userManage/UserManage.vue"),
					meta: {
						requireAuth: true
					}
				},
				{
					path: "/backstage/sysManage/userManage/components/AddUser",
					name: "新增用户",
					hidden: true,
					component: () => import("./views/backstage/sysManage/userManage/components/AddUser.vue"),
					meta: {
						requireAuth: true
					}
				},
				{
					path: "/backstage/sysManage/userManage/components/EditUser",
					name: "编辑用户",
					hidden: true,
					component: () => import("./views/backstage/sysManage/userManage/components/EditUser.vue"),
					meta: {
						requireAuth: true
					}
				},
				{
					path: "/backstage/sysManage/userManage/components/UserDetail",
					name: "用户详情",
					hidden: true,
					component: () => import("./views/backstage/sysManage/userManage/components/UserDetail.vue"),
					meta: {
						requireAuth: true
					}
				},
				{
					path: "/backstage/sysManage/roleManage",
					name: "角色管理",
					hidden: false,
					component: () => import("./views/backstage/sysManage/roleManage/RoleManage.vue"),
					meta: {
						requireAuth: true
					}
				},
				{
					path: "/backstage/sysManage/roleManage/components/AddRole",
					name: "新增角色",
					hidden: true,
					component: () => import("./views/backstage/sysManage/roleManage/components/AddRole.vue"),
					meta: {
						requireAuth: true
					}
				},
				{
					path: "/backstage/sysManage/roleManage/components/EditRole",
					name: "编辑角色",
					hidden: true,
					component: () => import("./views/backstage/sysManage/roleManage/components/EditRole.vue"),
					meta: {
						requireAuth: true
					}
				},
				{
					path: "/backstage/sysManage/roleManage/components/RoleDetail",
					name: "角色详情",
					hidden: true,
					component: () => import("./views/backstage/sysManage/roleManage/components/RoleDetail.vue"),
					meta: {
						requireAuth: true
					}
				},
				{
					path: "/backstage/sysManage/MenuManage",
					name: "菜单管理",
					hidden: false,
					component: () => import("./views/backstage/sysManage/menuManage/MenuManage.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: false // 只要此字段为true，必须做鉴权处理
					}
				},
				{
					path: "/backstage/sysManage/MenuManage/AddMenu",
					name: "新增菜单",
					hidden: true,
					component: () => import("./views/backstage/sysManage/menuManage/components/AddMenu.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: false // 只要此字段为true，必须做鉴权处理
					}
				},
				{
					path: "/backstage/sysManage/MenuManage/EditMenu",
					name: "编辑菜单",
					hidden: true,
					component: () => import("./views/backstage/sysManage/menuManage/components/EditMenu.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: false // 只要此字段为true，必须做鉴权处理
					}
				},
				{
					path: "/backstage/sysManage/SysParameters",
					name: "系统参数",
					hidden: false,
					component: () => import("./views/backstage/sysManage/sysParameters/SysParameters.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: false // 只要此字段为true，必须做鉴权处理
					}
				},
				{
					path: "/backstage/sysManage/SysParameters/AddSys",
					name: "新增参数",
					hidden: true,
					component: () => import("./views/backstage/sysManage/sysParameters/components/AddSys.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: false // 只要此字段为true，必须做鉴权处理
					}
				},
				{
					path: "/backstage/sysManage/SysParameters/EditSys",
					name: "修改参数",
					hidden: true,
					component: () => import("./views/backstage/sysManage/sysParameters/components/EditSys.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: false // 只要此字段为true，必须做鉴权处理
					}
				},
				{
					path: "/backstage/advManage/AdvList",
					name: "广告管理",
					hidden: false,
					component: () => import("./views/backstage/advManage/list/AdvList.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: false
					}
				},
				{
					path: "/backstage/advManage/AdvList/viewAd",
					name: "广告查看",
					hidden: false,
					component: () => import("./views/backstage/advManage/list/components/ViewAd.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: false
					}
				},
				{
					path: "/backstage/newsManage/NewsList",
					name: "资讯管理",
					hidden: false,
					component: () => import("./views/backstage/newsManage/newsList.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: true
					}
				}, {
					path: "/backstage/newsManage/components/AddNews",
					name: "新增资讯",
					hidden: true,
					component: () => import("./views/backstage/newsManage/components/AddNews.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: true
					}
				}, {
					path: "/backstage/newsManage/components/EditNews",
					name: "编辑资讯",
					hidden: true,
					component: () => import("./views/backstage/newsManage/components/EditNews.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: true
					}
				}, {
					path: "/backstage/newsManage/components/DetailNews",
					name: "资讯详情",
					hidden: true,
					component: () => import("./views/backstage/newsManage/components/DetailNews.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: true
					}
				},
				{
					path: "/backstage/sysManage/goodsCategory/GoodsCategoryList",
					name: "商品分类",
					hidden: false,
					component: () => import("./views/backstage/sysManage/goodsCategory/GoodsCategoryList.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: false // 只要此字段为true，必须做鉴权处理
					}
				},
				{
					path: "/backstage/sysManage/goodsCategory/CategoryDetail",
					name: "商品分类详情",
					hidden: true,
					component: () => import("./views/backstage/sysManage/goodsCategory/components/CategoryDetail.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: false // 只要此字段为true，必须做鉴权处理
					}
				},
				{
					path: "/backstage/sysManage/goodsCategory/AddCategory",
					name: "新增分类",
					hidden: true,
					component: () => import("./views/backstage/sysManage/goodsCategory/components/AddCategory.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: false // 只要此字段为true，必须做鉴权处理
					}
				},
				{
					path: "/backstage/sysManage/goodsCategory/EditCategory",
					name: "修改分类",
					hidden: true,
					component: () => import("./views/backstage/sysManage/goodsCategory/components/EditCategory.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: false // 只要此字段为true，必须做鉴权处理
					}
				}
			]
		},
		{
			path: "/orderList/home",
			name: "订单管理",
			hidden: false,
			component: () => import("./views/backstage/Home.vue"), // vue路由懒加载  异步加载
			meta: {
				requireAuth: true // 只要此字段为true，必须做鉴权处理
			},
			children: [{
					path: "/orderList/orderList",
					name: "订单列表",
					hidden: false,
					component: () => import("./views/backstage/orderList/orderList.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: true // 只要此字段为true，必须做鉴权处理
					},
				},
				{
					path: "/orderList/viewDetails",
					name: "订单详情",
					hidden: false,
					component: () => import("./views/backstage/orderList/components/viewDetails.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: true // 只要此字段为true，必须做鉴权处理
					},
				},
			]
		},
		{
			path: "/backstage/home",
			name: "商家管理",
			hidden: false,
			component: () => import("./views/backstage/Home.vue"), // vue路由懒加载  异步加载
			meta: {
				requireAuth: true // 只要此字段为true，必须做鉴权处理
			},
			children: [{
					path: "/backstage/merchantManage/ShopManage",
					name: "店铺管理",
					hidden: false,
					component: () => import("./views/backstage/merchantManage/shopManage/ShopManage.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: true
					}
				},
				{
					path: "/backstage/merchantManage/ShopDetail",
					name: "店铺详情",
					hidden: true,
					component: () => import("./views/backstage/merchantManage/shopManage/components/ShopDetail.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: true
					}
				},
				{
					path: "/backstage/merchantManage/EditShop",
					name: "店铺修改",
					hidden: true,
					component: () => import("./views/backstage/merchantManage/shopManage/components/EditShop.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: true
					}
				},
				// 分类管理
				{
					path: "/backstage/merchantManage/goodsManage",
					name: "商品管理",
					hidden: false,
					component: () => import("./views/backstage/merchantManage/goodsManage/GoodsManage.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: true
					}
				},
				{
					path: "/backstage/merchantManage/goodsManage/GoodsDetail",
					name: "商品详情",
					hidden: true,
					component: () => import("./views/backstage/merchantManage/goodsManage/components/GoodsDetail.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: true
					}
				},
				{
					path: "/backstage/merchantManage/goodsManage/GoodsAudit",
					name: "商品审核",
					hidden: true,
					component: () => import("./views/backstage/merchantManage/goodsManage/components/GoodsAudit.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: true
					}
				}
			]
		},
		{
			path: "/backstage/home",
			name: "用户管理",
			hidden: false,
			component: () => import("./views/backstage/Home.vue"), // vue路由懒加载  异步加载
			meta: {
				requireAuth: true // 只要此字段为true，必须做鉴权处理
			},
			children: [{
					path: "/backstage/memberManage/MemberList",
					name: "用户列表",
					hidden: false,
					component: () => import("./views/backstage/memberManage/memberList/MemberList.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: true
					}
				},
				{
					path: "/backstage/memberManage/EditMember",
					name: "修改用户",
					hidden: true,
					component: () => import("./views/backstage/memberManage/components/EditMember.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: true
					}
				},
				{
					path: "/backstage/memberManage/MemberDetail",
					name: "查看用户",
					hidden: true,
					component: () => import("./views/backstage/memberManage/components/MemberDetail.vue"), // vue路由懒加载  异步加载
					meta: {
						requireAuth: true
					}
				}
			]
		},
	]
})

Vue.use(Router)

export default router