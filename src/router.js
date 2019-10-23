import Vue from 'vue'
import Router from 'vue-router'

const Tset = () => import('./views/Test.vue')

const router = new Router({
    mode: 'history', //页面路径去掉#符号
    routes: [
        {
            path: '/',
            redirect: '/test'
        },
        {
            path: '/test',
            name: 'test',
            component: Tset, // vue路由懒加载  异步加载
            meta: {
                title: '首页',
                requireAuth: false // 只要此字段为true，必须做鉴权处理

            }
        }
    ]
})

Vue.use(Router)

export default router