<template>
    <div class="page">
        <Header />
        <div class="contains">
            <router-view></router-view>
            <div class="main">
                <ArticleScrollPage />
            </div>
            <div class="rightSide">
                <CardMe />
                <CartTag :tags="hotTags"/>
            </div>
        </div>
        <ToTop />
    </div>
</template>
<script>
import Header from "../components/header.vue";
import ToTop from "../components/toTop.vue"
import ArticleScrollPage from "../components/article/articleScrollPage.vue"
import CardMe from "../components/article/cartMe.vue"
import CartTag from "../components/article/cartTag.vue"

import { getHotTags } from "../api/tag"

export default {
    components:{Header,ToTop,ArticleScrollPage,CardMe,CartTag,},
    data(){
        return {
           hotTags : [],
        }
    },
    created(){
        this.getHotTags();
    },
    methods : {
        getHotTags(){
            getHotTags().then((res)=>{
				////res.data = Result (success,msg,data)
				if(res.data.success){
                    this.hotTags = res.data.data;
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch((err)=>{
                this.$message.error("系统错误");
            }).finally(()=>{
			})
        },
    }
}
</script>

<style scoped>
    .contains{
        padding-top:130px;
        display: flex;
        width: 1024px;
        margin-left: auto;
        margin-right: auto;
    }
    .main{
        width:730px;
        margin-right: 20px;
    }
    .rightSide{
        flex-grow: 2;
        margin-left: 20px;
    }
</style>