import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

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
    component: FrontLaw
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
    path: '/hotspot',
    name: 'FrontHotspot',
    component: () => import('../views/front-hotspot.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
