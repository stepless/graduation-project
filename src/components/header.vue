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
                <div class="arrows"></div>
                <div class="arr"></div>
                <a href="/information">个人中心</a>
                <a v-if="this.user.admin" href="/after">后台管理</a>
                <a @click="quit" href="javascript:;">退出</a>
            </div>
        </div>
        <div class="item4" v-if="this.documentWidth < 1200">
            <i class="iconfont icon-caidan"></i>
            <ul class="select">
                <div class="arrows"></div>
                <div class="arr"></div>
                <li v-for="(link,index) in this.links" :key="index"> 
                    <router-link :to="link">{{ index }}</router-link>
                </li>
            </ul>
        </div>
    </header>
</template>

<script>
import "@/assets/css/header.css"
import default_avatar from '@/assets/img/dog.jpg'

export default {
    data(){
        return {
            links : {
                "首页" : "/",
                "新闻热点" : "/hotspot",
                "濒危海洋鱼类" : "/fish",
                "法律条例" : "/law",
                "关于我们" : "/about",
            },
            documentWidth : document.documentElement.clientWidth,
            user:{
			    login:false,
			    avatar:"",
                admin:false,
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
        this.ifLogin();
    },
    computed: {
    avatar() {
        let avatar = this.user.avatar;
        if (avatar.length > 0) {
            return avatar
        }
            return default_avatar
        },
    },
    methods : {
        ifLogin(){
            let account = localStorage.getItem('account');
            let id = localStorage.getItem('id')
            let admin = localStorage.getItem('admin');
            if(account != null && id != null){
                this.user.login = true;
                this.user.avatar = localStorage.getItem('avatar');
                if(admin == 1){
                    this.user.admin = true;
                }
            }else{
                this.user.login = false;
                this.user.avatar = '';
                this.user.admin = false;
            }
        },
        quit(){
            localStorage.clear();
            this.$message.success('退出成功');
            this.ifLogin();
            this.$router.push('/login');
        }
    }
}
</script>
<style>
</style>