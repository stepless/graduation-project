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
        path: '/fish',
        name: 'FrontFish',
        component: () => import('../views/front-fish.vue'),
        children: [
            {
                path: '',
                name: 'fishHome',
                component: () => import('../views/fish/fishHome.vue')
            },
            {
                path: '/show/:id',
                component: () => import('../views/fish/fishShow.vue')
            },
        ]
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
        component: () => import('../views/after-home.vue'),
        children: [
            {
                path: '',
                name: 'after',
                component: () => import('../views/after/userList.vue')
            },
            {
                path: '/afterFish',
                name: 'afterFish',
                component: () => import('../views/after/afterFish.vue')
            },
            {
                path: '/user',
                name: 'userList',
                component: () => import('../views/after/userList.vue')
            },
            {
                path: '/articleManage',
                name: 'articleManage',
                component: () => import('../views/after/articleManagement.vue')
            },
            {
                path: '/afterTag',
                name: 'afterTag',
                component: () => import('../views/after/afterTag.vue')
            },
            {
                path: '/afterComment',
                name: 'afterComment',
                component: () => import('../views/after/afterComment.vue')
            },
            {
                path: '/articleManage',
                name: 'articleManage',
                component: () => import('../views/after/articleManagement.vue')
            },
            {
                path: '/write',
                name: 'write',
                component: () => import('../views/after/write.vue')
            },
        ]
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
