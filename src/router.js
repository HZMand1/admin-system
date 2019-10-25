import Vue from "vue"
import Router from "vue-router"

const router = new Router({
  mode: "history", //页面路径去掉#符号
  routes: [{
    path: "/",
    name: "这是啥",
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
        path: "/backstage/sysManage/userManage/UserManage",
        name: "用户管理",
        hidden: false,
        component: () => import("./views/backstage/sysManage/userManage/UserManage.vue"),
        meta: {
          requireAuth: true
        }
      }
    ]
  }
  ]
})

Vue.use(Router)

export default router