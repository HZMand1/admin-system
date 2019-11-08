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
      name: "用户管理",
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
      path: "/backstage/sysManage/goodsCategory/GoodsCategoryList",
      name: "商品分类",
      hidden: false,
      component: () => import("./views/backstage/sysManage/goodsCategory/GoodsCategoryList.vue"), // vue路由懒加载  异步加载
      meta: {
        requireAuth: false // 只要此字段为true，必须做鉴权处理
      }
    }
    ]
  },
  {
    path: "/backstage/home",
    name: "广告管理",
    hidden: false,
    component: () => import("./views/backstage/Home.vue"), // vue路由懒加载  异步加载
    meta: {
      requireAuth: false // 只要此字段为true，必须做鉴权处理
    },
    children: [{
      path: "/backstage/advManage/AdvList",
      name: "广告管理",
      hidden: false,
      component: () => import("./views/backstage/advManage/list/AdvList.vue"), // vue路由懒加载  异步加载
      meta: {
        requireAuth: false
      }
    }]
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
      component: () => import("./views/backstage/merchantManage/components/ShopDetail.vue"), // vue路由懒加载  异步加载
      meta: {
        requireAuth: true
      }
    },
    // 分类管理
    {
      path: "/backstage/merchantManage/classifyManage",
      name: "分类管理",
      hidden: false,
      component: () => import("./views/backstage/merchantManage/classifyManage/ClassifyManage.vue"), // vue路由懒加载  异步加载
      meta: {
        requireAuth: true
      }
    }
    ]
  },
  {
    path: "/backstage/home",
    name: "会员管理",
    hidden: false,
    component: () => import("./views/backstage/Home.vue"), // vue路由懒加载  异步加载
    meta: {
      requireAuth: true // 只要此字段为true，必须做鉴权处理
    },
    children: [{
      path: "/backstage/memberManage/MemberList",
      name: "会员列表",
      hidden: false,
      component: () => import("./views/backstage/memberManage/memberList/MemberList.vue"), // vue路由懒加载  异步加载
      meta: {
        requireAuth: true
      }
    }]
  },
  {
    path: "/backstage/home",
    name: "资讯管理",
    hidden: false,
    component: () => import("./views/backstage/Home.vue"), // vue路由懒加载  异步加载
    meta: {
      requireAuth: true // 只要此字段为true，必须做鉴权处理
    },
    children: [{
      path: "/backstage/newsManage/NewsList",
      name: "资讯列表",
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
    }]
  },
  {
    path: "/northwest/NorthwestIndex",
    name: "门户首页",
    hidden: false,
    component: () => import("./views/northwest/NorthwestIndex.vue"),
    meta: {
      requireAuth: false
    }
  },
  {
    path: "/northwest/login",
    name: "门户登录",
    hidden: true,
    component: () => import("./views/northwest/login/Login.vue"),
    meta: {
      requireAuth: false
    }
  },
  {
    path: "/northwest/registered",
    name: "门户注册",
    hidden: true,
    component: () => import("./views/northwest/registered/Registered.vue"),
    meta: {
      requireAuth: false
    }
  },
  {
    path: "/northwest/tenants",
    name: "商家入驻",
    hidden: true,
    component: () => import("./views/northwest/tenants/Tenants.vue"),
    meta: {
      requireAuth: false
    }
  }
  ]
})

Vue.use(Router)

export default router