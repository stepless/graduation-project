import { createApp } from 'vue'
import app from './App.vue'
import router from './router'
import store from './store'
import "@/assets/css/global.css"

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(app).use(store).use(router).use(ElementPlus).mount('#app')
