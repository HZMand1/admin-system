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
    children: [
      {
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
      }
    ]
  },
  {
    path: "/backstage/sysManage/MenuManage",
    name: "MenuManage",
    component: () => import("./views/backstage/sysManage/menuManage/MenuManage.vue"), // vue路由懒加载  异步加载
    meta: {
      title: "菜单管理",
      requireAuth: false // 只要此字段为true，必须做鉴权处理
    }
  },
  {
    path: "/backstage/sysManage/MenuManage/AddMenu",
    name: "AddMenu",
    component: () => import("./views/backstage/sysManage/menuManage/components/AddMenu.vue"), // vue路由懒加载  异步加载
    meta: {
      title: "菜单管理",
      requireAuth: false // 只要此字段为true，必须做鉴权处理
    }
  },
  {
    path: "/backstage/sysManage/MenuManage/EditMenu",
    name: "EditMenu",
    component: () => import("./views/backstage/sysManage/menuManage/components/EditMenu.vue"), // vue路由懒加载  异步加载
    meta: {
      title: "菜单管理",
      requireAuth: false // 只要此字段为true，必须做鉴权处理
    }
  },
  {
    path: "/backstage/sysManage/SysParameters",
    name: "SysParameters",
    component: () => import("./views/backstage/sysManage/sysParameters/SysParameters.vue"), // vue路由懒加载  异步加载
    meta: {
      title: "系统参数",
      requireAuth: false // 只要此字段为true，必须做鉴权处理
    }
  },
  {
    path: "/backstage/sysManage/SysParameters/AddSys",
    name: "AddSys",
    component: () => import("./views/backstage/sysManage/sysParameters/components/AddSys.vue"), // vue路由懒加载  异步加载
    meta: {
      title: "系统参数",
      requireAuth: false // 只要此字段为true，必须做鉴权处理
    }
  },
  ]
})

Vue.use(Router)

export default router