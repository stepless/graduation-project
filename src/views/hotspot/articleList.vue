<template>
    <div class="contains">
        <div class="main">
            <ArticleScrollPage />
            <div class="zw"></div>
        </div>
        <div class="rightSide">
            <CardMe />
            <CartTag :tags="hotTags"/>
            <CardArticle cardHeader="最热文章······" :articles="hotArticles" />
            <CardArticle cardHeader="最新文章······" :articles="newArticles" />
        </div>
    </div>
</template>

<script>
import ArticleScrollPage from "../../components/article/articleScrollPage.vue"
import CardMe from "../../components/article/cartMe.vue"
import CartTag from "../../components/article/cartTag.vue"
import CardArticle from "../../components/article/cardArticle.vue"
import { getHotTags } from "@/api/tag"
import {getHotArticles,getNewArticles} from '@/api/article'


export default {
    components:{ArticleScrollPage,CardMe,CartTag,CardArticle},
    data(){
        return {
            hotTags : [],
            hotArticles: [],
			newArticles: [],
        }
    },
    mounted(){
        this.getHotTags();
        this.getHotArticles();
		this.getNewArticles();
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
        getHotArticles(){
				//发起http请求 请求后端的数据
            getHotArticles().then((res)=>{
                ////res.data = Result (success,msg,data)
                if(res.data.success){
                    this.hotArticles = res.data.data;
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch((err)=>{
                this.$message.error("系统错误");
            }).finally(()=>{
            })
        },
        getNewArticles(){
            //发起http请求 请求后端的数据
            getNewArticles().then((res)=>{
                ////res.data = Result (success,msg,data)
                if(res.data.success){
                    this.newArticles = res.data.data;
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch((err)=>{
                this.$message.error("系统错误");
            }).finally(()=>{
            })
        }
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
.zw{
    width: 730px;
    height: 6px;
}
.rightSide{
    width:254px;
    margin-left: 20px;
    /* padding-top:56px; */
}
</style>