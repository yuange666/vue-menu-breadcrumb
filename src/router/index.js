import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue';
const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        redirect: '/index',
        children: [
            {
                path: '/index',
                name: 'index',
                meta:{
                    breadcrumb:[{name:'首页'}]
                },
                component: () => import('../views/index/Index.vue')
            }
        ]
    }
];

const router = new VueRouter({
    routes
});

export default router
