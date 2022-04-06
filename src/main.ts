import { createApp } from 'vue'
import app from './App.vue'
import router from './router'
import store from './store'
import "@/assets/css/global.css"

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

const vm = createApp(app);

vm.directive('title',function(el, binding){
    document.title = el.dataset.title;
})

vm.use(ElementPlus).use(store).use(router).mount('#app')

vm.use(VueAxios, axios)
// vm.use(VueAxios, axios)