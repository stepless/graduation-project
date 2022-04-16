import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

import FrontHome from '../views/front-home.vue'
import FrontLaw from '../views/front-law.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'FrontHome',
        component: FrontHome
    },
    {
        path: '/law',
        name: 'FrontLow',
        component: () => import('../views/front-law.vue')
    },
    {
        path: '/about',
        name: 'FrontAbout',
        component: () => import('../views/front-about.vue')
    },
    {
        path: '/login',
        name: 'FrontLogin',
        component: () => import('../views/front-login.vue')
    },
    {
        path: '/register',
        name: 'FrontRegister',
        component: () => import('../views/front-register.vue')
    },
    {
        path: '/information',
        name: 'Information',
        component: () => import('../views/information.vue')
    },
    {
        path: '/hotspot',
        name: 'FrontHotspot',
        component: () => import('../views/front-hotspot.vue'),
        children: [
            {
                path: '',
                name: 'articleList',
                component: () => import('../views/hotspot/articleList.vue')
            },
            {
                path: 'tag/all',
                name: 'articleTags',
                component: () => import('../views/hotspot/articleTags.vue')
            },
            {
                path: 'tag/:id',
                component: () => import('../views/hotspot/articleTag.vue')
            },
            {
                path: '/view/:id',
                component: () => import('../views/hotspot/articleView.vue')
            },
        ],
    },
    {
        path: '/after',
        name: 'After',
        component: () => import('../views/after-home.vue')
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
