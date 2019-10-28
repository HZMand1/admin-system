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
    ]
  },

  ]
})

Vue.use(Router)

export default router