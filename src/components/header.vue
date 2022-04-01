<template>
    <header class="nav">
        <div class="item1 logo">
            <a href="/"><img src="../assets/logo.png"></a>
        </div>
        <nav class="item2" v-if="this.documentWidth > 977">
            <ul>
                <li v-for="(link,index) in this.links" :key="index"> 
                    <a :href="link">{{ index }}</a>
                </li>
            </ul>
        </nav>
        <div class="item5" v-if="this.documentWidth < 977" />
        <div class="login item3">
            <a href="/login">Log In</a>
        </div>
        <div class="item4" v-if="this.documentWidth < 977">
            <i class="iconfont icon-caidan"></i>
            <ul class="select">
                <li v-for="(link,index) in this.links" :key="index"> 
                    <router-link :to="link">{{ index }}</router-link>
                </li>
            </ul>
        </div>
    </header>
</template>

<script>
import "@/assets/css/header.css"
export default {
    data(){
        return {
            links : {
                "首页" : "/",
                "新闻热点" : "/",
                "濒危海洋鱼类" : "/",
                "法律条例" : "/law",
                "关于我们" : "/about",
            },
            documentWidth : document.documentElement.clientWidth,
        }
    },
    mounted() {
        window.addEventListener("resize",() => {
            return (() => {
                this.documentWidth = document.documentElement.clientWidth;
            })();
        })
    }
}
</script>
<style>
</style>