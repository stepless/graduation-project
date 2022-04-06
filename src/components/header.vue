<template>
    <header class="nav">
        <div class="item1 logo">
            <a href="/"><img src="../assets/img/logo.png"></a>
        </div>
        <nav class="item2" v-if="this.documentWidth > 1200">
            <ul>
                <li v-for="(link,index) in this.links" :key="index"> 
                    <a :href="link">{{ index }}</a>
                </li>
                <!-- <li>
                    <a href="/afterHome">后台管理</a>
                </li> -->
            </ul>
        </nav>
        <div class="item5" v-if="this.documentWidth < 1200" />
        <div class="login item3" v-if="!user.login">
            <a href="/login">Log In</a>
        </div>
        <div class="user item3 relative" v-else>
            <div class="head-portrait">
                <img :src="user.avatar"/>
            </div>
            <div class="personage">
                <a href="javascript:;">个人中心</a>
                <a href="javascript:;">退出</a>
            </div>
        </div>
        <div class="item4" v-if="this.documentWidth < 1200">
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
                "新闻热点" : "/hotspot",
                "濒危海洋鱼类" : "/",
                "法律条例" : "/law",
                "关于我们" : "/about",
            },
            documentWidth : document.documentElement.clientWidth,
            user:{
			    login:false,
			    avatar:"",
		    }
        }
    },
    props: {
      activeIndex: String,
      simple: {
        type: Boolean,
        default: false
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