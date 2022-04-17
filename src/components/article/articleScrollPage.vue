<template>
    <scroll-page :loading="loading" :offset="offset" :noData="noData" @load="load">

        <ArticleItem v-for="article in articles" :key="article.id" v-bind="article" />

    </scroll-page>

</template>

<script>
import ScrollPage from "../scrollpage.vue"
import ArticleItem from "./articleItem.vue"

import {getArticles} from '@/api/article'
export default {
    components:{
        "scroll-page":ScrollPage,
        ArticleItem,
    },
    props : {
        query:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return {
            loading: false,
            noDate:false,
            offset:0,
            articles:[],
            innerPage: {
                page : 1,
                pageSize : 2,
                tagId : null,
            }
        }
    },
    methods:{
        // load(){
        //     //如果触发分页，调用接口 加载文章
        //     this.getArticles();
        // },
        getArticles(){
            this.loading = true;
            this.innerPage.tagId = this.query.tagId;
            // this.$http.post('http://localhost:8888/articles',this.innerPage).then((res) => {
            getArticles(this.innerPage).then((res) => {
                if(res.data.success){
                    if(res.data.data.length <= 0){
                        this.noDate = true;
                    }
                    this.articles = this.articles.concat(res.data.data.data);
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch((err)=>{
                //this.$message.error("系统错误");
            }).finally(()=>{
                this.loading = false;
            })
        }
    },
    created(){
         this.getArticles();   
    },
}
</script>

<style scoped>

</style>
